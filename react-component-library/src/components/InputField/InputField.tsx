import React, { useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';
import { Eye, EyeOff, LoaderCircle, X } from 'lucide-react';

// CVA for the main wrapper
const inputWrapperVariants = cva(
  'relative flex items-center w-full transition-all duration-200',
  {
    variants: {
      variant: {
        filled: 'bg-gray-100 dark:bg-gray-700 border-2 border-transparent focus-within:bg-white dark:focus-within:bg-gray-800',
        outlined: 'bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600',
        ghost: 'bg-transparent border-2 border-transparent hover:bg-gray-100 dark:hover:bg-gray-700',
      },
      size: {
        sm: 'h-8 rounded-md',
        md: 'h-10 rounded-lg',
        lg: 'h-12 rounded-lg text-lg',
      },
      invalid: {
        true: 'border-red-500 focus-within:border-red-500',
        false: 'focus-within:border-blue-500 dark:focus-within:border-blue-400',
      },
      disabled: {
        true: 'bg-gray-100 dark:bg-gray-800 opacity-50 cursor-not-allowed',
      },
    },
    compoundVariants: [
      { invalid: true, variant: 'filled', className: 'bg-red-50 dark:bg-red-900/20' },
    ],
    defaultVariants: {
      variant: 'outlined',
      size: 'md',
      invalid: false,
      disabled: false,
    },
  }
);

// CVA for the input element itself
const inputVariants = cva(
  'w-full h-full bg-transparent outline-none disabled:cursor-not-allowed text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500',
  {
    variants: {
      size: {
        sm: 'px-3 text-sm',
        md: 'px-4 text-base',
        lg: 'px-5 text-lg',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);


export interface InputFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>, VariantProps<typeof inputWrapperVariants> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  loading?: boolean;
  onClear?: () => void;
  showClearButton?: boolean;
}

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      className,
      variant,
      size,
      label,
      helperText,
      errorMessage,
      type = 'text',
      disabled = false,
      invalid = false,
      loading = false,
      onClear,
      showClearButton = false,
      value,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    
    const hasError = invalid && !!errorMessage;

    return (
      <div className={clsx('w-full', className)}>
        {label && (
          <label htmlFor={props.id || props.name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {label}
          </label>
        )}

        <div className={inputWrapperVariants({ variant, size, invalid: hasError, disabled })}>
          <input
            ref={ref}
            type={isPassword ? (showPassword ? 'text' : 'password') : type}
            disabled={disabled || loading}
            aria-invalid={hasError}
            value={value}
            {...props}
            className={inputVariants({ size })}
          />

          <div className="flex items-center space-x-2 pr-3">
            {loading && <LoaderCircle className="animate-spin text-gray-500" size={size === 'sm' ? 16 : 20} />}
            
            {showClearButton && value && !disabled && !loading && (
              <button type="button" onClick={onClear} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                <X size={size === 'sm' ? 16 : 20} />
              </button>
            )}

            {isPassword && !loading && (
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                {showPassword ? <EyeOff size={size === 'sm' ? 16 : 20} /> : <Eye size={size === 'sm' ? 16 : 20} />}
              </button>
            )}
          </div>
        </div>

        {(helperText || hasError) && (
          <p className={clsx('mt-1 text-sm', hasError ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400')}>
            {hasError ? errorMessage : helperText}
          </p>
        )}
      </div>
    );
  }
);

InputField.displayName = 'InputField';