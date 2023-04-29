import Context from "./Context";
import { useState } from "react";
import { ethers } from "ethers";
import MusicNFTMarketplaceAbi from "../contractsData/MusicNFTMarketplace.json";
import MusicNFTMarketplaceAddress from "../contractsData/MusicNFTMarketplace-address.json";

const StateContext = (props) => {
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);
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
    console.log(signer);
    // loadContract(signer);
  };
  console.log("out " + loading);
  const loadContract = async (signer) => {
    // Get deployed copy of music nft marketplace contract
    const contract = new ethers.Contract(
      MusicNFTMarketplaceAddress.address,
      MusicNFTMarketplaceAbi.abi,
      signer
    );
    setContract(contract);
    setLoading(false);
    console.log("loader " + loading);
  };

  return (
    <Context.Provider
      value={{ account, loading, contract, web3Handler, loadContract }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default StateContext;
