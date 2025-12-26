import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, FileText, X } from 'lucide-react';

export const FloatingActionButtons = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
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
                    onClick={() => setIsModalOpen(true)}
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

            {/* Iframe Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-8 bg-slate-900/60 backdrop-blur-sm"
                        onClick={() => setIsModalOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white w-full max-w-6xl h-[85vh] rounded-3xl shadow-2xl overflow-hidden relative flex flex-col"
                        >
                            {/* Modal Header */}
                            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white z-10">
                                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                    <FileText size={20} className="text-fuchsia-500" />
                                    제안서 보기
                                </h3>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500 hover:text-slate-800"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Iframe Content */}
                            <div className="flex-1 bg-slate-50 relative">
                                <iframe
                                    src="https://mongstarz-intro.vercel.app"
                                    className="w-full h-full border-0"
                                    title="Mongstarz Proposal"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
