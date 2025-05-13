
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export const CallToAction = () => {
  return (
    <div className="mt-16 bg-gradient-to-r from-mining-600 to-engineering-600 rounded-xl text-white p-8 shadow-lg">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">Amplía tus conocimientos en minería sostenible</h2>
        <p className="mb-6">
          EduMining ofrece cursos especializados en tecnologías de extracción sostenible y 
          mejores prácticas ambientales para impulsar tu carrera en la industria minera.
        </p>
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <div className="flex justify-center mb-3">
              <div className="bg-white/20 rounded-full p-2">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
            </div>
            <h3 className="font-medium mb-2">Instructores Expertos</h3>
            <p className="text-sm text-white/80">Aprende de profesionales con amplia experiencia en el sector</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <div className="flex justify-center mb-3">
              <div className="bg-white/20 rounded-full p-2">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
            </div>
            <h3 className="font-medium mb-2">Certificaciones Reconocidas</h3>
            <p className="text-sm text-white/80">Obtén certificados valorados por las principales empresas mineras</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <div className="flex justify-center mb-3">
              <div className="bg-white/20 rounded-full p-2">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
            </div>
            <h3 className="font-medium mb-2">Contenido Actualizado</h3>
            <p className="text-sm text-white/80">Material educativo basado en las últimas tendencias e innovaciones</p>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" className="bg-white text-mining-700 hover:bg-gray-100" asChild>
            <Link to="/courses">Explorar cursos</Link>
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
            Ver certificaciones
          </Button>
        </div>
      </div>
    </div>
  );
};
