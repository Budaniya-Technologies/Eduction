'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  
    // 🔁 Redirect logic based on user_type or other keys
    if (userData.user_type === 'admin') {
      router.push('/admindashboard');
    } else if (userData.user_type === 'teacher') {
      router.push('/teacherdashboard');
    } else if (userData.user_type === 'student') {
      router.push('/studentdashboard');
    } else if (userData.user_type === 'institute' || userData.school_name) {
      router.push('/school-dashboard'); // ✅ Institute goes here
    } else {
      router.push('/'); // fallback
    }
  };
  

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
