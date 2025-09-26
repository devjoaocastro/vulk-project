#!/usr/bin/env node

/**
 * Test Simple Project Generation
 * This script tests with a simple, working component
 */

const testCode = `'use client';

import React, { useState } from 'react';
import { Search, Star, Play, Heart, Share2 } from 'lucide-react';

interface Movie {
  id: number;
  title: string;
  description: string;
  rating: number;
  year: number;
  genre: string;
  image: string;
}

export default function NetflixClone() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');

  const genres = ['All', 'Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi'];

  const sampleMovies: Movie[] = [
    {
      id: 1,
      title: "The Dark Knight",
      description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
      rating: 9.0,
      year: 2008,
      genre: "Action",
      image: "https://images.unsplash.com/photo-1489599808007-1b0a0b0b0b0b?w=300&h=450&fit=crop"
    },
    {
      id: 2,
      title: "Inception",
      description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
      rating: 8.8,
      year: 2010,
      genre: "Sci-Fi",
      image: "https://images.unsplash.com/photo-1489599808007-1b0a0b0b0b0c?w=300&h=450&fit=crop"
    }
  ];

  const filteredMovies = sampleMovies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === 'All' || movie.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black to-transparent p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold text-red-600">NETFLIX</h1>
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="hover:text-gray-300">Home</a>
              <a href="#" className="hover:text-gray-300">TV Shows</a>
              <a href="#" className="hover:text-gray-300">Movies</a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search movies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-800 text-white px-10 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>
            <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md">
              Sign In
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent z-10"></div>
        <div className="relative z-20 max-w-7xl mx-auto px-4">
          <div className="max-w-2xl">
            <h2 className="text-6xl font-bold mb-4">The Dark Knight</h2>
            <p className="text-xl mb-6 text-gray-300">
              When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, 
              Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.
            </p>
            <div className="flex space-x-4">
              <button className="bg-white text-black px-8 py-3 rounded-md font-semibold hover:bg-gray-200 flex items-center">
                <Play className="w-5 h-5 mr-2" />
                Play
              </button>
              <button className="bg-gray-600 bg-opacity-70 text-white px-8 py-3 rounded-md font-semibold hover:bg-opacity-80 flex items-center">
                <Heart className="w-5 h-5 mr-2" />
                My List
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Genre Filter */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex space-x-4 mb-8">
            {genres.map(genre => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={\`px-6 py-2 rounded-full font-semibold transition-colors \${
                  selectedGenre === genre 
                    ? 'bg-white text-black' 
                    : 'bg-gray-800 text-white hover:bg-gray-700'
                }\`}
              >
                {genre}
              </button>
            ))}
          </div>

          {/* Movies Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredMovies.map(movie => (
              <div key={movie.id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="w-full h-64 object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
                      <button className="bg-white text-black p-2 rounded-full hover:bg-gray-200">
                        <Play className="w-4 h-4" />
                      </button>
                      <button className="bg-gray-600 text-white p-2 rounded-full hover:bg-gray-500">
                        <Heart className="w-4 h-4" />
                      </button>
                      <button className="bg-gray-600 text-white p-2 rounded-full hover:bg-gray-500">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mt-2">
                  <h3 className="font-semibold text-sm truncate">{movie.title}</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <span className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      {movie.rating}
                    </span>
                    <span>{movie.year}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Jobs</a></li>
                <li><a href="#" className="hover:text-white">Press</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">Terms of Use</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-white">Corporate Information</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Facebook</a></li>
                <li><a href="#" className="hover:text-white">Twitter</a></li>
                <li><a href="#" className="hover:text-white">Instagram</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
            <p>© 2024 Netflix Clone. Generated by VULK - AI-Powered UI Generator</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
`;

async function testSimpleProject() {
  console.log('🧪 Testing Simple Project Generation...\n');

  try {
    const response = await fetch('http://localhost:3000/api/flyio/deploy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code: testCode,
        uiId: 'simple-test-' + Date.now(),
        userId: 'test-user',
        sessionId: 'test-session',
        projectName: 'Netflix Clone'
      }),
    });

    const result = await response.json();

    if (result.success) {
      console.log('✅ Simple Project Generated Successfully!');
      console.log(`🌐 Live URL: ${result.projectUrl}`);
      console.log(`📱 App Name: ${result.appName}`);
      console.log(`🆔 Deployment ID: ${result.deploymentId}`);
      
      console.log('\n📁 Project includes:');
      console.log('   ✅ Next.js 14 with App Router');
      console.log('   ✅ React 18 with TypeScript');
      console.log('   ✅ Tailwind CSS for styling');
      console.log('   ✅ API routes (/api/health)');
      console.log('   ✅ Docker containerization');
      console.log('   ✅ Health checks');
      console.log('   ✅ Global CDN');
      console.log('   ✅ Production optimizations');
      
      if (result.logs && result.logs.length > 0) {
        console.log('\n📋 Deployment Logs:');
        result.logs.forEach(log => console.log(`   ${log}`));
      }

      console.log('\n🎯 Test the live app:');
      console.log(`   Open: ${result.projectUrl}`);
      console.log('   Features: Netflix clone with search, filters, responsive design');
      console.log('   API: Health check at /api/health');
    } else {
      console.log('❌ Simple project generation failed!');
      console.log(`Error: ${result.error}`);
      console.log(`Message: ${result.message}`);
    }
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('\n💡 Make sure your VULK server is running:');
    console.log('   npm run dev');
  }
}

// Run the test
testSimpleProject();
