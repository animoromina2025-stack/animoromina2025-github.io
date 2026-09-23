import React, { useState } from 'react';
import {
  HeartPulse,
  GraduationCap,
  Coins,
  Factory,
  Sprout,
  Car,
  ShieldCheck,
  Bot,
  Megaphone,
  Atom,
  Briefcase,
  ChevronRight
} from 'lucide-react';

export const ApplicationsSection: React.FC = () => {
  const [filterCategory, setFilterCategory] = useState<string>('todas');
  const [selectedApp, setSelectedApp] = useState<string | null>(null);

  const applications = [
    {
      sector: 'Medicina',
      category: 'salud',
      icon: HeartPulse,
      title: 'Diagnóstico Temprano & Medicina Personalizada',
      desc: 'Modelos de visión convolucional y grafos de conocimiento analizan tomografías, secuencias genómicas y biomarcadores para predecir patologías con meses de anticipación.',
      example: 'Detección de carcinomas en imágenes dermatológicas con sensibilidad superior al 94.5% y simulación de plegamiento de proteínas para síntesis de fármacos contra el cáncer.'
    },
    {
      sector: 'Educación',
      category: 'social',
      icon: GraduationCap,
      title: 'Tutoría Adaptativa Inteligente',
      desc: 'Plataformas que evalúan en tiempo real la curva de aprendizaje de cada estudiante, ajustando el nivel de dificultad, la retroalimentación y el formato de contenido pedagógico.',
      example: 'Sistemas conversacionales que detectan lagunas conceptuales en cálculo diferencial y adaptan la explicación con analogías personalizadas paso a paso.'
    },
    {
      sector: 'Finanzas',
      category: 'negocios',
      icon: Coins,
      title: 'Detección de Fraude & Trading Algorítmico',
      desc: 'Procesamiento de flujos de transacciones en milisegundos para bloquear operaciones anómalas y análisis de sentimiento financiero para optimización de carteras.',
      example: 'Redes de detección de anomalías que bloquean clonación de tarjetas en 18ms con una tasa de falsos positivos inferior al 0.01%.'
    },
    {
      sector: 'Industria & Manufactura',
      category: 'industria',
      icon: Factory,
      title: 'Mantenimiento Predictivo & Gemelos Digitales',
      desc: 'Sensores IoT combinados con modelos de series temporales anticipan desgaste en rodamientos y componentes mecánicos antes de que ocurra una parada no programada.',
      example: 'Reducción del 35% en costos operativos en plantas automotrices mediante alertas vibracionales emitidas 72 horas antes de la falla física.'
    },
    {
      sector: 'Agricultura',
      category: 'industria',
      icon: Sprout,
      title: 'Agricultura de Precisión & Monitoreo Satelital',
      desc: 'Imágenes hiperespectrales satelitales y drones con IA estiman rendimientos de cosecha, detectan estrés hídrico y optimizan el uso de fertilizantes.',
      example: 'Robots agrícolas con visión artificial que pulverizan herbicidas selectivamente solo sobre las malezas, ahorrando hasta un 85% de químicos.'
    },
    {
      sector: 'Transporte & Movilidad',
      category: 'industria',
      icon: Car,
      title: 'Vehículos Autónomos & Optimización de Flotas',
      desc: 'Fusión sensorial (LiDAR, cámaras, radar) junto a redes neuronales de percepción para navegación en entornos urbanos y despacho logístico dinámico.',
      example: 'Taxis autónomos con millones de kilómetros recorridos y algoritmos que reducen en un 22% las emisiones de CO2 al recalcular rutas según el tráfico.'
    },
    {
      sector: 'Ciberseguridad',
      category: 'negocios',
      icon: ShieldCheck,
      title: 'Defensa Autónomo contra Amenazas Zero-Day',
      desc: 'Agentes defensivos que analizan telemetría de red a escala de petabytes para neutralizar ataques antes de que los atacantes completen la exfiltración.',
      example: 'Detección de malware polimórfico en flujos TLS 1.3 cifrados sin necesidad de descifrar la carga útil mediante firmas de comportamiento temporal.'
    },
    {
      sector: 'Robótica',
      category: 'industria',
      icon: Bot,
      title: 'Robótica Colaborativa (Cobots) & Manipulación',
      desc: 'Aprendizaje por imitación y aprendizaje por refuerzo profundo para que brazos robóticos manipulen objetos deformables con destreza milimétrica.',
      example: 'Robots en almacenes logísticos que empaquetan miles de artículos heterogéneos por hora adaptando la fuerza de agarre según la fragilidad.'
    },
    {
      sector: 'Marketing & Comercio',
      category: 'negocios',
      icon: Megaphone,
      title: 'Hiperpersonalización & Análisis Predictivo',
      desc: 'Segmentación continua y motores de recomendación probabilísticos que generan experiencias de compra contextualizadas y creatividades dinámicas.',
      example: 'Generación en tiempo real de recomendaciones de productos que aumentan la tasa de conversión en un 28% respetando la privacidad del usuario.'
    },
    {
      sector: 'Investigación Científica',
      category: 'salud',
      icon: Atom,
      title: 'Física Cuántica & Descubrimiento de Materiales',
      desc: 'Modelos de base entrenados en la tabla periódica y simulaciones cuánticas para diseñar superconductores, baterías de litio y catalizadores de captura de carbono.',
      example: 'AlphaFold prediciendo la estructura tridimensional de más de 200 millones de proteínas conocidas, acelerando décadas de investigación biológica.'
    }
  ];

  const filteredApps = filterCategory === 'todas'
    ? applications
    : applications.filter(a => a.category === filterCategory);

  return (
    <section id="aplicaciones" className="py-24 relative border-t border-cyan-500/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-wider">
            <Briefcase className="w-4 h-4" />
            <span>09. IMPACTO MULTISECTORIAL EN LA ECONOMÍA REAL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Aplicaciones de la Inteligencia Artificial
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            Casos de implementación práctica donde los algoritmos de Machine Learning y visión por computadora generan valor tangible en las industrias globales.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-10 p-1 rounded-lg bg-[#161b22] border border-slate-800 max-w-lg">
          {[
            { id: 'todas', label: 'Todos los Sectores' },
            { id: 'salud', label: 'Salud & Ciencias' },
            { id: 'industria', label: 'Industria & Movilidad' },
            { id: 'negocios', label: 'Negocios & Seguridad' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilterCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded text-xs font-mono transition-all ${
                filterCategory === cat.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Applications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredApps.map((app) => {
            const Icon = app.icon;
            const isSelected = selectedApp === app.sector;

            return (
              <div
                key={app.sector}
                onClick={() => setSelectedApp(isSelected ? null : app.sector)}
                className={`p-5 rounded-xl transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#161b22] border-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.2)]'
                    : 'bg-[#161b22]/70 border border-slate-800 hover:border-cyan-500/40 hover:bg-[#161b22]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/30 px-2 py-0.5 rounded border border-emerald-500/30">
                      SECTOR // {app.sector.toUpperCase()}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2 leading-snug">
                    {app.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {app.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 space-y-2 text-xs">
                  <div className="p-2.5 rounded bg-[#0d1117] border border-slate-800/80 text-slate-300 leading-relaxed text-[11px]">
                    <strong className="text-cyan-400 font-mono block mb-1">CASO PRÁCTICO REAL:</strong>
                    {app.example}
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-mono text-cyan-400 pt-1">
                    <span>{isSelected ? 'CERRAR DETALLES' : 'VER CASO EXPANDIDO'}</span>
                    <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'rotate-90' : ''}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
