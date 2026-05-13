import { ArrowRight, Clock, UsersRound } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { packages, pricingIntro, pricingNote } from "../data/content";
import type { PackageId } from "../data/content";
import { trackCTAClick, trackPackageSelect } from "../lib/analytics";

type PricingProps = {
  selectedPackage?: PackageId;
  onSelectPackage?: (packageId: PackageId) => void;
};

export function Pricing({ selectedPackage = "top", onSelectPackage }: PricingProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="pricing-section poster-section" id="pricing" aria-labelledby="pricing-title">
      <div className="container">
        <div className="section-heading section-heading--split">
          <div>
            <p className="eyebrow">{pricingIntro.eyebrow}</p>
            <h2 id="pricing-title">{pricingIntro.title}</h2>
          </div>
          <p>{pricingIntro.subtitle}</p>
        </div>

        <div className="pricing-grid">
          {packages.map((item, index) => {
            const active = selectedPackage === item.id;
            return (
              <motion.article
                className={`price-card ${item.featured ? "price-card--featured" : ""} ${
                  active ? "price-card--selected" : ""
                }`}
                key={item.id}
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.42, delay: index * 0.08 }}
              >
                <div className="price-card__top">
                  <span className="price-card__number">{String(index + 1).padStart(2, "0")}</span>
                  <span className="price-card__badge">{item.badge ?? item.label}</span>
                </div>
                <h3>{item.name}</h3>
                <p className="price-card__label">{item.label}</p>
                <p className="price-card__price">
                  {item.price}
                  <small>/ {item.unit}</small>
                </p>
                <div className="price-card__meta">
                  <span>
                    <Clock size={17} />
                    {item.duration}
                  </span>
                  <span>
                    <UsersRound size={17} />
                    {item.minParticipants}
                  </span>
                </div>
                <p className="price-card__best">{item.bestFor}</p>
                <ul>
                  {item.includes.map((include) => (
                    <li key={include}>{include}</li>
                  ))}
                </ul>
                {active ? <span className="price-card__selected">Обрано для заявки</span> : null}
                <a
                  href="#booking"
                  className="price-card__cta"
                  onClick={() => {
                    onSelectPackage?.(item.id);
                    trackPackageSelect({ id: item.id, name: item.name, price: item.priceValue });
                    trackCTAClick({ place: `pricing_${item.id}` });
                  }}
                  aria-label={`Обрати пакет ${item.name}`}
                >
                  {item.cta} <ArrowRight size={18} />
                </a>
              </motion.article>
            );
          })}
        </div>
        <p className="pricing-note">{pricingNote}</p>
      </div>
    </section>
  );
}
