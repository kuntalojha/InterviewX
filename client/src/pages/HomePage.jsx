import React from 'react';
import { IoVideocamOutline } from 'react-icons/io5';
import Hero from '../components/Hero';
import Navbar from '../components/HomeNavbar';
import { FaCode, FaUsers } from 'react-icons/fa6';

function HomePage() {
  return (
    <div className="bg-gradient-to-br from-base-100 via-base-200 to-base-300">
      {/* NABBAR */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

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
