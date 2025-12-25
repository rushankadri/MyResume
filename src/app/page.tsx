import { Hero } from "@/components/sections/Hero";
import { ResumeSection } from "@/components/sections/ResumeSection";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { GrowthSection } from "@/components/sections/GrowthSection";
import { CertificatesSection } from "@/components/sections/CertificatesSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";

export default function Home() {
  return (
    <>
      <Hero />
      <ResumeSection />
      <TimelineSection />
      <GrowthSection />
      <CertificatesSection />
      <ProjectsSection />
    </>
  );
}
