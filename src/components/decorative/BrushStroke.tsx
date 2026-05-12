type BrushStrokeProps = {
  tone?: "yellow" | "green";
  className?: string;
};

export function BrushStroke({ tone = "yellow", className = "" }: BrushStrokeProps) {
  return <span aria-hidden="true" className={`brush brush--${tone} ${className}`} />;
}
