import { ArrowRight, Clock, UsersRound } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { packages, pricingNote } from "../data/content";
import { trackCTAClick } from "../lib/analytics";

type PricingProps = {
  selectedPackage?: string;
  onSelectPackage?: (packageName: string) => void;
};

export function Pricing({ selectedPackage = "Top", onSelectPackage }: PricingProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="pricing-section poster-section" id="pricing" aria-labelledby="pricing-title">
      <div className="container">
        <div className="section-heading section-heading--split">
          <div>
            <p className="eyebrow">Пакети та ціни</p>
            <h2 id="pricing-title">
              Пакети для
              <span> шкільного випускного</span>
            </h2>
          </div>
          <p>
            Оберіть базовий формат, розширену програму або максимальний активний день.
            Фінальну вартість підтверджуємо після кількості дітей і побажань класу.
          </p>
        </div>

        <div className="pricing-grid">
          {packages.map((item, index) => (
            <motion.article
              className={`price-card ${item.featured ? "price-card--featured" : ""} ${
                selectedPackage === item.name ? "price-card--selected" : ""
              }`}
              key={item.name}
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.42, delay: index * 0.08 }}
            >
              <div className="price-card__top">
                <span className="price-card__number">{String(index + 1).padStart(2, "0")}</span>
                <span className="price-card__badge">{item.badge}</span>
              </div>
              <h3>{item.name}</h3>
              <p className="price-card__price">
                {item.price}
                <small>{item.unit}</small>
              </p>
              <div className="price-card__meta">
                <span>
                  <Clock size={17} />
                  {item.duration}
                </span>
                <span>
                  <UsersRound size={17} />
                  {item.bestFor}
                </span>
              </div>
              <ul>
                {item.includes.map((include) => (
                  <li key={include}>{include}</li>
                ))}
              </ul>
              {selectedPackage === item.name ? <span className="price-card__selected">Обрано для заявки</span> : null}
              <a
                href="#booking"
                className="price-card__cta"
                onClick={() => {
                  onSelectPackage?.(item.name);
                  trackCTAClick({ place: `pricing_${item.name}` });
                }}
                aria-label={`Обрати пакет ${item.name}`}
              >
                Обрати пакет <ArrowRight size={18} />
              </a>
            </motion.article>
          ))}
        </div>
        <p className="pricing-note">{pricingNote}</p>
      </div>
    </section>
  );
}
