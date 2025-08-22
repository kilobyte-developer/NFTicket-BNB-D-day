"use client"
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  Search, Calendar, MapPin, Users, TrendingUp, Star, Shield, 
  Zap, Gift, QrCode, Wallet, Copy, CheckCircle, ExternalLink,
  Bell, User, LogOut, Settings, Heart, Share2, Eye, Download,
  Filter, Plus, Ticket, Clock, Award, Music, Gamepad2, Palette,
  Code, ChevronRight, Volume2, Play, Verified, X, CreditCard,
  Sparkles, RotateCw, ArrowRight, Bookmark, Menu, Mic
} from 'lucide-react';

const NFTTicketDashboard = () => {
  const [activeTab, setActiveTab] = useState('discover');
  const [searchQuery, setSearchQuery] = useState('');
  const [isWalletConnected, setIsWalletConnected] = useState(true);
  const [showQRModal, setShowQRModal] = useState(false);
  const [currentQRCode, setCurrentQRCode] = useState('');
  const [showCreateEventModal, setShowCreateEventModal] = useState(false);
  const [showTicketDetails, setShowTicketDetails] = useState(false);
  type TicketType = typeof userTickets[number];
  const [selectedTicket, setSelectedTicket] = useState<TicketType | null>(null);
  type EventType = typeof trendingEvents[number];
  const [filteredEvents, setFilteredEvents] = useState<EventType[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<typeof userTickets>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [userData, setUserData] = useState({
    name: 'Alex Johnson',
    wallet: '0x742d35cc6634C0532925a3b8D8C0532925a3b8D8',
    balance: '4.25 ETH',
    tickets: 8,
    events: 12
  });

  // Stats counter animation
  const [stats, setStats] = useState({ events: 0, tickets: 0, users: 0, volume: 0 });
  
  useEffect(() => {
    const animateStats = () => {
      const targets = { events: 127, tickets: 12500, users: 45200, volume: 245 };
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;
      
      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        
        setStats({
          events: Math.floor(targets.events * easeOutQuart),
          tickets: Math.floor(targets.tickets * easeOutQuart),
          users: Math.floor(targets.users * easeOutQuart),
          volume: Math.floor(targets.volume * easeOutQuart)
        });
        
        if (step >= steps) clearInterval(timer);
      }, stepDuration);
    };
    
    animateStats();
  }, []);

  // Sample data for events
  const trendingEvents = [
    {
      id: 1,
      title: 'Web3 Music Festival 2025',
      date: 'Dec 15, 2025 • 6:00 PM',
      location: 'Crypto Arena, Los Angeles',
      price: '0.15 ETH',
      attendees: '15K',
      image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      category: 'music',
      verified: true,
      featured: true,
      artist: 'Deadmau5, Rezz, Kaskade',
      preview: 'https://assets.codepen.io/217233/music_preview.mp3'
    },
    {
      id: 2,
      title: 'Blockchain Developers Conference',
      date: 'Jan 20, 2026 • 9:00 AM',
      location: 'San Francisco Convention Center',
      price: '0.25 ETH',
      attendees: '3.2K',
      image: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
      category: 'tech',
      verified: true,
      featured: true,
      speaker: 'Vitalik Buterin, Changpeng Zhao'
    },
    {
      id: 3,
      title: 'NFT Art Gallery Opening',
      date: 'Feb 5, 2026 • 6:00 PM',
      location: 'Modern Art Museum, NYC',
      price: '0.08 ETH',
      attendees: '850',
      image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1158&q=80',
      category: 'art',
      verified: true,
      artist: 'Beeple, Pak, Fewocious'
    },
    {
      id: 4,
      title: 'Metaverse Gaming Championship',
      date: 'Mar 12, 2026 • 2:00 PM',
      location: 'Virtual Arena • Online Event',
      price: '0.05 ETH',
      attendees: '8.4K',
      image: 'https://images.unsplash.com/photo-1614294149710-32eec425a251?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      category: 'gaming',
      verified: false,
      game: 'Axie Infinity, The Sandbox, Decentraland'
    },
    {
      id: 5,
      title: 'Crypto Investors Summit',
      date: 'Apr 18, 2026 • 10:00 AM',
      location: 'Financial District, London',
      price: '0.35 ETH',
      attendees: '2.1K',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      category: 'tech',
      verified: true,
      speaker: 'Michael Saylor, Cathie Wood'
    },
    {
      id: 6,
      title: 'Digital Fashion Week',
      date: 'May 22, 2026 • 7:00 PM',
      location: 'Fashion Institute, Paris',
      price: '0.12 ETH',
      attendees: '1.5K',
      image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      category: 'art',
      verified: true,
      designer: 'RTFKT, Digitalax, The Fabricant'
    }
  ];

  // User's NFT tickets
  const userTickets = [
    {
      id: 1,
      event: 'Web3 Music Festival 2025',
      date: 'Dec 15, 2025 • 6:00 PM',
      location: 'Crypto Arena, Los Angeles',
      type: 'VIP Experience',
      price: '0.35 ETH',
      value: '0.45 ETH',
      status: 'upcoming',
      nftId: '#W3MF2025-VIP-0382',
      image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      rarity: 'Rare',
      benefits: ['VIP Lounge', 'Meet & Greet', 'Exclusive Merch'],
      seat: 'VIP-12, Row A, Seat 5'
    },
    {
      id: 2,
      event: 'Blockchain Developers Conference',
      date: 'Jan 20, 2026 • 9:00 AM',
      location: 'San Francisco Convention Center',
      type: 'General Admission',
      price: '0.15 ETH',
      value: '0.18 ETH',
      status: 'upcoming',
      nftId: '#BDC2026-GA-1547',
      image: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
      rarity: 'Common',
      benefits: ['Conference Access', 'Digital Materials'],
      seat: 'GA-Floor, Section 3'
    },
    {
      id: 3,
      event: 'Crypto Art Exhibition',
      date: 'Nov 28, 2025 • 4:00 PM',
      location: 'Digital Art Gallery, Miami',
      type: 'Premium Pass',
      price: '0.12 ETH',
      value: '0.15 ETH',
      status: 'past',
      nftId: '#CAE2025-PP-0893',
      image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1158&q=80',
      rarity: 'Rare',
      benefits: ['Artist Meetup', 'Limited Print'],
      seat: 'Premium-8, Row C, Seat 12'
    }
  ];

  // Categories for filtering
  const categories = [
    { id: 'all', name: 'All Events', icon: <Calendar size={16} /> },
    { id: 'music', name: 'Music', icon: <Music size={16} /> },
    { id: 'tech', name: 'Tech', icon: <Code size={16} /> },
    { id: 'art', name: 'Art', icon: <Palette size={16} /> },
    { id: 'gaming', name: 'Gaming', icon: <Gamepad2 size={16} /> }
  ];

  // Initialize filtered data
  useEffect(() => {
    setFilteredEvents(trendingEvents);
    setFilteredTickets(userTickets);
  }, []);

  // Search functionality
  useEffect(() => {
    const filtered = trendingEvents.filter(event => 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (event.artist && event.artist.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (event.speaker && event.speaker.toLowerCase().includes(searchQuery.toLowerCase())) ||
      event.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setFilteredEvents(filtered);
  }, [searchQuery]);

  // Category filter
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredEvents(trendingEvents);
    } else {
      const filtered = trendingEvents.filter(event => event.category === selectedCategory);
      setFilteredEvents(filtered);
    }
  }, [selectedCategory]);

  // Generate a random QR code
  const generateRandomQR = () => {
    const randomString = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    setCurrentQRCode(randomString);
    setShowQRModal(true);
  };

  // Handle ticket details view
  const handleViewDetails = (ticket: typeof userTickets[number]) => {
    setSelectedTicket(ticket);
    setShowTicketDetails(true);
  };

  // Handle buying a ticket
  const handleBuyTicket = (event: typeof trendingEvents[number]) => {
    setSelectedTicket({
      id: event.id,
      event: event.title,
      date: event.date,
      location: event.location,
      type: 'General Admission',
      price: event.price,
      value: event.price, // You may want to set a different value if needed
      status: 'upcoming',
      nftId: `#${event.title.substring(0, 3).toUpperCase()}${Math.floor(1000 + Math.random() * 9000)}`,
      image: event.image,
      rarity: 'Common',
      benefits: ['Event Access'], // You can customize benefits based on event/category
      seat: `GA-${Math.floor(Math.random() * 20) + 1}, Row ${String.fromCharCode(65 + Math.floor(Math.random() * 10))}, Seat ${Math.floor(Math.random() * 30) + 1}`
    });
    setShowTicketDetails(true);
  };

  // Handle audio play/pause
  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Update audio progress
  const updateProgress = () => {
    if (audioRef.current) {
      const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setAudioProgress(progress || 0);
    }
  };

  // Create Event Modal
  const CreateEventModal = () => (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 w-full max-w-2xl border border-purple-500/30">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-medium bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent">
            Create New Event
          </h2>
          <button 
            onClick={() => setShowCreateEventModal(false)}
            className="p-2 rounded-full hover:bg-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Event Name</label>
              <input 
                type="text" 
                className="w-full bg-gray-800/50 border border-purple-500/20 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter event name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
              <select className="w-full bg-gray-800/50 border border-purple-500/20 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option>Music</option>
                <option>Tech</option>
                <option>Art</option>
                <option>Gaming</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Date</label>
              <input 
                type="date" 
                className="w-full bg-gray-800/50 border border-purple-500/20 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Time</label>
              <input 
                type="time" 
                className="w-full bg-gray-800/50 border border-purple-500/20 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
            <input 
              type="text" 
              className="w-full bg-gray-800/50 border border-purple-500/20 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter event location"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
            <textarea 
              rows={4}
              className="w-full bg-gray-800/50 border border-purple-500/20 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Describe your event"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Ticket Price (ETH)</label>
            <input 
              type="number" 
              step="0.01"
              className="w-full bg-gray-800/50 border border-purple-500/20 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="0.00"
            />
          </div>
          
          <div className="pt-4">
            <button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-medium py-3 rounded-xl transition-all">
              Create Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // QR Code Modal
  const QRModal = () => (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 w-full max-w-md border border-purple-500/30">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-medium bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent">
            Your Ticket QR Code
          </h2>
          <button 
            onClick={() => setShowQRModal(false)}
            className="p-2 rounded-full hover:bg-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-64 h-64 bg-white p-4 rounded-xl">
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <div className="text-center">
                <div className="text-black font-mono text-xs mb-2">QR Code</div>
                <div className="text-black font-mono text-sm">{currentQRCode}</div>
              </div>
            </div>
          </div>
          
          <p className="text-gray-400 text-center">
            Present this QR code at the event entrance for verification.
          </p>
          
          <button className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors">
            <Download size={18} />
            <span>Download QR Code</span>
          </button>
        </div>
      </div>
    </div>
  );

  // Ticket Details Modal with purchase option
  const TicketDetailsModal = () => (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl w-full max-w-2xl border border-purple-500/30 overflow-hidden">
        <div className="relative h-48">
          <img 
            src={selectedTicket?.image ?? ""} 
            alt={selectedTicket?.event ?? ""}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          
          <button 
            onClick={() => setShowTicketDetails(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <div className={`text-xs font-medium px-2 py-1 rounded-full ${
                  selectedTicket && selectedTicket.status === 'upcoming' 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-gray-500/20 text-gray-400'
                }`}>
                  {(selectedTicket?.status) || 'Available'}
                </div>
                <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white text-xs font-medium px-2 py-1 rounded-full">
                  {selectedTicket?.rarity || 'New'}
                </div>
              </div>
              <h3 className="text-2xl font-medium text-white">{'event' in (selectedTicket ?? {}) ? selectedTicket?.event : (selectedTicket as any)?.title}</h3>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-2">Event Details</h4>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-300">
                  <Calendar size={16} className="mr-2" />
                  <span>{selectedTicket?.date}</span>
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <MapPin size={16} className="mr-2" />
                  <span>{selectedTicket?.location}</span>
                </div>
                {selectedTicket && selectedTicket.nftId && (
                  <div className="text-sm font-mono text-purple-400 mt-2">
                    {selectedTicket.nftId}
                  </div>
                )}
                {selectedTicket && selectedTicket.seat && (
                  <div className="text-sm text-gray-300 mt-2">
                    <span className="text-gray-400">Seat: </span>
                    {selectedTicket.seat}
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-2">Ticket Information</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Type:</span>
                  <span className="text-white">{selectedTicket?.type || 'General Admission'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Price:</span>
                  <span className="text-white">{selectedTicket?.price}</span>
                </div>
                {selectedTicket && selectedTicket.value && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Current Value:</span>
                    <span className="text-green-400">{selectedTicket.value}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {selectedTicket && selectedTicket.benefits && (
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-400 mb-2">Benefits</h4>
              <div className="flex flex-wrap gap-2">
                {selectedTicket.benefits.map((benefit, index) => (
                  <span key={index} className="text-xs bg-gray-700/50 text-gray-300 px-3 py-1.5 rounded-md">
                    {benefit}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-3">
            {selectedTicket && selectedTicket.status ? (
              <>
                <button 
                  onClick={generateRandomQR}
                  className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-3 px-4 rounded-xl transition-all flex items-center justify-center space-x-2"
                >
                  <QrCode size={18} />
                  <span>Show QR Code</span>
                </button>
                <button className="bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-gray-300 py-3 px-4 rounded-xl transition-all flex items-center justify-center space-x-2">
                  <Share2 size={18} />
                  <span>Share Ticket</span>
                </button>
              </>
            ) : (
              <>
                <button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-3 px-4 rounded-xl transition-all flex items-center justify-center space-x-2">
                  <CreditCard size={18} />
                  <span>Buy Now</span>
                </button>
                <button className="bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-gray-300 py-3 px-4 rounded-xl transition-all flex items-center justify-center space-x-2">
                  <Bookmark size={18} />
                  <span>Save for Later</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // Floating animated elements
  const FloatingElements = () => (
    <div className="fixed inset-0 overflow-hidden z-0 pointer-events-none">
      {/* Animated Background */}
      <div className="absolute top-1/4 left-1/12 w-96 h-96 bg-gradient-to-br from-purple-600/20 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/12 w-96 h-96 bg-gradient-to-br from-blue-600/10 to-purple-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
     
    </div>
  );

  // Animated text component
  const AnimatedText = ({ text, className = "" }: { text: string; className?: string }) => {
    const letters = text.split("");
    
    return (
      <div className={`flex ${className}`}>
        {letters.map((letter, i) => (
          <span 
            key={i}
            className="inline-block animate-text-rise"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            {letter === " " ? "\u00A0" : letter}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Floating animated elements */}
      <FloatingElements />
      
      {/* Audio element for event previews */}
      <audio 
        ref={audioRef}
        onTimeUpdate={updateProgress}
        onEnded={() => setIsPlaying(false)}
        src="https://assets.codepen.io/217233/music_preview.mp3"
      />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-2xl border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-700 rounded-xl flex items-center justify-center">
                <span className="text-white font-medium text-lg">N</span>
              </div>
              <span className="text-2xl font-medium bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 bg-clip-text text-transparent">
                NFTicket
              </span>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex items-center flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search events, artists, categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-900/60 border border-purple-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
            </div>

            {/* Navigation & Actions */}
            <div className="flex items-center space-x-4">
              <Link href="/details" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                Details
              </Link>
              <button className="p-2 rounded-lg bg-gray-800/50 text-gray-300 hover:text-white transition-colors">
                <Bell size={20} />
              </button>
              
              {/* User Profile */}
              <div className="flex items-center space-x-3">
                <div className="text-right hidden sm:block">
                  <div className="text-sm font-medium text-white">{userData.name}</div>
                  <div className="text-xs text-gray-400">{userData.wallet}</div>
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full flex items-center justify-center">
                  <User size={20} className="text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <AnimatedText 
            text={`Welcome back, ${userData.name}`}
            className="text-4xl font-medium bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2"
          />
          <p className="text-lg text-gray-300 animate-fade-in">
            Discover, collect, and manage your NFT event tickets
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 rounded-2xl p-6 border border-purple-500/10 backdrop-blur-xl hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-between mb-4">
              <Calendar className="text-purple-400" size={24} />
              <div className="text-sm text-gray-400">Total Events</div>
            </div>
            <div className="text-3xl font-medium bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent">
              {stats.events}
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 rounded-2xl p-6 border border-purple-500/10 backdrop-blur-xl hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-between mb-4">
              <Ticket className="text-blue-400" size={24} />
              <div className="text-sm text-gray-400">NFT Tickets</div>
            </div>
            <div className="text-3xl font-medium bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              {stats.tickets.toLocaleString()}
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 rounded-2xl p-6 border border-purple-500/10 backdrop-blur-xl hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-between mb-4">
              <Users className="text-green-400" size={24} />
              <div className="text-sm text-gray-400">Active Users</div>
            </div>
            <div className="text-3xl font-medium bg-gradient-to-r from-green-400 to-teal-300 bg-clip-text text-transparent">
              {stats.users.toLocaleString()}
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 rounded-2xl p-6 border border-purple-500/10 backdrop-blur-xl hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="text-yellow-400" size={24} />
              <div className="text-sm text-gray-400">Volume (ETH)</div>
            </div>
            <div className="text-3xl font-medium bg-gradient-to-r from-yellow-400 to-orange-300 bg-clip-text text-transparent">
              {stats.volume}
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 rounded-2xl p-6 border border-purple-500/10 backdrop-blur-xl">
              <h2 className="text-xl font-medium mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button 
                  onClick={() => setShowCreateEventModal(true)}
                  className="bg-gradient-to-r from-purple-600/20 to-purple-500/20 border border-purple-500/30 rounded-xl p-4 text-center group hover:from-purple-600/30 hover:to-purple-500/30 transition-all hover:scale-105"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:from-purple-700 group-hover:to-purple-800 transition-all">
                    <Plus className="text-white" size={24} />
                  </div>
                  <span className="text-white font-medium">Create Event</span>
                </button>
                
                <Link 
                  href="/my-tickets"
                  className="bg-gradient-to-r from-blue-600/20 to-blue-500/20 border border-blue-500/30 rounded-xl p-4 text-center group hover:from-blue-600/30 hover:to-blue-500/30 transition-all hover:scale-105"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:from-blue-700 group-hover:to-blue-800 transition-all">
                    <Ticket className="text-white" size={24} />
                  </div>
                  <span className="text-white font-medium">My Tickets</span>
                </Link>
                
                <button className="bg-gradient-to-r from-green-600/20 to-green-500/20 border border-green-500/30 rounded-xl p-4 text-center group hover:from-green-600/30 hover:to-green-500/30 transition-all hover:scale-105">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-green-700 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:from-green-700 group-hover:to-green-800 transition-all">
                    <Gift className="text-white" size={24} />
                  </div>
                  <span className="text-white font-medium">Rewards</span>
                </button>
              </div>
            </div>

            {/* Category Filter */}
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 rounded-2xl p-4 border border-purple-500/10 backdrop-blur-xl">
              <div className="flex items-center space-x-4 overflow-x-auto pb-2 scrollbar-hide">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                      selectedCategory === category.id
                        ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white'
                        : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                    }`}
                  >
                    {category.icon}
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Trending Events */}
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 rounded-2xl p-6 border border-purple-500/10 backdrop-blur-xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-medium bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  🔥 Trending Events
                </h2>
                <Link href="/explore" className="text-purple-400 hover:text-purple-300 text-sm font-medium flex items-center">
                  View all <ChevronRight size={16} />
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredEvents.slice(0, 4).map((event) => (
                  <div key={event.id} className="bg-gradient-to-br from-gray-800/50 to-gray-700/30 rounded-xl overflow-hidden border border-purple-500/10 hover:border-purple-500/30 transition-all group hover:scale-[1.02]">
                    <div className="relative h-40 overflow-hidden">
                      <img 
                        src={event.image} 
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                      
                      {event.featured && (
                        <div className="absolute top-3 left-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white text-xs font-medium px-2 py-1 rounded-full flex items-center">
                          <Star size={12} className="mr-1" /> Featured
                        </div>
                      )}
                      
                      {event.preview && (
                        <button 
                          onClick={toggleAudio}
                          className="absolute bottom-3 right-3 w-8 h-8 bg-black/60 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors"
                        >
                          {isPlaying ? (
                            <Volume2 size={16} className="text-white" />
                          ) : (
                            <Play size={16} className="text-white ml-0.5" />
                          )}
                        </button>
                      )}
                    </div>
                    
                    <div className="p-4">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-lg font-medium text-white truncate">{event.title}</h3>
                        {event.verified && <Verified size={16} className="text-blue-400 flex-shrink-0" />}
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-400 mb-2">
                        <Calendar size={14} className="mr-1" />
                        <span className="mr-3">{event.date}</span>
                        <MapPin size={14} className="mr-1" />
                        <span className="truncate">{event.location}</span>
                      </div>
                      
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center text-sm text-gray-400">
                          <Users size={14} className="mr-1" />
                          <span>{event.attendees} attending</span>
                        </div>
                        <div className="font-medium bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent">
                          {event.price}
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleBuyTicket(event)}
                          className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-2 px-3 rounded-lg transition-all text-sm text-center"
                        >
                          Buy Tickets
                        </button>
                        <button className="w-10 h-10 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-gray-300 rounded-lg transition-all flex items-center justify-center">
                          <Heart size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {filteredEvents.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  <Search size={32} className="mx-auto mb-3" />
                  <p>No events found matching your search.</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* User Profile Card */}
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 rounded-2xl p-6 border border-purple-500/10 backdrop-blur-xl">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User size={32} className="text-white" />
                </div>
                <h3 className="text-lg font-medium text-white mb-1">{userData.name}</h3>
                <div className="text-sm text-gray-400 flex items-center justify-center">
                  <Wallet size={14} className="mr-1" />
                  {userData.wallet}
                  <button className="ml-2 text-gray-500 hover:text-gray-300">
                    <Copy size={12} />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-medium bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent">
                    {userData.tickets}
                  </div>
                  <div className="text-sm text-gray-400">Tickets</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-medium bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                    {userData.events}
                  </div>
                  <div className="text-sm text-gray-400">Events</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-900/30 to-purple-800/20 rounded-lg p-4 border border-purple-500/10 mb-4">
                <div className="text-sm text-gray-300 mb-1">Wallet Balance</div>
                <div className="text-xl font-medium bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent">
                  {userData.balance}
                </div>
              </div>
              
              <button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-3 rounded-lg transition-all">
                Manage Profile
              </button>
            </div>

            {/* Now Playing (Audio Preview) */}
            {isPlaying && (
              <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 rounded-2xl p-4 border border-purple-500/10 backdrop-blur-xl animate-slide-in">
                <h3 className="text-sm font-medium text-gray-300 mb-3">Now Playing</h3>
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                      alt="Event preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-white truncate">Web3 Music Festival Preview</div>
                    <div className="text-xs text-gray-400">Deadmau5, Rezz, Kaskade</div>
                  </div>
                  <button 
                    onClick={toggleAudio}
                    className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-700 transition-colors"
                  >
                    <Volume2 size={16} className="text-white" />
                  </button>
                </div>
                <div className="w-full bg-gray-700/50 rounded-full h-1.5">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-purple-600 h-1.5 rounded-full transition-all"
                    style={{ width: `${audioProgress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Recent Activity */}
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 rounded-2xl p-6 border border-purple-500/10 backdrop-blur-xl">
              <h3 className="text-lg font-medium mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Recent Activity
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Ticket size={16} className="text-green-400" />
                  </div>
                  <div>
                    <div className="text-sm text-white">Purchased VIP ticket</div>
                    <div className="text-xs text-gray-400">Web3 Music Festival 2025</div>
                    <div className="text-xs text-gray-500">2 hours ago</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Gift size={16} className="text-blue-400" />
                  </div>
                  <div>
                    <div className="text-sm text-white">Received NFT reward</div>
                    <div className="text-xs text-gray-400">Exclusive collectible</div>
                    <div className="text-xs text-gray-500">1 day ago</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Share2 size={16} className="text-purple-400" />
                  </div>
                  <div>
                    <div className="text-sm text-white">Shared event</div>
                    <div className="text-xs text-gray-400">Blockchain Conference</div>
                    <div className="text-xs text-gray-500">2 days ago</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* My Tickets Section */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-medium bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              My NFT Tickets
            </h2>
            <Link href="/my-tickets" className="text-purple-400 hover:text-purple-300 text-sm font-medium flex items-center">
              View all <ChevronRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userTickets.map((ticket) => (
              <div key={ticket.id} className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 rounded-2xl p-6 border border-purple-500/10 backdrop-blur-xl hover:border-purple-500/30 transition-all group hover:scale-[1.02]">
                {/* Ticket Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <div className={`text-xs font-medium px-2 py-1 rounded-full ${
                        ticket.status === 'upcoming' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-gray-500/20 text-gray-400'
                      }`}>
                        {ticket.status}
                      </div>
                      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white text-xs font-medium px-2 py-1 rounded-full">
                        {ticket.rarity}
                      </div>
                    </div>
                    <h3 className="text-lg font-medium text-white truncate">{ticket.event}</h3>
                  </div>
                  <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={ticket.image} 
                      alt={ticket.event}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                {/* Ticket Details */}
                <div className="mb-4">
                  <div className="flex items-center text-sm text-gray-400 mb-2">
                    <Calendar size={14} className="mr-2" />
                    <span>{ticket.date}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-400 mb-3">
                    <MapPin size={14} className="mr-2" />
                    <span className="truncate">{ticket.location}</span>
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-900/30 to-purple-800/20 rounded-lg p-3 border border-purple-500/10 mb-3">
                    <div className="text-xs text-gray-300 mb-1">Ticket Type</div>
                    <div className="text-sm font-medium bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent">
                      {ticket.type}
                    </div>
                    <div className="text-xs font-mono text-purple-400 mt-1">{ticket.nftId}</div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-gray-400">Purchase Price</div>
                      <div className="text-sm text-gray-300">{ticket.price}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-400">Current Value</div>
                      <div className="text-sm font-medium bg-gradient-to-r from-green-400 to-teal-300 bg-clip-text text-transparent">
                        {ticket.value}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Ticket Benefits */}
                <div className="mb-4">
                  <div className="text-xs text-gray-400 mb-2">Benefits</div>
                  <div className="flex flex-wrap gap-1">
                    {ticket.benefits.map((benefit, index) => (
                      <span key={index} className="text-xs bg-gray-700/50 text-gray-300 px-2 py-1 rounded-md">
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={generateRandomQR}
                    className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-2 px-3 rounded-lg transition-all text-sm flex items-center justify-center space-x-1"
                  >
                    <QrCode size={14} />
                    <span>Show QR</span>
                  </button>
                  <button 
                    onClick={() => handleViewDetails(ticket)}
                    className="bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-gray-300 py-2 px-3 rounded-lg transition-all text-sm flex items-center justify-center space-x-1"
                  >
                    <ExternalLink size={14} />
                    <span>Details</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      {showCreateEventModal && <CreateEventModal />}
      {showQRModal && <QRModal />}
      {showTicketDetails && selectedTicket && <TicketDetailsModal />}

      {/* Add custom styles for animations */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        
        @keyframes text-rise {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0px); opacity: 1; }
        }
        
        @keyframes slide-in {
          0% { transform: translateX(100px); opacity: 0; }
          100% { transform: translateX(0px); opacity: 1; }
        }
        
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        .animate-text-rise {
          animation: text-rise 0.5s ease forwards;
          opacity: 0;
        }
        
        .animate-slide-in {
          animation: slide-in 0.3s ease-out forwards;
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease forwards;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default NFTTicketDashboard;