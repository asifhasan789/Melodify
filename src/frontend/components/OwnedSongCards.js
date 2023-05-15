import React from 'react'
import {Button} from 'react-bootstrap';
import PlayPause from './PlayPause'
import { ethers } from "ethers";
import HeadsetIcon from "@material-ui/icons/Headset";
import OwnedSongBar from './OwnedSongBar';
import {Form, InputGroup} from 'react-bootstrap'
const OwnedSongCards = ({ song, resellPrice, resellId, setResellId, myTokens, setResellPrice, resellItem, currentSong, setCurrentSong, setIsPlaying, isPlaying}) => {
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
            <button onClick={() => handleSongClick(song)}>
                <div className={`absolute inset-0 h-[15rem] justify-center items-center bg-black bg-opacity-50 group-hover:flex ${currentSong?.name === song.name ? 'flex bg-black bg-opacity-70' : 'hidden'}`}>
                <PlayPause isPlaying={isPlaying} currentSong={currentSong} song={song} handlePause={handlePause} handlePlay={handlePlay}/>
                </div>
                <img src={song.image} className='truncate h-60 w-[24rem]' alt="song_img" />
            </button>
        </div>
        <div className="my-2 flex flex-col">
          <p className="font-semibold text-lg text-white truncate my-auto">
            <HeadsetIcon /> {song.name}
          </p>
        </div>
        <div className='text-white'>
        Purchase Price: {" "} 
            <span className='text-amber-300'>
                {ethers.utils.formatEther(song.price)} ETH
            </span>
        </div>
        <InputGroup className="flex flex-row justify-between my-1 p-2">
            <Button onClick={() => resellItem(song)} variant="contained" className='bg-success text-white shadow-[0_0_10px_rgb(130,207,130)] border-white hover:shadow-lg  outline-none' id="button-addon1">
                Resell
            </Button>
            <Form.Control onChange={(e) => { setResellId(song.itemId); setResellPrice(e.target.value);}} size="md" value={resellId === song.itemId ? resellPrice : ""} required type="number" placeholder="Price in ETH"/>
        </InputGroup>
    </div>
    {currentSong?.name === song.name && (
      <div className="fixed md:absolute h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10">
        <OwnedSongBar myTokens={myTokens} currentSong={currentSong} setCurrentSong={setCurrentSong} handlePause={handlePause} handlePlay={handlePlay} setIsPlaying={setIsPlaying} isPlaying={isPlaying}/>
      </div>
    )}
    </>
  )
}

export default OwnedSongCards;
