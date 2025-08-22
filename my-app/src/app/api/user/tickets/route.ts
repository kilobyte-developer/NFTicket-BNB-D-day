import type { NextRequest } from "next/server"
import { getContract } from "@/lib/contract"
import { supabase } from "@/lib/supabase"
import { validateMagicToken, createAuthResponse } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    // Validate authentication
    const user = await validateMagicToken(request)
    if (!user) {
      return createAuthResponse("Unauthorized")
    }

    const { searchParams } = new URL(request.url)
    const address = searchParams.get("address") || user.walletAddress

    if (!address) {
      return Response.json({ error: "Address is required" }, { status: 400 })
    }

    // Get tickets from database
    const { data: tickets, error } = await supabase
      .from("tickets")
      .select("*")
      .eq("owner_address", address)
      .order("minted_at", { ascending: false })

    if (error) {
      throw error
    }

    // Get on-chain data for each ticket
    const contract = getContract()
    const ticketsWithOnChainData = await Promise.all(
      (tickets || []).map(async (ticket) => {
        try {
          const [used, tokenURI] = await Promise.all([
            contract.used(ticket.token_id),
            contract.tokenURI(ticket.token_id).catch(() => ""),
          ])

          return {
            ...ticket,
            onChain: {
              used,
              tokenURI,
            },
          }
        } catch (error) {
          return {
            ...ticket,
            onChain: {
              used: false,
              tokenURI: "",
            },
          }
        }
      }),
    )

    return Response.json({
      tickets: ticketsWithOnChainData,
      count: ticketsWithOnChainData.length,
    })
  } catch (error: any) {
    console.error("Get user tickets error:", error)
    return Response.json(
      {
        error: "Failed to get user tickets",
        details: error.message,
      },
      { status: 500 },
    )
  }
}
