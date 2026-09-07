"use client";

import Image from "next/image";
import Link from "next/link";
import { NAV_ITEMS } from "@/lib/nav";
import { CONTACT_EMAIL } from "@/lib/constants";
import styles from "./NavDrawer.module.css";

interface NavDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function NavDrawer({ open, onClose }: NavDrawerProps) {
  return (
    <>
      <div
        className={`${styles.scrim} ${open ? styles["scrim--open"] : styles["scrim--closed"]}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <nav
        className={`${styles.panel} ${open ? styles["panel--open"] : styles["panel--closed"]}`}
        aria-hidden={!open}
      >
        <div className={styles.top}>
          <Image src="/images/logo-mone.png" alt="Moné Gardens" width={449} height={188} style={{ display: "block", height: 30, width: "auto" }} />
          <button type="button" onClick={onClose} aria-label="Cerrar menú" className={styles.closeBtn}>
            ✕
          </button>
        </div>
        <div className={styles.list}>
          {NAV_ITEMS.map((item, n) => (
            <Link key={item.label} href={item.href} onClick={onClose} className={styles.item}>
              <span className={styles.itemNum}>{String(n + 1).padStart(2, "0")}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
        <div className={styles.foot}>
          <a href={`mailto:${CONTACT_EMAIL}`} className={styles.footEmail}>
            {CONTACT_EMAIL}
          </a>
          <Image
            src="/images/logo-miacasa.png"
            alt="MIACASA"
            width={725}
            height={169}
            className={styles.footLogo}
          />
        </div>
      </nav>
    </>
  );
}
