import { Camera } from "lucide-react";
import { useState } from "react";

type VideoCardProps = {
  srcMp4: string;
  srcWebm?: string;
  poster: string;
  label: string;
  className?: string;
  autoPlay?: boolean;
};

export function VideoCard({
  srcMp4,
  srcWebm,
  poster,
  label,
  className = "",
  autoPlay = true,
}: VideoCardProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={`video-card video-card--fallback ${className}`} role="img" aria-label={label}>
        <img src={poster} alt="" aria-hidden="true" loading="lazy" decoding="async" />
        <span>
          <Camera size={20} />
          {label}
        </span>
      </div>
    );
  }

  return (
    <div className={`video-card ${className}`}>
      <video
        autoPlay={autoPlay}
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
        aria-label={label}
        onError={() => setFailed(true)}
      >
        {srcWebm && <source src={srcWebm} type="video/webm" />}
        <source src={srcMp4} type="video/mp4" />
      </video>
      <span className="video-card__label">{label}</span>
    </div>
  );
}
