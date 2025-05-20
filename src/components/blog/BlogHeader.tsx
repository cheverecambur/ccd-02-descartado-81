
import { Link } from "react-router-dom";

export const BlogHeader = () => {
  return (
    <div className="relative bg-gradient-to-r from-mining-700 to-engineering-800 text-white py-16 md:py-24">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1400&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Blog EduMining
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-6">
            Artículos, investigaciones y noticias sobre ingeniería, minería y gestión 
            de proyectos mineros escritos por expertos de la industria.
          </p>
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" className="w-8 h-8 rounded-full border-2 border-white" alt="Author" />
              <img src="https://randomuser.me/api/portraits/women/44.jpg" className="w-8 h-8 rounded-full border-2 border-white" alt="Author" />
              <img src="https://randomuser.me/api/portraits/men/86.jpg" className="w-8 h-8 rounded-full border-2 border-white" alt="Author" />
            </div>
            <span className="text-sm text-white/80">
              Escrito por nuestros expertos en ingeniería y minería
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
