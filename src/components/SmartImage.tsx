import { Camera } from "lucide-react";
import { useState } from "react";

type SmartImageProps = {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel: string;
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "low" | "auto";
  width?: number;
  height?: number;
};

export function SmartImage({
  src,
  alt,
  className = "",
  fallbackLabel,
  loading = "lazy",
  fetchPriority,
  width,
  height,
}: SmartImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={`smart-image smart-image--fallback ${className}`} role="img" aria-label={alt}>
        <span className="smart-image__corner" aria-hidden="true" />
        <Camera size={34} />
        <strong>{fallbackLabel}</strong>
      </div>
    );
  }

  return (
    <img
      className={`smart-image ${className}`}
      src={src}
      alt={alt}
      loading={loading}
      decoding="async"
      fetchPriority={fetchPriority}
      width={width}
      height={height}
      onError={() => setFailed(true)}
    />
  );
}
