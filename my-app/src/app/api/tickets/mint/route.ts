import type { NextRequest } from "next/server"
import { getContractWithSigner } from "../../../../../lib/contract"
import { supabase } from "../../../../../lib/supabase"
import { validateMagicToken, createAuthResponse } from "../../../../../lib/auth"

export async function POST(request: NextRequest) {
  try {
    // Validate authentication
    const user = await validateMagicToken(request)
    if (!user) {
      return createAuthResponse("Unauthorized")
    }

    const { to } = await request.json()

    if (!to) {
      return Response.json({ error: "Recipient address is required" }, { status: 400 })
    }

    // Mint ticket on blockchain
    const contract = getContractWithSigner()
    const tx = await contract.mintTicket(to)
    const receipt = await tx.wait()

    // Extract token ID from events
    const ticketMintedEvent = contract.interface.getEvent("TicketMinted");
    const mintEvent = receipt.logs.find(
      (log: any) =>
        log.topics &&
        ticketMintedEvent &&
        log.topics[0] === ticketMintedEvent.topicHash,
    )

    if (!mintEvent) {
      throw new Error("Mint event not found in transaction receipt")
    }

    const decodedEvent = contract.interface.decodeEventLog("TicketMinted", mintEvent.data, mintEvent.topics)
    const tokenId = decodedEvent.tokenId.toString()

    // Store in database
    const { error: dbError } = await supabase.from("tickets").insert({
      token_id: tokenId,
      owner_address: to,
      transaction_hash: receipt.hash,
      minted_at: new Date().toISOString(),
    })

    if (dbError) {
      console.error("Database error:", dbError)
      // Continue even if DB insert fails - blockchain transaction succeeded
    }

    return Response.json({
      success: true,
      tokenId,
      transactionHash: receipt.hash,
      to,
    })
  } catch (error: any) {
    console.error("Mint ticket error:", error)
    return Response.json(
      {
        error: "Failed to mint ticket",
        details: error.message,
      },
      { status: 500 },
    )
  }
}
