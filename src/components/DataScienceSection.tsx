import React, { useState } from 'react';
import {
  Database,
  Filter,
  BarChart3,
  Calculator,
  PieChart,
  Binary,
  CheckCheck,
  ChevronRight,
  RefreshCw,
  SlidersHorizontal,
  Table
} from 'lucide-react';

export const DataScienceSection: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number>(0);
  const [cleanedMode, setCleanedMode] = useState<boolean>(false);
  const [selectedCorrelationPair, setSelectedCorrelationPair] = useState<{ x: string; y: string; val: number }>({
    x: 'Latencia',
    y: 'Precisión',
    val: -0.84
  });

  const stages = [
    {
      step: '01',
      title: 'Recolección de Datos',
      icon: Database,
      short: 'Datos',
      description: 'Ingesta de flujos continuos, bases de datos SQL/NoSQL, APIs REST, telemetría IoT y archivos parquet/CSV masivos.',
      metric: '4.2 TB/día ingeridos',
      action: 'Extracción & Consolidación'
    },
    {
      step: '02',
      title: 'Limpieza y Transformación',
      icon: Filter,
      short: 'Limpieza',
      description: 'Detección de valores nulos (imputación KNN/media), remoción de duplicados, normalización MinMax/Z-score y encoding categórico.',
      metric: '99.8% consistencia lograda',
      action: 'Pipeline ETL Automatizado'
    },
    {
      step: '03',
      title: 'Análisis Exploratorio (EDA)',
      icon: BarChart3,
      short: 'Exploración',
      description: 'Inspección de distribuciones univariadas, detección de valores atípicos (outliers con IQR/Z-score) y matrices de correlación Pearson/Spearman.',
      metric: '38 variables analizadas',
      action: 'Perfilado Estadístico'
    },
    {
      step: '04',
      title: 'Estadística e Inferencia',
      icon: Calculator,
      short: 'Análisis',
      description: 'Pruebas de hipótesis (p-value, ANOVA, t-Student), intervalos de confianza bayesianos y modelado probabilístico de distribuciones.',
      metric: 'p < 0.001 (Significativo)',
      action: 'Validación Rigurosa'
    },
    {
      step: '05',
      title: 'Modelado Predictivo',
      icon: Binary,
      short: 'Modelo',
      description: 'Entrenamiento de algoritmos supervisados y no supervisados, optimización de hiperparámetros (Optuna, GridSearch) y validación cruzada (K-Fold).',
      metric: 'F1-Score: 0.964',
      action: 'Cross-Validation 5-Fold'
    },
    {
      step: '06',
      title: 'Visualización Avanzada',
      icon: PieChart,
      short: 'Visualización',
      description: 'Comunicación visual de patrones mediante dashboards interactivos, gráficos de dispersión multidimensionales y mapas de calor temáticos.',
      metric: '60 FPS render en Canvas/SVG',
      action: 'Dashboards Ejecutivos'
    },
    {
      step: '07',
      title: 'Decisión & Explicabilidad',
      icon: CheckCheck,
      short: 'Decisión',
      description: 'Interpretación de modelos con valores SHAP y LIME para sustentar decisiones estratégicas de negocio con trazabilidad algorítmica completa.',
      metric: '100% explicabilidad auditable',
      action: 'Implementación en Producción'
    }
  ];

  // Correlation matrix data
  const correlationFeatures = ['Tiempo', 'Latencia', 'Throughput', 'Precisión', 'Uso GPU'];
  const correlationMatrix = [
    [1.00, 0.42, 0.81, 0.75, 0.65],
    [0.42, 1.00, -0.68, -0.84, 0.35],
    [0.81, -0.68, 1.00, 0.89, 0.72],
    [0.75, -0.84, 0.89, 1.00, 0.58],
    [0.65, 0.35, 0.72, 0.58, 1.00]
  ];

  // Raw vs Cleaned Dataset sample
  const rawDataPoints = [12, 15, 18, 95, 21, 19, 23, -40, 24, 27, 25, 110, 28, 29];
  const cleanedDataPoints = [12, 15, 18, 22, 21, 19, 23, 20, 24, 27, 25, 26, 28, 29];

  return (
    <section id="data-science" className="py-24 relative border-t border-cyan-500/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs tracking-wider">
            <Database className="w-4 h-4" />
            <span>03. EL CICLO COMPLETO DE LOS DATOS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Ciencia de Datos (Data Science)
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            Metodología científica integral para transformar datos crudos y heterogéneos en valor predictivo, decisiones analíticas reproducibles y explicabilidad algorítmica.
          </p>
        </div>

        {/* The 7-stage Lifecycle Flow Bar */}
        <div className="mb-14 p-4 rounded-xl bg-[#161b22]/90 border border-cyan-500/25 shadow-xl">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800 text-xs font-mono">
            <span className="text-cyan-400 font-bold">PIPELINE CANÓNICO DE DATA SCIENCE</span>
            <span className="text-slate-400 hidden sm:inline">HAZ CLIC EN CADA FASE PARA AUDITAR</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {stages.map((stage, idx) => {
              const Icon = stage.icon;
              const isActive = activeStage === idx;
              return (
                <button
                  key={stage.step}
                  onClick={() => setActiveStage(idx)}
                  className={`p-3 rounded-lg text-left transition-all font-mono ${
                    isActive
                      ? 'bg-cyan-500/20 border border-cyan-400 text-cyan-200 shadow-[0_0_12px_rgba(0,240,255,0.25)]'
                      : 'bg-[#0d1117] border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] text-slate-500 font-bold">{stage.step}</span>
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                  </div>
                  <div className="text-xs font-bold text-white truncate">{stage.short}</div>
                </button>
              );
            })}
          </div>

          {/* Active Stage Deep Details */}
          <div className="mt-5 p-5 rounded-lg bg-[#0d1117] border border-cyan-500/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  FASE {stages[activeStage].step} // {stages[activeStage].action}
                </span>
                <h3 className="text-base font-bold text-white font-mono">
                  {stages[activeStage].title}
                </h3>
              </div>
              <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
                {stages[activeStage].description}
              </p>
            </div>
            <div className="shrink-0 text-right font-mono bg-[#161b22] px-4 py-2 rounded border border-slate-800">
              <div className="text-[10px] text-slate-400">MÉTRICA CLAVE</div>
              <div className="text-sm font-bold text-cyan-400">{stages[activeStage].metric}</div>
            </div>
          </div>
        </div>

        {/* Dynamic Interactive Charts: Heatmap & Data Cleaning Simulator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Heatmap Matrix (6 cols) */}
          <div className="lg:col-span-6 p-6 rounded-xl bg-[#161b22]/90 border border-cyan-500/20">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs">
                <Table className="w-4 h-4" />
                <span>MATRIZ DE CORRELACIÓN MULTIVARIADA (PEARSON)</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400">MAPA DE CALOR</span>
            </div>

            <p className="text-xs text-slate-400 mb-4 font-mono">
              Selecciona una celda para inspeccionar el grado de correlación lineal entre variables del pipeline:
            </p>

            {/* Heatmap Grid */}
            <div className="overflow-x-auto pb-2">
              <div className="inline-block min-w-full">
                <div className="grid grid-cols-6 gap-1 text-[11px] font-mono text-center">
                  <div className="p-1 text-slate-500">Var</div>
                  {correlationFeatures.map(f => (
                    <div key={f} className="p-1 text-slate-400 font-semibold truncate" title={f}>
                      {f.slice(0, 4)}
                    </div>
                  ))}

                  {correlationMatrix.map((row, rIdx) => (
                    <React.Fragment key={rIdx}>
                      <div className="p-1.5 text-left text-slate-400 font-semibold truncate" title={correlationFeatures[rIdx]}>
                        {correlationFeatures[rIdx].slice(0, 4)}
                      </div>
                      {row.map((val, cIdx) => {
                        const isPositive = val >= 0;
                        const abs = Math.abs(val);
                        // Color intensity based on correlation
                        const bg = isPositive
                          ? `rgba(0, 255, 102, ${abs * 0.4})`
                          : `rgba(239, 68, 68, ${abs * 0.45})`;
                        const text = isPositive ? 'text-emerald-200' : 'text-rose-200';

                        return (
                          <button
                            key={cIdx}
                            onClick={() =>
                              setSelectedCorrelationPair({
                                x: correlationFeatures[rIdx],
                                y: correlationFeatures[cIdx],
                                val
                              })
                            }
                            style={{ backgroundColor: bg }}
                            className={`p-2 rounded font-mono font-bold transition-transform hover:scale-105 border border-white/5 hover:border-cyan-400 ${text}`}
                          >
                            {val.toFixed(2)}
                          </button>
                        );
                      })}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            {/* Selected Correlation Inspector */}
            <div className="mt-4 p-3 rounded bg-[#0d1117] border border-slate-800 text-xs font-mono flex items-center justify-between">
              <span className="text-slate-400">
                Par: <strong className="text-cyan-300">{selectedCorrelationPair.x}</strong> vs{' '}
                <strong className="text-cyan-300">{selectedCorrelationPair.y}</strong>
              </span>
              <span className="font-bold text-white">
                $r = {selectedCorrelationPair.val.toFixed(2)}${' '}
                <span className="text-[10px] text-slate-400 font-normal">
                  ({Math.abs(selectedCorrelationPair.val) > 0.7 ? 'Fuerte' : 'Moderada'})
                </span>
              </span>
            </div>
          </div>

          {/* Interactive Data Cleaning / Outlier Imputation (6 cols) */}
          <div className="lg:col-span-6 p-6 rounded-xl bg-[#161b22]/90 border border-emerald-500/20 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
                <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs">
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>SIMULADOR DE LIMPIEZA & FILTRADO DE OUTLIERS</span>
                </div>
                <button
                  onClick={() => setCleanedMode(!cleanedMode)}
                  className={`px-3 py-1 rounded text-xs font-mono font-semibold transition-all ${
                    cleanedMode
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-400'
                  }`}
                >
                  {cleanedMode ? 'DATOS LIMPIOS (ACTIVADO)' : 'DATOS CRUDOS (CON OUTLIERS)'}
                </button>
              </div>

              <p className="text-xs text-slate-400 mb-4 font-mono">
                Observa cómo los valores extremos espurios (e.g. 95, -40, 110) distorsionan la distribución muestral hasta aplicar imputación por mediana robusta:
              </p>

              {/* Dynamic Histogram/Bar Visualization */}
              <div className="bg-[#0d1117] p-4 rounded-lg border border-slate-800 h-48 flex items-end justify-between gap-1">
                {(cleanedMode ? cleanedDataPoints : rawDataPoints).map((val, idx) => {
                  const isOutlier = !cleanedMode && (val > 50 || val < 0);
                  const barHeight = Math.min(100, Math.max(10, ((val + 50) / 160) * 100));

                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-1 group">
                      <div
                        style={{ height: `${barHeight}%` }}
                        className={`w-full rounded-t transition-all duration-500 ${
                          isOutlier
                            ? 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]'
                            : 'bg-emerald-400/80 group-hover:bg-cyan-400'
                        }`}
                      />
                      <span className="text-[9px] font-mono text-slate-500 group-hover:text-slate-200">
                        {val}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 p-3 rounded bg-[#0d1117] border border-slate-800 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">ESTADO DEL DATASET:</span>
              <span className={cleanedMode ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                {cleanedMode ? '✓ Normalizado (Media: 22.4, $\sigma$: 4.1)' : '⚠ 3 Outliers severos detectados'}
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
