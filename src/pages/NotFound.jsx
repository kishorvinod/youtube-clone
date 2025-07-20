import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full py-16">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mt-6">404</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400 mt-2">Page Not Found</p>
      <p className="text-gray-600 dark:text-gray-400 mt-4 text-center max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link 
        to="/" 
        className="mt-8 px-6 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;