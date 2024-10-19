// ProtectedRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useGetMeQuery } from './services/user.service';
import { Spinner } from '@material-tailwind/react';

// Loading component as fallback
const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Spinner className="h-12 w-12 text-indigo-500" />
    </div>
  );
};
const ProtectedRoute: React.FC = () => {
  const { data: user, isLoading } = useGetMeQuery();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    // If user is not authenticated, redirect to login
    return <Navigate to="/login" replace />;
  }

  // If user is authenticated, render the child components
  return <Outlet />;
};

export default ProtectedRoute;
