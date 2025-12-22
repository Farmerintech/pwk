
import emir from "../../assets/emir.jpeg"
import rahman from "../../assets/rahman.webp"
import bolaji from "../../assets/bolaji.jpg"
import saliu from "../../assets/saliu.jpeg"
import tolani from "../../assets/tolani.webp"
import hall1 from "../../assets/hall1.jpg"
import hall2 from "../../assets/hall2.jpg"
import hall3 from "../../assets/hall3.jpg"
import hall4 from "../../assets/hall4.jpg"
import hall5 from "../../assets/hall5.jpg"

// ---------------- ENDORSEMENTS ----------------

const endorsements = [
  {
    name: "Alhaji (Dr.) Ibrahim Sulu Gambari.",
    title: "Emir of Ilorin",
    image: emir,
    message:"“Play With Kwara Youths is a commendable initiative that promotes unity, peace, and youth development across Kwara State. I am pleased with its vision and achievements and give it my royal blessings.” "
    },
  {
    name: "Hon. Bola Magaji",
    title: "Former Commissioner for Youth and Sports Development",
    image: bolaji,
    message:"Play With Kwara Youths is a unifying, non-partisan initiative that strengthens togetherness among young people, and I am proud to be identified with its vision and growth."  },
  {
    name: "Governor AbdulRahman AbdulRazaq",
    title: "Kwara State Governor",
    image: rahman,
    message:"“Play With Kwara Youths promotes unity, youth development, and active engagement, showcasing the impact of a shared platform that brings young people together.”  "
  },
  {
    name: "Hon. Muktar Tolani Shagaya",
    title: "member representing Ilorin West/Asa at the House of Representatives",
    image: tolani,
    message:
      "Seeing the enthusiasm and creativity this event brings is inspiring. It’s not just about sports — it’s about creating opportunities for every youth to shine.",
  },
  {
    name: "Mallam Saliu Mustapha",
    title: "Senator Representing Kwara Central",
    image: saliu,
    message:
      "I’m proud to see Kwara youths using sports and creativity as tools for unity and purpose. Every young person deserves a chance to play, learn, and grow.",
  },
];

export const Endorsements = () => {
  return (
    <section className="bg-black py-16 mt-5 px-5 md:px-10 xl:px-20 overflow-hidden">
      <h2 className="text-center text-[20px] md:text-[36px] font-bold mb-12 text-gray-50">
        What Influential People Say About Play With Kwara
      </h2>

      <div className="relative w-full overflow-hidden">
        <div className="marquee gap-10">
          {endorsements.map((e, i) => (
            <Card key={i} data={e} />
          ))}
          {endorsements.map((e, i) => (
            <Card key={`copy-${i}`} data={e} />
          ))}
        </div>
      </div>
    </section>
  );
};

// ---------------- CARD (ENDORSEMENTS) ----------------

const Card = ({ data }: any) => (
  <div className="flex-shrink-0 w-[350px] md:w-[450px] flex flex-col bg-black/50 p-6 rounded-2xl border border-white/10 shadow-sm">
    <div className="flex items-center gap-5">
      <img
        src={data.image}
        className="w-[80px] h-[80px] rounded-xl border border-gray-200 object-cover"
      />
      <div>
        <h3 className="font-semibold text-lg text-white">{data.name}</h3>
        <p className="text-gray-50 text-sm">{data.title}</p>
      </div>
    </div>

    <p className="mt-4 text-gray-400 italic text-sm leading-relaxed">
      “{data.message}”
    </p>
  </div>
);

// ---------------- HALL OF FAME ----------------

const fames = [
  {
    name: "Yakub Shakirudeen",
    title: "Highest Goal Scorer PWK 2.0",
    image: hall1,
    nickName: "Farmerintech",
  },
  {
    name: "Yakub Shakirudeen",
    title: "Highest Goal Scorer PWK 2.0",
    image: hall2,
    nickName: "Farmerintech",
  },
  {
    name: "Yakub Shakirudeen",
    title: "Highest Goal Scorer PWK 2.0",
    image: hall3,
    nickName: "Farmerintech",
  },
  {
    name: "Mrs. Aisha Yusuf",
    title: "Best Keeper PWK 5.0",
    image: hall4,
    nickName: "Farmerintech",
  },
   {
    name: "Mrs. Aisha Yusuf",
    title: "Best Keeper PWK 5.0",
    image: hall5,
    nickName: "Farmerintech",
  },
];

const Fireworks = () => {
  return (
    <div className="pointer-events-none absolute inset-0 z-100 overflow-hidden">
      {[...Array(50)].map((_, i) => (
        <div key={i} className="firework"></div>
      ))}
    </div>
  );
};

// ---------------- HALL OF FAME SECTION ----------------

export const HallOfFame = () => {
  return (
    <section className="bg-black text-gray-900 py-16 backdrop-blur-xl px-5 md:px-10 xl:px-20 overflow-hidden">
      <div className="relative w-full">
        <Fireworks />

        <h2 className="text-center text-white text-[20px] md:text-[36px] font-bold mb-12">
          Play With Kwara Youths Hall of Fame
        </h2>

        <div className="relative w-full overflow-hidden">
          <div className="marquee2 gap-10">
            {fames.map((e, i) => (
              <Card2 key={i} data={e} />
            ))}
            {fames.map((e, i) => (
              <Card2 key={`copy-${i}`} data={e} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Card2 = ({ data }: any) => (
  <div className="flex-shrink-0 w-[300px] flex flex-col bg-black/90 border border-white/10 p-0 rounded-2xl">
    <div className="flex flex-col items-start p-3 gap-4">
      <img
        src={data.image}
        className="w-[300px] h-[300px] rounded-xl object-cover"
      />

      <div className="pl-1">
        <h3 className="font-semibold text-lg text-gray-50">{data.name}</h3>
        <p className="text-gray-400 text-sm">{data.nickName}</p>
        <p className="text-gray-400 text-sm">{data.title}</p>
      </div>
    </div>
  </div>
);
