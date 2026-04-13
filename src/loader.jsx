import React from "react";
import "./loader.css";

const Loader = () => {
  return (
    <div className="loader-screen">
      <div className="loader-circle"></div>
      <h2 className="loader-title">Ayan Portfolio React App</h2>
      <p className="loader-subtitle">Installing packages...</p>
    </div>
  );
};

export default Loader;
