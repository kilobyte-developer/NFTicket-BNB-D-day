import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.SUPABASE_URL || "https://imcshfhttxkitxhgrnen.supabase.co"
const supabaseKey =
  process.env.SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltY3NoZmh0dHhraXR4aGdybmVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4NDIxODYsImV4cCI6MjA3MTQxODE4Nn0.1TwIXDo-Q8UhL7-OGRb6VHYhwYFnjGLTNldzCRZK_U8"

export const supabase = createClient(supabaseUrl, supabaseKey)

// Database types (will be updated when schema is created)
export interface TicketRecord {
  id: string
  token_id: string
  owner_address: string
  minted_at: string
  used_at?: string
  transaction_hash: string
  metadata?: any
}

export interface UserRecord {
  id: string
  wallet_address: string
  email?: string
  created_at: string
  updated_at: string
}
