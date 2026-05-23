import React from 'react';
import Image from 'next/image';

export default function Reservation() {
  return (
    <section id="reservation" className="py-24 bg-cafe-cream relative">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="flex flex-col lg:flex-row shadow-2xl rounded-lg overflow-hidden bg-white">
          <div className="lg:w-1/2 p-10 md:p-16 flex flex-col justify-center">
            <h3 className="text-cafe-coral font-serif italic text-2xl mb-2">Book a Table</h3>
            <h2 className="text-4xl font-serif font-bold text-cafe-brown mb-8">Reservation</h2>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="text" placeholder="Your Name" className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-cafe-coral" />
                <input type="email" placeholder="Your Email" className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-cafe-coral" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="date" className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-cafe-coral text-gray-600" />
                <input type="time" className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-cafe-coral text-gray-600" />
              </div>
              <select className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-cafe-coral text-gray-600">
                <option value="">Number of People</option>
                <option value="1">1 Person</option>
                <option value="2">2 People</option>
                <option value="3">3 People</option>
                <option value="4+">4+ People</option>
              </select>
              <button type="submit" className="button-primary w-full mt-4">
                Confirm Booking
              </button>
            </form>
          </div>
          
          <div className="lg:w-1/2 relative min-h-[400px]">
            <Image 
              src="/images/باريستا لابس كمامة.webp" 
              alt="Barista at work" 
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
