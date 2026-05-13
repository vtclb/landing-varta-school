import { useState } from "react";
import { Camera, MapPin, PlayCircle } from "lucide-react";
import { territory } from "../data/content";
import { assets } from "../data/assets";
import { media } from "../data/media";
import { SmartImage } from "./SmartImage";
import { VideoModal } from "./media/VideoModal";
import { Reveal } from "./motion/Reveal";
import { trackCTAClick, trackVideoOpen } from "../lib/analytics";

export function Territory() {
  const [open, setOpen] = useState(false);

  return (
    <section className="section territory-section" id="territory">
      <div className="container territory-layout">
        <div className="territory-copy">
          <p className="eyebrow">{territory.title}</p>
          <h2>{territory.headline}</h2>
          <p>{territory.text}</p>
          <ul className="territory-highlights">
            {territory.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="territory-actions">
            <a className="button button--primary" href="#booking" onClick={() => trackCTAClick({ place: "territory" })}>
              {territory.cta} →
            </a>
            <button
              className="territory-video-link"
              type="button"
              onClick={() => {
                trackVideoOpen({ place: "tournament_example" });
                setOpen(true);
              }}
            >
              <PlayCircle size={20} />
              {territory.videoCta}
            </button>
          </div>
        </div>
        <div className="territory-collage" aria-label="Фото території">
          <Reveal className="panorama" delay={0.05}>
            <SmartImage
              src={assets.territoryMain}
              alt="Ігровий майданчик просто неба"
              fallbackLabel="майданчик просто неба"
              loading="lazy"
              width={1500}
              height={1000}
            />
            <div className="panorama-caption">
              <MapPin size={30} />
              <span>ігровий майданчик просто неба</span>
            </div>
          </Reveal>
          {territory.images.slice(0, 2).map((item, index) => (
            <Reveal className={`polaroid polaroid--${index + 1}`} delay={0.12 + index * 0.08} key={item.label}>
              <figure>
                <div>
                  <SmartImage
                    src={item.image}
                    alt={item.label}
                    fallbackLabel={item.label}
                    loading="lazy"
                    width={900}
                    height={600}
                  />
                  <Camera size={22} />
                </div>
                <figcaption>{item.label}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
      <VideoModal open={open} url={media.youtube[1]} title="Приклад турнірного формату" onClose={() => setOpen(false)} />
    </section>
  );
}
