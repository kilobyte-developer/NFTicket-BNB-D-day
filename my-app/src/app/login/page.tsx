"use client"
import { useState } from "react"
import Link from "next/link"
import { ethers } from "ethers"
import { useRouter } from "next/navigation" // ✅ for Next.js App Router
import { getMagic } from "../../../lib/magic-client"

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ethereum?: any // Adjust the type as needed
  }
}

export default function Page() {
  const [isLogin, setIsLogin] = useState(true)
  const [account, setAccount] = useState(null)
  const navigate = useRouter()

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
        setAccount(accounts[0])
      } catch (error) {
        console.error("User rejected wallet connection", error)
      }
    } else {
      alert("Please install MetaMask!")
    }
  }

  const signMessage = async () => {
    if (!account) {
      alert("Please connect your wallet first.")
      return
    }
    try {
      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      const message = "Please sign this message to log in to NFTicket."
      await signer.signMessage(message)
      // You can verify the signature on the server or proceed as logged in
      navigate.push("/home")
    } catch (error) {
      console.error("Error signing message:", error)
    }
  }

  const signInWithGoogle = async () => {
    try {
      const magic = getMagic()
      if (!magic) {
        alert("Magic is not configured. Set NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY.")
        return
      }
      await magic.oauth.loginWithRedirect({
        provider: "google",
        redirectURI: `${window.location.origin}/auth/callback?next=${encodeURIComponent("/dashboard")}`,
        scope: ["openid", "email", "profile"],
      })
      // Redirect is handled by Magic
    } catch (err) {
      console.error("Google OAuth (Magic) error:", err)
    }
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-purple-600/30 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-blue-600/20 to-purple-600/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
              linear-gradient(rgba(147, 51, 234, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(147, 51, 234, 0.1) 1px, transparent 1px)
            `,
              backgroundSize: "50px 50px",
            }}
          ></div>
        </div>
      </div>

      {/* Login Container */}
      <div className="relative z-10 w-full max-w-md mx-4 mt-24 md:mt-40 mb-16">
        {/* Glassmorphism Card */}
        <div className="bg-gray-900/80 backdrop-blur-xl rounded-3xl p-10 md:p-12 border border-purple-500/20 shadow-2xl">
          {/* Logo/Brand */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl mb-4 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-medium bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent">
              NFTicket
            </h1>
            <p className="text-gray-400 mt-2">Blockchain Ticket Platform</p>
          </div>

          {/* Wallet Login Buttons */}
          <div className="space-y-7 md:space-y-8 text-center">
            {!account ? (
              <button
                type="button"
                onClick={connectWallet}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-normal py-3.5 md:py-4 px-5 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
              >
                Connect Wallet
              </button>
            ) : (
              <>
                <p className="text-gray-300 break-all mb-4">Connected: {account}</p>
                <Link href="/home">
                  <button
                    type="button"
                    onClick={signMessage}
                    className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-normal py-3.5 md:py-4 px-5 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
                  >
                    Login with Wallet
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-900 text-gray-400">Or Signup with</span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="flex items-center justify-center">
            {/* Google OAuth button - style matches existing social button */}
            <button
              type="button"
              onClick={signInWithGoogle}
              className="flex items-center justify-center px-4 py-3 border border-gray-600 rounded-xl hover:border-gray-500 transition-all duration-300 group"
            >
              {/* Google icon */}
              <svg
                className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors"
                viewBox="0 0 533.5 544.3"
                aria-hidden="true"
              >
                <path
                  fill="#EA4335"
                  d="M533.5 278.4c0-18.5-1.7-36.2-4.9-53.3H272.1v100.9h146.9c-6.3 34-25.1 62.7-53.7 82v68.2h86.8c50.8-46.8 81.4-115.8 81.4-197.8z"
                />
                <path
                  fill="#34A853"
                  d="M272.1 544.3c72.6 0 133.6-24 178.2-65.1l-86.8-68.2c-24.1 16.2-55 25.7-91.4 25.7-70.2 0-129.7-47.4-151-111.1H31.9v69.6c44.3 88.1 134.6 149.1 240.2 149.1z"
                />
                <path
                  fill="#4A90E2"
                  d="M121.1 325.6c-10.1-30-10.1-62.3 0-92.3V163.7H31.9c-36.9 73.8-36.9 162.9 0 236.7l89.2-74.8z"
                />
                <path
                  fill="#FBBC05"
                  d="M272.1 107.7c39.5-.6 77.4 14.3 106.2 41.7l79.2-79.2C403.9 25.2 342.9.4 272.1 0 166.5 0 76.1 61 31.9 149.1l89.2 69.6c21.3-63.7 80.8-111 151-111z"
                />
              </svg>
              <span className="ml-2 text-sm text-gray-400 group-hover:text-white transition-colors">Google</span>
            </button>
          </div>

          {/* Footer Text */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-400">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-purple-400 hover:text-purple-300 transition-colors font-medium"
              >
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>
        </div>

        {/* Bottom Badge */}
        <div className="text-center mt-10">
          <div className="inline-flex items-center space-x-2 text-gray-500 text-sm">
            <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-purple-400 rounded-full"></div>
            <span>Secured by Blockchain Technology</span>
            <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-purple-400 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
