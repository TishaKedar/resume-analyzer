import { useState } from "react";
import "./App.css";
import jsPDF from "jspdf";

import { extractTextFromPDF } from "./utils/pdfParser";
import { analyzeResume } from "./services/api";

import Navbar from "./components/Navbar";
import ResumeUploader from "./components/ResumeUploader";
import JobDescription from "./components/JobDescription";
import AnalyzeButton from "./components/AnalyzeButton";
import ATSScore from "./components/ATSScore";
import AnalysisCard from "./components/AnalysisCard";

function App() {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🧠 Clean JSON helper
  const cleanJSON = (str) => {
    return str
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
  };

  // 🚀 ANALYZE FUNCTION
  const handleAnalyze = async () => {
    try {
      if (!resumeFile) {
        alert("Please upload a resume.");
        return;
      }
  
      if (!jobDescription.trim()) {
        alert("Please enter the job description.");
        return;
      }
  
      setLoading(true);
  
      const resumeText = await extractTextFromPDF(resumeFile);
  
      const result = await analyzeResume(resumeText, jobDescription);
  
      // SAFE JSON HANDLING (FIXES PHONE ISSUE)
      let parsedData = result;
  
      if (typeof result === "string") {
        parsedData = JSON.parse(result);
      }
  
      setAnalysis(parsedData);
    } catch (error) {
      console.error(error);
      alert("Analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // 📄 DOWNLOAD PDF REPORT
  const downloadReport = () => {
    if (!analysis) return alert("No analysis to download");

    const doc = new jsPDF();

    let y = 10;

    doc.setFontSize(16);
    doc.text("ATS Resume Report", 10, y);

    y += 10;

    doc.setFontSize(12);
    doc.text(`ATS Score: ${analysis.atsScore}`, 10, y);

    y += 10;

    const addSection = (title, items) => {
      doc.text(title, 10, y);
      y += 7;

      items?.forEach((item) => {
        doc.text(`- ${item}`, 10, y);
        y += 7;
      });

      y += 5;
    };

    addSection("Strengths", analysis.strengths);
    addSection("Missing Keywords", analysis.missingKeywords);
    addSection("Weaknesses", analysis.weaknesses);
    addSection("Suggestions", analysis.suggestions);

    y += 5;

    doc.text("Recruiter Feedback:", 10, y);
    y += 7;
    doc.text(analysis.recruiterFeedback || "", 10, y);

    doc.save("ATS_Report.pdf");
  };

  return (
    <>
      <Navbar />

      <main className="container">

        <ResumeUploader
          resumeFile={resumeFile}
          setResumeFile={setResumeFile}
        />

        <JobDescription
          jobDescription={jobDescription}
          setJobDescription={setJobDescription}
        />

        <AnalyzeButton
          loading={loading}
          handleAnalyze={handleAnalyze}
        />

        <button
          onClick={downloadReport}
          disabled={!analysis}
          style={{ marginTop: "10px" }}
        >
          📄 Download Report
        </button>

        <ATSScore analysis={analysis} />
        <AnalysisCard analysis={analysis} />

      </main>
    </>
  );
}

export default App;