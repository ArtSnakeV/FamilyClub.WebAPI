"use client";

import { INK_ASSETS, type InkPhase } from "./inkAssets";
import { useSpriteAnimation } from "./useSpriteAnimation";

type InkHouseProps = {
  phase: InkPhase;
  onActivate: () => void;
  onBellComplete: () => void;
  reducedMotion: boolean;
};

export default function InkHouse({
  phase,
  onActivate,
  onBellComplete,
  reducedMotion,
}: InkHouseProps) {
  const isOpen = phase === "open" || phase === "emerging";
  const isRinging = phase === "ringing";

  const bellFrame = useSpriteAnimation({
    frames: INK_ASSETS.ringingBell,
    active: isRinging && !reducedMotion,
    frameMs: 85,
    loops: 3,
    onComplete: onBellComplete,
  });

  const houseSrc = isOpen
    ? INK_ASSETS.outOfHouse
    : isRinging
      ? INK_ASSETS.inHouseRinging
      : INK_ASSETS.inHouse;

  const interactive = phase === "idle";

  return (
    <div className="relative h-[280px] w-[210px] select-none">
      <img
        src={houseSrc}
        alt={isOpen ? "Будиночок Ink — порожній" : "Будиночок Ink з котом"}
        className="pointer-events-none absolute inset-0 h-full w-full object-contain"
        draggable={false}
      />

      {/* Click + hover target over the circular house opening */}
      {interactive && (
        <button
          type="button"
          aria-label="Покликати Ink — натисни на котика в кружечку"
          onClick={onActivate}
          className="group absolute left-[26%] top-[5%] z-10 h-[24%] w-[48%] rounded-full border-0 bg-transparent p-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#005B33]"
        >
          <span
            aria-hidden
            className="ink-glow-pulse pointer-events-none absolute inset-[-18%] rounded-full opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
            style={{
              background:
                "radial-gradient(circle, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.22) 45%, transparent 70%)",
              boxShadow: "0 0 22px 8px rgba(255,255,255,0.55)",
            }}
          />
        </button>
      )}

      {/*
        Bell hit area — aligned to the hanging bell on InkInHouse.
        During ringing we swap to InkInHouseRinging (no static bell)
        and overlay RingingBell frames in the same spot.
      */}
      <button
        type="button"
        aria-label="Подзвонити в дзвіночок Ink"
        disabled={!interactive && !isRinging}
        onClick={interactive ? onActivate : undefined}
        className={`absolute z-20 border-0 bg-transparent p-0 ${
          interactive ? "cursor-pointer" : "cursor-default"
        } ${isRinging ? "ink-bell-shake" : ""}`}
        style={{
          left: "55%",
          top: "37.5%",
          width: "22%",
          height: "29%",
        }}
      >
        {isRinging && !reducedMotion && (
          <img
            src={bellFrame}
            alt=""
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 h-full w-auto max-w-none -translate-x-1/2 object-contain object-top"
            draggable={false}
          />
        )}
      </button>
    </div>
  );
}
