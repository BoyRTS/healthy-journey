"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    const isValid =
      email.trim().toLowerCase() === "boyrts@gmail.com" && password === "19691969";

    window.setTimeout(() => {
      setIsSubmitting(false);

      if (!isValid) {
        setError("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
        return;
      }

      window.localStorage.setItem("hj_admin_auth", "1");
      router.push("/admin");
    }, 450);
  }

  return (
    <main className="min-h-screen bg-[var(--cream)] px-4 py-6 text-[var(--charcoal)] sm:px-6 sm:py-8">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-5xl overflow-hidden rounded-[2.25rem] border border-white/60 bg-[var(--warm-white)]/92 shadow-[var(--shadow-soft)]">
        <section className="hidden flex-1 bg-[linear-gradient(135deg,#f8f2e7,#efe1c7)] p-8 lg:flex lg:flex-col lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--olive)]">
              HEALTH JOURNEY
            </p>
            <h1 className="mt-4 text-5xl font-semibold leading-tight text-[var(--olive)]">
              Admin Access
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-[var(--muted)]">
              หน้านี้ใช้สำหรับเข้าสู่ระบบฝั่ง admin ด้วย email และ password เท่านั้น เพื่อเข้าถึงเครื่องมือจัดการห้องและโครงสร้างชุมชน
            </p>
          </div>

          <div className="rounded-[1.75rem] bg-white/70 p-5 ring-1 ring-[var(--line)]">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--olive)]">
              Demo credentials
            </p>
            <div className="mt-3 space-y-2 text-sm leading-6 text-[var(--muted)]">
              <p>Email: `boyrts@gmail.com`</p>
              <p>Password: `19691969`</p>
            </div>
          </div>
        </section>

        <section className="flex w-full max-w-xl items-center p-5 sm:p-8 lg:p-10">
          <div className="w-full">
            <div className="mb-6 lg:hidden">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--olive)]">
                HEALTH JOURNEY
              </p>
              <h1 className="mt-3 text-4xl font-semibold text-[var(--olive)]">Admin Access</h1>
            </div>

            <div className="rounded-[2rem] bg-[var(--warm-white)] p-6 shadow-[var(--shadow-card)] ring-1 ring-[var(--line)] sm:p-8">
              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--olive)]">
                  Sign in
                </p>
                <h2 className="mt-2 text-3xl font-semibold text-[var(--olive)]">
                  เข้าสู่ระบบแอดมิน
                </h2>
                <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                  ใช้อีเมลและรหัสผ่านเพื่อเข้าสู่หน้าจัดการในระบบ prototype
                </p>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-[var(--olive)]">Email</span>
                  <input
                    autoComplete="email"
                    className="w-full rounded-[1rem] border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none transition focus:border-[var(--olive)]"
                    placeholder="boyrts@gmail.com"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-[var(--olive)]">Password</span>
                  <input
                    autoComplete="current-password"
                    className="w-full rounded-[1rem] border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none transition focus:border-[var(--olive)]"
                    placeholder="••••••••"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </label>

                {error ? (
                  <p className="rounded-[1rem] bg-[#fff1f1] px-4 py-3 text-sm text-[#a94442] ring-1 ring-[#f0c6c6]">
                    {error}
                  </p>
                ) : null}

                <button
                  className="w-full rounded-full bg-[var(--olive)] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(83,96,56,0.18)] transition hover:bg-[var(--sage)] disabled:cursor-not-allowed disabled:opacity-70"
                  disabled={isSubmitting}
                  type="submit"
                >
                  {isSubmitting ? "กำลังตรวจสอบ..." : "เข้าสู่ระบบ"}
                </button>
              </form>

              <div className="mt-5 flex items-center justify-between text-sm text-[var(--muted)]">
                <span>Prototype only</span>
                <Link className="font-semibold text-[var(--olive)]" href="/member">
                  ไปหน้าสมาชิก
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
