"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

export default function ReelGenerator() {

  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const generateReel = async () => {

    if (!prompt) {
      setOutput("Please enter reel topic.");
      return;
    }

    setLoading(true);

    setOutput("Generating reel script...");

    try {

      const response = await fetch("/api/reel", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          prompt,
        }),
      });

      const data = await response.json();

      setOutput(data.script);

    } catch (error) {

      setOutput("AI reel generation failed.");

    } finally {

      setLoading(false);

    }
  };

  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-12">

      {/* TITLE */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >

        <h1 className="text-6xl font-black bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-4">
          Reel Script Generator
        </h1>

        <p className="text-gray-400 text-xl mb-12">
          Generate viral cricket reel scripts using AI.
        </p>

      </motion.div>

      {/* INPUT */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-[#0b0b0b] border border-purple-500/10 rounded-[35px] p-8 shadow-2xl shadow-purple-500/10"
      >

        <label className="block text-xl mb-4">
          Reel Topic
        </label>

        <textarea
          placeholder="Example: Virat Kohli comeback story..."
          className="w-full h-44 bg-black border border-purple-500/10 rounded-3xl p-6 outline-none resize-none text-lg"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={generateReel}
          disabled={loading}
          className="mt-8 bg-gradient-to-r from-purple-500 to-pink-500 px-10 py-5 rounded-3xl text-xl font-bold shadow-2xl shadow-pink-500/20"
        >
          {loading ? "Generating..." : "Generate Reel Script"}
        </motion.button>

      </motion.div>

      {/* OUTPUT */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-10 bg-[#0b0b0b] border border-purple-500/10 rounded-[35px] p-8 shadow-2xl shadow-purple-500/10"
      >

        <div className="flex items-center justify-between mb-8">

          <h2 className="text-2xl font-bold text-purple-400">
            AI Reel Script
          </h2>

          <button
            onClick={() => {
              navigator.clipboard.writeText(output);
              alert("Script copied!");
            }}
            className="bg-purple-500 hover:bg-purple-600 transition px-5 py-3 rounded-2xl font-semibold"
          >
            Copy
          </button>

        </div>

        <div className="text-xl leading-relaxed whitespace-pre-wrap text-purple-50">

          {loading ? (

            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 1,
                repeat: Infinity,
              }}
            >
              AI is writing your viral reel...
            </motion.div>

          ) : (

            <TypeAnimation
              sequence={[
                output || "Your AI reel script will appear here..."
              ]}
              speed={70}
              cursor={true}
              repeat={0}
            />

          )}

        </div>

      </motion.div>

    </main>
  );
}