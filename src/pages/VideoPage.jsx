import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { mockVideos, mockComments } from '../utils/mockData';
import VideoCard from '../components/VideoCard';

const VideoPage = () => {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [showDescription, setShowDescription] = useState(false);

  useEffect(() => {
    // In a real app, we would fetch the video data from an API
    // For this demo, we'll use mock data
    try {
      const foundVideo = mockVideos.find(v => v.id === videoId);
      if (foundVideo) {
        setVideo(foundVideo);
        // Filter out the current video from related videos
        setRelatedVideos(mockVideos.filter(v => v.id !== videoId));
        setComments(mockComments);
      } else {
        setError('Video not found');
      }
      setLoading(false);
    } catch (err) {
      setError('Failed to load video');
      setLoading(false);
    }
  }, [videoId]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    // In a real app, we would send this to an API
    const newComment = {
      id: `comment-${Date.now()}`,
      text: commentText,
      author: 'Current User',
      authorAvatar: 'https://ui-avatars.com/api/?name=Current+User&background=random',
      publishedAt: new Date().toISOString(),
      likeCount: 0,
    };

    setComments([newComment, ...comments]);
    setCommentText('');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 dark:border-white"></div>
      </div>
    );
  }

  if (error || !video) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="text-red-500 text-center">
          <p className="text-xl">{error || 'Video not found'}</p>
          <button 
            onClick={() => window.history.back()} 
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main content */}
        <div className="lg:w-2/3">
          {/* Video player */}
          <div className="relative pt-[56.25%] bg-black rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <img 
                src={video.thumbnail} 
                alt={video.title} 
                className="w-full h-full object-contain"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="bg-red-600 text-white rounded-full p-4 hover:bg-red-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Video info */}
          <div className="mt-4">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">{video.title}</h1>
            <div className="flex flex-wrap items-center justify-between mt-2">
              <div className="flex items-center">
                <img 
                  src={video.channelAvatar} 
                  alt={video.channelTitle} 
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{video.channelTitle}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">1.2M subscribers</p>
                </div>
                <button className="ml-4 px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700">
                  Subscribe
                </button>
              </div>
              <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                <button className="flex items-center space-x-1 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                  <span>{video.likeCount}</span>
                </button>
                <button className="flex items-center space-x-1 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2" />
                  </svg>
                  <span>Dislike</span>
                </button>
                <button className="flex items-center space-x-1 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>

          {/* Video description */}
          <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
              <span>{video.viewCount} views</span>
              <span className="mx-2">•</span>
              <span>{new Date(video.publishedAt).toLocaleDateString()}</span>
            </div>
            <div className={`${showDescription ? '' : 'line-clamp-2'} text-gray-800 dark:text-gray-200`}>
              <p>{video.description || 'No description available for this video.'}</p>
            </div>
            <button 
              onClick={() => setShowDescription(!showDescription)}
              className="mt-2 text-blue-600 dark:text-blue-400 font-medium"
            >
              {showDescription ? 'Show less' : 'Show more'}
            </button>
          </div>

          {/* Comments section */}
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{comments.length} Comments</h3>
            
            {/* Comment form */}
            <div className="flex space-x-3 mb-6">
              <img 
                src="https://ui-avatars.com/api/?name=Current+User&background=random" 
                alt="Your avatar" 
                className="w-10 h-10 rounded-full"
              />
              <form onSubmit={handleCommentSubmit} className="flex-1">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="w-full px-3 py-2 border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500 bg-transparent text-gray-900 dark:text-white"
                />
                <div className="flex justify-end mt-2 space-x-2">
                  <button 
                    type="button" 
                    onClick={() => setCommentText('')}
                    className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={!commentText.trim()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Comment
                  </button>
                </div>
              </form>
            </div>

            {/* Comments list */}
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="flex space-x-3">
                  <img 
                    src={comment.authorAvatar} 
                    alt={comment.author} 
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <div className="flex items-center">
                      <h4 className="font-medium text-gray-900 dark:text-white">{comment.author}</h4>
                      <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">{new Date(comment.publishedAt).toLocaleDateString()}</span>
                    </div>
                    <p className="mt-1 text-gray-800 dark:text-gray-200">{comment.text}</p>
                    <div className="flex items-center mt-1 space-x-4">
                      <button className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                        </svg>
                        <span>{comment.likeCount}</span>
                      </button>
                      <button className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2" />
                        </svg>
                      </button>
                      <button className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar - Related videos */}
        <div className="lg:w-1/3 mt-6 lg:mt-0">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Related Videos</h3>
          <div className="space-y-4">
            {relatedVideos.slice(0, 8).map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPage;