"use client";

import {
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { useTheme } from "@/lib/theme/ThemeProvider";

type Props = {
  children: ReactNode;
  className?: string;
  size?: number;
};

const LIGHT_HOVER_SHADOW = "0px 0px 15px 0px #242424CC";
const NIGHT_HOVER_SHADOW = "0px 0px 16px 0px rgba(245, 243, 238, 0.65)";

export default function HeaderUtilityIcon({
  children,
  className = "",
  size = 40,
}: Props) {
  const { theme } = useTheme();
  const isNight = theme === "ink-night";
  const [hovered, setHovered] = useState(false);

  const style: CSSProperties = {
    width: size,
    height: size,
    // Light theme: cream pill + dark shadow. Night: only white glow, no fill / no filter change.
    backgroundColor: !isNight && hovered ? "var(--color-white)" : undefined,
    boxShadow: hovered
      ? isNight
        ? NIGHT_HOVER_SHADOW
        : LIGHT_HOVER_SHADOW
      : undefined,
  };

  return (
    <div
      className={`header-utility-icon flex items-center justify-center rounded-full transition-all duration-300 ${className}`}
      style={style}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        className="flex items-center justify-center [&_img]:object-contain"
        style={{
          filter: isNight ? "brightness(0) invert(0.92)" : undefined,
        }}
      >
        {children}
      </span>
    </div>
  );
}
