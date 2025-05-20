
import { Button } from "@/components/ui/button";

interface SearchResultsNoticeProps {
  searchTerm: string;
  resultsCount: number;
  onClear: () => void;
}

export const SearchResultsNotice = ({ searchTerm, resultsCount, onClear }: SearchResultsNoticeProps) => {
  return (
    <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-medium">Resultados para: <span className="text-mining-600 dark:text-mining-400">"{searchTerm}"</span></h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Se encontraron {resultsCount} artículos</p>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={onClear}
        >
          Limpiar búsqueda
        </Button>
      </div>
    </div>
  );
};
