
import React from "react";

interface MobileFrameProps {
  children: React.ReactNode;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({ children }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-slate-100 to-slate-200 p-4">
      <div className="w-full max-w-[390px] h-[844px] bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-200 relative">
        <div className="absolute top-0 left-0 right-0 h-6 bg-black rounded-t-3xl"></div>
        <div className="absolute top-6 left-0 right-0 h-14 flex items-center justify-center">
          <div className="w-32 h-6 bg-black rounded-full"></div>
        </div>
        <div className="pt-20 pb-8 px-4 h-full overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};
