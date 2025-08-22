import type { NextRequest } from "next/server"
import { getContractWithSigner } from "@/lib/contract"
import { supabase } from "@/lib/supabase"
import { validateMagicToken, createAuthResponse } from "@/lib/auth"

export async function DELETE(request: NextRequest, { params }: { params: { tokenId: string } }) {
  try {
    // Validate authentication
    const user = await validateMagicToken(request)
    if (!user) {
      return createAuthResponse("Unauthorized")
    }

    const { tokenId } = params

    // Burn ticket on blockchain
    const contract = getContractWithSigner()
    const tx = await contract.burn(tokenId)
    const receipt = await tx.wait()

    // Update database
    const { error: dbError } = await supabase
      .from("tickets")
      .update({
        burned_at: new Date().toISOString(),
        burned_by: user.walletAddress,
      })
      .eq("token_id", tokenId)

    if (dbError) {
      console.error("Database error:", dbError)
    }

    return Response.json({
      success: true,
      tokenId,
      transactionHash: receipt.hash,
      burnedAt: new Date().toISOString(),
    })
  } catch (error: any) {
    console.error("Burn ticket error:", error)
    return Response.json(
      {
        error: "Failed to burn ticket",
        details: error.message,
      },
      { status: 500 },
    )
  }
}
