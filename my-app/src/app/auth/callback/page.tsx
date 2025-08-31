"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { getMagic } from "../../../../lib/magic-client"

export default function AuthCallbackPage() {
  const router = useRouter()
  const params = useSearchParams()

  useEffect(() => {
    const run = async () => {
      try {
        const magic = getMagic()
        if (!magic) {
          router.replace("/login?error=magic_not_ready")
          return
        }

        // Finalize Magic OAuth (e.g., Google)
        const result = await magic.oauth.getRedirectResult().catch(() => null)

        // Acquire DID token to authenticate with our server
        const didToken = await magic.user.getIdToken()

        // Send to server to upsert profile in Supabase
        await fetch("/api/auth/sync", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${didToken}`,
          },
          body: JSON.stringify({
            email: result?.oauth?.userInfo?.email,
            walletAddress: result?.magic?.userMetadata?.publicAddress,
          }),
        })

        // Redirect to /dashboard or provided next param
        const next = params.get("next") || "/dashboard"
        router.replace(next)
      } catch (_e) {
        router.replace("/login?error=oauth_failed")
      }
    }
    run()
  }, [router, params])

  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center">
        <p className="text-gray-300">Completing sign-in…</p>
      </div>
    </main>
  )
}
