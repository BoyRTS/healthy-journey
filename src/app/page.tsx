import { publicCover } from "@/data/imageAssets";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
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
          <Link
            className="absolute inset-x-6 bottom-8 inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--olive)] px-7 text-center text-sm font-semibold text-white shadow-[0_16px_38px_rgba(45,47,41,0.3)] transition hover:bg-[var(--sage)] sm:inset-x-auto sm:left-1/2 sm:min-w-72 sm:-translate-x-1/2"
            href="/member"
          >
            เริ่มดูแลตัวเองวันนี้
          </Link>
        </div>
      </section>
    </main>
  );
}
