import React, { useState, useEffect } from 'react';
import './SongItem.css';

const SongItem = ({ song, onPlay }) => {
    const [duration, setDuration] = useState('0:00');

    useEffect(() => {
        const audio = new Audio(song.filePath);
        const handleLoadedMetadata = () => {
            const minutes = Math.floor(audio.duration / 60);
            const seconds = Math.floor(audio.duration % 60);
            setDuration(`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);
        };

        audio.addEventListener('loadedmetadata', handleLoadedMetadata);

        return () => {
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        };
    }, [song.filePath]);

    return (
        <div className="songItem">
            <img src={song.coverPath} alt="cover" />
            <span className="songName">{song.songName}</span>
            <span className="songlistplay">
                <span className="timestamp">
                    {duration}
                    <i id={song.id} className="far songItemPlay fa-play-circle" onClick={() => onPlay(song.id)}></i>
                </span>
            </span>
        </div>
    );
};

export default SongItem;
