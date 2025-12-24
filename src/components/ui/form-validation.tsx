import React, { useState, useCallback } from 'react';
import { cn } from './utils';
import { AlertCircle, CheckCircle, Eye, EyeOff } from 'lucide-react';
import { Input } from './input';
import { Textarea } from './textarea';
import { Button } from './button';

// Validation Rules
export type ValidationRule = {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  email?: boolean;
  phone?: boolean;
  url?: boolean;
  custom?: (value: string) => string | null;
};

export type ValidationError = {
  field: string;
  message: string;
};

// Validation Functions
export const validators = {
  required: (value: string) => (!value.trim() ? 'This field is required' : null),

  minLength: (value: string, min: number) =>
    value.length < min ? `Must be at least ${min} characters` : null,

  maxLength: (value: string, max: number) =>
    value.length > max ? `Must be no more than ${max} characters` : null,

  email: (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !emailRegex.test(value) ? 'Please enter a valid email address' : null;
  },

  phone: (value: string) => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return !phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))
      ? 'Please enter a valid phone number'
      : null;
  },

  url: (value: string) => {
    try {
      new URL(value);
      return null;
    } catch {
      return 'Please enter a valid URL';
    }
  },

  pattern: (value: string, pattern: RegExp) =>
    !pattern.test(value) ? 'Please enter a valid format' : null,
};

// Validate Field Function
export function validateField(value: string, rules: ValidationRule): string | null {
  if (rules.required && !value.trim()) {
    return validators.required(value);
  }

  if (!value.trim()) return null; // Skip other validations if empty and not required

  if (rules.minLength && validators.minLength(value, rules.minLength)) {
    return validators.minLength(value, rules.minLength);
  }

  if (rules.maxLength && validators.maxLength(value, rules.maxLength)) {
    return validators.maxLength(value, rules.maxLength);
  }

  if (rules.email && validators.email(value)) {
    return validators.email(value);
  }

  if (rules.phone && validators.phone(value)) {
    return validators.phone(value);
  }

  if (rules.url && validators.url(value)) {
    return validators.url(value);
  }

  if (rules.pattern && validators.pattern(value, rules.pattern)) {
    return validators.pattern(value, rules.pattern);
  }

  if (rules.custom) {
    return rules.custom(value);
  }

  return null;
}

// Enhanced Input Component with Validation
interface ValidatedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: boolean;
  rules?: ValidationRule;
  onValidation?: (error: string | null) => void;
  showPasswordToggle?: boolean;
  helpText?: string;
}

export function ValidatedInput({
  label,
  error,
  success,
  rules,
  onValidation,
  showPasswordToggle = false,
  helpText,
  className,
  type = 'text',
  value,
  onChange,
  onBlur,
  ...props
}: ValidatedInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleValidation = useCallback(
    (inputValue: string) => {
      if (!rules) return;

      const validationError = validateField(inputValue, rules);
      setLocalError(validationError);
      onValidation?.(validationError);
    },
    [rules, onValidation]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange?.(e);

    if (touched) {
      handleValidation(newValue);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched(true);
    handleValidation(e.target.value);
    onBlur?.(e);
  };

  const displayError = error || localError;
  const hasError = touched && displayError;
  const hasSuccess = touched && !displayError && success;
  const inputType =
    showPasswordToggle && type === 'password' ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium text-foreground flex items-center gap-2">
          {label}
          {rules?.required && <span className="text-destructive">*</span>}
        </label>
      )}

      <div className="relative">
        <Input
          {...props}
          type={inputType}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          className={cn(
            'transition-all duration-200',
            hasError && 'border-destructive focus:border-destructive focus:ring-destructive/20',
            hasSuccess && 'border-success focus:border-success focus:ring-success/20',
            showPasswordToggle && 'pr-10',
            className
          )}
          aria-invalid={hasError}
          aria-describedby={
            displayError ? `${props.id}-error` : helpText ? `${props.id}-help` : undefined
          }
        />

        {/* Password Toggle */}
        {showPasswordToggle && type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors touch-target"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}

        {/* Validation Icons */}
        {!showPasswordToggle && (hasError || hasSuccess) && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {hasError && <AlertCircle className="w-4 h-4 text-destructive" />}
            {hasSuccess && <CheckCircle className="w-4 h-4 text-success" />}
          </div>
        )}
      </div>

      {/* Error Message */}
      {hasError && (
        <div
          id={`${props.id}-error`}
          className="flex items-center gap-2 text-sm text-destructive animate-slide-in-from-top"
        >
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {displayError}
        </div>
      )}

      {/* Success Message */}
      {hasSuccess && (
        <div className="flex items-center gap-2 text-sm text-success animate-slide-in-from-top">
          <CheckCircle className="w-4 h-4 flex-shrink-0" />
          Looks good!
        </div>
      )}

      {/* Help Text */}
      {helpText && !hasError && (
        <p id={`${props.id}-help`} className="text-xs text-muted-foreground">
          {helpText}
        </p>
      )}
    </div>
  );
}

// Enhanced Textarea Component with Validation
interface ValidatedTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  success?: boolean;
  rules?: ValidationRule;
  onValidation?: (error: string | null) => void;
  helpText?: string;
  showCharCount?: boolean;
}

export function ValidatedTextarea({
  label,
  error,
  success,
  rules,
  onValidation,
  helpText,
  showCharCount = false,
  className,
  value,
  onChange,
  onBlur,
  maxLength,
  ...props
}: ValidatedTextareaProps) {
  const [touched, setTouched] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleValidation = useCallback(
    (inputValue: string) => {
      if (!rules) return;

      const validationError = validateField(inputValue, rules);
      setLocalError(validationError);
      onValidation?.(validationError);
    },
    [rules, onValidation]
  );

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    onChange?.(e);

    if (touched) {
      handleValidation(newValue);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setTouched(true);
    handleValidation(e.target.value);
    onBlur?.(e);
  };

  const displayError = error || localError;
  const hasError = touched && displayError;
  const hasSuccess = touched && !displayError && success;
  const charCount = typeof value === 'string' ? value.length : 0;

  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium text-foreground flex items-center gap-2">
          {label}
          {rules?.required && <span className="text-destructive">*</span>}
        </label>
      )}

      <div className="relative">
        <Textarea
          {...props}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          maxLength={maxLength}
          className={cn(
            'transition-all duration-200',
            hasError && 'border-destructive focus:border-destructive focus:ring-destructive/20',
            hasSuccess && 'border-success focus:border-success focus:ring-success/20',
            className
          )}
          aria-invalid={hasError}
          aria-describedby={
            displayError ? `${props.id}-error` : helpText ? `${props.id}-help` : undefined
          }
        />

        {/* Character Count */}
        {showCharCount && maxLength && (
          <div className="absolute bottom-2 right-2 text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded">
            {charCount}/{maxLength}
          </div>
        )}
      </div>

      {/* Error Message */}
      {hasError && (
        <div
          id={`${props.id}-error`}
          className="flex items-center gap-2 text-sm text-destructive animate-slide-in-from-top"
        >
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {displayError}
        </div>
      )}

      {/* Success Message */}
      {hasSuccess && (
        <div className="flex items-center gap-2 text-sm text-success animate-slide-in-from-top">
          <CheckCircle className="w-4 h-4 flex-shrink-0" />
          Looks good!
        </div>
      )}

      {/* Help Text */}
      {helpText && !hasError && (
        <p id={`${props.id}-help`} className="text-xs text-muted-foreground">
          {helpText}
        </p>
      )}
    </div>
  );
}

// Form Hook for Managing Multiple Fields
export function useFormValidation<T extends Record<string, any>>(
  initialValues: T,
  validationRules: Record<keyof T, ValidationRule>
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<keyof T, string | null>>(
    {} as Record<keyof T, string | null>
  );
  const [touched, setTouched] = useState<Record<keyof T, boolean>>({} as Record<keyof T, boolean>);

  const validateField = useCallback(
    (field: keyof T, value: string) => {
      const rule = validationRules[field];
      if (!rule) return null;

      return validateField(value, rule);
    },
    [validationRules]
  );

  const validateForm = useCallback(() => {
    const newErrors: Record<keyof T, string | null> = {} as Record<keyof T, string | null>;
    let isValid = true;

    Object.keys(validationRules).forEach((field) => {
      const error = validateField(field as keyof T, String(values[field] || ''));
      newErrors[field as keyof T] = error;
      if (error) isValid = false;
    });

    setErrors(newErrors);
    return isValid;
  }, [values, validationRules, validateField]);

  const setValue = useCallback(
    (field: keyof T, value: any) => {
      setValues((prev) => ({ ...prev, [field]: value }));

      if (touched[field]) {
        const error = validateField(field, String(value));
        setErrors((prev) => ({ ...prev, [field]: error }));
      }
    },
    [touched, validateField]
  );

  const setFieldTouched = useCallback(
    (field: keyof T) => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      const error = validateField(field, String(values[field] || ''));
      setErrors((prev) => ({ ...prev, [field]: error }));
    },
    [values, validateField]
  );

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({} as Record<keyof T, string | null>);
    setTouched({} as Record<keyof T, boolean>);
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    setValue,
    setFieldTouched,
    validateForm,
    reset,
    isValid: Object.values(errors).every((error) => !error),
  };
}

// Form Submission Hook with Loading States
export function useFormSubmission<T>(
  onSubmit: (data: T) => Promise<void>,
  onSuccess?: () => void,
  onError?: (error: Error) => void
) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = useCallback(
    async (data: T) => {
      setIsSubmitting(true);
      setSubmitError(null);
      setIsSuccess(false);

      try {
        await onSubmit(data);
        setIsSuccess(true);
        onSuccess?.();
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An error occurred';
        setSubmitError(errorMessage);
        onError?.(error instanceof Error ? error : new Error(errorMessage));
      } finally {
        setIsSubmitting(false);
      }
    },
    [onSubmit, onSuccess, onError]
  );

  const reset = useCallback(() => {
    setIsSubmitting(false);
    setSubmitError(null);
    setIsSuccess(false);
  }, []);

  return {
    isSubmitting,
    submitError,
    isSuccess,
    handleSubmit,
    reset,
  };
}
