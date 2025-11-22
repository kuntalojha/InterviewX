import React from 'react';

import { BsArrowRight } from 'react-icons/bs';
import { SignInButton } from '@clerk/clerk-react';
import { IoVideocamOutline } from 'react-icons/io5';

import { GoZap } from 'react-icons/go';
import { FaCheck } from 'react-icons/fa6';
function Hero() {
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-20 ">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side */}
          <div className="space-y-8 ]">
            <div className="badge badge-primary badge-lg bg-[#057357] text-green-100 border-0">
              <GoZap className="size-4" />
              Real-time Collaboration
            </div>
            <h1 className="text-5xl lg:text-7xl font-black leading-tight">
              <span className="bg-gradient-to-r from-[#057357] to-[#0ae8ad] bg-clip-text text-transparent">
                Let's Code Together,
              </span>
              <br />
              <span className="text-green-50">With InterviewX</span>
            </h1>
            <p className="text-xl text-base-content/70 leading-relaxed max-w-xl">
              InterviewX is a platform for coding interviews and pair
              programming. Connect face to face, code in real time, and have and
              crack your techical interviews.
            </p>

            {/* Features element */}
            <div>
              <div className="flex flex-wrap gap-3">
                <div className="badge badge-lg bg-[#01241c] badge-outline rounded-xl text-white ">
                  <FaCheck className="size-4 text-success" />
                  Live Video Chat
                </div>
                <div className="badge badge-lg bg-[#01241c] badge-outline rounded-xl text-white ">
                  <FaCheck className="size-4 text-success" />
                  Code Editor
                </div>
                <div className="badge badge-lg bg-[#01241c] badge-outline rounded-xl text-white ">
                  <FaCheck className="size-4 text-success" />
                  Multi Language
                </div>
              </div>
            </div>
            {/* CTA Button */}
            <div className="flex flex-wrap gap-4 ">
              <SignInButton mode="modal">
                <button className="btn btn-primary btn-lg bg-[#057357]  text-green-50 font-semibold text-sm shadow-lg rounded-xl hover:bg-[#0ae8ad]/60  transition-all duration-200 hover:scale-105 border-0">
                  Start Coding Now
                  <BsArrowRight className="size-5" />
                </button>
              </SignInButton>

              <button className="btn btn-outline btn-lg border-[#057357] text-green-50 font-semibold text-sm hover:bg-[#057357] rounded-xl transition-all duration-200 hover:scale-105">
                <IoVideocamOutline className="size-5" /> Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="stats stats-vertical lg:stats-horizontal bg-base-100 shadow-lg ">
              <div className="stat ">
                <div className="stat-value text-green-500">10k+</div>
                <div className="stat-title text-green-200">Active User</div>
              </div>
              <div className="stat">
                <div className="stat-value text-green-400">50k+</div>
                <div className="stat-title text-green-200">Session</div>
              </div>
              <div className="stat">
                <div className="stat-value text-green-300">99.9%</div>
                <div className="stat-title text-green-200">Uptime</div>
              </div>
            </div>
          </div>

          {/* Right side */}
          <img
            src="/hero.png"
            alt="Coding"
            className="w-full h-auto rounded-3xl shadow-2xl border-4 border-base-100 hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>
    </>
  );
}

export default Hero;
