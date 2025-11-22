import React, { use } from 'react';
import { Link, useLocation } from 'react-router';
import { HiOutlineSparkles } from 'react-icons/hi2';
import { FaBookOpen } from 'react-icons/fa6';
import { MdDashboardCustomize } from 'react-icons/md';
import { UserButton } from '@clerk/clerk-react';

function Navbar() {
  const location = useLocation();
  // console.log(location);
  const isActive = (path) => location.pathname === path;
  return (
    <nav className="bg-base-100/80 backdrop-blur-md border-b border-primary/20 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto p-4 flex items-center justify-between">
        {/* logo */}
        <Link
          to="/"
          className="group flex items-center gap-3 hover:scale-105 transition-transform"
        >
          <div className="size-10 rounded-xl bg-[#057357] flex items-center justify-center shadow-lg">
            <HiOutlineSparkles className="size-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-xl bg-[#0ae8ad] bg-clip-text text-transparent font-mono tracking-wider">
              InterviewX
            </span>
            <span className="text-xs text-base-content/60 font-medium -mt-1">
              Your Interview Hub
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-1">
          {/* Problems Page Link */}
          <Link
            to={'/problems'}
            className={`px-4 py-2.5 rounded-lg transition-all duration-200 ${
              isActive('/problems')
                ? 'bg-[#057357] text-green-100'
                : 'hover:bg-[#0ae8ad]/60 text-base-content/70 hover:text-base-content'
            }`}
          >
            <div className="flex items-center gap-x-2.5">
              <FaBookOpen className="size-4" />
              <span className="font-medium hidden sm:inline">Problems</span>
            </div>
          </Link>
          {/* Dashboard Page Link */}
          <Link
            to={'/dashboard'}
            className={`px-4 py-2.5 rounded-lg transition-all duration-200 ${
              isActive('/dashboard')
                ? 'bg-[#057357] text-green-100'
                : 'hover:bg-[#0ae8ad]/60 text-base-content/70 hover:text-base-content'
            }`}
          >
            <div className="flex items-center gap-x-2.5">
              <MdDashboardCustomize className="size-4" />
              <span className="font-medium hidden sm:inline">Dashboard</span>
            </div>
          </Link>
          <div className="ml-4 mt-2">
            <UserButton />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
