function ResumeUploader({ resumeFile, setResumeFile }) {

    const handleFileChange = (event) => {
  
      const file = event.target.files[0];
  
      if (file) {
        setResumeFile(file);
      }
    };
  
    return (
      <div className="card">
  
        <h2>📄 Upload Resume</h2>
  
        <p>Select your resume in PDF format.</p>
  
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
        />
  
        {resumeFile && (
          <p style={{ marginTop: "15px", color: "green" }}>
            ✅ {resumeFile.name}
          </p>
        )}
  
      </div>
    );
  }
  
  export default ResumeUploader;