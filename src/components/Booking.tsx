import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { CalendarCheck, UsersRound } from "lucide-react";
import { booking, packages } from "../data/content";
import type { GraduationPackage, PackageId } from "../data/content";
import { Reveal } from "./motion/Reveal";
import { trackLeadSubmit } from "../lib/analytics";

type StoredPackage = Pick<GraduationPackage, "id" | "name" | "price" | "duration" | "minParticipants">;

type SchoolLead = {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  schoolClass: string;
  participants: string;
  date: string;
  comment: string;
  selectedPackage: StoredPackage;
};

const initialForm = {
  name: "",
  phone: "",
  schoolClass: "",
  participants: "",
  date: "",
  comment: "",
};

type BookingProps = {
  selectedPackage?: PackageId;
};

export function Booking({ selectedPackage = "top" }: BookingProps) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof typeof initialForm, string>>>({});
  const [success, setSuccess] = useState(false);

  const packageData = useMemo(
    () => packages.find((item) => item.id === selectedPackage) ?? packages.find((item) => item.id === "top") ?? packages[0],
    [selectedPackage],
  );

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

    const storedPackage: StoredPackage = {
      id: packageData.id,
      name: packageData.name,
      price: packageData.price,
      duration: packageData.duration,
      minParticipants: packageData.minParticipants,
    };

    const lead: SchoolLead = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      selectedPackage: storedPackage,
      ...form,
    };

    const stored = JSON.parse(localStorage.getItem("varta_school_leads") || "[]") as SchoolLead[];
    const nextLeads = [lead, ...stored];
    localStorage.setItem("varta_school_leads", JSON.stringify(nextLeads));
    if (import.meta.env.DEV) console.log("varta_school_lead", lead);
    trackLeadSubmit({
      source: "booking",
      participants: form.participants || undefined,
      packageId: storedPackage.id,
      packagePrice: packageData.priceValue,
    });
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
            <span>пакет під клас</span>
            <CalendarCheck size={22} />
            <span>дата за домовленістю</span>
          </div>
        </div>
        <Reveal className="booking-form-wrap" delay={0.1} direction="right">
          <form className="booking-form" onSubmit={submit} noValidate>
            <div className="booking-sticker">{booking.sticker}</div>
            <div className="booking-package-summary" aria-live="polite">
              <span>Обраний пакет</span>
              <strong>
                {packageData.name} — {packageData.price} / {packageData.unit}
              </strong>
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
                      value={form.schoolClass}
                      onChange={(event) => updateField("schoolClass", event.target.value)}
                    />
                  </label>
                  <label>
                    <span>{booking.fields.people}</span>
                    <input
                      type="text"
                      placeholder={booking.fields.people}
                      value={form.participants}
                      onChange={(event) => updateField("participants", event.target.value)}
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
