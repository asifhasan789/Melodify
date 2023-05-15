import React, { useState, useEffect } from "react";
import { Button, Popover, OverlayTrigger } from "react-bootstrap";
import { ethers } from "ethers";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import SearchIcon from "@material-ui/icons/Search";
import { NotificationsActiveOutlined } from "@material-ui/icons";

function Header(props) {
  const [balance, setBalance] = useState(0);

  async function getBalance() {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const balance = await provider.getBalance(accounts[0]);
    setBalance(ethers.utils.formatEther(balance));
  }

  function handleClick() {
    props.web3Handler();
  }

  const [buttonWidth, setButtonWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Update button width on window resize
    const handleResize = () => setButtonWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const popover = (
    <Popover style={{ zIndex: "9999" }}>
      <Popover.Header as="h3">Account Details</Popover.Header>
      <Popover.Body>
        <p>Account: {props.account}</p>
        <p>Balance: {balance} ETH</p>
      </Popover.Body>
    </Popover>
  );

  return (
    <div className="max-[768px]:pt-8 bg-[#1c1c1cd0]">
      <div className="container mx-auto flex justify-between max-[350px]:justify-around items-center py-4 md:py-6 lg:py-8">
        <div className="flex items-center max-[350px]:hidden rounded-2xl w-1/3 bg-white">
          <SearchIcon className="mx-2"/>
          <input
            type="text"
            placeholder="Search for Artist, Songs, Albums, Podcasts..."
            className="text-black pr-2 py-2 w-4/5 rounded-2xl outline-none overflow-hidden"
          />
        </div>
        <div className="flex justify-end items-center w-50">
          {props.account ? (
            <a href={`https://etherscan.io/address/${props.account}`} target="_blank" rel="noopener noreferrer" className="btn-sm ">
              <Button variant="outline" className="bg-[#27ff9e] text-black shadow-[0_0_10px_rgb(130,207,130)] border-white outline-none hover:bg-[#3ce7a3] hover:shadow-none mr-2 md:mr-8 lg:mr-12">
                {props.account.slice(0, 5) + "..." + props.account.slice(38, 42)}
              </Button>
            </a>
          ) : (
            <Button className="bg-[#27ff9e] text-black shadow-[0_0_10px_rgb(130,207,130)] border-white outline-none hover:bg-[#3ce7a3] hover:shadow-none mr-2 md:mr-8 lg:mr-12" onClick={handleClick} variant="outline">
              {buttonWidth <= 434 ? (
                "Connect"
              ) : (
              <>
                Connect Wallet
                {buttonWidth > 434 && <AccountBalanceWalletIcon/>}
              </>
              )}
            </Button>
          )}
          <OverlayTrigger className="over" trigger="click" placement="bottom" overlay={popover} rootClose>
            <button className="mr-4 md:mr-8 lg:mr-12">
              <NotificationsActiveOutlined onClick={getBalance} className="text-white bg-[#1c1c1cd0]"/>
            </button>
          </OverlayTrigger>
        </div>
      </div>
    </div>
  );
}

export default Header;