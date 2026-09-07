"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { AMENITY_GALLERIES, type AmenityKey } from "@/lib/amenities";
import { useEscapeKey } from "@/lib/useEscapeKey";
import styles from "./GalleryModal.module.css";

interface GalleryModalProps {
  galleryKey: AmenityKey | null;
  onClose: () => void;
}

export default function GalleryModal({ galleryKey, onClose }: GalleryModalProps) {
  const [idx, setIdx] = useState(0);
  const [lastKey, setLastKey] = useState(galleryKey);
  const open = galleryKey !== null;
  const gallery = AMENITY_GALLERIES[galleryKey ?? "piscina"];

  // Reset to the first shot whenever a different gallery is opened.
  // Adjusting state during render (rather than in an effect) avoids an
  // extra paint.
  if (galleryKey !== lastKey) {
    setLastKey(galleryKey);
    setIdx(0);
  }

  const go = (step: number) => {
    setIdx((i) => (i + step + gallery.shots.length) % gallery.shots.length);
  };

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, gallery.shots.length]);

  useEscapeKey(onClose, open);

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
          <p className={styles.title}>{gallery.title}</p>
          <p className={styles.counter}>
            {String(idx + 1).padStart(2, "0")} / {String(gallery.shots.length).padStart(2, "0")}
          </p>
          <button type="button" onClick={onClose} aria-label="Cerrar galería" className={styles.closeBtn}>
            ✕
          </button>
        </div>
        <div className={styles.frame}>
          {gallery.shots.map((shot, n) => (
            <Image
              key={shot.src}
              src={shot.src}
              alt={shot.alt}
              fill
              sizes="940px"
              className={styles.shot}
              style={{ opacity: n === idx ? 1 : 0 }}
            />
          ))}
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Foto anterior"
            className={`${styles.navBtn} ${styles.navPrev}`}
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Foto siguiente"
            className={`${styles.navBtn} ${styles.navNext}`}
          >
            ›
          </button>
        </div>
        <p className={styles.caption}>{gallery.caption}</p>
      </div>
    </div>
  );
}
