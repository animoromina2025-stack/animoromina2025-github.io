import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Activity,
  Database,
  Cpu,
  TrendingUp,
  Radio,
  BarChart,
  PieChart as PieIcon,
  ScatterChart,
  Sparkles
} from 'lucide-react';

export const DashboardSection: React.FC = () => {
  const [liveStreamActive, setLiveStreamActive] = useState<boolean>(true);

  // Dynamic Metrics
  const [metrics, setMetrics] = useState({
    datasets: 124,
    models: 48,
    predictionsSec: 3840,
    accuracy: 98.6,
    dataProcessedTB: 842.8
  });

  // Dynamic Line Chart Data (Last 8 minutes)
  const [lineHistory, setLineHistory] = useState<number[]>([
    96.4, 97.1, 96.8, 97.9, 98.2, 98.0, 98.5, 98.6
  ]);

  // Scatter points
  const [scatterPoints, setScatterPoints] = useState<Array<{ x: number; y: number; cls: number }>>([
    { x: 15, y: 30, cls: 0 }, { x: 25, y: 45, cls: 0 }, { x: 35, y: 40, cls: 0 }, { x: 20, y: 60, cls: 0 },
    { x: 55, y: 70, cls: 1 }, { x: 65, y: 85, cls: 1 }, { x: 75, y: 80, cls: 1 }, { x: 85, y: 90, cls: 1 },
    { x: 30, y: 85, cls: 2 }, { x: 40, y: 95, cls: 2 }, { x: 45, y: 80, cls: 2 }
  ]);

  // Real-time pulse interval
  useEffect(() => {
    if (!liveStreamActive) return;

    const interval = setInterval(() => {
      setMetrics((prev) => ({
        datasets: prev.datasets + (Math.random() > 0.9 ? 1 : 0),
        models: prev.models,
        predictionsSec: 3800 + Math.floor(Math.random() * 120),
        accuracy: +(98.4 + Math.random() * 0.4).toFixed(1),
        dataProcessedTB: +(prev.dataProcessedTB + 0.04).toFixed(1)
      }));

      setLineHistory((prev) => {
        const nextVal = +(97.5 + Math.random() * 1.5).toFixed(1);
        return [...prev.slice(1), nextVal];
      });

      setScatterPoints((prev) =>
        prev.map((pt) => ({
          ...pt,
          x: Math.max(10, Math.min(90, pt.x + (Math.random() - 0.5) * 4)),
          y: Math.max(10, Math.min(90, pt.y + (Math.random() - 0.5) * 4))
        }))
      );
    }, 2500);

    return () => clearInterval(interval);
  }, [liveStreamActive]);

  // Feature Importance Data
  const features = [
    { name: 'Embedding Contextual', weight: 88, color: 'bg-cyan-400' },
    { name: 'Frecuencia de Tokens', weight: 64, color: 'bg-emerald-400' },
    { name: 'Profundidad de Capas', weight: 52, color: 'bg-blue-400' },
    { name: 'Tasa de Normalización', weight: 41, color: 'bg-amber-400' },
    { name: 'Vector de Gradiente', weight: 29, color: 'bg-purple-400' }
  ];

  return (
    <section id="dashboard" className="py-24 relative border-t border-cyan-500/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-wider">
              <LayoutDashboard className="w-4 h-4" />
              <span>07. TELEMETRÍA EN PRODUCCIÓN // CENTRO DE CONTROL</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Dashboard de Data Science
            </h2>
            <p className="text-slate-300 text-base leading-relaxed">
              Métricas consolidadas de inferencia distribuida, carga de pipelines de ingesta masiva y supervisión algorítmica continua.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLiveStreamActive(!liveStreamActive)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                liveStreamActive
                  ? 'bg-emerald-950/60 border border-emerald-400 text-emerald-300 shadow-[0_0_12px_rgba(0,255,102,0.25)]'
                  : 'bg-[#161b22] border border-slate-700 text-slate-400'
              }`}
            >
              <Radio className={`w-3.5 h-3.5 ${liveStreamActive ? 'animate-pulse text-emerald-400' : ''}`} />
              <span>{liveStreamActive ? 'STREAMING EN VIVO (ACTIVO)' : 'PAUSADO'}</span>
            </button>
          </div>
        </div>

        {/* 5 Dynamic KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
          
          <div className="p-4 rounded-xl bg-[#161b22]/90 border border-cyan-500/25">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-[11px] font-mono">DATASETS</span>
              <Database className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl font-mono font-bold text-white tabular-nums">
              {metrics.datasets}
            </div>
            <div className="text-[10px] text-cyan-400 font-mono mt-1">100% versionados (DVC)</div>
          </div>

          <div className="p-4 rounded-xl bg-[#161b22]/90 border border-emerald-500/25">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-[11px] font-mono">MODELOS</span>
              <Cpu className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-mono font-bold text-white tabular-nums">
              {metrics.models}
            </div>
            <div className="text-[10px] text-emerald-400 font-mono mt-1">En cluster Kubernetes</div>
          </div>

          <div className="p-4 rounded-xl bg-[#161b22]/90 border border-blue-500/25">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-[11px] font-mono">PREDICCIONES</span>
              <Activity className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-2xl font-mono font-bold text-white tabular-nums">
              {metrics.predictionsSec} <span className="text-xs font-normal text-slate-400">/seg</span>
            </div>
            <div className="text-[10px] text-blue-400 font-mono mt-1">Latencia media 4.2ms</div>
          </div>

          <div className="p-4 rounded-xl bg-[#161b22]/90 border border-emerald-500/25">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-[11px] font-mono">PRECISIÓN MEDIA</span>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-mono font-bold text-emerald-300 tabular-nums">
              {metrics.accuracy}%
            </div>
            <div className="text-[10px] text-emerald-400 font-mono mt-1">F1-Weighted: 0.982</div>
          </div>

          <div className="col-span-2 sm:col-span-1 p-4 rounded-xl bg-[#161b22]/90 border border-purple-500/25">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-[11px] font-mono">DATOS PROCESADOS</span>
              <Sparkles className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl font-mono font-bold text-white tabular-nums">
              {metrics.dataProcessedTB} <span className="text-xs font-normal text-slate-400">TB</span>
            </div>
            <div className="text-[10px] text-purple-400 font-mono mt-1">Almacenamiento Parquet</div>
          </div>

        </div>

        {/* 4 Interactive Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Chart 1: Line Chart (6 cols) */}
          <div className="lg:col-span-6 p-5 rounded-xl bg-[#161b22]/90 border border-cyan-500/20">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800 text-xs font-mono">
              <span className="text-cyan-400 font-bold">PRECISIÓN EN TIEMPO REAL (% ACCURACY)</span>
              <span className="text-slate-400">ÚLTIMOS MINUTOS</span>
            </div>

            <div className="h-48 w-full relative bg-[#0d1117] p-3 rounded-lg border border-slate-800 flex items-center">
              <svg viewBox="0 0 400 160" className="w-full h-full overflow-visible">
                {/* Horizontal baseline guides */}
                <line x1="20" y1="20" x2="380" y2="20" stroke="#21262d" strokeDasharray="3 3" />
                <line x1="20" y1="80" x2="380" y2="80" stroke="#21262d" strokeDasharray="3 3" />
                <line x1="20" y1="140" x2="380" y2="140" stroke="#21262d" strokeDasharray="3 3" />

                {/* Line Path */}
                {(() => {
                  const points = lineHistory.map((val, idx) => {
                    const x = 30 + idx * 48;
                    const y = 140 - ((val - 95) / 5) * 110;
                    return `${x},${y}`;
                  });

                  return (
                    <>
                      {/* Gradient area under line */}
                      <path
                        d={`M 30,140 L ${points.join(' L ')} L ${30 + (lineHistory.length - 1) * 48},140 Z`}
                        fill="rgba(0, 240, 255, 0.08)"
                      />
                      <polyline
                        fill="none"
                        stroke="#00f0ff"
                        strokeWidth="2.5"
                        points={points.join(' ')}
                      />
                      {lineHistory.map((val, idx) => {
                        const x = 30 + idx * 48;
                        const y = 140 - ((val - 95) / 5) * 110;
                        return (
                          <circle
                            key={idx}
                            cx={x}
                            cy={y}
                            r="4"
                            fill="#00ff66"
                            stroke="#0d1117"
                            strokeWidth="1.5"
                          />
                        );
                      })}
                    </>
                  );
                })()}
              </svg>
            </div>

            <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 mt-2 px-2">
              <span>95.0% Min</span>
              <span className="text-cyan-400 font-bold">Último: {lineHistory[lineHistory.length - 1]}%</span>
              <span>100.0% Max</span>
            </div>
          </div>

          {/* Chart 2: Bar Chart - Feature Importance (6 cols) */}
          <div className="lg:col-span-6 p-5 rounded-xl bg-[#161b22]/90 border border-emerald-500/20">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800 text-xs font-mono">
              <span className="text-emerald-400 font-bold">IMPORTANCIA DE VARIABLES (SHAP VALUES)</span>
              <span className="text-slate-400">RANKING</span>
            </div>

            <div className="space-y-3 pt-1">
              {features.map((f) => (
                <div key={f.name} className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-300">{f.name}</span>
                    <span className="text-emerald-400 font-bold">{f.weight}%</span>
                  </div>
                  <div className="w-full bg-[#0d1117] h-2 rounded-full overflow-hidden border border-slate-800">
                    <div
                      style={{ width: `${f.weight}%` }}
                      className={`h-full ${f.color} rounded-full transition-all duration-700`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chart 3: Circular / Donut Task Breakdown (6 cols) */}
          <div className="lg:col-span-6 p-5 rounded-xl bg-[#161b22]/90 border border-blue-500/20">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800 text-xs font-mono">
              <span className="text-blue-400 font-bold">DISTRIBUCIÓN DE CARGA POR MODALIDAD</span>
              <span className="text-slate-400">GRÁFICO CIRCULAR</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-around gap-6 pt-2">
              {/* SVG Donut Chart */}
              <div className="w-36 h-36 relative flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  <circle cx="50" cy="50" r="38" stroke="#161b22" strokeWidth="14" fill="none" />
                  {/* NLP 40% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    stroke="#00f0ff"
                    strokeWidth="14"
                    strokeDasharray="95.5 238.7"
                    strokeDashoffset="0"
                    fill="none"
                  />
                  {/* Vision 30% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    stroke="#00ff66"
                    strokeWidth="14"
                    strokeDasharray="71.6 238.7"
                    strokeDashoffset="-95.5"
                    fill="none"
                  />
                  {/* Tabular 20% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    stroke="#3b82f6"
                    strokeWidth="14"
                    strokeDasharray="47.7 238.7"
                    strokeDashoffset="-167.1"
                    fill="none"
                  />
                  {/* Audio 10% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    stroke="#f59e0b"
                    strokeWidth="14"
                    strokeDasharray="23.9 238.7"
                    strokeDashoffset="-214.8"
                    fill="none"
                  />
                </svg>
                <div className="absolute text-center font-mono">
                  <span className="text-xs font-bold text-white">100%</span>
                  <span className="block text-[9px] text-slate-500">Activo</span>
                </div>
              </div>

              {/* Legend List */}
              <div className="space-y-2 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-sm bg-cyan-400" />
                  <span className="text-slate-300">NLP & LLMs (40%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-sm bg-emerald-400" />
                  <span className="text-slate-300">Visión Artificial (30%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-sm bg-blue-500" />
                  <span className="text-slate-300">Datos Tabulares (20%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-sm bg-amber-500" />
                  <span className="text-slate-300">Audio & Señales (10%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Chart 4: Scatter Plot (6 cols) */}
          <div className="lg:col-span-6 p-5 rounded-xl bg-[#161b22]/90 border border-purple-500/20">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800 text-xs font-mono">
              <span className="text-purple-400 font-bold">DISPERSIÓN DE LATENCIA VS THROUGHPUT</span>
              <span className="text-slate-400">CLUSTERS</span>
            </div>

            <div className="h-48 w-full bg-[#0d1117] p-3 rounded-lg border border-slate-800 relative flex items-center">
              <svg viewBox="0 0 360 160" className="w-full h-full">
                {/* Axis lines */}
                <line x1="30" y1="20" x2="30" y2="140" stroke="#21262d" />
                <line x1="30" y1="140" x2="340" y2="140" stroke="#21262d" />

                {scatterPoints.map((pt, i) => {
                  const cx = 30 + (pt.x / 100) * 300;
                  const cy = 140 - (pt.y / 100) * 110;
                  const color = pt.cls === 0 ? '#00f0ff' : pt.cls === 1 ? '#00ff66' : '#a855f7';

                  return (
                    <circle
                      key={i}
                      cx={cx}
                      cy={cy}
                      r="4.5"
                      fill={color}
                      className="transition-all duration-700"
                    />
                  );
                })}
              </svg>
            </div>

            <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 mt-2 px-2">
              <span>Baja Carga</span>
              <span className="text-purple-300">3 Grupos de Rendimiento Identificados</span>
              <span>Alta Concurrencia</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
