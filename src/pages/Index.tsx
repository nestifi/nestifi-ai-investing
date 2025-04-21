
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Home, BookOpen, User } from 'lucide-react';

const Index: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-center mb-8">NestiFi</h1>
      
      <div className="grid gap-4 w-full max-w-md">
        <Link to="/">
          <Button className="w-full flex justify-between items-center p-6" variant="outline">
            <span>Home Dashboard</span>
            <Home className="h-5 w-5" />
          </Button>
        </Link>
        
        <Link to="/learn">
          <Button className="w-full flex justify-between items-center p-6" variant="outline">
            <span>Learn Financial Topics</span>
            <BookOpen className="h-5 w-5" />
          </Button>
        </Link>
        
        <Link to="/rewards">
          <Button className="w-full flex justify-between items-center p-6" variant="outline">
            <span>Rewards & Profile</span>
            <User className="h-5 w-5" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;
