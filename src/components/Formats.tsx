import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { formats } from "../data/content";
import { HandArrow } from "./decorative/HandArrow";
import { SmartImage } from "./SmartImage";

export function Formats() {
  return (
    <section className="section formats-section" id="programs">
      <div className="container">
        <div className="section-heading section-heading--split">
          <div>
            <p className="eyebrow">Програми</p>
            <h2>Оберіть свій формат</h2>
          </div>
          <p>
            Три зрозумілі сценарії для школи, класу або дитячого свята. Деталі адаптуємо під
            вік і кількість учасників.
          </p>
        </div>
        <div className="format-grid">
          {formats.map((format, index) => (
            <motion.a
              href="#booking"
              className={`format-card ${index === 0 ? "format-card--featured" : ""}`}
              key={format.title}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 240, damping: 18 }}
            >
              <div className={`format-photo format-photo--${index + 1}`}>
                <SmartImage src={format.image} alt={format.title} fallbackLabel={format.fallback} />
                <span>{format.number}</span>
                {"label" in format && format.label ? <em>{format.label}</em> : null}
              </div>
              <div className="format-body">
                <h3>{format.title}</h3>
                <small>{format.meta}</small>
                <p>{format.description}</p>
                <span className="format-link">
                  Обговорити формат <ArrowUpRight size={20} />
                </span>
              </div>
            </motion.a>
          ))}
        </div>
        <HandArrow className="formats-arrow" />
      </div>
    </section>
  );
}
