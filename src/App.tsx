
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import BlogAdmin from "./pages/BlogAdmin";
import React from "react";

// Simple "Not Found" page to avoid crash if someone entra a una ruta inválida
const NotFound = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
    <h1 className="text-4xl font-bold mb-4">404</h1>
    <p className="text-lg">Página no encontrada</p>
    <a
      href="/blog"
      className="mt-6 px-4 py-2 bg-mining-600 text-white rounded hover:bg-mining-700 transition"
    >
      Ir al Blog
    </a>
  </div>
);

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <Routes>
            <Route path="/" element={<Blog />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/blog/category/:category" element={<Blog />} />
            <Route path="/blog/tag/:tag" element={<Blog />} />
            <Route path="/blog/featured" element={<Blog />} />
            <Route path="/blog/recent" element={<Blog />} />
            <Route path="/blog-admin/*" element={<BlogAdmin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
