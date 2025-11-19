import React, { Camera } from 'react';
import { Link } from 'react-router';
import { HiOutlineSparkles } from 'react-icons/hi2';

function HomePage() {
  return (
    <div className="bg-gradient-to-br from-base-100 via-base-200 to-base-300">
      {/* NABBAR */}
      <nav className="bg-base-100/80 backdrop-blur-md border-b border-primary/20 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto p-4 flex items-center justify-between">
          {/* logo */}
          <Link
            to={'/'}
            className="flex items-center gap-3 hover:scale-105 transition-transform duration-150 "
          >
            <div className="size-10 rounded-xl bg-[#057357] flex items-center justify-center shadow-lg">
              <HiOutlineSparkles className="size-6 text-white" />
            </div>

            <div className="flex flex-col">
              <span className="font-black text-xl bg-[#0ae8ad] bg-clip-text text-transparent font-mono tracking-wider">
                InterviewX
              </span>
            </div>
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default HomePage;
