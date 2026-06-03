import { publicCover } from "@/data/imageAssets";
import { getHealthyJourneyCurrentUser } from "@/lib/auth/server";
import { healthyJourneyAuthRoutes } from "@/lib/auth/routes";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getHealthyJourneyCurrentUser();

  if (user) {
    redirect(healthyJourneyAuthRoutes.authRedirect);
  }

  return (
    <main className="min-h-screen bg-[var(--cream)] text-[var(--charcoal)]">
      <section className="flex min-h-screen items-center justify-center overflow-hidden sm:p-5">
        <div className="relative h-screen w-screen overflow-hidden bg-[var(--cream)] shadow-[var(--shadow-soft)] sm:h-[calc(100vh-2.5rem)] sm:max-h-[920px] sm:w-auto sm:aspect-[4/5] sm:rounded-[2.25rem]">
          <Image
            alt="Healthy Journey wellness cover"
            className="object-cover"
            fill
            priority
            sizes="(min-width: 640px) 736px, 100vw"
            src={publicCover}
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[rgba(45,47,41,0.48)] to-transparent" />
          <div className="absolute inset-x-5 bottom-6 flex flex-col gap-3 sm:inset-x-auto sm:left-1/2 sm:w-[20rem] sm:-translate-x-1/2">
            <Link
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--olive)] px-7 text-center text-sm font-semibold text-white shadow-[0_16px_38px_rgba(45,47,41,0.3)] transition hover:bg-[var(--sage)]"
              href={healthyJourneyAuthRoutes.signUp}
            >
              สมัครสมาชิก
            </Link>
            <Link
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/70 bg-[rgba(255,253,248,0.88)] px-7 text-center text-sm font-semibold text-[var(--olive)] shadow-[0_10px_24px_rgba(70,56,36,0.08)] transition hover:bg-white"
              href={healthyJourneyAuthRoutes.signIn}
            >
              เข้าสู่ระบบ
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
