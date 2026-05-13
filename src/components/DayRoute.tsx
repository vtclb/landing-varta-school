import { Camera, Flag, ShieldCheck, Target, UsersRound, Waves } from "lucide-react";
import { daySteps } from "../data/content";
import { RouteLine } from "./decorative/RouteLine";
import { HandArrow } from "./decorative/HandArrow";
import { Reveal } from "./motion/Reveal";

const icons = [UsersRound, ShieldCheck, Waves, Target, Target, Camera, Flag];

export function DayRoute() {
  return (
    <section className="section route-section" id="route">
      <div className="container route-layout">
        <div className="route-title-block">
          <p className="eyebrow">Як проходить програма</p>
          <h2>
            <span>Як проходить</span>
            <mark>лазертаг-випускний</mark>
          </h2>
          <p className="route-subtitle">
            Клас проходить зрозумілий сценарій: від інструктажу і команд до лазертаг-гри, фіналу та відпочинку
            відповідно до обраного пакета.
          </p>
          <HandArrow className="route-title-arrow" />
        </div>
        <div className="route-board">
          <RouteLine />
          <div className="route-steps">
            {daySteps.map((step, index) => {
              const Icon = icons[index] ?? Target;
              return (
                <Reveal key={step.title} delay={index * 0.08} className="route-step-reveal">
                  <article className="route-step">
                    <span className="route-number">{index + 1}</span>
                    <Icon size={28} />
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
