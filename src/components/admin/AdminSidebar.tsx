
import React from "react";
import { Link } from "react-router-dom";
import { 
  LayoutDashboard, 
  FileText,
  Settings,
  BarChart2,
  MessageSquare,
  ChevronRight,
  ChevronLeft
} from "lucide-react";

interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  active: boolean;
  onClick: () => void;
}

const SidebarItem = ({ icon, text, active, onClick }: SidebarItemProps) => (
  <button
    className={`flex items-center w-full space-x-2 py-2 px-3 my-1 rounded-md transition-colors ${
      active 
        ? "bg-primary/10 text-primary" 
        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
    }`}
    onClick={onClick}
  >
    {icon}
    <span className="font-medium">{text}</span>
  </button>
);

interface AdminSidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const AdminSidebar = ({ activeView, onViewChange }: AdminSidebarProps) => {
  const [collapsed, setCollapsed] = React.useState(false);
  
  return (
    <div className={`bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 relative ${
      collapsed ? "w-16" : "w-64"
    } transition-all duration-300`}>
      <button
        className="absolute -right-3 top-8 rounded-full border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>
      
      <div className="p-4">
        {!collapsed && (
          <Link to="/blog-admin" className="flex items-center mb-6">
            <h1 className="text-xl font-bold">Blog Admin</h1>
          </Link>
        )}
        
        <nav className="space-y-1">
          <SidebarItem
            icon={<LayoutDashboard size={collapsed ? 22 : 16} />}
            text={collapsed ? "" : "Dashboard"}
            active={activeView === "dashboard"}
            onClick={() => onViewChange("dashboard")}
          />
          <SidebarItem
            icon={<FileText size={collapsed ? 22 : 16} />}
            text={collapsed ? "" : "Artículos"}
            active={activeView === "posts" || activeView === "edit-post"}
            onClick={() => onViewChange("posts")}
          />
          <SidebarItem
            icon={<Settings size={collapsed ? 22 : 16} />}
            text={collapsed ? "" : "Categorías"}
            active={activeView === "categories"}
            onClick={() => onViewChange("categories")}
          />
          <SidebarItem
            icon={<MessageSquare size={collapsed ? 22 : 16} />}
            text={collapsed ? "" : "Comentarios"}
            active={activeView === "comments"}
            onClick={() => onViewChange("comments")}
          />
          <SidebarItem
            icon={<BarChart2 size={collapsed ? 22 : 16} />}
            text={collapsed ? "" : "Análisis"}
            active={activeView === "analytics"}
            onClick={() => onViewChange("analytics")}
          />
        </nav>
      </div>
    </div>
  );
};

export default AdminSidebar;
