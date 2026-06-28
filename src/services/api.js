import axios from "axios";

const WEBHOOK_URL = "http://localhost:5678/webhook-test/resume-analyzer";

export async function analyzeResume(resume, jobDescriptions) {
  const response = await axios.post(WEBHOOK_URL, {
    resume,
    jobDescriptions
  });

  return response.data;
}