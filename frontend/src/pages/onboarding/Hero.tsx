import { Link } from "react-router-dom";
import Hero from "../../assets/hero-g1.png";
import Hero2 from "../../assets/hero-b.jpg";
import Hero1 from "../../assets/hero-g1.jpg";
import Hero3 from "../../assets/hero-g3.jpg";
import Hero4 from "../../assets/hero.jpg";

import { ConnectButton } from "../../components/connectBTN";
export const HeroSection = () => {

  return (


    <section
      className="w-full bg-cover bg-center  flex flex-col justify-between ">
      <aside className="flex flex-col md:flex-row pt-32  md:pt-32 lg:pt-5 items-center xl:px-20">

        <div className="flex-1 w-[1/2]flex flex-col items-start justify-center  flex-1 px-3 md:px-10  ">
          <p className="text-black text-[36px] sm:text-[36px] mdlg lg:text-[48px] lg:text-[60px] font-[600] leading-tight">
            Play With <span className="text-purple-800">Kwara</span> Youth
          </p>
          <p className="text-black text-[16px] sm:text-[18px] mt-4">
            Uniting Kwara Youths Through Sports, Creativity & Purpose. 
            A Movement empowering young people to connect, grow and thrive  through friendly competitions, civic awarness and meaningful engagement.     </p>
          <div className="mt-1 py-5 hidden w-1/2 md:flex flex-col lg:flex-row gap-2 ">
            <ConnectButton />
            {/* <Link to="/sign_in" className="login text-white text-sm text-center">Login</Link> */}
          </div>
          <div>
            {/* <img src={Hero2}/>         */}
          </div>
        </div>
        <img src={Hero} className="flex-1 w-full md:w-1/2 bg-blur-sm" />
        <div className="mt-1 md:hidden flex flex-col w-full gap-2 px-3 mb-3">
          <ConnectButton/>
          <Link to="/sign_in/" className="login text-white text-sm text-center">Login</Link>
        </div>
      </aside>

<HeroSection2/>
    </section>

  );
};


import { useEffect, useRef, useState } from "react";

export const  HeroSection2 =() =>{
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.8 } // triggers when 30% of the section is visible
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const baseImgClass =
    "w-[60px] h-[60px] md:w-[120px] md:h-[120px] transform border-4 absolute transition-all duration-[1200ms] ease-out rounded-full";

  return (
    <div
      ref={sectionRef}
      className="relative flex flex-col items-center justify-center md:mt-20 h-[500px] md:h-[700px] px-4 md:px-20 overflow-hidden"
    >
      {/* 6 Floating Images */}
      <img
        src={Hero1}
        alt="Hero1"
        className={`${baseImgClass} border-purple-500 ${
          isVisible
            ? "md:left-[10%] left-[15%] top-[15%] rotate-[-8deg]"
            : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-0"
        }`}
      />
      <img
        src={Hero2}
        alt="Hero2"
        className={`${baseImgClass} border-red-500 ${
          isVisible
            ? "md:right-[10%] right-[15%] top-[20%] rotate-[8deg]"
            : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-0"
        }`}
      />
      <img
        src={Hero3}
        alt="Hero3"
        className={`${baseImgClass} border-blue-500 ${
          isVisible
            ? "md:left-[8%] left-[10%] bottom-[25%] rotate-[-12deg]"
            : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-0"
        }`}
      />
      <img
        src={Hero4}
        alt="Hero4"
        className={`${baseImgClass} border-yellow-500 ${
          isVisible
            ? "md:right-[8%] right-[10%] bottom-[25%] rotate-[12deg]"
            : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-0"
        }`}
      />
      <img
        src={Hero3}
        alt="Hero5"
        className={`${baseImgClass} border-green-500 ${
          isVisible
            ? "left-[45%] top-[5%] rotate-[6deg]"
            : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-0"
        }`}
      />
      <img
        src={Hero1}
        alt="Hero6"
        className={`${baseImgClass} border-pink-500 ${
          isVisible
            ? "right-[40%] bottom-[5%] rotate-[-6deg]"
            : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-0"
        }`}
      />

      {/* Centered Text */}
      <div className="text-center max-w-[90%] md:max-w-[65%] lg:px-20 z-20">
        <p className="text-black text-[28px] sm:text-[28px] md:text-[40px] lg:text-[52px] font-semibold leading-tight">
          Uniting Kwara Youths Through Sports, Creativity & Purpose.
        </p>
      </div>
    </div>
  );
}

