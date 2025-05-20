import { BlogPost } from "@/types/blog";

export const gestionAgua: BlogPost = {
  id: "6",
  title: "Mejores Prácticas para la Gestión del Agua en Minería",
  excerpt: "Estrategias innovadoras para optimizar el uso del agua y minimizar el impacto ambiental en operaciones mineras.",
  content: `
      <p class="mb-4">La gestión responsable del agua se ha convertido en una prioridad crítica para la industria minera global, especialmente en regiones con estrés hídrico. Las empresas están implementando tecnologías y procesos innovadores para reducir su huella hídrica.</p>
      
      <h2 class="text-2xl font-bold mb-4">Conservación y Reutilización</h2>
      
      <p class="mb-4">Los sistemas de circuito cerrado, la desalinización de agua de mar y las tecnologías avanzadas de tratamiento están permitiendo a las operaciones mineras reducir significativamente su consumo de agua dulce mientras minimizan los efluentes.</p>
    `,
  category: "mejores-practicas",
  image: "https://images.unsplash.com/photo-1468421870903-4df1664ac249?auto=format&fit=crop&w=800&q=80",
  author: {
    name: "Patricia Vega",
    avatar: "https://randomuser.me/api/portraits/women/67.jpg",
    position: "Ingeniera Ambiental"
  },
  date: "2 May, 2025",
  readTime: "8 min",
  comments: 12,
  tags: ["Agua", "Sostenibilidad", "Medio Ambiente", "Gestión Recursos", "Minería Responsable"]
};
