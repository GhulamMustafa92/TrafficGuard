import React, { useEffect, useRef, useState } from "react";
import { Renderer, Camera, Geometry, Program, Mesh } from "ogl";
import homebg from "../assets/homebg.jpg";
import { FaPlay, FaRocket, FaShieldAlt, FaCamera } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { MdRadar } from "react-icons/md";
import { RiAiGenerate } from "react-icons/ri";
import one from "../assets/one.jpg";
import two from "../assets/two.jpg";
import three from "../assets/three.jpg";

/* ==========================================================================
   1. PARTICLES COMPONENT
   ========================================================================== */
const defaultColors = ["#ffffff", "#ffffff", "#ffffff"];

const hexToRgb = (hex) => {
  hex = hex.replace(/^#/, "");
  if (hex.length === 3)
    hex = hex
      .split("")
      .map((c) => c + c)
      .join("");
  const int = parseInt(hex.slice(0, 6), 16);
  return [
    ((int >> 16) & 255) / 255,
    ((int >> 8) & 255) / 255,
    (int & 255) / 255,
  ];
};

const vertex = /* glsl */ `
  attribute vec3 position;
  attribute vec4 random;
  attribute vec3 color;
  uniform mat4 modelMatrix;
  uniform mat4 viewMatrix;
  uniform mat4 projectionMatrix;
  uniform float uTime;
  uniform float uSpread;
  uniform float uBaseSize;
  uniform float uSizeRandomness;
  varying vec4 vRandom;
  varying vec3 vColor;
  void main() {
    vRandom = random;
    vColor = color;
    vec3 pos = position * uSpread;
    pos.z *= 10.0;
    vec4 mPos = modelMatrix * vec4(pos, 1.0);
    float t = uTime;
    mPos.x += sin(t * random.z + 6.28 * random.w) * mix(0.1, 1.5, random.x);
    mPos.y += sin(t * random.y + 6.28 * random.x) * mix(0.1, 1.5, random.w);
    mPos.z += sin(t * random.w + 6.28 * random.y) * mix(0.1, 1.5, random.z);
    vec4 mvPos = viewMatrix * mPos;
    gl_PointSize = uSizeRandomness == 0.0
      ? uBaseSize
      : (uBaseSize * (1.0 + uSizeRandomness * (random.x - 0.5))) / length(mvPos.xyz);
    gl_Position = projectionMatrix * mvPos;
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform float uAlphaParticles;
  varying vec4 vRandom;
  varying vec3 vColor;
  void main() {
    vec2 uv = gl_PointCoord.xy;
    float d = length(uv - vec2(0.5));
    if(uAlphaParticles < 0.5) {
      if(d > 0.5) discard;
      gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28), 1.0);
    } else {
      float circle = smoothstep(0.5, 0.4, d) * 0.8;
      gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28), circle);
    }
  }
`;

export const Particles = ({
  particleCount = 200,
  particleSpread = 10,
  speed = 0.1,
  particleColors,
  moveParticlesOnHover = false,
  particleHoverFactor = 1,
  alphaParticles = false,
  particleBaseSize = 100,
  sizeRandomness = 1,
  cameraDistance = 20,
  disableRotation = false,
  pixelRatio = 1,
  className,
}) => {
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const renderer = new Renderer({
      dpr: pixelRatio,
      depth: false,
      alpha: true,
    });
    const gl = renderer.gl;
    container.appendChild(gl.canvas);
    gl.clearColor(0, 0, 0, 0);
    const camera = new Camera(gl, { fov: 15 });
    camera.position.set(0, 0, cameraDistance);
    const resize = () => {
      renderer.setSize(container.clientWidth, container.clientHeight);
      camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
    };
    window.addEventListener("resize", resize, false);
    resize();
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
        y: -(((e.clientY - rect.top) / rect.height) * 2 - 1),
      };
    };
    if (moveParticlesOnHover)
      window.addEventListener("mousemove", handleMouseMove);
    const count = particleCount;
    const positions = new Float32Array(count * 3);
    const randoms = new Float32Array(count * 4);
    const colors = new Float32Array(count * 3);
    const palette = particleColors?.length > 0 ? particleColors : defaultColors;
    for (let i = 0; i < count; i++) {
      let x, y, z, len;
      do {
        x = Math.random() * 2 - 1;
        y = Math.random() * 2 - 1;
        z = Math.random() * 2 - 1;
        len = x * x + y * y + z * z;
      } while (len > 1 || len === 0);
      const r = Math.cbrt(Math.random());
      positions.set([x * r, y * r, z * r], i * 3);
      randoms.set(
        [Math.random(), Math.random(), Math.random(), Math.random()],
        i * 4,
      );
      colors.set(
        hexToRgb(palette[Math.floor(Math.random() * palette.length)]),
        i * 3,
      );
    }
    const geometry = new Geometry(gl, {
      position: { size: 3, data: positions },
      random: { size: 4, data: randoms },
      color: { size: 3, data: colors },
    });
    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uSpread: { value: particleSpread },
        uBaseSize: { value: particleBaseSize * pixelRatio },
        uSizeRandomness: { value: sizeRandomness },
        uAlphaParticles: { value: alphaParticles ? 1 : 0 },
      },
      transparent: true,
      depthTest: false,
    });
    const particles = new Mesh(gl, { mode: gl.POINTS, geometry, program });
    let animationFrameId,
      lastTime = performance.now(),
      elapsed = 0;
    const update = (t) => {
      animationFrameId = requestAnimationFrame(update);
      elapsed += (t - lastTime) * speed;
      lastTime = t;
      program.uniforms.uTime.value = elapsed * 0.001;
      if (moveParticlesOnHover) {
        particles.position.x = -mouseRef.current.x * particleHoverFactor;
        particles.position.y = -mouseRef.current.y * particleHoverFactor;
      }
      if (!disableRotation) {
        particles.rotation.x = Math.sin(elapsed * 0.0002) * 0.1;
        particles.rotation.y = Math.cos(elapsed * 0.0005) * 0.15;
        particles.rotation.z += 0.01 * speed;
      }
      renderer.render({ scene: particles, camera });
    };
    animationFrameId = requestAnimationFrame(update);
    return () => {
      window.removeEventListener("resize", resize);
      if (moveParticlesOnHover)
        window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(gl.canvas)) container.removeChild(gl.canvas);
    };
  }, [
    particleCount,
    particleSpread,
    speed,
    moveParticlesOnHover,
    particleHoverFactor,
    alphaParticles,
    particleBaseSize,
    sizeRandomness,
    cameraDistance,
    disableRotation,
    pixelRatio,
    particleColors,
  ]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full ${className || ""}`}
    />
  );
};

/* ==========================================================================
   2. TYPEWRITER COMPONENT
   ========================================================================== */
const words = [
  "Accident Detection",
  "Collision Analysis",
  "Traffic Monitoring",
  "Threat Prevention",
];

function TypewriterText() {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index];
    let timeout;
    if (!deleting && displayed.length < word.length) {
      timeout = setTimeout(
        () => setDisplayed(word.slice(0, displayed.length + 1)),
        80,
      );
    } else if (!deleting && displayed.length === word.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setIndex((index + 1) % words.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, index]);

  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 drop-shadow-[0_0_20px_rgba(0,210,255,0.4)]">
      {displayed}
      <span className="animate-pulse text-cyan-400">|</span>
    </span>
  );
}

/* ==========================================================================
   3. SCAN LINE COMPONENT
   ========================================================================== */
function ScanLine() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none z-10">
      <div
        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent"
        style={{ animation: "scanline 17s linear infinite" }}
      />
      <style>{`
        @keyframes scanline {
          0%   { top: 0%;   opacity: 1; }
          49%  { top: 100%; opacity: 1; }
          50%  { top: 100%; opacity: 1; }
          99%  { top: 0%;   opacity: 1; }
          100% { top: 0%;   opacity: 1; }
        }
      `}</style>
    </div>
  );
}

/* ==========================================================================
   4. MAIN HOME COMPONENT
   ========================================================================== */
export default function Home() {
  const [detected, setDetected] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDetected(true), 2500);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <section className="relative w-full text-white pt-34 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden flex items-center">
        {/* Background glows */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none z-0" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/8 rounded-full blur-3xl pointer-events-none z-0" />
        <div className="absolute top-0 right-1/3 w-64 h-64 bg-blue-500/5 rounded-full blur-2xl pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
          {/* ── LEFT COLUMN ── */}
          <div className="flex flex-col items-center md:items-start space-y-7 text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-cyan-400 text-[10px] sm:text-xs font-mono tracking-wider sm:tracking-widest shadow-[0_0_20px_rgba(59,130,246,0.2)] backdrop-blur-sm">
              <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75 animate-ping" />
                <span className="relative inline-flex h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-cyan-400" />
              </span>
              <span className="whitespace-nowrap">
                AI-Powered Road Safety
                <span className="hidden sm:inline"> Platform</span>
                &nbsp;·&nbsp;v2.1 Live
              </span>
            </div>

            {/* Heading */}
            <div className="space-y-2 text-center md:text-left">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1] uppercase max-w-[300px] sm:max-w-none mx-auto md:mx-0">
                {" "}
                <span className="text-white">AI-Powered</span>
                <br />
                <TypewriterText />
                <br />
                <span className="text-white/90">for Safer Roads</span>
              </h1>
            </div>

            {/* Description */}
            <p
              className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-lg
              border-r-2 border-l-2
              md:border-r-0
              text-center md:text-left
              border-cyan-500/40 px-4"
            >
              <strong className="text-white font-semibold">CrashLens AI</strong>{" "}
              uses real-time computer vision to detect road accidents, analyze
              camera feeds, and deliver intelligent alerts within seconds —
              protecting lives before emergency services arrive.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {" "}
              {[
                { icon: <MdRadar />, label: "Real-Time Radar" },
                { icon: <RiAiGenerate />, label: "YOLOv8 Engine" },
                { icon: <FaCamera />, label: "Multi-Cam Support" },
              ].map((f) => (
                <div
                  key={f.label}
                  className="flex items-center text-center md:text-left  gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs font-medium backdrop-blur-sm hover:border-cyan-500/40 hover:text-cyan-400 transition-all duration-200"
                >
                  <span className="text-cyan-500">{f.icon}</span>
                  {f.label}
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-1 w-full sm:w-auto">
              <button
                type="button"
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm shadow-[0_0_30px_rgba(0,210,255,0.35)] hover:shadow-[0_0_45px_rgba(0,210,255,0.6)] transition-all duration-300 active:scale-95"
              >
                <FaRocket className="text-sm" />
                Get Started Free
              </button>

              <button
                type="button"
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 hover:border-cyan-500/40 text-gray-300 hover:text-white font-semibold text-sm backdrop-blur-md transition-all duration-300 active:scale-95 group"
              >
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-cyan-500/20 group-hover:bg-cyan-500/40 transition-all duration-200">
                  <FaPlay className="text-[9px] text-cyan-400 ml-0.5" />
                </span>
                Watch Demo
              </button>
            </div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="relative flex justify-center items-center w-full">
            {/* Outer glow ring */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 via-cyan-500/10 to-blue-600/20 rounded-3xl blur-2xl opacity-60 animate-pulse" />

            {/* Corner accents */}
            <div className="absolute -top-1 -left-1 w-8 h-8 border-t-2 border-l-2 border-cyan-500 rounded-tl-2xl z-20" />
            <div className="absolute -top-1 -right-1 w-8 h-8 border-t-2 border-r-2 border-cyan-500 rounded-tr-2xl z-20" />
            <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-2 border-l-2 border-cyan-500 rounded-bl-2xl z-20" />
            <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-2 border-r-2 border-cyan-500 rounded-br-2xl z-20" />

            {/* Image wrapper */}
            <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_60px_rgba(0,210,255,0.15)]">
              {/* Scan line */}
              <ScanLine />

              {/* Grid overlay */}
              <div
                className="absolute inset-0 z-10 pointer-events-none opacity-10"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(0,210,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,210,255,0.3) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />

              <img
                src={homebg}
                alt="CrashLens AI Surveillance Feed"
                className="w-full h-auto object-cover"
              />

              {/* Live badge */}
              <div className="absolute top-3 left-3 z-20 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/85 backdrop-blur-md border border-white/10">
                <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[10px] font-mono font-bold text-white uppercase tracking-widest">
                  LIVE · CAM-01
                </span>
              </div>

              {/* FPS counter */}
              <div className="absolute top-3 right-3 z-20 px-2.5 py-1 rounded-lg bg-black/85 backdrop-blur-md border border-white/10">
                <span className="text-[10px] font-mono text-green-400 font-bold">
                  30 FPS
                </span>
              </div>

              {/* Detection alert */}
              <div
                className={`absolute top-14 right-3 z-20 transition-all duration-700 ${detected ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}
              >
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/20 backdrop-blur-md border border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                  <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
                  <span className="text-[6px] md:text-[10px] font-mono font-bold text-red-400 uppercase">
                    Collision Detected · 98%
                  </span>
                </div>
              </div>

              {/* Bottom status bar */}
              <div className="absolute bottom-0 left-0 right-0 z-20 p-3 bg-gradient-to-t from-black/90 to-transparent backdrop-blur-sm border-t border-cyan-500/20 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-cyan-500/20 border border-cyan-500/30">
                    <FaShieldAlt className="text-cyan-400 text-sm" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white leading-none">
                      YOLOv8 Detection Engine
                    </p>
                    <p className="text-[10px] text-cyan-400 font-mono mt-0.5">
                      Scanning active traffic...
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/30">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] font-mono text-green-400 font-semibold">
                    ONLINE
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="relative  px-4 sm:px-6 lg:px-8 my-8">
        <hr className="w-full border-none h-[1px] absolute top-20 bg-blue-500 shadow-[0_0_20px_6px_rgba(59,130,246,0.7)]" />
      </div>

      {/* Cards Section */}
      <section className="w-full text-white pt-4 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="group relative cursor-pointer overflow-hidden rounded-2xl border border-blue-500/20 bg-white/[0.03] h-32">
            <img
              src={one}
              alt="AI CCTV Monitoring"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />

            <div className="absolute inset-y-0 left-0 flex items-center p-4">
              <div>
                <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-blue-400">
                  AI Vision
                </span>

                <h3 className="mt-1 text-sm font-bold text-white">
                  Smart Detection
                </h3>

                <p className="mt-1 max-w-[190px] text-[11px] leading-relaxed text-gray-300">
                  AI-powered camera monitoring with real-time object detection.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group relative cursor-pointer overflow-hidden rounded-2xl border border-blue-500/20 bg-white/[0.03] h-32">
            <img
              src={two}
              alt="Accident Detection"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />

            <div className="absolute inset-y-0 left-0 flex items-center p-4">
              <div>
                <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-blue-400">
                  AI Detection
                </span>

                <h3 className="mt-1 text-sm font-bold text-white">
                  Accident Detection
                </h3>

                <p className="mt-1 max-w-[190px] text-[11px] leading-relaxed text-gray-300">
                  Detect road accidents instantly using intelligent YOLO vision.
                </p>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="group relative cursor-pointer overflow-hidden rounded-2xl border border-blue-500/20 bg-white/[0.03] h-32">
            <img
              src={three}
              alt="Real Time Alerts"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />

            <div className="absolute inset-y-0 left-0 flex items-center p-4">
              <div>
                <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-blue-400">
                  Live Alert
                </span>

                <h3 className="mt-1 text-sm font-bold text-white">
                  Real-Time Alerts
                </h3>

                <p className="mt-1 max-w-[190px] text-[11px] leading-relaxed text-gray-300">
                  Receive instant alerts when a critical event is detected.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
