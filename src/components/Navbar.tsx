import React, { useState, useEffect } from 'react';
import { Cpu, Terminal, Menu, X, Play, ShieldAlert, Sparkles, ChevronDown } from 'lucide-react';

interface NavbarProps {
  onOpenTerminal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenTerminal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Conceptos IA', href: '#ia-conceptos' },
    { label: 'Machine Learning', href: '#machine-learning' },
    { label: 'Ciencia de Datos', href: '#data-science' },
    { label: 'Redes Neuronales', href: '#redes-neuronales' },
    { label: 'IA Generativa', href: '#ia-generativa' },
  ];

  const secondaryLinks = [
    { label: 'AI Playground', href: '#playground' },
    { label: 'Data Dashboard', href: '#dashboard' },
    { label: 'IA & Ciberseguridad', href: '#ciberseguridad' },
    { label: 'Aplicaciones', href: '#aplicaciones' },
    { label: 'Tecnologías', href: '#tecnologias' },
    { label: 'Ética y Futuro', href: '#etica-futuro' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0d1117]/95 backdrop-blur-md border-b border-cyan-500/20 py-3 shadow-lg shadow-cyan-950/20'
          : 'bg-transparent py-4 border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Zone 1: Single text wordmark with subtle glyph */}
        <a href="#inicio" className="flex items-center gap-2.5 text-slate-100 group">
          <div className="w-8 h-8 rounded bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 group-hover:shadow-[0_0_12px_rgba(0,240,255,0.4)] transition-all">
            <Cpu className="w-4.5 h-4.5" />
          </div>
          <span className="font-mono font-bold tracking-wider text-base text-slate-100 flex items-center">
            NEXUS<span className="text-cyan-400 mx-1">//</span><span className="text-emerald-400">AI</span>
          </span>
        </a>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-5 text-xs font-medium tracking-wide text-slate-300">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="hover:text-cyan-400 transition-colors py-1 relative group"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-200" />
            </a>
          ))}

          {/* Dropdown for Advanced Modules */}
          <div className="relative">
            <button
              onClick={() => setMoreMenuOpen(!moreMenuOpen)}
              onBlur={() => setTimeout(() => setMoreMenuOpen(false), 200)}
              className="flex items-center gap-1 hover:text-cyan-400 transition-colors py-1 focus:outline-none"
            >
              <span>Módulos</span>
              <ChevronDown className="w-3 h-3" />
            </button>
            {moreMenuOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-[#161b22] border border-cyan-500/30 rounded-lg shadow-xl py-2 flex flex-col z-50">
                {secondaryLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMoreMenuOpen(false)}
                    className="px-4 py-2 text-xs text-slate-300 hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onOpenTerminal}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-emerald-300 bg-emerald-950/40 border border-emerald-500/40 rounded hover:bg-emerald-900/40 hover:border-emerald-400 transition-all hover:shadow-[0_0_10px_rgba(0,255,102,0.25)] whitespace-nowrap"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Terminal CLI</span>
          </button>
          
          <a
            href="#playground"
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-slate-900 bg-cyan-400 hover:bg-cyan-300 rounded transition-all hover:shadow-[0_0_14px_rgba(0,240,255,0.4)] whitespace-nowrap"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Playground</span>
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-slate-400 hover:text-cyan-400 focus:outline-none"
          aria-label="Abrir Menú"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0d1117]/98 border-b border-cyan-500/30 px-5 py-6 space-y-4 shadow-2xl">
          <div className="grid grid-cols-2 gap-2 text-xs font-medium">
            {[...navLinks, ...secondaryLinks].map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-slate-300 hover:text-cyan-400 hover:bg-cyan-500/10 rounded border border-transparent hover:border-cyan-500/20 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="pt-4 border-t border-slate-800 flex gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTerminal();
              }}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-mono text-emerald-300 bg-emerald-950/50 border border-emerald-500/40 rounded"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Terminal CLI</span>
            </button>
            <a
              href="#playground"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium text-slate-900 bg-cyan-400 rounded"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Playground</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
