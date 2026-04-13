import React from "react";

function ResumeDownload() {
  const downloadResume = () => {
    // Check if file exists in public folder
    const link = document.createElement("a");
    link.href = "./Profile.pdf"; 
    link.download = "Ayan_Ahmad_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const generateResume = () => {
    window.open("https://rxresu.me/", "_blank"); // Professional Resume Builder Link
  };

  return (
    <div style={{ marginTop: 20, display: 'flex', gap: 10 }}>
      <button
        onClick={downloadResume}
        className="btn-hover"
        style={{
          padding: "12px 20px",
          borderRadius: 12,
          background: "rgba(6, 182, 212, 0.1)",
          border: "1px solid rgba(6, 182, 212, 0.3)",
          cursor: "pointer",
          color: "#06b6d4",
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: 8
        }}
      >
        <span>📂</span> Download CV
      </button>
      
      <button
        onClick={generateResume}
        className="btn-hover"
        style={{
          padding: "12px 20px",
          borderRadius: 12,
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.1)",
          cursor: "pointer",
          color: "white",
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: 8
        }}
      >
        <span>✨</span> Get Custom Resume
      </button>
    </div>
  );
}

export default ResumeDownload;
