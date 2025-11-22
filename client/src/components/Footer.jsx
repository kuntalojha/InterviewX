import { HiOutlineSparkles } from 'react-icons/hi2';
import { FaLinkedin, FaGithub, FaGlobe } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-base-200 border-t border-base-300 mt-10">
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col gap-8">
        {/* Top Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-[#057357] flex items-center justify-center shadow-lg">
              <HiOutlineSparkles className="size-6 text-white" />
            </div>
            <span className="font-black text-xl bg-[#0ae8ad]/80 bg-clip-text text-transparent font-mono tracking-wider">
              InterviewX
            </span>
          </div>

          {/* 🌐 Social Links in Middle */}
          <div className="flex items-center gap-6">
            <a
              href="https://kuntalojha.github.io/MRKUNTALOJHA/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base-content/60 hover:text-[#057357] transition-colors text-xl"
            >
              <FaGlobe className="size-6" />
            </a>

            <a
              href="https://linkedin.com/in/mrkuntalojha"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base-content/60 hover:text-[#057357] transition-colors text-xl"
            >
              <FaLinkedin className="size-6" />
            </a>

            <a
              href="https://github.com/kuntalojha"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base-content/60 hover:text-[#057357] transition-colors text-xl"
            >
              <FaGithub className="size-6" />
            </a>
          </div>
        </div>

        {/* Bottom Section */}
        <p className="text-sm text-base-content/60 text-center">
          © {new Date().getFullYear()}{' '}
          <span className="font-semibold">InterviewX</span>. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
