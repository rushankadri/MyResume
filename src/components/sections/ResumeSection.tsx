"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import resumeData from "@/data/resume.json";
import { Briefcase, GraduationCap, Code } from "lucide-react";

export function ResumeSection() {
    const { education, skills, experience } = resumeData;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <Section id="resume" className="bg-black/50">
            <Container>
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                    className="space-y-16"
                >
                    {/* Header */}
                    <div className="text-center">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">Resume</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            A timeline of my professional journey and technical expertise.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                        {/* Left Column: Experience & Education */}
                        <div className="space-y-12">

                            {/* Experience */}
                            <div>
                                <h3 className="flex items-center gap-2 text-2xl font-semibold mb-6 text-primary">
                                    <Briefcase size={24} /> Experience
                                </h3>
                                <div className="space-y-8 relative border-l border-white/10 ml-3 pl-8">
                                    {experience.map((job) => (
                                        <motion.div key={job.id} variants={itemVariants} className="relative">
                                            <span className="absolute -left-[41px] top-1 h-5 w-5 rounded-full bg-black border border-primary ring-4 ring-black" />
                                            <h4 className="text-xl font-bold">{job.role}</h4>
                                            <p className="text-gray-300 font-medium">{job.company}</p>
                                            <p className="text-sm text-gray-500 mb-2">{job.period}</p>
                                            <p className="text-gray-400">{job.description}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Education */}
                            <div>
                                <h3 className="flex items-center gap-2 text-2xl font-semibold mb-6 text-secondary">
                                    <GraduationCap size={24} /> Education
                                </h3>
                                <div className="space-y-6">
                                    {education.map((edu, idx) => (
                                        <motion.div key={idx} variants={itemVariants} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
                                            <h4 className="text-xl font-bold">{edu.school}</h4>
                                            <p className="text-secondary font-medium">{edu.degree}</p>
                                            <p className="text-sm text-gray-500">{edu.year}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Skills */}
                        <div>
                            <h3 className="flex items-center gap-2 text-2xl font-semibold mb-6 text-accent">
                                <Code size={24} /> Technical Skills
                            </h3>
                            <div className="space-y-6">
                                {skills.map((skill, idx) => (
                                    <motion.div key={idx} variants={itemVariants}>
                                        <div className="flex justify-between mb-2">
                                            <span className="font-medium text-gray-200">{skill.name}</span>
                                            <span className="text-gray-500">{skill.level}%</span>
                                        </div>
                                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${skill.level}%` }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                                                className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                                            />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Additional decor or skills cloud could go here */}
                        </div>

                    </div>
                </motion.div>
            </Container>
        </Section>
    );
}
