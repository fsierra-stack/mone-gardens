"use client";

import { useState } from "react";
import Image from "next/image";
import { getUnit, formatPriceLabel } from "@/lib/units";
import { HAUZD_TOUR_URL, WHATSAPP_URL } from "@/lib/constants";
import { useEscapeKey } from "@/lib/useEscapeKey";
import styles from "./UnitDetailModal.module.css";

type TabKey = "baja" | "alta" | "exterior";

const TABS: { key: TabKey; label: string; title: string; hasImg: boolean }[] = [
  { key: "baja", label: "Planta baja", title: "Planta baja", hasImg: false },
  { key: "alta", label: "Planta alta", title: "Planta alta", hasImg: false },
  { key: "exterior", label: "Exterior", title: "Exterior", hasImg: true },
];

interface UnitDetailModalProps {
  code: string | null;
  onClose: () => void;
}

export default function UnitDetailModal({ code, onClose }: UnitDetailModalProps) {
  const [tab, setTab] = useState<TabKey>("baja");
  const [lastCode, setLastCode] = useState(code);
  const open = code !== null;

  // Reset to the first tab whenever a different unit is opened. Adjusting
  // state during render (rather than in an effect) avoids an extra paint.
  if (code !== lastCode) {
    setLastCode(code);
    setTab("baja");
  }

  useEscapeKey(onClose, open);

  const unit = code ? getUnit(code) : undefined;
  const view = TABS.find((t) => t.key === tab)!;

  let statusColor = "var(--gold-bright)";
  let statusBg = "rgba(240,192,42,0.14)";
  let statusBorder = "rgba(240,192,42,0.45)";
  if (unit?.status === "vendido") {
    statusColor = "var(--danger-text)";
    statusBg = "rgba(196,60,44,0.24)";
    statusBorder = "rgba(255,150,135,0.45)";
  } else if (unit?.status === "reservado") {
    statusColor = "var(--amber-text)";
    statusBg = "rgba(223,166,8,0.2)";
    statusBorder = "rgba(240,192,42,0.5)";
  }

  return (
    <div
      className={`${styles.overlay} ${open ? styles["overlay--open"] : styles["overlay--closed"]}`}
      onClick={onClose}
      aria-hidden={!open}
    >
      <div
        className={`${styles.card} ${open ? styles["card--open"] : styles["card--closed"]}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.head}>
          <p className={styles.title}>Casa {unit?.code ?? "—"}</p>
          <p
            className={styles.statusPill}
            style={{ color: statusColor, background: statusBg, borderColor: statusBorder }}
          >
            {unit ? formatPriceLabel(unit) : ""}
          </p>
          <button type="button" onClick={onClose} aria-label="Cerrar" className={styles.closeBtn}>
            ✕
          </button>
        </div>

        <div className={styles.tabs}>
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className={`${styles.tab} ${tab === t.key ? styles.tabActive : styles.tabInactive}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className={styles.viewBox}>
          <Image
            src="/images/casa-05-patio.jpg"
            alt={`${view.title} de la casa ${unit?.code ?? ""}`}
            fill
            sizes="430px"
            className={styles.viewImg}
            style={{ opacity: view.hasImg ? 1 : 0 }}
          />
          <div className={styles.viewNote} style={{ opacity: view.hasImg ? 0 : 1 }}>
            <p className={styles.viewNoteTitle}>{view.title}</p>
            <p className={styles.viewNoteSub}>Plano 3D pendiente de carga</p>
          </div>
          <p className={styles.viewCaption} style={{ opacity: view.hasImg ? 1 : 0 }}>
            {view.title}
          </p>
        </div>

        <div className={styles.stats}>
          <div className={styles.statsHead}>
            <span className={styles.statsIcon}>m²</span>
            <p className={styles.statsTotal}>{unit?.totalArea.toFixed(2) ?? "—"}</p>
          </div>
          <div className={styles.chips}>
            <span className={styles.chip}>Área int. {unit?.interiorArea.toFixed(2)} m²</span>
            <span className={styles.chip}>Área ext. {unit?.exteriorArea.toFixed(2)} m²</span>
            <span className={styles.chip}>Parqueaderos: {unit?.parkingSpots ?? 2}</span>
          </div>
        </div>

        {unit && unit.status !== "vendido" && (
          <div className={styles.actions} style={{ display: "flex" }}>
            <a
              href={HAUZD_TOUR_URL}
              target="_blank"
              rel="noopener"
              className={`btn btn-gold ${styles.ctaGold}`}
            >
              <span>Ver recorrido 3D</span>
              <span style={{ fontSize: 15 }}>↗</span>
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener"
              className={`btn btn-dashed ${styles.ctaDashed}`}
            >
              Solicitar cotización
            </a>
          </div>
        )}

        {unit?.status === "vendido" && <p className={styles.soldNotice}>Unidad no disponible</p>}
      </div>
    </div>
  );
}
