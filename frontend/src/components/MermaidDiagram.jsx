import { useEffect, useRef } from "react";
import mermaid from "mermaid";

export default function MermaidDiagram({ chart }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!chart) return;

    mermaid.initialize({
      startOnLoad: false,
      theme: "neutral",
      securityLevel: "loose",
    });

    try {
      const id = "mermaid-" + Math.random().toString(36).substring(2, 9);

      // 🔥 FIX: convert \n to real newlines
      const formattedChart = chart.replace(/\\n/g, "\n");

      mermaid.render(id, formattedChart).then(({ svg }) => {
        if (ref.current) {
          ref.current.innerHTML = svg;
        }
      });
    } catch (error) {
      console.error("Mermaid render error:", error);
    }
  }, [chart]);

  return (
    <div className="bg-white p-4 rounded-xl shadow overflow-auto">
      <div ref={ref} />
    </div>
  );
}
