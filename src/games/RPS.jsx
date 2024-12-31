import React from "react";

const RPS = () => {
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