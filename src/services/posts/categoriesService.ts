
import { CategoryInfo, TagInfo } from "@/types/blog";

// Categories available
export const categories: CategoryInfo[] = [
  { id: "all", name: "Todos los artículos", count: 20 },
  { id: "tendencias", name: "Tendencias del Sector", count: 6 },
  { id: "mejores-practicas", name: "Mejores Prácticas", count: 9 },
  { id: "investigacion", name: "Investigación y Desarrollo", count: 4 },
  { id: "tecnologia", name: "Tecnología BIM", count: 4 }
];

// Popular tags for the sidebar
export const popularTags: TagInfo[] = [
  { name: "Minería Sostenible", count: 12 },
  { name: "Tecnología", count: 18 },
  { name: "Seguridad", count: 16 },
  { name: "Innovación", count: 14 },
  { name: "Medio Ambiente", count: 11 },
  { name: "Automatización", count: 9 },
  { name: "Perforación", count: 7 },
  { name: "Big Data", count: 6 },
  { name: "BIM", count: 6 },
  { name: "Valorización", count: 4 },
  { name: "SSOMA", count: 5 }
];
