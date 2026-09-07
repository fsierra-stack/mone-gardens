import SimplePageShell from "@/components/SimplePageShell";
import { CONTACT_EMAIL, INSTAGRAM_HANDLE, INSTAGRAM_URL, WEBSITE_URL, WHATSAPP_URL } from "@/lib/constants";

export const metadata = {
  title: "Contacto · Moné Gardens",
};

export default function ContactoPage() {
  return (
    <SimplePageShell eyebrow="Hablemos" title="Contacto" breadcrumbCurrent="Contacto">
      <p className="page-body">
        Moné Gardens es comercializado por MIACASA. Escríbenos por cualquiera de estos canales y coordinamos tu
        visita o resolvemos tus dudas sobre unidades disponibles y plan de pagos.
      </p>

      <ul className="contact-list">
        <li className="contact-row">
          <span className="contact-label">Correo</span>
          <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "var(--gold-bright)" }}>
            {CONTACT_EMAIL}
          </a>
        </li>
        <li className="contact-row">
          <span className="contact-label">Instagram</span>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener" style={{ color: "var(--gold-bright)" }}>
            {INSTAGRAM_HANDLE}
          </a>
        </li>
        <li className="contact-row">
          <span className="contact-label">Web</span>
          <a href={WEBSITE_URL} target="_blank" rel="noopener" style={{ color: "var(--gold-bright)" }}>
            {WEBSITE_URL.replace("https://", "")}
          </a>
        </li>
      </ul>

      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener"
        className="btn btn-gold"
        style={{ minHeight: 56, padding: "0 28px", fontSize: 14, alignSelf: "flex-start" }}
      >
        Escríbenos por WhatsApp
      </a>
    </SimplePageShell>
  );
}
