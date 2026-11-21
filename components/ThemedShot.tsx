import Image from 'next/image';
import type { GalleryShot } from '@/data/projects';

interface Props {
  shot: Pick<GalleryShot, 'src' | 'themed' | 'width' | 'height'>;
  alt: string;
  sizes: string;
  className?: string;
  /** Rellena el contenedor (portadas); si no, usa el tamaño real de la captura. */
  fill?: boolean;
  priority?: boolean;
}

/**
 * Captura del proyecto. Si tiene versión oscura (`-oscuro`) se muestra la que
 * corresponde al tema del sitio; si no, siempre la misma.
 */
export default function ThemedShot({ shot, alt, sizes, className = '', fill, priority }: Props) {
  const common = fill ? { fill: true as const } : { width: shot.width, height: shot.height };
  const base = fill ? 'object-cover' : 'h-auto w-full';

  if (!shot.themed) {
    return (
      <Image
        src={`/projects/${shot.src}.webp`}
        alt={alt}
        sizes={sizes}
        priority={priority}
        className={`${base} ${className}`}
        {...common}
      />
    );
  }

  return (
    <>
      <Image
        src={`/projects/${shot.src}-oscuro.webp`}
        alt={alt}
        sizes={sizes}
        priority={priority}
        className={`shot-dark ${base} ${className}`}
        {...common}
      />
      <Image
        src={`/projects/${shot.src}.webp`}
        alt={alt}
        sizes={sizes}
        priority={priority}
        className={`shot-light ${base} ${className}`}
        {...common}
      />
    </>
  );
}
