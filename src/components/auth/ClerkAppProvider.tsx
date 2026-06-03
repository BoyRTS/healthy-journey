"use client";

import type { ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";

type ClerkAppProviderProps = {
  children: ReactNode;
};

export function ClerkAppProvider({ children }: ClerkAppProviderProps) {
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    return <>{children}</>;
  }

  return <ClerkProvider>{children}</ClerkProvider>;
}
