"use client";

import type { ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";

type ClerkAppProviderProps = {
  children: ReactNode;
};

export function ClerkAppProvider({ children }: ClerkAppProviderProps) {
  return <ClerkProvider>{children}</ClerkProvider>;
}
