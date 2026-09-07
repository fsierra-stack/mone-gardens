"use client";

import { useState } from "react";
import Image from "next/image";
import SiteHeader from "@/components/SiteHeader";
import NavDrawer from "@/components/NavDrawer";
import UnitDetailModal from "@/components/UnitDetailModal";
import { getUnits, formatPriceLabel, type UnitRow, type Unit } from "@/lib/units";
import styles from "./page.module.css";

function tagStyle(unit: Unit) {
  if (unit.status === "vendido") {
    return { color: "var(--danger-text)", bg: "rgba(196,60,44,0.24)", border: "rgba(255,150,135,0.45)" };
  }
  if (unit.status === "reservado") {
    return { color: "var(--amber-text)", bg: "rgba(223,166,8,0.2)", border: "rgba(240,192,42,0.5)" };
  }
  return { color: "#BFF3D0", bg: "rgba(48,150,96,0.24)", border: "rgba(140,230,175,0.4)" };
}

function priceColor(unit: Unit) {
  if (unit.status === "vendido") return "rgba(255,253,248,0.55)";
  if (unit.status === "reservado") return "var(--amber-text)";
  return "var(--gold-bright)";
}

export default function UnidadesPage() {
  const [section, setSection] = useState<UnitRow>("A");
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [navOpen, setNavOpen] = useState(false);

  const all = getUnits(section);
  const shown = onlyAvailable ? all.filter((u) => u.status === "disponible") : all;
  const availableCount = all.filter((u) => u.status === "disponible").length;

  return (
    <div className={styles.page}>
      <Image src="/images/mone-aerea-plan.png" alt="" aria-hidden="true" fill className={styles.bg} />
      <div className={styles.bgOverlay} aria-hidden="true" />

      <SiteHeader
        onOpenNav={() => setNavOpen(true)}
        backHref="/vista-general"
        backLabel="Volver a la vista general"
        breadcrumb={{ rootLabel: "Recorrido virtual", rootHref: "/vista-general", currentLabel: "Unidades disponibles", separator: "·" }}
      />

      <main className={styles.main}>
        <div className={styles.topRow}>
          <div>
            <h1 className={styles.title}>Unidades disponibles</h1>
            <p className={styles.summary}>
              Sección {section} · {availableCount} de 16 disponibles
            </p>
          </div>

          <div className={styles.controls}>
            <div className={styles.segment}>
              {(["A", "B"] as UnitRow[]).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    setSection(s);
                    setSelected(null);
                  }}
                  className={`${styles.segmentBtn} ${section === s ? styles.segmentActive : styles.segmentInactive}`}
                >
                  Sección {s}
                </button>
              ))}
            </div>
            <div className={styles.segment}>
              {[
                { label: "Mostrar todas", val: false },
                { label: "Solo disponibles", val: true },
              ].map((f) => (
                <button
                  key={f.label}
                  type="button"
                  onClick={() => setOnlyAvailable(f.val)}
                  className={`${styles.segmentBtn} ${styles["segmentBtn--filter"]} ${
                    onlyAvailable === f.val ? styles.filterActive : styles.segmentInactive
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.grid}>
          {shown.map((u) => {
            const tag = tagStyle(u);
            const available = u.status === "disponible";
            return (
              <button
                key={u.code}
                type="button"
                onClick={() => setSelected(u.code)}
                aria-label={`Ver detalle de la casa ${u.code}`}
                className={`${styles.card} ${available ? styles.cardAvailable : styles.cardTaken}`}
              >
                <div className={styles.cardHead}>
                  <span className={styles.cardCode}>{u.code}</span>
                  <span
                    className={styles.cardTag}
                    style={{ color: tag.color, background: tag.bg, borderColor: tag.border }}
                  >
                    {u.status === "vendido" ? "Vendido" : u.status === "reservado" ? "Reservado" : "Disponible"}
                  </span>
                </div>
                <span className={styles.cardPrice} style={{ color: priceColor(u) }}>
                  {formatPriceLabel(u)}
                </span>
                <span className={styles.cardChips}>
                  <span className={styles.cardChip}>{u.totalArea.toFixed(2)} m² tot.</span>
                  <span className={styles.cardChip}>patio {u.exteriorArea.toFixed(2)} m²</span>
                </span>
              </button>
            );
          })}
        </div>

        <p className={styles.disclaimer}>
          Precios de referencia en dólares, sujetos a cambio sin previo aviso. Áreas de construcción según planos
          aprobados.
        </p>
      </main>

      <UnitDetailModal code={selected} onClose={() => setSelected(null)} />
      <NavDrawer open={navOpen} onClose={() => setNavOpen(false)} />
    </div>
  );
}
