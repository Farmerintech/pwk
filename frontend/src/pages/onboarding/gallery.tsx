import Hero from "../../assets/hero-g1.png";
import Hero2 from "../../assets/hero-b.jpg";
import Hero1 from "../../assets/hero-g1.jpg";
import Hero3 from "../../assets/hero-g3.jpg";
import Hero4 from "../../assets/hero.jpg";
import { FaArrowRight } from "react-icons/fa";

export const PWKGalleries = () => {
  const imageSources = [Hero, Hero1, Hero2, Hero3, Hero4];

  const generatePhotos = () =>
    Array.from({ length: 9 }, (_, i) => imageSources[i % imageSources.length]);

  const galleries = [
    { title: "PWK 1 Gallery", photos: generatePhotos() },
    { title: "PWK 2 Gallery", photos: generatePhotos() },
    { title: "PWK 3 Gallery", photos: generatePhotos() },
    { title: "PWK 4 Gallery", photos: generatePhotos() },
    { title: "PWK 5 Gallery", photos: generatePhotos() },
  ];

  return (
    <section className="bg-[#000306] text-white py-16 px-5 md:px-10 xl:px-20 overflow-hidden">
      <h2 className="text-center text-[28px] md:text-[36px] font-bold mb-10">
        Our Galleries
      </h2>

      <div className="relative overflow-hidden w-full">
        <div className="marquee gap-10">

          {galleries.map((gallery, i) => (
            <GalleryBox key={i} gallery={gallery} />
          ))}

          {galleries.map((gallery, i) => (
            <GalleryBox key={`copy-${i}`} gallery={gallery} />
          ))}

        </div>
      </div>
    </section>
  );
};

const GalleryBox = ({ gallery }: any) => {
  return (
    <div
      className="
        bg-[#0d0d12]
        border border-white/10
        rounded-2xl
        p-4

        w-[260px] 
        sm:w-[300px] 
        md:w-[350px] 
        lg:w-[420px] 
        xl:w-[480px]"
    >
      <h3 className=" flex justify-between item-center">
        <p className="font-semibold text-base md:text-lg mb-3">{gallery.title}</p>
        <p className="flex gap-3 justify-between hover:text-red-500 items-center">Explore <FaArrowRight/></p>
      </h3>

      {/* ✅ RESPONSIVE GRID */}
      <div
        className="
          grid 
          grid-cols-3
          sm:grid-cols-3
          md:grid-cols-3
          lg:grid-cols-3
          xl:grid-cols-3
          gap-2
          md:gap-3
        "
      >
        {gallery.photos.map((src: string, i: number) => (
          <img
            key={i}
            src={src}
            className="
            w-[80px]
              md:w-full 
              h-[80px]
              sm:h-[60px]
              md:h-[100px]
              lg:h-[110px]
              xl:h-[120px]
              object-cover 
              rounded-lg
            "
          />
        ))}
      </div>
    </div>
  );
};
