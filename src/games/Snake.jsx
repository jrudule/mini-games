import React from "react";
import { useEffect } from 'react'

const Snake = () => {
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
        src="/games/snake/index.html"
        style={{ width: "100vw", height: "100vh", border: "none" }}
        title="Snake"
      ></iframe>
    </div>
  );
};

export default Snake;
