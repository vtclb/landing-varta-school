type StickerProps = {
  children: string;
  tilt?: "left" | "right";
  className?: string;
};

export function Sticker({ children, tilt = "left", className = "" }: StickerProps) {
  return <span className={`sticker sticker--${tilt} ${className}`}>{children}</span>;
}
