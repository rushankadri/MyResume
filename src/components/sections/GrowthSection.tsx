"use client";

import { motion } from "framer-motion";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import growthData from "@/data/growth-graph.json";

const contentStyle = {
    backgroundColor: "rgba(0,0,0,0.8)",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.1)",
    padding: "12px",
    color: "#fff",
};

export function GrowthSection() {
    return (
        <Section id="growth" className="bg-black/50">
            <Container>
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Career Growth</h2>
                    <p className="text-gray-400">Visualizing my technical progression over time.</p>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="h-[400px] w-full p-6 bg-white/5 rounded-3xl border border-white/10"
                >
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={growthData}>
                            <defs>
                                <linearGradient id="colorGrowth" x1="0" y1="0" x2="1" y2="0">
                                    <stop offset="0%" stopColor="#3b82f6" />
                                    <stop offset="100%" stopColor="#9333ea" />
                                </linearGradient>
                                <filter id="glow">
                                    <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                                    <feMerge>
                                        <feMergeNode in="coloredBlur" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                            <XAxis dataKey="year" stroke="#666" tick={{ fill: "#999" }} />
                            <YAxis hide />
                            <Tooltip
                                contentStyle={contentStyle}
                                itemStyle={{ color: "#22d3ee" }}
                                cursor={{ stroke: "rgba(255,255,255,0.2)" }}
                            />
                            <Line
                                type="monotone"
                                dataKey="score"
                                stroke="url(#colorGrowth)"
                                strokeWidth={4}
                                dot={{ fill: "#fff", r: 4, strokeWidth: 0 }}
                                activeDot={{ r: 8, fill: "#22d3ee", filter: "url(#glow)" }}
                                filter="url(#glow)"
                                animationDuration={2000}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </motion.div>
            </Container>
        </Section>
    );
}
