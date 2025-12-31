import React, { useState, useRef, useEffect } from 'react';
import { Music, PauseCircle, PlayCircle, Volume2, VolumeX } from 'lucide-react';

const BackgroundMusic: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Attempt to play automatically on mount, but handle browser autoplay policies
        const playAudio = async () => {
            if (audioRef.current) {
                try {
                    audioRef.current.volume = 0.3; // Set default volume to 30%
                    await audioRef.current.play();
                    setIsPlaying(true);
                } catch (error) {
                    console.log("Autoplay blocked, user interaction required:", error);
                    setIsPlaying(false);
                }
            }
        };

        playAudio();
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

    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    return (
        <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-black/30 backdrop-blur-md p-2 rounded-full border border-white/10 transition-all hover:bg-black/50">
            <audio
                ref={audioRef}
                src="/assets/now start.mp3"
                loop
            />

            <button
                onClick={togglePlay}
                className="p-2 rounded-full hover:bg-white/10 transition-colors text-white"
                aria-label={isPlaying ? "Pause music" : "Play music"}
            >
                {isPlaying ? <PauseCircle size={24} /> : <PlayCircle size={24} />}
            </button>

            <button
                onClick={toggleMute}
                className="p-2 rounded-full hover:bg-white/10 transition-colors text-white"
                aria-label={isMuted ? "Unmute" : "Mute"}
            >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
        </div>
    );
};

export default BackgroundMusic;
