'use client';

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { publicAsset } from "@/config/site";

type Props = { mood?: "idle" | "greeting" | "dancing" | "thankyou" | "celebrating"; compact?: boolean };

export default function CoupleCharacter({ mood = "idle", compact = false }: Props) {
  const reduce = useReducedMotion();
  const variants = {
    idle: { y: reduce ? 0 : [0, -7, 0], rotate: reduce ? 0 : [0, 0.8, 0] },
    greeting: { y: [0, -5, 0], rotate: [0, -2, 2, 0] },
    dancing: { y: [0, -12, 0, -8, 0], rotate: [-2, 2, -2, 2, 0] },
    thankyou: { y: [0, 4, 0], scale: [1, 0.98, 1] },
    celebrating: { y: [0, -15, 0], rotate: [-3, 3, -3, 0] }
  } satisfies Variants;
  return (
    <motion.div
      className={`couple-art ${compact ? "couple-art--compact" : ""}`}
      variants={variants}
      animate={mood}
      transition={{ duration: mood === "idle" ? 4 : 1.15, repeat: mood === "idle" ? Infinity : 0, ease: "easeInOut" }}
      whileHover={reduce ? undefined : { y: -5, scale: 1.025 }}
      aria-label="Illustration of an Indian bride and groom in traditional wedding attire"
      role="img"
    >
      <div className="couple-glow" />
      <img src={publicAsset("/images/characters/couple-hero.webp")} alt="" />
      <span className="sparkle sparkle--one">✦</span><span className="sparkle sparkle--two">✧</span>
    </motion.div>
  );
}
