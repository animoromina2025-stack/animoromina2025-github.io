import React, { useState, useEffect, useMemo } from 'react';
import {
  Network,
  Sliders,
  Play,
  RotateCcw,
  Zap,
  Info,
  CheckCircle2,
  Share2
} from 'lucide-react';

export const NeuralNetworkSection: React.FC = () => {
  // Network configuration state
  const [inputCount, setInputCount] = useState<number>(3);
  const [hiddenLayerCount, setHiddenLayerCount] = useState<number>(2);
  const [neuronsPerHidden, setNeuronsPerHidden] = useState<number>(4);
  const [outputCount, setOutputCount] = useState<number>(2);
  const [activationFunc, setActivationFunc] = useState<'relu' | 'sigmoid' | 'tanh' | 'leaky'>('relu');
  const [isPropagating, setIsPropagating] = useState<boolean>(false);
  const [activeLayerIndex, setActiveLayerIndex] = useState<number>(-1);
  const [selectedNeuron, setSelectedNeuron] = useState<{ layer: string; index: number; value: number } | null>(null);

  // Activation function logic
  const activate = (z: number, fn: string): number => {
    switch (fn) {
      case 'relu':
        return Math.max(0, z);
      case 'sigmoid':
        return +(1 / (1 + Math.exp(-z))).toFixed(3);
      case 'tanh':
        return +Math.tanh(z).toFixed(3);
      case 'leaky':
        return +(z > 0 ? z : 0.1 * z).toFixed(3);
      default:
        return z;
    }
  };

  // Generate layers structure
  const layers = useMemo(() => {
    const list: Array<{ name: string; type: 'input' | 'hidden' | 'output'; count: number; nodes: number[] }> = [];

    // Input Layer
    const inputNodes: number[] = [];
    for (let i = 0; i < inputCount; i++) {
      inputNodes.push(+(0.4 + i * 0.25).toFixed(2));
    }
    list.push({ name: 'Entrada', type: 'input', count: inputCount, nodes: inputNodes });

    // Hidden Layers
    for (let h = 0; h < hiddenLayerCount; h++) {
      const hNodes: number[] = [];
      for (let n = 0; n < neuronsPerHidden; n++) {
        // Simulated sum + activation
        const baseZ = (n + 1) * 0.35 - (h * 0.2);
        hNodes.push(activate(baseZ, activationFunc));
      }
      list.push({
        name: `Oculta ${h + 1}`,
        type: 'hidden',
        count: neuronsPerHidden,
        nodes: hNodes
      });
    }

    // Output Layer
    const outNodes: number[] = [];
    for (let o = 0; o < outputCount; o++) {
      const outZ = 0.5 + o * 0.45;
      outNodes.push(activate(outZ, activationFunc));
    }
    list.push({ name: 'Salida', type: 'output', count: outputCount, nodes: outNodes });

    return list;
  }, [inputCount, hiddenLayerCount, neuronsPerHidden, outputCount, activationFunc]);

  // Signal propagation animation sequence
  const handlePropagateSignal = () => {
    if (isPropagating) return;
    setIsPropagating(true);
    setActiveLayerIndex(0);

    let current = 0;
    const totalLayers = layers.length;

    const interval = setInterval(() => {
      current++;
      if (current < totalLayers) {
        setActiveLayerIndex(current);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsPropagating(false);
          setActiveLayerIndex(-1);
        }, 600);
      }
    }, 450);
  };

  return (
    <section id="redes-neuronales" className="py-24 relative border-t border-cyan-500/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 space-y-3">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-wider">
            <Network className="w-4 h-4" />
            <span>04. ARQUITECTURA DE REDES NEURONALES PROFUNDAS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Visualizador Interactivo de Red Neuronal
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            Representación topológica de una red neuronal multicapa (Multi-Layer Perceptron). Ajusta las capas, neuronas y funciones de activación para observar la propagación hacia adelante (Forward Pass).
          </p>
        </div>

        {/* Interactive Neural Visualizer Card */}
        <div className="p-6 sm:p-8 rounded-xl bg-[#161b22]/90 border border-cyan-500/25 shadow-xl">
          
          {/* Controls Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 pb-6 mb-6 border-b border-slate-800 text-xs font-mono">
            {/* Input Neurons */}
            <div>
              <span className="text-slate-400 block mb-1">Neuronas Entrada:</span>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="2"
                  max="5"
                  value={inputCount}
                  onChange={(e) => setInputCount(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
                <span className="font-bold text-cyan-400 w-4">{inputCount}</span>
              </div>
            </div>

            {/* Hidden Layers Count */}
            <div>
              <span className="text-slate-400 block mb-1">Capas Ocultas:</span>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="1"
                  max="3"
                  value={hiddenLayerCount}
                  onChange={(e) => setHiddenLayerCount(Number(e.target.value))}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
                <span className="font-bold text-emerald-400 w-4">{hiddenLayerCount}</span>
              </div>
            </div>

            {/* Neurons per hidden */}
            <div>
              <span className="text-slate-400 block mb-1">Neuronas / Capa:</span>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="2"
                  max="6"
                  value={neuronsPerHidden}
                  onChange={(e) => setNeuronsPerHidden(Number(e.target.value))}
                  className="w-full accent-blue-400 cursor-pointer"
                />
                <span className="font-bold text-blue-400 w-4">{neuronsPerHidden}</span>
              </div>
            </div>

            {/* Activation Function */}
            <div>
              <span className="text-slate-400 block mb-1">Función Activación:</span>
              <select
                value={activationFunc}
                onChange={(e) => setActivationFunc(e.target.value as any)}
                className="w-full bg-[#0d1117] border border-slate-700 text-slate-200 rounded px-2 py-1 text-xs font-mono focus:border-cyan-400 focus:outline-none"
              >
                <option value="relu">ReLU: max(0, z)</option>
                <option value="sigmoid">Sigmoid: 1/(1+e^-z)</option>
                <option value="tanh">Tanh: tanh(z)</option>
                <option value="leaky">Leaky ReLU: max(0.1z, z)</option>
              </select>
            </div>

            {/* Action Propagate Button */}
            <div className="col-span-2 sm:col-span-1 flex items-end">
              <button
                onClick={handlePropagateSignal}
                disabled={isPropagating}
                className={`w-full py-2 px-3 rounded flex items-center justify-center gap-1.5 font-mono text-xs font-bold transition-all ${
                  isPropagating
                    ? 'bg-cyan-950 text-cyan-400 border border-cyan-500/50'
                    : 'bg-cyan-400 hover:bg-cyan-300 text-slate-950 shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                }`}
              >
                <Zap className={`w-3.5 h-3.5 ${isPropagating ? 'animate-bounce' : 'fill-current'}`} />
                <span>{isPropagating ? 'PROPAGANDO...' : 'PROPAGAR SEÑAL'}</span>
              </button>
            </div>
          </div>

          {/* SVG Diagram Canvas of Network Topology */}
          <div className="bg-[#0d1117] rounded-xl p-6 border border-cyan-500/20 relative overflow-x-auto min-h-[360px] flex items-center justify-center">
            
            <svg
              viewBox="0 0 700 320"
              className="w-full max-w-3xl h-auto"
              style={{ minWidth: '550px' }}
            >
              {/* Draw Synaptic Connections */}
              {layers.map((layer, lIdx) => {
                if (lIdx === layers.length - 1) return null;
                const nextLayer = layers[lIdx + 1];
                const x1 = 70 + (lIdx * (560 / (layers.length - 1)));
                const x2 = 70 + ((lIdx + 1) * (560 / (layers.length - 1)));

                const isCurrentSynapseActive = activeLayerIndex === lIdx;

                return layer.nodes.map((_, n1Idx) => {
                  const y1 = 160 + (n1Idx - (layer.count - 1) / 2) * 44;

                  return nextLayer.nodes.map((_, n2Idx) => {
                    const y2 = 160 + (n2Idx - (nextLayer.count - 1) / 2) * 44;

                    return (
                      <line
                        key={`${lIdx}-${n1Idx}-${n2Idx}`}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke={
                          isCurrentSynapseActive
                            ? '#00f0ff'
                            : 'rgba(6, 182, 212, 0.15)'
                        }
                        strokeWidth={isCurrentSynapseActive ? 2.5 : 0.8}
                        strokeDasharray={isCurrentSynapseActive ? '4 2' : 'none'}
                        className={isCurrentSynapseActive ? 'animate-pulse' : ''}
                      />
                    );
                  });
                });
              })}

              {/* Draw Neurons */}
              {layers.map((layer, lIdx) => {
                const cx = 70 + (lIdx * (560 / (layers.length - 1)));
                const isLayerActive = activeLayerIndex === lIdx;

                return layer.nodes.map((val, nIdx) => {
                  const cy = 160 + (nIdx - (layer.count - 1) / 2) * 44;
                  const isSelected =
                    selectedNeuron?.layer === layer.name && selectedNeuron?.index === nIdx;

                  let nodeColor = '#00f0ff';
                  if (layer.type === 'hidden') nodeColor = '#00ff66';
                  if (layer.type === 'output') nodeColor = '#3b82f6';

                  return (
                    <g
                      key={`${lIdx}-${nIdx}`}
                      className="cursor-pointer group"
                      onClick={() =>
                        setSelectedNeuron({
                          layer: layer.name,
                          index: nIdx + 1,
                          value: val
                        })
                      }
                    >
                      {/* Outer pulse when signal reaches layer */}
                      {isLayerActive && (
                        <circle
                          cx={cx}
                          cy={cy}
                          r="18"
                          fill="none"
                          stroke={nodeColor}
                          strokeWidth="1.5"
                          className="animate-ping opacity-60"
                        />
                      )}

                      {/* Neuron Node Body */}
                      <circle
                        cx={cx}
                        cy={cy}
                        r="14"
                        fill="#161b22"
                        stroke={isLayerActive || isSelected ? '#ffffff' : nodeColor}
                        strokeWidth={isSelected ? 3 : 2}
                        className="transition-all duration-300"
                      />

                      {/* Neuron Value Label */}
                      <text
                        x={cx}
                        y={cy + 4}
                        textAnchor="middle"
                        fontSize="9"
                        fontWeight="bold"
                        fill={isLayerActive ? '#ffffff' : '#e6edf3'}
                        fontFamily="JetBrains Mono"
                      >
                        {val}
                      </text>

                      {/* Layer Header Label at Top */}
                      {nIdx === 0 && (
                        <text
                          x={cx}
                          y="24"
                          textAnchor="middle"
                          fontSize="11"
                          fontWeight="bold"
                          fill={nodeColor}
                          fontFamily="JetBrains Mono"
                        >
                          {layer.name.toUpperCase()}
                        </text>
                      )}
                    </g>
                  );
                });
              })}
            </svg>

            {/* Micro helper watermark */}
            <div className="absolute bottom-3 left-4 text-[10px] font-mono text-slate-500">
              {"z_j = Σ(w_ij · a_i) + b_j  →  a_j = f(z_j)"}
            </div>
            <div className="absolute bottom-3 right-4 text-[10px] font-mono text-cyan-400">
              CLIC EN CUALQUIER NEURONA PARA DETALLES
            </div>
          </div>

          {/* Selected Neuron Inspector Box */}
          {selectedNeuron && (
            <div className="mt-4 p-4 rounded-lg bg-[#0d1117] border border-cyan-500/30 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span className="text-slate-400">
                  Neurona Seleccionada: <strong className="text-white">{selectedNeuron.layer} #{selectedNeuron.index}</strong>
                </span>
                <span className="text-slate-600">·</span>
                <span className="text-slate-400">
                  Valor Activado: <strong className="text-emerald-400 font-bold">{selectedNeuron.value}</strong>
                </span>
              </div>
              <div className="text-cyan-300 text-[11px]">
                Función: {activationFunc.toUpperCase()} | Bias ($b$): +0.12 | Sinapsis Conectadas: {hiddenLayerCount * neuronsPerHidden}
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
