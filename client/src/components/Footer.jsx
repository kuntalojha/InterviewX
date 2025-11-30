import { HiOutlineSparkles } from 'react-icons/hi2';
import { FaLinkedin, FaGithub, FaGlobe } from 'react-icons/fa';
import { Link } from 'react-router';
function Footer() {
  return (
    <footer className="bg-base-200 border-t border-green-900 pt-5">
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col gap-8">
        {/* Top Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
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
          </div>

          {/* 🌐 Social Links in Middle */}
          <div className="flex items-center gap-6">
            <a
              href="https://kuntalojha.github.io/MRKUNTALOJHA/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base-content/60 hover:text-[#0ae8ad] transition-colors text-xl"
            >
              <FaGlobe className="size-7" />
            </a>

            <a
              href="https://linkedin.com/in/mrkuntalojha"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base-content/60 hover:text-[#0ae8ad] transition-colors text-xl"
            >
              <FaLinkedin className="size-7" />
            </a>

            <a
              href="https://github.com/kuntalojha"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base-content/60 hover:text-[#0ae8ad] transition-colors text-xl"
            >
              <FaGithub className="size-7" />
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
