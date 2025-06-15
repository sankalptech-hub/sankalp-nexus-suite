
import React from 'react';
import { cn } from '@/lib/utils';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
}

const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ className, loading = 'lazy', ...props }, ref) => {
    return (
      <img
        ref={ref}
        loading={loading}
        className={cn("max-w-full h-auto", className)}
        {...props}
      />
    );
  }
);

Image.displayName = "Image";

export { Image };
