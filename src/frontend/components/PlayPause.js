import React from 'react';
import { Button } from '@mui/material';
import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';

const PlayPause = ({ isPlaying, currentSong, song, handlePause, handlePlay }) => {
  const handleButtonClick = () => {
    if (isPlaying) {
      handlePause(currentSong);
    } else {
      handlePlay(currentSong);
    }
  };

  if (currentSong?.name !== song.name) {
    return (
        <FaPlayCircle size={35} className='text-gray-300' onClick={handleButtonClick}/>
    );
  }

  return (
    <Button onClick={handleButtonClick}>
      {isPlaying ? <FaPauseCircle size={35} className='text-gray-300' /> : <FaPlayCircle size={35} className='text-gray-300' />}
    </Button>
  );
};

export default PlayPause;
