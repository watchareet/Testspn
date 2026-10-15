import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Workshop2HourView } from './components/Workshop2HourView';
import { Guide101View } from './components/Guide101View';
import { AiObsidianView } from './components/AiObsidianView';
import { SlideDeck } from './components/SlideDeck';
import { HandbookView } from './components/HandbookView';
import { ObsidianSimulator } from './components/ObsidianSimulator';
import { TemplateLibrary } from './components/TemplateLibrary';
import { TrainerPrepGuide } from './components/TrainerPrepGuide';

export default function App() {
  const [activeTab, setActiveTab] = useState<'workshop2h' | 'guide101' | 'ai-obsidian' | 'slides' | 'handbook' | 'simulator' | 'templates' | 'trainer-guide'>('workshop2h');

  const handlePrint = () => {
    // If not in a printable tab, switch to workshop2h or guide101 or ai-obsidian
    if (activeTab !== 'workshop2h' && activeTab !== 'guide101' && activeTab !== 'ai-obsidian' && activeTab !== 'handbook') {
      setActiveTab('workshop2h');
      setTimeout(() => {
        window.print();
      }, 300);
    } else {
      window.print();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      
      {/* Top 3-Zone Navigation */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onPrint={handlePrint} 
      />

      {/* Main View Area */}
      <main className="flex-1 pb-16">
        {activeTab === 'workshop2h' && <Workshop2HourView onPrint={handlePrint} />}
        {activeTab === 'guide101' && <Guide101View onPrint={handlePrint} />}
        {activeTab === 'ai-obsidian' && <AiObsidianView onPrint={handlePrint} />}
        {activeTab === 'slides' && <SlideDeck />}
        {activeTab === 'handbook' && <HandbookView onPrint={handlePrint} />}
        {activeTab === 'simulator' && <ObsidianSimulator />}
        {activeTab === 'templates' && <TemplateLibrary />}
        {activeTab === 'trainer-guide' && <TrainerPrepGuide />}
      </main>

      {/* Footer */}
      <footer className="no-print bg-white border-t border-slate-200 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-800">Obsidian 101 สำหรับ Back Office</span>
            <span>·</span>
            <span>หลักสูตร & แผนการสอนเร่งรัด 2 ชม. รวด + AI Integration</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>คีย์ลัดด่วน: Ctrl + O (Quick Switcher)</span>
            <span>·</span>
            <span>Ctrl + P (Command Palette)</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
