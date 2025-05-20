
import { useToast } from "@/hooks/use-toast";

export const usePostShare = () => {
  const { toast } = useToast();

  const handleShare = async (platform: string, customTitle?: string, customUrl?: string) => {
    try {
      const url = customUrl || window.location.href;
      const title = customTitle || document.title;
      let shareUrl = "";
      
      switch (platform) {
        case "facebook":
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
          break;
        case "twitter":
          shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
          break;
        case "linkedin":
          shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
          break;
        case "whatsapp":
          shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(title + " " + url)}`;
          break;
        case "email":
          shareUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`;
          break;
        default:
          // Native sharing if available
          if (navigator.share) {
            try {
              await navigator.share({
                title: title,
                url: url,
                text: "Revisa este interesante artículo"
              });
              return true;
            } catch (error) {
              console.log('Error al compartir', error);
              // Fall through to clipboard if share fails
            }
          }
          
          // Fallback: copy to clipboard
          await navigator.clipboard.writeText(url);
          toast({
            title: "Enlace copiado",
            description: "El enlace ha sido copiado al portapapeles",
          });
          return true;
      }
      
      if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400,noopener,noreferrer');
        return true;
      }
      
      return false;
    } catch (error) {
      console.error("Error al compartir contenido", error);
      toast({
        title: "Error al compartir",
        description: "No se pudo compartir el contenido. Intente nuevamente.",
        variant: "destructive"
      });
      return false;
    }
  };

  return { handleShare };
};
