import { motion, useReducedMotion } from "framer-motion";
import { Camera, MapPinned, ShieldCheck, Trees, UsersRound } from "lucide-react";
import { benefits } from "../data/content";

const icons = [Trees, UsersRound, Camera, MapPinned, ShieldCheck];

export function BenefitsStrip() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="benefits-band benefit-ribbon" id="benefits" aria-labelledby="benefits-title">
      <div className="container">
        <motion.h2
          id="benefits-title"
          initial={reduceMotion ? false : { opacity: 0, rotate: -7, y: 18 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, rotate: -5, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.45 }}
        >
          <span>Що отримує</span>
          <span>ваш клас</span>
        </motion.h2>
        <div className="benefits-list">
          {benefits.map((item, index) => {
            const Icon = icons[index] ?? ShieldCheck;
            return (
              <motion.div
                className="benefit-item"
                key={item}
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{ duration: 0.38, delay: index * 0.05 }}
              >
                <strong>{String(index + 1).padStart(2, "0")}</strong>
                <Icon size={26} />
                <span>{item}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
