"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import resumeData from "@/data/resume.json";
import { ArrowRight, Download } from "lucide-react";
import Link from "next/link";

export function Hero() {
    const { name, role, tagline } = resumeData.profile;

    return (
        <Section id="hero" className="relative flex min-h-screen items-center justify-center overflow-hidden pt-0">
            {/* Background Glow */}
            <div className="absolute top-0 left-0 right-0 h-[500px] w-full bg-primary/20 blur-[120px] rounded-full opacity-20 pointer-events-none" />

            <Container className="relative z-10 flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <span className="mb-4 inline-block rounded-full bg-white/5 px-3 py-1 text-sm font-medium text-primary backdrop-blur-md border border-white/10">
                        Open to work
                    </span>
                    <h1 className="text-5xl md:text-8xl font-black tracking-tight mb-6">
                        {name}
                    </h1>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-400 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-600">
                        {role}
                    </h2>
                    <p className="max-w-2xl text-lg md:text-xl text-gray-500 mb-10">
                        {tagline}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link
                            href="/resume.pdf" // Placeholder path
                            className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-colors"
                        >
                            <Download size={20} />
                            Download Resume
                        </Link>
                        <Link
                            href="#projects"
                            className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-white/10 text-white font-semibold backdrop-blur-md border border-white/10 hover:bg-white/20 transition-colors"
                        >
                            View Projects
                            <ArrowRight size={20} />
                        </Link>
                    </div>
                </motion.div>
            </Container>
        </Section>
    );
}
