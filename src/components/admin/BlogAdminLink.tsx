
import React from 'react';
import { Link } from 'react-router-dom';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BlogAdminLink = () => {
  return (
    <Link to="/blog-admin">
      <Button variant="outline" size="sm" className="gap-1">
        <Settings size={16} />
        Admin
      </Button>
    </Link>
  );
};

export default BlogAdminLink;
