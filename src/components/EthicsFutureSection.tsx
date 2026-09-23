import React, { useState } from 'react';
import {
  Scale,
  EyeOff,
  AlertCircle,
  FileCheck,
  Users,
  Sparkles,
  Compass,
  CheckCircle,
  ChevronRight,
  HelpCircle
} from 'lucide-react';

export const EthicsFutureSection: React.FC = () => {
  const [selectedDilemma, setSelectedDilemma] = useState<number>(0);
  const [userChoice, setUserChoice] = useState<number | null>(null);

  const topics = [
    {
      title: 'Ética y Alineación de Valores',
      icon: Scale,
      desc: 'Garantizar que los objetivos optimizados por los modelos coincidan rigurosamente con los derechos humanos, la dignidad y el bienestar colectivo.'
    },
    {
      title: 'Privacidad & Aprendizaje Federado',
      icon: EyeOff,
      desc: 'Técnicas como Privacidad Diferencial y Federated Learning entrenan modelos sobre dispositivos distribuidos sin centralizar jamás datos personales.'
    },
    {
      title: 'Sesgos Algorítmicos & Equidad',
      icon: AlertCircle,
      desc: 'Auditorías estadísticas para evitar que los datos históricos perpetúen o amplifiquen discriminaciones de género, etnia o condición socioeconómica.'
    },
    {
      title: 'Transparencia & Explicabilidad (XAI)',
      icon: FileCheck,
      desc: 'El derecho de los ciudadanos a comprender las razones subyacentes cuando un algoritmo deniega un crédito, una contratación o un seguro.'
    },
    {
      title: 'Impacto en el Futuro Laboral',
      icon: Users,
      desc: 'Transición hacia la cooperación humano-IA: sustitución de tareas repetitivas y creación de nuevos roles de supervisión, auditoría y creatividad.'
    },
    {
      title: 'Frontera: Hacia la AGI Segura',
      icon: Sparkles,
      desc: 'Investigación en gobernanza global, alineación constitucional y mecanismos de contención ante la hipotética llegada de una Inteligencia Artificial General.'
    }
  ];

  const dilemmas = [
    {
      title: 'Dilema 01: El Vehículo Autónomo & Frenado de Emergencia',
      scenario:
        'Un vehículo autónomo sufre un fallo mecánico repentino en los frenos a alta velocidad en una curva. El sistema debe decidir instantáneamente entre desviarse hacia un muro de contención (arriesgando la vida del pasajero único) o continuar por el carril (arriesgando la vida de tres peatones que cruzaron con semáforo en rojo).',
      optionA: 'Priorizar salvar el mayor número de vidas (Utilitarismo: desvío al muro).',
      optionB: 'Priorizar el deber de protección incondicional del ocupante que compró el vehículo (Deontología contractual).',
      analysisA: 'Maximiza el balance neto de vidas humanas salvadas (3 vs 1), pero introduce desconfianza en los usuarios si el vehículo puede decidir sacrificar a su ocupante.',
      analysisB: 'Mantiene la expectativa del pasajero, pero genera un desenlace con mayor pérdida total de vidas en el espacio público.'
    },
    {
      title: 'Dilema 02: Scoring Crediticio & Datos Históricos Sesgados',
      scenario:
        'Una entidad bancaria implementa un modelo de Machine Learning para aprobar créditos hipotecarios. El modelo tiene un 98% de precisión, pero aprueba préstamos en una tasa 40% menor para solicitantes de ciertos códigos postales debido a discriminaciones socioeconómicas presentes en los datos de las últimas 3 décadas.',
      optionA: 'Forzar paridad demográfica en el modelo mediante restricciones matemáticas de justicia algorítmica.',
      optionB: 'Mantener la optimización de rentabilidad sin intervención manual para preservar la solvencia estadística.',
      analysisA: 'Promueve la movilidad social y repara sesgos sistémicos históricos, aunque puede implicar un ligero aumento del riesgo crediticio a corto plazo.',
      analysisB: 'Preserva la consistencia estadística de la tasa de impago, pero institucionaliza matemáticamente la desigualdad histórica.'
    }
  ];

  const current = dilemmas[selectedDilemma];

  return (
    <section id="etica-futuro" className="py-24 relative border-t border-cyan-500/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-mono text-xs tracking-wider">
            <Compass className="w-4 h-4" />
            <span>11. RESPONSABILIDAD, ÉTICA Y HORIZONTES DE FUTURO</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Ética, Privacidad y el Futuro de la IA
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            El poder transformador de la inteligencia computacional exige marcos deontológicos sólidos, transparencia algorítmica y deliberación pública multidisciplinaria.
          </p>
        </div>

        {/* Core Ethics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {topics.map((t) => {
            const Icon = t.icon;
            return (
              <div
                key={t.title}
                className="p-5 rounded-xl bg-[#161b22]/80 border border-slate-800 hover:border-amber-500/40 transition-all space-y-3"
              >
                <div className="w-10 h-10 rounded bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white leading-snug">{t.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">{t.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Interactive Ethics Dilemma Simulator */}
        <div className="p-6 sm:p-8 rounded-xl bg-[#161b22]/90 border border-amber-500/25 shadow-xl">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs">
              <Scale className="w-4 h-4" />
              <span>SIMULADOR DE DILEMAS ÉTICOS // ALINEACIÓN Y DECISIÓN DE MÁQUINAS</span>
            </div>
            <div className="flex gap-2">
              {dilemmas.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedDilemma(idx);
                    setUserChoice(null);
                  }}
                  className={`px-3 py-1 rounded text-xs font-mono transition-all ${
                    selectedDilemma === idx
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-400'
                      : 'bg-[#0d1117] text-slate-400 border border-slate-800'
                  }`}
                >
                  Caso {idx + 1}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white font-mono">{current.title}</h3>
              <p className="text-sm text-slate-300 leading-relaxed bg-[#0d1117] p-4 rounded-lg border border-slate-800">
                {current.scenario}
              </p>
            </div>

            {/* Dilemma Choices */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => setUserChoice(1)}
                className={`p-4 rounded-xl text-left border transition-all ${
                  userChoice === 1
                    ? 'bg-cyan-950/40 border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                    : 'bg-[#0d1117] border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2 text-xs font-mono text-cyan-400">
                  <span>POSTURA A</span>
                  {userChoice === 1 && <CheckCircle className="w-4 h-4" />}
                </div>
                <p className="text-xs text-white leading-relaxed">{current.optionA}</p>
              </button>

              <button
                onClick={() => setUserChoice(2)}
                className={`p-4 rounded-xl text-left border transition-all ${
                  userChoice === 2
                    ? 'bg-amber-950/40 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                    : 'bg-[#0d1117] border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2 text-xs font-mono text-amber-400">
                  <span>POSTURA B</span>
                  {userChoice === 2 && <CheckCircle className="w-4 h-4" />}
                </div>
                <p className="text-xs text-white leading-relaxed">{current.optionB}</p>
              </button>
            </div>

            {/* Ethical Analysis Revealed upon selection */}
            {userChoice !== null && (
              <div className="p-4 rounded-lg bg-[#0d1117] border border-cyan-500/30 text-xs font-mono space-y-2">
                <span className="text-cyan-400 font-bold block">
                  ANÁLISIS ÉTICO DE LA DECISIÓN ALGORÍTMICA:
                </span>
                <p className="text-slate-300 leading-relaxed font-sans">
                  {userChoice === 1 ? current.analysisA : current.analysisB}
                </p>
                <div className="text-[10px] text-slate-500 pt-1">
                  Marco referencial: Declaración de Montreal para la IA Responsable & IEEE Global Initiative on Ethics of Autonomous Systems.
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
