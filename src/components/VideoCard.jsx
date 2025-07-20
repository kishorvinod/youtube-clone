import { Link } from 'react-router-dom';

const VideoCard = ({ video }) => {
  const {
    id,
    thumbnail,
    title,
    channelTitle,
    channelAvatar,
    publishedAt,
    viewCount
  } = video;

  // Format view count
  const formatViewCount = (count) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M views`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K views`;
    }
    return `${count} views`;
  };

  // Format published date
  const formatPublishedDate = (date) => {
    const now = new Date();
    const publishedDate = new Date(date);
    const diffTime = Math.abs(now - publishedDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      return '1 day ago';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `${months} ${months === 1 ? 'month' : 'months'} ago`;
    } else {
      const years = Math.floor(diffDays / 365);
      return `${years} ${years === 1 ? 'year' : 'years'} ago`;
    }
  };

  return (
    <div className="flex flex-col">
      <Link to={`/video/${id}`} className="relative">
        <img 
          src={thumbnail} 
          alt={title} 
          className="w-full h-auto rounded-lg object-cover aspect-video hover:rounded-none transition-all duration-300"
        />
        <span className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-1 rounded">10:30</span>
      </Link>
      <div className="flex mt-3 space-x-3">
        <Link to={`/channel/${channelTitle}`} className="flex-shrink-0">
          <img 
            src={channelAvatar} 
            alt={channelTitle} 
            className="w-9 h-9 rounded-full"
          />
        </Link>
        <div className="flex flex-col">
          <Link to={`/video/${id}`} className="font-medium text-gray-900 dark:text-white line-clamp-2 hover:underline">
            {title}
          </Link>
          <Link to={`/channel/${channelTitle}`} className="text-sm text-gray-600 dark:text-gray-400 mt-1 hover:text-gray-900 dark:hover:text-white">
            {channelTitle}
          </Link>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {formatViewCount(viewCount)} • {formatPublishedDate(publishedAt)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;