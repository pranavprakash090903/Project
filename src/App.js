import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import SongList from './components/SongList';
import Player from './components/Player';

const App = () => {
    const [songs] = useState([
        { id: 0, songName: "World Cup 2011", filePath: "assets/songs/1.mp3", coverPath: "assets/covers/1.png" },
        { id: 1, songName: "Dwayne John Barvo", filePath: "assets/songs/2.mp3", coverPath: "assets/covers/2.png" },
        { id: 2, songName: "World cup 2015", filePath: "assets/songs/3.mp3", coverPath: "assets/covers/3.png" },
        { id: 3, songName: "Chak de India", filePath: "assets/songs/4.mp3", coverPath: "assets/covers/4.png" },
        { id: 4, songName: "Indian Premier League", filePath: "assets/songs/5.mp3", coverPath: "assets/covers/5.png" },
        { id: 5, songName: "Sachin-A Billion dreams", filePath: "assets/songs/6.mp3", coverPath: "assets/covers/6.png" },
        { id: 6, songName: "Ms Dhoni-Untold story", filePath: "assets/songs/7.mp3", coverPath: "assets/covers/7.png" },
        { id: 7, songName: "Duniya hila denge", filePath: "assets/songs/8.mp3", coverPath: "assets/covers/8.png" },
        { id: 8, songName: "Kolkata Knight Riders", filePath: "assets/songs/9.mp3", coverPath: "assets/covers/9.png" },
        { id: 9, songName: "Parwah Nahi", filePath: "assets/songs/10.mp3", coverPath: "assets/covers/10.png" }
    ]);

    const [currentSongIndex, setCurrentSongIndex] = useState(() => {
        const savedSongIndex = localStorage.getItem('currentSongIndex');
        return savedSongIndex !== null ? parseInt(savedSongIndex, 10) : 0;
    });
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(songs[currentSongIndex].duration);
    const audioRef = useRef(new Audio(songs[currentSongIndex].filePath));

    useEffect(() => {
        const audioElement = audioRef.current;

        const handleTimeUpdate = () => {
            setProgress((audioElement.currentTime / audioElement.duration) * 100);
        };

        const handleLoadedMetadata = () => {
            setDuration(audioElement.duration);
        };

        audioElement.pause();
        audioElement.src = songs[currentSongIndex].filePath;
        audioElement.load();

        if (isPlaying) {
            audioElement.play();
        }

        audioElement.addEventListener('timeupdate', handleTimeUpdate);
        audioElement.addEventListener('loadedmetadata', handleLoadedMetadata);

        return () => {
            audioElement.removeEventListener('timeupdate', handleTimeUpdate);
            audioElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
        };
    }, [currentSongIndex, isPlaying, songs]);

    const playPauseHandler = () => {
        setIsPlaying(!isPlaying);
    };

    const nextSongHandler = () => {
        setCurrentSongIndex((currentSongIndex + 1) % songs.length);
        localStorage.setItem('currentSongIndex', (currentSongIndex + 1) % songs.length);
    };

    const previousSongHandler = () => {
        setCurrentSongIndex((currentSongIndex - 1 + songs.length) % songs.length);
        localStorage.setItem('currentSongIndex', (currentSongIndex - 1 + songs.length) % songs.length);
    };

    const playSongHandler = (index) => {
        setCurrentSongIndex(index);
        setIsPlaying(true);
        localStorage.setItem('currentSongIndex', index);
    };

    useEffect(() => {
        const audioElement = audioRef.current;
        if (isPlaying) {
            audioElement.play();
        } else {
            audioElement.pause();
        }
    }, [isPlaying]);

    const handleSeek = (value) => {
        const audioElement = audioRef.current;
        audioElement.currentTime = (value / 100) * audioElement.duration;
        setProgress(value);
    };

    return (
        <div className="App">
            <NavBar currentSong={songs[currentSongIndex].songName} currentCoverPath={songs[currentSongIndex].coverPath} />
            <div className="container">
                <SongList songs={songs} onPlay={playSongHandler} />
                <div className="songBanner"></div>
            </div>
            <Player
                onPrevious={previousSongHandler}
                onPlayPause={playPauseHandler}
                onNext={nextSongHandler}
                isPlaying={isPlaying}
                currentSong={songs[currentSongIndex].songName}
                progress={progress}
                onSeek={handleSeek}
                duration={duration}
            />
        </div>
    );
};

export default App;
