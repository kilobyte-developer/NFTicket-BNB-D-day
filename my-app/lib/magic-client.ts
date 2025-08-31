"use client"

import { Magic } from "magic-sdk"
import { OAuthExtension } from "@magic-ext/oauth"

// Removed import of InstanceWithExtensions

let magicInstance: any = null

export function getMagic() {
  if (typeof window === "undefined") return null
  if (!magicInstance) {
    const pk = process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY
    if (!pk) {
      console.warn("[v0] Missing NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY")
      return null
    }
    magicInstance = new Magic(pk, {
      extensions: [new OAuthExtension()],
    })
  }
  return magicInstance
}

export async function loginWithGoogle(next = "/dashboard") {
  const magic = getMagic()
  if (!magic) {
    console.warn("[v0] Magic is not configured. Set NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY.")
    return
  }
  const redirect =
    typeof window !== "undefined"
      ? `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`
      : "/auth/callback?next=/dashboard"

  const oauth = magic.oauth as OAuthExtension;
  await oauth.loginWithRedirect({
    provider: "google",
    redirectURI: redirect,
    scope: ["openid", "email", "profile"],
  })
}
