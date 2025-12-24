// ============================================================================
// FORM VALIDATION UTILITIES
// ============================================================================

export interface ValidationResult {
  readonly isValid: boolean;
  readonly errors: string[];
}

export interface FieldValidation {
  readonly field: string;
  readonly isValid: boolean;
  readonly error?: string;
}

// ============================================================================
// VALIDATION RULES
// ============================================================================

export const ValidationRules = {
  email: {
    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: 'Please enter a valid email address',
  },
  password: {
    minLength: 8,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    message:
      'Password must be at least 8 characters with uppercase, lowercase, number, and special character',
  },
  name: {
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z\s'-]+$/,
    message:
      'Name must be 2-50 characters and contain only letters, spaces, hyphens, and apostrophes',
  },
  required: {
    message: 'This field is required',
  },
} as const;

// ============================================================================
// VALIDATION FUNCTIONS
// ============================================================================

export function validateEmail(email: string): FieldValidation {
  const trimmedEmail = email.trim();

  if (!trimmedEmail) {
    return {
      field: 'email',
      isValid: false,
      error: ValidationRules.required.message,
    };
  }

  if (!ValidationRules.email.pattern.test(trimmedEmail)) {
    return {
      field: 'email',
      isValid: false,
      error: ValidationRules.email.message,
    };
  }

  return {
    field: 'email',
    isValid: true,
  };
}

export function validatePassword(password: string): FieldValidation {
  if (!password) {
    return {
      field: 'password',
      isValid: false,
      error: ValidationRules.required.message,
    };
  }

  if (password.length < ValidationRules.password.minLength) {
    return {
      field: 'password',
      isValid: false,
      error: `Password must be at least ${ValidationRules.password.minLength} characters long`,
    };
  }

  if (!ValidationRules.password.pattern.test(password)) {
    return {
      field: 'password',
      isValid: false,
      error: ValidationRules.password.message,
    };
  }

  return {
    field: 'password',
    isValid: true,
  };
}

export function validateConfirmPassword(
  password: string,
  confirmPassword: string
): FieldValidation {
  if (!confirmPassword) {
    return {
      field: 'confirmPassword',
      isValid: false,
      error: ValidationRules.required.message,
    };
  }

  if (password !== confirmPassword) {
    return {
      field: 'confirmPassword',
      isValid: false,
      error: 'Passwords do not match',
    };
  }

  return {
    field: 'confirmPassword',
    isValid: true,
  };
}

export function validateName(name: string, fieldName: string = 'name'): FieldValidation {
  const trimmedName = name.trim();

  if (!trimmedName) {
    return {
      field: fieldName,
      isValid: false,
      error: ValidationRules.required.message,
    };
  }

  if (trimmedName.length < ValidationRules.name.minLength) {
    return {
      field: fieldName,
      isValid: false,
      error: `${fieldName} must be at least ${ValidationRules.name.minLength} characters long`,
    };
  }

  if (trimmedName.length > ValidationRules.name.maxLength) {
    return {
      field: fieldName,
      isValid: false,
      error: `${fieldName} must be no more than ${ValidationRules.name.maxLength} characters long`,
    };
  }

  if (!ValidationRules.name.pattern.test(trimmedName)) {
    return {
      field: fieldName,
      isValid: false,
      error: ValidationRules.name.message,
    };
  }

  return {
    field: fieldName,
    isValid: true,
  };
}

export function validateRequired(value: string, fieldName: string): FieldValidation {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return {
      field: fieldName,
      isValid: false,
      error: ValidationRules.required.message,
    };
  }

  return {
    field: fieldName,
    isValid: true,
  };
}

// ============================================================================
// FORM VALIDATION COMPOSITES
// ============================================================================

export function validateLoginForm(email: string, password: string): ValidationResult {
  const emailValidation = validateEmail(email);
  const passwordValidation = validateRequired(password, 'password');

  const errors: string[] = [];

  if (!emailValidation.isValid && emailValidation.error) {
    errors.push(emailValidation.error);
  }

  if (!passwordValidation.isValid && passwordValidation.error) {
    errors.push(passwordValidation.error);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function validateSignupForm(
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  confirmPassword: string,
  agreeToTerms: boolean
): ValidationResult {
  const firstNameValidation = validateName(firstName, 'First name');
  const lastNameValidation = validateName(lastName, 'Last name');
  const emailValidation = validateEmail(email);
  const passwordValidation = validatePassword(password);
  const confirmPasswordValidation = validateConfirmPassword(password, confirmPassword);

  const errors: string[] = [];

  if (!firstNameValidation.isValid && firstNameValidation.error) {
    errors.push(firstNameValidation.error);
  }

  if (!lastNameValidation.isValid && lastNameValidation.error) {
    errors.push(lastNameValidation.error);
  }

  if (!emailValidation.isValid && emailValidation.error) {
    errors.push(emailValidation.error);
  }

  if (!passwordValidation.isValid && passwordValidation.error) {
    errors.push(passwordValidation.error);
  }

  if (!confirmPasswordValidation.isValid && confirmPasswordValidation.error) {
    errors.push(confirmPasswordValidation.error);
  }

  if (!agreeToTerms) {
    errors.push('You must agree to the Terms of Service and Privacy Policy');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// ============================================================================
// REAL-TIME VALIDATION HELPERS
// ============================================================================

export function getFieldValidationClass(isValid: boolean, hasError: boolean): string {
  if (!hasError) return '';
  return isValid
    ? 'border-success focus-visible:border-success focus-visible:ring-success/20'
    : 'border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20';
}

export function debounceValidation<T extends (...args: any[]) => any>(
  fn: T,
  delay: number = 300
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}
