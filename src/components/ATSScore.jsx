function ATSScore({ analysis }) {
    if (!analysis) return null;
  
    return (
      <div className="card" style={{ textAlign: "center" }}>
        <h2>🎯 ATS Score</h2>
  
        <h1 style={{ fontSize: "60px", color: "#38bdf8" }}>
          {analysis.atsScore}
        </h1>
  
        {analysis.jobMatch?.map((j, i) => (
          <p key={i}>
            {j.role}: <b>{j.match}%</b>
          </p>
        ))}
      </div>
    );
  }
  
  export default ATSScore;