
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Loader2, AlertTriangle } from "lucide-react";

interface LoadingStateProps {
  isLoading: boolean;
  error?: boolean;
  customMessage?: string;
  errorTitle?: string;
  errorMessage?: string;
}

export const LoadingState = ({ 
  isLoading, 
  error = false, 
  customMessage = "Cargando artículo...", 
  errorTitle = "Artículo no encontrado",
  errorMessage = "El artículo que estás buscando no existe o ha sido removido."
}: LoadingStateProps) => {
  if (isLoading) {
    return (
      <div className="flex flex-1 justify-center items-center py-20">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-mining-600 mb-4">
            <span className="sr-only">Cargando...</span>
          </div>
          <p className="text-gray-700 dark:text-gray-300">{customMessage}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-1 justify-center items-center py-20">
        <div className="text-center max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20 text-red-500 dark:text-red-400 mb-4">
            <AlertTriangle size={32} />
          </div>
          <h2 className="text-2xl font-bold mb-4">{errorTitle}</h2>
          <p className="mb-6 text-gray-600 dark:text-gray-400">{errorMessage}</p>
          <Button asChild>
            <Link to="/blog">Volver al blog</Link>
          </Button>
        </div>
      </div>
    );
  }

  return null;
};
