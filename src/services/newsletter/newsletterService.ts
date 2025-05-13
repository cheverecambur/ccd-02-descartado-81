
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

// Hook for newsletter subscription
export const useNewsletter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const { toast } = useToast();

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast({
        title: "Error",
        description: "Por favor ingresa un correo electrónico válido",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    setSubscribed(true);
    setEmail("");
    toast({
      title: "¡Suscripción exitosa!",
      description: "Recibirás nuestras actualizaciones en tu correo",
    });
  };

  return {
    email,
    setEmail,
    loading,
    subscribed,
    subscribe
  };
};
