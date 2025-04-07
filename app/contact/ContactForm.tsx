'use client';

import { useState } from 'react';
import env from '@/constants/env';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md border border-purple-100">
      <form 
        className="space-y-6" 
        method="post" 
        action={`mailto:${env.CONTACT_EMAIL}?subject=${[subject, "by", name].join(' ')}&body=${message}`}
      >
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full px-4 py-2 border rounded-md bg-white text-gray-700 border-purple-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-4 py-2 border rounded-md bg-white text-gray-700 border-purple-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium mb-2 text-gray-700">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            className="w-full px-4 py-2 border rounded-md bg-white text-gray-700 border-purple-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-700">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            className="w-full px-4 py-2 border rounded-md bg-white text-gray-700 border-purple-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
} 