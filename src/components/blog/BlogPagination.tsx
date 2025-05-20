
import { Button } from "@/components/ui/button";

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const BlogPagination = ({ currentPage, totalPages, onPageChange }: BlogPaginationProps) => {
  if (totalPages <= 1) return null;
  
  return (
    <div className="flex justify-center mt-12">
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          disabled={currentPage === 1}
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        >
          Anterior
        </Button>
        
        {[...Array(totalPages)].map((_, idx) => (
          <Button 
            key={idx} 
            variant="outline" 
            size="sm" 
            className={`
              ${currentPage === idx + 1 ? 
                "bg-mining-50 dark:bg-mining-900/30 text-mining-700 dark:text-mining-300" : 
                ""
              }
            `}
            onClick={() => onPageChange(idx + 1)}
          >
            {idx + 1}
          </Button>
        ))}
        
        <Button 
          variant="outline" 
          size="sm"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
};
