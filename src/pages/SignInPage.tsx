import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { signInWithGoogle } from "../auth/auth";
import { useEffect } from "react";

export default function SignInPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isSignedIn } = useAuth();
  const from = (location.state as { from?: Location; })?.from?.pathname || '/inventory';

  const handleSignInWithGoogleClick = async () => {
    try {
      await signInWithGoogle();
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (isSignedIn) {
      navigate(from, { replace: true });
    }
  }, [isSignedIn, navigate, from]);

  return (
    <div className="min-h-screen bg-theme text-theme-primary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Title Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500 rounded-xl mb-4">
            <span className="text-2xl font-bold text-white">LM</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Lab Manager</h1>
          <p className="text-theme-secondary">Manage your lab inventory with ease</p>
        </div>

        {/* Sign In Card */}
        <div className="bg-theme-surface p-8 rounded-xl border border-theme shadow-lg">
          <h2 className="text-xl font-semibold mb-6 text-center">Sign in to continue</h2>
          
          <button
            type="button"
            onClick={handleSignInWithGoogleClick}
            className="w-full px-6 py-3 bg-white hover:bg-gray-50 text-gray-800 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-3 border border-gray-300 shadow-sm"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          {/* Additional info */}
          <div className="mt-6 pt-6 border-t border-theme">
            <p className="text-sm text-theme-secondary text-center">
              Sign in with your organization's Google account
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-theme-secondary mt-6">
          Need help? Contact your system administrator
        </p>
      </div>
    </div>
  );
}
