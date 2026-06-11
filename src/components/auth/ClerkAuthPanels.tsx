"use client";

import type { ReactNode } from "react";
import { SignIn, SignUp, UserProfile } from "@clerk/nextjs";
import { healthyJourneyAuthRoutes } from "@/lib/auth/routes";

type AuthShellProps = {
  children: ReactNode;
  widthClassName?: string;
};

function AuthShell({ children, widthClassName = "max-w-md" }: AuthShellProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--cream)] px-4 py-10">
      <div
        className={`w-full ${widthClassName} rounded-[2rem] border border-[var(--line)] bg-[var(--warm-white)] p-4 shadow-[var(--shadow-soft)]`}
      >
        {children}
      </div>
    </main>
  );
}

export function ClerkSignInPanel() {
  return (
    <AuthShell>
      <SignIn
        fallbackRedirectUrl={healthyJourneyAuthRoutes.memberHome}
        path={healthyJourneyAuthRoutes.signIn}
        routing="path"
        signUpUrl={healthyJourneyAuthRoutes.signUp}
      />
    </AuthShell>
  );
}

export function ClerkSignUpPanel() {
  return (
    <AuthShell>
      <SignUp
        fallbackRedirectUrl={healthyJourneyAuthRoutes.memberOnboarding}
        path={healthyJourneyAuthRoutes.signUp}
        routing="path"
        signInUrl={healthyJourneyAuthRoutes.signIn}
      />
    </AuthShell>
  );
}

export function ClerkUserProfilePanel() {
  return (
    <AuthShell widthClassName="max-w-4xl">
      <UserProfile path={healthyJourneyAuthRoutes.userProfile} routing="path" />
    </AuthShell>
  );
}
