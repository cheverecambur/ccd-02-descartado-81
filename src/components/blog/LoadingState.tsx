
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface LoadingStateProps {
  isLoading: boolean;
  error?: boolean;
}

export const LoadingState = ({ isLoading, error = false }: LoadingStateProps) => {
  if (isLoading) {
    return (
      <div className="flex flex-1 justify-center items-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-mining-600 mb-4"></div>
          <p>Cargando artículo...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-1 justify-center items-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Artículo no encontrado</h2>
          <p className="mb-6">El artículo que estás buscando no existe o ha sido removido.</p>
          <Button asChild>
            <Link to="/blog">Volver al blog</Link>
          </Button>
        </div>
      </div>
    );
  }

  return null;
};
