import React, { useState, useEffect } from 'react';
import { ArrowRight, Play, Database, Brain, Activity, ShieldAlert, Cpu, Sparkles } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const [counts, setCounts] = useState({
    models: 14820,
    dataTB: 842.5,
    predictions: 9412850,
    threats: 1482
  });

  // Simulated live telemetry increments
  useEffect(() => {
    const interval = setInterval(() => {
      setCounts(prev => ({
        models: prev.models + (Math.random() > 0.7 ? 1 : 0),
        dataTB: +(prev.dataTB + (Math.random() * 0.05)).toFixed(1),
        predictions: prev.predictions + Math.floor(Math.random() * 15 + 4),
        threats: prev.threats + (Math.random() > 0.85 ? 1 : 0)
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="inicio" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Subtle status kicker */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-cyan-500/30 bg-cyan-950/30 text-cyan-300 font-mono text-xs tracking-wider mb-6">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>SISTEMA MATRICIAL ACTIVO // EDICIÓN 2026</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Copy (Left 7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight font-sans">
              INTELIGENCIA <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-blue-500 glow-text-cyan">
                ARTIFICIAL
              </span>
            </h1>

            <p className="text-sm sm:text-base font-mono text-cyan-400/90 tracking-wide font-medium">
              Machine Learning <span className="text-slate-600">·</span> Data Science <span className="text-slate-600">·</span> Tecnologías Emergentes
            </p>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
              Plataforma tecnológica avanzada dedicada al estudio, visualización matemática y experimentación interactiva de redes neuronales profundas, modelado predictivo, pipelines de datos y ciberdefensa automatizada en tiempo real.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#ia-conceptos"
                className="flex items-center gap-2 px-6 py-3 rounded text-sm font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-all shadow-[0_0_20px_rgba(0,240,255,0.35)] hover:shadow-[0_0_25px_rgba(0,240,255,0.5)]"
              >
                <span>Explorar IA</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#playground"
                className="flex items-center gap-2 px-6 py-3 rounded text-sm font-semibold text-emerald-300 bg-[#161b22] border border-emerald-500/40 hover:bg-emerald-950/30 hover:border-emerald-400 transition-all hover:shadow-[0_0_20px_rgba(0,255,102,0.25)]"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Iniciar Playground</span>
              </a>
            </div>

            {/* Live Telemetry Indicators Grid */}
            <div className="pt-8 border-t border-cyan-500/15">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                
                {/* Metric 1 */}
                <div className="p-3.5 rounded bg-[#161b22]/70 border border-slate-800 hover:border-cyan-500/40 transition-colors">
                  <div className="flex items-center gap-2 text-cyan-400 mb-1">
                    <Brain className="w-4 h-4" />
                    <span className="text-[11px] font-mono text-slate-400 uppercase">Modelos</span>
                  </div>
                  <div className="text-xl font-mono font-bold text-white tabular-nums">
                    {counts.models.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-emerald-400 font-mono mt-0.5">+12 entrenados hoy</div>
                </div>

                {/* Metric 2 */}
                <div className="p-3.5 rounded bg-[#161b22]/70 border border-slate-800 hover:border-emerald-500/40 transition-colors">
                  <div className="flex items-center gap-2 text-emerald-400 mb-1">
                    <Database className="w-4 h-4" />
                    <span className="text-[11px] font-mono text-slate-400 uppercase">Datos Procesados</span>
                  </div>
                  <div className="text-xl font-mono font-bold text-white tabular-nums">
                    {counts.dataTB} <span className="text-xs font-normal text-slate-400">TB</span>
                  </div>
                  <div className="text-[10px] text-cyan-400 font-mono mt-0.5">Stream continuo</div>
                </div>

                {/* Metric 3 */}
                <div className="p-3.5 rounded bg-[#161b22]/70 border border-slate-800 hover:border-blue-500/40 transition-colors">
                  <div className="flex items-center gap-2 text-blue-400 mb-1">
                    <Activity className="w-4 h-4" />
                    <span className="text-[11px] font-mono text-slate-400 uppercase">Predicciones</span>
                  </div>
                  <div className="text-xl font-mono font-bold text-white tabular-nums">
                    {(counts.predictions / 1000000).toFixed(2)}M
                  </div>
                  <div className="text-[10px] text-emerald-400 font-mono mt-0.5">99.2% confiabilidad</div>
                </div>

                {/* Metric 4 */}
                <div className="p-3.5 rounded bg-[#161b22]/70 border border-slate-800 hover:border-amber-500/40 transition-colors">
                  <div className="flex items-center gap-2 text-amber-400 mb-1">
                    <ShieldAlert className="w-4 h-4" />
                    <span className="text-[11px] font-mono text-slate-400 uppercase">Amenazas IA</span>
                  </div>
                  <div className="text-xl font-mono font-bold text-white tabular-nums text-amber-300">
                    {counts.threats.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-amber-400 font-mono mt-0.5">100% neutralizadas</div>
                </div>

              </div>
            </div>

          </div>

          {/* Isometric Cyber visual card (Right 5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto rounded-xl overflow-hidden border border-cyan-500/30 bg-[#161b22]/80 shadow-[0_0_35px_rgba(0,240,255,0.15)] group">
              
              {/* Generated high-fidelity isometric asset */}
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <img
                  src="/src/assets/images/hero_ai_matrix_network_1790199415601.jpg"
                  alt="Red Neuronal y Matriz de Datos Cyberpunk"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/30 to-transparent" />
                
                {/* Tech Badges on visual */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0d1117]/85 border border-cyan-500/40 text-[11px] font-mono text-cyan-300 backdrop-blur-sm">
                  <Cpu className="w-3 h-3 text-cyan-400 animate-pulse" />
                  <span>NEXUS-NEURAL-CORE // V4.0</span>
                </div>

                <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-[10px] font-mono text-emerald-400">
                  LATENCIA: 1.2ms
                </div>
              </div>

              {/* Bottom interactive card info */}
              <div className="p-4 space-y-2 border-t border-cyan-500/20 bg-[#161b22]">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">ARQUITECTURA // TENSOR SYNAPSE</span>
                  <span className="text-cyan-400">ESTADO: SINCRONIZADO</span>
                </div>
                <div className="w-full bg-slate-800/80 h-1.5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 w-4/5 animate-pulse" />
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  Monitoreo matricial en tiempo real. Procesa tensores multidimensionales con aceleración por hardware simulada.
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
