"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import certificatesData from "@/data/certificates.json";
import { Award, X, ExternalLink } from "lucide-react";
import Image from "next/image";

export function CertificatesSection() {
    const [selectedCert, setSelectedCert] = useState<(typeof certificatesData)[0] | null>(null);
    const [width, setWidth] = useState(0);
    const carouselRef = useRef<HTMLDivElement>(null);
    const controls = useAnimation();

    useEffect(() => {
        if (carouselRef.current) {
            setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
        }
    }, []);

    return (
        <Section id="certificates">
            <Container>
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Certifications</h2>
                    <p className="text-gray-400">Validated expertise from industry leaders.</p>
                </div>

                <motion.div
                    ref={carouselRef}
                    className="overflow-hidden cursor-grab active:cursor-grabbing"
                    whileTap={{ cursor: "grabbing" }}
                >
                    <motion.div
                        drag="x"
                        dragConstraints={{ right: 0, left: -width }}
                        className="flex gap-8"
                    >
                        {certificatesData.map((cert) => (
                            <motion.div
                                key={cert.id}
                                className="min-w-[300px] md:min-w-[400px] bg-white/5 rounded-2xl border border-white/10 overflow-hidden hover:border-primary/50 transition-colors group cursor-pointer"
                                onClick={() => setSelectedCert(cert)}
                            >
                                <div className="h-48 bg-gradient-to-br from-gray-800 to-black relative flex items-center justify-center">
                                    {/* Placeholder for image if standard next/image fails or is empty, using icon */}
                                    <Award size={48} className="text-gray-600 group-hover:text-primary transition-colors" />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{cert.title}</h3>
                                    <p className="text-gray-400 mb-1">{cert.issuer}</p>
                                    <p className="text-sm text-gray-500">{cert.date}</p>
                                </div>
                            </motion.div>
                        ))}
                        {/* Duplicate for infinite loop illusion if needed, but keeping simple drag for now */}
                    </motion.div>
                </motion.div>
            </Container>

            {/* Modal */}
            <AnimatePresence>
                {selectedCert && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
                        onClick={() => setSelectedCert(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-zinc-900 border border-white/10 p-8 rounded-3xl max-w-2xl w-full relative shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedCert(null)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-white"
                            >
                                <X />
                            </button>

                            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                                <div className="flex-shrink-0 w-full md:w-1/3 aspect-video bg-gradient-to-br from-gray-800 to-black rounded-xl flex items-center justify-center">
                                    <Award size={64} className="text-primary" />
                                </div>
                                <div>
                                    <h2 className="text-3xl font-bold mb-2">{selectedCert.title}</h2>
                                    <p className="text-xl text-primary font-medium mb-4">{selectedCert.issuer}</p>
                                    <p className="text-gray-400 mb-6">Issued on {selectedCert.date}</p>
                                    <a href={selectedCert.link} className="inline-flex items-center gap-2 text-white hover:text-primary transition-colors">
                                        Verify Credential <ExternalLink size={16} />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </Section>
    );
}
