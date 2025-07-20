import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen }) => {
  const categories = [
    { name: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', path: '/' },
    { name: 'Trending', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6', path: '/trending' },
    { name: 'Subscriptions', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10', path: '/subscriptions' },
  ];

  const secondaryLinks = [
    { name: 'Library', icon: 'M4 6h16M4 10h16M4 14h16M4 18h16', path: '/library' },
    { name: 'History', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', path: '/history' },
    { name: 'Your Videos', icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z', path: '/your-videos' },
    { name: 'Watch Later', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', path: '/playlist?list=WL' },
    { name: 'Liked Videos', icon: 'M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5', path: '/playlist?list=LL' },
  ];

  const subscriptions = [
    { name: 'Music', icon: '🎵', path: '/channel/music' },
    { name: 'Sports', icon: '⚽', path: '/channel/sports' },
    { name: 'Gaming', icon: '🎮', path: '/channel/gaming' },
    { name: 'News', icon: '📰', path: '/channel/news' },
    { name: 'Learning', icon: '📚', path: '/channel/learning' },
  ];

  // If sidebar is closed on mobile, don't render it
  if (!isOpen) {
    return null;
  }

  return (
    <aside className={`fixed md:sticky top-14 left-0 h-[calc(100vh-3.5rem)] w-64 bg-white dark:bg-gray-800 overflow-y-auto transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} z-10 md:z-0`}>
      <nav className="p-3">
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category.name}>
              <Link 
                to={category.path} 
                className="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={category.icon} />
                </svg>
                <span className="ml-3 text-gray-700 dark:text-gray-200">{category.name}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="my-4 border-t border-gray-200 dark:border-gray-700"></div>

        <ul className="space-y-2">
          {secondaryLinks.map((link) => (
            <li key={link.name}>
              <Link 
                to={link.path} 
                className="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={link.icon} />
                </svg>
                <span className="ml-3 text-gray-700 dark:text-gray-200">{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="my-4 border-t border-gray-200 dark:border-gray-700"></div>

        <h3 className="px-3 text-sm font-medium text-gray-500 dark:text-gray-400 uppercase">Subscriptions</h3>
        <ul className="mt-2 space-y-2">
          {subscriptions.map((subscription) => (
            <li key={subscription.name}>
              <Link 
                to={subscription.path} 
                className="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span className="flex items-center justify-center h-6 w-6 text-lg">{subscription.icon}</span>
                <span className="ml-3 text-gray-700 dark:text-gray-200">{subscription.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;