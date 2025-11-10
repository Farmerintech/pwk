import Hero from "../../assets/tennisball.png";
import Hero2 from "../../assets/scrabble1.jpg";
import Hero1 from "../../assets/football.png";
import Hero3 from "../../assets/ludo.jpg";
import Hero4 from "../../assets/basketball.jpg";
import Hero5 from "../../assets/dice.png";

export const HeroSection = () => {
  return (
    <section className="relative w-full overflow-hidden bg-gray-50">
      <HeroSection3 />
    </section>
  );
};
import { useEffect, useRef, useState } from "react";

export const HeroSection3 = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const baseImgClass =
    "w-[60px] h-[60px] md:w-[120px] md:h-[120px] transform border-4 border-green-500 absolute transition-all duration-[1200ms] ease-out rounded-xl shadow-md bg-white";

  return (
    <div
      ref={sectionRef}
      className="relative flex flex-col items-center justify-center mt-20 h-[500px] md:h-[700px] px-4 md:px-20 overflow-hidden"
    >
      {/* Floating Images */}
      <img
        src={Hero1}
        alt="Football"
        className={`${baseImgClass} ${
          isVisible
            ? "md:left-[10%] xl:left-[20%] left-[15%] top-[15%] xl:top-[20%] rotate-[-25deg]"
            : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        }`}
      />

      <img
        src={Hero2}
        alt="Scrabble"
        className={`${baseImgClass} ${
          isVisible
            ? "md:right-[10%] right-[15%] xl:right-[20%] top-[20%] xl:top-[25%] rotate-[25deg]"
            : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        }`}
      />

      <img
        src={Hero3}
        alt="Ludo"
        className={`${baseImgClass} ${
          isVisible
            ? "md:left-[8%] left-[10%] xl:left-[20%] bottom-[25%] rotate-[-65deg]"
            : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        }`}
      />

      <img
        src={Hero4}
        alt="Basketball"
        className={`${baseImgClass} ${
          isVisible
            ? "md:right-[8%] right-[10%] xl:right-[20%] bottom-[25%] rotate-[65deg]"
            : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        }`}
      />

      <img
        src={Hero5}
        alt="Dice"
        className={`${baseImgClass} ${
          isVisible ? "left-[45%] top-[5%] rotate-[45deg]" : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        }`}
      />

      <img
        src={Hero}
        alt="Tennis Ball"
        className={`${baseImgClass} ${
          isVisible ? "right-[45%] bottom-[5%] rotate-[-60deg]" : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        }`}
      />

      {/* Hero Text */}
      <div className="text-center max-w-[90%] md:max-w-[65%] lg:px-20 z-20 mt-6">
        <p className="text-[28px] sm:text-[28px] md:text-[40px] xl:text-[52px] font-semibold leading-tight text-gray-800">
          Uniting Kwara Youths Through Sports,{" "}
          <span className="text-green-600">Creativity</span> & Purpose.
        </p>
      </div>
    </div>
  );
};
