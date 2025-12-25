"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import projectsData from "@/data/projects.json";
import { Github, ExternalLink, Code } from "lucide-react";

export function ProjectsSection() {
    return (
        <Section id="projects" className="bg-black/50">
            <Container>
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Featured Projects</h2>
                    <p className="text-gray-400">A selection of my best work.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projectsData.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative bg-white/5 rounded-2xl border border-white/10 overflow-hidden hover:border-primary/50 transition-all hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(147,51,234,0.3)]"
                        >
                            {/* Placeholder Logic */}
                            <div className="aspect-video bg-gradient-to-br from-gray-800 to-black relative flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                                <Code size={48} className="text-gray-600 group-hover:text-primary" />
                                {/* Overlay on hover */}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                    <a href={project.github} className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md">
                                        <Github size={20} />
                                    </a>
                                    <a href={project.demo} className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md">
                                        <ExternalLink size={20} />
                                    </a>
                                </div>
                            </div>

                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                                <p className="text-gray-400 text-sm mb-4 line-clamp-3">{project.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {project.tech.map(t => (
                                        <span key={t} className="px-2 py-1 rounded-md bg-white/5 text-xs text-gray-300 border border-white/5">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </Section>
    );
}
