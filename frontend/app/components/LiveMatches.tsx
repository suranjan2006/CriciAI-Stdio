"use client";

import { useEffect, useState } from "react";

interface Score {
  r: number;
  w: number;
  o: number;
  inning: string;
}

interface TeamInfo {
  name: string;
  shortname: string;
  img: string;
}

interface Match {
  id: string;
  name: string;
  status: string;
  venue: string;
  score: any[];

  teamInfo: {
    name: string;
    img: string;
  }[];
}

interface LiveMatchesProps {
  onSelectMatch: (match: Match) => void;

  onToolSelect: (
    tool: "caption" | "reel" | "hashtags" | "summary",
    prompt: string
  ) => void;

  selectedMatch: string;
  showOnlySelected: boolean;
}

export default function LiveMatches({
  onSelectMatch,
  onToolSelect,
  selectedMatch,
  showOnlySelected,
}: LiveMatchesProps) {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

 useEffect(() => {
  async function fetchMatches() {
    try {
      const res = await fetch("/api/live-matches");

      const data = await res.json();

      if (data.status === "success") {
        setMatches(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // First Load
  fetchMatches();

  // Auto Refresh every 30 seconds
  const interval = setInterval(() => {
    fetchMatches();
  }, 30000);

// Cleanup
return () => clearInterval(interval);
}, []);

const filteredMatches = showOnlySelected
  ? matches.filter((match) => match.name === selectedMatch)
  : matches.filter((match) =>
      match.name.toLowerCase().includes(search.toLowerCase())
    );

if (loading) {
    return (
      <div className="text-white">
        Loading live matches...
      </div>
    );
  }

 return (
  <div className="space-y-4">

    <input
      type="text"
      placeholder="🔍 Search team or match..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full rounded-xl border border-zinc-700 bg-[#111] px-4 py-3 text-white placeholder:text-zinc-500 focus:border-green-500 focus:outline-none"
    />
     
      {filteredMatches.map((match) => (
        <div
          key={match.id}
          onClick={() => onSelectMatch(match)}
          className="bg-[#111] border border-green-500/20 rounded-2xl p-4 cursor-pointer hover:border-green-400 hover:scale-[1.02] transition-all duration-300"
        >
          <div className="flex justify-between items-start">

            <div>
              <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                🔴 LIVE
              </span>

              <div className="flex items-center gap-3 mb-3">

                {match.teamInfo?.map((team) => (

                  <img
                    key={team.name}
                    src={team.img}
                    alt={team.name}
                    className="w-10 h-10 rounded-full bg-white p-1"
                  />

                ))}

              </div>

              <h3 className="text-green-400 font-bold text-lg">
                {match.name}
              </h3>
            </div>

          </div>

          <p className="text-gray-300 mt-2">
            {match.status}
          </p>

          {match.score?.map((inning, index) => (
            <div
              key={index}
              className="mt-2 flex justify-between bg-[#181818] rounded-lg px-4 py-2"
            >
              <span className="text-green-400">
                {inning.inning}
              </span>

              <span className="font-bold text-white">
                {inning.r}/{inning.w}
                {" "}
                ({inning.o} ov)
              </span>
            </div>
          ))}

          <p className="text-gray-500 text-sm mt-1 mb-4">
            📍 {match.venue}
          </p>

          
        </div>

      ))}
    </div>
  );
}