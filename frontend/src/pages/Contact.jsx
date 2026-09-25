import React, { useState } from 'react'
import {
  MdShield,
  MdLocalHospital,
  MdHeadsetMic,
  MdSend,
  MdWarning,
  MdLocationOn,
  MdEmail,
  MdAccessTime,
  MdMessage,
  MdCrisisAlert,
  MdInfo,
  MdCheckCircle,
  MdGpsFixed
} from 'react-icons/md'

const quickLinks = [
  { icon: MdShield, number: '911', label: 'Police Emergency', color: 'text-red-400', border: 'border-red-500/30', bg: 'bg-red-500/10', glow: 'hover:shadow-[0_0_25px_rgba(239,68,68,0.25)]' },
  { icon: MdLocalHospital, number: '1122', label: 'Ambulance Dispatch', color: 'text-amber-400', border: 'border-amber-500/30', bg: 'bg-amber-500/10', glow: 'hover:shadow-[0_0_25px_rgba(245,158,11,0.25)]' },
  { icon: MdHeadsetMic, number: '+92 (0345) 4700788', label: '24/7 Command Helpline', color: 'text-cyan-400', border: 'border-cyan-400/30', bg: 'bg-cyan-400/10', glow: 'hover:shadow-[0_0_25px_rgba(34,211,238,0.25)]' },
]

const contactInfo = [
  { icon: MdLocationOn, label: 'Command Center', value: 'TrafficGuard AI Hub, Gujrat, Pakistan' },
  { icon: MdEmail, label: 'Secure Email', value: 'support@trafficguard.ai' },
  { icon: MdAccessTime, label: 'System Uptime', value: '24/7 / 365 Days — Continuous Vision' },
]

export default function Contact() {
  const [generalSent, setGeneralSent] = useState(false)
  const [dispatchSent, setDispatchSent] = useState(false)

  const handleGeneralSubmit = (e) => {
    e.preventDefault()
    setGeneralSent(true)
    setTimeout(() => setGeneralSent(false), 4000)
  }

  const handleDispatchSubmit = (e) => {
    e.preventDefault()
    setDispatchSent(true)
    setTimeout(() => setDispatchSent(false), 4000)
  }

  return (
    <section className="relative w-full overflow-hidden bg-slate-950 py-20 text-white sm:py-24 lg:py-28">

      {/* Futuristic Animated Glow Orbs */}
      <div className="pointer-events-none absolute left-1/4 top-10 h-[450px] w-[450px] animate-pulse rounded-full bg-blue-600/15 blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-10 right-10 h-[500px] w-[500px] animate-pulse rounded-full bg-cyan-500/10 blur-[150px]" />

      {/* Sci-Fi Grid Overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] [background-image:linear-gradient(rgba(34,211,238,1)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,1)_1px,transparent_1px)] [background-size:50px_50px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">

        {/* ===== HEADER ===== */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 backdrop-blur-xl">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-80" />
              <span className="relative h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee]" />
            </span>
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-300">
              Emergency & Command Network
            </span>
          </div>

          <h2 className="text-3xl font-black uppercase tracking-tight text-white sm:text-4xl lg:text-5xl">
            Quick Connect &{' '}
            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Emergency Dispatch
            </span>
          </h2>

          <p className="mt-3 text-xs font-mono uppercase tracking-[0.15em] text-slate-400 sm:text-sm">
            AI Automated Alerting System • Real-Time Safety Response
          </p>

          <div className="mx-auto mt-6 flex w-fit items-center gap-2">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-cyan-400" />
            <div className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
            <div className="h-1.5 w-1.5 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6]" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-blue-500" />
          </div>
        </div>

        {/* ===== QUICK EMERGENCY SPEED DIAL ===== */}
        <div className="mb-12 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {quickLinks.map((q) => {
            const Icon = q.icon
            return (
              <div
                key={q.label}
                className={`group relative overflow-hidden rounded-2xl border ${q.border} bg-slate-900/40 p-6 text-center backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 ${q.glow}`}
              >
                <div className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl border ${q.border} ${q.bg} ${q.color} text-2xl transition-transform duration-300 group-hover:scale-110`}>
                  <Icon />
                </div>
                <div className="font-mono text-2xl font-black tracking-wider text-white">{q.number}</div>
                <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-400">{q.label}</div>
              </div>
            )
          })}
        </div>

        {/* ===== MAIN GRID: INQUIRY FORM + EMERGENCY DISPATCH ===== */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">

          {/* General Inquiry Form */}
          <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/40 p-7 backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/40 lg:col-span-6">
            <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan-500/10 blur-2xl" />
            
            <div className="mb-6 flex items-center gap-2.5 text-sm font-bold uppercase tracking-widest text-cyan-300">
              <MdMessage className="text-cyan-400 text-lg" />
              General Inquiry & Support
            </div>

            {generalSent ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <MdCheckCircle className="h-16 w-16 text-cyan-400 animate-bounce" />
                <h3 className="mt-3 text-lg font-bold text-white">Message Transmitted</h3>
                <p className="mt-1 text-xs text-slate-400">Our command team will respond shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleGeneralSubmit} className="space-y-4">
                <div>
                  <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-slate-300">Full Name</label>
                  <input
                    required
                    type="text"
                    placeholder="Ghulam Mustafa"
                    className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition-all focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.15)]"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-slate-300">Email Address</label>
                  <input
                    required
                    type="email"
                    placeholder="user@example.com"
                    className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition-all focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.15)]"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-slate-300">Message</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="How can TrafficGuard assist your infrastructure?"
                    className="w-full resize-none rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition-all focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.15)]"
                  />
                </div>
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3.5 text-xs font-bold uppercase tracking-wider text-black transition-all duration-300 hover:shadow-[0_0_25px_rgba(34,211,238,0.4)]"
                >
                  <MdSend className="text-base" /> Transmit Message
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Emergency Dispatch & System Info */}
          <div className="space-y-6 lg:col-span-6">

            {/* Emergency Dispatch Form */}
            <div className="group relative overflow-hidden rounded-2xl border border-red-500/30 bg-red-950/10 p-7 backdrop-blur-xl transition-all duration-300 hover:border-red-500/60 shadow-[0_0_30px_rgba(239,68,68,0.08)]">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-sm font-bold uppercase tracking-widest text-red-400">
                  <MdCrisisAlert className="text-red-500 text-xl animate-pulse" />
                  Emergency Dispatch Trigger
                </div>
                <span className="rounded-full border border-red-500/40 bg-red-500/10 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-red-400">
                  Priority High
                </span>
              </div>

              {dispatchSent ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <MdWarning className="h-12 w-12 text-red-500 animate-ping" />
                  <h3 className="mt-2 text-base font-bold text-white">Emergency Dispatch Initiated!</h3>
                  <p className="mt-0.5 text-xs text-slate-400">Incident units notified on location.</p>
                </div>
              ) : (
                <form onSubmit={handleDispatchSubmit} className="space-y-4">
                  <div>
                    <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-slate-300">Incident Category</label>
                    <select
                      required
                      className="w-full rounded-xl border border-red-500/20 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none transition-all focus:border-red-400"
                    >
                      <option value="">Select Hazard Type...</option>
                      <option value="crash">Severe Vehicle Crash</option>
                      <option value="fire">Vehicle Fire Hazard</option>
                      <option value="medical">Medical Assistance Required</option>
                      <option value="obstacle">Road Blockage / Hazard</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-slate-300">Location Details</label>
                    <div className="relative">
                      <input
                        required
                        type="text"
                        placeholder="e.g. GT Road, Intersection 4"
                        className="w-full rounded-xl border border-red-500/20 bg-slate-950/80 px-4 py-3 pl-10 text-sm text-white placeholder-slate-600 outline-none transition-all focus:border-red-400"
                      />
                      <MdGpsFixed className="absolute left-3 top-3.5 text-red-400 text-base" />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-red-800 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 hover:shadow-[0_0_25px_rgba(239,68,68,0.5)]"
                  >
                    <MdWarning className="text-base" /> Dispatch Response Team Now
                  </button>
                </form>
              )}
            </div>

            {/* System Info Panel */}
            <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6 backdrop-blur-xl">
              <div className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-300">
                <MdInfo className="text-cyan-400 text-base" />
                Command Center Information
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {contactInfo.map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.label} className="rounded-xl border border-white/5 bg-slate-950/50 p-3">
                      <div className="mb-1 flex items-center gap-1.5 text-cyan-400">
                        <Icon className="text-sm" />
                        <span className="font-mono text-[10px] uppercase text-slate-400">{item.label}</span>
                      </div>
                      <div className="text-xs font-medium text-slate-200">{item.value}</div>
                    </div>
                  )
                })}
              </div>
            </div>

          </div>

        </div>

        {/* ===== BOTTOM STATUS FOOTER BAR ===== */}
        <div className="mt-12 flex justify-center">
          <div className="flex items-center gap-3 rounded-full border border-cyan-500/20 bg-slate-900/60 px-5 py-2 backdrop-blur-xl shadow-[0_0_20px_rgba(34,211,238,0.1)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-400">
              TrafficGuard Live Safety Dispatch • System Operational
            </span>
          </div>
        </div>

      </div>
    </section>
  )
}