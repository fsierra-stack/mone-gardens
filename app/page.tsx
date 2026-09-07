"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import NavDrawer from "@/components/NavDrawer";
import styles from "./page.module.css";

const SLIDES = [
  { src: "/images/mone-01-acceso.jpg", alt: "Acceso principal Moné Gardens", caption: "Acceso principal · Moné Gardens" },
  { src: "/images/mone-02-fachada.jpg", alt: "Fachada de las casas", caption: "Fachada · Casas de 2 plantas" },
  { src: "/images/mone-03-calle.jpg", alt: "Andadores interiores del conjunto", caption: "Andadores interiores" },
  { src: "/images/mone-04-amenities.jpg", alt: "Amenities: piscina y gimnasio", caption: "Amenities · Piscina y gimnasio" },
  { src: "/images/mone-05-andador.jpg", alt: "Recorrido peatonal frente a las casas", caption: "Recorrido peatonal" },
];

const SLIDE_DURATION_MS = 6500;

export default function Home() {
  const [i, setI] = useState(0);
  const [navOpen, setNavOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    function tick() {
      timer.current = setTimeout(() => {
        setI((prev) => (prev + 1) % SLIDES.length);
        tick();
      }, SLIDE_DURATION_MS);
    }
    tick();
    return () => clearTimeout(timer.current);
  }, []);

  function goTo(n: number) {
    setI(n);
    clearTimeout(timer.current);
    function tick() {
      timer.current = setTimeout(() => {
        setI((prev) => (prev + 1) % SLIDES.length);
        tick();
      }, SLIDE_DURATION_MS);
    }
    tick();
  }

  return (
    <div className={styles.page}>
      <div className={styles.bgLayer}>
        {SLIDES.map((slide, n) => (
          <Image
            key={slide.src}
            data-kb="1"
            src={slide.src}
            alt={slide.alt}
            fill
            priority={n === 0}
            sizes="100vw"
            className={styles.slide}
            style={{ opacity: n === i ? 1 : 0 }}
          />
        ))}
        <div className={styles.overlayGradient} />
        <div className={styles.overlayRadial} />
      </div>

      <SiteHeader onOpenNav={() => setNavOpen(true)} />

      <main className={styles.main}>
        <div className={`${styles.heroPanel} glass-panel`}>
          <p className={styles.eyebrow}>Casas · En alianza con MIACASA</p>
          <h1 className={styles.title}>
            Moné
            <br />
            Gardens
          </h1>
          <p className={styles.description}>
            Diseño superior, accesible y exclusivo. Un conjunto de casas pensado para vivirse todos los días.
          </p>
          <p className={styles.ctaLabel}>¿Listo para conocerlo?</p>
          <div className={styles.ctaRow}>
            <Link href="/vista-general" className={`btn btn-gold ${styles.ctaPrimary}`}>
              <span>Entrar al recorrido virtual</span>
              <span className={`btn-icon ${styles.ctaIcon}`}>→</span>
            </Link>
            <Link href="/contacto" className={`btn btn-ghost ${styles.ctaSecondary}`}>
              Agenda tu visita
            </Link>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <p className={styles.caption}>{SLIDES[i].caption}</p>
        <div className={styles.dots}>
          {SLIDES.map((slide, n) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => goTo(n)}
              aria-label={`Foto ${n + 1}`}
              className={styles.dot}
            >
              <span className={styles.dotFill} style={{ width: n === i ? "100%" : "0%" }} />
            </button>
          ))}
        </div>
      </footer>

      <NavDrawer open={navOpen} onClose={() => setNavOpen(false)} />
    </div>
  );
}
