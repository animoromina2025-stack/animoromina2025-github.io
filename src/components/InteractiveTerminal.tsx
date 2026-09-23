import React, { useState, useRef, useEffect } from 'react';
import {
  Terminal,
  X,
  Minus,
  Maximize2,
  ChevronRight,
  Sparkles,
  HelpCircle,
  Copy,
  Check
} from 'lucide-react';

interface InteractiveTerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({
  isOpen,
  onClose
}) => {
  const [inputVal, setInputVal] = useState<string>('');
  const [history, setHistory] = useState<Array<{ command: string; output: string | React.ReactNode; isError?: boolean }>>([
    {
      command: 'system.info',
      output: (
        <div className="space-y-1 text-slate-300">
          <div><span className="text-cyan-400 font-bold">NEXUS AI KERNEL v4.8.2-MATRIX</span> (x86_64-quantum-linux)</div>
          <div>Cores Activos: 128 Tensores | VRAM: 1.2 TB HBM3e | Latencia Bus: 0.8ms</div>
          <div>Ecosistema: PyTorch 2.4 / CUDA 12.6 / TensorRT-LLM</div>
          <div className="text-emerald-400">Escribe <span className="text-white font-bold">help</span> para ver la lista de comandos disponibles.</div>
        </div>
      )
    }
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>(['system.info']);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const executeCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim().toLowerCase();
    if (!trimmed) return;

    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryIdx(-1);

    if (trimmed === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    }

    let resultOutput: React.ReactNode = '';

    switch (trimmed) {
      case 'help':
        resultOutput = (
          <div className="space-y-1 text-xs">
            <div className="text-cyan-400 font-bold">COMANDOS DISPONIBLES EN LA CONSOLA NEXUS:</div>
            <div>• <span className="text-emerald-300 font-bold">ai.status</span> - Estado operativo de subsistemas de IA y hardware</div>
            <div>• <span className="text-emerald-300 font-bold">ml.models</span> - Listado de modelos en producción y métricas de F1</div>
            <div>• <span className="text-emerald-300 font-bold">data.analyze</span> - Inspección estadística rápida del pipeline de datos</div>
            <div>• <span className="text-emerald-300 font-bold">neural.network</span> - Topología matricial de sinapsis activas</div>
            <div>• <span className="text-emerald-300 font-bold">security.scan</span> - Escaneo de intrusiones en la red y cortafuegos IA</div>
            <div>• <span className="text-emerald-300 font-bold">system.info</span> - Especificaciones de la arquitectura computacional</div>
            <div>• <span className="text-emerald-300 font-bold">matrix.rain</span> - Secuencia de caracteres matriciales de alta velocidad</div>
            <div>• <span className="text-emerald-300 font-bold">clear</span> - Limpiar la pantalla de la terminal</div>
          </div>
        );
        break;

      case 'ai.status':
        resultOutput = (
          <div className="space-y-1 text-xs">
            <div className="text-emerald-400 font-bold">✓ TODOS LOS SUBSISTEMAS OPERATIVOS (99.99% SALUD)</div>
            <div>• Motor NLP Autorregresivo: <span className="text-cyan-300">ONLINE [38 tok/s]</span></div>
            <div>• Inferencia Visión Convolucional: <span className="text-cyan-300">ONLINE [60 fps]</span></div>
            <div>• Cluster de Embeddings Vectoriales: <span className="text-cyan-300">SINCRONIZADO [Milvus/FAISS]</span></div>
            <div>• Firewall Neuronal e IDS: <span className="text-emerald-400">ACTIVO [0 amenazas pendientes]</span></div>
          </div>
        );
        break;

      case 'ml.models':
        resultOutput = (
          <div className="space-y-1 text-xs">
            <div className="text-cyan-400 font-bold">CATÁLOGO DE MODELOS EN PRODUCCIÓN:</div>
            <div className="grid grid-cols-3 gap-2 text-slate-400 border-b border-slate-800 pb-1">
              <span>MODELO</span>
              <span>TAREA</span>
              <span>PRECISIÓN</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <span className="text-white">nexus-transformer-7b</span>
              <span className="text-slate-300">Razonamiento NLP</span>
              <span className="text-emerald-400">98.8% F1</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <span className="text-white">vision-vit-large</span>
              <span className="text-slate-300">Segmentación</span>
              <span className="text-emerald-400">97.4% mIoU</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <span className="text-white">cyber-xgboost-ids</span>
              <span className="text-slate-300">Detección Fraude</span>
              <span className="text-emerald-400">99.9% AUC</span>
            </div>
          </div>
        );
        break;

      case 'data.analyze':
        resultOutput = (
          <div className="space-y-1 text-xs">
            <div className="text-cyan-400 font-bold">PERFILADO ESTADÍSTICO DEL DATASET:</div>
            <div>• Registros evaluados: <span className="text-white font-bold">14,285,900</span></div>
            <div>• Dimensiones (Features): <span className="text-white font-bold">128 columnas normalizadas</span></div>
            <div>• Tasa de Outliers detectados: <span className="text-amber-400">0.03% (filtrados)</span></div>
            <div>• Entropía de Shannon calculada: <span className="text-cyan-300">7.84 bits</span></div>
          </div>
        );
        break;

      case 'neural.network':
        resultOutput = (
          <div className="space-y-1 text-xs">
            <div className="text-cyan-400 font-bold">TOPOLOGÍA NEURONAL ACTIVA:</div>
            <div className="font-mono text-emerald-300">
              [Entrada: 128] → [Oculta-1: 512 (GELU)] → [Oculta-2: 256 (GELU)] → [Salida: 10 (Softmax)]
            </div>
            <div>Pesos cuantizados: FP8 | Sinapsis totales: 229,376 | Pérdida de validación: 0.041</div>
          </div>
        );
        break;

      case 'security.scan':
        resultOutput = (
          <div className="space-y-1 text-xs">
            <div className="text-emerald-400 font-bold">✓ ESCANEO DE SEGURIDAD COMPLETADO (0.42s)</div>
            <div>• Puertos auditados: 65,535 | Puertos expuestos: 443 (TLS 1.3), 8443 (gRPC)</div>
            <div>• Análisis de tráfico de red: <span className="text-emerald-400">NORMAL (Sin anomalías)</span></div>
            <div>• Firmas de malware polimórfico: <span className="text-emerald-400">0 DETECTADAS</span></div>
            <div>• Cortafuegos de IA: 100% de paquetes validados con inspección profunda</div>
          </div>
        );
        break;

      case 'system.info':
        resultOutput = (
          <div className="space-y-1 text-xs">
            <div><span className="text-cyan-400 font-bold">PLATAFORMA: NEXUS AI MATRIX OS v4.8</span></div>
            <div>Kernel: WebAssembly + WebGL2 / Canvas2D Accelerator</div>
            <div>Arquitectura: Simulación local determinista en JavaScript / TypeScript</div>
            <div>Modo: Sandboxed client-side evaluation</div>
          </div>
        );
        break;

      case 'matrix.rain':
        resultOutput = (
          <div className="text-emerald-400 font-mono text-[11px] leading-tight space-y-0.5">
            <div>01010101 01101110 01100101 01111000 01110101 01110011</div>
            <div>アイウエオカキクケコサシスセソタチツテトナニヌネノ</div>
            <div>∇ × E = -∂B/∂t  ·  ∇ × B = µ0(J + ε0∂E/∂t)  ·  z = Wx + b</div>
            <div>[SISTEMA MATRICIAL REINICIADO - ENLACE SINÁPTICO ESTABLE]</div>
          </div>
        );
        break;

      default:
        resultOutput = (
          <div className="text-rose-400 text-xs">
            Comando no reconocido: "{cmdStr}". Escribe <span className="text-cyan-400 underline font-bold">help</span> para ver la lista de comandos disponibles.
          </div>
        );
    }

    setHistory((prev) => [...prev, { command: cmdStr, output: resultOutput }]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIdx = historyIdx + 1;
        if (nextIdx < commandHistory.length) {
          setHistoryIdx(nextIdx);
          setInputVal(commandHistory[commandHistory.length - 1 - nextIdx]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx > 0) {
        const nextIdx = historyIdx - 1;
        setHistoryIdx(nextIdx);
        setInputVal(commandHistory[commandHistory.length - 1 - nextIdx]);
      } else if (historyIdx === 0) {
        setHistoryIdx(-1);
        setInputVal('');
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-3xl bg-[#0d1117] border border-cyan-500/40 rounded-xl shadow-[0_0_40px_rgba(0,240,255,0.25)] flex flex-col h-[520px] overflow-hidden font-mono">
        
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80 cursor-pointer" onClick={onClose} />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="text-xs text-slate-300 font-bold ml-2 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              nexus@matrix-ai-core:~
            </span>
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <button
              onClick={onClose}
              className="p-1 hover:text-white rounded hover:bg-slate-800"
              title="Cerrar Terminal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Suggestion Pills Bar */}
        <div className="px-4 py-2 bg-[#0d1117] border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto text-[11px]">
          <span className="text-slate-500 shrink-0">Comandos rápidos:</span>
          {['help', 'ai.status', 'ml.models', 'data.analyze', 'neural.network', 'security.scan', 'clear'].map((cmd) => (
            <button
              key={cmd}
              onClick={() => executeCommand(cmd)}
              className="px-2 py-0.5 rounded bg-[#161b22] border border-slate-800 text-cyan-400 hover:border-cyan-400 hover:text-cyan-200 transition-colors whitespace-nowrap"
            >
              {cmd}
            </button>
          ))}
        </div>

        {/* Terminal Output Log Area */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs font-mono text-slate-200">
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center gap-1.5 text-cyan-400 font-semibold">
                <ChevronRight className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-slate-500">nexus@matrix:~$</span>
                <span>{item.command}</span>
              </div>
              <div className="pl-5">{item.output}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Terminal Command Input Prompt Bar */}
        <div className="p-3 bg-[#161b22] border-t border-slate-800 flex items-center gap-2">
          <span className="text-emerald-400 font-bold text-xs">nexus@matrix:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escribe un comando (ej: help, ai.status, ml.models)..."
            className="flex-1 bg-transparent border-none text-xs text-white focus:outline-none font-mono"
          />
          <button
            onClick={() => executeCommand(inputVal)}
            className="px-3 py-1 bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded text-xs hover:bg-cyan-500/30 transition-colors"
          >
            Ejecutar
          </button>
        </div>

      </div>
    </div>
  );
};
