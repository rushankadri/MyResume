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

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    try {
        const { messages } = await req.json();
        const userMessage = messages[messages.length - 1].content;

        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: SYSTEM_PROMPT }],
                },
                {
                    role: "model",
                    parts: [{ text: "Understood. I will answer questions based on your resume context." }],
                },
            ],
        });

        const result = await chat.sendMessage(userMessage);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({
            message: text,
        });
    } catch (error) {
        console.error("Gemini Error:", error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Unknown error occurred" },
            { status: 500 }
        );
    }
}
