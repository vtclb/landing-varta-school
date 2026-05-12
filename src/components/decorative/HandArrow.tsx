export function HandArrow({ className = "" }: { className?: string }) {
  return (
    <svg className={`hand-arrow ${className}`} viewBox="0 0 94 48" fill="none" aria-hidden="true">
      <path
        d="M4 28C24 10 48 6 76 18"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray="1 10"
      />
      <path
        d="M67 6L86 23L62 34"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
