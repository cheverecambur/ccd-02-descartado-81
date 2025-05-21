
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatsChart from "./StatsChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AnalyticsSection = () => {
  // This would come from a real API in a production app
  const viewsData = [
    { month: "Ene", views: 3200, visitors: 1800 },
    { month: "Feb", views: 4100, visitors: 2200 },
    { month: "Mar", views: 3800, visitors: 2000 },
    { month: "Abr", views: 4800, visitors: 2600 },
    { month: "May", views: 5200, visitors: 2900 },
    { month: "Jun", views: 5800, visitors: 3200 },
  ];

  const popularPosts = [
    { title: "Modelador BIM en Perú", views: 2145, category: "BIM" },
    { title: "Minería Sostenible", views: 1893, category: "Minería" },
    { title: "Supervisor SSOMA en Perú", views: 1652, category: "Seguridad" },
    { title: "BIM para Valorización de Obras", views: 1427, category: "BIM" },
    { title: "Gestión del Agua en Minería", views: 1298, category: "Minería" },
  ];
  
  const postsPerCategory = [
    { name: "BIM", count: 8 },
    { name: "Minería", count: 6 },
    { name: "Seguridad", count: 5 },
    { name: "Ingeniería", count: 4 },
    { name: "Tendencias", count: 3 },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Análisis del Blog</h2>
      
      <Tabs defaultValue="views" className="space-y-4">
        <TabsList>
          <TabsTrigger value="views">Visitas</TabsTrigger>
          <TabsTrigger value="posts">Artículos</TabsTrigger>
          <TabsTrigger value="categories">Categorías</TabsTrigger>
        </TabsList>
        
        <TabsContent value="views" className="space-y-4">
          <StatsChart 
            title="Visitas del Blog (Últimos 6 meses)" 
            data={viewsData} 
            dataKey={["views", "visitors"]} 
            nameKey="month" 
            colors={["#4f46e5", "#06b6d4"]}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Tráfico por Fuente</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex justify-between">
                    <span className="text-sm">Google</span>
                    <span className="font-medium">68%</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-sm">Redes sociales</span>
                    <span className="font-medium">21%</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-sm">Directo</span>
                    <span className="font-medium">8%</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-sm">Email</span>
                    <span className="font-medium">3%</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Tiempo de Lectura</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm">Tiempo promedio</span>
                    <span className="font-medium">3:45 min</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">% lectura completa</span>
                    <span className="font-medium">62%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="posts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Artículos más populares</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {popularPosts.map((post, index) => (
                  <li key={index} className="flex justify-between items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                    <div>
                      <p className="font-medium text-sm">{post.title}</p>
                      <p className="text-xs text-gray-500">{post.category}</p>
                    </div>
                    <div className="bg-primary/10 text-primary text-xs px-2 py-1 rounded">
                      {post.views.toLocaleString()} visitas
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          <StatsChart 
            title="Popularidad de Artículos" 
            data={popularPosts} 
            dataKey="views" 
            nameKey="title"
          />
        </TabsContent>
        
        <TabsContent value="categories" className="space-y-4">
          <StatsChart 
            title="Artículos por Categoría" 
            data={postsPerCategory} 
            dataKey="count" 
            nameKey="name"
            colors={["#06b6d4"]}
          />
          
          <Card>
            <CardHeader>
              <CardTitle>Popularidad de Categorías</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {postsPerCategory.map((category, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span>{category.name}</span>
                    <span className="font-medium">{category.count} artículos</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsSection;
