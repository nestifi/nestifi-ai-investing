
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, User } from 'lucide-react';

const BottomNavbar: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;
  
  const isActive = (route: string) => {
    if (route === '/learn' && path.startsWith('/learn')) return true;
    return path === route;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 flex justify-around items-center px-4 sm:px-6">
      <Link 
        to="/" 
        className={`flex flex-col items-center text-xs ${isActive('/') ? 'text-primary' : 'text-gray-500'}`}
      >
        <Home className="h-5 w-5 mb-1" />
        <span>Home</span>
      </Link>
      
      <Link 
        to="/learn" 
        className={`flex flex-col items-center text-xs ${isActive('/learn') ? 'text-primary' : 'text-gray-500'}`}
      >
        <BookOpen className="h-5 w-5 mb-1" />
        <span>Learn</span>
      </Link>
      
      <Link 
        to="/rewards" 
        className={`flex flex-col items-center text-xs ${isActive('/rewards') ? 'text-primary' : 'text-gray-500'}`}
      >
        <User className="h-5 w-5 mb-1" />
        <span>Profile</span>
      </Link>
    </div>
  );
};

export default BottomNavbar;
