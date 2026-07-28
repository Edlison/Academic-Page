"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

const CHARSET = "!@#$%^&*()_+-=[]{}|;:,.<>/?~";

function randomChar() {
  return CHARSET[(Math.random() * CHARSET.length) | 0];
}

function shuffleInPlace(values: number[]) {
  for (let index = values.length - 1; index > 0; index -= 1) {
    const swapIndex = (Math.random() * (index + 1)) | 0;
    [values[index], values[swapIndex]] = [
      values[swapIndex],
      values[index],
    ];
  }

  return values;
}

type ScrambleLinkProps = {
  label: string;
};

export function ScrambleLink({ label }: ScrambleLinkProps) {
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const anchor = anchorRef.current;
    const target = textRef.current;

    if (!anchor || !target) return;

    const chars = Array.from(label);
    let animationFrame = 0;
    let startTime = 0;
    let lastUpdate = 0;
    let phase = 0;
    let order: number[] = [];
    let rank: number[] = [];
    let pairs: ([string, string] | null)[] = [];

    const stop = () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      animationFrame = 0;
      startTime = 0;
      target.classList.remove("is-scrambling", "scramble-italic");
      target.textContent = label;
    };

    const run = () => {
      stop();

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const durationMs = 500;
      const updateIntervalMs = 50;
      startTime = performance.now();
      lastUpdate = 0;
      phase = 0;

      const activeIndices = chars.flatMap((character, index) =>
        character === " " ? [] : [index],
      );
      order = shuffleInPlace(activeIndices);
      rank = Array(chars.length).fill(-1);
      order.forEach((characterIndex, index) => {
        rank[characterIndex] = index;
      });
      pairs = chars.map((character) =>
        character === " " ? null : [randomChar(), randomChar()],
      );

      target.classList.add("is-scrambling");
      target.classList.remove("scramble-italic");

      const tick = (now: number) => {
        const progress = Math.min(1, (now - startTime) / durationMs);
        const revealCount = Math.floor(progress * (order.length + 1));

        if (!lastUpdate) lastUpdate = now;
        if (now - lastUpdate < updateIntervalMs && progress < 1) {
          animationFrame = requestAnimationFrame(tick);
          return;
        }

        lastUpdate = now;
        phase += 1;
        if (progress < 1) {
          target.classList.toggle("scramble-italic", (phase & 1) === 1);
        }

        target.textContent = chars
          .map((character, index) => {
            if (character === " ") return character;
            if (rank[index] !== -1 && rank[index] < revealCount) {
              return character;
            }

            const pair = pairs[index];
            return pair ? pair[(phase + index) & 1] : character;
          })
          .join("");

        if (progress < 1) {
          animationFrame = requestAnimationFrame(tick);
        } else {
          animationFrame = 0;
          target.classList.remove("is-scrambling", "scramble-italic");
          target.textContent = label;
        }
      };

      animationFrame = requestAnimationFrame(tick);
    };

    anchor.addEventListener("mouseenter", run);
    anchor.addEventListener("focus", run);
    anchor.addEventListener("mouseleave", stop);
    anchor.addEventListener("blur", stop);

    return () => {
      anchor.removeEventListener("mouseenter", run);
      anchor.removeEventListener("focus", run);
      anchor.removeEventListener("mouseleave", stop);
      anchor.removeEventListener("blur", stop);
      stop();
    };
  }, [label]);

  return (
    <Link
      aria-label={label}
      className="scramble-link flex flex-row items-center justify-center gap-2"
      data-scramble={label}
      href="/"
      ref={anchorRef}
    >
      <span className="sr-only">{label}</span>
      <span
        aria-hidden="true"
        className="scramble-link__text text-xl font-black"
        ref={textRef}
      >
        {label}
      </span>
    </Link>
  );
}
