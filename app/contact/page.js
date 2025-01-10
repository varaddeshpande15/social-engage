'use client';

import React, { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitted(false);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || 'An error occurred. Please try again.');
        return;
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setError('Failed to send your message. Please try again later.');
    }
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="w-4/5 mx-auto py-4 px-6 flex justify-between items-center mt-2 shadow-md bg-gray-900 rounded-lg">
        <a href="/" className="flex items-center space-x-2">
          <img
            src="/logo.png"
            alt="SocialEngage Logo"
            className="w-10 h-10 rounded-full"
          />
          <span className="text-lg font-bold">SocialEngage</span>
        </a>
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

      {/* Contact Section */}
      <section className="flex flex-col justify-center items-center text-center py-24 px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4">Get in Touch</h1>
        <p className="text-gray-400 max-w-3xl mb-8">
          Have questions or feedback? Drop us a message and we’ll get back to you as soon as possible.
        </p>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg bg-gray-900 p-8 rounded-md shadow-lg"
        >
          <div className="mb-4">
            <label htmlFor="name" className="block text-left text-gray-400">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Your Name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-left text-gray-400">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Your Email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-left text-gray-400">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows="4"
              placeholder="Your Message"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 px-6 rounded-md font-semibold"
          >
            Send Message
          </button>
        </form>
        {submitted && <p className="mt-6 text-green-500">Your message has been sent!</p>}
        {error && <p className="mt-6 text-red-500">Error: {error}</p>}
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
