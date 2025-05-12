
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Moon, Sun, Bell, Search, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar = ({ toggleSidebar }: NavbarProps) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else if (prefersDark) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleSidebar} 
              className="lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <Link to="/" className="flex-shrink-0 flex items-center ml-2 lg:ml-0">
              <span className="text-mining-700 dark:text-mining-300 font-bold text-xl">Edu</span>
              <span className="text-engineering-700 dark:text-engineering-300 font-bold text-xl">Mining</span>
            </Link>
            
            {/* Main Navigation */}
            <div className="hidden lg:ml-6 lg:flex lg:items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <Link to="/courses">
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        Cursos
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  
                  <NavigationMenuItem>
                    <Link to="/live-courses">
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        Cursos en Vivo
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Especialidades</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        <li className="row-span-3">
                          <Link to="/engineering" className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-engineering-500/50 to-engineering-700 p-6 no-underline outline-none focus:shadow-md">
                            <div className="mt-4 mb-2 text-lg font-medium text-white">
                              Ingeniería
                            </div>
                            <p className="text-sm leading-tight text-white/90">
                              Programas de formación en ingeniería civil, mecánica, 
                              eléctrica y de sistemas para el sector minero.
                            </p>
                          </Link>
                        </li>
                        <li>
                          <Link to="/mining" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">Minería</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Especialización en técnicas de extracción y procesamiento.
                            </p>
                          </Link>
                        </li>
                        <li>
                          <Link to="/management" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">Gestión</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Administración de proyectos y operaciones mineras.
                            </p>
                          </Link>
                        </li>
                        <li>
                          <Link to="/certifications" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">Certificaciones</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Programas con reconocimiento internacional.
                            </p>
                          </Link>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  
                  {/* Blog Section */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Blog</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        <li className="row-span-3">
                          <Link to="/blog" className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-mining-500/50 to-mining-700 p-6 no-underline outline-none focus:shadow-md">
                            <div className="mt-4 mb-2 text-lg font-medium text-white">
                              Blog EduMining
                            </div>
                            <p className="text-sm leading-tight text-white/90">
                              Descubre artículos, guías técnicas, investigaciones
                              y noticias sobre la industria minera y de ingeniería.
                            </p>
                          </Link>
                        </li>
                        <li>
                          <Link to="/blog/category/tendencias" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">Tendencias del Sector</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Últimas innovaciones y desarrollos en la industria.
                            </p>
                          </Link>
                        </li>
                        <li>
                          <Link to="/blog/category/mejores-practicas" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">Mejores Prácticas</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Guías técnicas y metodologías recomendadas.
                            </p>
                          </Link>
                        </li>
                        <li>
                          <Link to="/blog/category/investigacion" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">Investigación y Desarrollo</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Avances científicos y tecnológicos en minería.
                            </p>
                          </Link>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          
          <div className="hidden md:flex flex-1 items-center justify-center px-2 lg:px-0">
            <div className="max-w-lg w-full">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white dark:bg-gray-800 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary text-sm"
                  placeholder="Buscar cursos, certificaciones..."
                  type="search"
                />
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme} 
              className="text-gray-500 dark:text-gray-300"
            >
              {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative text-gray-500 dark:text-gray-300">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-900"></span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <div className="px-4 py-2 font-medium border-b">Notificaciones</div>
                <DropdownMenuItem className="cursor-pointer">
                  <div className="flex flex-col">
                    <span className="font-medium">Nuevo curso disponible</span>
                    <span className="text-sm text-gray-500">Seguridad Minera Avanzada</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <div className="flex flex-col">
                    <span className="font-medium">Clase en vivo hoy</span>
                    <span className="text-sm text-gray-500">Procesos de Extracción - 18:00</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-500 dark:text-gray-300">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="cursor-pointer">Perfil</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">Configuración</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">Cerrar sesión</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
