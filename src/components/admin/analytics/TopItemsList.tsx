
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TopItemsListProps {
  title: string;
  items: { name: string; count: number }[];
  maxItems?: number;
}

const TopItemsList = ({ title, items, maxItems = 10 }: TopItemsListProps) => {
  const displayItems = items.slice(0, maxItems);
  const maxCount = Math.max(...displayItems.map(item => item.count));

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {displayItems.map((item, index) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-muted-foreground">
                  #{index + 1}
                </span>
                <span className="text-sm font-medium truncate max-w-[200px]">
                  {item.name}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(item.count / maxCount) * 100}%` }}
                  />
                </div>
                <Badge variant="secondary" className="text-xs">
                  {item.count}
                </Badge>
              </div>
            </div>
          ))}
          {displayItems.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">
              No hay datos disponibles
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopItemsList;
