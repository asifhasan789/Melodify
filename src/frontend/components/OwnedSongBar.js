import React, { useState, useEffect } from 'react';
import { Slider } from '@mui/material';
import { BsArrowRepeat, BsFillPauseFill, BsFillPlayFill, BsShuffle } from 'react-icons/bs';
import { MdSkipNext, MdSkipPrevious } from 'react-icons/md';
import VolumeSlider from './VolumeSlider'

const SongBar = ({ currentSong, setCurrentSong, myTokens, isPlaying, handlePause, handlePlay, setIsPlaying}) => {
  const [volume, setVolume] = useState(50);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const handleSkipPrevious = () => {
    if (!currentSong || !myTokens) return;
    
    currentSong.audioRef.pause();
    const currentIndex = myTokens.findIndex((song) => song.itemId === currentSong.itemId);
    const previousIndex = currentIndex > 0 ? currentIndex - 1 : myTokens.length - 1;
    const previousSong = myTokens[previousIndex];
    previousSong.audioRef.currentTime = 0;
    previousSong.audioRef.play();
    setIsPlaying(true);
    setCurrentSong(previousSong);
  };
  const handleSkipNext = () => {
    if (!currentSong || !myTokens) return;
    
    currentSong.audioRef.pause();
    const currentIndex = myTokens.findIndex((song) => song.itemId === currentSong.itemId);
    const nextIndex = currentIndex < myTokens.length-1 ? currentIndex + 1 : 0;
    const nextSong = myTokens[nextIndex];
    nextSong.audioRef.currentTime = 0;
    nextSong.audioRef.play();
    setIsPlaying(true);
    setCurrentSong(nextSong);
  };

  function formatTime(time) {
    const minutes = Math.floor(time / 60).toString().padStart(1, '0');
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  }

  const handleShuffle = () => {
    myTokens.sort(() => Math.random()-0.5);
  }
  
  const handleRepeat = () => {
    if(isPlaying) {
      setIsPlaying(false);
      currentSong.audioRef.pause();
    }
    const resetSong = myTokens[0];
    setIsPlaying(true);
    setCurrentSong(resetSong);
    resetSong.audioRef.currentTime = 0;
    resetSong.audioRef.play();
  }

  useEffect(() => {
    const updateCurrentTime = () => {
      setCurrentTime(currentSong.audioRef.currentTime);
    };
      const intervalId = setInterval(updateCurrentTime, 50);
    return () => {
      clearInterval(intervalId);
    };
  }, [currentSong]);

  useEffect(() => {
    setDuration(currentSong.audioRef.duration);
    setCurrentTime(currentSong.audioRef.currentTime);
  },[currentSong]);

  useEffect(() => {
    if (currentTime >= duration && duration!==0) {
      setIsPlaying(false);
      currentSong.audioRef.pause();
    }
  },[currentTime, setIsPlaying, duration, currentSong]);  

    return (
      <div className="relative sm:px-12 px-8 w-full flex items-center justify-between">
        <div className='flex-1 flex items-center justify-start'>
          <div className={`${isPlaying && currentSong ? 'animate-[spin_3s_linear_infinite]' : ''} hidden sm:block h-16 w-16 mr-4`}>
            <img src={currentSong.image} alt="cover art" className="rounded-[100px] w-full h-full" />
          </div>
          <div className="w-[50%]">
            <p className="truncate text-white font-bold text-lg">
                {currentSong?.name ? currentSong?.name : 'No active Song'}
            </p>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-centerr">
          {/* controls */}
          <div className="flex items-center justify-around md:w-36 lg:w-52 2xl:w-80">
              <BsShuffle size={20} color='#FFF' className="hidden sm:block cursor-pointer" onClick={handleShuffle}/>
              <MdSkipPrevious size={30} color="#FFF" className="cursor-pointer"  onClick={handleSkipPrevious}/>
            {isPlaying ? (
                <BsFillPauseFill size={45} color="#FFF" onClick={() => {handlePause(currentSong)}}/>
            ) : (
                <BsFillPlayFill size={45} color="#FFF" PlayArrowIcon onClick={() => {handlePlay(currentSong)}}/>
            )}
              <MdSkipNext size={30} color="#FFF" onClick={handleSkipNext}/>
              <BsArrowRepeat size={20} color="#FFF" className="hidden sm:block cursor-pointer" onClick={handleRepeat}/>
          </div>
          {/* player */}
          <div className="hidden sm:flex w-full flex-row items-center">
            <p className="px-3 text-white">{formatTime(currentTime)}</p>
            <Slider value={currentTime} min={0} max={duration} onChange={(event, value) => { setCurrentTime(value); currentSong.audioRef.currentTime = value;}} aria-labelledby="continuous-slider"/>
            <p className="px-3 text-white">{formatTime(duration)}</p>
          </div>
        </div>
          <VolumeSlider value={volume} currentSong = {currentSong} min="0" max="1" setVolume={setVolume}/>
      </div>
    );
  };
  
  export default SongBar;
  