
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, UserPlus, UserCheck, Users } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { commentStorageService } from "@/services/comments/commentStorageService";

// Helper para generar un país aleatorio (demo, porque los comentarios no tienen país real)
const randomCountry = (user: string) => {
  // Si quieres que guarde el país real, actualiza el backend y los formularios de comentarios!
  const countries = [
    "Perú",
    "Colombia",
    "Chile",
    "México",
    "Otros"
  ];
  if (!user) return "Otros";
  const sum = user
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return countries[sum % countries.length];
};

const UserStatsSection = () => {
  // Obtener todos los comentarios (usuarios reales que han interactuado)
  const comments = commentStorageService.getAllComments();

  // Lista de nombres únicos de usuarios
  const uniqueUsers = Array.from(new Set(comments.map(c => c.authorName)));

  // "Nuevos este mes": cuantos autores nuevos hay en los comentarios de este mes
  const currentMonth = new Date().getMonth();
  const usersThisMonth = Array.from(
    new Set(
      comments
        .filter(c => new Date(c.createdAt).getMonth() === currentMonth)
        .map(c => c.authorName)
    )
  );

  // "Usuarios activos": cantidad de usuarios con >= 2 comentarios en los últimos 30 días
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const recentComments = comments.filter(
    c => new Date(c.createdAt) > thirtyDaysAgo
  );
  const activeUserCounts: { [name: string]: number } = {};
  recentComments.forEach(c => {
    activeUserCounts[c.authorName] = (activeUserCounts[c.authorName] || 0) + 1;
  });
  const activeUsers = Object.values(activeUserCounts).filter(n => n >= 2).length;

  // "Return rate" estimada como porcentaje de usuarios con más de un comentario
  const returningUsers = comments
    .map(c => c.authorName)
    .reduce((acc, name) => {
      acc[name] = (acc[name] || 0) + 1;
      return acc;
    }, {} as { [name: string]: number });
  const returnRate =
    uniqueUsers.length > 0
      ? Math.round(
          (Object.values(returningUsers).filter(cnt => cnt > 1).length /
            uniqueUsers.length) *
            100
        )
      : 0;

  // Distribución por país (simulada)
  const usersByCountryMap: { [country: string]: Set<string> } = {};
  uniqueUsers.forEach(username => {
    const country = randomCountry(username);
    if (!usersByCountryMap[country]) usersByCountryMap[country] = new Set();
    usersByCountryMap[country].add(username);
  });

  const usersByCountry = Object.entries(usersByCountryMap).map(
    ([country, set]) => ({
      country,
      count: set.size,
      // Porcentaje sobre total de usuarios
      percentage:
        uniqueUsers.length > 0
          ? (set.size / uniqueUsers.length) * 100
          : 0
    })
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Estadísticas de Usuarios</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="flex flex-col items-center justify-center p-3 bg-primary/5 rounded-lg">
            <Users className="text-primary mb-2" size={20} />
            <span className="text-2xl font-bold">{uniqueUsers.length}</span>
            <span className="text-xs text-gray-500">Total Usuarios</span>
          </div>
          <div className="flex flex-col items-center justify-center p-3 bg-green-500/5 rounded-lg">
            <UserPlus className="text-green-500 mb-2" size={20} />
            <span className="text-2xl font-bold">{usersThisMonth.length}</span>
            <span className="text-xs text-gray-500">Nuevos este mes</span>
          </div>
          <div className="flex flex-col items-center justify-center p-3 bg-blue-500/5 rounded-lg">
            <UserCheck className="text-blue-500 mb-2" size={20} />
            <span className="text-2xl font-bold">{activeUsers}</span>
            <span className="text-xs text-gray-500">Usuarios activos</span>
          </div>
          <div className="flex flex-col items-center justify-center p-3 bg-amber-500/5 rounded-lg">
            <User className="text-amber-500 mb-2" size={20} />
            <span className="text-2xl font-bold">{returnRate}%</span>
            <span className="text-xs text-gray-500">Tasa de retorno</span>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium mb-2">Distribución por País</h3>
          {usersByCountry.length === 0 ? (
            <div className="text-gray-500">Sin datos de país suficiente</div>
          ) : (
            usersByCountry.map((item) => (
              <div key={item.country} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{item.country}</span>
                  <span className="font-medium">
                    {item.count} ({item.percentage.toFixed(1)}%)
                  </span>
                </div>
                <Progress value={item.percentage} className="h-2" />
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserStatsSection;
