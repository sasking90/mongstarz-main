import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, FileText } from 'lucide-react';

export const FloatingActionButtons = () => {
    return (
        <div className="fixed right-6 bottom-24 z-50 flex flex-col gap-4 items-center">
            {/* 1:1 Inquiry Button - Bouncing Animation */}
            <motion.a
                href="http://pf.kakao.com/_qxnFyn/chat"
                target="_blank"
                rel="noopener noreferrer"
                className="relative group"
                animate={{ y: [0, -8, 0] }}
                transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut"
                }}
                whileHover={{ scale: 1.1 }}
            >
                <div className="w-14 h-14 rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.15)] border border-violet-100 flex items-center justify-center text-violet-600 hover:text-white hover:bg-violet-600 transition-colors duration-300 relative z-10">
                    <MessageCircle size={24} strokeWidth={2.5} />
                </div>

                {/* Tooltip/Label */}
                <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 px-3 py-1.5 bg-slate-800 text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg">
                    1:1 문의
                    <div className="absolute top-1/2 right-[-4px] -translate-y-1/2 border-t-[4px] border-t-transparent border-l-[4px] border-l-slate-800 border-b-[4px] border-b-transparent"></div>
                </div>
            </motion.a>

            {/* Proposal Button */}
            <motion.div
                onClick={() => window.open('https://mongstarz-intro.vercel.app', '_blank')}
                className="relative group cursor-pointer"
                whileHover={{ scale: 1.1 }}
            >
                <div className="w-14 h-14 rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.15)] border border-fuchsia-100 flex items-center justify-center text-fuchsia-600 hover:text-white hover:bg-fuchsia-600 transition-colors duration-300 relative z-10">
                    <FileText size={24} strokeWidth={2.5} />
                </div>

                {/* Tooltip/Label */}
                <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 px-3 py-1.5 bg-slate-800 text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg">
                    제안서
                    <div className="absolute top-1/2 right-[-4px] -translate-y-1/2 border-t-[4px] border-t-transparent border-l-[4px] border-l-slate-800 border-b-[4px] border-b-transparent"></div>
                </div>
            </motion.div>
        </div>
    );
};
