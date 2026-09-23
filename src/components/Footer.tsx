import React, { useState } from 'react';
import {
  Cpu,
  Github,
  Linkedin,
  Twitter,
  Download,
  Check,
  Shield,
  BookOpen,
  Sparkles,
  ArrowUp
} from 'lucide-react';

export const Footer: React.FC = () => {
  const [downloading, setDownloading] = useState<boolean>(false);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExportSingleFile = () => {
    setDownloading(true);

    // Create a standalone HTML string with all essential styling, canvas particle script, interactive logic
    const standaloneHtml = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NEXUS AI - Plataforma de Inteligencia Artificial & Data Science</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background-color: #0d1117; color: #e6edf3; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, monospace; overflow-x: hidden; }
    header { position: fixed; top: 0; left: 0; right: 0; background: rgba(13,17,23,0.9); backdrop-filter: blur(10px); border-bottom: 1px solid rgba(0,240,255,0.2); padding: 16px 24px; display: flex; justify-content: space-between; align-items: center; z-index: 100; }
    .brand { font-weight: bold; font-family: monospace; color: #00f0ff; letter-spacing: 2px; font-size: 18px; }
    .hero { min-height: 80vh; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 120px 20px 60px; }
    h1 { font-size: 3rem; font-weight: 800; color: #fff; text-shadow: 0 0 20px rgba(0,240,255,0.4); margin-bottom: 12px; }
    .sub { color: #00ff66; font-family: monospace; font-size: 1.1rem; margin-bottom: 24px; }
    .btn { display: inline-block; padding: 12px 28px; background: #00f0ff; color: #0d1117; font-weight: bold; border-radius: 6px; text-decoration: none; margin: 8px; box-shadow: 0 0 15px rgba(0,240,255,0.4); transition: 0.2s; }
    .btn:hover { background: #00ff66; box-shadow: 0 0 20px rgba(0,255,102,0.6); }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; max-width: 1200px; margin: 40px auto; padding: 0 20px; }
    .card { background: rgba(22,27,34,0.85); border: 1px solid rgba(0,240,255,0.2); border-radius: 10px; padding: 24px; transition: 0.3s; }
    .card:hover { border-color: #00f0ff; box-shadow: 0 0 20px rgba(0,240,255,0.2); }
    .card h3 { color: #fff; margin-bottom: 8px; }
    .card p { color: #8b949e; font-size: 0.9rem; line-height: 1.5; }
    footer { border-top: 1px solid rgba(0,240,255,0.15); padding: 40px 20px; text-align: center; color: #8b949e; font-size: 0.85rem; font-family: monospace; }
    canvas#bg { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; pointer-events: none; z-index: -1; opacity: 0.6; }
  </style>
</head>
<body>
  <canvas id="bg"></canvas>
  <header>
    <div class="brand">NEXUS // AI // 2026</div>
    <div><a href="#playground" class="btn" style="padding: 6px 16px; font-size: 12px;">EXPLORAR</a></div>
  </header>
  <div class="hero">
    <h1>INTELIGENCIA ARTIFICIAL</h1>
    <div class="sub">Machine Learning • Data Science • Redes Neuronales</div>
    <p style="max-w: 600px; color: #c9d1d9; margin-bottom: 24px;">Plataforma interactiva autónoma en HTML5 puro, CSS3 y JavaScript.</p>
    <div>
      <a href="#conceptos" class="btn">Explorar Conceptos</a>
    </div>
  </div>
  <div class="grid" id="conceptos">
    <div class="card">
      <h3>Redes Neuronales</h3>
      <p>Modelos conexionistas con capas densas, activación ReLU/Sigmoid y retropropagación de gradientes.</p>
    </div>
    <div class="card">
      <h3>Machine Learning</h3>
      <p>Aprendizaje Supervisado, No Supervisado y por Refuerzo con optimización matemática continua.</p>
    </div>
    <div class="card">
      <h3>Ciencia de Datos</h3>
      <p>Pipeline completo: Recolección -> Limpieza ETL -> EDA -> Modelado -> Decisión.</p>
    </div>
  </div>
  <footer>
    NEXUS AI • Desarrollado para exploración e investigación educativa • 2026<br>
    HTML5 • CSS3 • JavaScript Puro • Canvas 2D
  </footer>
  <script>
    const canvas = document.getElementById('bg');
    const ctx = canvas.getContext('2d');
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    const pts = Array.from({length: 60}, () => ({
      x: Math.random()*w, y: Math.random()*h,
      vx: (Math.random()-0.5)*0.8, vy: (Math.random()-0.5)*0.8
    }));
    function draw() {
      ctx.fillStyle = '#0d1117'; ctx.fillRect(0,0,w,h);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if(p.x<0||p.x>w) p.vx*=-1; if(p.y<0||p.y>h) p.vy*=-1;
        ctx.fillStyle = '#00f0ff'; ctx.beginPath(); ctx.arc(p.x, p.y, 2, 0, Math.PI*2); ctx.fill();
      });
      requestAnimationFrame(draw);
    }
    draw();
  </script>
</body>
</html>`;

    const blob = new Blob([standaloneHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'nexus_ai_matrix_standalone.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setTimeout(() => setDownloading(false), 1500);
  };

  return (
    <footer className="relative bg-[#0d1117] border-t border-cyan-500/20 pt-16 pb-12 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-800">
          
          {/* Brand & Description (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                <Cpu className="w-4 h-4" />
              </div>
              <span className="font-mono font-bold tracking-wider text-base text-white">
                NEXUS<span className="text-cyan-400 mx-0.5">//</span><span className="text-emerald-400">AI</span>
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              Plataforma tecnológica avanzada dedicada a la divulgación, experimentación algorítmica y visualización interactiva de Inteligencia Artificial, Machine Learning y Ciencia de Datos.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded bg-[#161b22] border border-slate-800 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
                aria-label="Repositorio en GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded bg-[#161b22] border border-slate-800 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
                aria-label="Perfil Profesional en LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded bg-[#161b22] border border-slate-800 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
                aria-label="Canal en X"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Navegación
            </h4>
            <ul className="space-y-2 text-xs text-slate-400 font-mono">
              <li><a href="#inicio" className="hover:text-cyan-400 transition-colors">Inicio</a></li>
              <li><a href="#ia-conceptos" className="hover:text-cyan-400 transition-colors">Conceptos IA</a></li>
              <li><a href="#machine-learning" className="hover:text-cyan-400 transition-colors">Machine Learning</a></li>
              <li><a href="#data-science" className="hover:text-cyan-400 transition-colors">Ciencia de Datos</a></li>
              <li><a href="#redes-neuronales" className="hover:text-cyan-400 transition-colors">Redes Neuronales</a></li>
            </ul>
          </div>

          {/* Labs & Security Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Laboratorios
            </h4>
            <ul className="space-y-2 text-xs text-slate-400 font-mono">
              <li><a href="#playground" className="hover:text-cyan-400 transition-colors">AI Playground</a></li>
              <li><a href="#dashboard" className="hover:text-cyan-400 transition-colors">Dashboard Telemetría</a></li>
              <li><a href="#ciberseguridad" className="hover:text-cyan-400 transition-colors">IA & Ciberseguridad</a></li>
              <li><a href="#aplicaciones" className="hover:text-cyan-400 transition-colors">Sectores y Casos</a></li>
              <li><a href="#etica-futuro" className="hover:text-cyan-400 transition-colors">Ética y Futuro</a></li>
            </ul>
          </div>

          {/* Standalone Single-File Download Card */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Exportación
            </h4>
            <div className="p-3.5 rounded-lg bg-[#161b22] border border-cyan-500/30 space-y-2">
              <span className="text-[11px] text-slate-300 font-mono block">
                Descarga el archivo único autónomo <code>index.html</code> listo para abrir sin conexión:
              </span>
              <button
                onClick={handleExportSingleFile}
                disabled={downloading}
                className="w-full py-2 px-3 rounded bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all shadow-[0_0_12px_rgba(0,240,255,0.3)]"
              >
                {downloading ? <Check className="w-3.5 h-3.5 text-slate-950" /> : <Download className="w-3.5 h-3.5" />}
                <span>{downloading ? 'DESCARGANDO...' : 'DESCARGAR INDEX.HTML'}</span>
              </button>
            </div>
          </div>

        </div>

        {/* Educational Disclaimer Banner */}
        <div className="my-8 p-4 rounded-lg bg-[#161b22]/70 border border-slate-800 flex items-start gap-3 text-xs text-slate-400">
          <BookOpen className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-white">Aviso de Uso Educativo:</strong> Esta plataforma interactiva fue diseñada con fines exclusivamente pedagógicos, académicos y de investigación. Todas las simulaciones algorítmicas, inferencias y detecciones operan localmente de forma determinista y segura en el navegador sin requerir credenciales externas ni servidores de backend.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            NEXUS AI © 2026 • Desarrollado con HTML5, CSS3, TypeScript, Canvas 2D y Tailwind CSS
          </div>

          <button
            onClick={handleScrollTop}
            className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 transition-colors p-1"
          >
            <span>Volver arriba</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
