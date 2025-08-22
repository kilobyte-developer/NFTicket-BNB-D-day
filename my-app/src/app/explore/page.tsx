"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, MapPin, Calendar, Filter, Verified, Star, Users, Clock, Zap } from 'lucide-react';
import Card from '@/components/Card';

export default function EventExplorer() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const filters = ['All', 'Music', 'College', 'Tech', 'Conference', 'Sports', 'Art'];
  
  const events = [
    {
      id: 1,
      title: 'Campus Fest 2025',
      date: 'Sep 21, 7:00 PM',
      location: 'IIT Campus Arena',
      price: '$25',
      image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
      verified: true,
      category: 'Music',
      ticketType: 'General',
      attendees: 1250,
      rating: 4.8,
      nftCollection: 'Exclusive Festival NFTs',
      blockchain: 'Ethereum'
    },
    {
      id: 2,
      title: 'Tech Conference Night',
      date: 'Oct 03, 9:00 AM',
      location: 'City Expo Center',
      price: '$120',
      image: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
      verified: true,
      category: 'Tech',
      ticketType: 'VIP',
      attendees: 850,
      rating: 4.9,
      nftCollection: 'TechCon Commemorative',
      blockchain: 'Polygon'
    },
    {
      id: 3,
      title: 'Indie Beats Live',
      date: 'Nov 11, 8:30 PM',
      location: 'Bluebird Hall',
      price: '$35',
      image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      verified: true,
      category: 'Music',
      ticketType: 'General',
      attendees: 650,
      rating: 4.7,
      nftCollection: 'Indie Music Vault',
      blockchain: 'Solana'
    },
    {
      id: 4,
      title: 'Art Gallery Opening',
      date: 'Oct 15, 6:00 PM',
      location: 'Modern Art Museum',
      price: '$45',
      image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1158&q=80',
      verified: true,
      category: 'Art',
      ticketType: 'Premium',
      attendees: 320,
      rating: 4.6,
      nftCollection: 'Digital Art Showcase',
      blockchain: 'Ehereum'
    },
    {
      id: 5,
      title: 'Blockchain Summit',
      date: 'Dec 05, 10:00 AM',
      location: 'Convention Center',
      price: '$199',
      image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      verified: true,
      category: 'Conference',
      ticketType: 'VIP',
      attendees: 2100,
      rating: 4.9,
      nftCollection: 'Web3 Pioneer Pass',
      blockchain: 'Ethereum'
    },
    {
      id: 6,
      title: 'Electronic Paradise',
      date: 'Nov 25, 9:00 PM',
      location: 'Warehouse District',
      price: '$55',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      verified: true,
      category: 'Music',
      ticketType: 'General',
      attendees: 1800,
      rating: 4.8,
      nftCollection: 'Electronic Vibes',
      blockchain: 'Polygon'
    }
  ];

  const filteredEvents = events.filter(event => {
    const matchesFilter = activeFilter === 'All' || event.category === activeFilter;
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });


  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Animated Background from Login Page */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/12 w-96 h-96 bg-gradient-to-br from-purple-600/20 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/12 w-96 h-96 bg-gradient-to-br from-blue-600/10 to-purple-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-black/50 backdrop-blur-2xl border-b border-purple-500/10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                {/* Logo */}
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-700 rounded-xl flex items-center justify-center">
                    <span className="text-white font-medium text-lg">N</span>
                  </div>
                  <span className="text-2xl font-medium bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 bg-clip-text text-transparent">
                    NFTicket
                  </span>
                </div>
              </div>
              
              <nav className="hidden lg:flex items-center space-x-8">
                <Link to="/" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Home</Link>
                <Link to="/explore" className="text-sm font-medium text-purple-400 transition-colors">Explore</Link>
                <Link to="/my-tickets" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">My Tickets</Link>
                <Link to="/events" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Events</Link>
              </nav>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-medium bg-gradient-to-r from-purple-400 via-purple-300 to-purple-600 bg-clip-text text-transparent mb-4">
              Discover NFT Events
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Experience the future of event ticketing with blockchain technology. Mint exclusive NFT tickets and join unforgettable experiences.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 space-y-6">
            {/* Search Bar */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-2.5 bg-gray-900/60 border border-purple-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="City"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full md:w-48 pl-12 pr-4 py-2.5 bg-gray-900/60 border border-purple-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full md:w-48 pl-12 pr-4 py-2.5 bg-gray-900/60 border border-purple-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center space-x-2 text-gray-300">
                <Filter size={18} />
                <span className="font-medium">Filters:</span>
              </div>
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                    activeFilter === filter
                      ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg shadow-purple-500/25'
                      : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700/80 border border-purple-500/20'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Stats Banner */}
          <div className="mb-12 grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: 'Active Events', value: '127', icon: Calendar },
              { label: 'NFTs Minted', value: '12.5K', icon: Zap },
              { label: 'Total Attendees', value: '45.2K', icon: Users },
              { label: 'Avg. Rating', value: '4.8', icon: Star }
            ].map((stat, index) => (
              <div key={index} className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/10 shadow-2xl shadow-purple-500/5 text-center">
                <stat.icon className="mx-auto mb-3 text-purple-400" size={24} />
                <div className="text-2xl font-medium bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <Card key={event.id} className="p-0 overflow-hidden">
                {/* NFT Badge */}
                <div className="absolute top-4 left-4 z-10 flex items-center space-x-2">
                  <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white text-xs font-medium px-2 py-1 rounded-full flex items-center space-x-1">
                    <Zap size={10} />
                    <span>NFT</span>
                  </div>
                  {event.verified && (
                    <div className="bg-green-500/20 text-green-400 text-xs font-normal px-2 py-1 rounded-full flex items-center space-x-1">
                      <Verified size={10} />
                      <span>Verified</span>
                    </div>
                  )}
                </div>

                {/* Event Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                  
                  {/* Rating */}
                  <div className="absolute top-4 right-4 z-10 bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center space-x-1">
                    <Star size={12} className="text-yellow-400 fill-current" />
                    <span className="text-white text-xs font-medium">{event.rating}</span>
                  </div>
                </div>

                {/* Event Details */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-medium bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2 group-hover:from-purple-200 group-hover:to-white transition-all duration-300">
                      {event.title}
                    </h3>
                    <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                      <div className="flex items-center space-x-1">
                        <Calendar size={14} />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin size={14} />
                        <span className="truncate max-w-32">{event.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* NFT Collection Info */}
                  <div className="bg-gradient-to-r from-purple-900/30 to-purple-800/30 rounded-lg p-3 border border-purple-500/20">
                    <div className="text-xs text-gray-300 mb-1">NFT Collection</div>
                    <div className="text-sm font-normal bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent">
                      {event.nftCollection}
                    </div>
                    <div className="text-xs text-gray-400 mt-1 flex items-center justify-between">
                      <span>Blockchain: {event.blockchain}</span>
                      <div className="flex items-center space-x-1">
                        <Users size={12} />
                        <span>{event.attendees}</span>
                      </div>
                    </div>
                  </div>

                  {/* Ticket Type and Price */}
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400">Ticket Type</span>
                      <span className="text-sm font-medium text-gray-200 bg-gradient-to-r from-gray-300 to-gray-400 bg-clip-text text-transparent">
                        {event.ticketType}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-medium bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent">
                        {event.price}
                      </div>
                      <div className="text-xs text-gray-400">per NFT</div>
                    </div>
                  </div>

                  {/* Buy Button */}
                  <button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-normal py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/30 flex items-center justify-center space-x-2">
                    <Zap size={16} />
                    <span>Mint NFT Ticket</span>
                  </button>
                </div>
              </Card>
            ))}
          </div>

          {/* Load More Button */}
          <div className="mt-12 text-center">
            <button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-normal py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30">
              Load More Events
            </button>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 border-t border-gray-800 bg-gradient-to-r from-black via-gray-900 to-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h3 className="text-2xl font-medium bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent mb-4">
                Join the Future of Events
              </h3>
              <p className="text-gray-400 max-w-md mx-auto">
                Experience exclusive events, collect unique NFTs, and be part of the blockchain revolution in entertainment.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}