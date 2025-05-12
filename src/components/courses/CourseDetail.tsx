
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  CheckCircle,
  Clock,
  Users,
  Calendar,
  Star,
  PlayCircle,
  FileText,
  BookmarkCheck,
  Monitor,
  Award,
  MessageSquare,
  PenTool,
  Folder,
  Lock,
  Check,
} from "lucide-react";

interface CourseModule {
  id: string;
  title: string;
  duration: string;
  lessons: {
    id: string;
    title: string;
    duration: string;
    type: "video" | "quiz" | "reading";
    completed?: boolean;
    locked?: boolean;
  }[];
}

interface CourseDetailProps {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  instructor: {
    name: string;
    title: string;
    avatar: string;
  };
  category: "engineering" | "mining" | "management";
  level: "beginner" | "intermediate" | "advanced";
  duration: string;
  enrolled: number;
  rating: number;
  reviews: number;
  image: string;
  progress?: number;
  lastUpdated: string;
  language: string;
  modules: CourseModule[];
  isLive?: boolean;
  liveDate?: string;
}

const CourseDetail = ({
  id,
  title,
  description,
  longDescription,
  instructor,
  category,
  level,
  duration,
  enrolled,
  rating,
  reviews,
  image,
  progress = 0,
  lastUpdated,
  language,
  modules,
  isLive = false,
  liveDate,
}: CourseDetailProps) => {
  const [activeTab, setActiveTab] = useState("content");
  const [expandedModules, setExpandedModules] = useState<string[]>([modules[0]?.id]);

  const toggleModule = (moduleId: string) => {
    if (expandedModules.includes(moduleId)) {
      setExpandedModules(expandedModules.filter((id) => id !== moduleId));
    } else {
      setExpandedModules([...expandedModules, moduleId]);
    }
  };

  const categoryLabel = {
    engineering: "Ingeniería",
    mining: "Minería",
    management: "Gestión",
  };

  const levelLabel = {
    beginner: "Principiante",
    intermediate: "Intermedio",
    advanced: "Avanzado",
  };

  const totalLessons = modules.reduce(
    (count, module) => count + module.lessons.length,
    0
  );

  const completedLessons = modules.reduce(
    (count, module) =>
      count +
      module.lessons.filter((lesson) => lesson.completed).length,
    0
  );

  return (
    <div className="container max-w-6xl py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="relative rounded-lg overflow-hidden mb-6">
            <img
              src={image}
              alt={title}
              className="w-full h-[300px] object-cover object-center"
            />
            {isLive && (
              <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-md text-sm font-medium flex items-center">
                <span className="animate-pulse relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                EN VIVO
              </div>
            )}
            
            {liveDate && !isLive && (
              <div className="absolute top-4 right-4 bg-gray-800/70 backdrop-blur-sm text-white px-3 py-1 rounded-md text-sm font-medium flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{liveDate}</span>
              </div>
            )}
            
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <div className="flex flex-wrap gap-2 mb-2">
                <span className={`badge-category badge-category-${category}`}>
                  {categoryLabel[category]}
                </span>
                <span className={`badge-level badge-level-${level}`}>
                  {levelLabel[level]}
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">{title}</h1>
              <p className="text-white/80 mt-2">{description}</p>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="content">Contenido del Curso</TabsTrigger>
              <TabsTrigger value="description">Descripción</TabsTrigger>
              <TabsTrigger value="reviews">Reseñas</TabsTrigger>
            </TabsList>
            
            <TabsContent value="content" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">Módulos del curso</h3>
                <div className="text-sm">
                  {completedLessons} de {totalLessons} lecciones completadas
                </div>
              </div>
              
              <Progress value={(completedLessons / totalLessons) * 100} className="h-1" />
              
              <div className="space-y-4 mt-4">
                {modules.map((module) => (
                  <div key={module.id} className="border rounded-md overflow-hidden">
                    <button
                      className="w-full flex items-center justify-between p-4 bg-secondary/50 dark:bg-secondary/30 hover:bg-secondary/70 dark:hover:bg-secondary/50 transition-colors"
                      onClick={() => toggleModule(module.id)}
                    >
                      <div className="flex items-center">
                        <BookOpen className="h-5 w-5 mr-2" />
                        <h4 className="font-medium">{module.title}</h4>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm text-gray-500 dark:text-gray-400 mr-3">
                          {module.duration}
                        </span>
                        <svg
                          className={`h-5 w-5 transition-transform ${
                            expandedModules.includes(module.id) ? "rotate-180" : ""
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </button>
                    
                    {expandedModules.includes(module.id) && (
                      <div className="p-4">
                        <ul className="space-y-2">
                          {module.lessons.map((lesson) => (
                            <li
                              key={lesson.id}
                              className={`flex items-center justify-between p-2 rounded-md ${
                                lesson.completed
                                  ? "bg-green-50 dark:bg-green-900/10"
                                  : lesson.locked
                                  ? "bg-gray-50 dark:bg-gray-800/50"
                                  : "hover:bg-gray-50 dark:hover:bg-gray-800/30"
                              }`}
                            >
                              <div className="flex items-center">
                                {lesson.type === "video" && <Play className="h-4 w-4 mr-3" />}
                                {lesson.type === "quiz" && <FileText className="h-4 w-4 mr-3" />}
                                {lesson.type === "reading" && <BookOpen className="h-4 w-4 mr-3" />}
                                
                                <span className={lesson.locked ? "text-gray-400" : ""}>
                                  {lesson.title}
                                </span>
                                
                                {lesson.type === "quiz" && (
                                  <span className="ml-2 text-xs px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                                    Quiz
                                  </span>
                                )}
                              </div>
                              
                              <div className="flex items-center">
                                <span className="text-sm text-gray-500 dark:text-gray-400 mr-3">
                                  {lesson.duration}
                                </span>
                                {lesson.completed ? (
                                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                                ) : lesson.locked ? (
                                  <Lock className="h-4 w-4 text-gray-400" />
                                ) : (
                                  <Play className="h-4 w-4 text-primary" />
                                )}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="description">
              <div className="prose dark:prose-invert max-w-none">
                <h3 className="text-xl font-bold mb-4">Descripción del curso</h3>
                <p>{longDescription}</p>
                
                <h4 className="font-bold mt-6 mb-2">Lo que aprenderás</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Comprender los principios fundamentales de la ingeniería de minas.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Aplicar técnicas avanzadas de extracción minera.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Gestionar proyectos mineros de forma eficiente y segura.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Implementar protocolos de seguridad conforme a regulaciones internacionales.</span>
                  </li>
                </ul>
                
                <h4 className="font-bold mt-6 mb-2">Requisitos previos</h4>
                <ul className="space-y-1 list-disc pl-5">
                  <li>Conocimientos básicos de geología</li>
                  <li>Experiencia previa en entornos industriales (recomendado)</li>
                  <li>Comprensión de matemáticas y física a nivel universitario</li>
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews">
              <div className="space-y-6">
                <h3 className="text-xl font-bold">Valoraciones y Reseñas</h3>
                
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <div className="text-5xl font-bold">{rating.toFixed(1)}</div>
                    <div className="flex mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(rating)
                              ? "fill-amber-400 text-amber-400"
                              : "text-gray-300 dark:text-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {reviews} valoraciones
                    </div>
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    {[5, 4, 3, 2, 1].map((star) => {
                      const percentage = star === 5 ? 70 : star === 4 ? 20 : star === 3 ? 7 : star === 2 ? 2 : 1;
                      return (
                        <div key={star} className="flex items-center">
                          <div className="flex items-center mr-2">
                            <span className="text-sm mr-1">{star}</span>
                            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                          </div>
                          <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-amber-400"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm ml-2">{percentage}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div className="mt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-medium">Reseñas recientes</h4>
                    <select className="text-sm bg-transparent border rounded-md px-2 py-1">
                      <option>Más recientes</option>
                      <option>Mejor calificados</option>
                      <option>Peor calificados</option>
                    </select>
                  </div>
                  
                  <div className="space-y-6">
                    {/* Sample reviews */}
                    <div className="border-b pb-6">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start">
                          <img
                            src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&h=200&auto=format&fit=crop"
                            alt="Avatar"
                            className="w-10 h-10 rounded-full mr-3 object-cover"
                          />
                          <div>
                            <h5 className="font-medium">Carlos Méndez</h5>
                            <div className="flex items-center mt-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < 5
                                      ? "fill-amber-400 text-amber-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                              <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                                hace 2 semanas
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="mt-3 text-sm">
                        Excelente curso, muy completo y con aplicaciones prácticas que he podido implementar inmediatamente en mi trabajo. El instructor explica claramente conceptos complejos.
                      </p>
                    </div>
                    
                    <div className="border-b pb-6">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start">
                          <img
                            src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&auto=format&fit=crop"
                            alt="Avatar"
                            className="w-10 h-10 rounded-full mr-3 object-cover"
                          />
                          <div>
                            <h5 className="font-medium">Ana Martínez</h5>
                            <div className="flex items-center mt-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < 4
                                      ? "fill-amber-400 text-amber-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                              <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                                hace 1 mes
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="mt-3 text-sm">
                        Muy buen curso, aunque algunas secciones podrían actualizarse con ejemplos más recientes. En general, el material es valioso y me ha ayudado a comprender mejor los procesos mineros.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="lg:col-span-1">
          <div className="border rounded-lg p-6 space-y-6 sticky top-24">
            {progress > 0 ? (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progreso del curso</span>
                  <span className="font-medium">{progress}%</span>
                </div>
                <Progress value={progress} className="h-1.5" />
                <Button variant="view" className="w-full mt-3 group">
                  <Play className="h-4 w-4 mr-1 group-hover:animate-pulse" />
                  <span>Continuar aprendiendo</span>
                </Button>
              </div>
            ) : isLive ? (
              <Button variant="join" className="w-full group">
                <PlayCircle className="h-4 w-4 mr-1 group-hover:animate-pulse" />
                <span>Unirme al curso en vivo</span>
              </Button>
            ) : (
              <Button variant="enroll" className="w-full group">
                <BookmarkCheck className="h-4 w-4 mr-1 group-hover:animate-pulse" />
                <span>Inscribirme al curso</span>
              </Button>
            )}
            
            <Separator />
            
            <div className="space-y-4">
              <h4 className="font-medium">Este curso incluye:</h4>
              <ul className="space-y-2">
                <li className="flex items-center text-sm">
                  <Clock className="h-4 w-4 mr-3 text-gray-500" />
                  <span>{duration} de contenido</span>
                </li>
                <li className="flex items-center text-sm">
                  <FileText className="h-4 w-4 mr-3 text-gray-500" />
                  <span>{totalLessons} lecciones</span>
                </li>
                <li className="flex items-center text-sm">
                  <Download className="h-4 w-4 mr-3 text-gray-500" />
                  <span>Recursos descargables</span>
                </li>
                <li className="flex items-center text-sm">
                  <Award className="h-4 w-4 mr-3 text-gray-500" />
                  <span>Certificado de finalización</span>
                </li>
                <li className="flex items-center text-sm">
                  <MessageSquare className="h-4 w-4 mr-3 text-gray-500" />
                  <span>Foro de discusión</span>
                </li>
              </ul>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h4 className="font-medium">Detalles del curso</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{enrolled} estudiantes</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                  <span>Actualizado {lastUpdated}</span>
                </div>
                <div className="flex items-center">
                  <Award className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{levelLabel[level]}</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{language}</span>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <h4 className="font-medium">Instructor</h4>
              <div className="flex items-center">
                <img
                  src={instructor.avatar}
                  alt={instructor.name}
                  className="w-12 h-12 rounded-full mr-3 object-cover"
                />
                <div>
                  <h5 className="font-medium">{instructor.name}</h5>
                  <p className="text-sm text-gray-500">{instructor.title}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
