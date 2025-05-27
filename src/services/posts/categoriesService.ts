
import { CategoryInfo, TagInfo } from "@/types/blog";
import { storageService } from "../storage/localStorageService";

// Get categories from storage or use defaults
export const getCategories = (): CategoryInfo[] => {
  return storageService.getAllCategories();
};

// Default categories for initialization
export const defaultCategories: CategoryInfo[] = [
  { id: "all", name: "Todas las Categorías", count: 0 },
  { id: "tendencias", name: "Tendencias", count: 0 },
  { id: "tecnologia", name: "Tecnología", count: 0 },
  { id: "seguridad", name: "Seguridad", count: 0 },
  { id: "sostenibilidad", name: "Sostenibilidad", count: 0 },
  { id: "normativas", name: "Normativas", count: 0 },
  { id: "capacitacion", name: "Capacitación", count: 0 }
];

// Popular tags - these could also be dynamic from storage
export const popularTags: TagInfo[] = [
  { name: "BIM", count: 15 },
  { name: "Seguridad Minera", count: 12 },
  { name: "SSOMA", count: 10 },
  { name: "Sostenibilidad", count: 8 },
  { name: "Ingeniería", count: 7 },
  { name: "Construcción", count: 6 }
];

// Export categories with dynamic data
export const categories = getCategories().length > 0 ? getCategories() : defaultCategories;
