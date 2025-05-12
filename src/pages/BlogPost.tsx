
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Sidebar from "@/components/layout/Sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BookOpen, Calendar, ArrowRight, User, MessageSquare, Clock, Share2, BookmarkPlus, ThumbsUp, Facebook, Twitter, Linkedin, Search, Download, CheckCircle } from "lucide-react";

// Enhanced SEO blog post data with more structured content, meta descriptions, and keywords
const blogPosts = [
  {
    id: "1",
    title: "Innovaciones en Técnicas de Extracción Sostenible: Guía Completa 2025",
    metaTitle: "Técnicas de Extracción Sostenible en Minería | Guía Completa 2025",
    metaDescription: "Descubre las últimas tecnologías que están revolucionando la minería sostenible y reduciendo el impacto ambiental. Guía definitiva actualizada para 2025.",
    excerpt: "Descubre las últimas tecnologías que están revolucionando la minería sostenible y reduciendo el impacto ambiental con nuestra guía completa actualizada para 2025.",
    keywords: ["minería sostenible", "extracción sostenible", "tecnologías mineras", "reducción impacto ambiental", "biominería", "equipos mineros eléctricos"],
    content: `
      <p class="mb-4">La minería sostenible es uno de los mayores desafíos que enfrenta la industria en la actualidad. A medida que la demanda global de minerales y metales continúa creciendo, las empresas mineras buscan constantemente formas de reducir su huella ambiental sin comprometer la eficiencia operativa.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Tecnologías emergentes para la extracción sostenible en 2025</h2>
      
      <p class="mb-4">En los últimos años, hemos sido testigos de avances significativos en las tecnologías de extracción que prometen transformar la industria minera hacia prácticas más sostenibles:</p>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">1. Biominería avanzada: Transformando la extracción mineral</h3>
      
      <p class="mb-4">La <strong>biominería</strong> utiliza microorganismos para extraer metales de minerales de baja ley. Los últimos avances en biotecnología han mejorado significativamente la eficacia de este proceso, permitiendo la recuperación de metales de depósitos que anteriormente se consideraban no económicos.</p>
      
      <p class="mb-4">Las bacterias <em>Acidithiobacillus ferrooxidans</em> y <em>Leptospirillum ferrooxidans</em> son especialmente eficientes en la oxidación de minerales sulfurados, facilitando la liberación de metales como cobre, oro y uranio de manera más sostenible que los métodos tradicionales.</p>
      
      <blockquote class="border-l-4 border-mining-500 pl-4 italic my-6">
        "La biominería representa un cambio paradigmático en la forma en que podemos acceder a recursos minerales con un impacto ambiental mínimo. Los avances en 2025 han permitido aumentar la eficiencia de recuperación en un 35% respecto a los métodos tradicionales." - Dra. Elena Rodríguez, Investigadora Principal en Biotecnología Minera
      </blockquote>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">2. Extracción selectiva con solventes verdes: Revolucionando la lixiviación</h3>
      
      <p class="mb-4">Los nuevos <strong>solventes biodegradables</strong> están reemplazando a los productos químicos tradicionales tóxicos utilizados en la lixiviación. Estos solventes verdes no solo son más seguros para el medio ambiente, sino que también ofrecen una mayor selectividad, lo que resulta en una mayor pureza del producto final.</p>
      
      <table class="w-full border-collapse border border-gray-300 my-6">
        <thead>
          <tr class="bg-mining-100 dark:bg-mining-900/30">
            <th class="border border-gray-300 p-2">Solvente Verde</th>
            <th class="border border-gray-300 p-2">Eficiencia de Recuperación</th>
            <th class="border border-gray-300 p-2">Impacto Ambiental</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border border-gray-300 p-2">Ésteres de ácidos grasos</td>
            <td class="border border-gray-300 p-2">87%</td>
            <td class="border border-gray-300 p-2">Muy bajo</td>
          </tr>
          <tr>
            <td class="border border-gray-300 p-2">Derivados de terpenos</td>
            <td class="border border-gray-300 p-2">92%</td>
            <td class="border border-gray-300 p-2">Mínimo</td>
          </tr>
          <tr>
            <td class="border border-gray-300 p-2">Biopolímeros modificados</td>
            <td class="border border-gray-300 p-2">83%</td>
            <td class="border border-gray-300 p-2">Casi nulo</td>
          </tr>
        </tbody>
      </table>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">3. Sistemas de minería autónomos y eléctricos: El futuro de las operaciones</h3>
      
      <p class="mb-4">La <strong>electrificación</strong> de los equipos mineros está ganando impulso como una forma de reducir las emisiones de gases de efecto invernadero. Combinados con sistemas autónomos controlados por IA, estos equipos pueden optimizar rutas, minimizar el consumo de energía y reducir el impacto ambiental general de las operaciones mineras.</p>
      
      <p class="mb-4">Las estadísticas más recientes muestran que las minas que implementan flotas totalmente eléctricas pueden reducir sus emisiones de CO2 hasta en un 50%, mientras que mejoran la seguridad operativa en un 73%.</p>
      
      <img src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1400&q=80" alt="Equipos mineros eléctricos y autónomos operando en una mina sostenible" class="w-full rounded-lg my-6" />
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Impacto en la industria minera global</h2>
      
      <p class="mb-4">Estas innovaciones no solo están mejorando la sostenibilidad ambiental, sino que también están ofreciendo ventajas económicas significativas. La reducción de los costos operativos, la mayor eficiencia en la recuperación de minerales y la menor necesidad de remediación ambiental están haciendo que estas tecnologías sean cada vez más atractivas para las empresas mineras progresistas.</p>
      
      <div class="bg-mining-50 dark:bg-mining-900/20 p-4 rounded-lg my-6">
        <h4 class="font-semibold mb-2">Beneficios clave de la minería sostenible:</h4>
        <ul class="list-disc pl-5 space-y-1">
          <li>Reducción de hasta 60% en el consumo de agua</li>
          <li>Disminución de 50% en emisiones de gases de efecto invernadero</li>
          <li>Aumento promedio de 25% en la recuperación de minerales</li>
          <li>Reducción de 35% en residuos generados</li>
          <li>Mejora de 40% en la eficiencia energética</li>
        </ul>
      </div>
      
      <p class="mb-4">Además, a medida que los gobiernos de todo el mundo imponen regulaciones ambientales más estrictas, la adopción de estas tecnologías sostenibles está pasando de ser una opción a una necesidad para mantener la licencia social para operar.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Casos de estudio: Minería sostenible en acción</h2>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">Mina Cerro Verde, Perú: Líder en biominería</h3>
      
      <p class="mb-4">Esta operación de cobre a gran escala ha implementado un sistema de biominería que ha reducido su consumo de agua en un 30% y ha aumentado la recuperación de cobre en un 15%, todo ello disminuyendo su huella de carbono.</p>
      
      <p class="mb-4">El sistema integra bacterias especialmente seleccionadas que operan en biorreactores controlados, optimizando el proceso de lixiviación bacteriana y minimizando el uso de reactivos químicos agresivos.</p>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">Proyecto Northern Star, Australia: Revolución en minería eléctrica</h3>
      
      <p class="mb-4">Al adoptar equipos totalmente eléctricos y autónomos, esta mina de oro subterránea ha reducido sus costos operativos en un 20% mientras mejora significativamente la seguridad de los trabajadores y reduce las emisiones de carbono.</p>
      
      <p class="mb-4">La implementación de vehículos eléctricos a batería (BEVs) ha eliminado prácticamente las emisiones de diésel bajo tierra, mejorando la calidad del aire y reduciendo los costos de ventilación en un 40%.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">El futuro de la minería sostenible: Tendencias para vigilar</h2>
      
      <p class="mb-4">Mirando hacia el futuro, varias tendencias emergentes podrían acelerar aún más la transformación sostenible de la industria minera:</p>
      
      <ol class="list-decimal pl-5 space-y-2 my-4">
        <li><strong>Minería de precisión:</strong> Utilizando tecnologías avanzadas de mapeo geológico y extracción quirúrgica para minimizar la perturbación del terreno.</li>
        <li><strong>Economía circular en minería:</strong> Reprocesamiento de relaves y residuos mineros para recuperar minerales adicionales y reducir desechos.</li>
        <li><strong>Fuentes de energía renovable integradas:</strong> Implementación de sistemas híbridos solar-eólicos para abastecer las operaciones mineras.</li>
        <li><strong>Digitalización completa:</strong> Uso de gemelos digitales y simulación avanzada para optimizar cada aspecto de la operación minera.</li>
        <li><strong>Restauración ecológica simultánea:</strong> Rehabilitación progresiva del terreno durante la vida operativa de la mina, no solo al final.</li>
      </ol>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Conclusión: El imperativo sostenible en la minería moderna</h2>
      
      <p class="mb-4">El futuro de la minería está inextricablemente ligado a la innovación sostenible. A medida que estas tecnologías maduren y se vuelvan más accesibles, podemos esperar una transformación significativa en la forma en que se extraen y procesan los minerales. Las empresas que lideren esta transformación no solo ganarán ventajas competitivas, sino que también contribuirán a un futuro más sostenible para la industria minera global.</p>
      
      <p class="mb-4">La clave para el éxito será encontrar el equilibrio adecuado entre la rentabilidad económica, la responsabilidad ambiental y el beneficio social. Con el continuo desarrollo e implementación de estas innovadoras técnicas de extracción sostenible, la industria minera está bien posicionada para enfrentar los desafíos del siglo XXI.</p>
      
      <div class="bg-engineering-50 dark:bg-engineering-900/20 p-4 rounded-lg my-6">
        <p class="font-semibold">Para más información sobre tecnologías de minería sostenible, consulte nuestra serie de cursos especializados o contacte con nuestros expertos en ingeniería minera sostenible.</p>
      </div>
      
      <p class="text-sm text-gray-500 mt-8">Última actualización: 12 de mayo de 2025 | Revisado por: Comité de Expertos en Minería Sostenible de EduMining</p>
    `,
    category: "tendencias",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80",
    author: {
      name: "María González",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      bio: "Ingeniera de Minas con doctorado en Sostenibilidad Minera por la Universidad Politécnica de Madrid y más de 15 años de experiencia en el sector. Especialista en tecnologías de extracción de bajo impacto ambiental.",
      position: "Directora de Investigación en Minería Sostenible",
      publications: 28,
      linkedin: "https://linkedin.com/in/mariagonzalez"
    },
    date: "12 May, 2025",
    readTime: "8 min",
    comments: 24,
    likes: 156,
    shares: 83,
    tags: ["Minería Sostenible", "Innovación", "Tecnología", "Medio Ambiente", "Extracción Sostenible", "Biominería"]
  },
  {
    id: "2",
    title: "Gestión de Seguridad en Minas Subterráneas: Protocolos Avanzados 2025",
    metaTitle: "Seguridad en Minas Subterráneas | Protocolos Avanzados 2025",
    metaDescription: "Análisis detallado de las mejores prácticas y tecnologías para garantizar la seguridad en operaciones mineras subterráneas. Guía actualizada 2025.",
    excerpt: "Análisis detallado de las mejores prácticas y tecnologías para garantizar la máxima seguridad en operaciones mineras bajo tierra según los estándares internacionales actualizados en 2025.",
    keywords: ["seguridad minera", "minas subterráneas", "protocolos de seguridad", "tecnología minera", "prevención de accidentes", "equipos de seguridad"],
    content: `
      <p class="mb-4">La seguridad en las operaciones mineras subterráneas sigue siendo una prioridad absoluta para la industria. Con los avances tecnológicos y las lecciones aprendidas de incidentes anteriores, los protocolos de seguridad han evolucionado significativamente en los últimos años.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">El panorama actual de la seguridad en minas subterráneas</h2>
      
      <p class="mb-4">Las estadísticas globales muestran una mejora constante en los indicadores de seguridad minera, pero los entornos subterráneos siguen presentando desafíos únicos que requieren soluciones especializadas y constantemente actualizadas.</p>
      
      <p class="mb-4">Según el Consejo Internacional de Minería y Metales (ICMM), las tasas de accidentes en minas subterráneas han disminuido un 47% en la última década, gracias a la implementación de tecnologías avanzadas y protocolos más estrictos.</p>

      <h3 class="text-xl font-semibold mt-6 mb-3">1. Sistemas integrados de monitoreo atmosférico</h3>
      
      <p class="mb-4">Los sistemas modernos de monitoreo continuo permiten detectar en tiempo real la presencia de gases peligrosos, niveles de oxígeno, temperatura y humedad en toda la extensión de una mina subterránea.</p>
      
      <p class="mb-4">La implementación de sensores interconectados que transmiten datos a una central de control permite una respuesta inmediata ante cualquier alteración de los parámetros de seguridad establecidos.</p>
      
      <div class="bg-mining-50 dark:bg-mining-900/20 p-4 rounded-lg my-6">
        <h4 class="font-semibold mb-2">Parámetros críticos monitoreados:</h4>
        <ul class="list-disc pl-5 space-y-1">
          <li>Concentraciones de metano (CH₄)</li>
          <li>Monóxido de carbono (CO)</li>
          <li>Dióxido de carbono (CO₂)</li>
          <li>Sulfuro de hidrógeno (H₂S)</li>
          <li>Niveles de oxígeno (O₂)</li>
          <li>Partículas en suspensión</li>
          <li>Temperatura y humedad</li>
        </ul>
      </div>

      <img src="https://images.unsplash.com/photo-1582584001264-d8efbf406ab6?auto=format&fit=crop&w=1400&q=80" alt="Sistema de monitoreo atmosférico en una mina subterránea moderna" class="w-full rounded-lg my-6" />
      
      <h3 class="text-xl font-semibold mt-6 mb-3">2. Tecnologías de comunicación resilientes</h3>
      
      <p class="mb-4">Las comunicaciones fiables son esenciales para la seguridad en entornos subterráneos. Los sistemas más avanzados implementan redes redundantes que garantizan la conectividad incluso en caso de emergencia.</p>
      
      <table class="w-full border-collapse border border-gray-300 my-6">
        <thead>
          <tr class="bg-mining-100 dark:bg-mining-900/30">
            <th class="border border-gray-300 p-2">Tecnología</th>
            <th class="border border-gray-300 p-2">Alcance</th>
            <th class="border border-gray-300 p-2">Resistencia a emergencias</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border border-gray-300 p-2">Leaky Feeder</td>
            <td class="border border-gray-300 p-2">Extenso, siguiendo el cable</td>
            <td class="border border-gray-300 p-2">Media (vulnerable a daños físicos)</td>
          </tr>
          <tr>
            <td class="border border-gray-300 p-2">Radiación por la Tierra (TTE)</td>
            <td class="border border-gray-300 p-2">Limitado por la geología</td>
            <td class="border border-gray-300 p-2">Alta (funciona en derrumbes)</td>
          </tr>
          <tr>
            <td class="border border-gray-300 p-2">Wi-Fi Mesh</td>
            <td class="border border-gray-300 p-2">Bueno con repetidores</td>
            <td class="border border-gray-300 p-2">Media-Alta (red autoreparable)</td>
          </tr>
        </tbody>
      </table>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">3. Sistemas de localización de personal en tiempo real</h3>
      
      <p class="mb-4">Los sistemas RTLS (Real-Time Location Systems) permiten conocer la ubicación exacta de cada trabajador dentro de la mina en todo momento, lo que resulta crucial en situaciones de emergencia.</p>
      
      <p class="mb-4">Utilizando tecnologías como RFID, UWB o BLE, los dispositivos personales pueden transmitir continuamente la posición de cada minero con una precisión de hasta 30 centímetros.</p>
      
      <blockquote class="border-l-4 border-mining-500 pl-4 italic my-6">
        "La implementación de sistemas RTLS ha reducido el tiempo de respuesta en emergencias en un 68%, lo que se traduce directamente en vidas salvadas. Es una de las inversiones más importantes que cualquier operación subterránea puede hacer." - Ing. Carlos Ramírez, Especialista en Seguridad Minera
      </blockquote>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Protocolos avanzados de prevención y respuesta</h2>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">1. Evaluación predictiva de riesgos geomecánicos</h3>
      
      <p class="mb-4">Los modernos sistemas de monitoreo sísmico y deformación de rocas pueden detectar señales precursoras de inestabilidad mucho antes de que ocurra un evento peligroso, permitiendo evacuaciones preventivas.</p>
      
      <p class="mb-4">El análisis de datos históricos combinado con modelado en tiempo real permite predecir con mayor exactitud las áreas de mayor riesgo y adaptar los planes de minado para evitarlas o reforzarlas adecuadamente.</p>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">2. Entrenamiento inmersivo mediante realidad virtual</h3>
      
      <p class="mb-4">Los simuladores de realidad virtual permiten a los trabajadores practicar procedimientos de emergencia en entornos virtuales que replican exactamente las condiciones de la mina específica donde trabajan.</p>
      
      <p class="mb-4">Estos entrenamientos pueden simular diversos escenarios de emergencia, desde incendios y derrumbes hasta fallos en los sistemas de ventilación, aumentando significativamente la preparación del personal.</p>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">3. Refugios mineros de última generación</h3>
      
      <p class="mb-4">Los modernos refugios mineros ofrecen protección durante periodos extendidos, con sistemas autónomos de purificación de aire, control de temperatura, comunicaciones de emergencia y suministros suficientes para mantener a los trabajadores seguros hasta que el rescate sea posible.</p>
      
      <div class="bg-engineering-50 dark:bg-engineering-900/20 p-4 rounded-lg my-6">
        <h4 class="font-semibold mb-2">Características esenciales de los refugios modernos:</h4>
        <ul class="list-disc pl-5 space-y-1">
          <li>Autonomía mínima de 96 horas</li>
          <li>Sistemas redundantes de purificación de CO₂</li>
          <li>Control climático avanzado</li>
          <li>Comunicaciones de emergencia independientes</li>
          <li>Monitoreo remoto de condiciones interiores</li>
          <li>Suministros médicos y de primeros auxilios</li>
        </ul>
      </div>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Normativas y certificaciones internacionales</h2>
      
      <p class="mb-4">El cumplimiento de estándares internacionales no solo es un requisito legal en muchas jurisdicciones, sino una garantía de que se están aplicando las mejores prácticas disponibles en materia de seguridad.</p>
      
      <p class="mb-4">Entre las certificaciones más relevantes se encuentran:</p>
      
      <ol class="list-decimal pl-5 space-y-2 my-4">
        <li><strong>ISO 45001:</strong> Sistema de gestión de seguridad y salud en el trabajo</li>
        <li><strong>OHSAS 18001:</strong> (en transición a ISO 45001)</li>
        <li><strong>ILO-OSH 2001:</strong> Directrices de la OIT sobre sistemas de gestión de seguridad</li>
        <li><strong>ICMM 10 Principios:</strong> Especialmente el Principio 5 sobre seguridad y salud</li>
        <li><strong>Estándares MSHA:</strong> Para operaciones en jurisdicciones norteamericanas</li>
      </ol>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Conclusión: La seguridad como inversión estratégica</h2>
      
      <p class="mb-4">La implementación de protocolos avanzados de seguridad en minas subterráneas representa mucho más que un cumplimiento normativo: es una inversión estratégica que beneficia a todos los aspectos de la operación minera.</p>
      
      <p class="mb-4">Las empresas líderes del sector han demostrado que existe una correlación directa entre los altos estándares de seguridad y la productividad, rentabilidad y sostenibilidad a largo plazo de las operaciones mineras.</p>
      
      <p class="mb-4">En un mundo donde la licencia social para operar es cada vez más importante, demostrar un compromiso inquebrantable con la seguridad de los trabajadores no es solo lo correcto desde el punto de vista ético, sino también un imperativo comercial.</p>
      
      <div class="bg-mining-50 dark:bg-mining-900/20 p-4 rounded-lg my-6">
        <p class="font-semibold">Para profundizar en protocolos específicos de seguridad minera subterránea, consulte nuestro curso especializado "Gestión Integral de Seguridad en Minería Subterránea" disponible en la sección de formación continua.</p>
      </div>
      
      <p class="text-sm text-gray-500 mt-8">Última actualización: 8 de mayo de 2025 | Revisado por: Comité de Seguridad Minera de EduMining</p>
    `,
    category: "mejores-practicas",
    image: "https://images.unsplash.com/photo-1582584001264-d8efbf406ab6?auto=format&fit=crop&w=800&q=80",
    author: {
      name: "Carlos Ramírez",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      bio: "Ingeniero de Minas con especialización en Seguridad y Prevención de Riesgos. Consultor internacional con experiencia en más de 50 proyectos mineros en América Latina, Norteamérica y África.",
      position: "Director de Seguridad Minera",
      publications: 16,
      linkedin: "https://linkedin.com/in/carlosramirez"
    },
    date: "8 May, 2025",
    readTime: "12 min",
    comments: 18,
    likes: 92,
    shares: 45,
    tags: ["Seguridad Minera", "Minas Subterráneas", "Protocolos de Seguridad", "Prevención de Riesgos", "Tecnología Minera"]
  }
];

// Enhanced related posts with more relevant metadata for SEO
const relatedPosts = [
  {
    id: "2",
    title: "Gestión de Seguridad en Minas Subterráneas: Protocolos Avanzados 2025",
    excerpt: "Análisis detallado de las mejores prácticas y tecnologías para garantizar la máxima seguridad en operaciones mineras bajo tierra según los estándares internacionales actualizados en 2025.",
    category: "mejores-practicas",
    image: "https://images.unsplash.com/photo-1582584001264-d8efbf406ab6?auto=format&fit=crop&w=800&q=80",
    author: "Carlos Ramírez",
    date: "8 May, 2025",
    readTime: "12 min"
  },
  {
    id: "6",
    title: "Minería Espacial: Perspectivas y Desafíos Técnicos para la Próxima Década",
    excerpt: "Un análisis exhaustivo de las posibilidades y retos técnicos que presenta la minería de asteroides y otros cuerpos celestes en la exploración espacial comercial.",
    category: "investigacion",
    image: "https://images.unsplash.com/photo-1464802686167-b939a6910659?auto=format&fit=crop&w=800&q=80",
    author: "Miguel Ángel Vega",
    date: "28 Apr, 2025",
    readTime: "14 min"
  },
  {
    id: "4",
    title: "El Impacto de la IA en la Planificación de Operaciones Mineras: Estudio de Casos 2025",
    excerpt: "Cómo la inteligencia artificial está transformando la forma de planificar y optimizar las operaciones en el sector minero con ejemplos concretos de implementación.",
    category: "tendencias",
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80",
    author: "Ricardo Fuentes",
    date: "3 May, 2025",
    readTime: "7 min"
  }
];

const BlogPost = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { id } = useParams();
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Find the post with the matching ID
  const post = blogPosts.find(post => post.id === id) || blogPosts[0]; // Fallback to first post if not found

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} />
        <main className="flex-1 bg-gray-50 dark:bg-gray-900">
          {/* Hero Section */}
          <div className="relative bg-gradient-to-r from-mining-700 to-engineering-800 text-white py-16">
            <div className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-overlay" style={{backgroundImage: `url(${post.image})`}}></div>
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl mx-auto text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Link to="/blog" className="text-mining-300 hover:text-white transition-colors">
                    Blog
                  </Link>
                  <span>/</span>
                  <Link to={`/blog/category/${post.category}`} className="text-mining-300 hover:text-white transition-colors capitalize">
                    {post.category.replace("-", " ")}
                  </Link>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  {post.title}
                </h1>
                <div className="flex items-center justify-center gap-4 mt-6">
                  <Avatar className="h-10 w-10 border-2 border-white">
                    <AvatarImage src={post.author.avatar} alt={post.author.name} />
                    <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start text-sm">
                    <span className="font-medium">{post.author.name}</span>
                    <div className="flex items-center gap-2 text-xs text-white/80">
                      <Calendar className="h-3 w-3" />
                      <span>{post.date}</span>
                      <span>•</span>
                      <Clock className="h-3 w-3" />
                      <span>{post.readTime} de lectura</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Content Section */}
          <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Main Content */}
              <div className="lg:w-2/3">
                <Card className="border-0 shadow-lg overflow-hidden">
                  <div className="p-8">
                    <div className="prose prose-lg dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: post.content }}></div>
                    
                    <div className="mt-10">
                      <div className="flex flex-wrap gap-2 mb-8">
                        {post.tags.map((tag, index) => (
                          <Link
                            key={index}
                            to={`/blog/tag/${tag.toLowerCase().replace(" ", "-")}`}
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-mining-100 hover:text-mining-700 dark:hover:bg-mining-900/30 dark:hover:text-mining-300 transition-colors"
                          >
                            {tag}
                          </Link>
                        ))}
                      </div>
                      
                      <div className="border-t border-b py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <Button variant="outline" size="sm" className="gap-2">
                            <ThumbsUp className="h-4 w-4" />
                            <span>Me gusta</span>
                          </Button>
                          <Button variant="outline" size="sm" className="gap-2">
                            <BookmarkPlus className="h-4 w-4" />
                            <span>Guardar</span>
                          </Button>
                          <Button variant="outline" size="sm" className="gap-2">
                            <Share2 className="h-4 w-4" />
                            <span>Compartir</span>
                          </Button>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Compartir en:</span>
                          <Button variant="ghost" size="sm" className="rounded-full p-2 h-auto">
                            <Facebook className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="rounded-full p-2 h-auto">
                            <Twitter className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="rounded-full p-2 h-auto">
                            <Linkedin className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="mt-10">
                        <h3 className="text-2xl font-bold mb-4">Sobre el autor</h3>
                        <div className="flex items-center gap-4">
                          <Avatar className="h-20 w-20">
                            <AvatarImage src={post.author.avatar} alt={post.author.name} />
                            <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="text-lg font-medium">{post.author.name}</h4>
                            <p className="text-gray-600 dark:text-gray-400 my-2">{post.author.bio}</p>
                            <Button variant="outline" size="sm">Ver perfil</Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-10">
                        <h3 className="text-2xl font-bold mb-4">Comentarios ({post.comments})</h3>
                        <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg">
                          <h4 className="font-medium mb-4">Deja tu comentario</h4>
                          <textarea
                            placeholder="Escribe tu comentario aquí..."
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-mining-500 dark:focus:ring-mining-400 focus:border-transparent h-32"
                          ></textarea>
                          <div className="flex justify-end mt-4">
                            <Button>Publicar comentario</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
              
              {/* Sidebar */}
              <div className="lg:w-1/3">
                {/* Related Posts */}
                <Card className="mb-8 border-0 shadow">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4">Artículos Relacionados</h3>
                    <div className="space-y-6">
                      {relatedPosts.map(relatedPost => (
                        <div key={relatedPost.id} className="flex gap-4">
                          <div className="flex-shrink-0 w-20 h-20 overflow-hidden rounded">
                            <img
                              src={relatedPost.image}
                              alt={relatedPost.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-grow">
                            <Link to={`/blog/${relatedPost.id}`} className="group">
                              <h4 className="font-semibold line-clamp-2 group-hover:text-mining-600 dark:group-hover:text-mining-400 transition-colors">
                                {relatedPost.title}
                              </h4>
                            </Link>
                            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                              <Clock className="h-3 w-3 mr-1" />
                              <span>{relatedPost.readTime}</span>
                              <span className="mx-1">•</span>
                              <Calendar className="h-3 w-3 mr-1" />
                              <span>{relatedPost.date}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6">
                      <Link to="/blog" className="text-mining-600 dark:text-mining-400 hover:text-mining-700 dark:hover:text-mining-300 flex items-center gap-1 text-sm">
                        Ver todos los artículos
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Popular Tags */}
                <Card className="mb-8 border-0 shadow">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4">Etiquetas Populares</h3>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag, index) => (
                        <Link
                          key={index}
                          to={`/blog/tag/${tag.toLowerCase().replace(" ", "-")}`}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-mining-100 hover:text-mining-700 dark:hover:bg-mining-900/30 dark:hover:text-mining-300 transition-colors"
                        >
                          {tag}
                        </Link>
                      ))}
                      <Link
                        to={`/blog/tag/seguridad`}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-mining-100 hover:text-mining-700 dark:hover:bg-mining-900/30 dark:hover:text-mining-300 transition-colors"
                      >
                        Seguridad
                      </Link>
                      <Link
                        to={`/blog/tag/extraccion`}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-mining-100 hover:text-mining-700 dark:hover:bg-mining-900/30 dark:hover:text-mining-300 transition-colors"
                      >
                        Extracción
                      </Link>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Newsletter */}
                <Card className="mb-8 border-0 shadow bg-gradient-to-br from-mining-50 to-engineering-50 dark:from-mining-900/20 dark:to-engineering-900/20">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">¿Te gustó este artículo?</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Suscríbete para recibir contenido similar directamente en tu correo.
                    </p>
                    <div className="space-y-4">
                      <input
                        type="email"
                        placeholder="Tu correo electrónico"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-mining-500 dark:focus:ring-mining-400 focus:border-transparent"
                      />
                      <Button className="w-full bg-mining-600 hover:bg-mining-700 text-white">
                        Suscribirse al newsletter
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Featured Resources */}
                <Card className="border-0 shadow">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4">Recursos Relacionados</h3>
                    <div className="space-y-4">
                      <div className="flex gap-4 items-center">
                        <div className="flex-shrink-0 w-12 h-12 bg-engineering-100 dark:bg-engineering-900/30 rounded flex items-center justify-center">
                          <BookOpen className="h-6 w-6 text-engineering-600 dark:text-engineering-400" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm">Guía de Sostenibilidad Minera</h4>
                          <Link to="/resources/sustainability-guide" className="text-xs text-mining-600 dark:text-mining-400 hover:underline">
                            Descargar PDF
                          </Link>
                        </div>
                      </div>
                      <div className="flex gap-4 items-center">
                        <div className="flex-shrink-0 w-12 h-12 bg-mining-100 dark:bg-mining-900/30 rounded flex items-center justify-center">
                          <BookOpen className="h-6 w-6 text-mining-600 dark:text-mining-400" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm">Curso: Tecnologías Verdes en Minería</h4>
                          <Link to="/courses/green-mining-tech" className="text-xs text-mining-600 dark:text-mining-400 hover:underline">
                            Ver curso
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* Bottom Call to Action */}
            <div className="mt-16 bg-gradient-to-r from-mining-600 to-engineering-600 rounded-xl text-white p-8 shadow-lg">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-2xl font-bold mb-4">Amplía tus conocimientos en minería sostenible</h2>
                <p className="mb-6">
                  Explora nuestros cursos especializados en tecnologías de extracción sostenible y 
                  mejores prácticas ambientales para la industria minera.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button size="lg" className="bg-white text-mining-700 hover:bg-gray-100">
                    Explorar cursos
                  </Button>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Ver certificaciones
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default BlogPost;
