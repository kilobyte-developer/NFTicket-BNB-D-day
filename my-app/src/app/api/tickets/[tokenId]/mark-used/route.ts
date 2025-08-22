import type { NextRequest } from "next/server"
import { getContractWithSigner } from "../../../../../../lib/contract"
import { supabase } from "../../../../../../lib/supabase"
import { validateMagicToken, createAuthResponse } from "../../../../../../lib/auth"

export async function POST(request: NextRequest, { params }: { params: { tokenId: string } }) {
  try {
    // Validate authentication
    const user = await validateMagicToken(request)
    if (!user) {
      return createAuthResponse("Unauthorized")
    }

    const { tokenId } = params

    // Mark as used on blockchain
    const contract = getContractWithSigner()
    const tx = await contract.markUsed(tokenId)
    const receipt = await tx.wait()

    // Update database
    const { error: dbError } = await supabase
      .from("tickets")
      .update({
        used_at: new Date().toISOString(),
        used_by: user.walletAddress,
      })
      .eq("token_id", tokenId)

    if (dbError) {
      console.error("Database error:", dbError)
    }

    return Response.json({
      success: true,
      tokenId,
      transactionHash: receipt.hash,
      usedAt: new Date().toISOString(),
    })
  } catch (error: any) {
    console.error("Mark used error:", error)
    return Response.json(
      {
        error: "Failed to mark ticket as used",
        details: error.message,
      },
      { status: 500 },
    )
  }
}
