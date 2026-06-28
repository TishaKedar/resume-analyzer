import axios from "axios";

const WEBHOOK_URL =
  "https://n8n-production-03b7.up.railway.app/webhook/resume-analyzer";

export async function analyzeResume(resume, jobDescription) {
  try {
    const response = await axios.post(
      WEBHOOK_URL,
      {
        resume,
        jobDescription,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}