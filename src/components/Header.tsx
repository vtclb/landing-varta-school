import { contacts, navItems } from "../data/content";
import { trackCTAClick } from "../lib/analytics";

export function Header() {
  return (
    <header className="site-header poster-header">
      <a className="brand" href="#top" aria-label="LASERTAG в Івано-Франківську">
        <img
          src={contacts.logo}
          alt="LASERTAG"
          className="brand__logo"
          width={142}
          height={34}
          onLoad={(event) => {
            const fallback = event.currentTarget.nextElementSibling as HTMLElement | null;
            if (fallback) fallback.style.display = "none";
          }}
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
        />
        <span className="brand__fallback">LASERTAG</span>
        <span className="brand__city">в Івано-Франківську</span>
      </a>
      <nav className="header-nav" aria-label="Головна навігація">
        {navItems.map((item) => (
          <a key={`${item.label}-${item.href}`} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
      <a className="header-cta" href="#booking" onClick={() => trackCTAClick({ place: "header" })}>
        Забронювати дату →
      </a>
    </header>
  );
}
