import Image from "next/image";

type LogoChipProps = {
  src: string;
  alt: string;
  size?: number;
  /**
   * Set for logos that are themselves a filled tile (ilmuOne's black square)
   * so they meet the chip edge instead of floating in white padding.
   */
  bleed?: boolean;
  className?: string;
};

/**
 * Brand logos sit on a white chip in both themes. Official assets keep their
 * own colors — none of them get inverted or recolored to match the palette.
 */
export function LogoChip({
  src,
  alt,
  size = 48,
  bleed = false,
  className = "",
}: LogoChipProps) {
  return (
    <span
      className={`logo-chip inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[var(--radius-nested)] ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        sizes={`${size}px`}
        className={
          bleed ? "h-full w-full object-cover" : "h-auto w-[76%] object-contain"
        }
      />
    </span>
  );
}
