import { ArrowRight, MapPinned, Route, Truck, Wand2 } from "lucide-react";
import { outgoingGames } from "../data/content";
import type { InterestId } from "../data/content";
import { SmartImage } from "./SmartImage";
import { Reveal } from "./motion/Reveal";
import { trackCTAClick } from "../lib/analytics";

type OutgoingGamesProps = {
  onSelectInterest?: (interest: InterestId) => void;
};

const icons = [MapPinned, Truck, Wand2, Route];

export function OutgoingGames({ onSelectInterest }: OutgoingGamesProps) {
  return (
    <section className="outgoing-section poster-section" id="outgoing" aria-labelledby="outgoing-title">
      <div className="container outgoing-grid">
        <Reveal className="outgoing-photo" delay={0.05}>
          <SmartImage
            src={outgoingGames.image}
            alt="Виїзна лазертаг-гра на локації замовника"
            fallbackLabel="виїзна гра"
            loading="lazy"
            width={900}
            height={700}
          />
          <span className="outgoing-photo__tape" aria-hidden="true" />
        </Reveal>
        <div className="outgoing-copy">
          <p className="eyebrow">{outgoingGames.eyebrow}</p>
          <h2 id="outgoing-title">{outgoingGames.title}</h2>
          <p>{outgoingGames.text}</p>
          <div className="outgoing-list">
            {outgoingGames.bullets.map((item, index) => {
              const Icon = icons[index] ?? MapPinned;
              return (
                <span key={item}>
                  <Icon size={20} />
                  {item}
                </span>
              );
            })}
          </div>
          <a
            className="button button--green outgoing-cta"
            href="#booking"
            onClick={() => {
              onSelectInterest?.(outgoingGames.id);
              trackCTAClick({ place: "outgoing_game" });
            }}
          >
            {outgoingGames.cta} <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
