
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 animate-fade-in">
      <div className="max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary text-xl font-bold">
            404
          </span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Page not found</h1>
        <p className="text-muted-foreground mb-6">
          We couldn't find the page you're looking for. The page might have been removed or the URL might be incorrect.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
