
import { useEffect, useState } from "react";

interface SafeHtmlContentProps {
  content: string;
  className?: string;
}

export const SafeHtmlContent = ({ content, className = "" }: SafeHtmlContentProps) => {
  const [sanitizedContent, setSanitizedContent] = useState("");

  useEffect(() => {
    // Basic HTML sanitization - remove script tags and dangerous attributes
    const sanitize = (html: string) => {
      return html
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/on\w+="[^"]*"/gi, '')
        .replace(/javascript:/gi, '');
    };

    setSanitizedContent(sanitize(content));
  }, [content]);

  return (
    <div 
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
};
