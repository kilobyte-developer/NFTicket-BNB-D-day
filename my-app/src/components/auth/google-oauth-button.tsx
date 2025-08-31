"use client"

import type * as React from "react"
// import { loginWithGoogle } from "@/lib/magic-client"
import { loginWithGoogle } from "@lib/magic-client"

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>

export function GoogleOAuthButton({ onClick, children, ...rest }: Props) {
  return (
    <button
      type="button"
      {...rest}
      onClick={(e) => {
        onClick?.(e)
        // Redirect to /dashboard after successful login
        loginWithGoogle("/dashboard")
      }}
    >
      {children ?? "Continue with Google"}
    </button>
  )
}
