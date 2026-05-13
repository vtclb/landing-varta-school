import { Camera, CheckCircle2, MapPinned, ShieldCheck, Sparkles, Target, UsersRound } from "lucide-react";
import { audience, included } from "../data/content";

const includeIcons = [
  ShieldCheck,
  UsersRound,
  Sparkles,
  Target,
  Target,
  Target,
  CheckCircle2,
  MapPinned,
  Camera,
  Sparkles,
];

export function ProgramDetails() {
  return (
    <section className="program-details poster-section" id="included" aria-labelledby="included-title">
      <div className="container program-details__grid">
        <div className="included-panel">
          <p className="eyebrow">Що входить</p>
          <h2 id="included-title">
            Що входить
            <span> у програму</span>
          </h2>
          <p>
            Тут зібрані елементи програми за пакетами. Частина активностей входить тільки у Топ / Максимум,
            тому під час заявки ми допоможемо підібрати формат без зайвих обіцянок.
          </p>
          <div className="included-list">
            {included.map((item, index) => {
              const Icon = includeIcons[index] ?? CheckCircle2;
              return (
                <div className="included-item" key={item}>
                  <Icon size={22} />
                  <span>{item}</span>
                </div>
              );
            })}
          </div>
        </div>

        <aside className="audience-panel" id="audience" aria-labelledby="audience-title">
          <div className="paper-label">
            <span>Підійде</span>
            <span>для</span>
          </div>
          <h3 id="audience-title">Швидко зрозуміти, чи це ваш формат</h3>
          <div className="audience-tags">
            {audience.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <p>
            Якщо не впевнені, який пакет обрати, залиште заявку. Ми підкажемо програму під вік, кількість дітей,
            бюджет, бажану дату і формат локації.
          </p>
        </aside>
      </div>
    </section>
  );
}
