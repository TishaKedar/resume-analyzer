function AnalyzeButton({ loading, handleAnalyze }) {
    return (
      <button onClick={handleAnalyze}>
        {loading ? "Analyzing..." : "Analyze Resume"}
      </button>
    );
  }
  
  export default AnalyzeButton;