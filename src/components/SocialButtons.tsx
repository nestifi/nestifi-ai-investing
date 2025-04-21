
import React from "react";
import { Button } from "@/components/ui/button";

interface SocialButtonsProps {
  onGoogleClick: () => void;
  onAppleClick: () => void;
}

export const SocialButtons: React.FC<SocialButtonsProps> = ({ onGoogleClick, onAppleClick }) => {
  return (
    <div className="space-y-3">
      <Button 
        variant="outline" 
        className="w-full h-12 flex items-center justify-center gap-2" 
        onClick={onGoogleClick}
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
          <path d="M1 1h22v22H1z" fill="none" />
        </svg>
        Continue with Google
      </Button>
      <Button 
        variant="outline" 
        className="w-full h-12 flex items-center justify-center gap-2" 
        onClick={onAppleClick}
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M14.94 5.19A4.38 4.38 0 0 0 16 2.5a4.38 4.38 0 0 0-3 1.52 4.08 4.08 0 0 0-1 2.95 3.57 3.57 0 0 0 2.94-1.78Zm2.52 7.44a4.51 4.51 0 0 1 2.16-3.81 4.66 4.66 0 0 0-3.66-2c-1.56-.16-3 .91-3.83.91-.83 0-2-.89-3.3-.87a4.92 4.92 0 0 0-4.14 2.53C1.37 13.22 4.23 19.2 6.34 22c1.08 1.52 2.35 3.22 4 3.15 1.63-.07 2.25-1 4.23-1s2.54 1 4.28.95 2.9-1.59 4-3.12a13.23 13.23 0 0 0 1.82-3.73 4.5 4.5 0 0 1-2.72-4.13Z" />
        </svg>
        Continue with Apple
      </Button>
    </div>
  );
};
