import { useEffect, useState } from "react";

export function StickyCTA() {
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const booking = document.getElementById("booking");
    const hero = document.getElementById("top");
    const route = document.getElementById("route");
    const territory = document.getElementById("territory");
    if (!booking || !hero) return undefined;

    const state = { booking: false, hero: true, route: false, territory: false };
    const update = () => setHidden(state.booking || state.hero || state.route || state.territory);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target === booking) state.booking = entry.isIntersecting;
          if (entry.target === hero) state.hero = entry.isIntersecting;
          if (entry.target === route) state.route = entry.isIntersecting;
          if (entry.target === territory) state.territory = entry.isIntersecting;
        }
        update();
      },
      { rootMargin: "0px 0px -18% 0px", threshold: 0.08 },
    );
    observer.observe(booking);
    observer.observe(hero);
    if (route) observer.observe(route);
    if (territory) observer.observe(territory);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="sticky-cta" aria-label="Швидка дія" data-hidden={hidden}>
      <a href="#booking">Підібрати програму</a>
    </div>
  );
}
