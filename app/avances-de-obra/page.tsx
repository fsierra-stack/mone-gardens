import SimplePageShell from "@/components/SimplePageShell";

export const metadata = {
  title: "Avances de obra · Moné Gardens",
};

export default function AvancesDeObraPage() {
  return (
    <SimplePageShell eyebrow="Construcción" title="Avances de obra" breadcrumbCurrent="Avances de obra">
      <p className="page-body">
        La obra de Moné Gardens aún no ha iniciado — esta sección mostrará el avance de construcción, con fotos
        actualizadas periódicamente, en cuanto comience.
      </p>
      <p className="page-body">Entrega estimada: agosto y noviembre de 2027, por etapas.</p>
      <span className="coming-soon-badge">Próximamente</span>
    </SimplePageShell>
  );
}
