import Jamil from "../../assets/jamil.jpg";
import Mataya from "../../assets/matayas.jpg";
import Haleemah from "../../assets/haleemah.jpg";
import Yakub from "../../assets/yakub.jpg";

const endorsements = [
  {
    name: "Governor AbdulRahman AbdulRazaq",
    title: "Executive Governor, Kwara State",
    image: Jamil,
    message: "Play With Kwara Youth is more than a sports event—it’s a movement that builds unity, passion, and purpose among our young people. I’m proud to support this vision that inspires the next generation of leaders.",
  },
  {
    name: "Hon. Bola Magaji",
    title: "Commissioner for Youth and Sports Development",
    image: Mataya,
    message: "This initiative gives our youths a strong sense of belonging and showcases their potential. It aligns perfectly with our drive to empower young talents across Kwara State.",
  },
  {
    name: "Mallam Abdulrahman Olohungbebe",
    title: "Community Development Advocate",
    image: Yakub,
    message: "Play With Kwara Youth is a platform that promotes inclusion, teamwork, and self-expression. It’s an example of what youth-led collaboration can achieve when given the right platform.",
  },
  {
    name: "Mrs. Aisha Yusuf",
    title: "Entrepreneur & Youth Mentor",
    image: Haleemah,
    message: "Seeing the enthusiasm and creativity this event brings is inspiring. It’s not just about sports — it’s about creating opportunities for every youth to shine.",
  }, 
  { name: "Tunde Ahmed", 
    title: "Former National Footballer", 
    image: Yakub, 
    message: "I’m proud to see Kwara youths using sports and creativity as tools for unity and purpose. This event reminds us that every young person deserves a chance to play, learn, and grow.", },];
export const Endorsements = () => {
  return (
    <section className="bg-[#000306] text-white py-16 px-5 md:px-10 xl:px-20 overflow-hidden">
      <h2 className="text-center text-[20px] md:text-[36px] font-bold mb-12">
        What Influencial People Say About Play With Kwara
      </h2>

      {/* Container for infinite scroll */}
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

const Card = ({ data }: any) => (
  <div className="flex-shrink-0 w-[350px] md:w-[450px] flex flex-col bg-[#0d0d12] p-6 rounded-2xl border border-white/10">
    <div className="flex items-center gap-5">
      <img
        src={data.image}
        className="w-[80px] h-[80px] rounded-xl border-2 border-white/20 object-cover"
      />
      <div>
        <h3 className="font-semibold text-lg">{data.name}</h3>
        <p className="text-gray-400 text-sm">{data.title}</p>
      </div>
    </div>

    <p className="mt-4 text-gray-300 italic text-sm leading-relaxed">
      “{data.message}”
    </p>
  </div>
);



const fames = [
  {
    name: "Yakub Shakirudeen",
    title: "Highest goal Scrorer PWK 2.0",
    image: Jamil,
    nickName:"Farmerintech"
  },
   {
    name: "Yakub Shakirudeen",
    title: "Highest goal Scrorer PWK 2.0",
    image: Mataya,
    nickName:"Farmerintech"
  },
   {
    name: "Yakub Shakirudeen",
    title: "Highest goal Scrorer PWK 2.0",
    image: Yakub,
    nickName:"Farmerintech"
  },
  {
    name: "Mrs. Aisha Yusuf",
    title: "Best keeper PWK 5.0",
    image: Haleemah,
    nickName:"Farmerintech"
  }, 
]
export const HallOfFame = () => {
  return (
    <section className="bg-[#000306] text-white py-16 px-5 md:px-10 xl:px-20 overflow-hidden">
      <h2 className="text-center text-[20px] md:text-[36px] font-bold mb-12">
        Play With Kwara Youths Hall of Fame
      </h2>

      {/* Container for infinite scroll */}
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


    </section>
  );
};

const Card2 = ({ data }: any) => (
  <div className="flex-shrink-0 w-[300px] md:w-[300px] flex flex-col bg-[#0d0d12] p-0 rounded-2xl ">
    <div className="flex flex-col items-start p-2 gap-5 pb-2">
      <img
        src={data.image}
        className="w-[300px] h-[300px] rounded-xl  object-cover"
      />
      <div>
        <h3 className="font-semibold text-lg">{data.name}</h3>
        <p className="text-gray-400 text-sm">{data.nickName}</p>
        <p className="text-gray-400 text-sm">{data.title}</p>
      </div>
    </div>

    {/* <p className="mt-4 text-gray-300 italic text-sm leading-relaxed">
      “{data.message}”
    </p> */}
  </div>
);