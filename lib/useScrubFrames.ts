"use client";

import { useEffect, useRef, useState } from "react";

type Mode = "loading" | "frames" | "video" | "reduced" | "mobile";

export interface ScrubFramesState {
  mode: Mode;
  loaded: number;
  total: number;
  ready: boolean;
}

const MOBILE_BREAKPOINT = 900;

function isMobileViewport() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`).matches ||
    window.matchMedia("(pointer: coarse)").matches
  );
}

export interface UseScrubFramesOptions {
  /** Path al manifest JSON producido por scripts/extract-frames.sh */
  manifestUrl?: string;
  /** Patrón de nombre de frame: padNumber se aplica con padStart(3, '0') */
  framePattern?: (i: number) => string;
}

/**
 * Hook que maneja la carga progresiva de la secuencia de frames.
 * - Si encuentra /frames/manifest.json → modo "frames" (canvas + image sequence, técnica Apple)
 * - Si NO lo encuentra → modo "video" (fallback automático a <video> + currentTime scrub)
 * - Si prefers-reduced-motion → modo "reduced" (un solo poster, sin animación)
 *
 * El componente que lo consume debe registrar el canvasRef o videoRef y dibujar
 * según `getProgress()` provisto por el caller.
 */
export function useScrubFrames(opts: UseScrubFramesOptions = {}) {
  const {
    manifestUrl = "/frames/manifest.json",
    framePattern = (i) => `/frames/frame_${String(i).padStart(3, "0")}.jpg`,
  } = opts;

  const [state, setState] = useState<ScrubFramesState>({
    mode: "loading",
    loaded: 0,
    total: 0,
    ready: false,
  });

  const imagesRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    let cancelled = false;

    if (typeof window === "undefined") return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setState({ mode: "reduced", loaded: 0, total: 0, ready: true });
      return;
    }

    if (isMobileViewport()) {
      setState({ mode: "mobile", loaded: 0, total: 0, ready: true });
      return;
    }

    async function init() {
      try {
        const res = await fetch(manifestUrl, { cache: "force-cache" });
        if (!res.ok) throw new Error("no manifest");
        const manifest = (await res.json()) as { count: number };
        if (!manifest?.count) throw new Error("invalid manifest");

        if (cancelled) return;

        const total = manifest.count;
        setState({ mode: "frames", loaded: 0, total, ready: false });

        const images: HTMLImageElement[] = new Array(total);
        imagesRef.current = images;

        let loaded = 0;
        const tickets = Array.from({ length: total }, (_, i) => i + 1);

        const loadOne = (n: number) =>
          new Promise<void>((resolve) => {
            const img = new Image();
            img.decoding = "async";
            img.loading = "eager";
            img.onload = img.onerror = () => {
              loaded += 1;
              if (!cancelled) {
                setState((s) => ({
                  ...s,
                  loaded,
                  ready: loaded >= Math.min(8, total),
                }));
              }
              resolve();
            };
            img.src = framePattern(n);
            images[n - 1] = img;
          });

        // Cargar los primeros 8 en serie (para tener algo dibujable rápido)
        for (let i = 0; i < Math.min(8, total); i++) {
          if (cancelled) return;
          await loadOne(tickets[i]);
        }

        // El resto en paralelo, con concurrencia limitada
        const remaining = tickets.slice(8);
        const CONCURRENCY = 6;
        let cursor = 0;
        await Promise.all(
          Array.from({ length: CONCURRENCY }, async () => {
            while (cursor < remaining.length) {
              const idx = cursor++;
              if (cancelled) return;
              await loadOne(remaining[idx]);
            }
          })
        );

        if (!cancelled) {
          setState((s) => ({ ...s, ready: true }));
        }
      } catch {
        // No hay manifest → modo video fallback
        if (!cancelled) {
          setState({ mode: "video", loaded: 0, total: 0, ready: true });
        }
      }
    }

    init();

    return () => {
      cancelled = true;
    };
  }, [manifestUrl, framePattern]);

  return { state, images: imagesRef };
}
