'use client';

import React, { createContext, useContext, useState, useRef, useEffect, useCallback, ReactNode } from 'react';

// 音乐播放列表
const playlist = [
    { title: '青花瓷 - 周杰伦', src: '/music/周杰伦 - 青花瓷.mp3' },
    { title: '起风了 - 买辣椒也用券', src: '/music/买辣椒也用券 - 起风了.mp3' },
    { title: '稻香 - 周杰伦', src: '/music/稻香-周杰伦.mp3' },
    { title: '兰亭序 - 周杰伦', src: '/music/周杰伦-兰亭序.mp3' },
    { title: '花雨落 - 任然', src: '/music/任然 - 花雨落.mp3' },
    { title: '冬眠 - 司南', src: '/music/司南 - 冬眠.mp3' },
    { title: '消愁 - 木头', src: '/music/木头 - 消愁（Cover 毛不易）.mp3' },
    { title: '指纹 - 杜宣达', src: '/music/杜宣达 - 指纹.mp3' },
];

interface MusicContextType {
    isPlaying: boolean;
    currentSong: string;
    currentIndex: number;
    volume: number;
    togglePlay: () => void;
    nextSong: () => void;
    prevSong: () => void;
    setVolume: (v: number) => void;
}

const MusicContext = createContext<MusicContextType | null>(null);

export function useMusicPlayer() {
    const context = useContext(MusicContext);
    if (!context) {
        throw new Error('useMusicPlayer must be used within MusicProvider');
    }
    return context;
}

interface MusicProviderProps {
    children: ReactNode;
}

export function MusicProvider({ children }: MusicProviderProps) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [volume, setVolumeState] = useState(0.5);
    const [isInitialized, setIsInitialized] = useState(false);

    // 初始化音频元素
    useEffect(() => {
        if (typeof window !== 'undefined' && !audioRef.current) {
            audioRef.current = new Audio();
            audioRef.current.volume = volume;
            audioRef.current.src = playlist[0].src;

            // 当歌曲结束时自动播放下一首
            audioRef.current.addEventListener('ended', () => {
                setCurrentIndex(prev => (prev + 1) % playlist.length);
            });

            setIsInitialized(true);
        }
    }, []);

    // 更新音频源
    useEffect(() => {
        if (audioRef.current && isInitialized) {
            const wasPlaying = isPlaying;
            audioRef.current.src = playlist[currentIndex].src;
            if (wasPlaying) {
                audioRef.current.play().catch(console.error);
            }
        }
    }, [currentIndex, isInitialized]);

    // 更新音量
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    const togglePlay = useCallback(() => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play().then(() => {
                setIsPlaying(true);
            }).catch(console.error);
        }
    }, [isPlaying]);

    const nextSong = useCallback(() => {
        setCurrentIndex(prev => (prev + 1) % playlist.length);
    }, []);

    const prevSong = useCallback(() => {
        setCurrentIndex(prev => (prev - 1 + playlist.length) % playlist.length);
    }, []);

    const setVolume = useCallback((v: number) => {
        setVolumeState(Math.max(0, Math.min(1, v)));
    }, []);

    return (
        <MusicContext.Provider
            value={{
                isPlaying,
                currentSong: playlist[currentIndex].title,
                currentIndex,
                volume,
                togglePlay,
                nextSong,
                prevSong,
                setVolume,
            }}
        >
            {children}
        </MusicContext.Provider>
    );
}
