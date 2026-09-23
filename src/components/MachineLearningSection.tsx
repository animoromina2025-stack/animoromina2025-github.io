import React, { useState, useMemo } from 'react';
import {
  GitBranch,
  Sliders,
  Play,
  RotateCcw,
  CheckCircle2,
  TrendingUp,
  Boxes,
  Compass,
  Award,
  Zap
} from 'lucide-react';

export const MachineLearningSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'supervisado' | 'no-supervisado' | 'refuerzo'>('supervisado');

  // Interactive Regression & Prediction Simulator State
  const [learningRate, setLearningRate] = useState<number>(0.05);
  const [noiseLevel, setNoiseLevel] = useState<number>(15);
  const [inputFeatureX, setInputFeatureX] = useState<number>(65);
  const [polynomialDegree, setPolynomialDegree] = useState<number>(1);

  // Reinforcement Learning Interactive Demo State
  const [rlStep, setRlStep] = useState<number>(0);
  const [rlScore, setRlScore] = useState<number>(120);
  const [agentState, setAgentState] = useState<{
    position: number;
    action: string;
    reward: number;
    qValue: number;
  }>({
    position: 2,
    action: 'AVANZAR_ESTADO',
    reward: 10,
    qValue: 0.84
  });

  // Calculate synthetic data points and regression prediction
  const { points, predictedY, mse, r2 } = useMemo(() => {
    const pts: Array<{ x: number; y: number }> = [];
    const seed = [
      { x: 10, y: 22 },
      { x: 20, y: 31 },
      { x: 30, y: 44 },
      { x: 40, y: 49 },
      { x: 50, y: 62 },
      { x: 60, y: 73 },
      { x: 70, y: 81 },
      { x: 80, y: 92 },
      { x: 90, y: 98 }
    ];

    // Slope calculation with learningRate influence simulation
    const slope = 0.95 * (1 + (learningRate - 0.05) * 2);
    const intercept = 12;

    seed.forEach(p => {
      // Add simulated noise
      const noisyY = p.y + ((Math.sin(p.x * 0.1) * noiseLevel) / 3);
      pts.push({ x: p.x, y: Math.max(5, Math.min(110, noisyY)) });
    });

    // Prediction for inputFeatureX
    let pred = 0;
    if (polynomialDegree === 1) {
      pred = slope * inputFeatureX + intercept;
    } else {
      // Non-linear polynomial curve simulation
      pred = slope * inputFeatureX + 0.005 * Math.pow(inputFeatureX, 1.6) + intercept;
    }

    const calculatedMse = (1.2 + (noiseLevel * 0.15) / (learningRate * 20)).toFixed(2);
    const calculatedR2 = (0.99 - (noiseLevel * 0.004)).toFixed(3);

    return {
      points: pts,
      predictedY: Math.round(pred),
      mse: calculatedMse,
      r2: calculatedR2
    };
  }, [learningRate, noiseLevel, inputFeatureX, polynomialDegree]);

  const handleRlNextStep = () => {
    const actions = ['ACCELERAR_INFERENCIA', 'AJUSTAR_PESOS', 'EXPLORAR_ENTORNO', 'EXPLOTAR_POLÍTICA'];
    const selectedAction = actions[Math.floor(Math.random() * actions.length)];
    const rewardDelta = Math.floor(Math.random() * 25) + 5;
    const newPos = (agentState.position + 1) % 5;
    const newQ = +(agentState.qValue + 0.02 * (1 - agentState.qValue)).toFixed(3);

    setRlStep(prev => prev + 1);
    setRlScore(prev => prev + rewardDelta);
    setAgentState({
      position: newPos,
      action: selectedAction,
      reward: rewardDelta,
      qValue: Math.min(0.99, newQ)
    });
  };

  const handleResetRl = () => {
    setRlStep(0);
    setRlScore(120);
    setAgentState({
      position: 0,
      action: 'INICIALIZAR_AGENTE',
      reward: 0,
      qValue: 0.5
    });
  };

  return (
    <section id="machine-learning" className="py-24 relative border-t border-cyan-500/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="max-w-3xl mb-14 space-y-3">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-wider">
            <TrendingUp className="w-4 h-4" />
            <span>02. PARADIGMAS DE APRENDIZAJE COMPUTACIONAL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Machine Learning (Aprendizaje Automático)
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            Algoritmos que construyen modelos matemáticos basados en datos de entrenamiento para realizar predicciones o decisiones sin intervención manual explícita.
          </p>
        </div>

        {/* 3 Paradigms Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 p-1.5 rounded-lg bg-[#161b22] border border-slate-800 max-w-2xl">
          <button
            onClick={() => setActiveTab('supervisado')}
            className={`px-4 py-2 rounded text-xs font-mono font-medium transition-all ${
              activeTab === 'supervisado'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            01. Aprendizaje Supervisado
          </button>
          <button
            onClick={() => setActiveTab('no-supervisado')}
            className={`px-4 py-2 rounded text-xs font-mono font-medium transition-all ${
              activeTab === 'no-supervisado'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            02. Aprendizaje No Supervisado
          </button>
          <button
            onClick={() => setActiveTab('refuerzo')}
            className={`px-4 py-2 rounded text-xs font-mono font-medium transition-all ${
              activeTab === 'refuerzo'
                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            03. Aprendizaje por Refuerzo (RL)
          </button>
        </div>

        {/* Tab Content 1: Supervisado */}
        {activeTab === 'supervisado' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            <div className="p-5 rounded-xl bg-[#161b22]/80 border border-cyan-500/20 space-y-3">
              <div className="w-9 h-9 rounded bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-mono font-bold text-xs">
                REG
              </div>
              <h3 className="text-base font-semibold text-white">Regresión</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Predice valores numéricos continuos a partir de variables de entrada. Modela funciones analíticas continuas ($y = f(x) + \epsilon$).
              </p>
              <div className="pt-2 text-[11px] font-mono text-cyan-300">
                Ejemplos: Pronóstico de demanda de energía, valoración de activos, temperatura climática.
              </div>
            </div>

            <div className="p-5 rounded-xl bg-[#161b22]/80 border border-cyan-500/20 space-y-3">
              <div className="w-9 h-9 rounded bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-mono font-bold text-xs">
                CLA
              </div>
              <h3 className="text-base font-semibold text-white">Clasificación</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Asigna datos a categorías discretas calculando probabilidades a posteriori ($P(C|X)$) mediante fronteras de separación en el espacio vectorial.
              </p>
              <div className="pt-2 text-[11px] font-mono text-emerald-300">
                Ejemplos: Diagnóstico médico binario, detección de spam, clasificación multiclase de imágenes.
              </div>
            </div>

            <div className="p-5 rounded-xl bg-[#161b22]/80 border border-cyan-500/20 space-y-3">
              <div className="w-9 h-9 rounded bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 font-mono font-bold text-xs">
                PRE
              </div>
              <h3 className="text-base font-semibold text-white">Predicción de Series Temporales</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Modela dependencias temporales y estacionalidad mediante autorregresión, transformers y redes recurrentes para proyectar estados futuros.
              </p>
              <div className="pt-2 text-[11px] font-mono text-blue-300">
                Ejemplos: Tendencias macroeconómicas, tráfico de red, predicción de fallo en turbinas.
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 2: No Supervisado */}
        {activeTab === 'no-supervisado' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            <div className="p-5 rounded-xl bg-[#161b22]/80 border border-emerald-500/20 space-y-3">
              <div className="w-9 h-9 rounded bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-mono font-bold text-xs">
                CLU
              </div>
              <h3 className="text-base font-semibold text-white">Clustering (Agrupamiento)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Identifica agrupaciones naturales y centros de densidad en datos no etiquetados (K-Means, DBSCAN, Hierarchical Clustering).
              </p>
              <div className="pt-2 text-[11px] font-mono text-emerald-300">
                Ejemplos: Segmentación de clientes, agrupamiento de perfiles de consumo, genómica comparativa.
              </div>
            </div>

            <div className="p-5 rounded-xl bg-[#161b22]/80 border border-emerald-500/20 space-y-3">
              <div className="w-9 h-9 rounded bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-mono font-bold text-xs">
                PCA
              </div>
              <h3 className="text-base font-semibold text-white">Reducción de Dimensionalidad</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Comprime espacios vectoriales de alta dimensionalidad preservando la máxima varianza o la topología no lineal (PCA, t-SNE, UMAP).
              </p>
              <div className="pt-2 text-[11px] font-mono text-cyan-300">
                Ejemplos: Visualización 2D/3D de embeddings semánticos, preprocesamiento anti-maldición de dimensionalidad.
              </div>
            </div>

            <div className="p-5 rounded-xl bg-[#161b22]/80 border border-emerald-500/20 space-y-3">
              <div className="w-9 h-9 rounded bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-mono font-bold text-xs">
                PAT
              </div>
              <h3 className="text-base font-semibold text-white">Detección de Patrones y Anomalías</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Detecta instancias que difieren significativamente de la distribución normal (Isolation Forests, One-Class SVM, Autoencoders).
              </p>
              <div className="pt-2 text-[11px] font-mono text-amber-300">
                Ejemplos: Fraude bancario en tiempo real, intrusiones en servidores, fallas mecánicas tempranas.
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 3: Aprendizaje por Refuerzo */}
        {activeTab === 'refuerzo' && (
          <div className="p-6 rounded-xl bg-[#161b22]/90 border border-blue-500/30 mb-12 shadow-xl">
            <div className="text-xs font-mono text-blue-400 mb-2">
              CICLO CANÓNICO DE MARKOV (MDP)
            </div>
            <h3 className="text-lg font-bold text-white mb-4">
              Agente → Acción → Entorno → Recompensa
            </h3>

            {/* Visual MDP Diagram */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center my-6">
              <div className="p-4 rounded-lg bg-[#0d1117] border border-cyan-500/30">
                <div className="text-xs font-mono text-slate-400">1. ENTIDAD</div>
                <div className="text-base font-bold text-cyan-300 font-mono mt-1">AGENTE</div>
                <div className="text-[10px] text-slate-400 mt-1">Evalúa política $\pi(a|s)$</div>
              </div>

              <div className="p-4 rounded-lg bg-[#0d1117] border border-emerald-500/30">
                <div className="text-xs font-mono text-slate-400">2. OPERACIÓN</div>
                <div className="text-base font-bold text-emerald-300 font-mono mt-1">ACCIÓN ($a$)</div>
                <div className="text-[10px] text-slate-400 mt-1">Afecta el estado dinámico</div>
              </div>

              <div className="p-4 rounded-lg bg-[#0d1117] border border-blue-500/30">
                <div className="text-xs font-mono text-slate-400">3. SISTEMA</div>
                <div className="text-base font-bold text-blue-300 font-mono mt-1">ENTORNO ($S$)</div>
                <div className="text-[10px] text-slate-400 mt-1">Transición a nuevo estado $s'$</div>
              </div>

              <div className="p-4 rounded-lg bg-[#0d1117] border border-amber-500/30">
                <div className="text-xs font-mono text-slate-400">4. FEEDBACK</div>
                <div className="text-base font-bold text-amber-300 font-mono mt-1">RECOMPENSA ($R$)</div>
                <div className="text-[10px] text-slate-400 mt-1">Refuerzo escalar para $Q$</div>
              </div>
            </div>

            {/* Interactive RL Step Simulator */}
            <div className="p-4 rounded-lg bg-[#0d1117] border border-slate-800 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-slate-400">PASO DE EPISODIO:</span>
                  <span className="font-mono text-cyan-400 font-bold">#{rlStep}</span>
                  <span className="text-xs font-mono text-slate-400 ml-4">SCORE ACUMULADO:</span>
                  <span className="font-mono text-emerald-400 font-bold">+{rlScore} pts</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleResetRl}
                    className="flex items-center gap-1 px-3 py-1 text-xs font-mono text-slate-400 hover:text-white bg-slate-800 rounded"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </button>
                  <button
                    onClick={handleRlNextStep}
                    className="flex items-center gap-1 px-4 py-1 text-xs font-mono text-slate-950 font-semibold bg-emerald-400 hover:bg-emerald-300 rounded shadow-[0_0_12px_rgba(0,255,102,0.3)]"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Ejecutar Paso RL</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                <div className="p-2.5 rounded bg-[#161b22] border border-slate-800">
                  <span className="text-slate-400 block mb-1">ÚLTIMA ACCIÓN EJECUTADA:</span>
                  <span className="text-emerald-300">{agentState.action}</span>
                </div>
                <div className="p-2.5 rounded bg-[#161b22] border border-slate-800">
                  <span className="text-slate-400 block mb-1">RECOMPENSA OBTENIDA ($R$):</span>
                  <span className="text-amber-300 font-bold">+{agentState.reward}</span>
                </div>
                <div className="p-2.5 rounded bg-[#161b22] border border-slate-800">
                  <span className="text-slate-400 block mb-1">VALOR Q CONVERGIDO:</span>
                  <span className="text-cyan-300 font-bold">{agentState.qValue}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Interactive ML Parameter & Prediction Simulator */}
        <div className="p-6 sm:p-8 rounded-xl bg-[#161b22]/90 border border-cyan-500/25 shadow-xl">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs">
              <Sliders className="w-4 h-4" />
              <span>LABORATORIO INTERACTIVO // SIMULACIÓN DE PREDICCIÓN Y AJUSTE</span>
            </div>
            <span className="text-[11px] font-mono text-emerald-400">OPTIMIZACIÓN EN TIEMPO REAL</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Controls (5 cols) */}
            <div className="lg:col-span-5 space-y-5">
              
              {/* Slider 1: Feature X */}
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-slate-300">Variable Entrada ($X$):</span>
                  <span className="text-cyan-400 font-bold">{inputFeatureX} unidades</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="95"
                  value={inputFeatureX}
                  onChange={(e) => setInputFeatureX(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              {/* Slider 2: Learning Rate */}
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-slate-300">Tasa de Aprendizaje ($\alpha$):</span>
                  <span className="text-emerald-400 font-bold">{learningRate}</span>
                </div>
                <input
                  type="range"
                  min="0.01"
                  max="0.1"
                  step="0.01"
                  value={learningRate}
                  onChange={(e) => setLearningRate(Number(e.target.value))}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
              </div>

              {/* Slider 3: Noise Level */}
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-slate-300">Varianza de Ruido ($\sigma$):</span>
                  <span className="text-amber-400 font-bold">{noiseLevel}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="35"
                  value={noiseLevel}
                  onChange={(e) => setNoiseLevel(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
              </div>

              {/* Model Degree Selector */}
              <div>
                <span className="text-xs font-mono text-slate-300 block mb-2">
                  Grado del Modelo:
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPolynomialDegree(1)}
                    className={`flex-1 py-1.5 rounded text-xs font-mono transition-all ${
                      polynomialDegree === 1
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                        : 'bg-[#0d1117] text-slate-400 border border-slate-800'
                    }`}
                  >
                    Regresión Lineal ($d=1$)
                  </button>
                  <button
                    onClick={() => setPolynomialDegree(2)}
                    className={`flex-1 py-1.5 rounded text-xs font-mono transition-all ${
                      polynomialDegree === 2
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                        : 'bg-[#0d1117] text-slate-400 border border-slate-800'
                    }`}
                  >
                    Polinomial ($d=2$)
                  </button>
                </div>
              </div>

              {/* Live Metric Stats */}
              <div className="grid grid-cols-3 gap-2 pt-2 text-center">
                <div className="p-2 rounded bg-[#0d1117] border border-slate-800">
                  <div className="text-[10px] font-mono text-slate-400">PREDICCIÓN ŷ (Y_HAT)</div>
                  <div className="text-base font-mono font-bold text-cyan-400">{predictedY}</div>
                </div>
                <div className="p-2 rounded bg-[#0d1117] border border-slate-800">
                  <div className="text-[10px] font-mono text-slate-400">ERROR (MSE)</div>
                  <div className="text-base font-mono font-bold text-amber-400">{mse}</div>
                </div>
                <div className="p-2 rounded bg-[#0d1117] border border-slate-800">
                  <div className="text-[10px] font-mono text-slate-400">COEF. $R^2$</div>
                  <div className="text-base font-mono font-bold text-emerald-400">{r2}</div>
                </div>
              </div>

            </div>

            {/* Right Interactive SVG Chart (7 cols) */}
            <div className="lg:col-span-7 bg-[#0d1117] p-4 rounded-xl border border-cyan-500/20 relative">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2">
                <span>PLANO DE DISPERSIÓN ($X \to Y$) & CURVA DE AJUSTE</span>
                <span className="text-cyan-400">PUNTO ESTIMADO MARCADO</span>
              </div>

              <div className="h-64 w-full relative">
                <svg viewBox="0 0 400 240" className="w-full h-full overflow-visible">
                  {/* Grid Lines */}
                  <line x1="40" y1="20" x2="40" y2="200" stroke="#21262d" strokeWidth="1" />
                  <line x1="40" y1="200" x2="380" y2="200" stroke="#21262d" strokeWidth="1" />
                  
                  <line x1="40" y1="140" x2="380" y2="140" stroke="#161b22" strokeDasharray="3 3" />
                  <line x1="40" y1="80" x2="380" y2="80" stroke="#161b22" strokeDasharray="3 3" />
                  <line x1="150" y1="20" x2="150" y2="200" stroke="#161b22" strokeDasharray="3 3" />
                  <line x1="260" y1="20" x2="260" y2="200" stroke="#161b22" strokeDasharray="3 3" />

                  {/* Scatter Points */}
                  {points.map((p, idx) => {
                    const cx = 40 + (p.x / 100) * 330;
                    const cy = 200 - (p.y / 110) * 180;
                    return (
                      <circle
                        key={idx}
                        cx={cx}
                        cy={cy}
                        r="4"
                        fill="#00ff66"
                        opacity="0.8"
                      />
                    );
                  })}

                  {/* Fitted Regression Line or Curve */}
                  {polynomialDegree === 1 ? (
                    <line
                      x1={40 + (5 / 100) * 330}
                      y1={200 - ((0.95 * 5 + 12) / 110) * 180}
                      x2={40 + (95 / 100) * 330}
                      y2={200 - ((0.95 * 95 + 12) / 110) * 180}
                      stroke="#00f0ff"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  ) : (
                    <path
                      d={`M ${40 + (5 / 100) * 330} ${200 - ((0.95 * 5 + 0.005 * Math.pow(5, 1.6) + 12) / 110) * 180} Q ${40 + (50 / 100) * 330} ${200 - ((0.95 * 50 + 0.005 * Math.pow(50, 1.6) + 12) / 110) * 180} ${40 + (95 / 100) * 330} ${200 - ((0.95 * 95 + 0.005 * Math.pow(95, 1.6) + 12) / 110) * 180}`}
                      fill="none"
                      stroke="#00f0ff"
                      strokeWidth="2.5"
                    />
                  )}

                  {/* Current Selected Input Feature X Point */}
                  {(() => {
                    const cx = 40 + (inputFeatureX / 100) * 330;
                    const cy = 200 - (predictedY / 110) * 180;
                    return (
                      <g>
                        <line
                          x1={cx}
                          y1="200"
                          x2={cx}
                          y2={cy}
                          stroke="#00f0ff"
                          strokeDasharray="2 2"
                          strokeWidth="1"
                        />
                        <circle cx={cx} cy={cy} r="6" fill="#00f0ff" className="animate-ping" />
                        <circle cx={cx} cy={cy} r="5" fill="#ffffff" stroke="#00f0ff" strokeWidth="2" />
                      </g>
                    );
                  })()}
                </svg>
              </div>

              <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 mt-2 px-2">
                <span>0 — Variable $X$ Mínima</span>
                <span>100 — Variable $X$ Máxima</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
