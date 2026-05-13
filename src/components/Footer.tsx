import { contacts, navItems } from "../data/content";

export function Footer() {
  return (
    <footer className="site-footer" id="contacts">
      <div className="container site-footer__inner">
        <div>
          <strong>LASERTAG</strong>
          <span>лазертаг-випускний в Івано-Франківську</span>
        </div>
        <nav aria-label="Нижня навігація">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <a href={contacts.phoneHref}>{contacts.phone}</a>
      </div>
    </footer>
  );
}
