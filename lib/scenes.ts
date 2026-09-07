export interface Scene {
  id: string;
  label: string;
  short: string;
  src: string;
  note: string;
}

export const SCENES: Scene[] = [
  { id: "fachada", label: "Fachada", short: "Fachada", src: "/images/casa-01-fachada.jpg", note: "Piedra natural, ventanales de piso a techo y acceso peatonal iluminado." },
  { id: "entorno", label: "Entorno", short: "Entorno", src: "/images/casa-02-entorno.jpg", note: "Andadores arbolados entre las dos hileras de casas." },
  { id: "sala", label: "Sala", short: "Sala", src: "/images/casa-03-sala.jpg", note: "Sala abierta al patio con doble corredera y luz natural todo el día." },
  { id: "comedor", label: "Comedor + Cocina", short: "Comedor", src: "/images/casa-04-comedor-cocina.jpg", note: "Planta baja integrada: comedor, cocina con isla y escalera volada." },
  { id: "patio", label: "Patio", short: "Patio", src: "/images/casa-05-patio.jpg", note: "Patio privado con área de parrilla y estar exterior." },
  { id: "master", label: "Dormitorio máster", short: "Máster", src: "/images/casa-06-master.jpg", note: "Máster con muro de acento, closet y ventanal al frente." },
  { id: "hab1", label: "Habitación 1", short: "Hab. 1", src: "/images/casa-07-hab1.jpg", note: "Habitación con zona de escritorio y clóset de piso a techo." },
  { id: "hab2", label: "Habitación 2", short: "Hab. 2", src: "/images/casa-08-hab2.jpg", note: "Habitación con salida a balcón y vestidor abierto." },
];
