function JobDescription({ jobDescription, setJobDescription }) {
    return (
      <div className="card">
        <h2>💼 Job Description</h2>
  
        <textarea
          rows="10"
          placeholder="Paste Job Description here..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
      </div>
    );
  }
  
  export default JobDescription;