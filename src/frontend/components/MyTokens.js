import { useState, useEffect } from "react";
import { ethers } from "ethers";
import OwnedSongCards from "./OwnedSongCards";

export default function MyTokens({ contract }) {
  
  const [isPlaying, setIsPlaying] = useState(null);
  const [loading, setLoading] = useState(true);
  const [myTokens, setMyTokens] = useState(null);
  const [resellId, setResellId] = useState(null);
  const [resellPrice, setResellPrice] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);

  const loadMyTokens = async () => {
    // Get all unsold items/tokens
    const results = await contract.getMyTokens();
    const myTokens = await Promise.all(
      results.map(async (i) => {
        // get uri url from contract
        const uri = await contract.tokenURI(i.tokenId);
        // use uri to fetch the nft metadata stored on ipfs
        const response = await fetch(uri + ".json");
        const metadata = await response.json();
        // define item object
        let item = {
          price: i.price,
          itemId: i.tokenId,
          name: metadata.name,
          audio: metadata.audio,
          image: metadata.image,
          resellPrice: null,
        };
        return item;
      })
    );
    setMyTokens(myTokens);
    setLoading(false);
  };
  const resellItem = async (item) => {
    if (resellPrice === "0" || item.itemId !== resellId || !resellPrice) return;
    // Get royalty fee
    const fee = await contract.royaltyFee();
    const price = ethers.utils.parseEther(resellPrice.toString());
    await (
      await contract.resellToken(item.itemId, price, { value: fee })
    ).wait();
    loadMyTokens();
  };

  useEffect(() => {
    !myTokens && loadMyTokens();
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
      {myTokens.length > 0 ? (
        <>
          <div className="w-full flex justify-between items-center sm:flex-row flex-col mx-auto mt-4 mb-6">
            <h2 className="font-bold text-3xl text-white text-left">My Music NFTS</h2>
          </div>
          <div className="flex flex-wrap sm:justify-start justify-center gap-8">
            {myTokens.map((song, idx) => (
              <OwnedSongCards resellId={resellId} resellPrice={resellPrice} song = {song} key = {song.itemId} setResellId={setResellId} myTokens = {myTokens} setIsPlaying={setIsPlaying} setCurrentSong={setCurrentSong} setResellPrice={setResellPrice}  resellItem={resellItem} isPlaying={isPlaying} currentSong={currentSong} />
              ))}
          </div>
        </>
      ) : (
        <main className="d-flex align-items-center h-[80vh] text-3xl justify-content-center">
          <h2 className="text-light">No owned tokens</h2>
        </main>
      )}
    </div>
  );
}


// import { useState, useEffect, useRef } from "react";
// import VanillaTilt from "vanilla-tilt";
// import { ethers } from "ethers";
// import { Slider } from "@material-ui/core";
// // import "../styles/mytoken.css";
// import { Row, Col, Card, Button, InputGroup, Form } from "react-bootstrap";

// export default function MyTokens({ contract }) {
//   const audioRefs = useRef([]);

//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);

//   function handleTimeUpdate(event) {
//     setCurrentTime(event.target.currentTime);
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

//   const [isPlaying, setIsPlaying] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [myTokens, setMyTokens] = useState(null);
//   const [selected, setSelected] = useState(0);
//   const [previous, setPrevious] = useState(null);
//   const [resellId, setResellId] = useState(null);
//   const [resellPrice, setResellPrice] = useState(null);
//   const loadMyTokens = async () => {
//     // Get all unsold items/tokens
//     const results = await contract.getMyTokens();
//     const myTokens = await Promise.all(
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
//           resellPrice: null,
//         };
//         return item;
//       })
//     );
//     setMyTokens(myTokens);
//     setLoading(false);
//   };
//   const resellItem = async (item) => {
//     if (resellPrice === "0" || item.itemId !== resellId || !resellPrice) return;
//     // Get royalty fee
//     const fee = await contract.royaltyFee();
//     const price = ethers.utils.parseEther(resellPrice.toString());
//     await (
//       await contract.resellToken(item.itemId, price, { value: fee })
//     ).wait();
//     loadMyTokens();
//   };
//   useEffect(() => {
//     if (isPlaying) {
//       audioRefs.current[selected].play();
//       if (selected !== previous) audioRefs.current[previous].pause();
//     } else if (isPlaying !== null) {
//       audioRefs.current[selected].pause();
//     }
//   });
//   useEffect(() => {
//     !myTokens && loadMyTokens();
//   });

//   useEffect(() => {
//     const img = document.querySelectorAll(".tilt");
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
//     <div className="flex justify-center">
//       {myTokens.length > 0 ? (
//         <div className="px-5 container">
//           <Row xs={1} md={2} lg={4} className="g-4 py-5">
//             {myTokens.map((item, idx) => (
//               <Col key={idx} className="overflow-hidden">
//                 <audio
//                   src={item.audio}
//                   key={idx}
//                   onTimeUpdate={handleTimeUpdate}
//                   ref={(el) => (audioRefs.current[idx] = el)}
//                 ></audio>
//                 <Card className="tilt">
//                   <div className="image">
//                     <Card.Img
//                       variant="top"
//                       className="photo"
//                       src={item.image}
//                     />
//                   </div>
//                   <Card.Body color="secondary">
//                     <Card.Title style={{ color: "white" }}>
//                       {item.name}
//                     </Card.Title>
//                     <div className="d-grid px-4">
//                       <Button
//                         variant="success"
//                         onClick={() => {
//                           setPrevious(selected);
//                           setSelected(idx);
//                           if (!isPlaying || idx === selected)
//                             setIsPlaying(!isPlaying);
//                         }}
//                       >
//                         {isPlaying && selected === idx ? (
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             width="23"
//                             height="23"
//                             fill="currentColor"
//                             className="bi bi-pause"
//                             viewBox="0 0 16 16"
//                           >
//                             <path d="M6 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm4 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z" />
//                           </svg>
//                         ) : (
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             width="23"
//                             height="23"
//                             fill="currentColor"
//                             className="bi bi-play"
//                             viewBox="0 0 16 16"
//                           >
//                             <path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z" />
//                           </svg>
//                         )}
//                       </Button>
//                     </div>
//                     <div style={{ color: "white" }} className="song_slider">
//                       <span className="px-3">{formatTime(currentTime)}</span>
//                       <Slider
//                         value={currentTime}
//                         min={0}
//                         max={duration > 0 ? duration : 0}
//                         onChange={(value) => {
//                           setCurrentTime(value);
//                           audioRefs.current.currentTime = value;
//                         }}
//                         aria-labelledby="continuous-slider"
//                       />
//                       <span style={{ color: "white" }} className="px-1">
//                         {formatTime(duration)}
//                       </span>
//                     </div>
//                     <Card.Text className="mt-3" style={{ color: "white" }}>
//                       Purchase Price:{" "}
//                       <span style={{ color: "yellow" }}>
//                         {ethers.utils.formatEther(item.price)} ETH
//                       </span>
//                     </Card.Text>
//                   </Card.Body>
//                   <Card.Footer>
//                     <InputGroup className="my-1">
//                       <Button
//                         onClick={() => resellItem(item)}
//                         variant="outline-primary"
//                         id="button-addon1"
//                       >
//                         Resell
//                       </Button>
//                       <Form.Control
//                         onChange={(e) => {
//                           setResellId(item.itemId);
//                           setResellPrice(e.target.value);
//                         }}
//                         size="md"
//                         value={resellId === item.itemId ? resellPrice : ""}
//                         required
//                         type="number"
//                         placeholder="Price in ETH"
//                       />
//                     </InputGroup>
//                   </Card.Footer>
//                 </Card>
//               </Col>
//             ))}
//           </Row>
//         </div>
//       ) : (
//         <main
//           style={{ padding: "1rem 0", height: "80vh" }}
//           className="d-flex align-items-center justify-content-center"
//         >
//           <h2 className="text-light">No owned tokens</h2>
//         </main>
//       )}
//     </div>
//   );
// }