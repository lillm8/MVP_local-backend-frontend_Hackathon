// Common UI component props

export interface BaseComponentProps {
  className?: string;
  children?: unknown;
}

export interface LoadingProps extends BaseComponentProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

export interface ErrorProps extends BaseComponentProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export interface EmptyStateProps extends BaseComponentProps {
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  icon?: unknown;
}
