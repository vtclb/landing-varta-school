import { Quote, ShieldCheck } from "lucide-react";
import { safety, trust } from "../data/content";
import { assets } from "../data/assets";
import { SmartImage } from "./SmartImage";
import { Reveal } from "./motion/Reveal";

export function Trust() {
  return (
    <section className="quote-band" id="trust" aria-labelledby="trust-title">
      <div className="container quote-band__grid">
        <div className="quote-copy">
          <p className="eyebrow">Важливо</p>
          <h2 id="trust-title">Важливо для батьків і вчителів</h2>
          <blockquote>
            <Quote size={42} />
            <p>{trust.quote}</p>
            <cite>— {trust.quoteAuthor}</cite>
          </blockquote>
        </div>
        <Reveal className="quote-player" delay={0.1}>
          <SmartImage
            src={assets.quotePlayer}
            alt="Школярі після активної лазертаг-програми"
            fallbackLabel="реальні емоції"
            loading="lazy"
            width={900}
            height={600}
          />
        </Reveal>
        <div className="quote-stats safety-list">
          {safety.map((item, index) => (
            <Reveal className="quote-stat-reveal" delay={index * 0.06} key={item.title}>
              <article>
                <ShieldCheck size={22} />
                <strong>{item.title}</strong>
                <span>{item.text}</span>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
