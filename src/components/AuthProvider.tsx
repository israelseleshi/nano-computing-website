import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserId, EmailAddress } from '../types';

// ============================================================================
// AUTHENTICATION TYPES
// ============================================================================

export interface User {
  readonly id: UserId;
  readonly email: EmailAddress;
  readonly firstName: string;
  readonly lastName: string;
  readonly avatar?: string;
  readonly role: 'user' | 'admin';
  readonly createdAt: Date;
  readonly lastLoginAt?: Date;
}

export interface AuthState {
  readonly user: User | null;
  readonly isAuthenticated: boolean;
  readonly isLoading: boolean;
  readonly error: string | null;
}

export interface LoginCredentials {
  readonly email: string;
  readonly password: string;
  readonly rememberMe?: boolean;
}

export interface SignupCredentials {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly password: string;
  readonly confirmPassword: string;
  readonly agreeToTerms: boolean;
}

export interface AuthContextType extends AuthState {
  readonly login: (credentials: LoginCredentials) => Promise<void>;
  readonly signup: (credentials: SignupCredentials) => Promise<void>;
  readonly logout: () => void;
  readonly clearError: () => void;
}

// ============================================================================
// AUTHENTICATION CONTEXT
// ============================================================================

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null
  });

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedUser = localStorage.getItem('nano_auth_user');
        const storedToken = localStorage.getItem('nano_auth_token');
        
        if (storedUser && storedToken) {
          const user = JSON.parse(storedUser) as User;
          setAuthState({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null
          });
        } else {
          setAuthState(prev => ({ ...prev, isLoading: false }));
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: 'Failed to initialize authentication'
        });
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = async (credentials: LoginCredentials): Promise<void> => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // Simulate API call - replace with actual authentication
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Check for admin credentials
      const isAdmin = credentials.email === 'admin@nano.com' && credentials.password === 'nano123';
      
      if (!isAdmin && credentials.email !== 'user@nano.com') {
        throw new Error('Invalid email or password');
      }

      // Mock user data - replace with actual API response
      const mockUser: User = isAdmin ? {
        id: 'admin_001' as UserId,
        email: credentials.email as EmailAddress,
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin',
        createdAt: new Date(),
        lastLoginAt: new Date()
      } : {
        id: 'user_123' as UserId,
        email: credentials.email as EmailAddress,
        firstName: 'John',
        lastName: 'Doe',
        role: 'user',
        createdAt: new Date(),
        lastLoginAt: new Date()
      };

      // Store auth data
      localStorage.setItem('nano_auth_user', JSON.stringify(mockUser));
      localStorage.setItem('nano_auth_token', 'mock_jwt_token_123');
      
      if (credentials.rememberMe) {
        localStorage.setItem('nano_auth_remember', 'true');
      }

      setAuthState({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false,
        error: null
      });
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Login failed'
      }));
    }
  };

  // Signup function
  const signup = async (credentials: SignupCredentials): Promise<void> => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // Validate passwords match
      if (credentials.password !== credentials.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      // Simulate API call - replace with actual registration
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock user creation - replace with actual API response
      const newUser: User = {
        id: 'user_' + Date.now() as UserId,
        email: credentials.email as EmailAddress,
        firstName: credentials.firstName,
        lastName: credentials.lastName,
        role: 'user',
        createdAt: new Date()
      };

      // Store auth data
      localStorage.setItem('nano_auth_user', JSON.stringify(newUser));
      localStorage.setItem('nano_auth_token', 'mock_jwt_token_' + Date.now());

      setAuthState({
        user: newUser,
        isAuthenticated: true,
        isLoading: false,
        error: null
      });
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Registration failed'
      }));
    }
  };

  // Logout function
  const logout = (): void => {
    localStorage.removeItem('nano_auth_user');
    localStorage.removeItem('nano_auth_token');
    localStorage.removeItem('nano_auth_remember');

    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null
    });
  };

  // Clear error function
  const clearError = (): void => {
    setAuthState(prev => ({ ...prev, error: null }));
  };

  const contextValue: AuthContextType = {
    ...authState,
    login,
    signup,
    logout,
    clearError
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

// ============================================================================
// AUTHENTICATION HOOK
// ============================================================================

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
