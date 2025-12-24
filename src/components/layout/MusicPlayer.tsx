'use client';

import { useMusicPlayer } from '@/contexts/MusicContext';

export default function MusicPlayer() {
    const { isPlaying, currentSong, togglePlay, nextSong, prevSong } = useMusicPlayer();

    return (
        <div id="music-player-container">
            {/* 唱片 */}
            <div
                className={`music-disc ${isPlaying ? 'playing' : 'waiting-to-play'}`}
                onClick={togglePlay}
                title={isPlaying ? '暂停' : '播放'}
            />

            {/* 控制条 */}
            <div className="music-controls">
                <button className="control-btn" onClick={prevSong} title="上一首">
                    <i className="fa fa-step-backward"></i>
                </button>
                <button className="control-btn" onClick={togglePlay} title={isPlaying ? '暂停' : '播放'}>
                    <i className={`fa ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
                </button>
                <button className="control-btn" onClick={nextSong} title="下一首">
                    <i className="fa fa-step-forward"></i>
                </button>
                <span className="song-info">{currentSong}</span>
            </div>
        </div>
    );
}
