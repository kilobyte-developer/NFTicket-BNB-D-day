"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Filter, Calendar, MapPin, Verified, Star, Users, Clock, Zap, Download, Share2, Eye, Wallet, TrendingUp, Trophy, Gift, ExternalLink, QrCode, Shield } from 'lucide-react';
import Card from '@/components/Card';
import { Status, TicketRarity } from '../types';

interface TicketType {
  id: string | number;
  title: string;
  date: string;
  location: string;
  originalPrice: string;
  currentValue: string;
  status: Status;
  nftId: string;
  blockchain: string;
  contractAddress: string;
  rarity: TicketRarity;
  attributes: string[];
  image: string;
  qrCode: string;
  verified: boolean;
  transferable: boolean;
  resellable: boolean;
  collection: string;
  mintDate: string;
  lastSale: string;
  views: number;
  likes: number;
  category: string;
}

const MyTickets = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedView, setSelectedView] = useState('grid'); // grid or list

  const tabs = ['All', 'Upcoming', 'Past', 'Favorites', 'Collections'];

  const tickets: TicketType[] = [
    {
      id: 1,
      title: 'Campus Fest 2025',
      date: 'Sep 21, 7:00 PM',
      location: 'IIT Campus Arena',
      originalPrice: '$25',
      currentValue: '$45',
      status: 'upcoming',
      nftId: '#CF2025-001547',
      blockchain: 'Ehereum',
      contractAddress: '0x742d35cc6634C0532925a3b8D8C0532925a3b8D8',
      rarity: 'Rare',
      attributes: ['VIP Access', 'Backstage Pass', 'Limited Edition'],
      image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
      qrCode: 'QR_CODE_DATA_1',
      verified: true,
      transferable: true,
      resellable: true,
      collection: 'Campus Events 2025',
      mintDate: '2024-08-15',
      lastSale: '$42',
      views: 245,
      likes: 34,
      category: 'Music'
    },
    {
      id: 2,
      title: 'Tech Conference Night',
      date: 'Oct 03, 9:00 AM',
      location: 'City Expo Center',
      originalPrice: '$120',
      currentValue: '$135',
      status: 'upcoming',
      nftId: '#TCN2025-003421',
      blockchain: 'Polygon',
      contractAddress: '0x532925a3b8D8742d35cc6634C0532925a3b8D8C0',
      rarity: 'Epic',
      attributes: ['Networking Session', 'Swag Bag', 'Certificate'],
      image: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
      qrCode: 'QR_CODE_DATA_2',
      verified: true,
      transferable: false,
      resellable: true,
      collection: 'Tech Events Series',
      mintDate: '2024-07-22',
      lastSale: '$128',
      views: 189,
      likes: 56,
      category: 'Tech'
    },
    {
      id: 3,
      title: 'Indie Beats Live',
      date: 'Nov 11, 8:30 PM',
      location: 'Bluebird Hall',
      originalPrice: '$35',
      currentValue: '$28',
      status: 'past',
      nftId: '#IBL2024-008923',
      blockchain: 'Solana',
      contractAddress: 'So11111111111111111111111111111111111111112',
      rarity: 'Common',
      attributes: ['General Admission', 'Digital Album', 'Memories'],
      image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      qrCode: 'QR_CODE_DATA_3',
      verified: true,
      transferable: true,
      resellable: false,
      collection: 'Indie Music Vault',
      mintDate: '2024-10-01',
      lastSale: '$30',
      views: 432,
      likes: 89,
      category: 'Music'
    },
    {
      id: 4,
      title: 'Blockchain Summit',
      date: 'Dec 05, 10:00 AM',
      location: 'Convention Center',
      originalPrice: '$199',
      currentValue: '$350',
      status: 'upcoming',
      nftId: '#BCS2025-001001',
      blockchain: 'Ethereum',
      contractAddress: '0x8D8C0532925a3b8742d35cc6634C0532925a3b8D',
      rarity: 'Legendary',
      attributes: ['Founder Access', 'Private Dinner', 'Signed Poster', 'Lifetime Access'],
      image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      qrCode: 'QR_CODE_DATA_4',
      verified: true,
      transferable: true,
      resellable: true,
      collection: 'Web3 Pioneer Pass',
      mintDate: '2024-06-10',
      lastSale: '$320',
      views: 1247,
      likes: 203,
      category: 'Conference'
    },
    {
      id: 5,
      title: 'Art Gallery Opening',
      date: 'Oct 15, 6:00 PM',
      location: 'Modern Art Museum',
      originalPrice: '$45',
      currentValue: '$67',
      status: 'past',
      nftId: '#AGO2024-004567',
      blockchain: 'Ethereum',
      contractAddress: '0x925a3b8D8C0532742d35cc6634C0532925a3b8D8',
      rarity: 'Rare',
      attributes: ['Artist Meet', 'Limited Print', 'Catalog'],
      image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1158&q=80',
      qrCode: 'QR_CODE_DATA_5',
      verified: true,
      transferable: true,
      resellable: true,
      collection: 'Digital Art Showcase',
      mintDate: '2024-09-20',
      lastSale: '$62',
      views: 356,
      likes: 78,
      category: 'Art'
    }
  ];

  const portfolioStats = {
    totalTickets: tickets.length,
    totalValue: tickets.reduce((sum, ticket) => sum + parseFloat(ticket.currentValue.replace('$', '')), 0),
    totalGains: tickets.reduce((sum, ticket) => {
      const current = parseFloat(ticket.currentValue.replace('$', ''));
      const original = parseFloat(ticket.originalPrice.replace('$', ''));
      return sum + (current - original);
    }, 0),
    upcomingEvents: tickets.filter(t => t.status === 'upcoming').length
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesTab = activeTab === 'All' || 
                      (activeTab === 'Upcoming' && ticket.status === 'upcoming') ||
                      (activeTab === 'Past' && ticket.status === 'past') ||
                      (activeTab === 'Collections' && ticket.rarity !== 'Common');
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getRarityColor = (rarity: TicketRarity) => {
    switch(rarity) {
      case 'Common': return 'from-gray-500 to-gray-600';
      case 'Rare': return 'from-blue-500 to-purple-500';
      case 'Epic': return 'from-purple-500 to-purple-400';
      case 'Legendary': return 'from-yellow-400 to-orange-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getStatusColor = (status: Status) => {
    switch(status) {
      case 'upcoming': return 'text-green-400 bg-green-500/20';
      case 'past': return 'text-gray-400 bg-gray-500/20';
      case 'active': return 'text-blue-400 bg-blue-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };


  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-30 w-full bg-black/50 backdrop-blur-lg border-b border-purple-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <nav className="hidden lg:flex items-center space-x-8">
              <Link href="/" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Home</Link>
              <Link href="/explore" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Explore</Link>
              <Link href="/my-tickets" className="text-sm font-medium text-purple-400 transition-colors">My Tickets</Link>
              <Link href="/events" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Events</Link>
            </nav>
            
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-purple-600/20 to-purple-500/20 rounded-lg px-3 py-1 border border-purple-500/30">
                <span className="text-xs text-gray-300">Connected: </span>
                <span className="text-xs font-mono text-purple-400">0x742d...4f8e</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center pt-8 mb-12">
          <h1 className="text-5xl font-medium bg-gradient-to-r from-purple-500 to-purple-400 bg-clip-text text-transparent mb-4">
            My NFT Tickets
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Your digital event portfolio powered by blockchain technology. Track, manage, and trade your exclusive NFT tickets.
          </p>
        </div>

        {/* Portfolio Stats */}
        <div className="mb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gray-900/50 rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10">
            <div className="flex items-center justify-between mb-4">
              <Wallet className="text-purple-400" size={24} />
              <div className="text-sm text-gray-400">Total Tickets</div>
            </div>
            <div className="text-3xl font-medium bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent">
              {portfolioStats.totalTickets}
            </div>
          </div>
          
          <div className="bg-gray-900/50 rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="text-green-400" size={24} />
              <div className="text-sm text-gray-400">Portfolio Value</div>
            </div>
            <div className="text-3xl font-medium bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
              ${portfolioStats.totalValue.toFixed(0)}
            </div>
          </div>
          
          <div className="bg-gray-900/50 rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10">
            <div className="flex items-center justify-between mb-4">
              <Trophy className="text-yellow-400" size={24} />
              <div className="text-sm text-gray-400">Total Gains</div>
            </div>
            <div className={`text-3xl font-medium bg-gradient-to-r ${portfolioStats.totalGains >= 0 ? 'from-green-400 to-teal-400' : 'from-red-400 to-red-300'} bg-clip-text text-transparent`}>
              {portfolioStats.totalGains >= 0 ? '+' : ''}${portfolioStats.totalGains.toFixed(0)}
            </div>
          </div>
          
          <div className="bg-gray-900/50 rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10">
            <div className="flex items-center justify-between mb-4">
              <Calendar className="text-blue-400" size={24} />
              <div className="text-sm text-gray-400">Upcoming Events</div>
            </div>
            <div className="text-3xl font-medium bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {portfolioStats.upcomingEvents}
            </div>
          </div>
        </div>

        {/* Search and Tabs */}
        <div className="mb-8 space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search your tickets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-black/20 border-2 border-purple-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 text-lg"
            />
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center space-x-2 text-gray-300">
              <Filter size={18} />
              <span className="font-medium">Filter:</span>
            </div>
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg shadow-purple-500/30'
                    : 'bg-black/20 text-gray-300 hover:bg-purple-500/20 hover:text-white border border-purple-500/20'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tickets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTickets.map((ticket) => (
            <Card key={ticket.id} className="p-0 overflow-hidden h-64">
              {/* NFT Rarity Gradient Border */}
              <div className={`absolute inset-0 bg-gradient-to-r ${getRarityColor(ticket.rarity)} opacity-20 rounded-2xl`} />
              
              {/* Status and Verification Badges */}
              <div className="absolute top-4 left-4 z-10 flex items-center space-x-2">
                <div className={`text-xs font-medium px-2 py-1 rounded-full capitalize ${getStatusColor(ticket.status)}`}>
                  {ticket.status}
                </div>
                {ticket.verified && (
                  <div className="bg-green-500/20 text-green-400 text-xs font-normal px-2 py-1 rounded-full flex items-center space-x-1">
                    <Verified size={10} />
                    <span>Verified</span>
                  </div>
                )}
              </div>

              {/* Rarity Badge */}
              <div className="absolute top-4 right-4 z-10">
                <div className={`bg-gradient-to-r ${getRarityColor(ticket.rarity)} text-white text-xs font-medium px-3 py-1 rounded-full shadow-lg`}>
                  {ticket.rarity}
                </div>
              </div>

              {/* Event Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={ticket.image} 
                  alt={ticket.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                
                {/* Value Change Indicator */}
                <div className="absolute bottom-4 right-4 z-10 bg-black/60 backdrop-blur-sm rounded-lg px-2 py-1">
                  <div className={`text-xs font-medium flex items-center space-x-1 ${ 
                    parseFloat(ticket.currentValue.replace('$', '')) > parseFloat(ticket.originalPrice.replace('$', '')) 
                      ? 'text-green-400' : 'text-red-400' 
                  }`}>
                    <TrendingUp size={12} />
                    <span>{((parseFloat(ticket.currentValue.replace('$', '')) / parseFloat(ticket.originalPrice.replace('$', '')) - 1) * 100).toFixed(1)}%</span>
                  </div>
                </div>
              </div>

              {/* Ticket Details */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-medium bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2 group-hover:from-purple-200 group-hover:to-white transition-all duration-300">
                    {ticket.title}
                  </h3>
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                    <div className="flex items-center space-x-1">
                      <Calendar size={14} />
                      <span>{ticket.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin size={14} />
                      <span className="truncate max-w-32">{ticket.location}</span>
                    </div>
                  </div>
                  <div className="text-xs font-mono text-purple-400 bg-purple-900/20 px-2 py-1 rounded inline-block">
                    {ticket.nftId}
                  </div>
                </div>

                {/* NFT Collection Info */}
                <div className="bg-gradient-to-r from-purple-900/30 to-purple-800/30 rounded-lg p-3 border border-purple-500/20">
                  <div className="text-xs text-gray-300 mb-1">Collection</div>
                  <div className="text-sm font-normal bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent">
                    {ticket.collection}
                  </div>
                  <div className="text-xs text-gray-400 mt-1 flex items-center justify-between">
                    <span>Chain: {ticket.blockchain}</span>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        <Eye size={12} />
                        <span>{ticket.views}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star size={12} />
                        <span>{ticket.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Attributes */}
                <div>
                  <div className="text-xs text-gray-400 mb-2">Attributes</div>
                  <div className="flex flex-wrap gap-1">
                    {ticket.attributes.slice(0, 3).map((attr, index) => (
                      <span key={index} className="text-xs bg-gray-700/50 text-gray-300 px-2 py-1 rounded-md">
                        {attr}
                      </span>
                    ))}
                    {ticket.attributes.length > 3 && (
                      <span className="text-xs bg-gray-700/50 text-gray-300 px-2 py-1 rounded-md">
                        +{ticket.attributes.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Price Info */}
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400">Original Price</span>
                    <span className="text-sm text-gray-300">{ticket.originalPrice}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-medium bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent">
                      {ticket.currentValue}
                    </div>
                    <div className="text-xs text-gray-400">Current Value</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-3 gap-2">
                  <button className="bg-gradient-to-r from-purple-600/20 to-purple-500/20 border border-purple-500/30 text-purple-400 font-medium py-2 px-3 rounded-lg transition-all duration-300 hover:from-purple-600/40 hover:to-purple-500/40 flex items-center justify-center space-x-1 text-xs">
                    <QrCode size={14} />
                    <span>QR</span>
                  </button>
                  <button className="bg-gradient-to-r from-gray-800 to-gray-700 text-gray-300 font-medium py-2 px-3 rounded-lg transition-all duration-300 hover:from-gray-700 hover:to-gray-600 flex items-center justify-center space-x-1 text-xs">
                    <Share2 size={14} />
                    <span>Share</span>
                  </button>
                  <button className="bg-gradient-to-r from-green-600/20 to-blue-600/20 border border-green-500/30 text-green-400 font-medium py-2 px-3 rounded-lg transition-all duration-300 hover:from-green-600/40 hover:to-blue-600/40 flex items-center justify-center space-x-1 text-xs">
                    <ExternalLink size={14} />
                    <span>View</span>
                  </button>
                </div>

                {/* Transfer/Sell Options */}
                {ticket.status === 'upcoming' && (
                  <div className="grid grid-cols-2 gap-2">
                    {ticket.transferable && (
                      <button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 text-sm flex items-center justify-center space-x-1">
                        <Gift size={14} />
                        <span>Transfer</span>
                      </button>
                    )}
                    {ticket.resellable && (
                      <button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 text-sm flex items-center justify-center space-x-1">
                        <TrendingUp size={14} />
                        <span>Sell</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredTickets.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎫</div>
            <h3 className="text-2xl font-medium text-gray-400 mb-2">No Tickets Found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search or explore new events to start collecting NFT tickets.</p>
            <button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-normal py-3 px-6 rounded-xl transition-all duration-300">
              Explore Events
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTickets;