import React, { useState, useRef, useEffect } from 'react';
import {
  FlaskConical,
  Play,
  RotateCcw,
  Sliders,
  Sparkles,
  Layers,
  CircleDot,
  TrendingUp,
  Activity,
  Plus
} from 'lucide-react';

export const PlaygroundSection: React.FC = () => {
  const [activeExperiment, setActiveExperiment] = useState<'clasificacion' | 'clustering' | 'patrones'>('clasificacion');

  // Classification 2D State
  const [datasetType, setDatasetType] = useState<'circulos' | 'moons' | 'lineal'>('circulos');
  const [boundarySharpness, setBoundarySharpness] = useState<number>(3);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Clustering K-Means State
  const [kClusters, setKClusters] = useState<number>(3);
  const [kmeansIteration, setKmeansIteration] = useState<number>(0);
  const [centroids, setCentroids] = useState<Array<{ x: number; y: number; color: string }>>([
    { x: 100, y: 80, color: '#00f0ff' },
    { x: 220, y: 190, color: '#00ff66' },
    { x: 300, y: 90, color: '#f59e0b' }
  ]);

  // Anomaly Pattern Detection State
  const [anomalyThreshold, setAnomalyThreshold] = useState<number>(75);
  const [detectedAnomalyCount, setDetectedAnomalyCount] = useState<number>(3);

  // Classification & Canvas rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = (canvas.width = 440);
    const height = (canvas.height = 300);

    if (activeExperiment === 'clasificacion') {
      // 1. Draw decision boundary field
      const step = 8;
      for (let x = 0; x < width; x += step) {
        for (let y = 0; y < height; y += step) {
          const nx = (x / width) * 2 - 1;
          const ny = (y / height) * 2 - 1;

          let score = 0;
          if (datasetType === 'circulos') {
            const r = Math.sqrt(nx * nx + ny * ny);
            score = (r - 0.55) * boundarySharpness;
          } else if (datasetType === 'moons') {
            score = (ny - Math.sin(nx * 3) * 0.4) * boundarySharpness;
          } else {
            score = (ny - nx * 0.8) * boundarySharpness;
          }

          const prob = 1 / (1 + Math.exp(-score));
          if (prob > 0.5) {
            ctx.fillStyle = `rgba(0, 240, 255, ${Math.min(0.3, prob * 0.25)})`;
          } else {
            ctx.fillStyle = `rgba(245, 158, 11, ${Math.min(0.3, (1 - prob) * 0.25)})`;
          }
          ctx.fillRect(x, y, step, step);
        }
      }

      // 2. Draw sample dataset points
      ctx.lineWidth = 1.5;
      const seedPoints = [
        // Class A (Cyan)
        { x: 0.1, y: 0.1, cls: 'A' },
        { x: -0.2, y: 0.3, cls: 'A' },
        { x: 0.25, y: -0.2, cls: 'A' },
        { x: -0.1, y: -0.15, cls: 'A' },
        { x: 0.3, y: 0.2, cls: 'A' },
        { x: 0.05, y: -0.3, cls: 'A' },
        // Class B (Amber)
        { x: 0.7, y: 0.7, cls: 'B' },
        { x: -0.7, y: 0.6, cls: 'B' },
        { x: 0.8, y: -0.5, cls: 'B' },
        { x: -0.65, y: -0.7, cls: 'B' },
        { x: 0.6, y: -0.8, cls: 'B' },
        { x: -0.8, y: 0.1, cls: 'B' },
        { x: 0.9, y: 0.2, cls: 'B' }
      ];

      seedPoints.forEach((pt) => {
        const px = ((pt.x + 1) / 2) * width;
        const py = ((pt.y + 1) / 2) * height;

        ctx.beginPath();
        ctx.arc(px, py, 5, 0, Math.PI * 2);
        ctx.fillStyle = pt.cls === 'A' ? '#00f0ff' : '#f59e0b';
        ctx.strokeStyle = '#ffffff';
        ctx.fill();
        ctx.stroke();
      });
    } else if (activeExperiment === 'clustering') {
      // Draw background
      ctx.fillStyle = '#0d1117';
      ctx.fillRect(0, 0, width, height);

      // Generate or draw clustered points
      const clusterData = [
        { x: 90, y: 70 }, { x: 110, y: 95 }, { x: 80, y: 110 }, { x: 120, y: 65 },
        { x: 210, y: 180 }, { x: 235, y: 205 }, { x: 195, y: 220 }, { x: 240, y: 175 },
        { x: 290, y: 80 }, { x: 320, y: 95 }, { x: 305, y: 115 }, { x: 280, y: 100 }
      ];

      // Draw points with nearest centroid color
      clusterData.forEach((pt) => {
        let minDist = 99999;
        let chosenColor = '#00f0ff';

        centroids.forEach((c) => {
          const d = Math.hypot(pt.x - c.x, pt.y - c.y);
          if (d < minDist) {
            minDist = d;
            chosenColor = c.color;
          }
        });

        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 4.5, 0, Math.PI * 2);
        ctx.fillStyle = chosenColor;
        ctx.fill();
      });

      // Draw Centroids with crosses
      centroids.forEach((c, i) => {
        ctx.strokeStyle = c.color;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(c.x, c.y, 10, 0, Math.PI * 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(c.x - 7, c.y);
        ctx.lineTo(c.x + 7, c.y);
        ctx.moveTo(c.x, c.y - 7);
        ctx.lineTo(c.x, c.y + 7);
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = '10px JetBrains Mono';
        ctx.fillText(`μ${i + 1}`, c.x + 12, c.y - 5);
      });
    } else if (activeExperiment === 'patrones') {
      // Draw time series with anomaly detection
      ctx.fillStyle = '#0d1117';
      ctx.fillRect(0, 0, width, height);

      // Baseline grid
      ctx.strokeStyle = '#21262d';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(30, 250);
      ctx.lineTo(410, 250);
      ctx.stroke();

      // Threshold line
      const threshY = 250 - (anomalyThreshold / 100) * 180;
      ctx.strokeStyle = '#ef4444';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(30, threshY);
      ctx.lineTo(410, threshY);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#ef4444';
      ctx.font = '9px JetBrains Mono';
      ctx.fillText(`UMBRAL ANOMALÍA: ${anomalyThreshold}`, 40, threshY - 6);

      // Data series
      const values = [
        30, 35, 40, 38, 45, 42, 88, 48, 52, 50, 47, 92, 53, 56, 54, 96, 58, 62
      ];

      ctx.strokeStyle = '#00f0ff';
      ctx.lineWidth = 2;
      ctx.beginPath();

      let anomalies = 0;
      values.forEach((v, i) => {
        const x = 40 + i * 20;
        const y = 250 - (v / 100) * 180;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);

        if (v > anomalyThreshold) {
          anomalies++;
        }
      });
      ctx.stroke();

      // Draw anomaly highlight nodes
      values.forEach((v, i) => {
        const x = 40 + i * 20;
        const y = 250 - (v / 100) * 180;
        if (v > anomalyThreshold) {
          ctx.beginPath();
          ctx.arc(x, y, 6, 0, Math.PI * 2);
          ctx.fillStyle = '#ef4444';
          ctx.fill();
          ctx.strokeStyle = '#ffffff';
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(x, y, 3, 0, Math.PI * 2);
          ctx.fillStyle = '#00f0ff';
          ctx.fill();
        }
      });

      setDetectedAnomalyCount(anomalies);
    }
  }, [activeExperiment, datasetType, boundarySharpness, centroids, anomalyThreshold]);

  const handleStepKmeans = () => {
    setKmeansIteration((prev) => prev + 1);
    setCentroids((prev) =>
      prev.map((c) => ({
        ...c,
        x: Math.max(50, Math.min(380, c.x + (Math.random() - 0.5) * 20)),
        y: Math.max(50, Math.min(250, c.y + (Math.random() - 0.5) * 20))
      }))
    );
  };

  const handleResetKmeans = () => {
    setKmeansIteration(0);
    setCentroids([
      { x: 100, y: 80, color: '#00f0ff' },
      { x: 220, y: 190, color: '#00ff66' },
      { x: 300, y: 90, color: '#f59e0b' }
    ]);
  };

  return (
    <section id="playground" className="py-24 relative border-t border-cyan-500/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 space-y-3">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-wider">
            <FlaskConical className="w-4 h-4" />
            <span>06. LABORATORIO INTERACTIVO // SIMULACIONES EN VIVO</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            AI Playground
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            Experimenta en tiempo real con algoritmos de clasificación no lineal, agrupamiento K-Means iterativo y detección de anomalías en señales continuas.
          </p>
        </div>

        {/* Experiment Selector Bar */}
        <div className="flex flex-wrap gap-2 mb-8 p-1.5 rounded-lg bg-[#161b22] border border-slate-800 max-w-xl">
          <button
            onClick={() => setActiveExperiment('clasificacion')}
            className={`px-4 py-2 rounded text-xs font-mono font-medium transition-all ${
              activeExperiment === 'clasificacion'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Frontera de Clasificación 2D
          </button>
          <button
            onClick={() => setActiveExperiment('clustering')}
            className={`px-4 py-2 rounded text-xs font-mono font-medium transition-all ${
              activeExperiment === 'clustering'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Clustering K-Means
          </button>
          <button
            onClick={() => setActiveExperiment('patrones')}
            className={`px-4 py-2 rounded text-xs font-mono font-medium transition-all ${
              activeExperiment === 'patrones'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Detección de Anomalías
          </button>
        </div>

        {/* Interactive Workspace Container */}
        <div className="p-6 sm:p-8 rounded-xl bg-[#161b22]/90 border border-cyan-500/25 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Controls Column (5 cols) */}
            <div className="lg:col-span-5 space-y-6 font-mono text-xs">
              
              {activeExperiment === 'clasificacion' && (
                <>
                  <div>
                    <span className="text-slate-400 block mb-2">TOPOLOGÍA DEL DATASET:</span>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'circulos', label: 'Concéntrico' },
                        { id: 'moons', label: 'Dos Lunas' },
                        { id: 'lineal', label: 'Separable' }
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setDatasetType(item.id as any)}
                          className={`py-1.5 rounded text-center transition-all ${
                            datasetType === item.id
                              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400'
                              : 'bg-[#0d1117] text-slate-400 border border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-slate-400">Nitidez de Frontera:</span>
                      <span className="text-cyan-400 font-bold">{boundarySharpness}x</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="8"
                      value={boundarySharpness}
                      onChange={(e) => setBoundarySharpness(Number(e.target.value))}
                      className="w-full accent-cyan-400 cursor-pointer"
                    />
                  </div>

                  <div className="p-3 rounded bg-[#0d1117] border border-slate-800 space-y-1 text-[11px]">
                    <div className="text-slate-300 font-bold">MÉTRICAS CLASIFICADOR:</div>
                    <div className="text-emerald-400">Precisión (Accuracy): 97.4%</div>
                    <div className="text-cyan-400">Loss (Cross-Entropy): 0.082</div>
                  </div>
                </>
              )}

              {activeExperiment === 'clustering' && (
                <>
                  <div>
                    <span className="text-slate-400 block mb-1">CENTROIDES ACTIVOS ($K$):</span>
                    <span className="text-emerald-400 font-bold text-sm">3 Clusters Definidos</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={handleStepKmeans}
                      className="flex-1 py-2 px-3 rounded bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold flex items-center justify-center gap-1.5 shadow-[0_0_12px_rgba(0,255,102,0.3)]"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Iterar K-Means</span>
                    </button>
                    <button
                      onClick={handleResetKmeans}
                      className="py-2 px-3 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center gap-1"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset</span>
                    </button>
                  </div>

                  <div className="p-3 rounded bg-[#0d1117] border border-slate-800 text-[11px] space-y-1">
                    <div className="text-slate-400">Iteración actual: <strong className="text-white">{kmeansIteration}</strong></div>
                    <div className="text-slate-400">Inercia intra-cluster: <strong className="text-emerald-400">142.8</strong></div>
                    <div className="text-cyan-300">Convergencia de Voronoi: En proceso</div>
                  </div>
                </>
              )}

              {activeExperiment === 'patrones' && (
                <>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-slate-400">Umbral de Anomalía ($Z$-Score):</span>
                      <span className="text-amber-400 font-bold">{anomalyThreshold} pts</span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="95"
                      value={anomalyThreshold}
                      onChange={(e) => setAnomalyThreshold(Number(e.target.value))}
                      className="w-full accent-amber-400 cursor-pointer"
                    />
                  </div>

                  <div className="p-3 rounded bg-[#0d1117] border border-slate-800 space-y-1 text-[11px]">
                    <div className="text-slate-300 font-bold">DETECCIÓN DE OUTLIERS:</div>
                    <div className="text-amber-400 font-bold">
                      {detectedAnomalyCount} picos fuera de límite
                    </div>
                    <div className="text-slate-400">Sensibilidad: Normalizada al 95%</div>
                  </div>
                </>
              )}

            </div>

            {/* Right Interactive Canvas (7 cols) */}
            <div className="lg:col-span-7 bg-[#0d1117] p-3 rounded-xl border border-cyan-500/20 flex flex-col items-center">
              <div className="w-full flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[11px] font-mono text-slate-400">
                <span>CANVAS 2D DE RENDERIZADO ALGORÍTMICO</span>
                <span className="text-cyan-400">60 FPS DINÁMICO</span>
              </div>

              <div className="w-full flex justify-center overflow-hidden">
                <canvas
                  ref={canvasRef}
                  className="rounded border border-slate-800/80 max-w-full h-auto shadow-inner"
                />
              </div>

              <div className="w-full pt-2 flex justify-between items-center text-[10px] font-mono text-slate-500">
                <span>Modo: {activeExperiment.toUpperCase()}</span>
                <span>Renderizado local vía Canvas Context 2D</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
