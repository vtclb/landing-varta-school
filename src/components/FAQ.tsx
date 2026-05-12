import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faq } from "../data/content";

export function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section className="faq-section poster-section" id="faq" aria-labelledby="faq-title">
      <div className="container faq-layout">
        <div className="faq-intro">
          <p className="eyebrow">FAQ</p>
          <h2 id="faq-title">
            Часті питання
            <span> перед бронюванням</span>
          </h2>
          <p>
            Коротко про вік, безпеку, тривалість, кількість дітей і зону відпочинку.
            Деталі програми уточнимо після заявки.
          </p>
        </div>
        <div className="faq-list">
          {faq.map((item, index) => {
            const active = open === index;
            return (
              <button
                className={`faq-item ${active ? "faq-item--open" : ""}`}
                key={item.question}
                type="button"
                onClick={() => setOpen(active ? -1 : index)}
                aria-expanded={active}
              >
                <span className="faq-item__question">
                  {item.question}
                  <ChevronDown size={20} />
                </span>
                {active ? <span className="faq-item__answer">{item.answer}</span> : null}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
