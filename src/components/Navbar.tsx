import React from 'react';
import { Presentation, BookOpen, PenTool, FileText, HelpCircle, Printer, Clock, Compass, Sparkles } from 'lucide-react';

interface NavbarProps {
  activeTab: 'guide101' | 'workshop2h' | 'ai-obsidian' | 'slides' | 'handbook' | 'simulator' | 'templates' | 'trainer-guide';
  setActiveTab: (tab: 'guide101' | 'workshop2h' | 'ai-obsidian' | 'slides' | 'handbook' | 'simulator' | 'templates' | 'trainer-guide') => void;
  onPrint: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onPrint }) => {
  return (
    <header className="no-print sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-purple-900 text-purple-100 flex items-center justify-center font-bold text-lg shadow-sm">
            O
          </div>
          <button 
            onClick={() => setActiveTab('guide101')}
            className="text-left cursor-pointer focus:outline-none"
          >
            <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap block">
              Obsidian 101 สำหรับ Back Office
            </span>
          </button>
        </div>

        {/* Zone 2: 4-5 clean single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            onClick={() => setActiveTab('workshop2h')}
            className={`flex items-center gap-1.5 pb-0.5 border-b-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'workshop2h'
                ? 'border-purple-700 text-purple-900 font-semibold'
                : 'border-transparent hover:text-slate-900 hover:border-slate-300'
            }`}
          >
            <Compass className="w-4 h-4 text-purple-700" />
            <span>หลักสูตร 2 ชม. (ฉบับละเอียด)</span>
          </button>

          <button
            onClick={() => setActiveTab('guide101')}
            className={`flex items-center gap-1.5 pb-0.5 border-b-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'guide101'
                ? 'border-purple-700 text-purple-900 font-semibold'
                : 'border-transparent hover:text-slate-900 hover:border-slate-300'
            }`}
          >
            <BookOpen className="w-4 h-4 text-purple-700" />
            <span>คู่มือ 101 (8 ขั้นตอน)</span>
          </button>

          <button
            onClick={() => setActiveTab('ai-obsidian')}
            className={`flex items-center gap-1.5 pb-0.5 border-b-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'ai-obsidian'
                ? 'border-purple-700 text-purple-900 font-semibold'
                : 'border-transparent hover:text-slate-900 hover:border-slate-300'
            }`}
          >
            <Sparkles className="w-4 h-4 text-purple-700" />
            <span>AI + Obsidian</span>
          </button>

          <button
            onClick={() => setActiveTab('slides')}
            className={`flex items-center gap-1.5 pb-0.5 border-b-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'slides'
                ? 'border-purple-700 text-purple-900 font-semibold'
                : 'border-transparent hover:text-slate-900 hover:border-slate-300'
            }`}
          >
            <Presentation className="w-4 h-4 text-purple-700" />
            <span>สไลด์สอน (Slides)</span>
          </button>

          <button
            onClick={() => setActiveTab('handbook')}
            className={`flex items-center gap-1.5 pb-0.5 border-b-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'handbook'
                ? 'border-purple-700 text-purple-900 font-semibold'
                : 'border-transparent hover:text-slate-900 hover:border-slate-300'
            }`}
          >
            <FileText className="w-4 h-4 text-purple-700" />
            <span>หลักสูตร 5 สัปดาห์</span>
          </button>

          <button
            onClick={() => setActiveTab('simulator')}
            className={`flex items-center gap-1.5 pb-0.5 border-b-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'simulator'
                ? 'border-purple-700 text-purple-900 font-semibold'
                : 'border-transparent hover:text-slate-900 hover:border-slate-300'
            }`}
          >
            <PenTool className="w-4 h-4 text-purple-700" />
            <span>ห้องทดลองพิมพ์</span>
          </button>

          <button
            onClick={() => setActiveTab('templates')}
            className={`flex items-center gap-1.5 pb-0.5 border-b-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'templates'
                ? 'border-purple-700 text-purple-900 font-semibold'
                : 'border-transparent hover:text-slate-900 hover:border-slate-300'
            }`}
          >
            <FileText className="w-4 h-4 text-purple-700" />
            <span>คลังแม่แบบ</span>
          </button>

          <button
            onClick={() => setActiveTab('trainer-guide')}
            className={`flex items-center gap-1.5 pb-0.5 border-b-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'trainer-guide'
                ? 'border-purple-700 text-purple-900 font-semibold'
                : 'border-transparent hover:text-slate-900 hover:border-slate-300'
            }`}
          >
            <HelpCircle className="w-4 h-4 text-purple-700" />
            <span>โน้ตผู้สอน</span>
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onPrint}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-white bg-purple-900 hover:bg-purple-950 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm cursor-pointer"
            title="พิมพ์หรือบันทึกเป็นไฟล์ PDF สำหรับแจกผู้เรียน"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>พิมพ์คู่มือเป็น PDF</span>
          </button>
        </div>

      </div>

      {/* Mobile nav bar row for small screens */}
      <div className="lg:hidden flex overflow-x-auto border-t border-slate-200 px-3 py-2 gap-2 text-xs bg-slate-50">
        <button
          onClick={() => setActiveTab('workshop2h')}
          className={`px-3 py-1.5 rounded-md whitespace-nowrap cursor-pointer ${
            activeTab === 'workshop2h' ? 'bg-purple-900 text-white font-medium' : 'text-slate-600 hover:bg-slate-200'
          }`}
        >
          แผนสอน 2 ชม.
        </button>
        <button
          onClick={() => setActiveTab('guide101')}
          className={`px-3 py-1.5 rounded-md whitespace-nowrap cursor-pointer ${
            activeTab === 'guide101' ? 'bg-purple-900 text-white font-medium' : 'text-slate-600 hover:bg-slate-200'
          }`}
        >
          คู่มือ 101
        </button>
        <button
          onClick={() => setActiveTab('ai-obsidian')}
          className={`px-3 py-1.5 rounded-md whitespace-nowrap cursor-pointer ${
            activeTab === 'ai-obsidian' ? 'bg-purple-900 text-white font-medium' : 'text-slate-600 hover:bg-slate-200'
          }`}
        >
          AI + Obsidian
        </button>
        <button
          onClick={() => setActiveTab('slides')}
          className={`px-3 py-1.5 rounded-md whitespace-nowrap cursor-pointer ${
            activeTab === 'slides' ? 'bg-purple-900 text-white font-medium' : 'text-slate-600 hover:bg-slate-200'
          }`}
        >
          สไลด์สอน
        </button>
        <button
          onClick={() => setActiveTab('handbook')}
          className={`px-3 py-1.5 rounded-md whitespace-nowrap ${
            activeTab === 'handbook' ? 'bg-purple-900 text-white font-medium' : 'text-slate-600 hover:bg-slate-200'
          }`}
        >
          คู่มือบทเรียน
        </button>
        <button
          onClick={() => setActiveTab('simulator')}
          className={`px-3 py-1.5 rounded-md whitespace-nowrap ${
            activeTab === 'simulator' ? 'bg-purple-900 text-white font-medium' : 'text-slate-600 hover:bg-slate-200'
          }`}
        >
          ห้องทดลองพิมพ์
        </button>
        <button
          onClick={() => setActiveTab('templates')}
          className={`px-3 py-1.5 rounded-md whitespace-nowrap ${
            activeTab === 'templates' ? 'bg-purple-900 text-white font-medium' : 'text-slate-600 hover:bg-slate-200'
          }`}
        >
          คลังแม่แบบ
        </button>
        <button
          onClick={() => setActiveTab('trainer-guide')}
          className={`px-3 py-1.5 rounded-md whitespace-nowrap ${
            activeTab === 'trainer-guide' ? 'bg-purple-900 text-white font-medium' : 'text-slate-600 hover:bg-slate-200'
          }`}
        >
          คู่มือผู้สอน
        </button>
      </div>
    </header>
  );
};
