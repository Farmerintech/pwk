import { Link } from "react-router-dom";
import { useState } from "react";
import { Overlay } from "./overlay";
import { FaTimes } from "react-icons/fa";
import { MdGridView } from "react-icons/md";
import { useUser } from "../../contexts/UserContext";

export const NavBar = () => {
// const { address, isConnected } = useAccount();
const [showOverlay, setShowOverlay] = useState(false);
// State renamed for clarity
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 

 const handleOverlayOpen = () => {
  setShowOverlay(true);
 };

 const { user } = useUser();
 const handleOverlayClose = () => {
  setShowOverlay(false);
 };

 // Function updated to toggle the menu state
 const handleNavToggle = () => {
  setIsMobileMenuOpen(!isMobileMenuOpen);
 };

 return (
  <>
   <nav className="bg-white/40 text-white font-[600] py-3  flex items-center justify-between px-5 md:px-10 lg:px-16 z-40">
    {/* Left - Logo + Nav Links */}
    {showOverlay && (
     <div className="min-h-screen sticky top-0 left-0 z-50">
      <Overlay onClose={handleOverlayClose} />
     </div>
    )}
    <div>
     <p className="text-[18px] text-">PLAY WITH KWARA YOUTH</p>
    </div>

    {/* ------------------ MOBILE & DESKTOP MENU ------------------ */}
        {/* On mobile, it's conditionally fixed/hidden. On md/desktop, it's always flex. */}
    <div className={`
            ${isMobileMenuOpen 
                ? 'fixed top-0 left-0 w-full h-screen bg-black flex flex-col pt-20 z-50' // Mobile Open Styles
                : 'hidden'
            } 
            md:flex md:items-center md:gap-3 md:relative md:w-auto md:h-auto md:bg-transparent md:pt-0
        `}>
     
     {/* The list of links */}
     <ul className="flex flex-col md:flex-row gap-6 lg:gap-10 text-white font-medium px-10 md:p-0">
      {/* Close Button - ONLY visible on mobile */}
      <div onClick={() => { setIsMobileMenuOpen(false) }} className="absolute top-8 right-8 md:hidden hover:text-[#3333ff] cursor-pointer">
       <FaTimes size={20} />
      </div>

      <li onClick={() => { setIsMobileMenuOpen(false) }}>
       <Link to="/" className="font-[600] hover:text-[#3333ff] transition">
        Home
       </Link>
      </li>
      <li onClick={() => { setIsMobileMenuOpen(false) }}>
       {
        user !== null ?
         (
          <Link to={`/user/dashboard`} className=" font-[600]  hover:text-[#3333ff] transition">
           Dashboard
          </Link>
         ) :
         (
          <Link to={'/sign_in'} className=" font-[600] hover:text-[#3333ff] transition">
           Dashboard
          </Link>
         )
       }
      </li>
      <li onClick={() => { setIsMobileMenuOpen(false) }}>
       <button
        onClick={handleOverlayOpen}
        className="font-[600]  hover:text-[#3333ff] transition"
       >
        SignUp
       </button>
      </li>
      <li onClick={() => { setIsMobileMenuOpen(false) }}>
       <Link to="/sign_in" className="font-[600]  hover:text-[#3333ff] transition">
        SignIn
       </Link>
      </li>
      <li>
       <Link to="/sign_in" className="font-[600] md:hidden hover:text-[#3333ff] transition">
        Blog
       </Link>
      </li>
     </ul>
    </div>

    <div className="hidden md:flex items-center gap-2 justify-center font-[600] bg-blue-800 px-5 py-2 rounded-lg text-white">
        Blog
    </div>

    {/* Right - Mobile Menu Icon - ONLY visible on mobile */}
    <div className="text-white md:hidden cursor-pointer z-40 bg-blue-800 font-[600] px-2 py-1 rounded-[2px]" onClick={handleNavToggle}>
     <MdGridView size={25} />
    </div>
   </nav>
  </>
 );
};