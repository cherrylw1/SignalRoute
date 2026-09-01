"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  toggleAudio,
  subscribeAudioState,
  playClickSound,
  playSwitchSound,
  playSuccessSound,
} from "@/lib/sound";

interface CommandItem {
  id: string;
  label: string;
  category: "Navigation" | "Action" | "Preferences";
  shortcut?: string;
  icon: string;
  action: () => void;
}

export function DynamicIsland() {
  const [visible, setVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("Hero");
  const [soundOn, setSoundOn] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const unsub = subscribeAudioState((state) => setSoundOn(state));
    return unsub;
  }, []);

  // Track active section and scroll visibility
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setVisible(y > 320);

      const sections = [
        { id: "hero", label: "01 Hero" },
        { id: "simulator", label: "02 Simulator" },
        { id: "how-it-works", label: "03 Journey" },
        { id: "proof", label: "04 Scout AI" },
        { id: "calculator", label: "05 Pipeline ROI" },
        { id: "pricing", label: "06 Pricing" },
      ];

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45) {
            setActiveSection(sections[i].label);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Global Cmd+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((prev) => {
          if (!prev) {
            playSwitchSound();
            setTimeout(() => inputRef.current?.focus(), 50);
          }
          return !prev;
        });
      }
      if (e.key === "Escape" && paletteOpen) {
        setPaletteOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [paletteOpen]);

  const scrollTo = (id: string) => {
    playClickSound();
    setPaletteOpen(false);
    const element = document.getElementById(id);
    if (element) {
      if (window.__lenis) {
        window.__lenis.scrollTo(element, { offset: -20, duration: 1.1 });
      } else {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const commands: CommandItem[] = [
    {
      id: "sim",
      label: "Jump to Live Signal Simulator",
      category: "Navigation",
      shortcut: "S",
      icon: "⚡",
      action: () => scrollTo("simulator"),
    },
    {
      id: "journey",
      label: "Jump to Known-Visitor Journey Rail",
      category: "Navigation",
      shortcut: "J",
      icon: "→",
      action: () => scrollTo("how-it-works"),
    },
    {
      id: "scout",
      label: "Jump to Scout AI Deal Intelligence",
      category: "Navigation",
      shortcut: "P",
      icon: "✦",
      action: () => scrollTo("proof"),
    },
    {
      id: "calc",
      label: "Jump to Pipeline Leak ROI Calculator",
      category: "Navigation",
      shortcut: "C",
      icon: "📊",
      action: () => scrollTo("calculator"),
    },
    {
      id: "pricing",
      label: "Jump to Pricing & Plans",
      category: "Navigation",
      shortcut: "$",
      icon: "🏷️",
      action: () => scrollTo("pricing"),
    },
    {
      id: "audio",
      label: soundOn ? "Mute Audio Micro-Haptics" : "Enable Audio Micro-Haptics",
      category: "Preferences",
      shortcut: "H",
      icon: soundOn ? "🔊" : "🔇",
      action: () => {
        toggleAudio();
        setPaletteOpen(false);
      },
    },
    {
      id: "demo",
      label: "Book 15-Min Founder Demo",
      category: "Action",
      shortcut: "B",
      icon: "📅",
      action: () => {
        playSuccessSound();
        window.open("https://cal.com/sharath.mb/demo", "_blank");
        setPaletteOpen(false);
      },
    },
    {
      id: "app",
      label: "Sign in to Churnaut Platform",
      category: "Action",
      shortcut: "O",
      icon: "↗",
      action: () => {
        playClickSound();
        window.open("https://app.churnaut.com", "_blank");
        setPaletteOpen(false);
      },
    },
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePaletteKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
      playClickSound();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      playClickSound();
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
      }
    }
  };

  return (
    <>
      {/* Floating Dynamic Island */}
      <AnimatePresence>
        {visible && (
          <motion.div
            className="dynamic-island-shell"
            initial={{ opacity: 0, y: 35, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
          >
            <div className="dynamic-island-content">
              {/* Active Section Chip */}
              <div className="island-section-chip">
                <span className="island-pulse-dot" />
                <span>{activeSection}</span>
              </div>

              <span className="island-divider" />

              {/* Sound Equalizer Toggle */}
              <button
                type="button"
                className={`island-audio-btn ${soundOn ? "is-active" : ""}`}
                onClick={() => toggleAudio()}
                data-cursor="Sound"
                title={soundOn ? "Mute audio haptics" : "Enable audio haptics"}
              >
                <div className="island-equalizer">
                  <span className="eq-bar eq-1" />
                  <span className="eq-bar eq-2" />
                  <span className="eq-bar eq-3" />
                </div>
                <small>{soundOn ? "Haptics On" : "Muted"}</small>
              </button>

              <span className="island-divider" />

              {/* Command Palette Trigger */}
              <button
                type="button"
                className="island-cmd-btn"
                onClick={() => {
                  playSwitchSound();
                  setPaletteOpen(true);
                  setTimeout(() => inputRef.current?.focus(), 50);
                }}
                data-cursor="Menu"
              >
                <span className="island-cmd-icon">⌘K</span>
                <span className="island-cmd-label">Menu</span>
              </button>

              <span className="island-divider" />

              {/* Fast Action CTA */}
              <a
                href="https://cal.com/sharath.mb/demo"
                target="_blank"
                rel="noreferrer"
                className="island-demo-btn"
                onClick={() => playSuccessSound()}
                data-cursor="Demo"
              >
                Demo <span>↗</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Command Palette Modal */}
      <AnimatePresence>
        {paletteOpen && (
          <div className="command-palette-backdrop" onClick={() => setPaletteOpen(false)}>
            <motion.div
              className="command-palette-modal"
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ type: "spring", stiffness: 450, damping: 32 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="command-search-box">
                <span className="command-search-icon">🔍</span>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Type a command or jump to section..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSelectedIndex(0);
                  }}
                  onKeyDown={handlePaletteKeyDown}
                  className="command-search-input"
                />
                <span className="command-kbd-esc" onClick={() => setPaletteOpen(false)}>
                  ESC
                </span>
              </div>

              <div className="command-list" role="listbox">
                {filteredCommands.length === 0 ? (
                  <div className="command-empty">No matching commands found.</div>
                ) : (
                  filteredCommands.map((cmd, idx) => (
                    <div
                      key={cmd.id}
                      className={`command-item ${idx === selectedIndex ? "is-selected" : ""}`}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      onClick={cmd.action}
                      role="option"
                      aria-selected={idx === selectedIndex}
                    >
                      <span className="command-item-icon">{cmd.icon}</span>
                      <span className="command-item-label">{cmd.label}</span>
                      {cmd.shortcut && <span className="command-item-shortcut">{cmd.shortcut}</span>}
                    </div>
                  ))
                )}
              </div>

              <div className="command-palette-footer">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
                <span>ESC Close</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
