import React, { useState } from 'react';
import { 
  Printer, BookOpen, ChevronDown, ChevronUp, Copy, Check, 
  Lightbulb, AlertTriangle, ArrowRight, Bookmark, Sparkles,
  Download
} from 'lucide-react';
import { weeksCurriculum } from '../data/curriculumData';
import { markdownCheatSheet } from '../data/templatesData';

import heroImg from '../assets/images/obsidian_hero_banner_1791902298835.jpg';
import vaultImg from '../assets/images/vault_concept_diagram_1791902299539.jpg';
import graphImg from '../assets/images/graph_view_concept_1791902299580.jpg';

export const HandbookView: React.FC<{ onPrint: () => void }> = ({ onPrint }) => {
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<string | null>(null);
  const [openSections, setOpenSections] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
  });

  const toggleWeek = (weekNum: number) => {
    setOpenSections(prev => ({ ...prev, [weekNum]: !prev[weekNum] }));
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCodeIndex(id);
    setTimeout(() => setCopiedCodeIndex(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
      
      {/* Handbook Top Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-purple-900 mb-2">
              <span className="w-2 h-2 rounded-full bg-purple-700" />
              <span>คู่มือหลักสูตรฝึกอบรมฉบับสมบูรณ์ (Handout & Trainer Manual)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-2">
              Obsidian 101 สำหรับ Back Office: หลักสูตร 5 สัปดาห์
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
              คู่มือสอนและเรียนรู้แบบละเอียด 101 สำหรับพนักงานธุรการ, บัญชี, จัดซื้อ, บุคคล (Non-IT) ที่ต้องการเปลี่ยนการจดบันทึกกระจัดกระจายสู่ระบบจัดการงานส่วนตัวและสร้างสมองที่สอง (Second Brain)
            </p>
          </div>

          <div className="no-print flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={onPrint}
              className="flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-purple-900 hover:bg-purple-950 rounded-xl transition-colors shadow-sm cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>พิมพ์เอกสารนี้เป็น PDF</span>
            </button>
          </div>
        </div>

        {/* Quick Highlights Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-100 text-xs text-slate-600">
          <div>
            <span className="text-slate-400 block text-[11px]">ระยะเวลาอบรม</span>
            <span className="font-semibold text-slate-800">5 สัปดาห์ (สัปดาห์ละ 60-90 นาที)</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">กลุ่มเป้าหมาย</span>
            <span className="font-semibold text-slate-800">พนักงาน Non-IT ทุกตำแหน่ง</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">ข้อกำหนดพื้นฐาน</span>
            <span className="font-semibold text-slate-800">ไม่ต้องมีพื้นฐานโค้ดหรือไอที</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">ผลลัพธ์ที่ได้</span>
            <span className="font-semibold text-slate-800">คู่มือ SOP & ระบบ Daily Note ส่วนตัว</span>
          </div>
        </div>
      </div>

      {/* Table of Contents Box */}
      <div className="no-print bg-slate-50 rounded-2xl border border-slate-200 p-5">
        <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
          <Bookmark className="w-4 h-4 text-purple-700" />
          <span>สารบัญบทเรียน 5 สัปดาห์ (คลิกเพื่อเลื่อนไปยังบทเรียน)</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
          {weeksCurriculum.map(w => (
            <a
              key={w.weekNumber}
              href={`#week-${w.weekNumber}`}
              className="p-2.5 rounded-lg bg-white border border-slate-200/80 hover:border-purple-600 hover:bg-purple-50/50 transition-all text-left flex items-start gap-2.5 text-xs text-slate-700"
            >
              <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center shrink-0 font-bold text-[11px]">
                {w.weekNumber}
              </span>
              <span className="font-medium text-slate-800 truncate">
                สัปดาห์ที่ {w.weekNumber}: {w.title.split('(')[0]}
              </span>
            </a>
          ))}
          <a
            href="#cheatsheet"
            className="p-2.5 rounded-lg bg-white border border-slate-200/80 hover:border-purple-600 hover:bg-purple-50/50 transition-all text-left flex items-start gap-2.5 text-xs text-slate-700"
          >
            <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 font-bold text-[11px]">
              ★
            </span>
            <span className="font-medium text-slate-800 truncate">
              Markdown Cheat Sheet ฉบับคนออฟฟิศ
            </span>
          </a>
        </div>
      </div>

      {/* 5-Week Modules Breakdown */}
      <div className="flex flex-col gap-8">
        {weeksCurriculum.map(week => {
          const isOpen = openSections[week.weekNumber];
          const weekImage = week.weekNumber === 1 ? vaultImg : week.weekNumber === 3 ? graphImg : week.weekNumber === 5 ? heroImg : null;

          return (
            <section
              key={week.weekNumber}
              id={`week-${week.weekNumber}`}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden scroll-mt-20 page-break"
            >
              {/* Module Header */}
              <div 
                onClick={() => toggleWeek(week.weekNumber)}
                className="p-6 bg-slate-900 text-white flex items-center justify-between cursor-pointer hover:bg-slate-800 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-600/30 border border-purple-400/40 text-purple-300 flex items-center justify-center font-bold text-lg shrink-0">
                    {week.weekNumber}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-xs text-purple-300 font-semibold mb-1">
                      <span>สัปดาห์ที่ {week.weekNumber}</span>
                      <span>·</span>
                      <span>{week.duration}</span>
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                      {week.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1">
                      {week.subtitle}
                    </p>
                  </div>
                </div>

                <div className="no-print text-slate-400 pl-4">
                  {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </div>

              {/* Module Content Body */}
              {isOpen && (
                <div className="p-6 sm:p-8 flex flex-col gap-8">
                  
                  {/* Summary & Learning Outcomes */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                    <div className="md:col-span-7 flex flex-col gap-4">
                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-sm text-slate-700 leading-relaxed">
                        <span className="font-semibold text-slate-900 block mb-1">ภาพรวมบทเรียน:</span>
                        {week.summary}
                      </div>

                      <div>
                        <h4 className="text-xs font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                          <Sparkles className="w-4 h-4 text-purple-700" />
                          <span>สิ่งที่ผู้เรียนจะทำได้หลังจบคลาสนี้ (Learning Outcomes):</span>
                        </h4>
                        <ul className="flex flex-col gap-2">
                          {week.learningOutcomes.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                              <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">
                                ✓
                              </span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Right side visual representation */}
                    <div className="md:col-span-5 flex flex-col gap-3">
                      {weekImage && (
                        <div className="rounded-xl overflow-hidden border border-slate-200 aspect-16/10 bg-slate-100">
                          <img 
                            src={weekImage} 
                            alt={week.title}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      )}
                      
                      {/* Office Analogies Card */}
                      <div className="bg-purple-50/70 rounded-xl border border-purple-200 p-4">
                        <h4 className="text-xs font-bold text-purple-950 mb-2 flex items-center gap-1.5">
                          <Lightbulb className="w-3.5 h-3.5 text-purple-700" />
                          <span>คำเปรียบเทียบฉบับคนออฟฟิศ</span>
                        </h4>
                        <div className="flex flex-col gap-2.5">
                          {week.keyConceptAnalogy.map((analogy, aIdx) => (
                            <div key={aIdx} className="text-xs">
                              <div className="font-semibold text-purple-900">
                                {analogy.term} = {analogy.officeAnalogy}
                              </div>
                              <div className="text-slate-600 text-[11px] leading-relaxed">
                                {analogy.description}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Detailed Sections */}
                  <div className="flex flex-col gap-6 pt-4 border-t border-slate-200">
                    <h3 className="text-base font-bold text-slate-900">
                      เนื้อหาและขั้นตอนการเรียนการสอนอย่างละเอียด
                    </h3>

                    {week.detailedSections.map((section, sIdx) => (
                      <div key={sIdx} className="bg-slate-50/60 rounded-xl border border-slate-200 p-5 flex flex-col gap-3">
                        <h4 className="text-sm font-bold text-slate-900">
                          {section.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                          {section.content}
                        </p>

                        {/* Step list if present */}
                        {section.steps && (
                          <div className="bg-white rounded-lg p-3.5 border border-slate-200 mt-1">
                            <ol className="flex flex-col gap-2">
                              {section.steps.map((st, stepIndex) => (
                                <li key={stepIndex} className="text-xs sm:text-sm text-slate-700 flex items-start gap-2">
                                  <span className="font-bold text-purple-900 shrink-0 font-mono">
                                    {stepIndex + 1}.
                                  </span>
                                  <span>{st}</span>
                                </li>
                              ))}
                            </ol>
                          </div>
                        )}

                        {/* Example Box if present */}
                        {section.exampleBox && (
                          <div className="mt-2 bg-slate-900 rounded-xl p-4 text-xs font-mono text-slate-200 border border-slate-800">
                            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[11px] text-slate-400">
                              <span>{section.exampleBox.title}</span>
                              <button
                                onClick={() => copyToClipboard(section.exampleBox!.code, `sec-${week.weekNumber}-${sIdx}`)}
                                className="flex items-center gap-1 text-purple-400 hover:text-purple-300 cursor-pointer"
                              >
                                {copiedCodeIndex === `sec-${week.weekNumber}-${sIdx}` ? (
                                  <>
                                    <Check className="w-3 h-3 text-emerald-400" />
                                    <span className="text-emerald-400">คัดลอกแล้ว</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3 h-3" />
                                    <span>คัดลอกโค้ด</span>
                                  </>
                                )}
                              </button>
                            </div>
                            <pre className="whitespace-pre-wrap leading-relaxed text-purple-200">
                              {section.exampleBox.code}
                            </pre>
                            <div className="mt-2 pt-2 border-t border-slate-800 text-[11px] text-slate-400 font-sans">
                              💡 {section.exampleBox.previewExplanation}
                            </div>
                          </div>
                        )}

                        {/* Tips list */}
                        {section.tips && (
                          <div className="flex flex-col gap-1 mt-1">
                            {section.tips.map((tip, tIdx) => (
                              <div key={tIdx} className="text-xs text-slate-600 flex items-start gap-1.5">
                                <span className="text-purple-700 font-bold shrink-0">✦</span>
                                <span>{tip}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Warning Note */}
                        {section.warningNote && (
                          <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-900 flex items-start gap-2 mt-1">
                            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                            <span>{section.warningNote}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Hands-on Activity */}
                  <div className="bg-purple-900 text-white rounded-xl p-5 sm:p-6 flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-xs text-purple-300 font-semibold">
                      <span className="px-2 py-0.5 rounded bg-purple-800 text-purple-200">
                        Workshop 15 นาที
                      </span>
                      <span>{week.handsOnExercise.title}</span>
                    </div>
                    <h4 className="text-sm sm:text-base font-bold text-white">
                      วัตถุประสงค์: {week.handsOnExercise.objective}
                    </h4>

                    <div className="bg-purple-950/60 rounded-lg p-4 border border-purple-800/80">
                      <span className="text-xs font-semibold text-purple-200 block mb-2">
                        ขั้นตอนการปฏิบัติในห้องเรียน:
                      </span>
                      <ol className="flex flex-col gap-2">
                        {week.handsOnExercise.instructions.map((inst, insIdx) => (
                          <li key={insIdx} className="text-xs sm:text-sm text-purple-100 flex items-start gap-2">
                            <span className="font-mono text-purple-400 font-bold shrink-0">{insIdx + 1}.</span>
                            <span>{inst}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    <div className="text-xs text-purple-200 pt-1">
                      <span className="font-semibold text-white">ผลลัพธ์ที่ต้องแสดงให้ผู้สอนดู:</span> {week.handsOnExercise.expectedResult}
                    </div>
                  </div>

                  {/* Trainer's Secret Tip */}
                  <div className="p-4 bg-amber-50/80 rounded-xl border border-amber-200 text-xs text-amber-950 flex items-start gap-2.5">
                    <Lightbulb className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-amber-900 block mb-0.5">เคล็ดลับพิเศษสำหรับผู้สอน:</span>
                      <span>{week.trainerTipForWeek}</span>
                    </div>
                  </div>

                </div>
              )}
            </section>
          );
        })}
      </div>

      {/* Markdown Cheat Sheet Table Section */}
      <section id="cheatsheet" className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 page-break">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
          <div>
            <div className="text-xs font-semibold text-purple-900 mb-1">
              แผ่นพับสรุปสำหรับปรินต์ติดโต๊ะทำงาน
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Markdown Cheat Sheet ฉบับคนออฟฟิศ
            </h2>
          </div>
          <button
            onClick={onPrint}
            className="no-print flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-purple-900 bg-purple-50 hover:bg-purple-100 rounded-lg border border-purple-200 transition-colors cursor-pointer shrink-0"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>พิมพ์เฉพาะหน้านี้</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-700">
                <th className="py-3 px-4 font-semibold">สัญลักษณ์ (Syntax)</th>
                <th className="py-3 px-4 font-semibold">ความหมาย / การใช้งาน</th>
                <th className="py-3 px-4 font-semibold">ตัวอย่างข้อความ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {markdownCheatSheet.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50">
                  <td className="py-2.5 px-4 font-mono font-medium text-purple-900 whitespace-nowrap bg-purple-50/30">
                    {item.syntax}
                  </td>
                  <td className="py-2.5 px-4 text-slate-700">
                    {item.meaning}
                  </td>
                  <td className="py-2.5 px-4 font-mono text-slate-600 text-xs">
                    {item.example}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
};
