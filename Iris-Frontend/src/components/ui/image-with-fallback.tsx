'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==';

// Core image properties
interface ImageCore {
  src: string;
  alt: string;
}

// Image styling properties
interface ImageStyling {
  className?: string;
  style?: React.CSSProperties;
}

// Image dimensions
interface ImageDimensions {
  width?: number;
  height?: number;
  fill?: boolean;
}

// Image event handlers
interface ImageEvents {
  onError?: () => void;
}

// Combined interface with additional props support
interface ImageWithFallbackProps
  extends ImageCore,
    ImageStyling,
    ImageDimensions,
    ImageEvents {
  fallbackSrc?: string;
  [key: string]: any;
}

export function ImageWithFallback({
  src,
  alt,
  className,
  style,
  width,
  height,
  fill,
  onError,
  fallbackSrc,
  ...rest
}: ImageWithFallbackProps) {
  const [didError, setDidError] = useState(false);

  const handleError = () => {
    setDidError(true);
    onError?.();
  };

  if (didError) {
    return (
      <div
        className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`}
        style={style}
      >
        <div className='flex h-full w-full items-center justify-center'>
          <Image
            src={fallbackSrc || ERROR_IMG_SRC}
            alt='Error loading image'
            width={width || 88}
            height={height || 88}
          />
        </div>
      </div>
    );
  }

  const shouldUseFill = !width && !height && (fill ?? true);
  const inferredSizes =
    rest.sizes ||
    (shouldUseFill
      ? '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
      : undefined);

  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      style={style}
      width={shouldUseFill ? undefined : width}
      height={shouldUseFill ? undefined : height}
      fill={shouldUseFill}
      sizes={inferredSizes}
      onError={handleError}
    />
  );
}
