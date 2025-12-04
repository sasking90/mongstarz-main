import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
       <div className="relative flex items-center group cursor-pointer">
            <h1 className="text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-500 drop-shadow-sm transition-all duration-300 group-hover:brightness-110">
                MONGSTARZ
            </h1>
            <span className="absolute -top-3 -right-11 text-[10px] font-extrabold bg-gradient-to-r from-amber-400 to-orange-500 text-white px-2 py-0.5 rounded-full transform rotate-6 shadow-md border border-white/20 animate-pulse">
                GIFT
            </span>
       </div>
    </div>
  );
};