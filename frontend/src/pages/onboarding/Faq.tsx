import { useState } from "react";

export const Faq = () => {
  const faqs = [
    {
      id: 1,
      question: "What is Play With Kwara Youth?",
      answer:
        "Play With Kwara Youth is a state-wide initiative that brings together young people from across Kwara through sports, creativity, and community engagement. It’s a platform to unite, empower, and inspire the next generation.",
    },
    {
      id: 2,
      question: "Who can participate in the event?",
      answer:
        "All youths residing in Kwara State are welcome to participate — whether as athletes, creatives, volunteers, or supporters. The event celebrates diversity and inclusion for everyone aged 15 to 35.",
    },
    {
      id: 3,
      question: "What activities will take place during the event?",
      answer:
        "The program features football tournaments, creative showcases, talent exhibitions, motivational talks, and community-building sessions. Each activity is designed to promote unity and leadership among youths.",
    },
    {
      id: 4,
      question: "How can I register or get involved?",
      answer:
        "You can register through our official website or at designated youth centers across Kwara. Volunteers, sponsors, and partners are also welcome to join by reaching out through our contact channels.",
    },
    {
      id: 5,
      question: "Is Play With Kwara Youth an annual event?",
      answer:
        "Yes! The event is planned as an annual celebration of youth innovation, sportsmanship, and community empowerment — with new themes and expanded programs each year.",
    },
  ];

  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <section className="w-full py-16 bg-[#0d0d12]" id="faq">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-10">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-white/20 border border-black/10 rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              <button
                className="w-full flex justify-between items-center p-5 text-left text-white font-medium"
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
              >
                {faq.question}
                <span
                  className={`text-lg transition-all ${
                    openId === faq.id ? "text-purple-500" : "text-gray-400"
                  }`}
                >
                  {openId === faq.id ? "−" : "+"}
                </span>
              </button>
              {openId === faq.id && (
                <p className="px-5 pb-5 text-gray-300 text-[15px] leading-relaxed">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
