import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { signInWithGoogle } from "../auth/auth";
import { useEffect } from "react";

export default function SignInPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isSignedIn, setIsSignedIn } = useAuth();

  const from = (location.state as { from?: Location; })?.from?.pathname || '/inventory';

  const handleSignInClick = () => {
    try {
      setIsSignedIn(true);
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
    }
  };

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
    <div className="min-h-screen bg-theme text-theme-primary flex items-center justify-center">
      <div className="bg-theme-surface p-8 rounded-lg border border-theme max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">Sign In</h1>
        
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 rounded-lg bg-theme border border-theme text-theme-primary focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Enter your email"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 rounded-lg bg-theme border border-theme text-theme-primary focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Enter your password"
            />
          </div>
          
          <button
            type="button"
            onClick={handleSignInClick}
            className="w-full px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-200 font-medium"
          >
            Sign In
          </button>

          <button
            type="button"
            onClick={handleSignInWithGoogleClick}
            className="w-full px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-200 font-medium"
          >
            Sign In with Google
          </button>
        </form>
      </div>
    </div>
  );
}

