// ActivitiesSection.tsx
import { FaFutbol, FaTableTennis, FaChess, FaMicrophoneAlt, FaUsers } from "react-icons/fa";
import { motion,  useAnimation, useInView} from "framer-motion";
import type {Variants} from "framer-motion";
import { useEffect, useRef } from "react";
export const   ActivitiesSection =()=>{

  const ref = useRef(null);
  const inView = useInView(ref, {amount:0.5});
  const controls = useAnimation();

  useEffect(()=>{

    if(inView){
      controls.start("visible");
    }else{
            controls.start("hidden");

    }
  }, [inView, controls])

  
  const cardDetails = [
    {
      title: "Football Tournament",
      text: "Bringing Kwara youths together through inter-community football that fosters unity, teamwork, and fun.",
      icon: <FaFutbol className="text-2xl" />,
      color: "#22C55E", // green
    },
    {
      title: "Table Tennis Championship",
      text: "Fast, competitive, and exciting matches that strengthen focus and healthy rivalry among young players.",
      icon: <FaTableTennis className="text-2xl" />,
      color: "#3B82F6", // blue
    },
    {
      title: "Scrabble & Board Games Challenge",
      text: "Test your vocabulary and mental agility through friendly Scrabble battles and strategy-filled board games.",
      // We use a styled tile instead of an icon package that doesn't exist
      icon: (
        <div className="w-[34px] h-[34px] md:w-[50px] md:h-[50px] rounded-[8px] flex items-center justify-center text-sm md:text-lg font-semibold bg-white text-black">
          S
        </div>
      ),
      color: "#10B981", // teal
    },
    {
      title: "Ludo",
      text: "Engaging, strategy-driven games that connect minds and encourage creativity and sportsmanship.",
      icon: <FaChess className="text-2xl" />,
      color: "#A855F7", // purple
    },
    {
      title: "Games and Fun",
      text: "A vibrant platform where young engage in different kind of games and sport fearlessly and in all for fun.",
      icon: <FaMicrophoneAlt className="text-2xl" />,
      color: "#EAB308", // yellow
    },
    {
      title: "Youth Empowerment & Leadership Talks",
      text: "Inspiring sessions with mentors and leaders empowering youths to pursue purpose and community impact.",
      icon: <FaUsers className="text-2xl" />,
      color: "#EF4444", // red
    },
  ];

  // Typed Framer Motion variants with `custom` support for stagger
  const cardVariants: Variants = {
    hidden: { opacity: 0, x: -100 },
    visible: (custom: number = 0) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: custom * 0.05,
        duration: 0.3,
        ease: "easeInOut",
      },
    }),
  };

  return (
    <section className="bg-[#000306] xl:px-20 py-16" id="activities">
      <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-10">
        Our Programs & Activities
      </h2>
      <p className="text-gray-100 mb-16 max-w-3xl text-center mx-auto">
        Play With Kwara Youths connects, inspires, and empowers young people
        through sports, creativity, and purposeful engagement.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-6 px-4 py-10 text-white">
        {cardDetails.map((card, i) => (
          <motion.div
            key={i}
            className="w-full sm:w-[250px] lg:w-[300px] lg:h-[220px] p-6 rounded-2xl flex flex-col gap-3 bg-[#0d0d12] border-b-4 hover:-translate-y-1 transition-transform duration-500"
            style={{ borderBottomColor: card.color }}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            ref={ref}
            animate={controls}
            viewport={{ once: false, amount: 0.5 }}
            custom={i} // typed via Variants above
          >
            <div
              className="text-white w-[50px] h-[50px] rounded-[15px] flex items-center justify-center"
              style={{ backgroundColor: card.color }}
            >
              {/* if icon is the small tile div, it will render fine */}
              {card.icon}
            </div>

            <div>
              <p className="font-semibold text-[17px]">{card.title}</p>
              <p className="text-[13px] text-gray-300 mt-1">{card.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
