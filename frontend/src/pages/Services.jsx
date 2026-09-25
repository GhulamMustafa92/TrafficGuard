import React from "react";
import {
  FaVideo,
  FaTriangleExclamation,
  FaRoute,
  FaChartLine,
  FaNetworkWired,
  FaChartBar,
} from "react-icons/fa6";

const services = [
  {
    title: "Real-Time Traffic Monitoring",
    description:
      "Monitor live traffic camera feeds with intelligent computer vision and real-time vehicle detection.",
    icon: FaVideo,
    number: "01",
  },
  {
    title: "Incident Detection & Alerting",
    description:
      "Automatically identify road accidents and critical incidents and trigger instant safety alerts.",
    icon: FaTriangleExclamation,
    number: "02",
  },
  {
    title: "Traffic Flow Optimization",
    description:
      "Analyze traffic movement and identify congestion patterns for smarter traffic management.",
    icon: FaRoute,
    number: "03",
  },
  {
    title: "Predictive Analytics",
    description:
      "Use historical and real-time data to identify traffic patterns and support proactive decisions.",
    icon: FaChartLine,
    number: "04",
  },
  {
    title: "Traffic System Integration",
    description:
      "Connect intelligent detection capabilities with existing traffic management and monitoring systems.",
    icon: FaNetworkWired,
    number: "05",
  },
  {
    title: "Real-Time Reporting & Visualization",
    description:
      "Transform detection data into clear reports, analytics, and visual insights for better monitoring.",
    icon: FaChartBar,
    number: "06",
  },
];

export default function Services() {
  return (
    <section className="relative bg-transparent w-full overflow-hidden py-20 text-white sm:py-24 lg:py-28">
      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/4 top-0 h-[350px] w-[350px] rounded-full" />

      <div className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-cyan-500/[0.07] blur-[140px]" />

      {/* Background Grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.025] [background-image:linear-gradient(rgba(59,130,246,1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,1)_1px,transparent_1px)] [background-size:60px_60px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">

        {/* ================= HEADER ================= */}
        <div className="mx-auto max-w-2xl text-center">

          {/* Badge */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/[0.05] px-3.5 py-1.5 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-60" />
              <span className="relative h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.9)]" />
            </span>

            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-cyan-400">
              AI-Powered Safety Security
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl font-black uppercase tracking-tight sm:text-4xl lg:text-5xl">
            Intelligent{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Safety Services
            </span>
          </h2>

          {/* Description */}
          <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
            Advanced AI-powered solutions designed to monitor traffic,
            detect critical incidents, analyze road conditions, and improve
            real-time road safety.
          </p>

          {/* Divider */}
          <div className="mx-auto mt-7 flex w-fit items-center gap-2">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-cyan-400" />

            <div className="h-1 w-1 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.9)]" />

            <div className="h-1 w-1 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />

            <div className="h-px w-12 bg-gradient-to-l from-transparent to-blue-500" />
          </div>
        </div>

        {/* ================= SERVICES GRID ================= */}
    <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
  {services.map((service) => {
    const Icon = service.icon;

    return (
      <div
        key={service.title}
        className="
          group relative min-h-[285px] overflow-hidden rounded-2xl
          border border-white/[0.07]
          cursor-pointer
          bg-[#07111f]/60
          p-6
          backdrop-blur-xl
          transition-all duration-500
          hover:-translate-y-1
          hover:border-cyan-400/25
          hover:bg-[#081526]/85
          hover:shadow-[0_18px_50px_rgba(6,182,212,0.12)]
        "
      >
        {/* ================= TOP GLOW ================= */}
        <div
          className="
            absolute left-0 right-0 top-0 h-px
            bg-gradient-to-r
            from-transparent
            via-cyan-400
            to-transparent
            opacity-0
            transition-opacity duration-500
            group-hover:opacity-100
          "
        />

        {/* ================= BACKGROUND GLOW ================= */}
        <div
          className="
            absolute -right-20 -top-20
            h-44 w-44 rounded-full
            bg-cyan-400/[0.025]
            blur-3xl
            transition-all duration-700
            group-hover:bg-cyan-400/[0.09]
          "
        />

        {/* ================= LARGE HOVER ICON ================= */}
        <div
          className="
            pointer-events-none absolute
            right-[-15px] top-[58px]
            z-0
            opacity-0
            translate-x-8
            rotate-6
            transition-all duration-700
            ease-out
            group-hover:translate-x-0
            group-hover:rotate-0
            group-hover:opacity-[0.12]
          "
        >
          <Icon
            className="
              text-[150px]
              text-cyan-300
              drop-shadow-[0_0_25px_rgba(34,211,238,0.35)]
            "
          />
        </div>

        {/* ================= NUMBER ================= */}
        <span
          className="
            absolute right-5 top-5 z-10
            font-mono text-[10px]
            tracking-[0.2em]
            text-slate-700
            transition-all duration-300
            group-hover:text-cyan-400/50
          "
        >
          {service.number}
        </span>

        {/* ================= ICON ================= */}
        <div
          className="
            relative z-10 mb-6
            flex h-12 w-12 items-center justify-center
            rounded-xl
            border border-cyan-400/15
            bg-cyan-400/[0.06]
            text-cyan-400
            shadow-[0_0_20px_rgba(34,211,238,0.06)]
            transition-all duration-500
            group-hover:border-cyan-400/30
            group-hover:bg-cyan-400/10
            group-hover:shadow-[0_0_25px_rgba(34,211,238,0.15)]
            group-hover:scale-105
          "
        >
          <Icon className="text-lg" />
        </div>

        {/* ================= CONTENT ================= */}
        <div className="relative z-10 max-w-[85%]">
          <h3
            className="
              text-base font-semibold
              tracking-wide text-white
              transition-colors duration-300
              group-hover:text-cyan-300
            "
          >
            {service.title}
          </h3>

          <p
            className="
              mt-3
              text-sm leading-6
              text-slate-400
              transition-colors duration-300
              group-hover:text-slate-300
            "
          >
            {service.description}
          </p>
        </div>

        {/* ================= BOTTOM SYSTEM ================= */}
        <div className="absolute bottom-6 left-6 right-6 z-10">
          <div className="flex items-center justify-between">

            {/* AI SYSTEM */}
            <div className="flex items-center gap-2">
              <div
                className="
                  h-px w-8
                  bg-cyan-400/30
                  transition-all duration-500
                  group-hover:w-14
                  group-hover:bg-cyan-400/70
                "
              />

              <span
                className="
                  font-mono text-[8px]
                  uppercase tracking-[0.15em]
                  text-slate-600
                  transition-colors duration-300
                  group-hover:text-cyan-400/70
                "
              >
                AI SYSTEM
              </span>
            </div>

            {/* STATUS */}
            <div className="flex items-center gap-1.5">
              <span
                className="
                  h-1.5 w-1.5 rounded-full
                  bg-cyan-400
                  opacity-50
                  shadow-[0_0_8px_rgba(34,211,238,0.8)]
                  transition-all duration-300
                  group-hover:opacity-100
                "
              />

              <span
                className="
                  font-mono text-[7px]
                  uppercase tracking-widest
                  text-slate-700
                  transition-colors duration-300
                  group-hover:text-cyan-400/60
                "
              >
                ACTIVE
              </span>
            </div>

          </div>
        </div>

        {/* ================= BOTTOM GLOW ================= */}
        <div
          className="
            absolute bottom-0 left-1/2
            h-px w-0
            -translate-x-1/2
            bg-gradient-to-r
            from-transparent
            via-cyan-400
            to-transparent
            transition-all duration-700
            group-hover:w-[75%]
          "
        />
      </div>
    );
  })}
</div>

        {/* ================= BOTTOM STATUS ================= */}
        <div className="mt-10 flex justify-center">
          <div className="flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.02] px-4 py-2 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />

            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-500">
              TrafficGuard AI Services • System Operational
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}