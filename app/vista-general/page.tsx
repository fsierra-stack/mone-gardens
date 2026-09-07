"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import NavDrawer from "@/components/NavDrawer";
import UnitDetailModal from "@/components/UnitDetailModal";
import GalleryModal from "@/components/GalleryModal";
import type { AmenityKey } from "@/lib/amenities";
import { HAUZD_TOUR_URL } from "@/lib/constants";
import styles from "./page.module.css";

const RATIO = 1672 / 940;

interface HouseSpot {
  id: string;
  row: "A" | "B";
  idx: number;
  x: number;
  y: number;
}

function buildRow(letter: "A" | "B", y: number, x0: number, x1: number): HouseSpot[] {
  const out: HouseSpot[] = [];
  for (let i = 0; i < 16; i++) {
    out.push({
      id: `${letter}${String(i + 1).padStart(2, "0")}`,
      row: letter,
      idx: i,
      x: Number((x0 + ((x1 - x0) * i) / 15).toFixed(2)),
      y,
    });
  }
  return out;
}

// Straight horizontal rows, one marker per roof, numbered per the
// implantación plan: 01 nearest the entrance (right), 16 at the far end.
// Fila A sits on the lower row, Fila B on the upper row.
const HOUSES = [...buildRow("A", 68.6, 78.4, 7.45), ...buildRow("B", 31.4, 78.4, 7.45)];

export default function VistaGeneralPage() {
  const [navOpen, setNavOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [gallery, setGallery] = useState<AmenityKey | null>(null);
  const [box, setBox] = useState({ w: 0, h: 0 });
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mapRef.current;
    if (!el) return;
    const measure = () => {
      const r = el.getBoundingClientRect();
      const pad = parseFloat(getComputedStyle(el).paddingLeft) || 0;
      const w = Math.max(0, r.width - pad * 2);
      const h = Math.max(0, r.height);
      setBox((prev) => (prev.w === w && prev.h === h ? prev : { w, h }));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  let planW = 0;
  let planH = 0;
  if (box.w > 0 && box.h > 0) {
    planW = Math.min(box.w, box.h * RATIO);
    planH = planW / RATIO;
  }
  // One house every 4.73% of the plan width — size the marker to that
  // spacing so the numerals scale with the map instead of hitting a floor.
  const spacing = planW * 0.0473;
  const dotSize = planW ? Math.max(26, Math.min(48, spacing * 0.94)) : 30;
  const dotFont = Math.max(13, Math.round(dotSize * 0.5));

  const selectedUnit = HOUSES.find((h) => h.id === selected);
  const selectedLabel = selectedUnit
    ? `Casa ${selectedUnit.row} ${String(selectedUnit.idx + 1).padStart(2, "0")}`
    : "Toca una casa en el plano";

  return (
    <div className={styles.page}>
      <Image src="/images/mone-aerea-plan.png" alt="" aria-hidden="true" fill className={styles.bg} priority />
      <div className={styles.bgOverlay} aria-hidden="true" />

      <SiteHeader
        onOpenNav={() => setNavOpen(true)}
        backHref="/"
        backLabel="Volver a inicio"
        breadcrumb={{ rootLabel: "Recorrido virtual", rootHref: "/", currentLabel: "Vista general" }}
      />

      <div ref={mapRef} className={styles.mapArea}>
        <div className={styles.planBox} style={{ width: planW, height: planH }}>
          {planW > 0 && (
            <>
              <Image
                src="/images/mone-aerea-plan.png"
                alt="Vista aérea del conjunto Moné Gardens"
                fill
                sizes="(max-width: 1200px) 100vw, 1200px"
                className={styles.planImg}
              />

              <button
                type="button"
                onClick={() => setGallery("piscina")}
                className={styles.spot}
                style={{ left: "97.5%", top: "22%", transform: "translate(-100%, -50%)" }}
              >
                <span className={styles.spotDot} />
                <span>Piscina + BBQ</span>
                <span className={styles.spotArrow}>▸</span>
              </button>
              <button
                type="button"
                onClick={() => setGallery("gym")}
                className={styles.spot}
                style={{ left: "97.5%", top: "76%", transform: "translate(-100%, -50%)" }}
              >
                <span className={styles.spotDot} />
                <span>Gym</span>
                <span className={styles.spotArrow}>▸</span>
              </button>

              <div className={styles.rowTag} style={{ left: "2.4%", top: "24.5%" }}>
                FILA B
              </div>
              <div className={styles.rowTag} style={{ left: "2.4%", top: "75.5%" }}>
                FILA A
              </div>

              {HOUSES.map((h) => {
                const on = selected === h.id;
                const num = String(h.idx + 1).padStart(2, "0");
                const bg = on ? "var(--cream-bright)" : h.row === "A" ? "var(--gold)" : "rgba(2,29,62,0.92)";
                const fg = on ? "var(--navy-deep)" : h.row === "A" ? "var(--navy-deep)" : "#F7DFA0";
                const ring = on
                  ? "2px solid var(--gold)"
                  : h.row === "A"
                  ? "1px solid rgba(4,32,63,0.45)"
                  : "2px solid var(--gold)";
                return (
                  <button
                    key={h.id}
                    type="button"
                    onClick={() => setSelected(on ? null : h.id)}
                    aria-label={`Casa ${h.row} ${num}`}
                    className={styles.house}
                    style={{
                      left: `${h.x}%`,
                      top: `${h.y}%`,
                      width: dotSize,
                      height: dotSize,
                      zIndex: on ? 90 : 40 - h.idx,
                    }}
                  >
                    {on && <span data-halo="1" className={styles.halo} />}
                    <span
                      className={styles.dotFace}
                      style={{ fontSize: dotFont, background: bg, color: fg, border: ring }}
                    >
                      {num}
                    </span>
                    <span className={styles.pill} style={{ opacity: on ? 1 : 0 }}>
                      Casa {h.id}
                    </span>
                  </button>
                );
              })}
            </>
          )}
        </div>
      </div>

      <div className={styles.panel}>
        <div className={styles.info}>
          <p className={styles.infoText}>32 casas · A01–A16 · B01–B16</p>
          <p className={styles.infoText} style={{ color: selected ? "var(--gold)" : "rgba(255,253,248,0.66)" }}>
            {selectedLabel}
          </p>
        </div>
        <div className={styles.ctaRow}>
          <Link href="/casa-modelo" className={`btn btn-gold ${styles.ctaBtn}`}>
            <span>Ver modelo casa tipo</span>
            <span className={`btn-icon ${styles.ctaIcon}`}>→</span>
          </Link>
          <a href={HAUZD_TOUR_URL} target="_blank" rel="noopener" className={`btn btn-outline-gold ${styles.ctaBtn}`}>
            <span>Ver recorrido 3D completo</span>
            <span className={`btn-icon ${styles.ctaIconOutline}`}>↗</span>
          </a>
        </div>
      </div>

      <UnitDetailModal code={selected} onClose={() => setSelected(null)} />
      <GalleryModal galleryKey={gallery} onClose={() => setGallery(null)} />
      <NavDrawer open={navOpen} onClose={() => setNavOpen(false)} />
    </div>
  );
}
