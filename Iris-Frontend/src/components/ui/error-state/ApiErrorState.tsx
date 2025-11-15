// API-specific error state component

import { ErrorState } from './ErrorState';
import { getErrorMessage } from './error-messages';

interface ApiErrorStateProps {
  error: any;
  onRetry?: () => void;
  className?: string;
}

export function ApiErrorState({
  error,
  onRetry,
  className,
}: ApiErrorStateProps) {
  const { title, description } = getErrorMessage(error);

  return (
    <ErrorState
      title={title}
      description={description}
      error={error}
      onRetry={onRetry}
      className={className}
    />
  );
}
