'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
export default function HomePage() {
  const [inputValue, setInputValue] = useState('');
  const [outputValue, setOutputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setOutputValue('');

    try {
      const response = await fetch('/api/langflowrun', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inputValue }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || 'An error occurred');
        return;
      }

      const data = await response.json();
      const output =
        data.outputs?.[0]?.outputs?.[0]?.results?.message?.text ||
        'No insights found in the response.';
      setOutputValue(output);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
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
         
          <a
            href="#input-section"
            className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-5 rounded-md font-semibold"
          >
            Get Started
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="flex flex-col justify-center items-center text-center py-24 px-4"
      >
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
          Unlock Social Media Insights
        </h1>
        <p className="text-lg md:text-2xl mb-8 max-w-3xl">
          Discover actionable insights to elevate your social media strategy
          and achieve better engagement.
        </p>
        <div className="flex space-x-4">
          <button
            className="bg-purple-500 hover:bg-purple-600 text-white py-3 px-8 rounded-md font-semibold"
            onClick={() =>
              document.getElementById('input-section').scrollIntoView({ behavior: 'smooth' })
            }
          >
            Get Started
          </button>
          <a href='/docs'
           className="bg-gray-800 hover:bg-gray-700 text-white py-3 px-8 rounded-md font-semibold">
            Learn More
          </a>
        </div>
      </section>

      {/* Input Section */}
      <section
        id="input-section"
        className="bg-gray-900 py-16 px-6 flex flex-col items-center"
      >
        <h2 className="text-2xl font-bold mb-4">Enter Your Input</h2>
        <p className="text-gray-400 mb-6 text-center max-w-lg">
          Provide details about your social media content to get actionable insights and data-driven strategies.
        </p>
        <form onSubmit={handleSubmit} className="w-4/5 max-w-lg mx-auto">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter your text here..."
            className="w-full bg-gray-800 border border-gray-700 rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
            rows="4"
            required
          />
          <button
            type="submit"
            className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 px-6 rounded-md font-semibold"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Submit'}
          </button>
        </form>
        {error && <p className="text-red-500 mt-4">Error: {error}</p>}
        {outputValue && (
          <div className="mt-6 bg-gray-800 p-4 rounded-md w-4/5 max-w-lg mx-auto text-left">
            <h3 className="font-bold mb-2">Insights:</h3>
            <ReactMarkdown>{outputValue}</ReactMarkdown>
          </div>
        )}
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
