'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ allowedRoles = [], children }) => {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (!user || !allowedRoles.includes(user?.user_type)) {
      router.push('/login');
    }
  }, [user, allowedRoles, router]);

  // Optionally show nothing while checking
  if (!user || !allowedRoles.includes(user?.user_type)) return null;

  return <>{children}</>;
};

export default ProtectedRoute;
