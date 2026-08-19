"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Ревил — украшение, а не условие видимости.
 *
 * Начальные состояния Framer Motion попадают в серверный HTML, и до гидратации
 * весь анимируемый контент оказывается за маской: на медленной сети человек
 * видит пустую страницу. Поэтому прячем элемент не в разметке, а уже на клиенте
 * и только если анимация действительно проиграет: страница на экране и
 * гидратация случилась быстро. Скрытие ставим в layout-эффект — до отрисовки,
 * так что мигания нет. Иначе контент просто остаётся на месте.
 */
function useArmed() {
  const [armed, setArmed] = useState(false);

  useIsoLayoutEffect(() => {
    if (document.visibilityState !== "visible") return;
    if (performance.now() > 1500) return;
    setArmed(true);
  }, []);

  return armed;
}

/**
 * Наблюдаем ВНЕШНИЙ контейнер, а не анимируемый элемент: внутренний уезжает
 * за край overflow-hidden, и IntersectionObserver считал бы его невидимым.
 *
 * immediate — для первого экрана: пересечения там ждать незачем, но запуск всё
 * равно откладываем на эффект. Иначе элемент «войдёт» ещё в первом рендере,
 * до того как useArmed успеет его спрятать, и ревил не проиграет вовсе.
 */
function useEnter(immediate: boolean) {
  const ref = useRef<HTMLElement>(null);
  const intersected = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const [kicked, setKicked] = useState(false);

  useEffect(() => {
    if (!immediate) return;
    // следующий кадр: скрытое состояние уже отрисовано, есть от чего ехать
    const id = requestAnimationFrame(() => setKicked(true));
    return () => cancelAnimationFrame(id);
  }, [immediate]);

  return { ref, inView: immediate ? kicked : intersected };
}

/** Уход в скрытое состояние — мгновенный, выход из него — с анимацией. */
function variants(hidden: Record<string, unknown>, delay: number, duration: number) {
  return {
    hidden: { ...hidden, transition: { duration: 0 } },
    shown: {
      ...Object.fromEntries(Object.keys(hidden).map((k) => [k, RESET[k]])),
      transition: { duration, delay, ease: EASE },
    },
  };
}

const RESET: Record<string, string | number> = {
  y: "0%",
  scaleX: 1,
  clipPath: "inset(0% 0% 0% 0%)",
};

type RevealProps = {
  children: ReactNode;
  delay?: number;
  immediate?: boolean;
  className?: string;
};

/** Ревил текста из-под маски: строка выходит из края, а не проявляется. */
export function TextReveal({
  children,
  delay = 0,
  immediate = false,
  as = "div",
  className,
}: RevealProps & {
  /** span — когда ревил стоит внутри h1/h2/p и div был бы невалиден */
  as?: "div" | "span";
}) {
  const reduced = useReducedMotion();
  const armed = useArmed();
  const { ref, inView } = useEnter(immediate);
  const Outer = as;
  const Inner = as === "span" ? motion.span : motion.div;

  if (reduced) {
    return <Outer className={`block ${className ?? ""}`}>{children}</Outer>;
  }

  return (
    <Outer
      ref={ref as React.Ref<HTMLDivElement & HTMLSpanElement>}
      className={`block overflow-hidden ${className ?? ""}`}
    >
      <Inner
        data-reveal
        className="block"
        variants={variants({ y: "108%" }, delay, 0.85)}
        initial={false}
        animate={armed && !inView ? "hidden" : "shown"}
      >
        {children}
      </Inner>
    </Outer>
  );
}

/** Раскрытие кадра снизу вверх, картинка идёт встречным ходом. Без scale на hover. */
export function FrameReveal({
  children,
  delay = 0,
  immediate = false,
  className,
}: RevealProps) {
  const reduced = useReducedMotion();
  const armed = useArmed();
  const { ref, inView } = useEnter(immediate);

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  const state = armed && !inView ? "hidden" : "shown";

  return (
    <div ref={ref as React.Ref<HTMLDivElement>} className={className}>
      <motion.div
        data-reveal-frame
        className="overflow-hidden"
        variants={variants({ clipPath: "inset(100% 0% 0% 0%)" }, delay, 1.05)}
        initial={false}
        animate={state}
      >
        <motion.div
          data-reveal
          variants={variants({ y: "-14%" }, delay, 1.05)}
          initial={false}
          animate={state}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}

/** Хайрлайн, который прочерчивается слева направо. */
export function RuleDraw({
  className,
  delay = 0,
  immediate = false,
}: {
  className?: string;
  delay?: number;
  immediate?: boolean;
}) {
  const reduced = useReducedMotion();
  const armed = useArmed();
  const { ref, inView } = useEnter(immediate);

  if (reduced) {
    return <span className={`block h-px w-full ${className ?? ""}`} />;
  }

  return (
    <span ref={ref as React.Ref<HTMLSpanElement>} className="block">
      <motion.span
        data-reveal
        className={`block h-px w-full origin-left ${className ?? ""}`}
        variants={variants({ scaleX: 0 }, delay, 0.9)}
        initial={false}
        animate={armed && !inView ? "hidden" : "shown"}
      />
    </span>
  );
}
