import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { hero } from "../data/content";
import { assets } from "../data/assets";
import { SmartImage } from "./SmartImage";
import { trackCTAClick } from "../lib/analytics";

const lineVariants: Variants = {
  hidden: { y: 22, opacity: 0 },
  visible: (index: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.42, delay: 0.06 + index * 0.06, ease: "easeOut" },
  }),
};

export function Hero() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const brushY = useTransform(scrollYProgress, [0, 0.22], [0, -10]);
  const initial = reduceMotion ? false : "hidden";
  const animate = reduceMotion ? undefined : "visible";
  const titleLines = ["Випускний,", "який клас", "запамʼятає"];

  return (
    <section className="hero-poster hero-poster--clean paper-bg" id="top">
      <div className="container hero-poster__grid">
        <motion.div className="hero-poster__copy" initial={initial} animate={animate}>
          <motion.p className="hero-kicker" variants={lineVariants} custom={0}>
            <Sparkles size={18} />
            {hero.label}
          </motion.p>
          <h1 className="hero-title-skew">
            {titleLines.map((line, index) => (
              <motion.span key={line} variants={lineVariants} custom={index + 1}>
                {line}
              </motion.span>
            ))}
          </h1>
          <motion.p className="hero-poster__subtitle" variants={lineVariants} custom={4}>
            {hero.subtitle}
          </motion.p>
          <motion.div className="hero-poster__actions" variants={lineVariants} custom={5}>
            <a className="button button--green" href="#booking" onClick={() => trackCTAClick({ place: "hero_primary" })}>
              {hero.primaryCta} <ArrowRight size={18} />
            </a>
            <a className="learn-link" href="#pricing" onClick={() => trackCTAClick({ place: "hero_secondary" })}>
              {hero.secondaryCta}
            </a>
          </motion.div>
          <motion.ul className="hero-poster__proof hero-poster__proof--desktop" variants={lineVariants} custom={6}>
            {hero.proof.map((item) => (
              <li key={item}>
                <CheckCircle2 size={22} />
                {item}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div
          className="hero-clean-photo"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.98, y: 20 }}
          animate={reduceMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.58, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="hero-clean-photo__brush"
            aria-hidden="true"
            style={reduceMotion ? undefined : { y: brushY }}
          />
          <div className="hero-clean-photo__image">
            <SmartImage
              src={assets.heroGroup}
              alt="Школярі на лазертагу під час активної програми"
              fallbackLabel="фото класу"
              loading="eager"
              fetchPriority="high"
              width={1600}
              height={1229}
            />
          </div>
          <div className="hero-clean-photo__caption">
            <strong>Живі емоції</strong>
            <span>гра, команда і відпочинок після активної частини</span>
          </div>
        </motion.div>

        <ul className="hero-poster__proof hero-poster__proof--mobile">
          {hero.proof.map((item) => (
            <li key={item}>
              <CheckCircle2 size={22} />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
