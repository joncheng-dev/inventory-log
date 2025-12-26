import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import { signOutUser } from '../../auth/auth';
import { useNotification } from '../../contexts/NotificationContext';
import { getErrorMessage } from '../../utils/error';

export default function DropdownMenu() {
  const navigate = useNavigate();
  const { success, error } = useNotification(); 
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { userProfile, setUserProfile, setIsSignedIn } = useAuth(); // user email is "userProfile.email"

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOutClick = async () => {
    try {
      await signOutUser();
      setIsSignedIn(false);
      setUserProfile(null);
      success('Signed out successfully');
      setTimeout(() => {
        navigate('/signin');
      }, 800);
    } catch (err) {
      error(`Failed to sign out: ${getErrorMessage(err)}`);
      console.error(err);
    }
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className='ml-10 px-2 py-2 relative'>
      <svg 
        className='cursor-pointer text-theme-primary hover:text-primary-500 transition-colors duration-200' 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        onClick={toggleDropdown}
      >
        <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-theme-surface rounded-md shadow-lg border border-theme z-50">
          <div className="py-2 px-4 border-b border-theme-muted">
            {userProfile && (
              <>
                <p className="text-xs text-theme-secondary mb-1">Signed in as</p>
                <p className="text-sm font-medium text-theme-primary truncate">
                  {userProfile.email}
                </p>
              </>
            )
            }
          </div>
          <div className="py-1">
            <Link
              to="/theme-viewer"
              className="block px-4 py-2 text-sm text-theme-primary hover:bg-theme transition-colors duration-200"
            >
              Theme Viewer
            </Link>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-theme-primary hover:bg-theme transition-colors duration-200"
            >
              Settings
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-theme-primary hover:bg-theme transition-colors duration-200"
            >
              About
            </a>
            {userProfile?.role === 'admin' && (
              <>
                <div className="my-2 border-t border-theme-muted" />

                <p className="px-4 py-1 text-xs font-semibold text-theme-secondary uppercase tracking-wide">
                  Admin
                </p>

                <Link
                  to="/admin/users"
                  className="block px-4 py-2 text-sm text-theme-primary hover:bg-theme transition-colors"
                >
                  Manage Users
                </Link>
              </>
            )}

            <div className="my-2 border-t border-theme-muted" />
            <a
              href="#"
              onClick={(e) => {
                  e.preventDefault();
                  handleSignOutClick();
                }
              }
              className="block px-4 py-2 text-sm text-theme-primary hover:bg-theme transition-colors duration-200"
            >
              Log Out
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
