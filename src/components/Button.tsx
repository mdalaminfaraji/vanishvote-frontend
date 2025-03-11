import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  isLoading?: boolean;
  fullWidth?: boolean;
}

export function Button({ 
  children, 
  variant = 'primary', 
  isLoading = false, 
  fullWidth = false,
  className = '',
  disabled,
  ...props 
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50';
  
  const variantStyles = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500',
    secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200 focus:ring-slate-500 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600',
    outline: 'border border-slate-300 bg-transparent hover:bg-slate-100 focus:ring-slate-500 dark:border-slate-600 dark:hover:bg-slate-800',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  };
  
  const sizeStyles = 'px-4 py-2 text-sm';
  const widthStyles = fullWidth ? 'w-full' : '';
  
  const styles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles} ${widthStyles} ${className}`;
  
  return (
    <button 
      className={styles} 
      disabled={isLoading || disabled} 
      {...props}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </>
      ) : children}
    </button>
  );
}
