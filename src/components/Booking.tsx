import { useState } from "react";
import type { FormEvent } from "react";
import { CalendarCheck, UsersRound } from "lucide-react";
import { booking } from "../data/content";
import { Reveal } from "./motion/Reveal";
import { trackLeadSubmit } from "../lib/analytics";

type SchoolLead = {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  school: string;
  people: string;
  date: string;
  comment: string;
  selectedPackage: string;
};

const initialForm = {
  name: "",
  phone: "",
  school: "",
  people: "",
  date: "",
  comment: "",
};

type BookingProps = {
  selectedPackage?: string;
};

export function Booking({ selectedPackage = "Top" }: BookingProps) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof typeof initialForm, string>>>({});
  const [success, setSuccess] = useState(false);

  function updateField(field: keyof typeof initialForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: Partial<Record<keyof typeof initialForm, string>> = {};

    if (!form.name.trim()) nextErrors.name = "Вкажіть імʼя";
    if (!form.phone.trim()) nextErrors.phone = "Вкажіть телефон";

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    const lead: SchoolLead = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      selectedPackage,
      ...form,
    };

    const stored = JSON.parse(localStorage.getItem("varta_school_leads") || "[]") as SchoolLead[];
    const nextLeads = [lead, ...stored];
    localStorage.setItem("varta_school_leads", JSON.stringify(nextLeads));
    if (import.meta.env.DEV) console.log("varta_school_lead", lead);
    trackLeadSubmit({ source: "booking", people: form.people || undefined });
    setSuccess(true);
    setForm(initialForm);
  }

  return (
    <section className="booking-section" id="booking">
      <div className="container booking-grid">
        <div className="booking-copy">
          <p className="eyebrow eyebrow--light">Заявка</p>
          <h2>
            <span>Забронюйте</span>
            <span>
              дату <mark>для класу</mark>
            </span>
          </h2>
          <p>{booking.text}</p>
          <div className="school-trust">
            <span />
            <span />
            <span />
            <strong>{booking.trustLine}</strong>
          </div>
          <div className="booking-mini">
            <UsersRound size={22} />
            <span>програма під клас</span>
            <CalendarCheck size={22} />
            <span>дата за домовленістю</span>
          </div>
        </div>
        <Reveal className="booking-form-wrap" delay={0.1} direction="right">
          <form className="booking-form" onSubmit={submit} noValidate>
                <div className="booking-sticker">{booking.sticker}</div>
                <div className="booking-package-summary" aria-live="polite">
                  <span>Обраний пакет</span>
                  <strong>{selectedPackage}</strong>
                </div>
                {success ? (
              <div className="success-state" role="status">
                <h3>Дякуємо!</h3>
                <p>{booking.successWarm}</p>
                <button type="button" className="button button--primary" onClick={() => setSuccess(false)}>
                  Заповнити ще раз
                </button>
              </div>
            ) : (
              <>
                <div className="form-row">
                  <label>
                    <span>{booking.fields.name}</span>
                    <input
                      type="text"
                      autoComplete="name"
                      placeholder={booking.fields.name}
                      value={form.name}
                      onChange={(event) => updateField("name", event.target.value)}
                      aria-invalid={Boolean(errors.name)}
                    />
                    {errors.name && <small>{errors.name}</small>}
                  </label>
                  <label>
                    <span>{booking.fields.phone}</span>
                    <input
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder={booking.fields.phone}
                      value={form.phone}
                      onChange={(event) => updateField("phone", event.target.value)}
                      aria-invalid={Boolean(errors.phone)}
                    />
                    {errors.phone && <small>{errors.phone}</small>}
                  </label>
                </div>
                <div className="form-row">
                  <label>
                    <span>{booking.fields.school}</span>
                    <input
                      type="text"
                      placeholder={booking.fields.school}
                      value={form.school}
                      onChange={(event) => updateField("school", event.target.value)}
                    />
                  </label>
                  <label>
                    <span>{booking.fields.people}</span>
                    <input
                      type="text"
                      placeholder={booking.fields.people}
                      value={form.people}
                      onChange={(event) => updateField("people", event.target.value)}
                    />
                  </label>
                </div>
                <label>
                  <span>{booking.fields.date}</span>
                  <input
                    type="text"
                    placeholder={booking.fields.date}
                    value={form.date}
                    onChange={(event) => updateField("date", event.target.value)}
                  />
                </label>
                <label>
                  <span>{booking.fields.comment}</span>
                  <textarea
                    placeholder={booking.fields.comment}
                    value={form.comment}
                    onChange={(event) => updateField("comment", event.target.value)}
                  />
                </label>
                <div className="reassurance">
                  {booking.reassurance.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
                <button className="button button--primary button--wide" type="submit">
                  {booking.submit}
                </button>
              </>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
