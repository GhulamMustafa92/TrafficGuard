import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";

import { HiMenuAlt3, HiX } from "react-icons/hi";
import { MdDashboard, MdSecurity, MdClose } from "react-icons/md";
import { RiAiGenerate } from "react-icons/ri";
import { FaHome, FaInfoCircle, FaCogs, FaEnvelope } from "react-icons/fa";

const navLinks = [
  { name: "Home", href: "#home", icon: FaHome },
  { name: "About", href: "#about", icon: FaInfoCircle },
  { name: "Services", href: "#services", icon: FaCogs },
  { name: "Contact", href: "#contact", icon: FaEnvelope },
];

const DrawOutlineButton = ({ children, ...rest }) => {
  return (
    <button
      {...rest}
      className="group relative px-4 py-2 font-medium text-blue-500 transition-colors duration-[400ms] hover:text-blue-600"
    >
      <span className="flex items-center gap-2">
        <MdDashboard className="text-lg group-hover:rotate-6 transition-transform duration-200" />
        {children}
      </span>

      {/* TOP */}
      <span className="absolute left-0 top-0 h-[2px] w-0 bg-blue-600 transition-all duration-100 group-hover:w-full" />
      {/* RIGHT */}
      <span className="absolute right-0 top-0 h-0 w-[2px] bg-blue-600 transition-all delay-100 duration-100 group-hover:h-full" />
      {/* BOTTOM */}
      <span className="absolute bottom-0 right-0 h-[2px] w-0 bg-blue-600 transition-all delay-200 duration-100 group-hover:w-full" />
      {/* LEFT */}
      <span className="absolute bottom-0 left-0 h-0 w-[2px] bg-blue-600 transition-all delay-300 duration-100 group-hover:h-full" />
    </button>
  );
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-2 sm:px-4 lg:px-8 py-2.5 sm:py-3 bg-black/90 backdrop-blur-md">
      <nav
        className={`
          max-w-7xl mx-auto
          h-16
          
          flex items-center justify-between
          rounded-2xl
          bg-black
          transition-all duration-300
          border
          ${
            scrolled
              ? "border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.18)]"
              : "border-white/10"
          }
        `}
      >
        {/* Logo */}
        <a
          href="#home"
          onClick={closeMenu}
          className="flex items-center gap-2 sm:gap-2.5 group shrink-0 max-w-[70%] sm:max-w-none"
        >
          <div className="relative flex items-center justify-center shrink-0">
            <div className="absolute -inset-2 bg-blue-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <img
              src={logo}
              alt="TG Traffic Guard"
              className="relative h-9 sm:h-11 lg:h-12 w-auto object-contain transition-transform duration-300 border-r-2 border-blue-500 pr-2"
            />
          </div>
          <div className="flex flex-col justify-center min-w-0">
            <div className="flex items-center gap-1 sm:gap-1.5 truncate">
              <span className="text-white font-extrabold text-xs sm:text-base lg:text-lg tracking-wide leading-none">
                TG
              </span>
              <span className="text-blue-500 font-extrabold text-xs sm:text-base lg:text-lg tracking-wide leading-none truncate">
                TRAFFIC GUARD
              </span>
            </div>
            <span className="mt-0.5 text-[8px] sm:text-[9px] lg:text-[10px] text-blue-400 tracking-wider sm:tracking-[0.18em] uppercase font-mono leading-none truncate">
              AI Traffic Surveillance
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center justify-center flex-1 mx-4">
          <ul className="flex items-center gap-6 lg:gap-9">
            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="relative flex items-center gap-2 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200 group"
                  >
                    <Icon className="text-blue-500 text-sm transition-transform duration-200 group-hover:scale-110" />
                    <span>{item.name}</span>
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] rounded-full bg-blue-500 group-hover:w-full transition-all duration-300" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* AI Active */}
          <div className="hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-full border border-blue-500/75 cursor-pointer bg-blue-500/10 transition-all duration-300 shadow-[0_0_20px_rgba(59,130,246,0.6)] hover:shadow-[0_0_30px_rgba(59,130,246,0.9)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-70 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
            </span>
            <span className="text-[10px] font-mono font-semibold text-blue-400 tracking-wider">
              AI ACTIVE
            </span>
          </div>

          {/* Desktop Dashboard Button */}
          <div className="hidden md:block ">
            <DrawOutlineButton className="">Launch Dashboard</DrawOutlineButton>
          </div>

          {/* Mobile Toggle */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="md:hidden flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-white/10 bg-white/5 text-white hover:bg-blue-500 hover:border-blue-500 transition-all duration-300 active:scale-90"
          >
            {menuOpen ? (
              <HiX className="text-xl sm:text-2xl" />
            ) : (
              <HiMenuAlt3 className="text-xl sm:text-2xl" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden max-w-7xl mx-auto overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen
            ? "max-h-[600px] opacity-100 mt-2"
            : "max-h-0 opacity-0 mt-0 pointer-events-none"
        }`}
      >
        <div className="rounded-2xl border border-blue-500/20 bg-black shadow-[0_15px_50px_rgba(0,0,0,0.8)] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <MdSecurity className="text-blue-500 text-lg" />
              </div>
              <div>
                <p className="text-white font-bold text-xs sm:text-sm">
                  TG Traffic Guard
                </p>
                <p className="text-blue-400 text-[9px] font-mono leading-none mt-0.5">
                  AI SURVEILLANCE
                </p>
              </div>
            </div>
            <button
              onClick={closeMenu}
              className="p-1 text-gray-400 hover:text-white transition-colors"
              aria-label="Close menu"
            >
              <MdClose className="text-lg sm:text-xl" />
            </button>
          </div>

          {/* Links */}
          <div className="px-3 py-2 space-y-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={closeMenu}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-300 hover:text-white hover:bg-blue-500/10 group transition-all duration-200"
                >
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 border border-white/10 group-hover:bg-blue-500 group-hover:border-blue-500 transition-all duration-200">
                    <Icon className="text-blue-500 group-hover:text-white text-sm transition-colors duration-200" />
                  </span>
                  <span className="font-medium text-xs sm:text-sm">
                    {item.name}
                  </span>
                </a>
              );
            })}
          </div>

          {/* Status Bar */}
          <div className="mx-3 mb-2.5 flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-blue-500/5 border border-blue-500/15">
            <div className="flex items-center gap-2">
              <RiAiGenerate className="text-blue-500 text-base" />
              <span className="text-gray-300 text-xs font-medium">
                AI Surveillance
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-blue-400 text-[10px] font-mono">
                ACTIVE
              </span>
            </div>
          </div>

          {/* Mobile Dashboard Button */}
          <div className="px-3 pb-3">
            <DrawOutlineButton className="">
              Launch AI Dashboard
            </DrawOutlineButton>
          </div>
        </div>
      </div>
    </header>
  );
}
