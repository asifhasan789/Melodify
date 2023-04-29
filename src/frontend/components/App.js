import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { ethers } from "ethers";
import MusicNFTMarketplaceAbi from "../contractsData/MusicNFTMarketplace.json";
import MusicNFTMarketplaceAddress from "../contractsData/MusicNFTMarketplace-address.json";
import { NotificationsActiveOutlined } from "@material-ui/icons";
import SearchIcon from "@material-ui/icons/Search";
import { Spinner, Nav, Button, Popover, OverlayTrigger } from "react-bootstrap";
import Home from "./Home.js";
import MyTokens from "./MyTokens.js";
import MyResales from "./MyResales.js";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import "./App.css";
import Navbarcomp from "./Navbarcomp";

function App() {
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState({});

  const [bal, setBalance] = useState([0]);
  async function getBalance() {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const balance = await provider.getBalance(accounts[0]);
    setBalance(ethers.utils.formatEther(balance));
  }

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

  const popover = (
    <Popover style={{ zIndex: "9999" }}>
      <Popover.Header as="h3">Account Details</Popover.Header>
      <Popover.Body>
        <p>Account: {account}</p>
        <p>Balance: {bal} ETH</p>
      </Popover.Body>
    </Popover>
  );

  return (
    <BrowserRouter>
      <div className="App">
        <div className="background"></div>
        <div className="contents">
          {/* navbar starts */}
          <Navbarcomp />
          {/* navbar ends */}
          {/* top navbar starts */}
          <div className="body">
            <div className="header">
              <div className="left_part">
                <SearchIcon />
                <input
                  type="text"
                  placeholder="Search for Artist, Songs, Albums, Podcasts..."
                />
              </div>
              <div className="right_part">
                <Nav className="btns">
                  {account ? (
                    <Nav.Link
                      href={`https://etherscan.io/address/${account}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button nav-button btn-sm"
                    >
                      <Button variant="outline-light">
                        {account.slice(0, 5) + "..." + account.slice(38, 42)}
                      </Button>
                    </Nav.Link>
                  ) : (
                    <Button
                      className="wallet_btn"
                      onClick={web3Handler}
                      variant="outline-light"
                    >
                      Connect Wallet
                      <AccountBalanceWalletIcon className="icon" />
                    </Button>
                  )}
                </Nav>
                {/* <button className="notify_btn" ><NotificationsActiveOutlined className="notify_icon" /></button> */}
                <OverlayTrigger
                  className="over"
                  trigger="click"
                  placement="bottom"
                  overlay={popover}
                  rootClose
                >
                  <button className="notify_btn">
                    <NotificationsActiveOutlined
                      onClick={getBalance}
                      className="notify_icon"
                    />
                  </button>
                </OverlayTrigger>
              </div>
            </div>
            {/* top navbar ends */}
            <div className="info">
              {loading ? (
                <div className="awaiting">
                  <Spinner animation="border" />
                  <span>Awaiting Metamask Connection...</span>
                </div>
              ) : (
                <Routes>
                  <Route path="/" element={<Home contract={contract} />} />
                  <Route
                    path="/my-tokens"
                    element={<MyTokens contract={contract} />}
                  />
                  <Route
                    path="/my-resales"
                    element={
                      <MyResales contract={contract} account={account} />
                    }
                  />
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
