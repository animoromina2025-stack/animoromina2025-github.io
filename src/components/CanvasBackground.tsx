import React, { useEffect, useRef, useState } from 'react';
import { Eye, EyeOff, Sparkles, Terminal } from 'lucide-react';

interface CanvasBackgroundProps {
  mode?: 'neural' | 'matrix' | 'off';
}

export const CanvasBackground: React.FC<CanvasBackgroundProps> = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeMode, setActiveMode] = useState<'neural' | 'matrix' | 'off'>('neural');
  const mousePos = useRef<{ x: number; y: number }>({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || activeMode === 'off') return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    // NEURAL PARTICLES MODE
    const particleCount = Math.min(Math.floor((width * height) / 14000), 100);
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      glow: string;
    }> = [];

    const colors = [
      { fill: '#00f0ff', glow: 'rgba(0, 240, 255, 0.4)' },
      { fill: '#00ff66', glow: 'rgba(0, 255, 102, 0.4)' },
      { fill: '#3b82f6', glow: 'rgba(59, 130, 246, 0.4)' }
    ];

    for (let i = 0; i < particleCount; i++) {
      const c = colors[Math.floor(Math.random() * colors.length)];
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: Math.random() * 2 + 1.2,
        color: c.fill,
        glow: c.glow
      });
    }

    // MATRIX RAIN MODE
    const characters = '010101アイウエオカキクケコサシスセソタチツテトナニヌネノ10101∑∏∆∇λπΩµ';
    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -50);
    }

    const render = () => {
      if (!ctx) return;

      if (activeMode === 'neural') {
        ctx.fillStyle = 'rgba(13, 17, 23, 0.25)';
        ctx.fillRect(0, 0, width, height);

        // Draw connections
        for (let i = 0; i < particles.length; i++) {
          const p1 = particles[i];

          // Move
          p1.x += p1.vx;
          p1.y += p1.vy;

          if (p1.x < 0 || p1.x > width) p1.vx *= -1;
          if (p1.y < 0 || p1.y > height) p1.vy *= -1;

          // Mouse interaction (gentle attraction)
          const dxMouse = mousePos.current.x - p1.x;
          const dyMouse = mousePos.current.y - p1.y;
          const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
          if (distMouse < 180 && distMouse > 10) {
            p1.x += (dxMouse / distMouse) * 0.4;
            p1.y += (dyMouse / distMouse) * 0.4;
          }

          // Connect nearby particles
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 130) {
              const alpha = (1 - dist / 130) * 0.28;
              ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
              ctx.lineWidth = 0.8;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }

          // Draw node
          ctx.shadowBlur = 8;
          ctx.shadowColor = p1.color;
          ctx.fillStyle = p1.color;
          ctx.beginPath();
          ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      } else if (activeMode === 'matrix') {
        ctx.fillStyle = 'rgba(13, 17, 23, 0.12)';
        ctx.fillRect(0, 0, width, height);

        ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

        for (let i = 0; i < drops.length; i++) {
          const char = characters.charAt(Math.floor(Math.random() * characters.length));
          const x = i * fontSize;
          const y = drops[i] * fontSize;

          // Highlight the head of the drop
          if (Math.random() > 0.9) {
            ctx.fillStyle = '#ffffff';
            ctx.shadowColor = '#00f0ff';
            ctx.shadowBlur = 10;
          } else {
            ctx.fillStyle = '#00ff66';
            ctx.shadowColor = '#00ff66';
            ctx.shadowBlur = 6;
          }

          ctx.fillText(char, x, y);
          ctx.shadowBlur = 0;

          if (y > height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i]++;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    // Initial background wipe
    ctx.fillStyle = '#0d1117';
    ctx.fillRect(0, 0, width, height);

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [activeMode]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full block opacity-75"
        style={{ pointerEvents: 'none' }}
      />
      
      {/* Visual cyber-grid overlay */}
      <div className="absolute inset-0 cyber-grid pointer-events-none opacity-40" />

      {/* Floating Mode Switcher Button (Bottom right) */}
      <div className="fixed bottom-4 right-4 z-40 pointer-events-auto flex items-center gap-1 bg-[#161b22]/90 backdrop-blur-md border border-cyan-500/30 p-1.5 rounded-lg shadow-lg text-xs font-mono">
        <span className="text-slate-400 px-1.5 hidden sm:inline">CANVAS:</span>
        <button
          onClick={() => setActiveMode('neural')}
          className={`flex items-center gap-1 px-2 py-1 rounded transition-colors ${
            activeMode === 'neural'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'text-slate-400 hover:text-slate-200'
          }`}
          title="Fondo de Red Neuronal Dinámica"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Neuronal</span>
        </button>
        <button
          onClick={() => setActiveMode('matrix')}
          className={`flex items-center gap-1 px-2 py-1 rounded transition-colors ${
            activeMode === 'matrix'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              : 'text-slate-400 hover:text-slate-200'
          }`}
          title="Lluvia de Código Matrix"
        >
          <Terminal className="w-3.5 h-3.5" />
          <span>Matrix</span>
        </button>
        <button
          onClick={() => setActiveMode(activeMode === 'off' ? 'neural' : 'off')}
          className={`px-2 py-1 rounded transition-colors ${
            activeMode === 'off'
              ? 'bg-slate-700 text-slate-300'
              : 'text-slate-500 hover:text-slate-300'
          }`}
          title="Pausar renderizado de fondo"
        >
          {activeMode === 'off' ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
};
