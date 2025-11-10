import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="w-full bg-gray-50 text-gray-700 py-10 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Play With Kwara Youth</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Play With Kwara Youth connects, inspires, and empowers young people through sports, creativity, and purposeful engagement.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#team" className="hover:text-green-500 transition">Our Team</a></li>
            <li><a href="#faq" className="hover:text-green-500 transition">FAQ</a></li>
            <li><a href="#contact" className="hover:text-green-500 transition">Contact</a></li>
            <li><a href="#docs" className="hover:text-green-500 transition">Documentation</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact</h3>
          <p className="text-sm text-gray-600 mb-2">support@pwkysports.io</p>
          <p className="text-sm text-gray-600">Ilorin, Kwara State, Nigeria</p>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Connect</h3>
          <div className="flex items-center gap-4">
            <a href="https://x.com" target="_blank" className="hover:text-green-500 transition">
              <FaTwitter />
            </a>
            <a href="https://linkedin.com" target="_blank" className="hover:text-green-500 transition">
              <FaLinkedin />
            </a>
            <a href="https://github.com/QuebecDagTeam/Quebec" target="_blank" className="hover:text-green-500 transition">
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-300 mt-10 pt-6 text-center text-sm text-gray-600">
        <p>© {new Date().getFullYear()} PWKY. All rights reserved.</p>
        <p className="mt-2 text-gray-700">
          <span className="font-semibold text-green-500">PWKY</span> Sports ⚡
        </p>
      </div>
    </footer>
  );
};
