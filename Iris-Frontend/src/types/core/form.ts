// Form component props

export interface FormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  placeholder?: string;
  required?: boolean;
  error?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export interface SearchInputProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onSearch: (query: string) => void;
  suggestions?: string[];
  loading?: boolean;
}
