"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import SiteHeader from "@/components/SiteHeader";
import NavDrawer from "@/components/NavDrawer";
import { SCENES } from "@/lib/scenes";
import { WHATSAPP_URL } from "@/lib/constants";
import styles from "./page.module.css";

export default function CasaModeloPage() {
  const [i, setI] = useState(0);
  const [navOpen, setNavOpen] = useState(false);

  function go(step: number) {
    setI((prev) => (prev + step + SCENES.length) % SCENES.length);
  }

  useEffect(() => {
    if (navOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [navOpen]);

  const current = SCENES[i];

  return (
    <div className={styles.page}>
      <div className={styles.bgLayer}>
        {SCENES.map((s, n) => (
          <Image
            key={s.id}
            src={s.src}
            alt={`${s.label} de la casa modelo Moné Gardens`}
            fill
            priority={n === 0}
            sizes="100vw"
            className={styles.scene}
            style={{ opacity: n === i ? 1 : 0, transform: n === i ? "scale(1)" : "scale(1.04)" }}
          />
        ))}
        <div className={styles.bgOverlay} aria-hidden="true" />
      </div>

      <SiteHeader
        onOpenNav={() => setNavOpen(true)}
        backHref="/vista-general"
        backLabel="Volver a la vista general"
        breadcrumb={{ rootLabel: "Recorrido virtual", rootHref: "/vista-general", currentLabel: "Casa modelo", separator: "·" }}
      />

      <div className={styles.hero}>
        <div className={styles.sceneInfo}>
          <div className={styles.sceneBadge}>
            <span className={styles.sceneDot} />
            <span className={styles.sceneName}>{current.label}</span>
            <span className={styles.sceneCounter}>
              {String(i + 1).padStart(2, "0")} / {String(SCENES.length).padStart(2, "0")}
            </span>
          </div>
          <p className={styles.sceneNote}>{current.note}</p>
        </div>

        <div className={`${styles.specCard} glass-panel`}>
          <p className={styles.specLabel}>Casa tipo · 104 m²</p>
          <p className={styles.specPrice}>$126,990</p>
          <div className={styles.specChips}>
            <span className={styles.specChip}>104 m²</span>
            <span className={styles.specChip}>3 dormitorios</span>
            <span className={styles.specChip}>2.5 baños</span>
          </div>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener" className={`btn btn-ghost ${styles.whatsapp}`}>
            <span>Escríbenos por WhatsApp</span>
          </a>
        </div>
      </div>

      <div className={`${styles.navArrowWrap} ${styles["navArrowWrap--left"]}`}>
        <button type="button" onClick={() => go(-1)} aria-label="Ambiente anterior" className={styles.navArrow}>
          ‹
        </button>
      </div>
      <div className={`${styles.navArrowWrap} ${styles["navArrowWrap--right"]}`}>
        <button type="button" onClick={() => go(1)} aria-label="Siguiente ambiente" className={styles.navArrow}>
          ›
        </button>
      </div>

      <div className={styles.bottom}>
        <div className={styles.thumbRail}>
          {SCENES.map((s, n) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setI(n)}
              aria-label={`Ir a ${s.label}`}
              className={styles.thumb}
              style={{ border: n === i ? "2px solid var(--gold)" : "2px solid rgba(255,255,255,0.14)" }}
            >
              <Image src={s.src} alt="" fill sizes="120px" className={styles.thumbImg} style={{ opacity: n === i ? 1 : 0.62 }} />
              <span className={styles.thumbLabel}>{s.short}</span>
            </button>
          ))}
        </div>

        <div className={styles.actionsRow}>
          <a href="#plano" className={`btn btn-gold ${styles.planCta}`}>
            <span>Ver plano</span>
            <span className={`btn-icon ${styles.planCtaIcon}`}>→</span>
          </a>
          <p className={styles.currentText}>Punto actual: {current.label}</p>
        </div>
      </div>

      <NavDrawer open={navOpen} onClose={() => setNavOpen(false)} />
    </div>
  );
}
