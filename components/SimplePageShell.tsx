"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import SiteHeader from "@/components/SiteHeader";
import NavDrawer from "@/components/NavDrawer";
import styles from "./SimplePageShell.module.css";

interface SimplePageShellProps {
  eyebrow: string;
  title: string;
  breadcrumbCurrent: string;
  children: ReactNode;
}

export default function SimplePageShell({ eyebrow, title, breadcrumbCurrent, children }: SimplePageShellProps) {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className={styles.page}>
      <Image src="/images/mone-02-fachada.jpg" alt="" aria-hidden="true" fill className={styles.bg} />
      <div className={styles.bgOverlay} aria-hidden="true" />

      <SiteHeader
        onOpenNav={() => setNavOpen(true)}
        backHref="/"
        backLabel="Volver a inicio"
        breadcrumb={{ rootLabel: "Recorrido virtual", rootHref: "/", currentLabel: breadcrumbCurrent, separator: "·" }}
      />

      <main className={styles.main}>
        <div className={`${styles.card} glass-panel`}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h1 className={styles.title}>{title}</h1>
          {children}
        </div>
      </main>

      <NavDrawer open={navOpen} onClose={() => setNavOpen(false)} />
    </div>
  );
}
