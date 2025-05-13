
import { useToast } from "@/hooks/use-toast";

export const usePostShare = () => {
  const { toast } = useToast();

  const handleShare = (platform: string) => {
    const url = window.location.href;
    let shareUrl = "";
    
    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}`;
        break;
      default:
        // Native sharing if available
        if (navigator.share) {
          navigator.share({
            title: document.title,
            url: url,
          })
          .catch((error) => console.log('Error sharing', error));
          return;
        }
        
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(url);
        toast({
          title: "Enlace copiado",
          description: "El enlace ha sido copiado al portapapeles",
        });
        return;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  return { handleShare };
};
