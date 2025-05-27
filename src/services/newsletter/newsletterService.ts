
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface NewsletterSubscription {
  email: string;
  subscribedAt: string;
  status: 'active' | 'pending';
}

const NEWSLETTER_STORAGE_KEY = 'newsletter_subscriptions';

const getSubscriptions = (): NewsletterSubscription[] => {
  const subscriptions = localStorage.getItem(NEWSLETTER_STORAGE_KEY);
  return subscriptions ? JSON.parse(subscriptions) : [];
};

const saveSubscription = (subscription: NewsletterSubscription): void => {
  const subscriptions = getSubscriptions();
  subscriptions.push(subscription);
  localStorage.setItem(NEWSLETTER_STORAGE_KEY, JSON.stringify(subscriptions));
};

const isEmailSubscribed = (email: string): boolean => {
  const subscriptions = getSubscriptions();
  return subscriptions.some(sub => sub.email.toLowerCase() === email.toLowerCase());
};

export const useNewsletter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast({
        title: "Error",
        description: "Por favor ingresa tu correo electrónico",
        variant: "destructive"
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Error",
        description: "Por favor ingresa un correo electrónico válido",
        variant: "destructive"
      });
      return;
    }

    // Check if already subscribed
    if (isEmailSubscribed(email)) {
      toast({
        title: "Ya estás suscrito",
        description: "Este correo ya está suscrito a nuestro newsletter",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Save subscription
      saveSubscription({
        email: email.trim(),
        subscribedAt: new Date().toISOString(),
        status: 'active'
      });

      toast({
        title: "¡Suscripción exitosa!",
        description: "Te has suscrito exitosamente a nuestro newsletter. Recibirás los últimos artículos en tu correo."
      });
      
      setEmail("");
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
      toast({
        title: "Error",
        description: "Hubo un error al procesar tu suscripción. Inténtalo nuevamente.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    loading,
    subscribe
  };
};

// Export utility functions for admin use
export const newsletterService = {
  getAllSubscriptions: getSubscriptions,
  getSubscriptionCount: () => getSubscriptions().length,
  exportSubscriptions: () => {
    const subscriptions = getSubscriptions();
    return subscriptions.map(sub => ({
      email: sub.email,
      subscribedAt: new Date(sub.subscribedAt).toLocaleDateString(),
      status: sub.status
    }));
  }
};
