/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CanvasBackground } from './components/CanvasBackground';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ConceptsSection } from './components/ConceptsSection';
import { MachineLearningSection } from './components/MachineLearningSection';
import { DataScienceSection } from './components/DataScienceSection';
import { NeuralNetworkSection } from './components/NeuralNetworkSection';
import { GenerativeAiSection } from './components/GenerativeAiSection';
import { PlaygroundSection } from './components/PlaygroundSection';
import { DashboardSection } from './components/DashboardSection';
import { CybersecuritySection } from './components/CybersecuritySection';
import { ApplicationsSection } from './components/ApplicationsSection';
import { TechStackSection } from './components/TechStackSection';
import { EthicsFutureSection } from './components/EthicsFutureSection';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { Footer } from './components/Footer';

export default function App() {
  const [terminalOpen, setTerminalOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-[#0d1117] text-slate-100 relative selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Interactive Canvas 2D Background (Neural particles / Matrix code rain) */}
      <CanvasBackground />

      {/* Fixed Cyberpunk Matrix Navigation Header */}
      <Navbar onOpenTerminal={() => setTerminalOpen(true)} />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <HeroSection />
        <ConceptsSection />
        <MachineLearningSection />
        <DataScienceSection />
        <NeuralNetworkSection />
        <GenerativeAiSection />
        <PlaygroundSection />
        <DashboardSection />
        <CybersecuritySection />
        <ApplicationsSection />
        <TechStackSection />
        <EthicsFutureSection />
      </main>

      {/* Simulated Matrix Cyberpunk CLI Terminal Modal */}
      <InteractiveTerminal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
      />

      {/* Comprehensive Footer with Single-File Exporter */}
      <Footer />
    </div>
  );
}
