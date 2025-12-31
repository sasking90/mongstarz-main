import React, { useState, useRef, useEffect } from 'react';
import { Music, Pause, Play, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PLAYLIST = [
    { title: "Now Start", src: "/assets/now start.mp3" },
    { title: "At This Moment", src: "/assets/At this moment mongstarz.mp3" },
    { title: "Rewards Party", src: "/assets/Monstarz Rewards Party.mp3" }
];

const BackgroundMusic: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Initialize random track on mount
    useEffect(() => {
        setCurrentTrackIndex(Math.floor(Math.random() * PLAYLIST.length));
    }, []);

    const playNextTrack = () => {
        let nextIndex;
        do {
            nextIndex = Math.floor(Math.random() * PLAYLIST.length);
        } while (nextIndex === currentTrackIndex && PLAYLIST.length > 1);

        setCurrentTrackIndex(nextIndex);
        // The useEffect below will trigger play
    };

    useEffect(() => {
        const playAudio = async () => {
            if (audioRef.current) {
                try {
                    // Ensure volume is set
                    audioRef.current.volume = 0.5;

                    // Only try to play if we are supposed to be playing OR if it's the initial auto-play attempt
                    // But for track change, we usually want to auto-play
                    await audioRef.current.play();
                    setIsPlaying(true);

                    // Only remove listeners if playback actually succeeded
                    ['click', 'touchstart', 'touchend', 'keydown', 'scroll', 'mousedown', 'mousemove', 'pointerdown', 'pointermove'].forEach(event =>
                        document.removeEventListener(event, handleInteraction)
                    );
                } catch (error) {
                    console.log("Autoplay blocked/failed", error);
                    setIsPlaying(false);
                }
            }
        };

        // Aggressive autoplay fallback
        const handleInteraction = async () => {
            if (audioRef.current) {
                try {
                    await audioRef.current.play();
                    setIsPlaying(true);
                    ['click', 'touchstart', 'touchend', 'keydown', 'scroll', 'mousedown', 'mousemove', 'pointerdown', 'pointermove'].forEach(event =>
                        document.removeEventListener(event, handleInteraction)
                    );
                } catch (error) {
                    console.log("Interaction autoplay failed, retrying");
                }
            }
        };

        // If index changes, we want to play
        playAudio();

        const events = ['click', 'touchstart', 'touchend', 'keydown', 'scroll', 'mousedown', 'mousemove', 'pointerdown', 'pointermove'];
        events.forEach(event => document.addEventListener(event, handleInteraction));

        return () => {
            events.forEach(event => document.removeEventListener(event, handleInteraction));
        };
    }, [currentTrackIndex]);

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
        <div className="fixed right-6 bottom-[168px] z-50 flex flex-col items-center gap-2">
            <audio
                ref={audioRef}
                src={PLAYLIST[currentTrackIndex].src}
                onEnded={playNextTrack}
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
                <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 px-3 py-1.5 bg-slate-800 text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg flex items-center gap-2">
                    <span className="max-w-[100px] truncate">{PLAYLIST[currentTrackIndex].title}</span>
                    <div className="absolute top-1/2 right-[-4px] -translate-y-1/2 border-t-[4px] border-t-transparent border-l-[4px] border-l-slate-800 border-b-[4px] border-b-transparent"></div>
                </div>
            </motion.button>

            {/* Next Track Button (Optional, small) */}
            <motion.button
                onClick={playNextTrack}
                className="absolute -left-8 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/50 hover:bg-white text-slate-500 hover:text-violet-600 shadow-sm opacity-0 group-hover:opacity-100 transition-all pointer-events-none group-hover:pointer-events-auto"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <SkipForward size={14} />
            </motion.button>
        </div>
    );
};

export default BackgroundMusic;
