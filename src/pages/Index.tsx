import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { GraduationCap, BookOpen, Video, TrendingUp, CheckCircle2, ArrowRight } from "lucide-react";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar toggleSidebar={toggleSidebar} />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-mining-700 to-engineering-800 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1400&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="container mx-auto px-4 py-24 sm:py-32 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Formación especializada en Ingeniería y Minería
            </h1>
            <p className="text-xl mb-8 text-white/90">
              Accede a cursos de alta calidad impartidos por profesionales
              líderes de la industria. Desarrolla tus habilidades y avanza en tu
              carrera profesional.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-mining-500 hover:bg-mining-600">
                Explorar cursos
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 border-white text-white">
                Planes de membresía
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-6 mt-8 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-mining-300" />
                <span>+200 cursos especializados</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-mining-300" />
                <span>Certificaciones reconocidas</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-mining-300" />
                <span>Instructores expertos</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">¿Por qué elegirnos?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Plataforma educativa especializada en el sector minero e ingeniería con cursos diseñados para profesionales.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 rounded-lg bg-mining-100 dark:bg-mining-900/30 flex items-center justify-center mb-4">
                  <GraduationCap className="h-6 w-6 text-mining-600 dark:text-mining-400" />
                </div>
                <CardTitle className="text-xl">Especialización</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  Contenido diseñado por expertos en ingeniería, minería y gestión para aplicación inmediata.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 rounded-lg bg-engineering-100 dark:bg-engineering-900/30 flex items-center justify-center mb-4">
                  <Video className="h-6 w-6 text-engineering-600 dark:text-engineering-400" />
                </div>
                <CardTitle className="text-xl">Formatos Flexibles</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  Aprende a tu ritmo con cursos asíncronos o participa en clases en vivo con instructores.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 rounded-lg bg-management-100 dark:bg-management-900/30 flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-management-600 dark:text-management-400" />
                </div>
                <CardTitle className="text-xl">Gamificación</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  Sistema de puntos, insignias y niveles que mantienen la motivación durante tu aprendizaje.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 rounded-lg bg-mining-100 dark:bg-mining-900/30 flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-mining-600 dark:text-mining-400" />
                </div>
                <CardTitle className="text-xl">Certificaciones</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  Obtén certificados reconocidos en la industria que validan tus conocimientos y habilidades.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Categories Section */}
      <div className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nuestras Especialidades</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Explora nuestras áreas de conocimiento y encuentra el programa que impulse tu carrera.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="overflow-hidden hover-card-effect border-0 shadow">
              <div className="h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1576743005164-8f14b7c7b84a?auto=format&fit=crop&w=800&q=80"
                  alt="Ingeniería"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-engineering-700 dark:text-engineering-400">Ingeniería</CardTitle>
                <CardDescription>
                  Desde diseño de estructuras hasta ingeniería de procesos
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-0">
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">Ingeniería Civil para Minería</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">Diseño de Procesos Industriales</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">Automatización y Control</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="pt-4">
                <Button variant="ghost" className="w-full text-engineering-600 hover:text-engineering-800 dark:text-engineering-400 dark:hover:text-engineering-300 hover:bg-engineering-50 dark:hover:bg-engineering-900/20 justify-between">
                  <span>Ver cursos</span>
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="overflow-hidden hover-card-effect border-0 shadow">
              <div className="h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1579254646874-4c70605b060b?auto=format&fit=crop&w=800&q=80"
                  alt="Minería"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-mining-700 dark:text-mining-400">Minería</CardTitle>
                <CardDescription>
                  Tecnologías de extracción y procesamiento minero
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-0">
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">Técnicas de Exploración</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">Seguridad en Operaciones Mineras</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">Procesamiento de Minerales</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="pt-4">
                <Button variant="ghost" className="w-full text-mining-600 hover:text-mining-800 dark:text-mining-400 dark:hover:text-mining-300 hover:bg-mining-50 dark:hover:bg-mining-900/20 justify-between">
                  <span>Ver cursos</span>
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="overflow-hidden hover-card-effect border-0 shadow">
              <div className="h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1553484771-371a605b060b?auto=format&fit=crop&w=800&q=80"
                  alt="Gestión"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-management-700 dark:text-management-400">Gestión</CardTitle>
                <CardDescription>
                  Administración eficiente de proyectos y operaciones
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-0">
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">Dirección de Proyectos Mineros</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">Evaluación Económica de Proyectos</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">Gestión Ambiental y Sostenibilidad</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="pt-4">
                <Button variant="ghost" className="w-full text-management-600 hover:text-management-800 dark:text-management-400 dark:hover:text-management-300 hover:bg-management-50 dark:hover:bg-management-900/20 justify-between">
                  <span>Ver cursos</span>
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-gradient-to-r from-engineering-700 to-mining-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Comienza tu formación profesional hoy</h2>
            <p className="text-lg mb-8 text-white/80">
              Únete a miles de profesionales que han potenciado su carrera con nuestros programas formativos.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-mining-800 hover:bg-gray-100">
                Ver todos los cursos
              </Button>
              <Link to="/dashboard">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Acceder a mi cuenta
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
