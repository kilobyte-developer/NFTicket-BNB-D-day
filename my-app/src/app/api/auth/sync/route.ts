import { NextResponse, type NextRequest } from "next/server"
import { Magic } from "@magic-sdk/admin"
import { getAdminSupabase } from "../../../../../lib/supabase-admin"

const secret = process.env.MAGIC_SECRET_KEY
if (!secret) {
  console.warn("[v0] MAGIC_SECRET_KEY is not set")
}
const magic = new Magic(secret as string)

export async function POST(req: NextRequest) {
  const auth = req.headers.get("authorization")
  if (!auth?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const didToken = auth.slice("Bearer ".length)

  try {
    // Validate DID token and fetch metadata from Magic
    await magic.token.validate(didToken)
    const meta = await magic.users.getMetadataByToken(didToken)

    const body = await req.json().catch(() => ({}))
    const emailRaw: string | undefined = body?.email || meta.email || undefined
    const walletAddress: string | undefined = body?.walletAddress || meta.publicAddress || undefined

    if (!emailRaw || !walletAddress) {
      return NextResponse.json({ error: "Missing email or walletAddress" }, { status: 400 })
    }
    const email = emailRaw.toLowerCase()

    const supabase = getAdminSupabase()

    // Upsert by wallet_address (unique) and keep email lowercased to satisfy your unique index
    const { data, error } = await supabase
      .from("profiles")
      .upsert({ email, wallet_address: walletAddress }, { onConflict: "wallet_address" })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true, profile: data })
  } catch (_e) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 })
  }
}
