
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, UserPlus, UserCheck, Users } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const UserStatsSection = () => {
  // This would come from a real API in a production app
  const userStats = {
    totalUsers: 514,
    newUsersThisMonth: 32,
    activeUsers: 217,
    returnRate: 68,
    usersByCountry: [
      { country: "Perú", count: 342, percentage: 66.5 },
      { country: "Colombia", count: 87, percentage: 16.9 },
      { country: "Chile", count: 42, percentage: 8.2 },
      { country: "México", count: 28, percentage: 5.4 },
      { country: "Otros", count: 15, percentage: 3.0 }
    ]
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Estadísticas de Usuarios</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="flex flex-col items-center justify-center p-3 bg-primary/5 rounded-lg">
            <Users className="text-primary mb-2" size={20} />
            <span className="text-2xl font-bold">{userStats.totalUsers}</span>
            <span className="text-xs text-gray-500">Total Usuarios</span>
          </div>
          <div className="flex flex-col items-center justify-center p-3 bg-green-500/5 rounded-lg">
            <UserPlus className="text-green-500 mb-2" size={20} />
            <span className="text-2xl font-bold">{userStats.newUsersThisMonth}</span>
            <span className="text-xs text-gray-500">Nuevos este mes</span>
          </div>
          <div className="flex flex-col items-center justify-center p-3 bg-blue-500/5 rounded-lg">
            <UserCheck className="text-blue-500 mb-2" size={20} />
            <span className="text-2xl font-bold">{userStats.activeUsers}</span>
            <span className="text-xs text-gray-500">Usuarios activos</span>
          </div>
          <div className="flex flex-col items-center justify-center p-3 bg-amber-500/5 rounded-lg">
            <User className="text-amber-500 mb-2" size={20} />
            <span className="text-2xl font-bold">{userStats.returnRate}%</span>
            <span className="text-xs text-gray-500">Tasa de retorno</span>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium mb-2">Distribución por País</h3>
          {userStats.usersByCountry.map((item) => (
            <div key={item.country} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>{item.country}</span>
                <span className="font-medium">{item.count} ({item.percentage.toFixed(1)}%)</span>
              </div>
              <Progress value={item.percentage} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserStatsSection;
