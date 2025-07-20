import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import VideoCard from '../components/VideoCard';
import { mockVideos } from '../utils/mockData';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // In a real app, we would fetch search results from an API
    // For this demo, we'll filter the mock data
    try {
      setLoading(true);
      // Simple search implementation - case insensitive partial match on title or channel
      const filteredVideos = query
        ? mockVideos.filter(video => 
            video.title.toLowerCase().includes(query.toLowerCase()) ||
            video.channelTitle.toLowerCase().includes(query.toLowerCase())
          )
        : [];
      
      setResults(filteredVideos);
      setLoading(false);
    } catch (err) {
      setError('Failed to load search results');
      setLoading(false);
    }
  }, [query]);

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
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
        {results.length > 0 
          ? `Search results for "${query}"` 
          : `No results found for "${query}"`
        }
      </h1>

      {results.length > 0 ? (
        <div className="space-y-6">
          {results.map((video) => (
            <div key={video.id} className="flex flex-col sm:flex-row gap-4">
              <div className="sm:w-64 flex-shrink-0">
                <img 
                  src={video.thumbnail} 
                  alt={video.title} 
                  className="w-full h-auto rounded-lg object-cover aspect-video"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {video.title}
                </h3>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-1">
                  <span>{video.viewCount} views</span>
                  <span className="mx-1">•</span>
                  <span>{new Date(video.publishedAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center mt-2">
                  <img 
                    src={video.channelAvatar} 
                    alt={video.channelTitle} 
                    className="w-6 h-6 rounded-full mr-2"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {video.channelTitle}
                  </span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mt-2 line-clamp-2">
                  {video.description || 'No description available.'}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Try searching for something else or check out the trending videos.
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchResults;