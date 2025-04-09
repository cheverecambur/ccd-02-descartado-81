
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarClock, Award, Clock, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Cursos en progreso</CardTitle>
          <CalendarClock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">3</div>
          <p className="text-xs text-muted-foreground mt-1">
            2 cursos activos esta semana
          </p>
          <div className="mt-4">
            <div className="flex justify-between text-xs mb-1">
              <span>Total completado</span>
              <span>45%</span>
            </div>
            <Progress value={45} className="h-1" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Certificaciones</CardTitle>
          <Award className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">2</div>
          <p className="text-xs text-muted-foreground mt-1">
            5 en progreso
          </p>
          <div className="mt-4">
            <div className="flex items-center space-x-1">
              <div className="h-2 w-2 rounded-full bg-engineering-500"></div>
              <span className="text-xs">Ingeniería (1)</span>
            </div>
            <div className="flex items-center space-x-1 mt-1">
              <div className="h-2 w-2 rounded-full bg-mining-500"></div>
              <span className="text-xs">Minería (1)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Tiempo de estudio</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">24h 30m</div>
          <p className="text-xs text-muted-foreground mt-1">
            5h 30m esta semana
          </p>
          <div className="mt-4">
            <div className="flex justify-between text-xs mb-1">
              <span>Meta semanal</span>
              <span>73%</span>
            </div>
            <Progress value={73} className="h-1" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Puntos XP</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">2,840</div>
          <p className="text-xs text-muted-foreground mt-1">
            +350 esta semana
          </p>
          <div className="mt-4">
            <div className="text-xs text-muted-foreground">
              580 XP para el siguiente nivel
            </div>
            <div className="relative mt-2">
              <div className="h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" style={{ width: "42%" }}></div>
              </div>
              <div className="absolute top-4 left-[42%] transform -translate-x-1/2 text-xs text-muted-foreground">
                Nivel 5
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;
