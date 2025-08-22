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
type Status = 'past' | 'upcoming' | 'active';

interface TicketType {
  id: string | number;
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

export type { EventCollection, EventArtist, Event, TicketRarity, Currency, TicketType, Activity, TabType, Status };
