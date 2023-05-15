import { useState, useEffect, useRef } from "react";
import { ethers } from "ethers";
import VanillaTilt from "vanilla-tilt";
import {Button} from '@mui/material'
import { BsFillPauseFill, BsFillPlayFill } from 'react-icons/bs';
import HeadsetIcon from "@material-ui/icons/Headset";

export default function MyResales({ contract, account }) {
  const audioRefs = useRef([]);
  const [loading, setLoading] = useState(true);
  const [listedItems, setListedItems] = useState(null);
  const [isPlaying, setIsPlaying] = useState(null);
  const [selected, setSelected] = useState(0);
  const [previous, setPrevious] = useState(null);
  const loadMyResales = async () => {
    // Fetch resale items from marketplace by quering MarketItemRelisted events with the seller set as the user
    let filter = contract.filters.MarketItemRelisted(null, account, null);
    let results = await contract.queryFilter(filter);
    // Fetch metadata of each nft and add that to item object.
    const listedItems = await Promise.all(
      results.map(async (i) => {
        // fetch arguments from each result
        i = i.args;
        // get uri url from nft contract
        const uri = await contract.tokenURI(i.tokenId);
        // use uri to fetch the nft metadata stored on ipfs
        const response = await fetch(uri + ".json");
        const metadata = await response.json();
        // define listed item object
        let purchasedItem = {
          price: i.price,
          itemId: i.tokenId,
          name: metadata.name,
          audio: metadata.audio,
          image: metadata.image,
        };
        return purchasedItem;
      })
    );
    setListedItems(listedItems);
    // Fetch sold resale items by quering MarketItemBought events with the seller set as the user.
    filter = contract.filters.MarketItemBought(null, account, null, null);
    results = await contract.queryFilter(filter);
    setLoading(false);
  };
  useEffect(() => {
    if (isPlaying) {
      audioRefs.current[selected].play();
      if (selected !== previous) audioRefs.current[previous].pause();
    } else if (isPlaying !== null) {
      audioRefs.current[selected].pause();
    }
  });
  useEffect(() => {
    !listedItems && loadMyResales();
  });
  useEffect(() => {
    const img = document.querySelectorAll(".tilt");
    VanillaTilt.init(img, {
      max: 25,
      speed: 400,
      glare: true,
      "max-glare": 0.5,
    });
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
        {listedItems.length > 0 ? (
        <>
          <div className="w-full flex justify-between items-center sm:flex-row flex-col mx-auto mt-4 mb-6">
            <h2 className="font-bold text-3xl text-white text-left">Sales</h2>
          </div>
          <div className="flex flex-wrap sm:justify-start justify-center gap-3">
              {listedItems.map((item, idx) => (
                <div className='tilt flex flex-col max-[640px]:w-[275px]:p-2 w-[300px] p-4 bg-[rgba(0,0,0,0.30)] bg-opacity-80 rounded-lg cursor-pointer'>
                  <div className='relative w-full h-64 group'>
                    <audio src={item.audio} ref={(el) => (audioRefs.current[idx] = el)}></audio>
                      <img src={item.image} className='truncate h-60 w-[24rem]' alt="song_img" />
                  </div>
                  <div className="my-2 flex flex-col">
                    <p className="font-semibold text-lg text-white truncate my-auto">
                      <HeadsetIcon /> {item.name}
                    </p>
                  </div>
                  <div className="mx-auto my-2"> 
                    <Button variant="contained" color="success" className="px-5 py-2" onClick={() => { setPrevious(selected); setSelected(idx); if (!isPlaying || idx === selected) setIsPlaying(!isPlaying);}}>
                      {isPlaying && selected === idx ? (
                        <BsFillPauseFill/>
                        ) : (
                          <BsFillPlayFill/>
                          )}
                    </Button>
                  </div>
                  <div className='text-white my-2'>
                    Purchase Price: {" "} 
                        <span className='text-amber-300'>
                            {ethers.utils.formatEther(item.price)} ETH
                        </span>
                  </div>
                </div>
              ))}
          </div>
        </>
        ) : (
          <main className="d-flex align-items-center h-[80vh] text-3xl justify-content-center">
            <h2 className="text-light">No listed assets</h2>
          </main>
        )}
      </div>
  );
}
