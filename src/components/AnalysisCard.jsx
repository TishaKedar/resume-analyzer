function Section({ title, items }) {
    if (!items?.length) return null;
  
    return (
      <div style={{ marginBottom: "15px" }}>
        <h2>{title}</h2>
        <ul>
          {items.map((i, idx) => (
            <li key={idx}>{i}</li>
          ))}
        </ul>
      </div>
    );
  }
  
  function AnalysisCard({ analysis }) {
    if (!analysis) return null;
  
    return (
      <div className="card">
  
        <Section title="💪 Strengths" items={analysis.strengths} />
        <Section title="⚠️ Missing Keywords" items={analysis.missingKeywords} />
        <Section title="📉 Weaknesses" items={analysis.weaknesses} />
        <Section title="💡 Suggestions" items={analysis.suggestions} />
        <Section title="❓ Interview Questions" items={analysis.interviewQuestions} />
  
        {analysis.recruiterFeedback && (
          <>
            <h2>🧠 Recruiter Feedback</h2>
            <p>{analysis.recruiterFeedback}</p>
          </>
        )}
  
        {analysis.rewrittenResume && (
          <>
            <h2>✍️ Resume Rewrite</h2>
            {analysis.rewrittenResume.map((r, i) => (
              <div key={i}>
                <p><b>Before:</b> {r.original}</p>
                <p><b>After:</b> {r.improved}</p>
                <hr />
              </div>
            ))}
          </>
        )}
  
      </div>
    );
  }
  
  export default AnalysisCard;