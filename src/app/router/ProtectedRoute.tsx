import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

type ProtectedRouteProps = {
  children: ReactNode;
};

function isAuthed(): boolean {
  return localStorage.getItem('skolar_auth') === '1';
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  if (!isAuthed()) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
