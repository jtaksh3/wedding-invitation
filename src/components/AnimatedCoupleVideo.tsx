'use client';

import {useEffect, useState} from "react";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";
import { publicAsset } from "@/config/site";

const clips: Record<string, string> = {
    home: publicAsset("/animations/welcome-greeting.webm"),
    invitation: publicAsset("/animations/invitation-namaste.webm"),
    events: publicAsset("/animations/celebration-pose.webm"),
    venue: publicAsset("/animations/wishes-blessing.webm"),
    wishes: publicAsset("/animations/wishes-blessing.webm"),
    closing: publicAsset("/animations/wishes-blessing.webm"),
};

function TransparentCoupleVideo({
                                    src,
                                    className = ""
                                }: {
    src: string;
    className?: string;
}) {
    return (
        <video
            className={className}
            src={src}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
        />
    );
}

export function HeroCoupleVideo() {
    return (
        <div className="hero-couple-video">
            <TransparentCoupleVideo src={clips.home}/>
            <span className="video-spark video-spark--a">✦</span>
            <span className="video-spark video-spark--b">✧</span>
        </div>
    );
}

export default function AnimatedCoupleVideo({activeEvent}: { activeEvent: string }) {
    const [section, setSection] = useState("home");
    const reduceMotion = useReducedMotion();

    useEffect(() => {
        const ids = ["home", "invitation", "events", "venue", "wishes", "closing"];
        const elements = ids.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[];
        const observer = new IntersectionObserver(entries => {
            const visible = entries
                .filter(entry => entry.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
            if (visible) setSection(visible.target.id);
        }, {rootMargin: "-28% 0px -38% 0px", threshold: [0.05, 0.2, 0.45, 0.7]});
        elements.forEach(element => observer.observe(element));
        return () => observer.disconnect();
    }, []);

    const selected = section === "events" && activeEvent === "sangeet"
        ? publicAsset("/animations/celebration-pose.webm")
        : (clips[section] || clips.closing);

    if (section === "home") return null;

    return (
        <aside className="animated-couple-dock" aria-label="Animated wedding couple">
            <AnimatePresence mode="wait">
                <motion.div
                    key={selected}
                    className="animated-couple-dock__video"
                    initial={{opacity: 0, x: 35, scale: .92}}
                    animate={{opacity: 1, x: 0, scale: 1}}
                    exit={{opacity: 0, x: 20, scale: .96}}
                    transition={{duration: reduceMotion ? 0.01 : 0.55, ease: "easeOut"}}
                >
                    <TransparentCoupleVideo src={selected}/>
                </motion.div>
            </AnimatePresence>
            <span className="dock-glint">✦</span>
        </aside>
    );
}
