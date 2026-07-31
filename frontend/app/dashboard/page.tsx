"use client";

import AIOutput from "../components/AIOutput";
import { useState } from "react";
import { motion } from "framer-motion";

import {
  Sparkles,
  Hash,
  Clapperboard,
  BarChart3,
} from "lucide-react";

import LiveMatches from "../components/LiveMatches";

export default function Dashboard() {
  

  const [activeTool, setActiveTool] = useState("caption");

  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState("");
  const [showOnlySelected, setShowOnlySelected] = useState(false);
  
const generateAI = async (
  customPrompt?: string,
  customTool?: string
) => {

const finalPrompt = customPrompt || prompt;

if (!finalPrompt) {
  setOutput("Please enter topic first.");
  return;
}


    setLoading(true);

    setOutput("Generating...");

    try {

      let endpoint = "/api/generate";

      const tool = customTool || activeTool;

if (tool === "reel") {
        endpoint = "/api/reel";
      }

     if (tool === "hashtags"){
        endpoint = "/api/hashtags";
      }

     if (tool === "summary") {
        endpoint = "/api/summary";
      }

      const response = await fetch(endpoint, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

       body: JSON.stringify({
  prompt: finalPrompt,
}),
      });

      const data = await response.json();
      console.log("Frontend received:", data);
     switch (tool) {
  case "caption":
    setOutput(data.caption);
    break;

  case "reel":
    setOutput(data.script);
    break;

  case "hashtags":
    setOutput(data.hashtags);
    break;

  case "summary":
    setOutput(data.summary);
    break;

  default:
    setOutput("Unknown tool selected.");
}
    } catch (error) {

      setOutput("AI generation failed.");

    } finally {

      setLoading(false);

    }
  };
 const handleMatchSelect = (match: any) => {
  setSelectedMatch(match.name);

  const matchPrompt = `Match: ${match.name}

Status: ${match.status}

Venue: ${match.venue}

Score:

${match.score
  ?.map((s: any) => `${s.inning}: ${s.r}/${s.w} (${s.o} ov)`)
  .join("\n")}`;

  setPrompt(matchPrompt);

  setShowOnlySelected(true);
};

 const handleToolSelect = (
  tool: "caption" | "reel" | "hashtags" | "summary"
) => {
  setActiveTool(tool);
};

  const getTitle = () => {

    if (activeTool === "caption") {
      return "Caption Generator";
    }

    if (activeTool === "reel") {
      return "Reel Script Generator";
    }

    if (activeTool === "hashtags") {
      return "Hashtag Generator";
    }

    if (activeTool === "summary") {
      return "Match Summary Generator";
    }

    return "Crici AI";
  };

  const getPlaceholder = () => {

    if (activeTool === "caption") {
      return "Virat Kohli revenge innings vs CSK...";
    }

    if (activeTool === "reel") {
      return "MS Dhoni emotional comeback story...";
    }

    if (activeTool === "hashtags") {
      return "Rohit Sharma century vs Pakistan...";
    }

    if (activeTool === "summary") {
      return "India vs Pakistan thriller at World Cup...";
    }

    return "";
  };

  return (
    <main className="min-h-screen bg-black text-white flex overflow-hidden">

      {/* SIDEBAR */}
      <aside className="w-80 border-r border-green-500/10 bg-[#050505] p-8 hidden md:flex flex-col">

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-5xl font-black text-green-400 mb-14"
        >
          Crici AI
        </motion.h1>

        <div className="space-y-5">

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTool("caption")}
            className={`w-full flex items-center gap-4 px-6 py-5 rounded-3xl transition ${activeTool === "caption"
                ? "bg-green-500/20 border border-green-500/20"
                : "hover:bg-[#111111]"
              }`}
          >
            <Sparkles />
            Caption Generator
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTool("reel")}
            className={`w-full flex items-center gap-4 px-6 py-5 rounded-3xl transition ${activeTool === "reel"
                ? "bg-purple-500/20 border border-purple-500/20"
                : "hover:bg-[#111111]"
              }`}
          >
            <Clapperboard />
            Reel Scripts
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTool("hashtags")}
            className={`w-full flex items-center gap-4 px-6 py-5 rounded-3xl transition ${activeTool === "hashtags"
                ? "bg-orange-500/20 border border-orange-500/20"
                : "hover:bg-[#111111]"
              }`}
          >
            <Hash />
            Hashtag Generator
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTool("summary")}
            className={`w-full flex items-center gap-4 px-6 py-5 rounded-3xl transition ${activeTool === "summary"
                ? "bg-cyan-500/20 border border-cyan-500/20"
                : "hover:bg-[#111111]"
              }`}
          >
            <BarChart3 />
            Match Summary
          </motion.button>

        </div>

      </aside>

      {/* MAIN */}
      <section className="flex-1 p-6 md:p-12 relative overflow-hidden">

        {/* Glow */}
        <div className="absolute top-0 left-1/2 w-[500px] h-[500px] bg-green-500/10 blur-[140px] rounded-full -translate-x-1/2" />

        <motion.div
          
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10"
        >

          {/* TITLE */}
          <h1 className="text-6xl font-black mb-4 bg-gradient-to-r from-green-400 to-emerald-200 bg-clip-text text-transparent">
            {getTitle()}
          </h1>

          <p className="text-gray-400 text-xl mb-8">
            AI-powered cricket creator tools.
          </p>

          {/* LIVE MATCHES */}
          <div className="mb-10">
            <LiveMatches
  onSelectMatch={handleMatchSelect}
  onToolSelect={handleToolSelect}
  selectedMatch={selectedMatch}
  showOnlySelected={showOnlySelected}
/>
          </div>

          {/* INPUT */}
          <div className="bg-[#0b0b0b]/90 border border-green-500/10 rounded-[35px] p-8 backdrop-blur-2xl shadow-2xl shadow-green-500/10">

            {selectedMatch && (
  <div className="mb-4 flex items-center justify-between rounded-xl border border-green-500/20 bg-green-500/10 p-3">
    <span className="text-green-300">
      Selected Match: <strong>{selectedMatch}</strong>
    </span>

    <button
  onClick={() => {
    setShowOnlySelected(false);
    setSelectedMatch("");
    setPrompt("");
  }}
  className="group flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900/80 px-4 py-2 text-sm font-medium text-zinc-300 transition-all duration-300 hover:border-green-500 hover:bg-green-500/10 hover:text-green-400 hover:shadow-lg hover:shadow-green-500/20"
>
  <span className="transition-transform duration-300 group-hover:-translate-x-1">
    ←
  </span>
  <span>All Matches</span>
</button>
  </div>
)}

            <label className="block text-xl mb-4">
              Enter Topic
            </label>

            <textarea
              placeholder={getPlaceholder()}
              className="w-full h-44 bg-black/60 border border-green-500/10 rounded-3xl p-6 outline-none resize-none text-lg"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
             onClick={() => generateAI()}
              disabled={loading}
              className="mt-8 bg-gradient-to-r from-green-400 to-emerald-500 px-10 py-5 rounded-3xl text-xl font-bold shadow-2xl shadow-green-500/20"
            >
              {loading ? "Generating..." : "Generate AI Content"}
            </motion.button>

          </div>

{/* OUTPUT */}
<AIOutput
  output={output}
  loading={loading}
  activeTool={getTitle()}
  onRegenerate={() => generateAI()}
/>

        </motion.div>

      </section>

    </main>
  );
}
