export type AmenityKey = "piscina" | "gym";

export interface AmenityShot {
  src: string;
  alt: string;
}

export interface AmenityGallery {
  title: string;
  caption: string;
  shots: AmenityShot[];
}

export const AMENITY_GALLERIES: Record<AmenityKey, AmenityGallery> = {
  piscina: {
    title: "Piscina + BBQ",
    caption:
      "Piscina, área de asadores y estar exterior junto al acceso principal, con el gimnasio en la planta alta.",
    shots: [
      { src: "/images/amenity-piscina-01.jpg", alt: "Piscina y área de BBQ de Moné Gardens" },
      { src: "/images/amenity-piscina-02.jpg", alt: "Vista del área social con piscina" },
    ],
  },
  gym: {
    title: "Gym",
    caption: "Gimnasio equipado en la planta alta del área social, con ventanal hacia la piscina.",
    shots: [
      { src: "/images/amenity-piscina-01.jpg", alt: "Volumen del gimnasio sobre el área de piscina" },
    ],
  },
};
