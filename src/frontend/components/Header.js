// import React from "react";
// import { useState } from "react";
// import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
// import { Nav, Button, Popover, OverlayTrigger } from "react-bootstrap";
// import MusicNFTMarketplaceAbi from "../contractsData/MusicNFTMarketplace.json";
// import MusicNFTMarketplaceAddress from "../contractsData/MusicNFTMarketplace-address.json";

// import { ethers } from "ethers";
// import SearchIcon from "@material-ui/icons/Search";

// import { NotificationsActiveOutlined } from "@material-ui/icons";

// function Header() {
//   const [bal, setBalance] = useState([0]);
//   const [loading, setLoading] = useState(true);
//   async function getBalance() {
//     const accounts = await window.ethereum.request({
//       method: "eth_requestAccounts",
//     });
//     const provider = new ethers.providers.Web3Provider(window.ethereum);
//     const balance = await provider.getBalance(accounts[0]);
//     setBalance(ethers.utils.formatEther(balance));
//   }

//   const [account, setAccount] = useState(null);
//   const web3Handler = async () => {
//     const accounts = await window.ethereum.request({
//       method: "eth_requestAccounts",
//     });
//     setAccount(accounts[0]);
//     // Get provider from Metamask
//     const provider = new ethers.providers.Web3Provider(window.ethereum);
//     // Get signer
//     const signer = provider.getSigner();
//     loadContract(signer);
//   };
//   const [contract, setContract] = useState({});
//   const loadContract = async (signer) => {
//     // Get deployed copy of music nft marketplace contract
//     const contract = new ethers.Contract(
//       MusicNFTMarketplaceAddress.address,
//       MusicNFTMarketplaceAbi.abi,
//       signer
//     );
//     setContract(contract);
//     setLoading(false);
//     console.log("loader " + loading);
//   };

//   const popover = (
//     <Popover style={{ zIndex: "9999" }}>
//       <Popover.Header as="h3">Account Details</Popover.Header>
//       <Popover.Body>
//         <p>Account: {account}</p>
//         <p>Balance: {bal} ETH</p>
//       </Popover.Body>
//     </Popover>
//   );

//   return (
//     <div>
//       <div className="body">
//         <div className="header">
//           <div className="left_part">
//             <SearchIcon />
//             <input
//               type="text"
//               placeholder="Search for Artist, Songs, Albums, Podcasts..."
//             />
//           </div>
//           <div className="right_part">
//             <div className="btns">
//               {account ? (
//                 <Nav.Link
//                   href={`https://etherscan.io/address/${account}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="button nav-button btn-sm"
//                 >
//                   <Button variant="outline-light">
//                     {account.slice(0, 5) + "..." + account.slice(38, 42)}
//                   </Button>
//                 </Nav.Link>
//               ) : (
//                 <Button
//                   className="wallet_btn"
//                   onClick={web3Handler}
//                   variant="outline-light"
//                 >
//                   Connect Wallet
//                   <AccountBalanceWalletIcon className="icon" />
//                 </Button>
//               )}
//             </div>
//             <OverlayTrigger
//               className="over"
//               trigger="click"
//               placement="bottom"
//               overlay={popover}
//               rootClose
//             >
//               <button className="notify_btn">
//                 <NotificationsActiveOutlined
//                   onClick={getBalance}
//                   className="notify_icon"
//                 />
//               </button>
//             </OverlayTrigger>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Header;
