import { useState, useEffect } from 'react';
import VideoCard from '../components/VideoCard';
import { mockVideos } from '../utils/mockData';

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // In a real app, we would fetch videos from an API
    // For this demo, we'll use mock data
    try {
      setVideos(mockVideos);
      setLoading(false);
    } catch (err) {
      setError('Failed to load videos');
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 dark:border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="text-red-500 text-center">
          <p className="text-xl">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <div className="flex overflow-x-auto py-4 mb-4 scrollbar-hide">
        {['All', 'Music', 'Gaming', 'News', 'Live', 'Comedy', 'Sports', 'Education', 'Technology', 'Entertainment'].map((category) => (
          <button 
            key={category} 
            className="px-4 py-1.5 mr-2 bg-gray-100 dark:bg-gray-700 rounded-full text-sm font-medium text-gray-800 dark:text-gray-200 whitespace-nowrap hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default Home;