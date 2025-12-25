"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import timelineData from "@/data/timeline.json";
import { Calendar, X } from "lucide-react";

export function TimelineSection() {
    const [selectedItem, setSelectedItem] = useState<(typeof timelineData)[0] | null>(null);

    return (
        <Section id="timeline" className="relative min-h-[800px]">
            <Container>
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Career Timeline</h2>
                    <p className="text-gray-400">Click on a milestone to view details.</p>
                </div>

                <div className="relative mx-auto max-w-4xl">
                    {/* Vertical Line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/20 transform -translate-x-1/2" />

                    {timelineData.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative flex items-center justify-between mb-12 ${index % 2 === 0 ? "flex-row-reverse" : ""
                                }`}
                        >
                            <div className="w-5/12" />

                            {/* Node */}
                            <button
                                onClick={() => setSelectedItem(item)}
                                className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-black border-2 border-white/20 hover:border-primary hover:shadow-[0_0_15px_rgba(147,51,234,0.5)] transition-all z-10 flex items-center justify-center group"
                            >
                                <div className="w-3 h-3 bg-white rounded-full group-hover:bg-primary transition-colors" />
                            </button>

                            {/* Content Card */}
                            <div
                                className={`w-5/12 cursor-pointer group ${index % 2 === 0 ? "text-right" : "text-left"
                                    }`}
                                onClick={() => setSelectedItem(item)}
                            >
                                <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                                    <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold mb-3">
                                        {item.year}
                                    </span>
                                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-primary transition-colors">{item.title}</h3>
                                    <p className="text-gray-400 text-sm">{item.company}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Container>

            {/* Modal */}
            <AnimatePresence>
                {selectedItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                        onClick={() => setSelectedItem(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-zinc-900 border border-white/10 p-8 rounded-3xl max-w-lg w-full relative shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedItem(null)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-white"
                            >
                                <X />
                            </button>

                            <div className="flex items-center gap-2 text-primary font-bold mb-2">
                                <Calendar size={16} />
                                <span>{selectedItem.year}</span>
                            </div>
                            <h2 className="text-3xl font-bold mb-2">{selectedItem.title}</h2>
                            <h3 className="text-xl text-gray-400 mb-6">{selectedItem.company}</h3>

                            <p className="text-gray-300 leading-relaxed">
                                {selectedItem.description}
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </Section>
    );
}
