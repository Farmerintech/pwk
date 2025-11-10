import {
  FaFutbol,
  FaTableTennis,
  FaChess,
  FaMicrophoneAlt,
  FaUsers,
} from "react-icons/fa";
import { motion, useAnimation, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import { useEffect, useRef } from "react";

export const ActivitiesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [inView, controls]);

  const cardDetails = [
    {
      title: "Football Tournament",
      text: "Bringing Kwara youths together through inter-community football that fosters unity, teamwork, and fun.",
      icon: <FaFutbol className="text-2xl" />,
      color: "#16A34A", // Green - primary identity color
    },
    {
      title: "Table Tennis Championship",
      text: "Fast, competitive, and exciting matches that strengthen focus and healthy rivalry among young players.",
      icon: <FaTableTennis className="text-2xl" />,
      color: "#0EA5E9", // Sport blue
    },
    {
      title: "Scrabble & Board Games Challenge",
      text: "Test your vocabulary and mental agility through friendly Scrabble battles and strategy-filled board games.",
      icon: (
        <div className="w-[34px] h-[34px] md:w-[50px] md:h-[50px] rounded-[8px] flex items-center justify-center font-bold bg-white text-black shadow">
          S
        </div>
      ),
      color: "#10B981", // teal/greenish
    },
    {
      title: "Ludo",
      text: "Engaging, strategy-driven games that connect minds and encourage creativity and sportsmanship.",
      icon: <FaChess className="text-2xl" />,
      color: "#8B5CF6", // purple
    },
    {
      title: "Games & Fun",
      text: "A vibrant platform where youths explore different fun activities with courage, inclusiveness, and excitement.",
      icon: <FaMicrophoneAlt className="text-2xl" />,
      color: "#EAB308", // yellow
    },
    {
      title: "Youth Empowerment & Leadership Talks",
      text: "Inspiring sessions empowering young people to discover purpose, build confidence, and create community impact.",
      icon: <FaUsers className="text-2xl" />,
      color: "#EF4444", // red
    },
  ];

  // staggered animation
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: (index: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.07,
        duration: 0.35,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section className="bg-gray-50 xl:px-20 py-20" id="activities" ref={ref}>
      <h2 className="text-3xl md:text-5xl font-bold text-gray-900 text-center mb-6">
        Our Programs & Activities
      </h2>

      <p className="text-gray-700 mb-16 max-w-3xl text-center mx-auto">
        Play With Kwara connects, inspires, and empowers young people through
        sports, creativity, learning, and purposeful interactions.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-8 px-4 py-6">
        {cardDetails.map((card, i) => (
          <motion.div
            key={i}
            className="w-full sm:w-[250px] lg:w-[300px] lg:h-[240px] p-6 rounded-2xl flex flex-col gap-4 bg-white shadow-md hover:shadow-lg border-b-4 transition-all duration-500 hover:-translate-y-2"
            style={{ borderBottomColor: card.color }}
            variants={cardVariants}
            initial="hidden"
            animate={controls}
            custom={i}
          >
            <div
              className="text-white w-[55px] h-[55px] rounded-xl flex items-center justify-center shadow"
              style={{ backgroundColor: card.color }}
            >
              {card.icon}
            </div>

            <div>
              <p className="font-semibold text-[18px] text-gray-900">
                {card.title}
              </p>
              <p className="text-[14px] text-gray-700 mt-1 leading-relaxed">
                {card.text}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
