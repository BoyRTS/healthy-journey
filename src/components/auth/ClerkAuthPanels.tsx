"use client";

import type { ReactNode } from "react";
import { SignIn, SignUp, UserProfile } from "@clerk/nextjs";
import { healthyJourneyAuthRoutes } from "@/lib/auth/routes";

type AuthShellProps = {
  children: ReactNode;
  widthClassName?: string;
  hero?: ReactNode;
};

const authAppearance = {
  elements: {
    card: "shadow-none bg-transparent border-0",
    rootBox: "w-full",
    headerTitle: "hidden",
    headerSubtitle: "hidden",
    socialButtonsBlockButton:
      "rounded-2xl border border-[var(--line)] bg-[var(--warm-white)] text-[var(--charcoal)] shadow-none hover:bg-[var(--beige-soft)]",
    formButtonPrimary:
      "rounded-2xl bg-[var(--olive)] text-white shadow-none hover:bg-[#44563d] focus-visible:ring-2 focus-visible:ring-[var(--gold)]",
    formFieldInput:
      "h-12 rounded-2xl border border-[var(--line)] bg-[var(--warm-white)] text-[var(--charcoal)] shadow-none focus:border-[var(--sage)] focus:ring-[var(--sage-soft)]",
    formFieldLabel: "text-sm font-medium text-[var(--muted)]",
    footerActionLink: "font-semibold text-[var(--olive)] hover:text-[#44563d]",
    dividerLine: "bg-[var(--line)]",
    dividerText: "text-[var(--muted)]",
    identityPreviewText: "text-[var(--charcoal)]",
    formResendCodeLink: "text-[var(--olive)] hover:text-[#44563d]",
    otpCodeFieldInput:
      "h-12 rounded-2xl border border-[var(--line)] bg-[var(--warm-white)] text-[var(--charcoal)] shadow-none",
    alertText: "text-sm",
    alert: "rounded-2xl border border-[rgba(192,89,69,0.15)] bg-[rgba(255,244,240,0.9)]",
    footer: "mt-6",
  },
};

function AuthShell({ children, widthClassName = "max-w-6xl", hero }: AuthShellProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--cream)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(203,166,93,0.24),transparent_26rem),radial-gradient(circle_at_bottom_right,rgba(143,159,126,0.18),transparent_32rem)]" />
      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] w-full items-center justify-center">
        <div
          className={`grid w-full ${widthClassName} overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[rgba(255,253,248,0.94)] shadow-[var(--shadow-soft)] backdrop-blur sm:grid-cols-[1.05fr_0.95fr]`}
        >
          {hero ? (
            <section className="wellness-surface relative hidden min-h-full flex-col justify-between overflow-hidden p-8 sm:flex lg:p-12">
              <div className="absolute inset-0 opacity-60">
                <div className="absolute left-[-4rem] top-[-4rem] h-36 w-36 rounded-full bg-[rgba(255,253,248,0.52)] blur-2xl" />
                <div className="absolute bottom-10 right-[-3rem] h-40 w-40 rounded-full bg-[rgba(203,166,93,0.18)] blur-3xl" />
              </div>
              <div className="relative z-10">{hero}</div>
            </section>
          ) : null}
          <section className="flex items-center justify-center p-4 sm:p-8 lg:p-10">
            <div className="w-full max-w-md">{children}</div>
          </section>
        </div>
      </div>
    </main>
  );
}

export function ClerkSignInPanel() {
  return (
    <AuthShell>
      <SignIn
        appearance={authAppearance}
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
    <AuthShell
      hero={
        <div className="flex h-full flex-col justify-between gap-10">
          <div className="space-y-5">
            <span className="inline-flex w-fit rounded-full border border-[rgba(79,99,70,0.15)] bg-[rgba(255,253,248,0.72)] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--olive)]">
              Healthy Journey
            </span>
            <div className="space-y-4">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-[var(--earth)]">
                Member sign up
              </p>
              <h1 className="display-serif max-w-lg text-4xl leading-tight text-[var(--charcoal)] lg:text-5xl">
                Start a calmer, more consistent wellness journey.
              </h1>
              <p className="max-w-xl text-base leading-7 text-[var(--muted)]">
                Create your member account to track your daily progress, submit homework, and stay connected with your coach inside Healthy Journey.
              </p>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[1.5rem] border border-[rgba(79,99,70,0.12)] bg-[rgba(255,253,248,0.72)] p-5">
              <p className="text-sm font-semibold text-[var(--charcoal)]">What you can do after sign up</p>
              <ul className="mt-3 space-y-3 text-sm leading-6 text-[var(--muted)]">
                <li>Follow your daily plan in one clear member flow</li>
                <li>View coach messages inside the app without extra chat tools</li>
                <li>Submit meal homework and keep your routine visible</li>
              </ul>
            </div>
            <div className="flex items-center gap-3 rounded-[1.5rem] border border-[rgba(203,166,93,0.18)] bg-[rgba(234,215,165,0.32)] px-5 py-4 text-sm text-[var(--earth)]">
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--gold)]" />
              Member registration only. Coach sign-up will stay on a separate flow.
            </div>
          </div>
        </div>
      }
    >
      <SignUp
        appearance={authAppearance}
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
