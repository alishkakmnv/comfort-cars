"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Наблюдаем ВНЕШНИЙ контейнер, а не анимируемый элемент: внутренний уезжает
 * за край overflow-hidden, и IntersectionObserver считал бы его невидимым.
 * immediate — для первого экрана: там ждать пересечения незачем.
 */
function useEnter(immediate: boolean) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, {
    once: true,
    margin: "0px 0px -10% 0px",
    initial: immediate,
  });
  return { ref, inView: immediate || inView };
}

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
        initial={{ y: "108%" }}
        animate={inView ? { y: "0%" } : { y: "108%" }}
        transition={{ duration: 0.85, delay, ease: EASE }}
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
  const { ref, inView } = useEnter(immediate);

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref as React.Ref<HTMLDivElement>} className={className}>
      <motion.div
        data-reveal-frame
        className="overflow-hidden"
        initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
        animate={
          inView
            ? { clipPath: "inset(0% 0% 0% 0%)" }
            : { clipPath: "inset(100% 0% 0% 0%)" }
        }
        transition={{ duration: 1.05, delay, ease: EASE }}
      >
        <motion.div
          data-reveal
          initial={{ y: "-14%" }}
          animate={inView ? { y: "0%" } : { y: "-14%" }}
          transition={{ duration: 1.05, delay, ease: EASE }}
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
  const { ref, inView } = useEnter(immediate);

  if (reduced) {
    return <span className={`block h-px w-full ${className ?? ""}`} />;
  }

  return (
    <span ref={ref as React.Ref<HTMLSpanElement>} className="block">
      <motion.span
        data-reveal
        className={`block h-px w-full origin-left ${className ?? ""}`}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.9, delay, ease: EASE }}
      />
    </span>
  );
}
