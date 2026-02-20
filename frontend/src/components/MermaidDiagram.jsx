import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

// Icons
const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
);

export default function MermaidDiagram({ chart, title = "Diagram" }) {
    const ref = useRef(null);
    const [svgCode, setSvgCode] = useState("");

    useEffect(() => {
        if (!chart) return;
        mermaid.initialize({ startOnLoad: false, theme: "neutral", securityLevel: "loose" });

        const render = async () => {
            try {
                const id = "mermaid-" + Math.random().toString(36).substring(2, 9);
                const { svg } = await mermaid.render(id, chart.replace(/\\n/g, "\n"));
                setSvgCode(svg);
                if (ref.current) ref.current.innerHTML = svg;
            } catch (e) { console.error(e); }
        };
        render();
    }, [chart]);

    const downloadImage = (type = "png") => {
        const svgElement = ref.current.querySelector("svg");
        if (!svgElement) return;

        // 1. Ensure the SVG has the correct XML namespace (crucial for Canvas)
        svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");

        // 2. Serialize the SVG to a string
        const serializer = new XMLSerializer();
        let svgData = serializer.serializeToString(svgElement);

        // 3. Add a XML header if it's missing
        if (!svgData.startsWith('<?xml')) {
            svgData = '<?xml version="1.0" standalone="no"?>\r\n' + svgData;
        }

        // 4. Convert SVG string to a safe Base64 URL
        // We use encodeURIComponent to handle special characters (like # or emojis)
        const svgBase64 = `data:image/svg+xml;base64,${window.btoa(unescape(encodeURIComponent(svgData)))}`;

        const img = new Image();
        img.crossOrigin = "anonymous"; // Try to bypass some tainting issues

        img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            // Get dimensions
            const bbox = svgElement.getBBox();
            const padding = 20;
            canvas.width = bbox.width + padding * 2;
            canvas.height = bbox.height + padding * 2;

            // Background
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw
            ctx.drawImage(img, padding, padding);

            try {
                const url = canvas.toDataURL("image/png");
                const downloadLink = document.createElement("a");
                downloadLink.href = type === "svg" ? svgBase64 : url;
                downloadLink.download = `${title.toLowerCase().replace(/\s+/g, "-")}.${type}`;
                downloadLink.click();
            } catch (e) {
                console.error("Failed to export PNG. This usually happens if the diagram uses external fonts or images.", e);
                alert("Security restriction: Could not generate PNG. Please try downloading as SVG instead.");
            }
        };

        img.src = svgBase64;
    };

    return (
        <div className="border border-slate-200 rounded-xl bg-white shadow-sm overflow-hidden my-4">
            {/* Toolbar */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-200">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">{title}</h3>

                <div className="flex gap-2">
                    <button
                        onClick={() => downloadImage("svg")}
                        className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-all active:scale-95"
                    >
                        <DownloadIcon /> SVG
                    </button>
                    <button
                        onClick={() => downloadImage("png")}
                        className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm shadow-blue-200 transition-all active:scale-95"
                    >
                        <DownloadIcon /> PNG
                    </button>
                </div>
            </div>

            {/* Render Area */}
            <div className="p-8 flex justify-center items-center overflow-auto min-h-[200px]">
                <div ref={ref} className="max-w-full" />
            </div>
        </div>
    );
}