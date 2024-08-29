import React, { useState, useEffect } from 'react';
import './Player.css';

const Player = ({ onPrevious, onPlayPause, onNext, isPlaying, currentSong, progress, onSeek, duration }) => {
    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        setCurrentTime((progress / 100) * duration);
    }, [progress, duration]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div className="bottom">
            <div className="progress-container">
                <span className="time">{formatTime(currentTime)}</span>
                <input
                    type="range"
                    name="range"
                    id="myProgressBar"
                    min="0"
                    value={progress}
                    max="100"
                    onChange={(e) => onSeek(e.target.value)}
                />
                <span className="time">{formatTime(duration)}</span>
            </div>
            <div className="icons">
                <i className="fas fa-3x fa-step-backward" id="previous" onClick={onPrevious}></i>
                <i className={`far fa-3x ${isPlaying ? 'fa-pause-circle' : 'fa-play-circle'}`} id="masterPlay" onClick={onPlayPause}></i>
                <i className="fas fa-3x fa-step-forward" id="next" onClick={onNext}></i>
            </div>
            <div className="songInfo">
                <img src="/playing.gif" className="gi" width="42px" alt="Playing" id="gif" />
                <span className="hello" id="masterSongName">{currentSong}</span>
            </div>
        </div>
    );
};

export default Player;
