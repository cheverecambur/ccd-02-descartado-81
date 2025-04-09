
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  BookOpen,
  Video,
  GraduationCap,
  Award,
  Calendar,
  Users,
  Settings,
  HelpCircle,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
}

interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  to: string;
  active?: boolean;
  badge?: string | number;
}

const SidebarItem = ({ icon, text, to, active, badge }: SidebarItemProps) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors",
        active
          ? "bg-primary text-primary-foreground"
          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
      )}
    >
      <div className="mr-3">{icon}</div>
      <span>{text}</span>
      {badge && (
        <span className="ml-auto bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs font-semibold">
          {badge}
        </span>
      )}
    </Link>
  );
};

const Sidebar = ({ isOpen }: SidebarProps) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-20 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transform transition-transform duration-200 ease-in-out lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex flex-col h-full overflow-y-auto">
        <div className="p-4 space-y-5">
          <div className="space-y-1">
            <h2 className="text-xs uppercase font-semibold text-gray-500 dark:text-gray-400 tracking-wider px-2">
              Principal
            </h2>
            <SidebarItem
              icon={<LayoutDashboard size={20} />}
              text="Dashboard"
              to="/dashboard"
              active={currentPath === "/dashboard"}
            />
            <SidebarItem
              icon={<BookOpen size={20} />}
              text="Mis Cursos"
              to="/courses"
              active={currentPath === "/courses"}
              badge={3}
            />
            <SidebarItem
              icon={<Video size={20} />}
              text="Cursos en Vivo"
              to="/live-courses"
              active={currentPath === "/live-courses"}
              badge="Nuevo"
            />
          </div>

          <div className="space-y-1">
            <h2 className="text-xs uppercase font-semibold text-gray-500 dark:text-gray-400 tracking-wider px-2">
              Especialidades
            </h2>
            <SidebarItem
              icon={<GraduationCap size={20} />}
              text="Ingeniería"
              to="/engineering"
              active={currentPath === "/engineering"}
            />
            <SidebarItem
              icon={<GraduationCap size={20} />}
              text="Minería"
              to="/mining"
              active={currentPath === "/mining"}
            />
            <SidebarItem
              icon={<GraduationCap size={20} />}
              text="Gestión"
              to="/management"
              active={currentPath === "/management"}
            />
          </div>

          <div className="space-y-1">
            <h2 className="text-xs uppercase font-semibold text-gray-500 dark:text-gray-400 tracking-wider px-2">
              Mi Progreso
            </h2>
            <SidebarItem
              icon={<Award size={20} />}
              text="Certificaciones"
              to="/certifications"
              active={currentPath === "/certifications"}
            />
            <SidebarItem
              icon={<Calendar size={20} />}
              text="Horario"
              to="/schedule"
              active={currentPath === "/schedule"}
            />
          </div>

          <div className="space-y-1">
            <h2 className="text-xs uppercase font-semibold text-gray-500 dark:text-gray-400 tracking-wider px-2">
              Comunidad
            </h2>
            <SidebarItem
              icon={<Users size={20} />}
              text="Foros"
              to="/forums"
              active={currentPath === "/forums"}
            />
          </div>
        </div>

        <div className="mt-auto p-4 border-t border-gray-200 dark:border-gray-800">
          <div className="space-y-1">
            <SidebarItem
              icon={<Settings size={20} />}
              text="Configuración"
              to="/settings"
              active={currentPath === "/settings"}
            />
            <SidebarItem
              icon={<HelpCircle size={20} />}
              text="Ayuda"
              to="/help"
              active={currentPath === "/help"}
            />
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <div className="bg-mining-50 dark:bg-mining-900/30 p-3 rounded-lg">
            <h3 className="font-medium text-sm text-mining-900 dark:text-mining-200">
              Plan Actual: Gratuito
            </h3>
            <p className="text-xs text-mining-700 dark:text-mining-300 mt-1">
              Actualiza a Premium para acceso completo
            </p>
            <button className="mt-2 w-full py-1.5 px-3 bg-mining-600 hover:bg-mining-700 text-white text-xs font-medium rounded-md transition-colors">
              Actualizar Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
