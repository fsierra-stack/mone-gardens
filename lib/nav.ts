export interface NavItem {
  label: string;
  href: string;
}

// Order and hrefs are shared across every screen's slide-out menu.
export const NAV_ITEMS: NavItem[] = [
  { label: "Inicio", href: "/" },
  { label: "Áreas", href: "/vista-general" },
  { label: "Unidades disponibles", href: "/unidades" },
  { label: "Casa modelo", href: "/casa-modelo" },
  { label: "Amenities", href: "/vista-general" },
  { label: "Avances de obra", href: "/avances-de-obra" },
  { label: "Presentación", href: "/presentacion" },
  { label: "Ubicación", href: "/ubicacion" },
  { label: "Contacto", href: "/contacto" },
];
