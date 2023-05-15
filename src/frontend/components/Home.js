import { useState, useEffect } from "react";
import SongCard from "./SongCard";

const Home = ({ contract }) => {
  const [loading, setLoading] = useState(true);
  const [marketItems, setMarketItems] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const loadMarketplaceItems = async () => {
    const results = await contract.getAllUnsoldTokens();
    const marketItems = await Promise.all(
      results.map(async (i) => {
        const uri = await contract.tokenURI(i.tokenId);
        const response = await fetch(uri + ".json");
        const metadata = await response.json();
        let item = {
          price: i.price,
          itemId: i.tokenId,
          name: metadata.name,
          audio: metadata.audio,
          image: metadata.image,
        };
        return item;
      })
    );
    setMarketItems(marketItems);
    setLoading(false);
  };

  const buyMarketItem = async (item) => {
    await (await contract.buyToken(item.itemId, { value: item.price })).wait();
    loadMarketplaceItems();
  };

  useEffect(() => {
    !marketItems && loadMarketplaceItems();
  });

  if (loading)
    return (
      <main style={{ padding: "1rem 0", width: "100%", height: "100vh", color: "white", textAlign: "center",}}>
        <h2 style={{ marginTop: "20%", fontSize: "2rem", fontWeight: "700" }}>
          Loading...
        </h2>
      </main>
    );
        
  return (
  
    <div className="flex flex-col pb-16 sm:pb-52">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mx-auto mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">Discover </h2>
      </div>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8" >
        {marketItems?.map((song, currIndex) => (
          <SongCard song={song} marketItems={marketItems} setIsPlaying={setIsPlaying} setCurrentSong={setCurrentSong} buyMarketItem={buyMarketItem}  key={song.itemId} isPlaying={isPlaying} currentSong = {currentSong} />
        ))}
      </div>
   </div>    
  );
};
export default Home;


// import { useState, useEffect, useRef } from "react";
// import { ethers } from "ethers";
// import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
// import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
// import SkipNextIcon from "@material-ui/icons/SkipNext";
// import ShuffleIcon from "@material-ui/icons/Shuffle";
// import RepeatIcon from "@material-ui/icons/Repeat";
// import VolumeDownIcon from "@material-ui/icons/VolumeDown";
// import { Modal } from "react-bootstrap";
// import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
// import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
// import HeadsetIcon from "@material-ui/icons/Headset";
// import { Card, Button } from "react-bootstrap";
// import VanillaTilt from "vanilla-tilt";
// import { Grid, Slider } from "@material-ui/core";
// // import "../styles/home.css";

// const Home = ({ contract }) => {
//   const audioRef = useRef(null);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);

//   function handleTimeUpdate(event) {
//     setCurrentTime(event.target.currentTime);
//     if (event.target.currentTime >= 20) {
//       audioRef.current.currentTime = 0;
//     }
//     setDuration(event.target.duration);
//   }

//   function formatTime(time) {
//     const minutes = Math.floor(time / 60)
//       .toString()
//       .padStart(2, "0");
//     const seconds = Math.floor(time % 60)
//       .toString()
//       .padStart(2, "0");
//     return `${minutes}:${seconds}`;
//   }

//   const [show, setShow] = useState(false);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   const [volume, setVolume] = useState(50);
//   const [loading, setLoading] = useState(true);
//   const [isPlaying, setIsPlaying] = useState(null);
//   const [currentItemIndex, setCurrentItemIndex] = useState(0);
//   const [marketItems, setMarketItems] = useState(null);

//   const loadMarketplaceItems = async () => {
//     // Get all unsold items/tokens
//     const results = await contract.getAllUnsoldTokens();
//     const marketItems = await Promise.all(
//       results.map(async (i) => {
//         // get uri url from contract
//         const uri = await contract.tokenURI(i.tokenId);
//         // use uri to fetch the nft metadata stored on ipfs
//         const response = await fetch(uri + ".json");
//         const metadata = await response.json();
//         // define item object
//         let item = {
//           price: i.price,
//           itemId: i.tokenId,
//           name: metadata.name,
//           audio: metadata.audio,
//           image: metadata.image,
//         };
//         return item;
//       })
//     );
//     setMarketItems(marketItems);
//     setLoading(false);
//   };
//   const buyMarketItem = async (item) => {
//     await (await contract.buyToken(item.itemId, { value: item.price })).wait();
//     loadMarketplaceItems();
//   };
//   const skipSong = (forwards) => {
//     if (forwards) {
//       setCurrentItemIndex(() => {
//         let index = currentItemIndex;
//         index++;
//         if (index > marketItems.length - 1) {
//           index = 0;
//         }
//         return index;
//       });
//     } else {
//       setCurrentItemIndex(() => {
//         let index = currentItemIndex;
//         index--;
//         if (index < 0) {
//           index = marketItems.length - 1;
//         }
//         return index;
//       });
//     }
//   };
//   const shuffleList = () => {
//     const shuffledList = marketItems.sort(() => Math.random() - 0.5);
//     setMarketItems(shuffledList);
//   };
//   function handleVolumeChange(event, newValue) {
//     setVolume(newValue);
//     // Update actual volume of the song
//     audioRef.current.volume = newValue / 100;
//   }
//   useEffect(() => {
//     if (isPlaying) {
//       audioRef.current.play();
//     } else if (isPlaying !== null) {
//       audioRef.current.pause();
//     }
//   });
//   useEffect(() => {
//     !marketItems && loadMarketplaceItems();
//   });
//   useEffect(() => {
//     const img = document.querySelectorAll("#tilt");
//     VanillaTilt.init(img, {
//       max: 25,
//       speed: 400,
//       glare: true,
//       "max-glare": 0.5,
//     });
//   });

//   if (loading)
//     return (
//       <main
//         style={{
//           padding: "1rem 0",
//           width: "100%",
//           height: "100vh",
//           color: "white",
//           textAlign: "center",
//         }}
//       >
//         <h2 style={{ marginTop: "20%", fontSize: "2rem", fontWeight: "700" }}>
//           Loading...
//         </h2>
//       </main>
//     );

//   return (
//     <div className="container-fluid mt-2">
//       {marketItems.length > 0 ? (
//         <div className="row">
//           <div className="content">
//             <audio
//               src={marketItems[currentItemIndex].audio}
//               onTimeUpdate={handleTimeUpdate}
//               ref={audioRef}
//             ></audio>
//             <Card>
//               {/* <Card.Header>{currentItemIndex + 1} of {marketItems.length}</Card.Header> */}
//               <div className="pic">
//                 <Card.Img
//                   variant="top"
//                   className="picture"
//                   id="tilt"
//                   src={marketItems[currentItemIndex].image}
//                 />
//               </div>
//               <Card.Body className="card_body">
//                 <div className="left">
//                   <Card.Title as="h5" style={{ margin: "0" }}>
//                     {" "}
//                     <HeadsetIcon /> {marketItems[currentItemIndex].name}
//                   </Card.Title>
//                 </div>
//                 <div className="controls">
//                   <div className="controls_btns">
//                     <button className="butn" onClick={shuffleList}>
//                       <ShuffleIcon />
//                     </button>
//                     <button className="butn" onClick={() => skipSong(false)}>
//                       <SkipPreviousIcon />
//                     </button>
//                     <button
//                       className="butn"
//                       onClick={() => setIsPlaying(!isPlaying)}
//                     >
//                       {isPlaying ? (
//                         <PauseCircleOutlineIcon />
//                       ) : (
//                         <PlayCircleOutlineIcon />
//                       )}
//                     </button>
//                     <button className="butn" onClick={() => skipSong(true)}>
//                       <SkipNextIcon />
//                     </button>
//                     <button
//                       className="butn"
//                       onClick={() => {
//                         loadMarketplaceItems();
//                         setCurrentItemIndex(0);
//                       }}
//                     >
//                       <RepeatIcon />
//                     </button>
//                   </div>
//                   <div className="song_slider">
//                     <span className="px-3">{formatTime(currentTime)}</span>
//                     <Slider
//                       value={currentTime}
//                       min={0}
//                       max={duration > 0 ? Math.min(duration, 20) : 20}
//                       onChange={(event, value) => {
//                         setCurrentTime(value);
//                         audioRef.current.currentTime = value;
//                       }}
//                       aria-labelledby="continuous-slider"
//                     />
//                     <span className="px-3">0:20</span>
//                   </div>
//                 </div>
//                 <div className="right px-3">
//                   <Grid container spacing={2}>
//                     <Grid item>
//                       <PlaylistPlayIcon onClick={handleShow} />

//                       <Modal show={show} onHide={handleClose} centered>
//                         <Modal.Header className="modal-header" closeButton>
//                           <Modal.Title>Playlist</Modal.Title>
//                         </Modal.Header>
//                         <Modal.Body
//                           style={{ maxHeight: "60vh", overflowY: "auto" }}
//                         >
//                           {marketItems.length > 0 ? (
//                             marketItems.map((song, index) => (
//                               <div
//                                 key={index}
//                                 style={{
//                                   display: "flex",
//                                   justifyContent: "space-between",
//                                 }}
//                                 className="modal_body"
//                               >
//                                 <div
//                                   style={{ flex: "0.3" }}
//                                   className="modal_pic"
//                                 >
//                                   <img
//                                     style={{ width: "100px", height: "100px" }}
//                                     alt="song"
//                                     className="modal_thumbnail"
//                                     src={song.image}
//                                   />
//                                 </div>
//                                 <div
//                                   style={{
//                                     flex: "0.4",
//                                     textAlign: "center",
//                                     marginBottom: "auto",
//                                     marginTop: "auto",
//                                   }}
//                                   className="modal_song_name"
//                                 >
//                                   <span style={{ margin: "0" }}>
//                                     {" "}
//                                     {song.name}
//                                   </span>
//                                 </div>
//                                 <div
//                                   style={{
//                                     flex: "0.3",
//                                     textAlign: "center",
//                                     marginBottom: "auto",
//                                     marginTop: "auto",
//                                   }}
//                                   className="modal_song_price"
//                                 >
//                                   {`Price: ${ethers.utils.formatEther(
//                                     song.price
//                                   )} ETH`}
//                                 </div>
//                               </div>
//                             ))
//                           ) : (
//                             <span>No Songs available in the Playlist.</span>
//                           )}
//                         </Modal.Body>
//                       </Modal>
//                     </Grid>
//                     <Grid item>
//                       <VolumeDownIcon />
//                     </Grid>
//                     <Grid item xs>
//                       <Slider
//                         aria-labelledby="continuous-slider"
//                         value={volume}
//                         onChange={handleVolumeChange}
//                       />
//                     </Grid>
//                   </Grid>
//                 </div>
//               </Card.Body>
//               <Card.Footer>
//                 <div className="d-grid my-1">
//                   <Button
//                     onClick={() => buyMarketItem(marketItems[currentItemIndex])}
//                     variant="success"
//                     size="lg"
//                   >
//                     {`Buy for ${ethers.utils.formatEther(
//                       marketItems[currentItemIndex].price
//                     )} ETH`}
//                   </Button>
//                 </div>
//               </Card.Footer>
//             </Card>
//           </div>
//         </div>
//       ) : (
//         <main style={{ padding: "1rem 0" }}>
//           <h2>No listed assets</h2>
//         </main>
//       )}
//     </div>
//   );
// };
// export default Home;