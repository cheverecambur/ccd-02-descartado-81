
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface EngagementChartProps {
  data: { period: string; comments: number; likes: number }[];
  title: string;
}

const EngagementChart = ({ data, title }: EngagementChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--background)",
                  borderColor: "var(--border)",
                  borderRadius: "6px",
                }}
                itemStyle={{ color: "var(--foreground)" }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="comments" 
                stroke="#4f46e5" 
                strokeWidth={2}
                name="Comentarios"
              />
              <Line 
                type="monotone" 
                dataKey="likes" 
                stroke="#06b6d4" 
                strokeWidth={2}
                name="Me gusta"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default EngagementChart;
