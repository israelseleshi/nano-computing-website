import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useAuth, LoginCredentials, SignupCredentials } from '../AuthProvider';
import { 
  validateLoginForm, 
  validateSignupForm, 
  validateEmail, 
  validatePassword, 
  validateName,
  validateConfirmPassword,
  getFieldValidationClass,
  debounceValidation 
} from '../../lib/form-validation';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

type AuthMode = 'login' | 'signup';

interface FormErrors {
  [key: string]: string;
}

interface FieldValidationState {
  [key: string]: {
    isValid: boolean;
    hasBeenValidated: boolean;
  };
}

// ============================================================================
// MAIN AUTH PAGE COMPONENT
// ============================================================================

export function AuthPage(): React.JSX.Element {
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [fieldValidation, setFieldValidation] = useState<FieldValidationState>({});
  
  const { login, signup, isLoading, error, clearError } = useAuth();

  // Form state
  const [loginForm, setLoginForm] = useState<LoginCredentials>({
    email: '',
    password: '',
    rememberMe: false
  });

  const [signupForm, setSignupForm] = useState<SignupCredentials>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  // Clear errors when switching modes
  useEffect(() => {
    clearError();
    setFormErrors({});
    setFieldValidation({});
  }, [authMode]);

  // ============================================================================
  // VALIDATION HANDLERS
  // ============================================================================

  const debouncedValidateField = debounceValidation((field: string, value: string) => {
    let validation;
    
    switch (field) {
      case 'email':
        validation = validateEmail(value);
        break;
      case 'password':
        validation = validatePassword(value);
        break;
      case 'confirmPassword':
        validation = validateConfirmPassword(signupForm.password, value);
        break;
      case 'firstName':
        validation = validateName(value, 'First name');
        break;
      case 'lastName':
        validation = validateName(value, 'Last name');
        break;
      default:
        return;
    }

    setFieldValidation(prev => ({
      ...prev,
      [field]: {
        isValid: validation.isValid,
        hasBeenValidated: true
      }
    }));

    setFormErrors(prev => ({
      ...prev,
      [field]: validation.error || ''
    }));
  }, 300);

  // ============================================================================
  // FORM HANDLERS
  // ============================================================================

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    const validation = validateLoginForm(loginForm.email, loginForm.password);
    
    if (!validation.isValid) {
      setFormErrors({ ['general']: validation.errors.join(', ') });
      return;
    }

    try {
      await login(loginForm);
    } catch (err) {
      // Error is handled by AuthProvider
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    const validation = validateSignupForm(
      signupForm.firstName,
      signupForm.lastName,
      signupForm.email,
      signupForm.password,
      signupForm.confirmPassword,
      signupForm.agreeToTerms
    );

    if (!validation.isValid) {
      setFormErrors({ ['general']: validation.errors.join(', ') });
      return;
    }

    try {
      await signup(signupForm);
    } catch (err) {
      // Error is handled by AuthProvider
    }
  };

  // ============================================================================
  // ANIMATION VARIANTS
  // ============================================================================

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  const formVariants = {
    hidden: { opacity: 0, x: authMode === 'login' ? -20 : 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: authMode === 'login' ? 20 : -20 }
  };

  // ============================================================================
  // RENDER FUNCTIONS
  // ============================================================================

  const renderError = (fieldName: string) => {
    const error = formErrors[fieldName];
    if (!error) return null;

    return (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        className="flex items-center gap-2 text-sm text-destructive mt-2"
      >
        <AlertCircle className="w-4 h-4 flex-shrink-0" />
        <span>{error}</span>
      </motion.div>
    );
  };

  const renderSuccess = (fieldName: string) => {
    const field = fieldValidation[fieldName];
    if (!field?.hasBeenValidated || !field.isValid) return null;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        className="absolute right-3 top-1/2 transform -translate-y-1/2"
      >
        <CheckCircle className="w-5 h-5 text-success" />
      </motion.div>
    );
  };

  const getInputClassName = (fieldName: string) => {
    const field = fieldValidation[fieldName];
    if (!field?.hasBeenValidated) return '';
    
    return getFieldValidationClass(field.isValid, true);
  };

  // ============================================================================
  // MAIN RENDER
  // ============================================================================

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center p-4 pt-24">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-lg"
      >
        {/* Logo and Header */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <img 
              src="/logo.jpg" 
              alt="Nano Computing Logo" 
              className="h-16 w-16 rounded-full object-cover dark:brightness-0 dark:invert"
            />
            <h1 className="text-3xl font-bold text-foreground bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
              Welcome to Nano Computing
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            {authMode === 'login' 
              ? 'Sign in to access your account' 
              : 'Create your account to get started'
            }
          </p>
        </motion.div>


        {/* Auth Forms */}
        <motion.div variants={itemVariants}>
          <AnimatePresence mode="wait">
            {authMode === 'login' ? (
              <motion.form
                key="login"
                variants={formVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
                onSubmit={handleLoginSubmit}
                className="space-y-8"
              >
                {/* Email Field */}
                <div className="space-y-3">
                  <label className="text-base font-semibold text-foreground block">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground z-10" />
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={loginForm.email}
                      onChange={(e) => {
                        setLoginForm(prev => ({ ...prev, email: e.target.value }));
                        debouncedValidateField('email', e.target.value);
                      }}
                      className={`pl-12 h-14 text-base bg-background border-2 border-border dark:border-gray-600 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 ${getInputClassName('email')}`}
                      disabled={isLoading}
                    />
                    {renderSuccess('email')}
                  </div>
                  {renderError('email')}
                </div>

                {/* Password Field */}
                <div className="space-y-3">
                  <label className="text-base font-semibold text-foreground block">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground z-10" />
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                      className="pl-12 pr-12 h-14 text-base bg-background border-2 border-border dark:border-gray-600 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-foreground hover:text-primary transition-colors z-10"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between pt-2">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={loginForm.rememberMe}
                      onChange={(e) => setLoginForm(prev => ({ ...prev, rememberMe: e.target.checked }))}
                      className="w-5 h-5 text-primary border-border rounded-lg focus:ring-primary focus:ring-2"
                      disabled={isLoading}
                    />
                    <span className="text-base text-muted-foreground">Remember me</span>
                  </label>
                  <button
                    type="button"
                    className="text-base text-primary hover:text-primary/80 transition-colors font-medium"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Error Display */}
                {(error || formErrors['general']) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="bg-destructive/10 backdrop-blur-sm rounded-2xl p-4 border-0"
                  >
                    <div className="flex items-center gap-3 text-base text-destructive">
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      <span>{error || formErrors['general']}</span>
                    </div>
                  </motion.div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="luxury"
                  size="xl"
                  className="w-full h-14 text-base font-semibold rounded-lg border border-primary/20 transition-all duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </Button>

                {/* Toggle to Sign Up */}
                <div className="text-center mt-6">
                  <p className="text-base text-muted-foreground">
                    Don't have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setAuthMode('signup')}
                      className="text-primary hover:text-primary/80 transition-colors font-semibold"
                    >
                      Sign up
                    </button>
                  </p>
                </div>
              </motion.form>
            ) : (
              <motion.form
                key="signup"
                variants={formVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
                onSubmit={handleSignupSubmit}
                className="space-y-8"
              >
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-base font-semibold text-foreground block">First Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground z-10" />
                      <Input
                        type="text"
                        placeholder="First name"
                        value={signupForm.firstName}
                        onChange={(e) => {
                          setSignupForm(prev => ({ ...prev, firstName: e.target.value }));
                          debouncedValidateField('firstName', e.target.value);
                        }}
                        className={`pl-12 h-14 text-base bg-background border-2 border-border dark:border-gray-600 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 ${getInputClassName('firstName')}`}
                        disabled={isLoading}
                      />
                      {renderSuccess('firstName')}
                    </div>
                    {renderError('firstName')}
                  </div>
                  <div className="space-y-3">
                    <label className="text-base font-semibold text-foreground block">Last Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground z-10" />
                      <Input
                        type="text"
                        placeholder="Last name"
                        value={signupForm.lastName}
                        onChange={(e) => {
                          setSignupForm(prev => ({ ...prev, lastName: e.target.value }));
                          debouncedValidateField('lastName', e.target.value);
                        }}
                        className={`pl-12 h-14 text-base bg-background border border-border rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 ${getInputClassName('lastName')}`}
                        disabled={isLoading}
                      />
                      {renderSuccess('lastName')}
                    </div>
                    {renderError('lastName')}
                  </div>
                </div>

                {/* Email Field */}
                <div className="space-y-3">
                  <label className="text-base font-semibold text-foreground block">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground z-10" />
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={signupForm.email}
                      onChange={(e) => {
                        setSignupForm(prev => ({ ...prev, email: e.target.value }));
                        debouncedValidateField('email', e.target.value);
                      }}
                      className={`pl-12 h-14 text-base bg-background border border-border rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 ${getInputClassName('email')}`}
                      disabled={isLoading}
                    />
                    {renderSuccess('email')}
                  </div>
                  {renderError('email')}
                </div>

                {/* Password Fields */}
                <div className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-base font-semibold text-foreground block">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground z-10" />
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Create a password"
                        value={signupForm.password}
                        onChange={(e) => {
                          setSignupForm(prev => ({ ...prev, password: e.target.value }));
                          debouncedValidateField('password', e.target.value);
                        }}
                        className={`pl-12 pr-12 h-14 text-base bg-background border border-border rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 ${getInputClassName('password')}`}
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-foreground hover:text-primary transition-colors z-10"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                      {renderSuccess('password')}
                    </div>
                    {renderError('password')}
                  </div>

                  <div className="space-y-3">
                    <label className="text-base font-semibold text-foreground block">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground z-10" />
                      <Input
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm your password"
                        value={signupForm.confirmPassword}
                        onChange={(e) => {
                          setSignupForm(prev => ({ ...prev, confirmPassword: e.target.value }));
                          debouncedValidateField('confirmPassword', e.target.value);
                        }}
                        className={`pl-12 pr-12 h-14 text-base bg-background border border-border rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 ${getInputClassName('confirmPassword')}`}
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-foreground hover:text-primary transition-colors z-10"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                      {renderSuccess('confirmPassword')}
                    </div>
                    {renderError('confirmPassword')}
                  </div>
                </div>

                {/* Terms Agreement */}
                <div className="space-y-3 pt-2">
                  <label className="flex items-start space-x-4 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={signupForm.agreeToTerms}
                      onChange={(e) => setSignupForm(prev => ({ ...prev, agreeToTerms: e.target.checked }))}
                      className="w-5 h-5 text-primary border-border rounded-lg focus:ring-primary focus:ring-2 mt-1"
                      disabled={isLoading}
                    />
                    <span className="text-base text-muted-foreground leading-relaxed">
                      I agree to the{' '}
                      <button type="button" className="text-primary hover:text-primary/80 transition-colors font-medium">
                        Terms of Service
                      </button>{' '}
                      and{' '}
                      <button type="button" className="text-primary hover:text-primary/80 transition-colors font-medium">
                        Privacy Policy
                      </button>
                    </span>
                  </label>
                </div>

                {/* Error Display */}
                {(error || formErrors['general']) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="bg-destructive/10 backdrop-blur-sm rounded-2xl p-4 border-0"
                  >
                    <div className="flex items-center gap-3 text-base text-destructive">
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      <span>{error || formErrors['general']}</span>
                    </div>
                  </motion.div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="luxury"
                  size="xl"
                  className="w-full h-14 text-base font-semibold rounded-lg transition-all duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </Button>

                {/* Toggle to Sign In */}
                <div className="text-center mt-6">
                  <p className="text-base text-muted-foreground">
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setAuthMode('login')}
                      className="text-primary hover:text-primary/80 transition-colors font-semibold"
                    >
                      Sign in
                    </button>
                  </p>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

      </motion.div>
    </div>
  );
}
