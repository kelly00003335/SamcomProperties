import { ReactNode } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Redirect } from 'wouter';

interface ProtectedRouteProps {
  children: ReactNode;
  adminOnly?: boolean;
}

const ProtectedRoute = ({ children, adminOnly = true }: ProtectedRouteProps) => {
  // Authentication temporarily disabled
  // Will be re-enabled before going live
  /*
  const { user, loading } = useAuth();

  // Set authorized admin emails here
  const ADMIN_EMAILS = ['samwelgithogori@gmail.com'];

  const isAdmin = user?.email && ADMIN_EMAILS.includes(user.email);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary" />
      </div>
    );
  }

  if (!user) {
    return <Redirect to="/login" />;
  }

  if (adminOnly && !isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
        <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
        <p className="text-muted-foreground mb-4">
          You don't have permission to access this area.
        </p>
        <p className="text-sm text-muted-foreground">
          Contact the administrator if you believe this is an error.
        </p>
      </div>
    );
  }
  */

  return <>{children}</>;
};

export default ProtectedRoute;
