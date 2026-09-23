import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  FileCode,
  Image as ImageIcon,
  Mic,
  Sliders,
  Play,
  RotateCcw,
  Cpu,
  Layers,
  Check,
  Flame,
  Terminal
} from 'lucide-react';

export const GenerativeAiSection: React.FC = () => {
  const [selectedModality, setSelectedModality] = useState<'text' | 'code' | 'image' | 'audio'>('text');
  const [temperature, setTemperature] = useState<number>(0.7);
  const [topP, setTopP] = useState<number>(0.9);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [streamedOutput, setStreamedOutput] = useState<string>('');
  const [tokenCount, setTokenCount] = useState<number>(0);

  const presets = {
    text: {
      prompt: 'Explica el mecanismo de autoatención (Self-Attention) en Transformers de forma intuitiva:',
      fullResponse:
        'El mecanismo de autoatención calcula qué palabras de una secuencia deben prestar atención entre sí. Para cada token, proyecta tres vectores: Query (Q), Key (K) y Value (V). Multiplica Q por K transpuesta para obtener similitudes de producto escalar, las escala por la raíz de la dimensión, aplica Softmax para normalizar en probabilidades y finalmente suma ponderadamente los vectores Value. Esto permite capturar dependencias a largo plazo en tiempo computacional paralelo O(1) secuencial.'
    },
    code: {
      prompt: 'Genera un script en Python con PyTorch para una capa lineal con activación ReLU:',
      fullResponse:
        'import torch\nimport torch.nn as nn\n\nclass CyberLinearLayer(nn.Module):\n    def __init__(self, in_features: int, out_features: int):\n        super().__init__()\n        self.linear = nn.Linear(in_features, out_features)\n        self.activation = nn.ReLU()\n\n    def forward(self, x: torch.Tensor) -> torch.Tensor:\n        z = self.linear(x)        # z = Wx + b\n        a = self.activation(z)    # a = max(0, z)\n        return a\n\n# Tensores verificados en GPU CUDA\nx = torch.randn(32, 128)\nmodel = CyberLinearLayer(128, 64)\nout = model(x)\nprint("Tensor de salida:", out.shape)  # [32, 64]'
    },
    image: {
      prompt: 'Prompt de Difusión Latente para síntesis visual de arquitectura biomimética futurista:',
      fullResponse:
        'PROMPT SINTETIZADO:\n"Cinematic isometric render of a biomechanical neural processing node, bioluminescent cyan conduits pulsing through obsidian carbon-fiber lattice, soft studio volumetrics, raytraced reflection caustics, octane render 8k --ar 16:9 --style raw --v 6.1"\n\nESPACIO LATENTE: VAE Decoder 512x512 -> 2048x2048\nPASOS DE DENOISING: 35 iteraciones completadas\nSEMILLA (SEED): 84920418'
    },
    audio: {
      prompt: 'Síntesis espectrográfico neuronal de voz para interfaz sintética táctica:',
      fullResponse:
        'PARAMETROS SÍNTESIS DE AUDIO (VOCODER NEURONAL):\n- Arquitectura: HiFi-GAN v2 con Mel-Spectrogram 80 bandas\n- Frecuencia de muestreo: 48.000 Hz / 24-bit\n- Tono fundamental (F0): 132.4 Hz (Modulación Cyberpunk)\n- Duración generada: 3.42 segundos\n- Transcripción acústica: "Protocolo de red neuronal iniciado. Enlaces sinápticos estables."'
    }
  };

  const handleStartGeneration = () => {
    if (isGenerating) return;
    setIsGenerating(true);
    setStreamedOutput('');
    setTokenCount(0);

    const fullText = presets[selectedModality].fullResponse;
    const words = fullText.split(' ');
    let currentIdx = 0;

    const interval = setInterval(() => {
      if (currentIdx < words.length) {
        setStreamedOutput((prev) => (prev ? prev + ' ' + words[currentIdx] : words[currentIdx]));
        setTokenCount((prev) => prev + 1);
        currentIdx++;
      } else {
        clearInterval(interval);
        setIsGenerating(false);
      }
    }, 45);
  };

  // Trigger initial preview on mount or modality change
  useEffect(() => {
    setStreamedOutput(presets[selectedModality].fullResponse.slice(0, 180) + '...');
    setTokenCount(35);
  }, [selectedModality]);

  return (
    <section id="ia-generativa" className="py-24 relative border-t border-cyan-500/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 space-y-3">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>05. MODELOS GENERATIVOS & SÍNTESIS MULTIMODAL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Inteligencia Artificial Generativa
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            Sistemas capaces de muestrear de distribuciones de probabilidad de alta dimensionalidad para generar texto, código, imágenes y señales acústicas con coherencia semántica.
          </p>
        </div>

        {/* 6 Modalities Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-12">
          {[
            { id: 'text', label: 'Texto (LLMs)', desc: 'Transformers autorregresivos', icon: Sparkles },
            { id: 'code', label: 'Código', desc: 'Síntesis sintáctica AST', icon: FileCode },
            { id: 'image', label: 'Imágenes', desc: 'Difusión Latente & VAE', icon: ImageIcon },
            { id: 'audio', label: 'Audio & Voz', desc: 'Vocoders neuronales', icon: Mic },
            { id: 'models', label: 'Modelos Lenguaje', desc: 'Tokenización & Attention', icon: Layers },
            { id: 'multimodal', label: 'Multimodal', desc: 'Cross-Attention unificado', icon: Cpu }
          ].map((item) => {
            const Icon = item.icon;
            const isSelectable = ['text', 'code', 'image', 'audio'].includes(item.id);
            const isSelected = selectedModality === item.id;

            return (
              <button
                key={item.id}
                onClick={() => isSelectable && setSelectedModality(item.id as any)}
                className={`p-3 rounded-lg text-left transition-all border font-mono ${
                  isSelected
                    ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-[0_0_15px_rgba(0,240,255,0.25)]'
                    : 'bg-[#161b22]/70 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <Icon className={`w-4 h-4 mb-2 ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`} />
                <div className="text-xs font-bold truncate text-white">{item.label}</div>
                <div className="text-[10px] text-slate-400 truncate">{item.desc}</div>
              </button>
            );
          })}
        </div>

        {/* Interactive Simulated GenAI Studio */}
        <div className="p-6 sm:p-8 rounded-xl bg-[#161b22]/90 border border-cyan-500/25 shadow-xl">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs">
              <Terminal className="w-4 h-4" />
              <span>SIMULADOR DE GENERACIÓN EN TIEMPO REAL // PROMPT A TOKEN STREAM</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400">INFERENCIA LOCAL SIMULADA</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Prompt & Hyperparameters Controls (5 cols) */}
            <div className="lg:col-span-5 space-y-5 font-mono text-xs">
              
              <div>
                <span className="text-slate-400 block mb-1">PROMPT DE ENTRADA:</span>
                <div className="p-3 rounded bg-[#0d1117] border border-cyan-500/30 text-slate-200 text-xs leading-relaxed">
                  {presets[selectedModality].prompt}
                </div>
              </div>

              {/* Temperature Slider */}
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-amber-400" />
                    <span>Temperatura ($T$):</span>
                  </span>
                  <span className="text-amber-400 font-bold">{temperature}</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="1.2"
                  step="0.1"
                  value={temperature}
                  onChange={(e) => setTemperature(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
                <span className="text-[10px] text-slate-500 block mt-0.5">
                  {temperature < 0.4 ? 'Determinista / Preciso' : temperature > 0.8 ? 'Creativo / Exploratorio' : 'Equilibrado'}
                </span>
              </div>

              {/* Top-P Slider */}
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-400">Nucleus Sampling (Top-p):</span>
                  <span className="text-cyan-400 font-bold">{topP}</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="1.0"
                  step="0.05"
                  value={topP}
                  onChange={(e) => setTopP(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              {/* Generate Button */}
              <button
                onClick={handleStartGeneration}
                disabled={isGenerating}
                className={`w-full py-2.5 px-4 rounded flex items-center justify-center gap-2 font-mono text-xs font-bold transition-all ${
                  isGenerating
                    ? 'bg-cyan-950 text-cyan-400 border border-cyan-500/40'
                    : 'bg-cyan-400 hover:bg-cyan-300 text-slate-950 shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                }`}
              >
                <Play className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : 'fill-current'}`} />
                <span>{isGenerating ? 'GENERANDO TOKENS...' : 'SINTETIZAR CONTEXTO'}</span>
              </button>

              {/* Telemetry Stats */}
              <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                <div className="p-2 rounded bg-[#0d1117] border border-slate-800">
                  <span className="text-slate-500 block">TOKENS GENERADOS</span>
                  <span className="text-white font-bold">{tokenCount}</span>
                </div>
                <div className="p-2 rounded bg-[#0d1117] border border-slate-800">
                  <span className="text-slate-500 block">VELOCIDAD INFERENCIA</span>
                  <span className="text-emerald-400 font-bold">42 tok/s</span>
                </div>
              </div>

            </div>

            {/* Right Output Window (7 cols) */}
            <div className="lg:col-span-7 bg-[#0d1117] p-5 rounded-xl border border-cyan-500/30 flex flex-col justify-between font-mono relative">
              <div>
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1.5 text-cyan-300">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    STREAM DE TOKENS EN VIVO
                  </span>
                  <span>MODALIDAD: {selectedModality.toUpperCase()}</span>
                </div>

                <div className="text-xs text-slate-200 leading-relaxed font-mono whitespace-pre-wrap min-h-[180px] select-text">
                  {streamedOutput}
                  {isGenerating && <span className="inline-block w-2 h-4 bg-cyan-400 animate-pulse ml-1 align-middle" />}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500">
                <span>Auto-Attention Softmax: Calculado en FP16</span>
                <span className="text-emerald-400">Sin APIs externas · Simulación determinista</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
