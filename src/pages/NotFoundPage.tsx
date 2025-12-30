import { Link, useNavigate } from 'react-router-dom';
import PageLayout from './PageLayout';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <PageLayout>
      <div className='flex flex-col items-center justify-center flex-1 px-4'>
        <div className='max-w-md w-full text-center space-y-6'>
          
          {/* Image */}
          <div className='flex justify-center'>
            <div className='w-24 h-24 rounded-full bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center'>
              <svg 
                className='w-12 h-12 text-amber-600 dark:text-amber-400'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          
          {/* Title */}
          <h1 className='text-3x1 font-bold text-theme-primary'>
            404 - Page Not Found
          </h1>
          
          {/* Message */}
          <div className='space-y-2'>
            <p className='text-theme-secondary'>
              The page you're looking for does not exist or has been moved.
            </p>
          </div>

          {/* Actions */}
          <div className='flex flex-col gap-3 pt-4'>
            <button
              onClick={() => navigate(-1)}
              className='px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-200 font-medium'
            >
              Go Back
            </button>
            <Link
              to='/inventory'
              className='px-6 py-3 bg-theme-surface text-theme-primary rounded-lg hover:bg-theme-hover transition-colors duration-200 font-medium'
            >
              Go to Inventory
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
