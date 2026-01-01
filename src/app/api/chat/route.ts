import { NextResponse } from "next/server";
import OpenAI from "openai";
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
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        return NextResponse.json(
            { error: "OpenAI API Key is missing. Please set OPENAI_API_KEY in .env.local" },
            { status: 500 }
        );
    }

    const openai = new OpenAI({ apiKey });

    try {
        const { messages } = await req.json();

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                ...messages,
            ],
            temperature: 0.7,
            max_tokens: 500,
        });

        return NextResponse.json({
            message: completion.choices[0].message.content,
        });
    } catch (error) {
        console.error("OpenAI Error:", error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Unknown error occurred" },
            { status: 500 }
        );
    }
}
