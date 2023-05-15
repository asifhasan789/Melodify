import React from 'react'
import {Button} from '@mui/material';
import PlayPause from './PlayPause'
import { ethers } from "ethers";
import HeadsetIcon from "@material-ui/icons/Headset";
import SongBar from './SongBar';

const SongCard = ({ song, marketItems, currentSong, setCurrentSong, setIsPlaying, isPlaying, buyMarketItem}) => {
  const handleSongClick = (song) => {
    if (currentSong && currentSong.itemId === song.itemId) {
      if (isPlaying) {
        handlePause(song);
      } else {
        handlePlay(song);
      }
    } else {
      if (currentSong && currentSong.audioRef) {
        handlePause(currentSong);
      }
      handlePlay(song);
    }
  }

  const handlePlay = (songs) => {
    songs.audioRef.play();
    songs.audioRef.currentTime = 0;
    setIsPlaying(true);
    setCurrentSong(songs);
  };
  
  const handlePause = (songs) => {
    songs.audioRef.pause();
    setIsPlaying(false);
  };
  
  return (
    <>
    <div className='flex flex-col max-[640px]:w-[275px]:p-2 w-[300px] p-4 bg-[#7348ac7d] bg-opacity-80 backdrop-blur-sm rounded-lg cursor-pointer'>
        <div className='relative w-full h-64 group'>
        <audio src={song.audio} ref={(ref) => (song.audioRef = ref)}></audio>
        <span onClick={() => handleSongClick(song)}>
            <div className={`absolute inset-0 h-[15rem] justify-center items-center bg-black bg-opacity-50 group-hover:flex ${currentSong?.name === song.name ? 'flex bg-black bg-opacity-70' : 'hidden'}`}>
              <PlayPause isPlaying={isPlaying} currentSong={currentSong} song={song} handlePause={handlePause} handlePlay={handlePlay}/>
            </div>
            <img src={song.image} className='truncate h-60 w-[24rem]' alt="song_img" />
        </span>
        </div>
        <div className="mt-4 flex flex-col pb-2">
          <p className="font-semibold text-lg text-white truncate my-auto">
            <HeadsetIcon /> {song.name}
          </p>
        </div>
        <div className="d-grid my-1">
          <Button onClick={() => {buyMarketItem(song)}} variant='contained' color='success' className='p-0 py-3' size="lg">
            {`Buy for ${ethers.utils.formatEther(song.price)} ETH`} 
          </Button>
        </div>
    </div>
    {currentSong?.name === song.name && (
      <div className="fixed md:absolute h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10">
        <SongBar marketItems={marketItems} currentSong={currentSong} setCurrentSong={setCurrentSong} handlePause={handlePause} handlePlay={handlePlay} setIsPlaying={setIsPlaying} isPlaying={isPlaying}/>
      </div>
    )}
    </>
  )
}

export default SongCard;
