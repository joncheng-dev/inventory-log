import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import PageLayout from './PageLayout';

export default function UnauthorizedPage() {
  const { userProfile } = useAuth();
  const navigate = useNavigate();
  if (!userProfile) return;

  return (
    <PageLayout>
      <div className="flex flex-col items-center justify-center flex-1 px-4">
        <div className="max-w-md w-full text-center space-y-6">
          {/* Icon/Visual */}
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
              <svg 
                className="w-12 h-12 text-red-600 dark:text-red-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-theme-primary">
            Access Denied
          </h1>

          {/* Message */}
          <div className="space-y-2">
            <p className="text-theme-secondary">
              You don't have permission to view this page.
            </p>
            {userProfile && (
              <p className="text-sm text-theme-secondary">
                Signed in as: <span className="font-medium">{userProfile.email}</span>
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 pt-4">
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-200 font-medium"
            >
              Go Back
            </button>
            <Link
              to="/inventory"
              className="px-6 py-3 bg-theme-surface text-theme-primary rounded-lg hover:bg-theme-hover transition-colors duration-200 font-medium"
            >
              Go to Inventory
            </Link>
          </div>

          {/* Help text */}
          <p className="text-sm text-theme-secondary pt-4">
            Need access? Contact your administrator.
          </p>
        </div>
      </div>
    </PageLayout>
  );
}
