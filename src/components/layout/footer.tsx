import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/auth-context';

const Footer: React.FC = () => {
  const { userInfo } = useAuth();
  return (
    <footer className="bg-[#002B47] text-white py-16 px-10 font-sans min-h-[160px]">
      <div className="max-w-[1300px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-20 mb-2">
          {/* Logo Section */}
          <div className="flex flex-col items-end gap-5">
            <img
              src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
              alt="TMDB Logo"
              className="h-[94px] object-contain"
            />
            {!userInfo ? (
              <Link
                to="/tmdb-frontend/register"
                className="bg-white text-[#01B4E4] font-bold py-3 px-4 rounded-[8px] hover:text-[#0093C4] max-w-[280px]"
              >
                JOIN THE COMMUNITY
              </Link>
            ) : (
              <div className="bg-white text-[#01B4E4] font-bold py-3 px-4 rounded-[8px] hover:text-[#0093C4] max-w-[280px]">
                Welcome, {userInfo.username}!
              </div>
            )}
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* THE BASICS */}
            <div>
              <h3 className="text-lg font-bold mb-2">THE BASICS</h3>
              <ul className="space-y-1">
                <li>
                  <a href="#" className="hover:text-[#01B4E4]">
                    About TMDB
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#01B4E4]">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#01B4E4]">
                    Support Forums
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#01B4E4]">
                    API
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#01B4E4]">
                    System Status
                  </a>
                </li>
              </ul>
            </div>

            {/* GET INVOLVED */}
            <div>
              <h3 className="text-lg font-bold mb-2">GET INVOLVED</h3>
              <ul className="space-y-1">
                <li>
                  <a href="#" className="hover:text-[#01B4E4]">
                    Contribution Bible
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#01B4E4]">
                    Add New Movie
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#01B4E4]">
                    Add New TV Show
                  </a>
                </li>
              </ul>
            </div>

            {/* COMMUNITY */}
            <div>
              <h3 className="text-lg font-bold mb-2">COMMUNITY</h3>
              <ul className="space-y-1">
                <li>
                  <a href="#" className="hover:text-[#01B4E4]">
                    Guidelines
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#01B4E4]">
                    Discussions
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#01B4E4]">
                    Leaderboard
                  </a>
                </li>
              </ul>
            </div>

            {/* LEGAL */}
            <div>
              <h3 className="text-lg font-bold mb-2">LEGAL</h3>
              <ul className="space-y-1">
                <li>
                  <a href="#" className="hover:text-[#01B4E4]">
                    Terms of Use
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#01B4E4]">
                    API Terms of Use
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#01B4E4]">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#01B4E4]">
                    DMCA Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
