import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import resumeData from "@/data/resume.json";
import timelineData from "@/data/timeline.json";
import growthData from "@/data/growth-graph.json";
import certificatesData from "@/data/certificates.json";
import projectsData from "@/data/projects.json";

const SYSTEM_PROMPT = `You are an AI assistant representing Alex Dev's professional resume.
You must answer only from the provided resume, projects, and certificate data.
If the information is not present, respond with:
'That information is not available in my resume yet.'
Maintain a professional and confident tone.

Here is the context data:
Resume: ${JSON.stringify(resumeData)}
Timeline: ${JSON.stringify(timelineData)}
Career Growth: ${JSON.stringify(growthData)}
Certificates: ${JSON.stringify(certificatesData)}
Projects: ${JSON.stringify(projectsData)}
`;

export async function POST(req: Request) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        return NextResponse.json(
            { error: "GEMINI_API_KEY is missing. Please set it in .env.local" },
            { status: 500 }
        );
    }

    try {
        const { messages } = await req.json();
        const userMessage = messages[messages.length - 1].content;

        // DEBUG SCRIPT: List Available Models
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`,
            {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            }
        );

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`ListModels Error: ${response.status} - ${JSON.stringify(errorData)}`);
        }

        const data = await response.json();
        // Filter for generateContent supported models
        const availableModels = data.models
            .filter((m: any) => m.supportedGenerationMethods.includes("generateContent"))
            .map((m: any) => m.name)
            .join(", ");

        return NextResponse.json({
            message: `DEBUG MODE: Available Models for your Key: ${availableModels}`,
        });
    } catch (error) {
        console.error("Gemini Error:", error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Unknown error occurred" },
            { status: 500 }
        );
    }
}
