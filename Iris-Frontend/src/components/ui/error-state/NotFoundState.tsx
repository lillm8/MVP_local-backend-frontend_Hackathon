// Not found error state component

import { ErrorState } from './ErrorState';

interface NotFoundStateProps {
  title?: string;
  description?: string;
  onGoHome?: () => void;
  className?: string;
}

export function NotFoundState({
  title = 'Page Not Found',
  description = "The page you're looking for doesn't exist.",
  onGoHome,
  className,
}: NotFoundStateProps) {
  return (
    <ErrorState
      title={title}
      description={description}
      onGoHome={onGoHome}
      className={className}
    />
  );
}
