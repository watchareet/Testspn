import React, { useState } from 'react';
import { 
  CheckCircle2, AlertTriangle, Lightbulb, MessageSquare, 
  Monitor, Users, Sparkles, Printer, ShieldCheck, 
  BookOpen, HelpCircle, ArrowRight, Bookmark, Compass
} from 'lucide-react';
import { workshop2HourPhases, trainerSurvivalRules } from '../data/workshop2HourData';

export const Workshop2HourView: React.FC<{ onPrint: () => void }> = ({ onPrint }) => {
  const [selectedPhaseIndex, setSelectedPhaseIndex] = useState<number>(0);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const currentPhase = workshop2HourPhases[selectedPhaseIndex] || workshop2HourPhases[0];

  const toggleChecklist = (key: string) => {
    setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">
      
      {/* Top Banner Card: Relaxed & Encouraging without any ticking timer */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-900 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-purple-700" />
            <span>หลักสูตรเวิร์กช็อป 2 ชั่วโมงรวด (เนื้อหาแน่น ทำตามได้สบายๆ ไม่เร่งรัด)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            แผนการสอน Obsidian 101 สำหรับคน Back Office (ฉบับ 2 ชม. ละเอียด)
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
            เนื้อหาครอบคลุมครบถ้วนตั้งแต่ติดตั้ง พิมพ์ Markdown เชื่อมโยงความคิด จนถึงการสร้าง Daily Notes และก๊อปปี้แม่แบบไปใช้งานจริง มีสคริปต์คำพูด ตัวอย่างงานออฟฟิศ และคำถามชวนคิดให้ผู้สอนดำเนินคลาสได้อย่างมั่นใจ
          </p>
        </div>

        <div className="no-print flex items-center gap-3 shrink-0">
          <button
            onClick={onPrint}
            className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-purple-900 hover:bg-purple-950 rounded-xl transition-colors shadow-xs cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>พิมพ์แผนการสอน 2 ชม.</span>
          </button>
        </div>
      </div>

      {/* 4 Golden Survival Rules for the Trainer */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-950 text-white rounded-2xl p-6 shadow-xs flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-purple-300" />
          <h2 className="text-base sm:text-lg font-bold text-white">
            4 กฎเหล็กสำหรับผู้สอนมือใหม่ (ให้คลาส 2 ชั่วโมงราบรื่น สบายใจทั้งผู้สอนและผู้เรียน)
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {trainerSurvivalRules.map((rule, rIdx) => (
            <div key={rIdx} className="p-3.5 rounded-xl bg-white/10 border border-white/10 backdrop-blur-sm flex flex-col gap-1.5">
              <span className="font-bold text-purple-200">{rule.rule}</span>
              <p className="text-purple-100 text-[11px] leading-relaxed">
                {rule.explanation}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline Selector Strip: Stress-free Milestones */}
      <div className="no-print bg-slate-50 p-2 rounded-2xl border border-slate-200 overflow-x-auto">
        <div className="flex items-center gap-2 min-w-max">
          {workshop2HourPhases.map((phase, idx) => {
            const isSelected = selectedPhaseIndex === idx;
            return (
              <button
                key={phase.phaseNumber}
                onClick={() => setSelectedPhaseIndex(idx)}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-purple-900 text-white font-semibold shadow-xs'
                    : 'text-slate-700 hover:bg-white hover:text-slate-900'
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${
                  isSelected ? 'bg-purple-800 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  {phase.phaseNumber}
                </span>
                <span>{phase.title.split(': ')[0]}</span>
                <span className="opacity-75">({phase.timeRange.replace('ตอนที่ ' + phase.phaseNumber + ' ', '')})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Phase Detail Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Phase Overview Navigation Sidebar */}
        <div className="no-print hidden lg:flex lg:col-span-4 flex-col gap-3">
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col gap-1.5">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
              โครงสร้างบทเรียน 7 ตอน
            </span>
            {workshop2HourPhases.map((phase, idx) => {
              const isSelected = selectedPhaseIndex === idx;
              return (
                <button
                  key={phase.phaseNumber}
                  onClick={() => setSelectedPhaseIndex(idx)}
                  className={`text-left p-3 rounded-xl transition-all flex items-start gap-3 cursor-pointer ${
                    isSelected 
                      ? 'bg-purple-50 text-purple-950 border border-purple-200/80 shadow-2xs' 
                      : 'text-slate-700 hover:bg-slate-50 border border-transparent'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold ${
                    isSelected ? 'bg-purple-900 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {phase.phaseNumber}
                  </div>
                  <div>
                    <div className="text-xs font-semibold">
                      {phase.title.split(': ')[1]}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      {phase.timeRange}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Golden Analogy for the Phase */}
          <div className="bg-purple-50/80 rounded-2xl border border-purple-200 p-4.5 text-xs text-purple-950 flex flex-col gap-2">
            <div className="flex items-center gap-1.5 font-bold text-purple-900">
              <Lightbulb className="w-4 h-4 text-purple-700" />
              <span>ภาพเปรียบเทียบชวนคิดประจำตอนนี้:</span>
            </div>
            <p className="text-slate-700 leading-relaxed text-[11px]">
              💡 {currentPhase.analogy}
            </p>
          </div>
        </div>

        {/* Right Phase Detailed Trainer Guide */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <article className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col gap-6">
            
            {/* Header of Active Phase */}
            <div className="pb-6 border-b border-slate-100 flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold text-purple-900">
                  {currentPhase.title.split(': ')[0]}
                </span>
                <span className="font-mono text-purple-700 font-semibold bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-100">
                  {currentPhase.timeRange}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                {currentPhase.title.split(': ')[1]}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                {currentPhase.subtitle}
              </p>

              {/* Concept Deep Dive Card */}
              <div className="mt-3 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <span className="font-bold text-slate-900 block mb-1">สาระสำคัญประจำช่วง:</span>
                {currentPhase.conceptDeepDive}
              </div>
            </div>

            {/* 1. Trainer Talking Script */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-purple-950">
                <MessageSquare className="w-4 h-4 text-purple-700" />
                <span>คำพูดสำหรับผู้สอน (สไตล์เป็นกันเอง พูดตามนี้ได้ทันที):</span>
              </div>
              <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-200 text-xs sm:text-sm text-purple-950 leading-relaxed italic">
                "{currentPhase.trainerScript}"
              </div>
            </div>

            {/* 2. Trainer Action vs Students Action (2-Column Grid) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col gap-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                  <Monitor className="w-3.5 h-3.5 text-purple-700" />
                  <span>สิ่งที่ผู้สอนฉายหน้าจอ:</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {currentPhase.trainerAction}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col gap-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                  <Users className="w-3.5 h-3.5 text-emerald-700" />
                  <span>สิ่งที่ผู้เรียนลงมือทำบนจอตัวเอง:</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {currentPhase.studentsAction}
                </p>
              </div>
            </div>

            {/* 3. Detailed Walkthrough Steps with Office Examples */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-purple-700" />
                <span>ขั้นตอนการสาธิตอย่างละเอียด & ตัวอย่างงานออฟฟิศจริง:</span>
              </span>

              <div className="flex flex-col gap-3">
                {currentPhase.detailedWalkthroughSteps.map((st, stIdx) => (
                  <div key={stIdx} className="p-4 rounded-xl bg-slate-50/70 border border-slate-200 flex flex-col gap-2">
                    <div className="text-xs font-bold text-slate-900">
                      {st.stepName}
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {st.actionDetail}
                    </p>
                    {st.officeExample && (
                      <div className="text-[11px] text-purple-900 bg-purple-50 p-2.5 rounded-lg border border-purple-100">
                        💼 <strong>ตัวอย่างงานออฟฟิศ:</strong> {st.officeExample}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Interactive Discussion Prompt */}
            <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 flex items-start gap-3">
              <HelpCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-950">
                <span className="font-bold block mb-0.5">คำถามชวนคุยกับผู้เรียน (เปิดบทสนทนา):</span>
                <span className="italic">"{currentPhase.interactiveDiscussionPrompt}"</span>
              </div>
            </div>

            {/* 5. Danger Zone & Quick Fix */}
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 flex flex-col gap-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-rose-950">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>จุดที่ผู้เรียนอาจติดขัด & วิธีแก้ไขทันที:</span>
              </div>
              <div className="text-xs text-rose-900">
                <strong>ปัญหาที่พบบ่อย:</strong> {currentPhase.dangerZone.issue}
              </div>
              <div className="text-xs text-emerald-900 bg-emerald-50 p-2.5 rounded-lg border border-emerald-200 font-medium">
                ✅ <strong>วิธีช่วยแก้:</strong> {currentPhase.dangerZone.quickFix}
              </div>
            </div>

            {/* 6. Phase Checklist */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col gap-3">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>เช็กลิสต์ความสำเร็จก่อนข้ามไปตอนถัดไป:</span>
              </span>
              <div className="flex flex-col gap-2">
                {currentPhase.checklist.map((item, cIdx) => {
                  const checkKey = `phase-${currentPhase.phaseNumber}-check-${cIdx}`;
                  const isChecked = !!checkedItems[checkKey];
                  return (
                    <div 
                      key={cIdx}
                      onClick={() => toggleChecklist(checkKey)}
                      className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer hover:text-slate-900"
                    >
                      <input 
                        type="checkbox" 
                        checked={isChecked} 
                        readOnly 
                        className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500 cursor-pointer"
                      />
                      <span className={isChecked ? 'line-through opacity-60' : ''}>
                        {item}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Phase Navigation Buttons */}
            <div className="no-print pt-6 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => setSelectedPhaseIndex(Math.max(0, selectedPhaseIndex - 1))}
                disabled={selectedPhaseIndex === 0}
                className="px-4 py-2 text-xs font-medium rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
              >
                ← ตอนก่อนหน้า
              </button>

              <span className="text-xs text-slate-400 font-mono">
                ตอนที่ {selectedPhaseIndex + 1} จาก {workshop2HourPhases.length}
              </span>

              <button
                onClick={() => setSelectedPhaseIndex(Math.min(workshop2HourPhases.length - 1, selectedPhaseIndex + 1))}
                disabled={selectedPhaseIndex === workshop2HourPhases.length - 1}
                className="px-4 py-2 text-xs font-medium rounded-xl bg-purple-900 text-white hover:bg-purple-950 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer shadow-xs"
              >
                ตอนถัดไป →
              </button>
            </div>

          </article>
        </div>

      </div>

      {/* Print-Only: All 7 Phases for PDF Teaching Sheet */}
      <div className="print-only hidden flex flex-col gap-6">
        <div className="border-b-2 border-slate-900 pb-3 mb-4">
          <h1 className="text-2xl font-bold">แผนการสอน Obsidian 101 สำหรับ Back Office (หลักสูตร 2 ชม. ฉบับละเอียด)</h1>
          <p className="text-xs text-slate-600">คู่มือกำกับเนื้อหา สคริปต์คำพูด และตัวอย่างงานออฟฟิศจริงสำหรับผู้สอน</p>
        </div>

        {workshop2HourPhases.map(ph => (
          <div key={ph.phaseNumber} className="page-break p-5 border border-slate-300 rounded-xl flex flex-col gap-3">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="text-base font-bold">{ph.title}</h3>
              <span className="text-xs font-mono font-bold">{ph.timeRange}</span>
            </div>
            <div className="text-xs text-slate-700">
              <strong>สาระสำคัญ:</strong> {ph.conceptDeepDive}
            </div>
            <div className="bg-purple-50 p-3 rounded text-xs italic">
              <strong>สคริปต์ผู้สอน:</strong> "{ph.trainerScript}"
            </div>
            <div className="text-xs">
              <strong>หน้าจอผู้สอน:</strong> {ph.trainerAction} | <strong>ผู้เรียน:</strong> {ph.studentsAction}
            </div>
            <div className="text-xs flex flex-col gap-1">
              <strong>ขั้นตอนสาธิต:</strong>
              {ph.detailedWalkthroughSteps.map((s, idx) => (
                <div key={idx} className="pl-2">
                  • {s.stepName}: {s.actionDetail}
                </div>
              ))}
            </div>
            <div className="text-xs">
              <strong>จุดที่อาจติดขัด & ทางแก้:</strong> {ph.dangerZone.issue} ➔ {ph.dangerZone.quickFix}
            </div>
            <div className="text-xs">
              <strong>เช็กลิสต์:</strong> {ph.checklist.join(' · ')}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
