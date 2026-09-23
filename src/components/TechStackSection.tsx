import React, { useState } from 'react';
import {
  Code,
  Terminal,
  Cpu,
  Layers,
  Database,
  Cloud,
  Box,
  Binary,
  Copy,
  Check
} from 'lucide-react';

export const TechStackSection: React.FC = () => {
  const [selectedTech, setSelectedTech] = useState<string>('PyTorch');
  const [copied, setCopied] = useState<boolean>(false);

  const technologies = [
    {
      name: 'Python',
      category: 'Lenguaje Principal',
      role: 'Estándar de la industria para IA científica, cálculo tensorial y prototipado rápido.',
      command: 'pip install torch numpy pandas scikit-learn',
      codeSnippet: 'import numpy as np\nx = np.random.randn(1000, 128)\nprint("Matriz tensorial lista:", x.shape)'
    },
    {
      name: 'PyTorch',
      category: 'Deep Learning',
      role: 'Framework de grafos dinámicos preferido en investigación de frontera y producción moderna.',
      command: 'pip install torch torchvision torchaudio',
      codeSnippet: 'import torch\nw = torch.randn(10, 5, requires_grad=True)\ny = w.sum()\ny.backward()\nprint("Gradientes:", w.grad)'
    },
    {
      name: 'TensorFlow',
      category: 'Deep Learning',
      role: 'Ecosistema integral de Google para entrenamiento a gran escala y despliegue en edge/móvil.',
      command: 'pip install tensorflow',
      codeSnippet: 'import tensorflow as tf\nmodel = tf.keras.Sequential([\n    tf.keras.layers.Dense(64, activation="relu"),\n    tf.keras.layers.Dense(10)\n])'
    },
    {
      name: 'Scikit-learn',
      category: 'Machine Learning Clásico',
      role: 'Librería fundamental para regresión, clasificación SVM, árboles Random Forest y preprocesamiento.',
      command: 'pip install scikit-learn',
      codeSnippet: 'from sklearn.ensemble import RandomForestClassifier\nclf = RandomForestClassifier(n_estimators=100)\nclf.fit(X_train, y_train)'
    },
    {
      name: 'Pandas',
      category: 'Manipulación de Datos',
      role: 'Estructuras de DataFrames eficientes para operaciones de limpieza, filtrado y agregación temporal.',
      command: 'pip install pandas',
      codeSnippet: 'import pandas as pd\ndf = pd.read_parquet("telemetria.parquet")\nresumen = df.groupby("sensor").mean()'
    },
    {
      name: 'NumPy',
      category: 'Cálculo Matricial',
      role: 'Soporte para arreglos multidimensionales y funciones matemáticas vectorizadas ultrarrápidas en C.',
      command: 'pip install numpy',
      codeSnippet: 'import numpy as np\nA = np.array([[1, 2], [3, 4]])\neigvals, _ = np.linalg.eig(A)'
    },
    {
      name: 'Jupyter',
      category: 'Entorno de Desarrollo',
      role: 'Cuadernos interactivos para experimentación paso a paso, visualización en línea y reproducibilidad.',
      command: 'pip install jupyterlab',
      codeSnippet: '# Ejecución interactiva en celdas con visualización inline\n%matplotlib inline\nimport matplotlib.pyplot as plt'
    },
    {
      name: 'SQL',
      category: 'Gestión de Datos',
      role: 'Consultas relacionales a gran escala en data warehouses analíticos (BigQuery, PostgreSQL, Snowflake).',
      command: 'SELECT * FROM inference_logs WHERE latency_ms < 10;',
      codeSnippet: 'SELECT date_trunc("hour", timestamp) AS hora,\n       avg(accuracy) AS prec_media\nFROM telemetry_predictions\nGROUP BY 1 ORDER BY 1 DESC;'
    },
    {
      name: 'Docker',
      category: 'Infraestructura',
      role: 'Contenedorización para garantizar inferencias idénticas entre desarrollo local y servidores GPU en la nube.',
      command: 'docker build -t nexus-ai-engine:v4 .',
      codeSnippet: 'FROM nvidia/cuda:12.2.0-base-ubuntu22.04\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install -r requirements.txt\nCMD ["python", "serve.py"]'
    },
    {
      name: 'APIs (FastAPI)',
      category: 'Servicio de Inferencia',
      role: 'Endpoints REST y WebSocket asíncronos de alto rendimiento para exponer modelos en producción.',
      command: 'pip install fastapi uvicorn',
      codeSnippet: 'from fastapi import FastAPI\napp = FastAPI()\n@app.post("/predict")\nasync def infer(payload: dict):\n    return {"prediction": 0.984}'
    },
    {
      name: 'Cloud Computing',
      category: 'Cómputo en la Nube',
      role: 'Orquestación en clusters de GPUs/TPUs en Google Cloud, AWS y Azure para entrenamiento distribuido.',
      command: 'gcloud compute tpus tpu-vm create nexus-node --zone=us-central1-a',
      codeSnippet: '# Despliegue elástico en Kubernetes (GKE / EKS)\nkubectl apply -f triton-inference-server.yaml'
    }
  ];

  const activeTool = technologies.find(t => t.name === selectedTech) || technologies[0];

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(activeTool.codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="tecnologias" className="py-24 relative border-t border-cyan-500/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs tracking-wider">
            <Code className="w-4 h-4" />
            <span>10. ECOSISTEMA TECNOLÓGICO & HERRAMIENTAS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Tecnologías y Stack de Inteligencia Artificial
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            Las librerías, entornos de cómputo y plataformas que sostienen los flujos de trabajo de ingenieros de Machine Learning y científicos de datos a nivel mundial.
          </p>
        </div>

        {/* Interactive Stack Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-8">
          {technologies.map((t) => {
            const isSelected = selectedTech === t.name;
            return (
              <button
                key={t.name}
                onClick={() => setSelectedTech(t.name)}
                className={`p-3.5 rounded-xl text-left transition-all border font-mono ${
                  isSelected
                    ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-[0_0_15px_rgba(0,240,255,0.25)]'
                    : 'bg-[#161b22]/70 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <div className="text-sm font-bold truncate text-white">{t.name}</div>
                <div className="text-[10px] text-slate-400 truncate mt-0.5">{t.category}</div>
              </button>
            );
          })}
        </div>

        {/* Selected Tech Inspector Box */}
        <div className="p-6 rounded-xl bg-[#161b22]/90 border border-cyan-500/25 shadow-xl font-mono">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 mb-4 border-b border-slate-800 gap-3">
            <div>
              <span className="text-[11px] text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-500/30">
                {activeTool.category.toUpperCase()}
              </span>
              <h3 className="text-xl font-bold text-white mt-1">{activeTool.name}</h3>
            </div>
            <div className="text-xs text-slate-400 max-w-lg">
              {activeTool.role}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Command Box */}
            <div className="lg:col-span-4 space-y-2 text-xs">
              <span className="text-slate-400 block">COMANDO DE INSTALACIÓN / EJECUCIÓN:</span>
              <div className="p-3 rounded bg-[#0d1117] border border-slate-800 text-emerald-300 font-mono text-xs select-all">
                $ {activeTool.command}
              </div>
            </div>

            {/* Code Snippet Box */}
            <div className="lg:col-span-8 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">EJEMPLO CANÓNICO DE CÓDIGO:</span>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copiado' : 'Copiar'}</span>
                </button>
              </div>
              <pre className="p-4 rounded-lg bg-[#0d1117] border border-cyan-500/20 text-cyan-100 text-xs leading-relaxed overflow-x-auto">
                <code>{activeTool.codeSnippet}</code>
              </pre>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
