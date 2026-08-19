import Image from "next/image";
import type { Car } from "@/lib/site";

/**
 * Кадр машины. Пока фото не обработано скриптом (scripts/process-fleet.mjs),
 * на его месте стоит плоская поверхность — без рамки, тени и радиуса,
 * ровно того же аспекта, что и готовое фото. Подстановка = поле photo в site.ts.
 */
export function CarPhoto({
  car,
  priority = false,
  sizes = "(min-width: 1024px) 33vw, 100vw",
  className,
}: {
  car: Car;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  return (
    <div className={`relative aspect-16/10 w-full overflow-hidden bg-carbon-card ${className ?? ""}`}>
      {car.photo ? (
        <Image
          src={car.photo}
          alt={`${car.model} ${car.year} — аренда в Алматы`}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex items-end p-6">
          <span className="text-caption uppercase text-border-dark">
            Фото готовится
          </span>
        </div>
      )}
    </div>
  );
}
