import { X } from "lucide-react";
import { useEffect } from "react";

type VideoModalProps = {
  open: boolean;
  url: string;
  title: string;
  onClose: () => void;
};

function toEmbedUrl(url: string) {
  try {
    const parsed = new URL(url);
    const id = parsed.hostname.includes("youtu.be")
      ? parsed.pathname.replace("/", "")
      : parsed.searchParams.get("v");
    const list = parsed.searchParams.get("list");

    if (!id) return url;

    const params = new URLSearchParams({
      autoplay: "1",
      rel: "0",
      modestbranding: "1",
    });

    if (list) params.set("list", list);

    return `https://www.youtube.com/embed/${id}?${params.toString()}`;
  } catch {
    return url;
  }
}

export function VideoModal({ open, url, title, onClose }: VideoModalProps) {
  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="video-modal" role="dialog" aria-modal="true" aria-label={title}>
      <button className="video-modal__backdrop" type="button" aria-label="Закрити відео" onClick={onClose} />
      <div className="video-modal__panel">
        <button className="video-modal__close" type="button" onClick={onClose}>
          <X size={22} />
          <span>Закрити</span>
        </button>
        <div className="video-modal__frame">
          <iframe
            src={toEmbedUrl(url)}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
