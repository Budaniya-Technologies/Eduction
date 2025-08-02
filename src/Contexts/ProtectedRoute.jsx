'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ allowedRoles = [], children }) => {
  const router = useRouter();
  const { user } = useAuth();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else if (
      allowedRoles.length > 0 &&
      !allowedRoles.includes(user.user_type) &&
      !(allowedRoles.includes('teacher') && user.is_teacher) &&
      !(allowedRoles.includes('student') && user.is_student) &&
      !(allowedRoles.includes('institute') && user.is_institute_admin)
    ) {
      router.push('/unauthorized');
    } else {
      setChecked(true);
    }
  }, [user, allowedRoles, router]);

  if (!checked) return null;

  return <>{children}</>;
};

export default ProtectedRoute;
