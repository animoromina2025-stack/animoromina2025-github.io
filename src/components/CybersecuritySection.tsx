import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Zap,
  Radio,
  Lock,
  Eye,
  AlertTriangle,
  Play,
  RotateCcw,
  Bug,
  Server,
  Activity,
  ArrowRight
} from 'lucide-react';

export const CybersecuritySection: React.FC = () => {
  const [pipelineState, setPipelineState] = useState<'normal' | 'analyzing' | 'detected' | 'mitigated'>('normal');
  const [activeAttack, setActiveAttack] = useState<string | null>(null);
  const [threatLog, setThreatLog] = useState<Array<{ id: string; time: string; type: string; ip: string; status: string }>>([
    { id: 'SEC-892', time: '14:32:05', type: 'Zero-Day Heuristic Scan', ip: '194.26.29.11', status: 'MITIGADO' },
    { id: 'SEC-891', time: '14:31:40', type: 'Anomalous Token Spike', ip: '45.154.255.8', status: 'BLOQUEADO' },
    { id: 'SEC-890', time: '14:30:12', type: 'Credential Spraying', ip: '185.220.101.5', status: 'AISLADO' }
  ]);

  const useCases = [
    {
      title: 'Detección de Anomalías',
      icon: Activity,
      desc: 'Modelos Autoencoder y Isolation Forest identifican picos inusuales en ancho de banda, puertos no estándar o secuencias anómalas de llamadas al sistema.',
      kpi: '99.94% precisión'
    },
    {
      title: 'Detección de Malware Polimórfico',
      icon: Bug,
      desc: 'Clasificación de binarios mediante grafos de flujo de control (CFG) y análisis estático con Deep Learning sin depender de firmas conocidas.',
      kpi: '< 3ms clasificación'
    },
    {
      title: 'Análisis de Tráfico de Red (NTA)',
      icon: Radio,
      desc: 'Inspección de flujos NetFlow e IPFIX en tiempo real para correlacionar balizas de Command & Control (C2) ocultas en tráfico cifrado TLS 1.3.',
      kpi: '10 Gbps inspección'
    },
    {
      title: 'Detección de Intrusiones (NIDS/HIDS)',
      icon: ShieldAlert,
      desc: 'Redes recurrentes (LSTM) que analizan la telemetría secuencial del kernel y eventos de autenticación para frenar movimientos laterales.',
      kpi: 'Zero-day protection'
    },
    {
      title: 'Patrones Sospechosos & Exploits',
      icon: Eye,
      desc: 'Algoritmos no supervisados que descubren cadenas de explotación novedosas y vulnerabilidades de día cero antes de su divulgación pública.',
      kpi: 'Descubrimiento proactivo'
    },
    {
      title: 'Análisis de Comportamiento (UEBA)',
      icon: Lock,
      desc: 'Modelado del comportamiento basal de cada identidad y credencial privilegiada para neutralizar amenazas internas o cuentas comprometidas.',
      kpi: 'Baselines adaptativos'
    }
  ];

  const handleTriggerAttack = (attackType: string, sourceIp: string) => {
    setActiveAttack(attackType);
    setPipelineState('analyzing');

    setTimeout(() => {
      setPipelineState('detected');

      setTimeout(() => {
        setPipelineState('mitigated');
        const now = new Date();
        const timeStr = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
        setThreatLog((prev) => [
          {
            id: `SEC-${Math.floor(Math.random() * 900 + 100)}`,
            time: timeStr,
            type: attackType,
            ip: sourceIp,
            status: 'NEUTRALIZADO'
          },
          ...prev.slice(0, 4)
        ]);
      }, 1500);
    }, 1200);
  };

  const handleResetDefense = () => {
    setPipelineState('normal');
    setActiveAttack(null);
  };

  return (
    <section id="ciberseguridad" className="py-24 relative border-t border-cyan-500/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 space-y-3">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-wider">
            <ShieldAlert className="w-4 h-4" />
            <span>08. DEFENSIVA NEURONAL & RESILIENCIA DIGITAL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Inteligencia Artificial y Ciberseguridad
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            La ciberseguridad moderna depende de modelos predictivos capaces de analizar millones de eventos por segundo para detectar intrusiones sofisticadas y responder en milisegundos.
          </p>
        </div>

        {/* The 4-step canonical security flow diagram */}
        <div className="p-6 sm:p-8 rounded-xl bg-[#161b22]/90 border border-cyan-500/25 mb-14 shadow-xl">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800 text-xs font-mono">
            <span className="text-cyan-400 font-bold">PIPELINE DE CIBERDEFENSA COGNITIVA</span>
            <span className="text-slate-400">TRÁFICO DE RED → ANÁLISIS IA → DETECCIÓN → ALERTA</span>
          </div>

          {/* 4 Pipeline Stages */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            
            {/* Stage 1 */}
            <div className={`p-4 rounded-lg border transition-all ${
              pipelineState === 'analyzing'
                ? 'bg-cyan-950/40 border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                : 'bg-[#0d1117] border-slate-800'
            }`}>
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                <span>PASO 01</span>
                <Server className="w-4 h-4 text-cyan-400" />
              </div>
              <h3 className="text-sm font-bold text-white font-mono">TRÁFICO DE RED</h3>
              <p className="text-[11px] text-slate-400 mt-1">
                Ingesta de paquetes en crudo, telemetría BGP y flujos NetFlow.
              </p>
            </div>

            {/* Stage 2 */}
            <div className={`p-4 rounded-lg border transition-all ${
              pipelineState === 'analyzing'
                ? 'bg-cyan-950/40 border-cyan-400 animate-pulse'
                : 'bg-[#0d1117] border-slate-800'
            }`}>
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                <span>PASO 02</span>
                <Zap className="w-4 h-4 text-cyan-400" />
              </div>
              <h3 className="text-sm font-bold text-white font-mono">ANÁLISIS IA</h3>
              <p className="text-[11px] text-slate-400 mt-1">
                Extracción de embeddings, comparación con baselines y scoring de anomalía.
              </p>
            </div>

            {/* Stage 3 */}
            <div className={`p-4 rounded-lg border transition-all ${
              pipelineState === 'detected'
                ? 'bg-rose-950/40 border-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.4)]'
                : 'bg-[#0d1117] border-slate-800'
            }`}>
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                <span>PASO 03</span>
                <AlertTriangle className="w-4 h-4 text-amber-400" />
              </div>
              <h3 className="text-sm font-bold text-white font-mono">DETECCIÓN</h3>
              <p className="text-[11px] text-slate-400 mt-1">
                Clasificación de vector de ataque y correlación con tácticas MITRE ATT&CK.
              </p>
            </div>

            {/* Stage 4 */}
            <div className={`p-4 rounded-lg border transition-all ${
              pipelineState === 'mitigated'
                ? 'bg-emerald-950/40 border-emerald-400 shadow-[0_0_15px_rgba(0,255,102,0.3)]'
                : 'bg-[#0d1117] border-slate-800'
            }`}>
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                <span>PASO 04</span>
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <h3 className="text-sm font-bold text-white font-mono">ALERTA & MITIGACIÓN</h3>
              <p className="text-[11px] text-slate-400 mt-1">
                Aislamiento de IP en cortafuegos y revocado de tokens en tiempo real.
              </p>
            </div>

          </div>

          {/* Interactive Threat Injection Console */}
          <div className="p-4 rounded-lg bg-[#0d1117] border border-cyan-500/20 font-mono text-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-slate-400">INYECTAR AMENAZA SIMULADA PARA PROBAR RESPUESTA IA:</span>
              <button
                onClick={handleResetDefense}
                className="flex items-center gap-1 text-slate-400 hover:text-white px-2.5 py-1 bg-slate-800 rounded"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Restablecer</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => handleTriggerAttack('Ataque DDoS Distribuido (SYN Flood)', '185.190.14.2')}
                className="p-2.5 rounded bg-rose-950/30 border border-rose-500/40 text-rose-300 hover:bg-rose-900/40 transition-colors text-left"
              >
                <div className="font-bold truncate">DDoS Botnet</div>
                <div className="text-[10px] text-slate-400">120K req/seg</div>
              </button>

              <button
                onClick={() => handleTriggerAttack('Inyección SQL / WAF Bypass', '45.132.88.91')}
                className="p-2.5 rounded bg-amber-950/30 border border-amber-500/40 text-amber-300 hover:bg-amber-900/40 transition-colors text-left"
              >
                <div className="font-bold truncate">Inyección SQL</div>
                <div className="text-[10px] text-slate-400">Payload Tautológico</div>
              </button>

              <button
                onClick={() => handleTriggerAttack('Escaneo Sigiloso de Puertos (Nmap)', '193.106.191.4')}
                className="p-2.5 rounded bg-cyan-950/30 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-900/40 transition-colors text-left"
              >
                <div className="font-bold truncate">Escaneo Recon</div>
                <div className="text-[10px] text-slate-400">TCP FIN Stealth</div>
              </button>

              <button
                onClick={() => handleTriggerAttack('Exfiltración Baliza C2 Ransomware', '103.251.167.20')}
                className="p-2.5 rounded bg-purple-950/30 border border-purple-500/40 text-purple-300 hover:bg-purple-900/40 transition-colors text-left"
              >
                <div className="font-bold truncate">C2 Ransomware</div>
                <div className="text-[10px] text-slate-400">DNS Tunneling</div>
              </button>
            </div>

            {/* Live Status Banner */}
            <div className="p-3 rounded bg-[#161b22] border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${
                  pipelineState === 'normal'
                    ? 'bg-emerald-400'
                    : pipelineState === 'analyzing'
                    ? 'bg-cyan-400 animate-ping'
                    : pipelineState === 'detected'
                    ? 'bg-rose-400 animate-ping'
                    : 'bg-emerald-400'
                }`} />
                <span className="text-slate-300">
                  ESTADO MOTOR DEFENSIVO: <strong className="text-white uppercase">{pipelineState}</strong>
                </span>
              </div>
              {activeAttack && (
                <div className="text-rose-400 font-bold truncate max-w-xs">
                  {activeAttack}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 6 Cyber Security Vectors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((uc) => {
            const Icon = uc.icon;
            return (
              <div
                key={uc.title}
                className="p-5 rounded-xl bg-[#161b22]/80 border border-slate-800 hover:border-cyan-500/40 transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/30 px-2 py-0.5 rounded border border-emerald-500/30">
                    {uc.kpi}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white">{uc.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">{uc.desc}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
