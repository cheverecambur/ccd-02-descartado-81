
import React from 'react';
import { Link } from 'react-router-dom';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const BlogAdminLink = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link to="/blog-admin">
            <Button variant="outline" size="sm" className="gap-1 bg-primary/10 hover:bg-primary/20 border-primary/20">
              <Settings size={16} className="text-primary" />
              <span className="text-primary font-medium">Admin</span>
            </Button>
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>Acceder al panel de administración del blog</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default BlogAdminLink;
