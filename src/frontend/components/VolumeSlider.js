import React from 'react';
import { BsFillVolumeUpFill, BsVolumeDownFill, BsFillVolumeMuteFill } from 'react-icons/bs';

const VolumeBar = ({ value, currentSong, min, max, setVolume }) => {
  
  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
    if (currentSong && currentSong.audioRef) {
      currentSong.audioRef.volume = event.target.value;
    }
  }
  const handleMaxVolumeClick = () => {
    setVolume(min);
    if (currentSong && currentSong.audioRef) {
      currentSong.audioRef.volume = min;
    }
  }
  const HandleMute = () => {
    setVolume(max);
    if (currentSong && currentSong.audioRef) {
      currentSong.audioRef.volume = max;
    }
  }
  return (
    <div className="hidden lg:flex flex-1 items-center justify-end">
      {value > 0.5 && <BsFillVolumeUpFill size={25} color="#FFF" onClick={handleMaxVolumeClick} />}
      {value > 0 && value <= 0.5 && <BsVolumeDownFill size={25} color="#FFF" onClick={handleMaxVolumeClick}/>}
      {value <= 0.000000001 && <BsFillVolumeMuteFill size={25} color="#FFF" onClick={HandleMute}/>}
      <input type="range" step="any" value={value} min={min} max={max} onChange={handleVolumeChange} className="2xl:w-40 lg:w-32 md:w-32 h-1 ml-2"/>
    </div>
  );
};

export default VolumeBar;
