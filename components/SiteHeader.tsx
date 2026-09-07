import Image from "next/image";
import Link from "next/link";
import styles from "./SiteHeader.module.css";

interface Breadcrumb {
  rootLabel: string;
  rootHref: string;
  currentLabel: string;
  separator?: string;
}

interface SiteHeaderProps {
  onOpenNav: () => void;
  backHref?: string;
  backLabel?: string;
  breadcrumb?: Breadcrumb;
}

export default function SiteHeader({
  onOpenNav,
  backHref,
  backLabel = "Volver",
  breadcrumb,
}: SiteHeaderProps) {
  const isHome = !backHref && !breadcrumb;

  return (
    <header className={`${styles.header} ${isHome ? styles["header--home"] : ""}`}>
      <div className={styles.row}>
        <div className={styles.brandPill}>
          <Image
            src="/images/logo-mone.png"
            alt="Moné Gardens"
            width={449}
            height={188}
            className={styles.logoMone}
            priority
          />
          <span className={styles.divider} />
          <Image
            src="/images/logo-miacasa.png"
            alt="MIACASA"
            width={725}
            height={169}
            className={styles.logoMia}
            priority
          />
        </div>

        <button
          type="button"
          onClick={onOpenNav}
          aria-label="Abrir menú"
          className={styles.hamburger}
        >
          <span className={styles.bar} />
          <span className={styles.bar} />
          <span className={`${styles.bar} ${styles["bar--short"]}`} />
        </button>
      </div>

      {(backHref || breadcrumb) && (
        <div className={styles.trail}>
          {backHref && (
            <Link href={backHref} aria-label={backLabel} className={styles.backBtn}>
              ←
            </Link>
          )}
          {breadcrumb && (
            <div className={styles.breadcrumb}>
              <Link href={breadcrumb.rootHref} className={styles.breadcrumbRoot}>
                {breadcrumb.rootLabel}
              </Link>
              <span className={styles.breadcrumbSep}>{breadcrumb.separator ?? "›"}</span>
              <span className={styles.breadcrumbCurrent}>{breadcrumb.currentLabel}</span>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
