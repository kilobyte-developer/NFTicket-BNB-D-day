import type { NextRequest } from "next/server"
import { getTicketData } from "@/lib/contract"
import { supabase } from "@/lib/supabase"

export async function GET(request: NextRequest, { params }: { params: { tokenId: string } }) {
  try {
    const { tokenId } = params

    // Get on-chain data
    const ticketData = await getTicketData(tokenId)
    if (!ticketData) {
      return Response.json({ error: "Ticket not found" }, { status: 404 })
    }

    // Get additional data from database
    const { data: dbData } = await supabase.from("tickets").select("*").eq("token_id", tokenId).single()

    return Response.json({
      ...ticketData,
      ...dbData,
      onChain: ticketData,
    })
  } catch (error: any) {
    console.error("Get ticket error:", error)
    return Response.json(
      {
        error: "Failed to get ticket data",
        details: error.message,
      },
      { status: 500 },
    )
  }
}
