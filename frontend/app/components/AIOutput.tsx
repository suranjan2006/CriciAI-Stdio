"use client";

import ReactMarkdown from "react-markdown";
import { useState } from "react";
import remarkGfm from "remark-gfm";
import jsPDF from "jspdf";
import { toast } from "sonner";

interface AIOutputProps {
  output: string;
  loading: boolean;
  activeTool: string;
  onRegenerate: () => void;
}

export default function AIOutput({
  output,
  loading,
  activeTool,
  onRegenerate,
}: AIOutputProps) {
  const [copied, setCopied] = useState(false);

const handleCopy = async () => {
  
  if (!output) return;

  await navigator.clipboard.writeText(output);

  setCopied(true);
  toast.success("Copied Successfully!");

  setTimeout(() => {
    setCopied(false);
  }, 2000);
};
const handleDownloadTxt = () => {
  if (!output) return;

  const blob = new Blob([output], { type: "text/plain" });

  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = `${activeTool.replace(/\s+/g, "-")}.txt`;

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  window.URL.revokeObjectURL(url);
  toast.success("TXT Downloaded!");
};
const handleDownloadPdf = () => {
  if (!output) return;

  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text("Crici AI", 20, 20);

  doc.setFontSize(14);
  doc.text(`Tool: ${activeTool}`, 20, 35);

  doc.setFontSize(12);

  const lines = doc.splitTextToSize(output, 170);

  doc.text(lines, 20, 50);

  doc.save(`${activeTool.replace(/\s+/g, "-")}.pdf`);
  toast.success("PDF Downloaded!");
};
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 shadow-lg overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
        <h2 className="text-xl font-bold text-white">
          🤖 {activeTool}
        </h2>

        <div className="flex gap-2">

  <div className="flex gap-2">

  <button
    onClick={handleCopy}
    className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 transition"
  >
    {copied ? "✅ Copied!" : "📋 Copy"}
  </button>

  <button
    onClick={handleDownloadTxt}
    className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 transition"
  >
    📄 TXT
  </button>

  <button
    onClick={handleDownloadPdf}
    className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition"
  >
    📑 PDF
  </button>

  <button
    onClick={onRegenerate}
    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
  >
    🔄 Regenerate
  </button>

</div>
</div>
</div>

      {/* Body */}
      <div className="p-6 min-h-[400px]">

        {loading ? (
          <div className="flex items-center justify-center h-full text-zinc-400">
           🤖 Crici AI is analyzing the match...
          </div>
        ) : (
          <article className="prose prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {output || "Select a match and generate AI content."}
            </ReactMarkdown>
          </article>
        )}

      </div>

    </div>
  );
}