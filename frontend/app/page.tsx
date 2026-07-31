"use client";

import { useState } from "react";
import DemoModal from "./components/DemoModal";
import Link from "next/link";

export default function Home() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  return (
    <main className="bg-black text-white min-h-screen">

      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-6 border-b border-gray-800">

        <h1 className="text-3xl font-bold text-green-400">
          Crici AI
        </h1>

        <div className="hidden md:flex gap-8 text-gray-300">
          <a href="#" className="hover:text-white transition">
            Features
          </a>

          <a href="#" className="hover:text-white transition">
            Pricing
          </a>

          <a href="#" className="hover:text-white transition">
            About
          </a>
        </div>

      </nav>

      {/* HERO SECTION */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-32">

        <p className="text-green-400 font-semibold mb-4 tracking-widest">
          AI FOR CRICKET CREATORS
        </p>

        <h1 className="text-5xl md:text-7xl font-bold max-w-5xl leading-tight">
          Create Viral Cricket Content in Seconds
        </h1>

        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mt-8 leading-relaxed">
          Generate captions, reel scripts, hashtags, and match summaries
          instantly using the power of Artificial Intelligence.
        </p>

        <div className="flex flex-col md:flex-row gap-4 mt-10">

          <Link
  href="/dashboard"
  className="bg-green-500 hover:bg-green-600 transition px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg shadow-green-500/20"
>
  Start Creating
</Link>

          <button
  onClick={() => setIsDemoOpen(true)}
  className="border border-gray-700 hover:border-gray-500 transition px-8 py-4 rounded-2xl text-lg"
>
  Watch Demo
</button>

        </div>

</section>

{/* FEATURES SECTION */}
<section className="px-6 md:px-12 py-24">

  <div className="text-center mb-16">

    <p className="text-green-400 font-semibold tracking-widest mb-4">
      FEATURES
    </p>

    <h2 className="text-4xl md:text-5xl font-bold">
      Everything A Cricket Creator Needs
    </h2>

  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

    {/* CARD 1 */}
    <div className="bg-[#111111] border border-gray-800 rounded-3xl p-8 hover:border-green-500 transition">

      <div className="text-5xl mb-6">🏏</div>

      <h3 className="text-2xl font-bold mb-4">
        Caption Generator
      </h3>

      <p className="text-gray-400 leading-relaxed">
        Generate viral cricket captions for Instagram, reels, and posts instantly.
      </p>

    </div>

    {/* CARD 2 */}
    <div className="bg-[#111111] border border-gray-800 rounded-3xl p-8 hover:border-green-500 transition">

      <div className="text-5xl mb-6">🎬</div>

      <h3 className="text-2xl font-bold mb-4">
        Reel Scripts
      </h3>

      <p className="text-gray-400 leading-relaxed">
        Create engaging short-form scripts for cricket reels and videos.
      </p>

    </div>

    {/* CARD 3 */}
    <div className="bg-[#111111] border border-gray-800 rounded-3xl p-8 hover:border-green-500 transition">

      <div className="text-5xl mb-6">🔥</div>

      <h3 className="text-2xl font-bold mb-4">
        Hashtag Generator
      </h3>

      <p className="text-gray-400 leading-relaxed">
        Generate trending cricket hashtags to boost reach and engagement.
      </p>

    </div>

  </div>

</section>
{/* AI PREVIEW SECTION */}
<section className="px-6 md:px-12 py-24">

  <div className="text-center mb-16">

    <p className="text-green-400 font-semibold tracking-widest mb-4">
      AI GENERATED OUTPUT
    </p>

    <h2 className="text-4xl md:text-5xl font-bold">
      See Crici AI In Action
    </h2>

  </div>

  <div className="max-w-5xl mx-auto bg-[#111111] border border-gray-800 rounded-3xl p-8">

    {/* INPUT */}
    <div className="mb-8">

      <p className="text-gray-400 mb-3">
        Match Prompt
      </p>

      <div className="bg-black border border-gray-700 rounded-2xl p-5 text-lg">
        Virat Kohli 89 vs CSK • Aggressive Fan Tone • Instagram Caption
      </div>

    </div>

    {/* OUTPUT */}
    <div>

      <p className="text-gray-400 mb-3">
        AI Generated Caption
      </p>

      <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-6">

        <p className="text-2xl font-semibold leading-relaxed">
          “King Kohli doesn’t chase records… records chase him 👑🔥”
        </p>

        <p className="text-gray-400 mt-6">
          #ViratKohli #RCB #IPL #KingKohli #Cricket
        </p>

      </div>

    </div>

  </div>

</section>
<DemoModal
  isOpen={isDemoOpen}
  onClose={() => setIsDemoOpen(false)}
/>
</main>
  );
}