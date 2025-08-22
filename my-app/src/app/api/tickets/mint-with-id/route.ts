import type { NextRequest } from "next/server"
import { getContractWithSigner } from "@/lib/contract"
import { supabase } from "@/lib/supabase"
import { validateMagicToken, createAuthResponse } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    // Validate authentication
    const user = await validateMagicToken(request)
    if (!user) {
      return createAuthResponse("Unauthorized")
    }

    const { to, tokenId } = await request.json()

    if (!to || !tokenId) {
      return Response.json({ error: "Recipient address and token ID are required" }, { status: 400 })
    }

    // Mint ticket with specific ID on blockchain
    const contract = getContractWithSigner()
    const tx = await contract.mintTicketWithId(to, tokenId)
    const receipt = await tx.wait()

    // Store in database
    const { error: dbError } = await supabase.from("tickets").insert({
      token_id: tokenId.toString(),
      owner_address: to,
      transaction_hash: receipt.hash,
      minted_at: new Date().toISOString(),
    })

    if (dbError) {
      console.error("Database error:", dbError)
    }

    return Response.json({
      success: true,
      tokenId: tokenId.toString(),
      transactionHash: receipt.hash,
      to,
    })
  } catch (error: any) {
    console.error("Mint ticket with ID error:", error)
    return Response.json(
      {
        error: "Failed to mint ticket with ID",
        details: error.message,
      },
      { status: 500 },
    )
  }
}
