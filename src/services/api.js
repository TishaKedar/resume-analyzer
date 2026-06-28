import axios from "axios";

const WEBHOOK_URL = "https://n8n-production-03b7.up.railway.app/webhook/resume-analyzer"
export async function analyzeResume(resume, jobDescriptions) {
  const response = await axios.post(WEBHOOK_URL, {
    resume,
    jobDescriptions
  });

  return response.data;
}