import React from "react";
import { useEffect } from 'react'

const RPS = () => {
  useEffect(() => {
      document.body.style.overflow = "hidden";
  
      return () => {
        // Cleanup on unmount
        document.body.style.overflow = "";
      };
    }, []);

  return (
    <div>
      <iframe
        src="/games/rps/index.html"
        style={{ width: "100vw", height: "100vh", border: "none" }}
        title="RPS"
      ></iframe>
    </div>
  );
};

export default RPS;