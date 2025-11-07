
import Hero from "../../assets/tennis ball.jpg";
import Hero2 from "../../assets/scrabble1.jpg";
import Hero1 from "../../assets/football.jpg";
import Hero3 from "../../assets/ludo.jpg";
import Hero4 from "../../assets/basketball.jpg";
import Hero5 from "../../assets/dice.jpg";


export const HeroSection = () => {

  return (


    <section
      className="w-full bg-cover bg-center bg-black flex flex-col justify-between ">


{/* <HeroSection2/> */}
<HeroSection3/>

    </section>

  );
};










export const HeroSection2 = () => {
  const baseImgClass =
    "w-[60px] mt-40 h-[60px] md:w-[100px] md:h-[100px] border-4 rounded-[30px] absolute object-cover";

  const radius = 200; // Adjust for how far images sit from the center

  type CSSWithVars = React.CSSProperties & { [key: string]: string | number };

  const images = [
    { src: Hero, border: "border-purple-500", deg: 0 },
    { src: Hero2, border: "border-red-500", deg: 60 },
    { src: Hero3, border: "border-blue-500", deg: 120 },
    { src: Hero4, border: "border-yellow-500", deg: 180 },
    { src: Hero3, border: "border-green-500", deg: 240 },
    { src: Hero1, border: "border-pink-500", deg: 300 },
  ];

  return (
    <div className="relative flex flex-col bg-black items-center justify-center h-[500px] md:h-[700px] px-4 md:px-20 overflow-hidden md:mt-20">
      {/* Circle Orbit - Centered */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[600px] md:h-[600px] relative">
        {images.map((item, i) => (
          <img
            key={i}
            src={item.src}
            alt={`Hero${i + 1}`}
            className={`${baseImgClass} ${item.border}`}
            style={
              {
                "--r": `${radius}px`,
                transform: `rotate(${item.deg}deg) translate(var(--r)) rotate(-${item.deg}deg)`,
              } as CSSWithVars
            }
          />
        ))}
      </div>

      {/* Center Text */}
      <div className="text-center max-w-[90%] md:max-w-[65%] lg:px-20 z-20">
        <p className="text-white text-[28px] sm:text-[28px] md:text-[40px] lg:text-[52px] font-semibold leading-tight">
          Uniting Kwara Youths Through Sports, Creativity & Purpose.
        </p>
      </div>
    </div>
  );
};


import { useEffect, useRef, useState } from "react";

export const  HeroSection3 =() =>{
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 } // triggers when 30% of the section is visible
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const baseImgClass =
    "w-[60px] h-[60px] md:w-[120px] md:h-[120px] transform border-4 absolute transition-all duration-[1200ms] ease-out rounded-xl";

  return (
    <div
      ref={sectionRef}
      className="relative flex flex-col items-center justify-center mt-20 h-[500px] md:h-[700px] px-4 md:px-20 overflow-hidden"
    >
      {/* 6 Floating Images */}
      <img
        src={Hero1}
        alt="Hero1"
        className={`${baseImgClass} border-purple-500 ${
          isVisible
            ? "md:left-[10%] xl:left-[20%]  left-[15%] top-[15%] xl:top-[20%] rotate-[-25deg]"
            : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-25"
        }`}
      />
      <img
        src={Hero2}
        alt="Hero2"
        className={`${baseImgClass} border-red-500 ${
          isVisible
            ? "md:right-[10%] right-[15%] xl:right-[20%] top-[20%] xl:top-[25%] rotate-[25deg]"
            : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-25"
        }`}
      />
      <img
        src={Hero3}
        alt="Hero3"
        className={`${baseImgClass} border-blue-500 ${
          isVisible
            ? "md:left-[8%] left-[10%] xl:left-[20%] bottom-[25%] rotate-[-65deg]"
            : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-65"
        }`}
      />
      <img
        src={Hero4}
        alt="Hero4"
        className={`${baseImgClass} border-yellow-500 ${
          isVisible
            ? "md:right-[8%] right-[10%] xl:right-[20%] bottom-[25%] rotate-[65deg]"
            : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-65"
        }`}
      />
      <img
        src={Hero5}
        alt="Hero5"
        className={`${baseImgClass} border-green-500 ${
          isVisible
            ? "left-[45%] top-[5%] rotate-[45deg]"
            : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45"
        }`}
      />
      <img
        src={Hero}
        alt="Hero6"
        className={`${baseImgClass} border-pink-500 ${
          isVisible
            ? "right-[45%] bottom-[5%] rotate-[-60deg]"
            : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45"
        }`}
      />

      {/* Centered Text */}
      <div className="text-center max-w-[90%] md:max-w-[65%] lg:px-20 z-20">
        <p className="text-white text-[28px] sm:text-[28px]  md:text-[40px] xl:text-[52px] font-semibold leading-tight">
          Uniting Kwara Youths Through Sports, <span className="text-blue-800">Creativity </span>& Purpose.
        </p>
      </div>
    </div>
  );
}