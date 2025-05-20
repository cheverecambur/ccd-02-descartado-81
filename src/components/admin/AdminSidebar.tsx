
import React from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FileText,
  FolderOpen,
  MessageSquare,
  Settings,
  Users,
  BarChart,
  LogOut
} from "lucide-react";

interface AdminSidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const AdminSidebar = ({ activeView, onViewChange }: AdminSidebarProps) => {
  const navigate = useNavigate();

  const navItems = [
    { id: "dashboard", label: "Panel de Control", icon: <LayoutDashboard size={20} /> },
    { id: "posts", label: "Artículos", icon: <FileText size={20} /> },
    { id: "categories", label: "Categorías", icon: <FolderOpen size={20} /> },
    { id: "comments", label: "Comentarios", icon: <MessageSquare size={20} /> },
    { id: "analytics", label: "Analítica", icon: <BarChart size={20} /> },
    { id: "users", label: "Usuarios", icon: <Users size={20} /> },
    { id: "settings", label: "Configuración", icon: <Settings size={20} /> }
  ];

  return (
    <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex-shrink-0">
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center mr-3">
              <span className="text-primary-foreground font-bold">A</span>
            </div>
            <h1 className="font-semibold text-xl">Blog Admin</h1>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => onViewChange(item.id)}
                  className={cn(
                    "flex items-center w-full px-3 py-2 text-sm font-medium rounded-md",
                    activeView === item.id
                      ? "bg-primary/10 text-primary"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  )}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col space-y-3">
            <button
              onClick={() => navigate("/blog")}
              className="flex items-center text-sm px-3 py-2 font-medium rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <span className="mr-3">🌐</span>
              Ver Blog
            </button>
            <button
              className="flex items-center text-sm px-3 py-2 font-medium rounded-md text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <LogOut size={18} className="mr-3" />
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
