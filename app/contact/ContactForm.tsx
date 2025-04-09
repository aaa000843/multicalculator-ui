'use client';

import { useState } from 'react';
import { FeedbackRequest, FeedbackResponse } from './models/feedback';
import { toast } from "@/lib/toast";
import { request, requestErrorMessage } from '@/lib/axios/request';
import { RequestError } from '@/lib/axios/@types';

export default function ContactForm() {
  const [formData, setFormData] = useState<FeedbackRequest>({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await request<FeedbackResponse>('/api/v1/feedback', {method: "POST", data: formData});
     
      toast.success('Thank you for your feedback!');
      setFormData({ name: '', email: '', message: '' });
      
    } catch (error) {
      
      const errorMessage = requestErrorMessage(error as RequestError, "Failed to send feedback. Please try again later.");
      toast.error(errorMessage);
      console.error('Feedback submission error:', errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md border border-purple-100">
      <form className="space-y-6" onSubmit={handleSubmit}>
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
            value={formData.name}
            onChange={handleChange}
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
            value={formData.email}
            onChange={handleChange}
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
            value={formData.message}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </div>
      </form>
    </div>
  );
} 