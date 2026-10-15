import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, ChevronRight, Maximize2, Minimize2, 
  MessageSquare, Lightbulb, AlertCircle, Clock, 
  HelpCircle, Sparkles, Check, CheckSquare
} from 'lucide-react';
import { presentationSlides } from '../data/curriculumData';

import heroImg from '../assets/images/obsidian_hero_banner_1791902298835.jpg';
import vaultImg from '../assets/images/vault_concept_diagram_1791902299539.jpg';
import graphImg from '../assets/images/graph_view_concept_1791902299580.jpg';

export const SlideDeck: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [showTrainerNotes, setShowTrainerNotes] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeWeekFilter, setActiveWeekFilter] = useState<number | 'all'>('all');

  const filteredSlides = activeWeekFilter === 'all' 
    ? presentationSlides 
    : presentationSlides.filter(s => s.weekId === activeWeekFilter);

  // Guard against out of bounds when switching filter
  const currentSlide = filteredSlides[currentSlideIndex] || presentationSlides[0];

  const handleNext = () => {
    if (currentSlideIndex < filteredSlides.length - 1) {
      setCurrentSlideIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(prev => prev - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex, filteredSlides.length]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  const weekLabels = [
    { id: 'all', label: 'ทุกสไลด์ (15)' },
    { id: 1, label: 'สัปดาห์ที่ 1: การติดตั้ง & Vault' },
    { id: 2, label: 'สัปดาห์ที่ 2: Markdown 101' },
    { id: 3, label: 'สัปดาห์ที่ 3: การเชื่อมโยง Linking' },
    { id: 4, label: 'สัปดาห์ที่ 4: Daily Notes' },
    { id: 5, label: 'สัปดาห์ที่ 5: PKM & SOP' },
  ];

  const getImageForSlide = () => {
    if (currentSlide.content.visualType === 'vault') {
      return currentSlideIndex === 0 ? heroImg : vaultImg;
    }
    if (currentSlide.content.visualType === 'graph') {
      return graphImg;
    }
    if (currentSlide.content.visualType === 'pkm') {
      return vaultImg;
    }
    return null;
  };

  const slideImage = getImageForSlide();

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Top Slide Deck Bar: Week filter & mode toggles */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-3 rounded-xl border border-slate-200">
        
        {/* Week Segmented Filter Buttons */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
          {weekLabels.map(item => (
            <button
              key={item.id}
              onClick={() => {
                setActiveWeekFilter(item.id as number | 'all');
                setCurrentSlideIndex(0);
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeWeekFilter === item.id
                  ? 'bg-purple-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* View Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setShowTrainerNotes(!showTrainerNotes)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
              showTrainerNotes
                ? 'bg-amber-50 border-amber-300 text-amber-900'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
            title="เปิด/ปิด แผงสคริปต์คำพูดผู้สอนและเทคนิคการอธิบาย"
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
            <span>{showTrainerNotes ? 'ซ่อนโน้ตผู้สอน' : 'ดูโน้ตผู้สอน'}</span>
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 cursor-pointer"
            title="เต็มจอ (Fullscreen)"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>

      </div>

      {/* Main Slide & Presenter Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left/Main Column: 16:9 Presentation Canvas */}
        <div className={`${showTrainerNotes ? 'lg:col-span-8' : 'lg:col-span-12'} flex flex-col gap-4`}>
          
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col min-h-[540px]">
            
            {/* Slide Header metadata */}
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-3 text-xs">
                <span className="font-semibold text-purple-300">
                  สัปดาห์ที่ {currentSlide.weekId}
                </span>
                <span className="text-slate-500">·</span>
                <span className="text-slate-300">
                  สไลด์ที่ {currentSlideIndex + 1} จาก {filteredSlides.length}
                </span>
              </div>
              <div className="text-xs text-slate-400 font-mono">
                Obsidian for Back Office 101
              </div>
            </div>

            {/* Slide Body */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
              <div>
                
                {/* Title & Subtitle */}
                <div className="mb-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-2">
                    {currentSlide.title}
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600">
                    {currentSlide.subtitle}
                  </p>
                </div>

                {/* Content grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  
                  {/* Left Bullet Points */}
                  <div className={`${slideImage || currentSlide.content.markdownSample || currentSlide.content.stepList ? 'md:col-span-7' : 'md:col-span-12'} flex flex-col gap-4`}>
                    
                    <div className="p-4 bg-purple-50/60 rounded-xl border border-purple-100 text-sm text-purple-950 leading-relaxed">
                      {currentSlide.content.explanation}
                    </div>

                    <ul className="flex flex-col gap-3">
                      {currentSlide.content.keyPoints.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                          <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center shrink-0 mt-0.5 text-xs font-semibold">
                            {idx + 1}
                          </span>
                          <span className="leading-relaxed">{point}</span>
                        </li>
                      ))}
                    </ul>

                  </div>

                  {/* Right Visual / Code Box */}
                  <div className="md:col-span-5 flex flex-col gap-4">
                    
                    {slideImage && (
                      <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-100 aspect-16/10">
                        <img 
                          src={slideImage} 
                          alt={currentSlide.title}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent flex items-end p-3">
                          <span className="text-xs text-white font-medium">
                            {currentSlide.title}
                          </span>
                        </div>
                      </div>
                    )}

                    {currentSlide.content.markdownSample && (
                      <div className="bg-slate-900 rounded-xl p-4 text-xs font-mono text-slate-200 border border-slate-800 overflow-x-auto shadow-inner">
                        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[11px] text-slate-400">
                          <span>ตัวอย่าง Markdown</span>
                          <span className="text-purple-400">.md</span>
                        </div>
                        <pre className="whitespace-pre-wrap leading-relaxed text-purple-200">
                          {currentSlide.content.markdownSample}
                        </pre>
                      </div>
                    )}

                    {currentSlide.content.stepList && (
                      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                        <h4 className="text-xs font-semibold text-slate-800 mb-3 flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>ลำดับขั้นตอนการปฏิบัติ</span>
                        </h4>
                        <ol className="flex flex-col gap-2">
                          {currentSlide.content.stepList.map((step, sIdx) => (
                            <li key={sIdx} className="text-xs text-slate-700 flex items-start gap-2">
                              <span className="font-mono text-purple-700 font-bold shrink-0">{sIdx + 1}.</span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    )}

                  </div>

                </div>

              </div>

              {/* Bottom slide footer indicator */}
              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span>กดปุ่มลูกศร ซ้าย/ขวา หรือ Spacebar เพื่อเปลี่ยนสไลด์</span>
                <span className="font-mono">{currentSlideIndex + 1} / {filteredSlides.length}</span>
              </div>

            </div>

            {/* Navigation Bar inside Slide Deck */}
            <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex items-center justify-between">
              
              <button
                onClick={handlePrev}
                disabled={currentSlideIndex === 0}
                className="flex items-center gap-1 px-4 py-2 text-xs font-medium rounded-lg border border-slate-200 text-slate-700 hover:bg-white disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>สไลด์ก่อนหน้า</span>
              </button>

              {/* Slide Progress Dots / Mini Jump */}
              <div className="flex items-center gap-1.5 max-w-[200px] sm:max-w-md overflow-x-auto py-1">
                {filteredSlides.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => setCurrentSlideIndex(idx)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      idx === currentSlideIndex 
                        ? 'w-6 bg-purple-900' 
                        : 'w-2 bg-slate-300 hover:bg-slate-400'
                    }`}
                    title={`สไลด์ที่ ${idx + 1}: ${s.title}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                disabled={currentSlideIndex === filteredSlides.length - 1}
                className="flex items-center gap-1 px-4 py-2 text-xs font-medium rounded-lg bg-purple-900 text-white hover:bg-purple-950 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer shadow-xs"
              >
                <span>สไลด์ถัดไป</span>
                <ChevronRight className="w-4 h-4" />
              </button>

            </div>

          </div>

        </div>

        {/* Right Column: Speaker Notes & Trainer Script Drawer */}
        {showTrainerNotes && (
          <div className="lg:col-span-4 flex flex-col gap-4">
            
            <div className="bg-amber-50/70 rounded-2xl border border-amber-200 p-5 shadow-xs flex flex-col gap-5">
              
              <div className="flex items-center justify-between pb-3 border-b border-amber-200/80">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold text-xs">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-amber-950">
                      สคริปต์ & โน้ตผู้สอน
                    </h3>
                    <p className="text-[11px] text-amber-800">
                      คู่มือพูดและตอบคำถามสำหรับผู้สอนมือใหม่
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-mono text-amber-800">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{currentSlide.trainerNotes.handsOnTime}</span>
                </div>
              </div>

              {/* 1. Talking Script */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-950">
                  <MessageSquare className="w-3.5 h-3.5 text-amber-700" />
                  <span>สคริปต์คำพูดผู้สอน (อ่านตามนี้ได้เลย):</span>
                </div>
                <div className="p-3 bg-white/90 rounded-xl border border-amber-200 text-xs text-slate-800 leading-relaxed shadow-xs">
                  "{currentSlide.trainerNotes.talkingScript}"
                </div>
              </div>

              {/* 2. Real World Analogy */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-950">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-700" />
                  <span>คำเปรียบเทียบชีวิตจริง (ช่วยให้คน Non-IT ร้องอ๋อ):</span>
                </div>
                <div className="p-3 bg-white/90 rounded-xl border border-amber-200 text-xs text-slate-700 leading-relaxed">
                  💡 {currentSlide.trainerNotes.analogy}
                </div>
              </div>

              {/* 3. Icebreaker Question */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-950">
                  <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
                  <span>คำถามชวนคิดเปิดคลาส (กระตุ้นการมีส่วนร่วม):</span>
                </div>
                <div className="p-3 bg-white/90 rounded-xl border border-amber-200 text-xs text-slate-700 leading-relaxed italic">
                  🗣️ "{currentSlide.trainerNotes.questionToAsk}"
                </div>
              </div>

              {/* 4. Common Mistake to Watch Out */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-900">
                  <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                  <span>จุดที่คนเรียนมักทำพลาด / ติดขัด:</span>
                </div>
                <div className="p-3 bg-rose-50/80 rounded-xl border border-rose-200 text-xs text-rose-950 leading-relaxed">
                  ⚠️ {currentSlide.trainerNotes.commonMistake}
                </div>
              </div>

            </div>

            {/* Quick Tips for Trainer */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 text-xs text-slate-600 flex flex-col gap-2">
              <span className="font-semibold text-slate-900">เคล็ดลับการสอนคน Non-IT:</span>
              <p className="leading-relaxed">
                อย่ารีบข้ามสไลด์ ให้เวลากับทุกคนได้พิมพ์ตามจริง หากใครทำไม่ได้ให้เพื่อนข้างๆ ช่วย หรือลงไปช่วยจับมือทำ 1 ครั้ง ผู้เรียนจะมีความมั่นใจทันที
              </p>
            </div>

          </div>
        )}

      </div>

      {/* Quick Slide Grid Navigator at the bottom */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-purple-700" />
            <span>สารบัญสไลด์ทั้งหมด ({presentationSlides.length} สไลด์)</span>
          </h3>
          <span className="text-xs text-slate-500">คลิกที่การ์ดเพื่อกระโดดไปยังสไลด์นั้น</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {presentationSlides.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => {
                setActiveWeekFilter('all');
                setCurrentSlideIndex(idx);
              }}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                currentSlide.id === s.id
                  ? 'border-purple-800 bg-purple-50 ring-1 ring-purple-800'
                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] mb-1">
                <span className="font-semibold text-purple-900">สัปดาห์ที่ {s.weekId}</span>
                <span className="text-slate-400 font-mono">#{idx + 1}</span>
              </div>
              <h4 className="text-xs font-medium text-slate-800 truncate">
                {s.title}
              </h4>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};
