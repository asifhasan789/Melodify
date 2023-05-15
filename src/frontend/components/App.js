import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { ethers } from "ethers";
import MusicNFTMarketplaceAbi from "../contractsData/MusicNFTMarketplace.json";
import MusicNFTMarketplaceAddress from "../contractsData/MusicNFTMarketplace-address.json";
import { Spinner} from "react-bootstrap";
import Home from "./Home.js";
import MyTokens from "./MyTokens.js";
import MyResales from "./MyResales.js";
import Sidebar from "./Sidebar";
import Header from "./Header";
import "./App.css";
import SoldNfts from "./SoldNfts";

function App() {
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState({});

  const web3Handler = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(accounts[0]);
    // Get provider from Metamask
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // Get signer
    const signer = provider.getSigner();
    loadContract(signer);
  };
  const loadContract = async (signer) => {
    // Get deployed copy of music nft marketplace contract
    const contract = new ethers.Contract(
      MusicNFTMarketplaceAddress.address,
      MusicNFTMarketplaceAbi.abi,
      signer
      );
      setContract(contract);
      setLoading(false);
    };
  return (
    <BrowserRouter>
        <div className="background"></div>
        <div className='relative flex'>
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Header web3Handler={web3Handler} account={account}/>
            
            <div className="info px-6 h-[calc(100vh-180px)] max-[350px]:h-[95%] md:h-[calc(100vh-94px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
              <div className="flex-1 h-fit">
              {loading ? (
                <div className="text-white sm:text-2xl ml-[15%] sm:ml-[20%] sm:mt-[30%] md:ml-[20%] md:mt-[35%] lg:mt-[20%] lg:ml-[30%] xl:ml-[35%] mt-[45%]">
                  <Spinner animation="border" />
                  <span className="">Awaiting Metamask Connection...</span>
                </div>
              ) : (
                <Routes>
                  <Route path="/" element={<Home contract={contract} />} />
                  <Route path="/my-tokens" element={<MyTokens contract={contract} />}/>
                  <Route path="/my-resales" element={<MyResales contract={contract} account={account} />}/>
                  <Route path="/my-sold" element={<SoldNfts contract={contract} account={account}/>}/>
                </Routes>
              )}
              </div>
            </div>
          </div>
        </div>
    </BrowserRouter>
  );
}

export default App;
