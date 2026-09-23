import React, { useState } from 'react';
import {
  Brain,
  Cpu,
  Eye,
  MessageSquareCode,
  Sparkles,
  Bot,
  Network,
  History,
  Layers,
  ChevronRight,
  HelpCircle,
  Clock,
  Compass,
  Zap,
  BookOpen
} from 'lucide-react';

export const ConceptsSection: React.FC = () => {
  const [activeConceptIndex, setActiveConceptIndex] = useState<number | null>(null);
  const [selectedTimelineEra, setSelectedTimelineEra] = useState<number>(0);

  const timelineMilestones = [
    {
      year: '1950',
      title: 'Test de Turing & Conferencia de Dartmouth',
      desc: 'Alan Turing propone la pregunta "¿Pueden pensar las máquinas?". En 1956, John McCarthy acuña formalmente el término "Inteligencia Artificial" en Dartmouth.',
      tag: 'Nacimiento de la IA'
    },
    {
      year: '1980s',
      title: 'Auge de los Sistemas Expertos',
      desc: 'Programas basados en reglas lógicas condicionales (If-Then) revolucionan la medicina y la industria antes del segundo "Invierno de la IA".',
      tag: 'IA Simbólica'
    },
    {
      year: '1997',
      title: 'Deep Blue vs Garry Kasparov',
      desc: 'La supercomputadora de IBM derrota al campeón mundial de ajedrez, demostrando la potencia de la búsqueda heurística y árboles de decisión masivos.',
      tag: 'Hito Heurístico'
    },
    {
      year: '2012',
      title: 'Revolución del Deep Learning (AlexNet)',
      desc: 'Alex Krizhevsky y Geoffrey Hinton ganan ImageNet usando redes neuronales convolucionales (CNN) aceleradas por GPUs, iniciando la era moderna.',
      tag: 'Aprendizaje Profundo'
    },
    {
      year: '2017',
      title: 'Atención es todo lo que necesitas (Transformers)',
      desc: 'Vaswani et al. introducen la arquitectura Transformer con autoatención, cimiento de todos los modelos de lenguaje modernos (LLMs).',
      tag: 'Transformers'
    },
    {
      year: '2022-2026',
      title: 'IA Generativa & Agentes Autónomos',
      desc: 'Modelos multimodales que procesan texto, visión, código y audio en tiempo real con razonamiento estructurado y toma de decisiones autónoma.',
      tag: 'Era Multimodal'
    }
  ];

  const concepts = [
    {
      id: 'ia-definicion',
      icon: Brain,
      title: '¿Qué es la Inteligencia Artificial?',
      category: 'Fundamento Teórico',
      description:
        'Disciplina científica y tecnológica que diseña sistemas de software y hardware capaces de percibir su entorno, razonar sobre datos complejos, aprender de la experiencia y ejecutar acciones autónomas para alcanzar objetivos determinados.',
      example:
        'Sistemas de recomendación predictiva, asistentes de voz, motores de búsqueda semánticos.',
      deepDive:
        'La IA abarca desde algoritmos heurísticos clásicos hasta arquitecturas conexionistas profundas capaces de aproximar funciones matemáticas arbitrarias de alta dimensionalidad.'
    },
    {
      id: 'machine-learning',
      icon: Cpu,
      title: 'Machine Learning (Aprendizaje Automático)',
      category: 'Subcampo Central',
      description:
        'Rama de la IA centrada en el desarrollo de algoritmos que aprenden patrones directamente de los datos sin haber sido explícitamente programados mediante reglas rígidas.',
      example:
        'Filtros de spam en correo electrónico, estimación de precios inmobiliarios, scoring de riesgo financiero.',
      deepDive:
        'Se fundamenta en la optimización matemática de una función de pérdida (Loss Function) mediante descenso de gradiente para calibrar parámetros internos.'
    },
    {
      id: 'deep-learning',
      icon: Network,
      title: 'Redes Neuronales Profundas (Deep Learning)',
      category: 'Arquitectura Conexionista',
      description:
        'Modelos computacionales inspirados biológicamente estructurados en múltiples capas jerárquicas de nodos (neuronas) que extraen representaciones latentes desde datos no estructurados.',
      example:
        'Reconocimiento facial biométrico, conducción autónoma, traducción en tiempo real.',
      deepDive:
        'Combina capas de convolución, atención, normalización y activaciones no lineales para modelar correlaciones intrincadas en terabytes de datos.'
    },
    {
      id: 'nlp',
      icon: MessageSquareCode,
      title: 'Procesamiento de Lenguaje Natural (NLP)',
      category: 'Comunicación y Lingüística',
      description:
        'Especialidad orientada a dotar a las computadoras de la capacidad de comprender, interpretar, analizar y generar lenguaje humano sintáctico y semánticamente coherente.',
      example:
        'Modelos de lenguaje extensos (LLMs), traducción multilingüe automática, análisis de sentimientos.',
      deepDive:
        'Utiliza técnicas como tokenización BPE, embeddings de alta dimensionalidad (word vectors) y matrices de autoatención para capturar el contexto global.'
    },
    {
      id: 'computer-vision',
      icon: Eye,
      title: 'Visión por Computadora (Computer Vision)',
      category: 'Percepción Visual',
      description:
        'Área que permite a los sistemas informáticos extraer información estructurada y tomar decisiones a partir de imágenes digitales, streams de video y nubes de puntos 3D.',
      example:
        'Detección de tumores en resonancias magnéticas, control de calidad industrial, navegación de drones.',
      deepDive:
        'Aplica redes convolucionales (CNNs) y Vision Transformers (ViT) para realizar tareas como segmentación semántica, detección de objetos y estimación de pose.'
    },
    {
      id: 'gen-ai',
      icon: Sparkles,
      title: 'IA Generativa (Generative AI)',
      category: 'Síntesis y Creatividad',
      description:
        'Modelos probabilísticos entrenados para sintetizar nuevos artefactos digitales (texto, audio, código, video, moléculas sintéticas) que imitan la distribución estadística de datos reales.',
      example:
        'Creación de código fuente asistido, síntesis de voz hiperrealista, diseño molecular de fármacos.',
      deepDive:
        'Implementa modelos de difusión latente, transformadores autorregresivos y modelos generativos antagónicos (GANs).'
    },
    {
      id: 'autonomous-agents',
      icon: Bot,
      title: 'Agentes Inteligentes Autónomos',
      category: 'Acción y Razonamiento',
      description:
        'Entidades de software que combinan percepción, memoria a corto/largo plazo, herramientas externas y modelos de razonamiento para descomponer metas complejas y ejecutarlas paso a paso.',
      example:
        'Agentes de investigación de mercado, asistentes de soporte con resolución de tickets de extremo a extremo.',
      deepDive:
        'Utilizan bucles de planificación (ReAct, Chain-of-Thought), llamada a funciones (Function Calling) y gestión de estado persistente.'
    },
    {
      id: 'ai-types',
      icon: Layers,
      title: 'Niveles: IA Débil (ANI) vs AGI vs ASI',
      category: 'Taxonomía de Capacidad',
      description:
        'Clasificación por alcance cognitivo: IA Estrecha (ANI, especializada en una tarea), IA General (AGI, iguala al humano en cualquier dominio intelectual) y Superinteligencia (ASI).',
      example:
        'Toda la IA actual es ANI (incluyendo GPT-4 y AlphaFold). AGI y ASI permanecen como objetivos de frontera científica.',
      deepDive:
        'El debate contemporáneo gira en torno a la alineación de valores, la seguridad sistémica y las capacidades emergentes en modelos de frontera.'
    }
  ];

  return (
    <section id="ia-conceptos" className="py-24 relative border-t border-cyan-500/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-3">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-wider">
            <BookOpen className="w-4 h-4" />
            <span>01. FUNDAMENTOS Y EVOLUCIÓN CIENTÍFICA</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Inteligencia Artificial: Conceptos Esenciales
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            De la lógica matemática a los modelos de frontera. Comprende las bases técnicas que estructuran la revolución computacional contemporánea.
          </p>
        </div>

        {/* Interactive History Timeline */}
        <div className="mb-20 p-6 sm:p-8 rounded-xl bg-[#161b22]/90 border border-cyan-500/25 shadow-xl">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs">
              <History className="w-4 h-4" />
              <span>LÍNEA DE TIEMPO INTERACTIVA // EVOLUCIÓN DE LA IA</span>
            </div>
            <span className="text-xs font-mono text-slate-400">1950 — 2026</span>
          </div>

          {/* Timeline Bar Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-6">
            {timelineMilestones.map((m, idx) => (
              <button
                key={m.year}
                onClick={() => setSelectedTimelineEra(idx)}
                className={`p-3 rounded text-left transition-all font-mono text-xs ${
                  selectedTimelineEra === idx
                    ? 'bg-cyan-500/20 border border-cyan-400 text-cyan-200 shadow-[0_0_12px_rgba(0,240,255,0.25)]'
                    : 'bg-[#0d1117] border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <div className="text-base font-bold text-white mb-0.5">{m.year}</div>
                <div className="truncate text-[10px] text-cyan-400/80">{m.tag}</div>
              </button>
            ))}
          </div>

          {/* Active Era Details Display */}
          <div className="p-5 rounded-lg bg-[#0d1117] border border-cyan-500/20 flex flex-col md:flex-row gap-6 items-start">
            <div className="w-16 h-16 shrink-0 rounded bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Clock className="w-8 h-8" />
            </div>
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                  {timelineMilestones[selectedTimelineEra].year}
                </span>
                <h3 className="text-lg font-semibold text-white">
                  {timelineMilestones[selectedTimelineEra].title}
                </h3>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                {timelineMilestones[selectedTimelineEra].desc}
              </p>
            </div>
          </div>
        </div>

        {/* 8 Interactive Concept Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {concepts.map((concept, index) => {
            const Icon = concept.icon;
            const isExpanded = activeConceptIndex === index;

            return (
              <div
                key={concept.id}
                onClick={() => setActiveConceptIndex(isExpanded ? null : index)}
                className={`p-5 rounded-xl transition-all cursor-pointer flex flex-col justify-between ${
                  isExpanded
                    ? 'bg-[#161b22] border-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.2)]'
                    : 'bg-[#161b22]/70 border border-slate-800 hover:border-cyan-500/50 hover:bg-[#161b22]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">
                      {concept.category}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2 leading-snug">
                    {concept.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {concept.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 space-y-2">
                  <div className="text-[11px] text-slate-400">
                    <strong className="text-emerald-400 font-mono">Ejemplo:</strong>{' '}
                    <span className="text-slate-300">{concept.example}</span>
                  </div>

                  {isExpanded && (
                    <div className="pt-2 text-[11px] text-cyan-200/90 font-mono bg-cyan-950/30 p-2.5 rounded border border-cyan-500/30">
                      <strong>Detalle Técnico:</strong> {concept.deepDive}
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[10px] font-mono text-cyan-400 pt-1">
                    <span>{isExpanded ? 'COLAPSAR' : 'EXPLORAR ARQUITECTURA'}</span>
                    <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
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
