"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  MapPin, 
  Calendar, 
  Users, 
  Star, 
  Verified, 
  Zap, 
  Share2, 
  Heart, 
  Award, 
  ExternalLink, 
  Play,  
  Copy, 
  CheckCircle 
} from 'lucide-react';
import Image from 'next/image';

// Types and Interfaces
interface EventCollection {
  name: string;
  contract: string;
  blockchain: string;
  totalSupply: number;
  minted: number;
  royalties: string;
  verified: boolean;
}

interface EventArtist {
  name: string;
  verified: boolean;
  followers: number;
}

interface Event {
  id: number;
  title: string;
  subtitle: string;
  date: string;
  time: string;
  location: string;
  description: string;
  fullDescription: string;
  highlights: string[];
  gallery: string[];
  venue: string;
  category: string;
  status: string;
  verified: boolean;
  rating: number;
  totalRatings: number;
  attendees: number;
  maxCapacity: number;
  organizer: string;
  collection: EventCollection;
  artist: EventArtist;
}

type TicketRarity = 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary' | 'Mythic';
type Currency = 'ETH' | 'USD';

interface TicketType {
  id: string;
  name: string;
  price: number;
  currency: Currency;
  usdPrice: number;
  supply: number;
  minted: number;
  rarity: TicketRarity;
  attributes: string[];
  benefits: string[];
  available: boolean;
}

interface Activity {
  user: string;
  type: string;
  item: string;
  time: string;
  price: string;
}

type TabType = 'about' | 'tickets' | 'activity';

// Card Component (since it's imported but might not exist)
interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  return (
    <div 
      className={`bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

// Main Component
const EventDetailsPage: React.FC = () => {
  const [selectedTicketType, setSelectedTicketType] = useState<string>('vip');
  const [quantity, setQuantity] = useState<number>(1);
  const [showFullDescription, setShowFullDescription] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<TabType>('about');

  const eventData: Event = {
    id: 1,
    title: 'Blockchain Music Festival 2025',
    subtitle: 'The Future of Music Meets Web3',
    date: 'December 15, 2025',
    time: '6:00 PM - 2:00 AM',
    location: 'Crypto Arena, Los Angeles',
    venue: 'Main Stadium',
    category: 'Music Festival',
    status: 'On Sale',
    verified: true,
    rating: 4.9,
    totalRatings: 2847,
    attendees: 15000,
    maxCapacity: 20000,
    organizer: 'Web3 Events Co.',
    description: 'Experience the most groundbreaking music festival of 2025, where cutting-edge blockchain technology meets world-class entertainment. Join thousands of music lovers and crypto enthusiasts for an unforgettable night featuring top artists, exclusive NFT drops, and revolutionary event experiences powered by blockchain technology. This isn\'t just a concert - it\'s a glimpse into the future of entertainment.',
    fullDescription: 'The Blockchain Music Festival 2025 represents a paradigm shift in how we experience live entertainment. Built on Ethereum blockchain, every ticket is a unique NFT that grants not just entry, but access to an entire ecosystem of digital experiences. From exclusive backstage content stored on IPFS to tradeable artist collaborations, your ticket becomes a lasting piece of music history. The festival features state-of-the-art holographic performances, AI-powered light shows synchronized with smart contracts, and real-time audience participation through tokenized voting systems.',
    highlights: [
      'Headliners: Deadmau5, Grimes, 3LAU, Steve Aoki',
      'Exclusive NFT drops from performing artists',
      'VR/AR enhanced stage experiences',
      'Meet & greet with blockchain pioneers',
      'Limited edition festival merchandise NFTs',
      'Decentralized food & beverage ordering',
      'Carbon-neutral event powered by renewable energy',
      'Live streaming to metaverse venues'
    ],
    collection: {
      name: 'BMF2025 Exclusive Pass',
      contract: '0x742d35cc6634C0532925a3b8D8C0532925a3b8D8',
      blockchain: 'Ethereum',
      totalSupply: 20000,
      minted: 15670,
      royalties: '5%',
      verified: true
    },
    artist: {
      name: 'Various Artists',
      verified: true,
      followers: 2400000
    },
    gallery: [
      'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      'https://images.unsplash.com/photo-1501281667305-0d4e0ab15754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
    ]
  }; 

  const ticketTypes: TicketType[] = [
    {
      id: 'general',
      name: 'General Admission',
      price: 0.15,
      currency: 'ETH',
      usdPrice: 285,
      supply: 12000,
      minted: 8945,
      rarity: 'Common',
      attributes: ['Festival Access', 'Digital Program', 'Exclusive Wallpapers'],
      benefits: ['Entry to main festival grounds', 'Access to food courts', 'Basic NFT collectible', 'Post-event digital memories'],
      available: true
    },
    {
      id: 'vip',
      name: 'VIP Experience',
      price: 0.35,
      currency: 'ETH',
      usdPrice: 665,
      supply: 5000,
      minted: 3821,
      rarity: 'Rare',
      attributes: ['VIP Access', 'Artist Meet & Greet', 'Premium Bar', 'Exclusive Merch'],
      benefits: ['Priority entry & seating', 'VIP lounge access', 'Complimentary drinks', 'Meet & greet opportunities', 'Limited edition NFT bundle', 'Backstage tour'],
      available: true
    },
    {
      id: 'legendary',
      name: 'Legendary Pass',
      price: 0.75,
      currency: 'ETH',
      usdPrice: 1425,
      supply: 500,
      minted: 387,
      rarity: 'Legendary',
      attributes: ['Lifetime Access', 'Artist Collaboration', 'Platinum Benefits', '1-of-1 Content'],
      benefits: ['Lifetime festival access', 'Co-create NFT with headliner', 'Private dinner with artists', 'Exclusive recording session', 'Custom avatar creation', 'Metaverse VIP lounge'],
      available: true
    },
    {
      id: 'founder',
      name: 'Founder Edition',
      price: 1.5,
      currency: 'ETH',
      usdPrice: 2850,
      supply: 100,
      minted: 89,
      rarity: 'Mythic',
      attributes: ['Governance Rights', 'Revenue Share', 'Co-Producer Credit', 'Immortalized'],
      benefits: ['Governance voting rights', '1% revenue sharing', 'Co-producer credit', 'Name on permanent blockchain', 'Annual dividend NFTs', 'Access to all future events'],
      available: true
    }
  ];

  const recentActivity: Activity[] = [
    { user: '0x742d...4f8e', type: 'minted', item: 'VIP Experience #3821', time: '2 min ago', price: '0.35 ETH' },
    { user: '0x8a2c...7b9f', type: 'minted', item: 'General Admission #8945', time: '5 min ago', price: '0.15 ETH' },
    { user: '0x1f6d...3e8a', type: 'minted', item: 'Legendary Pass #387', time: '12 min ago', price: '0.75 ETH' },
    { user: '0x9e4c...2d7b', type: 'minted', item: 'VIP Experience #3820', time: '18 min ago', price: '0.35 ETH' },
    { user: '0x5a8f...6c1e', type: 'minted', item: 'Founder Edition #89', time: '25 min ago', price: '1.5 ETH' }
  ];

  const getRarityColor = (rarity: TicketRarity): string => {
    switch(rarity) {
      case 'Common': return 'from-gray-500 to-gray-600';
      case 'Uncommon': return 'from-green-500 to-green-600';
      case 'Rare': return 'from-blue-500 to-purple-500';
      case 'Epic': return 'from-purple-500 to-purple-400';
      case 'Legendary': return 'from-yellow-400 to-orange-500';
      case 'Mythic': return 'from-red-500 to-red-400';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const selectedTicket = ticketTypes.find(t => t.id === selectedTicketType);
  const totalPrice = selectedTicket ? selectedTicket.price * quantity : 0;
  const totalUsdPrice = selectedTicket ? selectedTicket.usdPrice * quantity : 0;

  const handleQuantityChange = (increment: boolean): void => {
    if (increment) {
      setQuantity(prev => prev + 1);
    } else {
      setQuantity(prev => Math.max(1, prev - 1));
    }
  };

  const handleLikeToggle = (): void => {
    setIsLiked(prev => !prev);
  };

  const handleTabChange = (tab: TabType): void => {
    setActiveTab(tab);
  };

  const handleTicketSelect = (ticketId: string): void => {
    setSelectedTicketType(ticketId);
  };

  const handleShowDescription = (): void => {
    setShowFullDescription(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-30 w-full bg-black/50 backdrop-blur-lg border-b border-purple-500/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <nav className="hidden lg:flex items-center space-x-8">
              <Link href="/" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                Home
              </Link>
              <Link href="/explore" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                Explore
              </Link>
              <Link href="/my-tickets" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                My Tickets
              </Link>
              <Link href="/events" className="text-sm font-medium text-purple-400 transition-colors">
                Events
              </Link>
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
        {/* Event Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Event Image Gallery */}
          <div className="space-y-4">
            <div className="relative h-96 rounded-2xl overflow-hidden group">
              <Image
                src={eventData.gallery[0]}
                height={500}
                width={800}
                alt={eventData.title}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="bg-white/20 backdrop-blur-sm rounded-full p-6 hover:bg-white/30 transition-all duration-300">
                  <Play className="text-white" size={32} />
                </button>
              </div>
              
              {/* Status Badge */}
              <div className="absolute top-6 left-6 z-20 flex items-center space-x-2">
                <div className="bg-green-500/20 text-green-400 text-sm font-medium px-3 py-1 rounded-full">
                  {eventData.status}
                </div>
                {eventData.verified && (
                  <div className="bg-blue-500/20 text-blue-400 text-sm font-normal px-3 py-1 rounded-full flex items-center space-x-1">
                    <Verified size={14} />
                    <span>Verified</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Gallery Thumbnails */}
            <div className="grid grid-cols-4 gap-2">
              {eventData.gallery.map((img, index) => (
                <div key={index} className="h-20 rounded-lg cursor-pointer hover:opacity-75 transition-opacity overflow-hidden">
                  <Image
                    src={img} 
                    loading="lazy"
                    width={500}
                    height={500}
                    alt={`Event gallery ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Event Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="bg-gradient-to-r from-purple-600 to-purple-700 text-white text-sm font-medium px-3 py-1 rounded-full">
                  {eventData.category}
                </span>
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={handleLikeToggle}
                    className={`p-2 rounded-full transition-all duration-300 ${
                      isLiked ? 'bg-red-500/20 text-red-400' : 'bg-gray-700/50 text-gray-400 hover:text-red-400'
                    }`}
                  >
                    <Heart size={20} className={isLiked ? 'fill-current' : ''} />
                  </button>
                  <button className="p-2 rounded-full bg-gray-700/50 text-gray-400 hover:text-purple-400 transition-colors">
                    <Share2 size={20} />
                  </button>
                  <button className="p-2 rounded-full bg-gray-700/50 text-gray-400 hover:text-purple-400 transition-colors">
                    <ExternalLink size={20} />
                  </button>
                </div>
              </div>
              
              <h1 className="text-4xl font-medium bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
                {eventData.title}
              </h1>
              <p className="text-xl text-gray-300 mb-4">{eventData.subtitle}</p>
              
              {/* Rating */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-lg font-normal">{eventData.rating}</span>
                  <span className="text-gray-400">({eventData.totalRatings.toLocaleString()} reviews)</span>
                </div>
              </div>
            </div>

            {/* Event Info Grid */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <Calendar className="text-purple-400" size={20} />
                  <span className="text-sm text-gray-400">Date & Time</span>
                </div>
                <div className="font-normal">{eventData.date}</div>
                <div className="text-sm text-gray-300">{eventData.time}</div>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <MapPin className="text-purple-400" size={20} />
                  <span className="text-sm text-gray-400">Location</span>
                </div>
                <div className="font-normal">{eventData.location}</div>
                <div className="text-sm text-gray-300">{eventData.venue}</div>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <Users className="text-purple-400" size={20} />
                  <span className="text-sm text-gray-400">Attendees</span>
                </div>
                <div className="font-normal">{eventData.attendees.toLocaleString()}</div>
                <div className="text-sm text-gray-300">of {eventData.maxCapacity.toLocaleString()}</div>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <Award className="text-purple-400" size={20} />
                  <span className="text-sm text-gray-400">Organizer</span>
                </div>
                <div className="font-normal">{eventData.organizer}</div>
                <div className="text-sm text-purple-400 flex items-center space-x-1">
                  <Verified size={12} />
                  <span>Verified</span>
                </div>
              </Card>
            </div>

            {/* NFT Collection Info */}
            <Card>
              <h3 className="text-lg font-medium mb-4 bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent">
                NFT Collection Details
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Collection:</span>
                  <div className="font-normal text-white">{eventData.collection.name}</div>
                </div>
                <div>
                  <span className="text-gray-400">Blockchain:</span>
                  <div className="font-normal text-white">{eventData.collection.blockchain}</div>
                </div>
                <div>
                  <span className="text-gray-400">Total Supply:</span>
                  <div className="font-normal text-white">{eventData.collection.totalSupply.toLocaleString()}</div>
                </div>
                <div>
                  <span className="text-gray-400">Minted:</span>
                  <div className="font-normal text-white">{eventData.collection.minted.toLocaleString()}</div>
                </div>
                <div className="col-span-2">
                  <span className="text-gray-400">Contract Address:</span>
                  <div className="font-mono text-xs text-purple-400 flex items-center space-x-2">
                    <span>{eventData.collection.contract}</span>
                    <button className="hover:text-purple-300 transition-colors">
                      <Copy size={14} />
                    </button>
                    <span className="text-xs text-gray-400">(Ethereum)</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="border-b border-gray-700 mb-8">
          <div className="flex space-x-8">
            {(['about', 'tickets', 'activity'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`py-4 px-2 font-medium transition-all duration-300 capitalize ${
                  activeTab === tab
                    ? 'border-b-2 border-purple-500 text-purple-400'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === 'about' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-medium mb-6">About This Event</h2>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    {showFullDescription ? eventData.fullDescription : eventData.description}
                  </p>
                  <button 
                    onClick={handleShowDescription}
                    className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
                  >
                    {showFullDescription ? 'Show Less' : 'Read More'}
                  </button>
                </div>

                <div>
                  <h3 className="text-xl font-medium mb-4">Event Highlights</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {eventData.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center space-x-3 bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg p-3">
                        <CheckCircle className="text-green-400 flex-shrink-0" size={16} />
                        <span className="text-gray-300">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'tickets' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-medium mb-6">Select Your NFT Ticket</h2>
                <div className="space-y-4">
                  {ticketTypes.map((ticket) => (
                    <Card
                      key={ticket.id}
                      className={`relative cursor-pointer transition-all duration-300 ${
                        selectedTicketType === ticket.id
                          ? 'border-purple-500 shadow-lg shadow-purple-500/20'
                          : 'border-transparent hover:border-gray-600'
                      }`}
                      onClick={() => handleTicketSelect(ticket.id)}
                    >
                      <div className={`absolute top-4 right-4 w-3 h-3 rounded-full border-2 ${
                        selectedTicketType === ticket.id
                          ? 'bg-purple-500 border-purple-500'
                          : 'border-gray-400'
                      }`} />
                      
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-xl font-medium">{ticket.name}</h3>
                            <div className={`bg-gradient-to-r ${getRarityColor(ticket.rarity)} text-white text-xs font-medium px-2 py-1 rounded-full`}>
                              {ticket.rarity}
                            </div>
                          </div>
                          <div className="text-3xl font-medium bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent">
                            {ticket.price} {ticket.currency}
                          </div>
                          <div className="text-sm text-gray-400">${ticket.usdPrice} USD</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-400">Available</div>
                          <div className="font-normal">{(ticket.supply - ticket.minted).toLocaleString()}</div>
                          <div className="text-xs text-gray-500">of {ticket.supply.toLocaleString()}</div>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="font-normal mb-2">Benefits Include:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {ticket.benefits.map((benefit, index) => (
                            <div key={index} className="flex items-center space-x-2 text-sm">
                              <CheckCircle className="text-green-400 flex-shrink-0" size={14} />
                              <span className="text-gray-300">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'activity' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-medium mb-6">Recent Activity</h2>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full flex items-center justify-center">
                            <Zap size={16} className="text-white" />
                          </div>
                          <div>
                            <div className="font-normal">{activity.user}</div>
                            <div className="text-sm text-gray-400">{activity.type} {activity.item}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-normal text-purple-400">{activity.price}</div>
                          <div className="text-xs text-gray-400">{activity.time}</div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Purchase Panel */}
          <div className="relative lg:col-span-1">
            <div className="sticky top-24 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700/50">
              <h3 className="text-xl font-medium mb-6">Mint Your NFT Ticket</h3>
              
              {selectedTicket && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-purple-900/30 to-purple-800/30 rounded-lg p-4 border border-purple-500/20">
                    <h4 className="font-normal mb-2">{selectedTicket.name}</h4>
                    <div className="text-2xl font-medium bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent">
                      {selectedTicket.price} ETH
                    </div>
                    <div className="text-sm text-gray-400">${selectedTicket.usdPrice} USD</div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Quantity
                    </label>
                    <div className="flex items-center space-x-3">
                      <button 
                        onClick={() => handleQuantityChange(false)}
                        className="w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center transition-colors"
                      >
                        -
                      </button>
                      <span className="text-xl font-normal px-4">{quantity}</span>
                      <button 
                        onClick={() => handleQuantityChange(true)}
                        className="w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="border-t border-gray-600 pt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400">Subtotal</span>
                      <span>{totalPrice.toFixed(3)} ETH</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400">Gas Fee (est.)</span>
                      <span>0.005 ETH</span>
                    </div>
                    <div className="flex items-center justify-between font-medium text-lg border-t border-gray-600 pt-2">
                      <span>Total</span>
                      <div>
                        <div>{(totalPrice + 0.005).toFixed(3)} ETH</div>
                        <div className="text-sm text-gray-400">${(totalUsdPrice + 9.5).toFixed(0)} USD</div>
                      </div>
                    </div>
                  </div>

                  <button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-medium py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/30 flex items-center justify-center space-x-2">
                    <Zap size={20} />
                    <span>Mint NFT Ticket</span>
                  </button>

                  <div className="text-xs text-gray-400 space-y-1">
                    <p>✓ Instant NFT minting on Ethereum</p>
                    <p>✓ Transferable and tradeable</p>
                    <p>✓ Lifetime access to digital collectibles</p>
                    <p>✓ Verified smart contract</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;