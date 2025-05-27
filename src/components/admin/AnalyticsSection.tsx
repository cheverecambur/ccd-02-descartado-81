
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MessageSquare, 
  FileText, 
  Users, 
  TrendingUp, 
  ThumbsUp,
  Clock,
  CheckCircle,
  XCircle,
  BarChart3,
  Calendar
} from "lucide-react";
import { useAnalytics } from "@/hooks/useAnalytics";
import MetricCard from "./analytics/MetricCard";
import EngagementChart from "./analytics/EngagementChart";
import TopItemsList from "./analytics/TopItemsList";
import StatsChart from "./StatsChart";

const AnalyticsSection = () => {
  const { data, loading } = useAnalytics();

  if (loading) {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Análisis del Blog</h2>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
            <p>Cargando estadísticas...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Análisis del Blog</h2>
        <div className="text-center py-8">
          <p>No se pudieron cargar las estadísticas</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Análisis del Blog</h2>
        <div className="text-sm text-muted-foreground">
          Actualizado en tiempo real
        </div>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="comments">Comentarios</TabsTrigger>
          <TabsTrigger value="posts">Artículos</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          {/* Overview Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Total Comentarios"
              value={data.commentStats.total}
              description="Todos los comentarios recibidos"
              icon={MessageSquare}
              iconColor="text-blue-600"
            />
            <MetricCard
              title="Total Artículos"
              value={data.postStats.totalPosts}
              description="Artículos publicados"
              icon={FileText}
              iconColor="text-green-600"
            />
            <MetricCard
              title="Engagement Total"
              value={data.userEngagement.totalLikes}
              description="Total de me gusta"
              icon={ThumbsUp}
              iconColor="text-red-600"
            />
            <MetricCard
              title="Promedio Comments/Post"
              value={data.userEngagement.avgCommentsPerPost}
              description="Engagement promedio"
              icon={TrendingUp}
              iconColor="text-purple-600"
            />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <EngagementChart
              data={data.userEngagement.engagementTrend}
              title="Tendencia de Engagement (6 meses)"
            />
            <StatsChart
              title="Artículos por Categoría"
              data={data.postStats.postsByCategory}
              dataKey="count"
              nameKey="category"
              colors={["#4f46e5"]}
            />
          </div>

          {/* Top Lists */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TopItemsList
              title="Usuarios Más Activos"
              items={data.userEngagement.mostActiveUsers}
              maxItems={5}
            />
            <TopItemsList
              title="Tags Más Populares"
              items={data.postStats.popularTags}
              maxItems={5}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="comments" className="space-y-6">
          {/* Comment Status Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Total"
              value={data.commentStats.total}
              description="Todos los comentarios"
              icon={MessageSquare}
              iconColor="text-blue-600"
            />
            <MetricCard
              title="Pendientes"
              value={data.commentStats.pending}
              description="Esperando moderación"
              icon={Clock}
              iconColor="text-yellow-600"
            />
            <MetricCard
              title="Aprobados"
              value={data.commentStats.approved}
              description="Comentarios publicados"
              icon={CheckCircle}
              iconColor="text-green-600"
            />
            <MetricCard
              title="Rechazados"
              value={data.commentStats.rejected}
              description="Comentarios rechazados"
              icon={XCircle}
              iconColor="text-red-600"
            />
          </div>

          {/* Comment Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <StatsChart
              title="Comentarios Diarios (Últimos 30 días)"
              data={data.commentStats.dailyComments}
              dataKey="count"
              nameKey="date"
              colors={["#06b6d4"]}
            />
            <TopItemsList
              title="Artículos con Más Comentarios"
              items={data.commentStats.commentsByPost}
              maxItems={8}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="posts" className="space-y-6">
          {/* Post Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <MetricCard
              title="Total Artículos"
              value={data.postStats.totalPosts}
              description="Artículos publicados"
              icon={FileText}
              iconColor="text-blue-600"
            />
            <MetricCard
              title="Categorías Activas"
              value={data.postStats.postsByCategory.filter(cat => cat.count > 0).length}
              description="Categorías con contenido"
              icon={BarChart3}
              iconColor="text-green-600"
            />
            <MetricCard
              title="Tags Únicos"
              value={data.postStats.popularTags.length}
              description="Etiquetas diferentes"
              icon={Calendar}
              iconColor="text-purple-600"
            />
          </div>

          {/* Post Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <StatsChart
              title="Publicaciones por Mes (Último año)"
              data={data.postStats.postsByMonth}
              dataKey="count"
              nameKey="month"
              colors={["#4f46e5"]}
            />
            <StatsChart
              title="Distribución por Categoría"
              data={data.postStats.postsByCategory}
              dataKey="count"
              nameKey="category"
              colors={["#06b6d4"]}
            />
          </div>

          {/* Post Lists */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TopItemsList
              title="Tags Más Utilizados"
              items={data.postStats.popularTags}
              maxItems={10}
            />
            <TopItemsList
              title="Categorías por Popularidad"
              items={data.postStats.postsByCategory}
              maxItems={10}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="engagement" className="space-y-6">
          {/* Engagement Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <MetricCard
              title="Total Me Gusta"
              value={data.userEngagement.totalLikes}
              description="En todos los comentarios"
              icon={ThumbsUp}
              iconColor="text-red-600"
            />
            <MetricCard
              title="Comentarios/Artículo"
              value={data.userEngagement.avgCommentsPerPost}
              description="Promedio de engagement"
              icon={MessageSquare}
              iconColor="text-blue-600"
            />
            <MetricCard
              title="Usuarios Activos"
              value={data.userEngagement.mostActiveUsers.length}
              description="Usuarios que han comentado"
              icon={Users}
              iconColor="text-green-600"
            />
          </div>

          {/* Engagement Charts */}
          <EngagementChart
            data={data.userEngagement.engagementTrend}
            title="Evolución del Engagement"
          />

          {/* User Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TopItemsList
              title="Usuarios Más Activos"
              items={data.userEngagement.mostActiveUsers}
              maxItems={10}
            />
            <TopItemsList
              title="Artículos con Mayor Engagement"
              items={data.commentStats.commentsByPost}
              maxItems={8}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsSection;
