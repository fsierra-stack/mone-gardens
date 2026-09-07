import SimplePageShell from "@/components/SimplePageShell";
import { CONTACT_EMAIL } from "@/lib/constants";

export const metadata = {
  title: "Presentación · Moné Gardens",
};

export default function PresentacionPage() {
  return (
    <SimplePageShell eyebrow="Material del proyecto" title="Presentación" breadcrumbCurrent="Presentación">
      <p className="page-body">
        El brochure completo de Moné Gardens (plantas, especificaciones y plan de pagos) está en preparación para
        descarga directa desde aquí.
      </p>
      <p className="page-body">
        Mientras tanto, escríbenos a{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "var(--gold-bright)" }}>
          {CONTACT_EMAIL}
        </a>{" "}
        y te lo enviamos directamente.
      </p>
      <span className="coming-soon-badge">Próximamente</span>
    </SimplePageShell>
  );
}
