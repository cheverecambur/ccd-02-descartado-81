
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface StatsChartProps {
  title: string;
  data: any[];
  dataKey: string;
  nameKey: string;
  colors?: string[];
}

const StatsChart = ({ title, data, dataKey, nameKey, colors = ["#4f46e5"] }: StatsChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey={nameKey} />
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
              {Array.isArray(dataKey) ? (
                dataKey.map((key, index) => (
                  <Bar 
                    key={key}
                    dataKey={key} 
                    fill={colors[index % colors.length]} 
                    radius={[4, 4, 0, 0]}
                  />
                ))
              ) : (
                <Bar 
                  dataKey={dataKey} 
                  fill={colors[0]} 
                  radius={[4, 4, 0, 0]}
                />
              )}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsChart;
