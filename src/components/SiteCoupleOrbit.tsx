'use client';

import { motion, useReducedMotion } from "framer-motion";
import { publicAsset } from "@/config/site";

/**
 * Floating couple companion shown across the full scrolling invitation.
 * The supplied artwork is a 2D/3D-styled render; true 360-degree articulated
 * character motion requires a rigged GLB model in public/models/couple.glb.
 */
export default function SiteCoupleOrbit() {
  const reduce = useReducedMotion();
  return (
    <motion.aside
      className="site-couple-orbit"
      aria-label="Wedding couple animation"
      initial={{ opacity: 0, scale: .8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: .8, delay: 1 }}
    >
      <motion.div
        className="site-couple-orbit__inner"
        animate={reduce ? {} : { y: [0, -10, 0], rotate: [-2, 2, -2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <img src={publicAsset("/images/characters/couple-hero.webp")} alt="" />
        <span className="orbit-spark">✦</span>
      </motion.div>
    </motion.aside>
  );
}
