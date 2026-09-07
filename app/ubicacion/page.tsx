import SimplePageShell from "@/components/SimplePageShell";
import { GOOGLE_MAPS_URL, PROJECT_LAT, PROJECT_LNG } from "@/lib/constants";

export const metadata = {
  title: "Ubicación · Moné Gardens",
};

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
          src={`https://www.google.com/maps?q=${PROJECT_LAT},${PROJECT_LNG}&z=16&output=embed`}
          title="Mapa de ubicación de Moné Gardens"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <a
        href={GOOGLE_MAPS_URL}
        target="_blank"
        rel="noopener"
        className="btn btn-outline-gold"
        style={{ minHeight: 48, padding: "0 24px", fontSize: 13, alignSelf: "flex-start" }}
      >
        Abrir en Google Maps
      </a>

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
