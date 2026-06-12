"use client";

import type { ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";

type ClerkAppProviderProps = {
  children: ReactNode;
};

export function ClerkAppProvider({ children }: ClerkAppProviderProps) {
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is required in production.");
    }

    return <>{children}</>;
  }

  return <ClerkProvider>{children}</ClerkProvider>;
}
