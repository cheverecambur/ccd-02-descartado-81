
import { useState, useEffect, useCallback } from "react";
import { analyticsService, AnalyticsData } from "@/services/analytics/analyticsService";
import { useToast } from "@/hooks/use-toast";

export const useAnalytics = () => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const loadAnalytics = useCallback(async () => {
    try {
      setLoading(true);
      
      // Simulate some loading time for better UX
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const analyticsData = analyticsService.getAllAnalytics();
      setData(analyticsData);
      
    } catch (error) {
      console.error("Error loading analytics:", error);
      toast({
        title: "Error",
        description: "No se pudieron cargar las estadísticas",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    loadAnalytics();
  }, [loadAnalytics]);

  // Listen for data changes from other parts of the app
  useEffect(() => {
    const handleDataChange = () => {
      loadAnalytics();
    };

    // Listen for comment and post changes
    window.addEventListener('commentApproved', handleDataChange);
    window.addEventListener('commentDeleted', handleDataChange);
    window.addEventListener('postSaved', handleDataChange);
    window.addEventListener('postDeleted', handleDataChange);

    return () => {
      window.removeEventListener('commentApproved', handleDataChange);
      window.removeEventListener('commentDeleted', handleDataChange);
      window.removeEventListener('postSaved', handleDataChange);
      window.removeEventListener('postDeleted', handleDataChange);
    };
  }, [loadAnalytics]);

  return {
    data,
    loading,
    refreshAnalytics: loadAnalytics
  };
};
