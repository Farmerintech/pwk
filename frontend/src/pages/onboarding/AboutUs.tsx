import Hero from "../../assets/basketball.jpg";

export const About = () => {
  return (
    <section className="bg-gray-50 gap-8 pt-10 px-5 md:px-10 xl:px-20 flex flex-col-reverse md:flex-row items-center justify-center">
      {/* Left: Image */}
      <div className="flex-1 flex justify-center pb-5 md:pb-0">
        <img
          src={Hero}
          alt="Play with Kwara Youth event"
          className="w-full max-w-md rounded-2xl object-cover"
        />
      </div>

      {/* Right: Text */}
      <div className="flex-1 xl:px-12">
        <p className="text-[28px] md:text-[32px] font-bold mb-4">
          About Play With Kwara Youth
        </p>

        <div className="flex flex-col gap-3 text-gray-800 leading-relaxed text-[15px]">
          <p>
            <strong>Play With Kwara Youth</strong> is an initiative designed to
            unite, empower, and celebrate the vibrant energy of young people
            across Kwara State through sports, entertainment, and community
            engagement.
          </p>

          <p>
            It serves as a platform that connects youths from different
            backgrounds—encouraging teamwork, creativity, leadership, and shared
            growth through healthy competitions and inspiring events.
          </p>

          <p>
            Beyond games and fun, the program promotes peace, inclusion, and
            youth development by giving every participant the opportunity to
            showcase their talents and strengthen community bonds.
          </p>

          <p>
            <strong>Play With Kwara Youth</strong> believes in a future where
            young people lead with passion, purpose, and unity—transforming
            Kwara into a beacon of youth-driven innovation and excellence.
          </p>
        </div>
      </div>
    </section>
  );
};
