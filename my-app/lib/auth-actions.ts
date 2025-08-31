"use client"

// import { getMagic } from "@/lib/magic-client"
import { getMagic } from "./magic-client"

export async function loginWithGoogle(next = "/dashboard") {
  const magic = getMagic()
  const redirectURI = `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`
  await magic.oauth.loginWithRedirect({
    provider: "google",
    redirectURI,
    scope: ["openid", "email", "profile"],
  })
}
