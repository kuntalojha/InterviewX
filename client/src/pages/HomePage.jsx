import React from 'react';
import { Link } from 'react-router';
import { HiOutlineSparkles } from 'react-icons/hi2';
import { BsArrowRight } from 'react-icons/bs';
import { SignInButton } from '@clerk/clerk-react';

import { GoZap } from 'react-icons/go';
import { FaCheck, FaCode, FaUsers } from 'react-icons/fa6';
import { IoVideocamOutline } from 'react-icons/io5';

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

      {/* Hero Section */}
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

      {/* Feature section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Everything you need to
            <span className="text-green-400 font-mono"> Succeed</span>
          </h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Powerfull features designed to make your coding experience
            exceptional.
          </p>
        </div>
        {/* Feature Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <div className="size-16 bg-green-300/10 rounded-2xl flex items-center justify-center mb-4">
                <IoVideocamOutline className="size-8 text-green-400" />
              </div>
              <h3 className="card-title">HD Video Call</h3>
              <p className="text-base-content/70">
                Crystal clear video and adio for seamless communication during
                coding interviews.
              </p>
            </div>
          </div>
          {/* Feature 2 */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <div className="size-16 bg-green-300/10 rounded-2xl flex items-center justify-center mb-4">
                <FaCode className="size-8 text-green-400" />
              </div>
              <h3 className="card-title">Live Code Editor</h3>
              <p className="text-base-content/70">
                Collaborate in real-time with syntax highlighting and
                multilanguage live code editor.
              </p>
            </div>
          </div>
          {/* Feature 3 */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <div className="size-16 bg-green-300/10 rounded-2xl flex items-center justify-center mb-4">
                <FaUsers className="size-8 text-green-400" />
              </div>
              <h3 className="card-title">Easy Collaboration</h3>
              <p className="text-base-content/70">
                Share your screen, chat, and collaborate with others in
                real-time during coding interviews.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
