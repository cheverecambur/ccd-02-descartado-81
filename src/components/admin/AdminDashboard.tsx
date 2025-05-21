
import React from "react";
import { FileText, MessageSquare, BarChart3, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BlogPost } from "@/types/blog";
import { Skeleton } from "@/components/ui/skeleton";
import UserStatsSection from "./UserStatsSection";

interface StatsCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  color: string;
  isLoading?: boolean;
}

const StatsCard = ({ title, value, description, icon, color, isLoading = false }: StatsCardProps) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <div className={`${color} rounded-md p-2`}>{icon}</div>
    </CardHeader>
    <CardContent>
      {isLoading ? (
        <Skeleton className="h-7 w-20" />
      ) : (
        <>
          <div className="text-2xl font-bold">{value}</div>
          <p className="text-xs text-muted-foreground">{description}</p>
        </>
      )}
    </CardContent>
  </Card>
);

interface AdminDashboardProps {
  stats: {
    totalPosts: number;
    postsPerCategory: { [key: string]: number };
    topTags: { name: string; count: number }[];
    recentPosts: BlogPost[];
  };
  isLoading: boolean;
}

const AdminDashboard = ({ stats, isLoading }: AdminDashboardProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Artículos"
          value={stats.totalPosts}
          description="Artículos publicados"
          icon={<FileText className="text-white" size={18} />}
          color="bg-blue-500"
          isLoading={isLoading}
        />
        <StatsCard
          title="Categorías"
          value={Object.keys(stats.postsPerCategory).length}
          description="Temas disponibles"
          icon={<BarChart3 className="text-white" size={18} />}
          color="bg-purple-500"
          isLoading={isLoading}
        />
        <StatsCard
          title="Comentarios"
          value={120}
          description="En todos los artículos"
          icon={<MessageSquare className="text-white" size={18} />}
          color="bg-amber-500"
          isLoading={isLoading}
        />
        <StatsCard
          title="Usuarios"
          value={514}
          description="Lectores registrados"
          icon={<Users className="text-white" size={18} />}
          color="bg-green-500"
          isLoading={isLoading}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Artículos Recientes</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-2">
                {Array(5).fill(0).map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {stats.recentPosts.map((post) => (
                  <div key={post.id} className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                    <div className="bg-gray-200 dark:bg-gray-700 rounded-md w-10 h-10 flex items-center justify-center mr-3">
                      <FileText size={16} />
                    </div>
                    <div className="flex flex-col flex-1 min-w-0">
                      <h3 className="text-sm font-medium truncate">{post.title}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{post.date}</p>
                    </div>
                    <div className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                      Publicado
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Artículos por Categoría</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-2">
                {Array(5).fill(0).map((_, i) => (
                  <Skeleton key={i} className="h-8 w-full" />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {Object.entries(stats.postsPerCategory)
                  .filter(([id]) => id !== "all") // Exclude "all" category from chart
                  .map(([categoryId, count]) => (
                    <div key={categoryId} className="flex items-center">
                      <div className="w-full flex items-center">
                        <div className="flex-1">
                          <p className="text-sm font-medium">
                            {categoryId.charAt(0).toUpperCase() + categoryId.slice(1).replace(/-/g, ' ')}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{count} artículos</p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <UserStatsSection />
    </div>
  );
};

export default AdminDashboard;
