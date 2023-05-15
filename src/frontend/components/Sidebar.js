import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { HiOutlineMenu } from 'react-icons/hi';
import { RiCloseLine } from 'react-icons/ri';

import logo  from './logo.png';
import { GraphicEq, Home, MonetizationOn, MusicNote } from '@material-ui/icons';

const links = [
  { name: 'Home', to: '/', icon: Home},
  { name: 'My Music', to: '/my-tokens', icon: MusicNote },
  { name: 'My Resales', to: '/my-resales', icon: GraphicEq },
  { name: 'Sold NFTS', to: '/my-sold', icon: MonetizationOn },
];

const NavLinks = ({ handleClick }) => (
  <div className="mt-10">
    {links.map((item) => (
      <NavLink key={item.name} to={item.to} className="flex flex-row justify-start items-center my-8 text-sm font-medium text-gray-400 hover:text-cyan-400" onClick={() => handleClick && handleClick()}>
        <item.icon className="w-6 h-6 mr-2" />
        {item.name}
      </NavLink>
    ))}
  </div>
);

const handleImg = () => {
  window.location.href = "/";
}

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="md:flex hidden md:h-[100vh] flex-col w-[240px] py-10 px-4 bg-[#22222294] backdrop-blur">
        <img src={logo} alt="logo" onClick={handleImg} className="hover:transform-gpu hover:scale-110 hover:duration-200 cursor-pointer w-full h-14 object-contain" />
        <NavLinks />
      </div>

      {/* Mobile sidebar */}
      <div className="fixed md:hidden block top-4 right-3">
        {!mobileMenuOpen ? (
          <HiOutlineMenu className="w-6 h-6 mr-2 text-white" onClick={() => setMobileMenuOpen(true)} />
        ) : (
          <RiCloseLine className="w-6 h-6 mr-2 text-white" onClick={() => setMobileMenuOpen(false)} />
        )}
      </div>

      <div className={`fixed h-[100%] top-0 sm:h-screen w-2/3 max-[786px]:w-2/3 bg-gradient-to-tl from-white/10 to-[#483D8B] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${mobileMenuOpen ? 'left-0' : '-left-full'}`}>
        <img src={logo} alt="logo" className="w-full h-14 object-contain" />
        <NavLinks handleClick={() => setMobileMenuOpen(false)} />
      </div>
    </>
  );
};

export default Sidebar;
