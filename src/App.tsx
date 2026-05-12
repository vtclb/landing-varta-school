import { BenefitsStrip } from "./components/BenefitsStrip";
import { Booking } from "./components/Booking";
import { DayRoute } from "./components/DayRoute";
import { FAQ } from "./components/FAQ";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Pricing } from "./components/Pricing";
import { ProgramDetails } from "./components/ProgramDetails";
import { StickyCTA } from "./components/StickyCTA";
import { Territory } from "./components/Territory";
import { Trust } from "./components/Trust";
import { useEffect, useState } from "react";
import { trackScrollDepth } from "./lib/analytics";

export default function App() {
  const [selectedPackage, setSelectedPackage] = useState("Top");
  const shotTarget =
    typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("shot") : null;

  useEffect(() => {
    const shotTarget = new URLSearchParams(window.location.search).get("shot");
    const selector = shotTarget ? `#${shotTarget}` : window.location.hash;
    if (!selector) return;
    [120, 550, 1200].forEach((delay) => {
      window.setTimeout(() => {
        document.querySelector(selector)?.scrollIntoView({ block: "start" });
      }, delay);
    });
  }, []);

  useEffect(() => {
    const milestones = new Set([25, 50, 75, 100]);
    const seen = new Set<number>();

    function onScroll() {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;
      const depth = Math.min(100, Math.round((window.scrollY / maxScroll) * 100));
      for (const milestone of milestones) {
        if (depth >= milestone && !seen.has(milestone)) {
          seen.add(milestone);
          trackScrollDepth({ percent: milestone });
        }
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (shotTarget === "territory") return <Territory />;
  if (shotTarget === "booking") return <Booking selectedPackage={selectedPackage} />;
  if (shotTarget === "route") return <DayRoute />;
  if (shotTarget === "benefits") return <BenefitsStrip />;
  if (shotTarget === "trust") return <Trust />;
  if (shotTarget === "pricing") return <Pricing selectedPackage={selectedPackage} onSelectPackage={setSelectedPackage} />;
  if (shotTarget === "included") return <ProgramDetails />;
  if (shotTarget === "faq") return <FAQ />;

  return (
    <>
      <Header />
      <main>
        <Hero />
        <BenefitsStrip />
        <Pricing selectedPackage={selectedPackage} onSelectPackage={setSelectedPackage} />
        <DayRoute />
        <ProgramDetails />
        <Territory />
        <Trust />
        <FAQ />
        <Booking selectedPackage={selectedPackage} />
      </main>
      <Footer />
      <StickyCTA />
    </>
  );
}
