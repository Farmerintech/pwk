import { FaChevronRight } from "react-icons/fa";

export const HeroSection3 = () => {


  return (
    <div
      
      className="relative h-full flex flex-col justify-between px-5 md:px-12"
    >
      {/* ================= TEXT ================= */}
      <div className="pt-28 md:pt-40 max-w-4xl">
        <p className="text-left text-[26px] sm:text-[32px] md:text-[44px] xl:text-[52px]
          font-semibold leading-tight text-white md:max-w-[400px] lg:max-w-[600px]">
          Uniting Kwara Youths Through Sports,{" "}
          <span className="text-blue-400">Creativity</span> & Purpose.
        </p>

        {/* CTA */}
        <div className="flex gap-4 mt-6 flex-col md:flex-row ">
          <button className="
            bg-white text-black px-4 py-3 rounded-full
            flex items-center justify-between md:justify-start gap-3 font-semibold text  
          ">
            <span>Get in touch</span>
            <span className="bg-black text-white p-1 rounded-full">
              <FaChevronRight size={12} />
            </span>
          </button>

          <button className="
            bg-black/30 text-white backdrop-blur-lg
            px-4 py-3 rounded-full
            flex items-center  justify-between md:justify-start gap-3 border border-white/10
          ">
            Read more
            <FaChevronRight size={12} />
          </button>
        </div>
      </div>

      {/* ================= UPCOMING EVENTS ================= */}
      <div className="
        mt-10 md:mt-0 md:absolute md:right-12 md:top-40
        w-full md:w-[320px]
      ">
        <div className="
          bg-black/30 backdrop-blur-xl backdrop-saturate-150
          border border-white/10 rounded-2xl
          px-5 py-4 text-white
        ">
          <p className="font-semibold mb-4">Upcoming Events</p>

          <div className="flex flex-col gap-4">
            {/* Event Card */}
            <div className="bg-white text-black rounded-xl p-4">
              <div className="flex justify-between text-sm mb-3">
                <span>Saturday</span>
                <span className="text-gray-500">PWKY 5.0</span>
              </div>

              <div className="flex justify-between text-sm">
                <div>
                  <p className="text-gray-500">Start</p>
                  <p>10:00am</p>
                </div>
                <p className="self-end">2hrs</p>
                <div>
                  <p className="text-gray-500">End</p>
                  <p>6:00pm</p>
                </div>
              </div>
            </div>

            {/* Event Card */}
            <div className="bg-white text-black rounded-xl p-4">
              <div className="flex justify-between text-sm mb-3">
                <span>Saturday</span>
                <span className="text-gray-500">PWKY Dinner</span>
              </div>

              <div className="flex justify-between text-sm">
                <div>
                  <p className="text-gray-500">Start</p>
                  <p>10:00am</p>
                </div>
                <p className="self-end">2hrs</p>
                <div>
                  <p className="text-gray-500">End</p>
                  <p>6:00pm</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= IMAGE AREA (DESKTOP) ================= */}
      <div className="hidden md:flex h-1/2 items-center justify-center">
        {/* keep your floating images here */}
      </div>
    </div>
  );
};


import wallpaper from "../../assets/wallpp.jpg";

export const HeroSection = () => {
  return (
    <section
      className="relative w-full h-[150vh] md:h-[100vh] bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${wallpaper})` }}
    >
      <div className="absolute inset-0 bg-black/50 z-0" />
      <div className="relative z-10 h-full">
        <HeroSection3 />
      </div>
    </section>
  );
};
