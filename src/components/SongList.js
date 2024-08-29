import React from 'react';
import SongItem from './SongItem';
import './SongList.css';

const SongList = ({ songs, onPlay }) => {
    return (
        <div className="songList">
            <h1>Best of NCS - No Copyright Sounds</h1>
            <div className="songItemContainer">
                {songs.map((song, index) => (
                    <SongItem key={index} song={song} onPlay={() => onPlay(index)} />
                ))}
            </div>
        </div>
    );
};

export default SongList;
