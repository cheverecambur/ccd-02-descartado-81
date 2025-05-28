import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CourseCard, { CourseCardProps } from "@/components/dashboard/CourseCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Search, Filter, BookOpen, Clock } from "lucide-react";

const Courses = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Sample courses data
  const allCourses: CourseCardProps[] = [
    {
      id: "course-1",
      title: "Fundamentos de Geomecánica Aplicada a la Minería",
      description: "Estudio de las propiedades mecánicas de rocas y suelos para el diseño y análisis de estructuras en minería.",
      instructor: "Dr. Roberto Sánchez",
      category: "mining",
      level: "intermediate",
      duration: "24h 30m",
      enrolled: 1241,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1626438366685-c6dbad875f0b?auto=format&fit=crop&w=800&q=80",
      progress: 65,
    },
    {
      id: "course-2",
      title: "Gestión de Proyectos Mineros",
      description: "Metodologías y herramientas para la gestión eficiente de proyectos en la industria minera.",
      instructor: "Ing. Carmen Rodríguez",
      category: "management",
      level: "advanced",
      duration: "36h 15m",
      enrolled: 893,
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1638536531518-b0b8fff29c2b?auto=format&fit=crop&w=800&q=80",
      progress: 32,
    },
    {
      id: "course-3",
      title: "Tecnologías de Procesamiento de Minerales",
      description: "Técnicas y métodos modernos para el tratamiento y procesamiento de minerales.",
      instructor: "Dr. Pedro Valdés",
      category: "engineering",
      level: "advanced",
      duration: "28h 45m",
      enrolled: 765,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?auto=format&fit=crop&w=800&q=80",
      progress: 18,
    },
    {
      id: "course-4",
      title: "Seguridad y Prevención de Riesgos en Minería",
      description: "Protocolos y procedimientos para garantizar la seguridad en operaciones mineras.",
      instructor: "Ing. Laura Méndez",
      category: "mining",
      level: "beginner",
      duration: "16h 20m",
      enrolled: 1578,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=800&q=80",
      featured: true,
    },
    {
      id: "course-5",
      title: "Ingeniería de Ventilación en Minería Subterránea",
      description: "Diseño y mantenimiento de sistemas de ventilación para minas subterráneas.",
      instructor: "Dr. Antonio Guzmán",
      category: "engineering",
      level: "intermediate",
      duration: "22h 10m",
      enrolled: 642,
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1604334204928-e5a248c41090?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "course-6",
      title: "Evaluación Económica de Proyectos Mineros",
      description: "Análisis financiero y económico para la viabilidad de proyectos en el sector minero.",
      instructor: "Dra. María Fernández",
      category: "management",
      level: "advanced",
      duration: "18h 30m",
      enrolled: 524,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "course-7",
      title: "Sostenibilidad en la Industria Minera",
      description: "Estrategias y prácticas para una minería sostenible y responsable con el medio ambiente.",
      instructor: "Dr. Javier López",
      category: "management",
      level: "intermediate",
      duration: "20h 15m",
      enrolled: 735,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "course-8",
      title: "Modelamiento Geológico y Estimación de Recursos",
      description: "Técnicas de modelamiento geológico y métodos de estimación de recursos minerales.",
      instructor: "Ing. Alberto Torres",
      category: "engineering",
      level: "advanced",
      duration: "32h 20m",
      enrolled: 489,
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "course-9",
      title: "Hidrometalurgia y Procesamiento de Minerales",
      description: "Fundamentos y aplicaciones de procesos hidrometalúrgicos para la extracción de metales.",
      instructor: "Dra. Elena Martínez",
      category: "mining",
      level: "intermediate",
      duration: "26h 30m",
      enrolled: 612,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1578079999898-221a4df608f6?auto=format&fit=crop&w=800&q=80",
    },
  ];

  // Filter courses by category
  const engineeringCourses = allCourses.filter(course => course.category === "engineering");
  const miningCourses = allCourses.filter(course => course.category === "mining");
  const managementCourses = allCourses.filter(course => course.category === "management");
  
  // My courses is a subset of allCourses with progress > 0
  const myCourses = allCourses.filter(course => course.progress && course.progress > 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar toggleSidebar={toggleSidebar} />
      
      <div className="flex flex-1">
        <div className="flex-1 transition-all duration-200 ease-in-out">
          <main className="p-4 md:p-6 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold">Cursos</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                  Explora nuestra biblioteca de cursos especializados.
                </p>
              </div>
              
              <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Buscar cursos..."
                    className="pl-8 w-full sm:w-64"
                  />
                </div>
                
                <Select defaultValue="all">
                  <SelectTrigger className="w-full sm:w-40">
                    <div className="flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Filtrar por" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los cursos</SelectItem>
                    <SelectItem value="popular">Más populares</SelectItem>
                    <SelectItem value="recent">Más recientes</SelectItem>
                    <SelectItem value="price-low">Precio: Bajo a Alto</SelectItem>
                    <SelectItem value="price-high">Precio: Alto a Bajo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid grid-cols-2 sm:grid-cols-5 mb-6">
                <TabsTrigger value="all">Todos</TabsTrigger>
                <TabsTrigger value="my-courses">Mis Cursos</TabsTrigger>
                <TabsTrigger value="engineering">Ingeniería</TabsTrigger>
                <TabsTrigger value="mining">Minería</TabsTrigger>
                <TabsTrigger value="management">Gestión</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <BookOpen className="h-4 w-4" />
                    <span>{allCourses.length} cursos disponibles</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="h-4 w-4" />
                    <span>Duración total: 225h+</span>
                  </div>
                </div>
                
                <Separator className="mb-6" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {allCourses.map((course) => (
                    <CourseCard key={course.id} {...course} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="my-courses">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <BookOpen className="h-4 w-4" />
                    <span>{myCourses.length} cursos en progreso</span>
                  </div>
                </div>
                
                <Separator className="mb-6" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {myCourses.map((course) => (
                    <CourseCard key={course.id} {...course} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="engineering">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <BookOpen className="h-4 w-4" />
                    <span>{engineeringCourses.length} cursos de ingeniería</span>
                  </div>
                </div>
                
                <Separator className="mb-6" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {engineeringCourses.map((course) => (
                    <CourseCard key={course.id} {...course} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="mining">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <BookOpen className="h-4 w-4" />
                    <span>{miningCourses.length} cursos de minería</span>
                  </div>
                </div>
                
                <Separator className="mb-6" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {miningCourses.map((course) => (
                    <CourseCard key={course.id} {...course} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="management">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <BookOpen className="h-4 w-4" />
                    <span>{managementCourses.length} cursos de gestión</span>
                  </div>
                </div>
                
                <Separator className="mb-6" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {managementCourses.map((course) => (
                    <CourseCard key={course.id} {...course} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </main>
          
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Courses;
