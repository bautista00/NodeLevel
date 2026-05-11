"use client";
import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export function useWaitlistForm(source: string, tier = "FOUNDERS") {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [code, setCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setError(null);

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, tier, source }),
      });
      const data = await res.json();
      if (!data.ok) {
        setStatus("error");
        setError(data.error || "Algo salió mal");
        return;
      }
      setCode(data.code);
      setStatus("success");
    } catch {
      setStatus("error");
      setError("Error de red. Intentá de nuevo.");
    }
  }

  return { email, setEmail, status, code, error, onSubmit };
}
