import { Camera, CheckCircle2, MapPinned, ShieldCheck, Sparkles, UsersRound } from "lucide-react";
import { audience, included } from "../data/content";

const includeIcons = [ShieldCheck, UsersRound, Sparkles, CheckCircle2, Camera, MapPinned, Sparkles, CheckCircle2];

export function ProgramDetails() {
  return (
    <section className="program-details poster-section" id="included" aria-labelledby="included-title">
      <div className="container program-details__grid">
        <div className="included-panel">
          <p className="eyebrow">Що входить</p>
          <h2 id="included-title">
            За що платить
            <span> клас</span>
          </h2>
          <p>
            Це не просто “побігати з обладнанням”. Ми збираємо активний сценарій:
            від інструктажу до фіналу, фото і відпочинку після гри.
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
            Якщо не впевнені, який формат обрати, залиште заявку — підкажемо програму
            під вік, кількість дітей і бажану дату.
          </p>
        </aside>
      </div>
    </section>
  );
}
