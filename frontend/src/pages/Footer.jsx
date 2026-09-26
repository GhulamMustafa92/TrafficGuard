import React from 'react'
import {
  MdShield, MdVideocam, MdGpsFixed, MdEmail,
  MdPhone, MdLocationOn, MdArrowForward, MdOutlineSensors
} from 'react-icons/md'
import logo from '../assets/logo.png'

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden border-t border-white/10 bg-slate-950 pt-16 pb-8 text-white">

      <div className="pointer-events-none absolute -bottom-20 left-10 h-[300px] w-[300px] rounded-full bg-cyan-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute right-10 top-0 h-[250px] w-[250px] rounded-full bg-blue-600/10 blur-[100px]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.025] [background-image:linear-gradient(rgba(34,211,238,1)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,1)_1px,transparent_1px)] [background-size:40px_40px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">

        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-10 pb-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">

          {/* Brand */}
          <div className="flex flex-col items-center gap-5 sm:items-start">
            <div className="flex items-center gap-3">
              <div className="h-[52px] w-[52px] shrink-0 overflow-hidden">
                <img src={logo} className="h-full w-full object-contain" alt="TrafficGuard Logo" />
              </div>
              <div>
                <span className="font-mono text-lg font-black uppercase tracking-wider text-white">
                  Traffic<span className="text-cyan-400">Guard</span>
                </span>
                <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-300">
                  AI Vision Network
                </span>
              </div>
            </div>

            <p className="text-center text-xs leading-relaxed text-slate-400 sm:text-left">
              Autonomous CCTV crash detection and real-time emergency dispatch
              platform powered by advanced neural computer vision models.
            </p>

            <div className="inline-flex w-fit items-center gap-2.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-80" />
                <span className="relative h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
              </span>
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                AI Vision Engines Online
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col items-center gap-5 sm:items-start">
            <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-cyan-400">
              Navigation
            </h4>
            <ul className="flex flex-col items-center gap-3 text-xs text-slate-400 sm:items-start">
              {[
                'Live Camera Stream',
                'Accident Feed',
                'Emergency Dispatch',
                'Analytics Board',
                'System Logs',
              ].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="group flex items-center gap-1.5 transition-colors duration-200 hover:text-white"
                  >
                    <MdArrowForward className="text-[10px] text-cyan-400 transition-transform group-hover:translate-x-1" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Core Technologies */}
          <div className="flex flex-col items-center gap-5 sm:items-start">
            <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-cyan-400">
              Core Technologies
            </h4>
            <ul className="flex flex-col items-center gap-3 text-xs text-slate-400 sm:items-start">
              <li className="flex items-center gap-2">
                <MdVideocam className="shrink-0 text-sm text-cyan-400" />
                YOLOv8 Object Detection
              </li>
              <li className="flex items-center gap-2">
                <MdOutlineSensors className="shrink-0 text-sm text-cyan-400" />
                Real-time Hazard Tracking
              </li>
              <li className="flex items-center gap-2">
                <MdGpsFixed className="shrink-0 text-sm text-cyan-400" />
                Automated GPS Dispatch
              </li>
              <li className="flex items-center gap-2">
                <MdShield className="shrink-0 text-sm text-cyan-400" />
                Encrypted Command Hub
              </li>
            </ul>
          </div>

          {/* Command HQ */}
          <div className="flex flex-col items-center gap-5 sm:items-start">
            <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-cyan-400">
              Command HQ
            </h4>
            <div className="flex flex-col items-center gap-3 text-xs text-slate-400 sm:items-start">
              <div className="flex items-start gap-2.5">
                <MdLocationOn className="mt-0.5 shrink-0 text-base text-cyan-400" />
                <span className="text-center sm:text-left">TrafficGuard Central Hub, Gujrat, Pakistan</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MdPhone className="shrink-0 text-base text-cyan-400" />
                <span className="font-mono text-slate-200">+92 (0345) 4700788</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MdEmail className="shrink-0 text-base text-cyan-400" />
                <span>support@trafficguard.ai</span>
              </div>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
          <p className="font-mono text-[11px] text-slate-500">
            © {new Date().getFullYear()}{' '}
            <span className="text-slate-300">TrafficGuard AI</span>. All rights reserved.
          </p>
          <div className="flex items-center gap-4 font-mono text-[10px] text-slate-500">
            <a href="#privacy" className="transition hover:text-cyan-400">Privacy Protocol</a>
            <span>•</span>
            <a href="#terms" className="transition hover:text-cyan-400">System Terms</a>
            <span>•</span>
            <a href="#security" className="transition hover:text-cyan-400">Security Clearance</a>
          </div>
        </div>

      </div>
    </footer>
  )
}