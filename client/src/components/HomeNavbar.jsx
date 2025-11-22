import React from 'react';
import { Link } from 'react-router';
import { HiOutlineSparkles } from 'react-icons/hi2';
import { SignInButton } from '@clerk/clerk-react';
import { BsArrowRight } from 'react-icons/bs';

function Navbar() {
  return (
    <>
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
              <span className="text-xs text-base-content/60 font-medium -mt-1">
                Your Interview Hub
              </span>
            </div>
          </Link>
          {/* Auth buttons */}
          <SignInButton mode="modal">
            <button className="group px-6 py-3 bg-[#057357]  text-green-50 font-semibold text-sm shadow-lg rounded-xl hover:bg-[#0ae8ad]/60  transition-all duration-200 hover:scale-105 flex items-center gap-2">
              <span>Get Started</span>
              <BsArrowRight className="size-4 group-hover:translate-x-0.5 transform" />
            </button>
          </SignInButton>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
