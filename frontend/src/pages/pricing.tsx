import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const endorsements = [
  {
    name: "Governor AbdulRahman AbdulRazaq",
    title: "Executive Governor, Kwara State",
    image: "/assets/governor.png",
    message:
      "Play With Kwara Youth is more than a sports event—it’s a movement that builds unity, passion, and purpose among our young people. I’m proud to support this vision that inspires the next generation of leaders.",
  },
  {
    name: "Hon. Bola Magaji",
    title: "Commissioner for Youth and Sports Development",
    image: "/assets/commissioner.png",
    message:
      "This initiative gives our youths a strong sense of belonging and showcases their potential. It aligns perfectly with our drive to empower young talents across Kwara State.",
  },
  {
    name: "Mallam Abdulrahman Olohungbebe",
    title: "Community Development Advocate",
    image: "/assets/olohungbebe.png",
    message:
      "Play With Kwara Youth is a platform that promotes inclusion, teamwork, and self-expression. It’s an example of what youth-led collaboration can achieve when given the right platform.",
  },
  {
    name: "Mrs. Aisha Yusuf",
    title: "Entrepreneur & Youth Mentor",
    image: "/assets/aisha.png",
    message:
      "Seeing the enthusiasm and creativity this event brings is inspiring. It’s not just about sports — it’s about creating opportunities for every youth to shine.",
  },
  {
    name: "Tunde Ahmed",
    title: "Former National Footballer",
    image: "/assets/tunde.png",
    message:
      "I’m proud to see Kwara youths using sports and creativity as tools for unity and purpose. This event reminds us that every young person deserves a chance to play, learn, and grow.",
  },
];

export const Endorsements = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % endorsements.length);
    }, 7000); // Auto change every 7 seconds
    return () => clearInterval(timer);
  }, []);

  const active = endorsements[current];

  return (
    <section className="bg-[#000306] text-white py-16 px-5 md:px-10 xl:px-20 overflow-hidden">
      <h2 className="text-center text-[28px] md:text-[36px] font-bold mb-12">
        Endorsements
      </h2>

      <div className="relative flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="flex flex-col md:flex-row items-center justify-center gap-10"
          >
            {/* Left: Image */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="flex-1 flex justify-center"
            >
              <img
                src={active.image}
                alt={active.name}
                className="w-[250px] h-[250px] md:w-[300px] md:h-[300px] rounded-2xl object-cover border-4 border-purple-600 shadow-lg"
              />
            </motion.div>

            {/* Right: Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="flex-1 text-center md:text-left flex flex-col justify-center"
            >
              <p className="text-gray-300 text-[16px] md:text-[18px] leading-relaxed mb-4 italic">
                “{active.message}”
              </p>
              <h3 className="text-[20px] md:text-[22px] font-semibold">
                {active.name}
              </h3>
              <p className="text-sm text-gray-400">{active.title}</p>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-10 gap-3">
        {endorsements.map((_, i) => (
          <div
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
              i === current ? "bg-purple-500 scale-125" : "bg-gray-600"
            }`}
          ></div>
        ))}
      </div>
    </section>
  );
};
