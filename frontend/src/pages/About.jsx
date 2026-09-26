import React from "react";
import about from "../assets/about.png";
import graph from "../assets/graph.png";

export default function About() {
  return (
    <section className="w-full">
      <div className="mx-auto max-w-7xl">
        <div className="relative w-full overflow-hidden bg-black text-white">
          {/* ================= BACKGROUND ================= */}
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={about}
              alt="TrafficGuard AI Safety System"
              className="absolute inset-0 h-full w-full object-contain object-center"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/5 to-black/20" />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.25)_45%,rgba(0,0,0,0.7)_100%)]" />

            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black via-black/70 to-transparent" />

            <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[130px]" />

            <div className="absolute right-[-150px] top-1/2 h-[450px] w-[450px] -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[140px]" />
          </div>

          {/* ================= MAIN CONTAINER ================= */}
          <div className="relative z-10 mx-auto flex w-full max-w-7xl items-center px-6 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
            <div className="w-full max-w-xl space-y-6 -translate-y-8 flex flex-col items-center md:items-start">
              {" "}
              {/* Badge */}
              <div className="inline-flex t items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/5 px-3 py-1.5 text-[11px] font-mono uppercase tracking-[0.2em] text-cyan-400 backdrop-blur-md">
                {" "}
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-70" />

                  <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.9)]" />
                </span>
                About TrafficGuard
              </div>
              {/* Heading */}
              <h2 className="text-2xl font-black uppercase leading-[1.1] tracking-tight text-center md:text-left sm:text-3xl lg:text-4xl">
                Intelligent AI Safety
                <br />
                <span className="bg-gradient-to-r from-cyan-300 text-lg md:text-2xl via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  for Critical{" "}
                </span>
                <span className=" text-xl">Infrastructure</span>
              </h2>
              {/* Divider */}
              <div className="flex items-center gap-2">
                <div className="h-[2px] w-16 bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_12px_rgba(34,211,238,0.7)]" />

                <div className="h-1 w-1 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />

                <div className="h-1 w-1 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
              </div>
              {/* Description */}
              <p className="border-l-2 md:border-r-0 text-center md:text-left border-r-2 border-cyan-400/40 px-4 pt-2 md:pt-0 text-xs text-gray-300 sm:text-sm">
                TrafficGuard uses advanced AI and{" "}
                <strong className="font-semibold text-white">
                  YOLO-based computer vision
                </strong>{" "}
                to detect road crashes in real time. The system analyzes live
                camera feeds.
              </p>
              {/* ================= GRAPH ================= */}
              <div className="flex justify-center md:justify-start pr-0 md:pr-7">
                <div className="overflow-hidden rounded-xl border border-white/[0.05] bg-black/20">
                  <img
                    src={graph}
                    alt="Inference performance graph"
                    className="block w-full max-w-[480px] rounded-2xl object-contain opacity-90 transition-opacity duration-300 hover:opacity-100"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
