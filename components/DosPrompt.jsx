import { useState } from "react";

export default function DosPrompt() {
  const [cmd, setCmd] = useState("");
  const [log, setLog] = useState(["C:\\blog>"]);

  function handleEnter(e) {
    if (e.key === "Enter") {
      setLog((prev) => [...prev, `C:\\blog>${cmd}`]);
      setCmd("");
    }
  }

  return (
    <div style={{ backgroundColor: "#000", color: "#0f0", padding: "2rem", fontFamily: "Courier New, monospace", height: "100vh" }}>
      {log.map((line, idx) => <div key={idx}>{line}</div>)}
      <span>C:\blog&gt;</span>
      <input
        autoFocus
        style={{ background: "transparent", border: "none", color: "#0f0", fontFamily: "inherit", outline: "none" }}
        value={cmd}
        onChange={(e) => setCmd(e.target.value)}
        onKeyDown={handleEnter}
      />
    </div>
  );
}
