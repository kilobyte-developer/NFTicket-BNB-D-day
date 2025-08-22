import type { NextRequest } from "next/server"
import { Magic } from "@magic-sdk/admin"

const magic = new Magic(process.env.MAGIC_SECRET_KEY!)

export async function validateMagicToken(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return null
    }

    const token = authHeader.substring(7)
    magic.token.validate(token)
    const metadata = await magic.users.getMetadataByToken(token)

    return {
      userId: metadata.issuer,
      email: metadata.email,
      walletAddress: metadata.publicAddress,
    }
  } catch (error) {
    console.error("Magic token validation error:", error)
    return null
  }
}

export function createAuthResponse(message: string, status = 401) {
  return Response.json({ error: message }, { status })
}
