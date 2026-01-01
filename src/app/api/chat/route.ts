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

        // Construct the prompt with system context
        const contents = [
            {
                role: "user",
                parts: [{ text: SYSTEM_PROMPT + "\n\nUser Question: " + userMessage }]
            }
        ];

        // Direct Fetch to Google Gemini API (Using stable free tier alias)
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ contents }),
            }
        );

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`Gemini API Error: ${response.status} - ${JSON.stringify(errorData)}`);
        }

        const data = await response.json();
        const text = data.candidates[0].content.parts[0].text;

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
