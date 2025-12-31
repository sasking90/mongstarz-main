import React, { useState, useRef, useEffect } from 'react';
import { Music, Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const BackgroundMusic: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        const playAudio = async () => {
            if (audioRef.current) {
                try {
                    audioRef.current.volume = 0.5;
                    await audioRef.current.play();
                    setIsPlaying(true);
                } catch (error) {
                    console.log("Autoplay blocked, waiting for user interaction");
                    setIsPlaying(false);
                }
            }
        };

        // Try to play immediately
        playAudio();

        // Also try to play on first click anywhere if blocked
        const handleFirstClick = () => {
            if (audioRef.current && audioRef.current.paused) {
                playAudio();
            }
            document.removeEventListener('click', handleFirstClick);
        };

        document.addEventListener('click', handleFirstClick);

        return () => {
            document.removeEventListener('click', handleFirstClick);
        };
    }, []);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div className="fixed right-6 bottom-[140px] z-50 flex flex-col items-center gap-2">
            <audio
                ref={audioRef}
                src="/assets/now start.mp3"
                loop
            />

            <motion.button
                onClick={togglePlay}
                className="relative group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                {/* Rotating Glow Effect when playing */}
                {isPlaying && (
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                        className="absolute inset-0 rounded-full bg-gradient-to-tr from-violet-500 to-fuchsia-500 blur-md opacity-70"
                    />
                )}

                <div className={`w-11 h-11 rounded-full backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.15)] border flex items-center justify-center transition-all duration-300 relative z-10 ${isPlaying
                        ? 'bg-gradient-to-br from-violet-500 to-fuchsia-600 border-transparent text-white'
                        : 'bg-white/70 border-slate-200 text-slate-400 hover:text-violet-500 hover:border-violet-200'
                    }`}>
                    {isPlaying ? (
                        <div className="flex gap-0.5 items-end h-4">
                            <motion.div animate={{ height: [4, 12, 6, 16, 8] }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-1 bg-white rounded-full" />
                            <motion.div animate={{ height: [8, 4, 16, 6, 12] }} transition={{ repeat: Infinity, duration: 0.5, delay: 0.1 }} className="w-1 bg-white rounded-full" />
                            <motion.div animate={{ height: [6, 16, 8, 4, 12] }} transition={{ repeat: Infinity, duration: 0.5, delay: 0.2 }} className="w-1 bg-white rounded-full" />
                        </div>
                    ) : (
                        <Play size={20} className="ml-1" fill="currentColor" />
                    )}
                </div>

                {/* Tooltip */}
                <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 px-3 py-1.5 bg-slate-800 text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg">
                    {isPlaying ? '음악 끄기' : '음악 켜기'}
                    <div className="absolute top-1/2 right-[-4px] -translate-y-1/2 border-t-[4px] border-t-transparent border-l-[4px] border-l-slate-800 border-b-[4px] border-b-transparent"></div>
                </div>
            </motion.button>
        </div>
    );
};

export default BackgroundMusic;
