"use client";

import { useState } from "react";
import type { MessageGraphSnapshot } from "@/types/messages";

type CoachMessageActionsProps = {
  graphSnapshot: MessageGraphSnapshot | null;
  memberName: string;
  memberSlug: string;
  message: string;
  primaryAction: string;
  secondaryActions: [string, string];
};

const actionPrimaryClassName =
  "group inline-flex w-full items-center justify-center gap-2 rounded-[14px] bg-[#64FFDA] px-5 py-4 text-[14px] font-semibold text-[#121212] shadow-none transition-all duration-200 hover:bg-[#7CFFE2] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70";
const actionSecondaryClassName =
  "w-full rounded-[14px] border border-[#343434] bg-[#2B2B2E] px-4 py-4 text-[13px] font-semibold text-white shadow-none transition-all duration-200 hover:border-[#4A4A4A] hover:bg-[#303033]";

export function CoachMessageActions({
  graphSnapshot,
  memberName,
  memberSlug,
  message,
  primaryAction,
  secondaryActions,
}: CoachMessageActionsProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [draftMessage, setDraftMessage] = useState(message);

  async function sendMessage() {
    setStatus("sending");
    setErrorMessage("");

    const response = await fetch("/api/coach/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        graphSnapshot,
        memberName,
        memberSlug,
        message: draftMessage,
      }),
    });

    if (!response.ok) {
      const body = (await response.json().catch(() => null)) as { error?: string } | null;
      setErrorMessage(body?.error ?? "ส่งไม่สำเร็จ");
      setStatus("error");
      return;
    }

    setStatus("sent");
  }

  return (
    <div className="space-y-2.5">
      <textarea
        className="min-h-[220px] w-full resize-y rounded-[16px] border border-[#343434] bg-[#2B2B2E] p-4 text-[13px] leading-7 text-[#F6F3EA] outline-none transition-colors duration-200 placeholder:text-[#8E8E93] focus:border-[#64FFDA]"
        disabled={status === "sending"}
        onChange={(event) => {
          setDraftMessage(event.target.value);
          if (status !== "idle") {
            setStatus("idle");
          }
        }}
        value={draftMessage}
      />
      <button
        className={actionPrimaryClassName}
        disabled={status === "sending" || draftMessage.trim().length === 0}
        onClick={sendMessage}
        type="button"
      >
        <span className="flex items-center justify-center gap-2">
          {status === "sending" ? "กำลังส่ง..." : status === "sent" ? "ส่งแล้ว" : "ส่งข้อความนี้ให้สมาชิก"}
          <ArrowIcon />
        </span>
      </button>
      <div className="grid grid-cols-2 gap-2.5">
        <button
          className={actionSecondaryClassName}
          onClick={() => setDraftMessage(message)}
          type="button"
        >
          คืนค่า template
        </button>
        <button
          className={actionSecondaryClassName}
          onClick={() => navigator.clipboard.writeText(draftMessage)}
          type="button"
        >
          {secondaryActions[0]}
        </button>
      </div>
      {status === "error" ? (
        <p className="text-center text-[11px] leading-5 text-[#FF9100]">
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        d="M13 7l5 5m0 0l-5 5m5-5H6"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2.5}
      />
    </svg>
  );
}
