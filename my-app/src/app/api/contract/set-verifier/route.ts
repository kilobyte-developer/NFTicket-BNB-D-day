import type { NextRequest } from "next/server"
import { getContractWithSigner } from "../../../../../lib/contract"
import { validateMagicToken, createAuthResponse } from "../../../../../lib/auth"

export async function POST(request: NextRequest) {
  try {
    // Validate authentication
    const user = await validateMagicToken(request)
    if (!user) {
      return createAuthResponse("Unauthorized")
    }

    const { verifierAddress } = await request.json()

    if (!verifierAddress) {
      return Response.json({ error: "Verifier address is required" }, { status: 400 })
    }

    // Set verifier on blockchain
    const contract = getContractWithSigner()
    const tx = await contract.setVerifier(verifierAddress)
    const receipt = await tx.wait()

    return Response.json({
      success: true,
      verifierAddress,
      transactionHash: receipt.hash,
    })
  } catch (error: any) {
    console.error("Set verifier error:", error)
    return Response.json(
      {
        error: "Failed to set verifier",
        details: error.message,
      },
      { status: 500 },
    )
  }
}
