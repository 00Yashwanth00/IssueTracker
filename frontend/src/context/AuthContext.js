import { createContext, useState, useEffect, useCallback, useContext } from 'react';
import { login as apiLogin, register as apiRegister, getCurrentUser, logout as apiLogout } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth state
  const initializeAuth = useCallback(async () => {
    try {
      const userData = await getCurrentUser();
      setUser(userData);
      setError(null);
    } catch (err) {
      setUser(null);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  // Register new user
  const register = async (userData) => {
    try {
      setLoading(true);
      const { user, token } = await apiRegister(userData);
      localStorage.setItem('token', token);
      setUser(user);
      setError(null);
      return user;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Login existing user
  const login = async (credentials) => {
    try {
      setLoading(true);
      const { user, token } = await apiLogin(credentials);
      localStorage.setItem('token', token);
      setUser(user);
      setError(null);
      return user;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = () => {
    apiLogout();
    setUser(null);
    setError(null);
  };

  // Refresh auth state
  const refreshAuth = () => {
    return initializeAuth();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        register,
        login,
        logout,
        refreshAuth,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};