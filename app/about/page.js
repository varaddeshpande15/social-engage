'use client';

import Image from 'next/image';
import Sushant from '../assets/Images/profileImage.jpg';
import Varad from '../assets/Images/Varad.jpg';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

export default function About() {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center">
      {/* Navbar */}
      <nav className="w-4/5 mx-auto py-4 px-6 flex justify-between items-center mt-2 shadow-md bg-gray-900 rounded-lg">
        <div className="flex items-center space-x-3">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2">
            <img
              src="/logo.png"
              alt="SocialEngage Logo"
              className="w-10 h-10 rounded-full"
            />
            <span className="text-lg font-bold">SocialEngage</span>
          </a>
        </div>
        <div className="hidden md:flex space-x-6">
          <a href="/" className="hover:text-purple-500 py-2">
            Home
          </a>
          <a href="/about" className="hover:text-purple-500 py-2">
            About
          </a>
          <a href="/contact" className="hover:text-purple-500 py-2">
            Contact
          </a>
        </div>
      </nav>

      {/* About Section */}
      <section
        id="about"
        className="flex flex-col justify-center items-center text-center py-24 px-4 bg-black w-full"
      >
        <h1 className="text-3xl font-bold mb-8 text-purple-500">Meet Our Team</h1>
        <div className="flex flex-wrap justify-center gap-8">
          {/* First Member */}
          <div className="bg-gray-800 p-6 rounded-3xl shadow-lg max-w-md flex flex-col items-center">
            {/* Profile Image */}
            <div className="mb-4">
              <Image
                src={Sushant}
                alt="Sushant Jadhav"
                width={150}
                height={150}
                className="rounded-full object-cover"
              />
            </div>

            {/* Role */}
            <h2 className="text-lg font-semibold text-gray-300 mb-2">
              Full-Stack Developer
            </h2>

            {/* Description */}
            <p className="text-sm text-gray-400 text-center mb-4">
              Self-taught Full-Stack Developer with expertise in Next.js,
              React.js, Shadcn, TypeScript, and an enthusiasm for AI.
              Passionate about creating scalable web solutions.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/in/sushant-jadhav-93a481291/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-400"
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href="https://github.com/sushant09112004"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-gray-500"
              >
                <FaGithub size={24} />
              </a>
            </div>
          </div>

          {/* Second Member */}
          <div className="bg-gray-800 p-6 rounded-3xl shadow-lg max-w-md flex flex-col items-center">
            {/* Profile Image */}
            <div className="mb-4">
              <Image
                src={Varad}
                alt="Varad Deshpande"
                width={150}
                height={150}
                className="rounded-full object-cover"
              />
            </div>

            {/* Role */}
            <h2 className="text-lg font-semibold text-gray-300 mb-2">
              AI Specialist
            </h2>

            {/* Description */}
            <p className="text-sm text-gray-400 text-center mb-4">
              Varad Deshpande is a skilled developer with experience in AI-powered
              solutions, leveraging data-driven insights to solve real-world problems.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/in/varaddeshpande15/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-400"
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href="https://github.com/varaddeshpande15"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-gray-500"
              >
                <FaGithub size={24} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-gray-900 text-center py-6">
        <p className="text-gray-500">
          &copy; {new Date().getFullYear()} SocialEngage. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
