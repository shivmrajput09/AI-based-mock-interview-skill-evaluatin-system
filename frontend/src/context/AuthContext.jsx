import { createContext, useContext, useState, useEffect } from 'react';
import { login, register, getMe } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getMe().then(res => setUser(res.data.user)).catch(() => localStorage.removeItem('token')).finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const loginUser = async (email, password) => {
    const res = await login({ email, password });
    localStorage.setItem('token', res.data.token);
    setUser(res.data.user);
  };

  const registerUser = async (name, email, password) => {
    const res = await register({ name, email, password });
    localStorage.setItem('token', res.data.token);
    setUser(res.data.user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, registerUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};