import SimplePageShell from "@/components/SimplePageShell";

export const metadata = {
  title: "Ubicación · Moné Gardens",
};

const MAP_QUERY = encodeURIComponent("Av. Oswaldo Guayasamín, Tumbaco, Quito, Ecuador");
const REFERENCES = [
  "MegaKywi",
  "Supermaxi",
  "La Martina Plaza",
  "Farmacia Medicity",
  "Colegio internacional",
  "15 min al aeropuerto",
];

export default function UbicacionPage() {
  return (
    <SimplePageShell eyebrow="Sector Tumbaco" title="Ubicación" breadcrumbCurrent="Ubicación">
      <p className="page-body">
        Moné Gardens está cerca de la Av. Oswaldo Guayasamín / Ruta Viva, en el sector de Tumbaco.
      </p>

      <div className="map-frame">
        <iframe
          src={`https://www.google.com/maps?q=${MAP_QUERY}&output=embed`}
          title="Mapa de ubicación de Moné Gardens"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <ul className="ref-list">
        {REFERENCES.map((ref) => (
          <li key={ref} className="ref-chip">
            {ref}
          </li>
        ))}
      </ul>
    </SimplePageShell>
  );
}
