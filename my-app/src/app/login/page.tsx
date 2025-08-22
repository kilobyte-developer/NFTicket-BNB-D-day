"use client"
import { useState } from "react"
import Link from "next/link"
import { ethers } from "ethers"
import { useRouter } from "next/navigation" // ✅ for Next.js App Router
import { Magic } from "magic-sdk"
import { MagicUserMetadata } from "magic-sdk"
import { OAuthExtension } from "@magic-ext/oauth"

declare global {
  interface Window {
    ethereum?: any
  }
}

const magic =
  typeof window !== "undefined"
    ? new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY!, {
        extensions: {
          oauth: new OAuthExtension(),
        },
      })
    : null

export default function Page() {
  const [isLogin, setIsLogin] = useState(true)
  const [account, setAccount] = useState(null)
  const [magicUser, setMagicUser] = useState<null | MagicUserMetadata>(null)
  const [email, setEmail] = useState("")
  const navigate = useRouter()

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
        setAccount(accounts[0])
      } catch (error) {
        console.error("User rejected wallet connection")
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

  const handleMagicLogin = async () => {
    if (!email) {
      alert("Please enter your email address.")
      return
    }
    try {
      const didToken = await magic!.auth.loginWithMagicLink({ email })
      const userMetadata = await magic!.user.getInfo()
      setMagicUser(userMetadata)

      // Store the DID token for API calls
      if (didToken) {
        localStorage.setItem("magic-token", didToken)
      }
      navigate.push("/dashboard")
    } catch (error) {
      console.error("Magic Link login error:", error)
      alert("Login failed. Please try again.")
    }
  }

  const handleGoogleLogin = async () => {
    try {
      await magic!.oauth.loginWithRedirect({
        provider: "google",
        redirectURI: `${window.location.origin}/dashboard`,
      })
    } catch (error) {
      console.error("Google OAuth error:", error)
      alert("Google login failed. Please try again.")
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

          {/* Toggle Buttons */}
          <div className="flex bg-gray-800/50 rounded-2xl p-1 mb-10">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                isLogin
                  ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                !isLogin
                  ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Sign Up
            </button>
          </div>

          <div className="space-y-6 mb-8">
            <div>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-3.5 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300"
              />
            </div>
            <button
              type="button"
              onClick={handleMagicLogin}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-normal py-3.5 md:py-4 px-5 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
            >
              {isLogin ? "Sign In with Magic Link" : "Sign Up with Magic Link"}
            </button>
          </div>

          {/* Wallet Login Buttons */}
          <div className="space-y-7 md:space-y-8 text-center">
            {!account ? (
              <button
                type="button"
                onClick={connectWallet}
                className="w-full bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white font-normal py-3.5 md:py-4 px-5 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
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
                    className="w-full bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white font-normal py-3.5 md:py-4 px-5 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
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
              <span className="px-2 bg-gray-900 text-gray-400">Or continue with</span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="flex items-center justify-center space-x-4">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="flex items-center justify-center px-4 py-3 border border-gray-600 rounded-xl hover:border-gray-500 transition-all duration-300 group"
            >
              <svg
                className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span className="ml-2 text-sm text-gray-400 group-hover:text-white transition-colors">Google</span>
            </button>

            <button
              type="button"
              className="flex items-center justify-center px-4 py-3 border border-gray-600 rounded-xl hover:border-gray-500 transition-all duration-300 group"
            >
              <svg
                className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.404-5.965 1.404-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.690 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.221.083.343-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.751-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.017z" />
              </svg>
              <span className="ml-2 text-sm text-gray-400 group-hover:text-white transition-colors">MetaMask</span>
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
