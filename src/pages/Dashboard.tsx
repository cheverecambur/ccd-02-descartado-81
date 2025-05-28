import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DashboardStats from "@/components/dashboard/DashboardStats";
import CourseCard, { CourseCardProps } from "@/components/dashboard/CourseCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Calendar, Trophy, Award, BookOpen, Clock } from "lucide-react";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Sample course data
  const inProgressCourses: CourseCardProps[] = [
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
  ];

  const recommendedCourses: CourseCardProps[] = [
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
  ];

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

  // Upcoming events data
  const upcomingEvents = [
    {
      id: 1,
      title: "Webinar: Nuevas Tecnologías en Minería 4.0",
      date: "12 Mayo, 2023",
      time: "15:00 - 16:30",
      instructor: "Dr. Jorge Ramírez",
    },
    {
      id: 2,
      title: "Taller Práctico: Simulación de Procesos Mineros",
      date: "15 Mayo, 2023",
      time: "10:00 - 13:00",
      instructor: "Ing. Claudia Moreno",
    },
    {
      id: 3,
      title: "Certificación: Seguridad en Operaciones Mineras",
      date: "20 Mayo, 2023",
      time: "09:00 - 17:00",
      instructor: "Multiple instructores",
    },
  ];

  // Achievements data
  const achievements = [
    {
      id: 1,
      title: "Completado 5 cursos",
      icon: <Trophy className="h-8 w-8 text-amber-500" />,
      date: "23 Abril, 2023",
    },
    {
      id: 2,
      title: "Primer certificado obtenido",
      icon: <Award className="h-8 w-8 text-blue-500" />,
      date: "10 Marzo, 2023",
    },
    {
      id: 3,
      title: "10 días de racha de estudio",
      icon: <BookOpen className="h-8 w-8 text-green-500" />,
      date: "Actual",
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
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                  Bienvenido de nuevo, Carlos. Continúa con tu aprendizaje.
                </p>
              </div>
              <div className="mt-4 md:mt-0 flex space-x-2">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Bell className="h-4 w-4" />
                  <span>Notificaciones</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Calendario</span>
                </Button>
              </div>
            </div>
            
            <DashboardStats />
            
            <div className="mt-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <h2 className="text-xl font-bold">Tus cursos en progreso</h2>
                <Link to="/courses" className="text-primary hover:underline mt-2 md:mt-0">
                  Ver todos los cursos
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {inProgressCourses.map((course) => (
                  <CourseCard key={course.id} {...course} />
                ))}
              </div>
            </div>
            
            <div className="mt-12">
              <h2 className="text-xl font-bold mb-6">Actividades recientes</h2>
              
              <Tabs defaultValue="recommended" className="w-full">
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="recommended">Recomendados</TabsTrigger>
                  <TabsTrigger value="live">Cursos en Vivo</TabsTrigger>
                  <TabsTrigger value="events">Eventos</TabsTrigger>
                </TabsList>
                
                <TabsContent value="recommended">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recommendedCourses.map((course) => (
                      <CourseCard key={course.id} {...course} />
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="live">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {liveCourses.map((course) => (
                      <CourseCard key={course.id} {...course} />
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="events">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {upcomingEvents.map((event) => (
                      <div key={event.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-3">
                          <div className="bg-mining-100 dark:bg-mining-900/30 text-mining-800 dark:text-mining-300 text-xs font-medium px-2.5 py-0.5 rounded">
                            Próximo evento
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">{event.date}</span>
                        </div>
                        <h3 className="font-semibold mb-2">{event.title}</h3>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{event.time}</span>
                        </div>
                        <div className="text-sm">Instructor: {event.instructor}</div>
                        <div className="mt-4">
                          <Button className="w-full" variant="outline">
                            Agregar al calendario
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="mt-12 mb-8">
              <h2 className="text-xl font-bold mb-6">Tus logros</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="border rounded-lg p-6 flex items-center space-x-4 hover:shadow-md transition-shadow bg-white dark:bg-gray-800">
                    <div className="flex-shrink-0">
                      {achievement.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold">{achievement.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {achievement.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
          
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
