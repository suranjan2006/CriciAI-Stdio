"use client";

import { useState } from "react";

type DemoModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export default function DemoModal({
    isOpen,
    onClose,
}: DemoModalProps) {
    const [step, setStep] = useState(1);
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">

            <div className="w-[90%] max-w-2xl rounded-3xl bg-[#111111] border border-green-500/20 p-8">

                {step === 1 && (
                    <>
                        <h2 className="text-3xl font-bold text-green-400 mb-4">
                            👋 Welcome to Crici AI
                        </h2>

                        <p className="text-gray-300 text-lg mb-8">
                            This quick guide will show you how to use Crici AI in under a minute.
                        </p>
                    </>
                )}

                {step === 2 && (
                    <>
                        <h2 className="text-3xl font-bold text-green-400 mb-4">
                            🏏 Step 1: Choose Your Match
                        </h2>

                        <p className="text-gray-300 text-lg mb-8">
                            Select a live cricket match from the list, or type your own topic if you want to create content for any match or player.
                        </p>
                    </>
                )}
                {step === 3 && (
                    <>
                        <h2 className="text-3xl font-bold text-green-400 mb-4">
                            ✍️ Step 2: Choose Your AI Tool
                        </h2>

                        <p className="text-gray-300 text-lg mb-8">
                            Pick the type of content you want to generate:
                            <br /><br />
                            • Caption Generator
                            <br />
                            • Reel Script
                            <br />
                            • Hashtag Generator
                            <br />
                            • Match Summary
                        </p>
                    </>
                )}
                {step === 4 && (
                    <>
                        <h2 className="text-3xl font-bold text-green-400 mb-4">
                            🤖 Step 3: Generate AI Content
                        </h2>

                        <p className="text-gray-300 text-lg mb-8">
                            After selecting your match and AI tool, click the
                            <span className="font-semibold text-green-400">
                                {" "}Generate AI Content{" "}
                            </span>
                            button.
                            <br /><br />
                            Crici AI will create high-quality cricket content for you in just a few seconds.
                        </p>
                    </>
                )}
                {step === 5 && (
                    <>
                        <h2 className="text-3xl font-bold text-green-400 mb-4">
                            📋 Step 4: Copy & Share
                        </h2>

                        <p className="text-gray-300 text-lg mb-8">
                            Once the AI generates your content, click the
                            <span className="font-semibold text-green-400">
                                {" "}Copy{" "}
                            </span>
                            button.
                            <br /><br />
                            You can instantly share it on Instagram, YouTube, Threads, X, Facebook, or anywhere you create cricket content.
                        </p>
                    </>
                )}
                {step === 6 && (
                    <>
                        <h2 className="text-3xl font-bold text-green-400 mb-4">
                            🚀 You're Ready!
                        </h2>

                        <p className="text-gray-300 text-lg mb-8">
                            Congratulations! 🎉
                            <br /><br />
                            You now know how to use Crici AI.
                            <br /><br />
                            Click the button below and start creating amazing cricket content with AI.
                        </p>
                    </>
                )}
                <div className="flex justify-between">

                    <button
                        onClick={() => {
                            setStep(1);
                            onClose();
                        }}
                        className="px-6 py-3 rounded-xl border border-gray-700 hover:border-gray-500"
                    >
                        Close
                    </button>
{step > 1 && (
  <button
    onClick={() => setStep(step - 1)}
    className="px-6 py-3 rounded-xl border border-gray-700 hover:border-gray-500"
  >
    ← Previous
  </button>
)}
                    {step < 6 ? (
  <button
    onClick={() => setStep(step + 1)}
    className="px-6 py-3 rounded-xl bg-green-500 hover:bg-green-600 font-semibold"
  >
    Next →
  </button>
) : (
  <button
    onClick={() => {
      setStep(1);
      onClose();
    }}
    className="px-6 py-3 rounded-xl bg-green-500 hover:bg-green-600 font-semibold"
  >
    Start Creating 🚀
  </button>
)}

                </div>

            </div>

        </div>
    );
}