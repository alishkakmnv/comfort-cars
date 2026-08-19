"use client";

import { useEffect } from "react";

/**
 * Открывать страницу сверху.
 *
 * Встроенные браузеры мессенджеров (Telegram, Instagram) держат собственный кеш
 * вкладок и возвращают прежнюю позицию прокрутки при повторном открытии той же
 * ссылки — человек попадает сразу в футер. Плюс scroll anchoring может утащить
 * позицию, пока догружаются фото и шрифт.
 *
 * Сбрасываем только стартовую позицию и только пока человек сам не тронул
 * страницу: первый же его жест отменяет любые дальнейшие сбросы.
 */
export function ScrollReset() {
  useEffect(() => {
    if (window.location.hash) return;

    let touched = false;
    const markTouched = () => {
      touched = true;
    };

    const opts = { passive: true, once: true } as const;
    window.addEventListener("wheel", markTouched, opts);
    window.addEventListener("touchstart", markTouched, opts);
    window.addEventListener("keydown", markTouched, opts);

    const reset = () => {
      if (!touched && window.scrollY > 0) window.scrollTo(0, 0);
    };

    reset();
    // позиция может восстановиться позже — после layout и после загрузки картинок
    const timers = [50, 300, 900].map((ms) => window.setTimeout(reset, ms));
    window.addEventListener("load", reset);

    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("load", reset);
      window.removeEventListener("wheel", markTouched);
      window.removeEventListener("touchstart", markTouched);
      window.removeEventListener("keydown", markTouched);
    };
  }, []);

  return null;
}
