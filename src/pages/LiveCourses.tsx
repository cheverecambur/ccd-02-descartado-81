import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CourseCard, { CourseCardProps } from "@/components/dashboard/CourseCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Video, 
  Users, 
  Clock, 
  PlayCircle, 
  Filter, 
  Bell, 
  ArrowRight, 
  Calendar as CalendarIcon, 
  ExternalLink
} from "lucide-react";

const LiveCourses = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Live course data (now playing or upcoming)
  const liveCourses: CourseCardProps[] = [
    {
      id: "live-1",
      title: "Webinar: Innovaciones en Perforación y Voladura",
      description: "Aprende sobre las últimas tecnologías y técnicas en perforación y voladura para operaciones mineras.",
      instructor: "Ing. Carlos Morales",
      category: "mining",
      level: "intermediate",
      duration: "2h",
      enrolled: 342,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80",
      isLive: true,
    },
    {
      id: "live-2",
      title: "Taller: Modelamiento Geológico 3D",
      description: "Sesión práctica sobre el uso de software especializado para modelamiento geológico tridimensional.",
      instructor: "Dr. Miguel Soto",
      category: "engineering",
      level: "advanced",
      duration: "3h",
      enrolled: 189,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80",
      liveDate: "Mañana - 18:00",
    },
    {
      id: "live-3",
      title: "Panel: Desafíos Ambientales en la Minería",
      description: "Discusión con expertos sobre los retos ambientales actuales y soluciones sostenibles.",
      instructor: "Panel de expertos",
      category: "management",
      level: "intermediate",
      duration: "1h 30m",
      enrolled: 276,
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80",
      liveDate: "Viernes - 15:30",
    },
  ];

  // Upcoming live sessions
  const upcomingLiveCourses: CourseCardProps[] = [
    {
      id: "upcoming-1",
      title: "Curso en Vivo: Seguridad Minera con Nuevas Normativas",
      description: "Actualización sobre normativas de seguridad en operaciones mineras y su aplicación práctica.",
      instructor: "Ing. Patricia Gómez",
      category: "mining",
      level: "beginner",
      duration: "5h (5 sesiones)",
      enrolled: 425,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=800&q=80",
      liveDate: "Inicia: 15 Mayo",
    },
    {
      id: "upcoming-2",
      title: "Bootcamp: Gestión de Proyectos Mineros",
      description: "Programa intensivo de capacitación en metodologías de gestión de proyectos para el sector minero.",
      instructor: "Dr. Manuel Vega",
      category: "management",
      level: "advanced",
      duration: "20h (10 sesiones)",
      enrolled: 312,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80",
      liveDate: "Inicia: 20 Mayo",
    },
    {
      id: "upcoming-3",
      title: "Workshop: Tecnologías de Procesamiento de Minerales",
      description: "Taller práctico sobre las últimas tecnologías en procesamiento de minerales y su implementación.",
      instructor: "Dra. Laura Sandoval",
      category: "engineering",
      level: "intermediate",
      duration: "12h (4 sesiones)",
      enrolled: 198,
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?auto=format&fit=crop&w=800&q=80",
      liveDate: "Inicia: 28 Mayo",
    },
  ];

  // Previous recorded sessions
  const recordedSessions = [
    {
      id: "recorded-1",
      title: "Minería Digital: Automatización y Control Remoto",
      description: "Cómo la digitalización está transformando las operaciones mineras con sistemas automatizados y control remoto.",
      instructor: "Dr. Ricardo Montero",
      category: "engineering",
      date: "25 Abril, 2023",
      duration: "1h 45m",
      viewers: 834,
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "recorded-2",
      title: "Mesa Redonda: Sostenibilidad en la Industria Minera",
      description: "Discusión sobre prácticas sostenibles y responsabilidad ambiental en la industria minera actual.",
      instructor: "Panel de expertos",
      category: "management",
      date: "18 Abril, 2023",
      duration: "2h 10m",
      viewers: 756,
      image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "recorded-3",
      title: "Webinar: Avances en Hidrometalurgia",
      description: "Los últimos avances en procesos hidrometalúrgicos para la extracción y recuperación de metales.",
      instructor: "Dra. Carmen Valdivia",
      category: "mining",
      date: "10 Abril, 2023",
      duration: "1h 30m",
      viewers: 689,
      image: "https://images.unsplash.com/photo-1578079999898-221a4df608f6?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "recorded-4",
      title: "Masterclass: Liderazgo en Operaciones Mineras",
      description: "Estrategias de liderazgo efectivo en la gestión de equipos y operaciones en el sector minero.",
      instructor: "Ing. Felipe Rojas",
      category: "management",
      date: "2 Abril, 2023",
      duration: "2h 20m",
      viewers: 712,
      image: "https://images.unsplash.com/photo-1553484771-371a605b060b?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar toggleSidebar={toggleSidebar} />
      
      <div className="flex flex-1">
        <div className="flex-1 transition-all duration-200 ease-in-out">
          <main className="p-4 md:p-6 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold">Cursos en Vivo</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                  Clases y eventos en tiempo real con instructores expertos.
                </p>
              </div>
              
              <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
                <Badge variant="outline" className="flex items-center gap-1 px-3 py-1">
                  <Video className="h-3 w-3" />
                  <span>15 sesiones esta semana</span>
                </Badge>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Calendario</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Filter className="h-4 w-4" />
                  <span>Filtrar</span>
                </Button>
              </div>
            </div>
            
            {/* Featured Live Session - Redesigned */}
            <div className="relative rounded-xl overflow-hidden mb-8 shadow-lg border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1600&q=80"
                alt="Sesión destacada"
                className="w-full h-[420px] object-cover object-center transform hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex flex-col justify-end p-8">
                <div className="flex items-center mb-3">
                  <span className="bg-red-600 text-white px-4 py-1.5 rounded-full text-sm font-medium flex items-center">
                    <span className="animate-pulse relative flex h-3 w-3 mr-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                    </span>
                    EN VIVO AHORA
                  </span>
                  <span className="ml-4 text-white/90 text-sm flex items-center">
                    <Users className="h-4 w-4 mr-1.5" /> 
                    <span className="font-medium">128 asistentes</span>
                  </span>
                  <span className="ml-4 text-white/90 text-sm flex items-center">
                    <Clock className="h-4 w-4 mr-1.5" />
                    <span className="font-medium">1h 45m restantes</span>
                  </span>
                </div>
                
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight">
                  Webinar: Innovaciones en Perforación y Voladura
                </h2>
                <p className="text-white/90 mb-6 max-w-3xl text-base md:text-lg">
                  Únete a nuestro experto Ing. Carlos Morales para conocer las últimas tecnologías y técnicas en perforación y voladura para operaciones mineras más eficientes y seguras.
                </p>
                
                <div className="flex flex-wrap gap-4 items-center">
                  <Button variant="join" size="xl" className="group">
                    <PlayCircle className="h-5 w-5 mr-1 group-hover:animate-pulse" />
                    <span>Unirme ahora</span>
                    <ArrowRight className="ml-1 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all" />
                  </Button>
                  <Button variant="outline" size="xl" className="bg-white/10 hover:bg-white/20 border-white/20 text-white hover:text-white">
                    <CalendarIcon className="h-5 w-5" />
                    <span>Añadir a calendario</span>
                  </Button>
                  <div className="ml-auto hidden md:flex items-center text-white/80 text-sm">
                    <span className="mr-2">Compartir:</span>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-2.719 0-4.924 2.205-4.924 4.924 0 .386.044.762.127 1.122-4.092-.205-7.72-2.166-10.149-5.145-.423.727-.666 1.573-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.247-2.229-.616v.061c0 2.386 1.693 4.375 3.946 4.828-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 14-7.496 14-13.986 0-.21 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548z"></path></svg>
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg>
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path></svg>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <Tabs defaultValue="live" className="w-full">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="live">En Vivo / Próximos</TabsTrigger>
                <TabsTrigger value="upcoming">Cursos Programados</TabsTrigger>
                <TabsTrigger value="recorded">Grabaciones</TabsTrigger>
              </TabsList>
              
              <TabsContent value="live">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="font-medium">Sesiones en vivo y próximas</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="h-4 w-4" />
                    <span>Actualizado hace 5 minutos</span>
                  </div>
                </div>
                
                <Separator className="mb-6" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {liveCourses.map((course) => (
                    <CourseCard key={course.id} {...course} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="upcoming">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="font-medium">Próximos programas en vivo</h3>
                  <Button variant="outline" size="sm">
                    Ver calendario completo
                  </Button>
                </div>
                
                <Separator className="mb-6" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcomingLiveCourses.map((course) => (
                    <CourseCard key={course.id} {...course} />
                  ))}
                </div>
                
                <div className="text-center mt-8">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    ¿No encuentras el tema que buscas? Propón un nuevo curso en vivo
                  </p>
                  <Button variant="outline">Sugerir un tema</Button>
                </div>
              </TabsContent>
              
              <TabsContent value="recorded">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="font-medium">Sesiones grabadas</h3>
                  <select className="text-sm bg-transparent border rounded-md px-2 py-1">
                    <option>Más recientes</option>
                    <option>Más vistos</option>
                    <option>Mejor valorados</option>
                  </select>
                </div>
                
                <Separator className="mb-6" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {recordedSessions.map((session) => (
                    <div key={session.id} className="flex flex-col sm:flex-row gap-4 border rounded-lg overflow-hidden bg-white dark:bg-gray-800 hover:shadow-md transition-shadow">
                      <div className="sm:w-48 h-48 sm:h-auto relative">
                        <img
                          src={session.image}
                          alt={session.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity">
                          <PlayCircle className="h-12 w-12 text-white" />
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          {session.duration}
                        </div>
                      </div>
                      
                      <div className="flex-1 p-4">
                        <div className="flex items-center mb-2">
                          <span className={`badge-category badge-category-${session.category}`}>
                            {session.category === "engineering" ? "Ingeniería" :
                             session.category === "mining" ? "Minería" : "Gestión"}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                            {session.date}
                          </span>
                        </div>
                        
                        <h4 className="font-semibold mb-1">{session.title}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-2">
                          {session.description}
                        </p>
                        
                        <div className="text-sm">Instructor: {session.instructor}</div>
                        
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <Users className="h-4 w-4 mr-1" />
                            <span>{session.viewers} visualizaciones</span>
                          </div>
                          
                          <Button variant="view" size="sm" className="flex items-center gap-1.5">
                            <span>Ver grabación</span>
                            <ExternalLink className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="text-center mt-8">
                  <Button variant="outline">Cargar más grabaciones</Button>
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

export default LiveCourses;
