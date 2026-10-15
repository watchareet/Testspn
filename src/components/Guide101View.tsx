import React, { useState } from 'react';
import { 
  Download, FolderArchive, FilePlus, Type, Link2, 
  GitPullRequest, FolderTree, Award, Printer, Check, 
  Copy, Lightbulb, AlertTriangle, ArrowRight, Bookmark,
  Clock, Sparkles, CheckCircle2
} from 'lucide-react';
import { guide101Chapters } from '../data/guide101Data';

export const Guide101View: React.FC<{ onPrint: () => void }> = ({ onPrint }) => {
  const [activeChapterId, setActiveChapterId] = useState<number>(1);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const activeChapter = guide101Chapters.find(c => c.id === activeChapterId) || guide101Chapters[0];

  const copyCode = (code: string, key: string) => {
    navigator.clipboard.writeText(code);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const getChapterIcon = (id: number) => {
    switch (id) {
      case 1: return <Download className="w-4 h-4" />;
      case 2: return <FolderArchive className="w-4 h-4" />;
      case 3: return <FilePlus className="w-4 h-4" />;
      case 4: return <Type className="w-4 h-4" />;
      case 5: return <Link2 className="w-4 h-4" />;
      case 6: return <GitPullRequest className="w-4 h-4" />;
      case 7: return <FolderTree className="w-4 h-4" />;
      case 8: return <Award className="w-4 h-4" />;
      default: return <Bookmark className="w-4 h-4" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">
      
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-900 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-purple-700" />
            <span>คู่มือการใช้งานฉบับเริ่มต้น (Obsidian 101 for Non-IT)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            คู่มือ Obsidian 101 สำหรับสายงาน Back Office
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
            คู่มือ 8 ขั้นตอนเริ่มต้นแบบจับมือทำ ละเอียด ชัดเจน และเข้าใจง่ายเป็นภาษาไทย ออกแบบมาเพื่อคนทำงานเอกสาร ธุรการ บัญชี จัดซื้อ บุคคล โดยเฉพาะ
          </p>
        </div>

        <div className="no-print flex items-center gap-3 shrink-0">
          <button
            onClick={onPrint}
            className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-purple-900 hover:bg-purple-950 rounded-xl transition-colors shadow-xs cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>พิมพ์คู่มือ 101 เป็น PDF</span>
          </button>
        </div>
      </div>

      {/* Chapter Navigation Strip */}
      <div className="no-print bg-slate-50 p-2 rounded-2xl border border-slate-200 overflow-x-auto">
        <div className="flex items-center gap-1.5 min-w-max">
          {guide101Chapters.map(ch => (
            <button
              key={ch.id}
              onClick={() => setActiveChapterId(ch.id)}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                activeChapterId === ch.id
                  ? 'bg-purple-900 text-white shadow-xs font-semibold'
                  : 'text-slate-600 hover:bg-white hover:text-slate-900'
              }`}
            >
              <span>{ch.id}.</span>
              <span>{ch.title.split('. ')[1]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Chapter Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: Chapter Navigation Sidebar for Desktop */}
        <div className="no-print hidden lg:flex lg:col-span-4 flex-col gap-3">
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col gap-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
              หัวข้อการเรียนรู้ 8 บท
            </h3>
            <div className="flex flex-col gap-1">
              {guide101Chapters.map(ch => {
                const isActive = activeChapterId === ch.id;
                return (
                  <button
                    key={ch.id}
                    onClick={() => setActiveChapterId(ch.id)}
                    className={`text-left p-3 rounded-xl transition-all flex items-start gap-3 cursor-pointer ${
                      isActive 
                        ? 'bg-purple-50 text-purple-950 border border-purple-200/80 shadow-2xs' 
                        : 'text-slate-700 hover:bg-slate-50 border border-transparent'
                    }`}
                  >
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 text-xs ${
                      isActive ? 'bg-purple-900 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {getChapterIcon(ch.id)}
                    </div>
                    <div>
                      <div className="text-xs font-semibold">
                        {ch.title}
                      </div>
                      <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                        {ch.subtitle}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Analogy Card */}
          <div className="bg-purple-50/80 rounded-2xl border border-purple-200 p-4.5 text-xs text-purple-950 flex flex-col gap-2">
            <div className="flex items-center gap-1.5 font-bold text-purple-900">
              <Lightbulb className="w-4 h-4 text-purple-700" />
              <span>ภาพเปรียบเทียบประจำบทนี้:</span>
            </div>
            <p className="text-slate-700 leading-relaxed">
              💡 {activeChapter.analogy}
            </p>
          </div>
        </div>

        {/* Right Side: Chapter Detailed Reader */}
        <div className="no-print lg:col-span-8 flex flex-col gap-6">
          
          <article className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col gap-6">
            
            {/* Chapter Header */}
            <div className="pb-6 border-b border-slate-100">
              <div className="flex items-center justify-between gap-4 text-xs text-slate-500 mb-2">
                <span className="font-semibold text-purple-800">
                  บทที่ {activeChapter.id} จาก 8 บท
                </span>
                <span className="flex items-center gap-1 text-slate-400 font-mono">
                  <Clock className="w-3.5 h-3.5" />
                  <span>เวลาอ่านประมาณ {activeChapter.estimatedReadTime}</span>
                </span>
              </div>
              
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                {activeChapter.title}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-1.5">
                {activeChapter.subtitle}
              </p>

              {/* Key Takeaways */}
              <div className="mt-5 p-4 bg-purple-50/70 rounded-xl border border-purple-100 flex flex-col gap-2">
                <span className="text-xs font-bold text-purple-950 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-purple-700" />
                  <span>สาระสำคัญที่ต้องจำในบทนี้:</span>
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                  {activeChapter.keyTakeaways.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-purple-950">
                      <span className="w-4 h-4 rounded-full bg-purple-200 text-purple-900 flex items-center justify-center shrink-0 font-bold text-[10px] mt-0.5">
                        ✓
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Step-by-Step Instructions */}
            <div className="flex flex-col gap-6">
              <h3 className="text-base font-bold text-slate-900">
                ขั้นตอนการปฏิบัติอย่างละเอียด (Step-by-Step)
              </h3>

              <div className="flex flex-col gap-5">
                {activeChapter.steps.map((step, sIdx) => (
                  <div key={sIdx} className="p-5 rounded-xl bg-slate-50/70 border border-slate-200 flex flex-col gap-3">
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <span className="w-5 h-5 rounded-md bg-purple-900 text-white flex items-center justify-center text-xs font-bold">
                        {sIdx + 1}
                      </span>
                      <span>{step.title}</span>
                    </h4>

                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                      {step.description}
                    </p>

                    {/* Bullet details */}
                    {step.detailBulletPoints && (
                      <ul className="flex flex-col gap-1.5 bg-white p-3.5 rounded-lg border border-slate-200/80">
                        {step.detailBulletPoints.map((point, pIdx) => (
                          <li key={pIdx} className="text-xs text-slate-700 flex items-start gap-2">
                            <span className="text-purple-600 font-bold">•</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Code block */}
                    {step.codeBlock && (
                      <div className="bg-slate-900 rounded-xl p-4 text-xs font-mono text-purple-100 border border-slate-800 relative">
                        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[11px] text-slate-400">
                          <span>ตัวอย่างการพิมพ์</span>
                          <button
                            onClick={() => copyCode(step.codeBlock!, `ch-${activeChapter.id}-step-${sIdx}`)}
                            className="flex items-center gap-1 text-purple-400 hover:text-purple-300 cursor-pointer"
                          >
                            {copiedKey === `ch-${activeChapter.id}-step-${sIdx}` ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-400" />
                                <span className="text-emerald-400">คัดลอกแล้ว</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>คัดลอก</span>
                              </>
                            )}
                          </button>
                        </div>
                        <pre className="whitespace-pre-wrap leading-relaxed">
                          {step.codeBlock}
                        </pre>
                      </div>
                    )}

                    {/* Step Tip */}
                    {step.tips && (
                      <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-950 flex items-start gap-2">
                        <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <span><strong>เคล็ดลับ:</strong> {step.tips}</span>
                      </div>
                    )}

                    {/* Warning */}
                    {step.warning && (
                      <div className="p-3 bg-rose-50 rounded-lg border border-rose-200 text-xs text-rose-950 flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                        <span><strong>ข้อควรระวัง:</strong> {step.warning}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Back Office Practical Scenario */}
            <div className="p-5 rounded-xl bg-slate-900 text-white flex flex-col gap-3">
              <div className="flex items-center gap-2 text-xs text-purple-300 font-semibold">
                <span className="w-2 h-2 rounded-full bg-purple-400" />
                <span>ตัวอย่างการใช้งานจริงในงาน Back Office:</span>
              </div>
              <h4 className="text-sm font-bold text-white">
                สถานการณ์: {activeChapter.officeUseScenario.situation}
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>ประโยชน์ที่ได้รับ:</strong> {activeChapter.officeUseScenario.howObsidianHelps}
              </p>
              <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-800 text-xs text-purple-200 italic">
                {activeChapter.officeUseScenario.exampleQuote}
              </div>
            </div>

            {/* Practical Mini Exercise */}
            <div className="p-5 rounded-xl bg-purple-50 border border-purple-200 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-xs font-bold text-purple-900">
                <CheckCircle2 className="w-4 h-4 text-purple-700" />
                <span>แบบฝึกหัดท้ายบท: {activeChapter.exercise.task}</span>
              </div>
              <ol className="flex flex-col gap-2">
                {activeChapter.exercise.actionSteps.map((act, actIdx) => (
                  <li key={actIdx} className="text-xs text-purple-950 flex items-start gap-2">
                    <span className="font-mono text-purple-700 font-bold shrink-0">{actIdx + 1}.</span>
                    <span>{act}</span>
                  </li>
                ))}
              </ol>
              <div className="text-xs text-slate-700 pt-1 border-t border-purple-200">
                <span className="font-semibold text-purple-950">จุดตรวจความสำเร็จ:</span> {activeChapter.exercise.successCheck}
              </div>
            </div>

            {/* Chapter Navigation Buttons */}
            <div className="no-print pt-6 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => setActiveChapterId(Math.max(1, activeChapterId - 1))}
                disabled={activeChapterId === 1}
                className="px-4 py-2 text-xs font-medium rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
              >
                ← บทย้อนหลัง
              </button>

              <span className="text-xs text-slate-400 font-mono">
                {activeChapterId} / {guide101Chapters.length}
              </span>

              <button
                onClick={() => setActiveChapterId(Math.min(guide101Chapters.length, activeChapterId + 1))}
                disabled={activeChapterId === guide101Chapters.length}
                className="px-4 py-2 text-xs font-medium rounded-xl bg-purple-900 text-white hover:bg-purple-950 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer shadow-xs"
              >
                บทถัดไป →
              </button>
            </div>

          </article>

        </div>

      </div>

      {/* Print-Only: All 8 Chapters Sequentially for Comprehensive PDF Export */}
      <div className="print-only hidden flex flex-col gap-8">
        {guide101Chapters.map(ch => (
          <article key={ch.id} className="page-break bg-white p-6 border border-slate-300 rounded-xl flex flex-col gap-4">
            <div className="border-b border-slate-200 pb-3">
              <span className="text-xs font-bold text-purple-900 block">บทที่ {ch.id} จาก 8 บท</span>
              <h2 className="text-xl font-bold text-slate-900">{ch.title}</h2>
              <p className="text-xs text-slate-600 mt-0.5">{ch.subtitle}</p>
            </div>

            <div className="bg-purple-50 p-3 rounded-lg border border-purple-200 text-xs">
              <strong>สาระสำคัญ:</strong> {ch.keyTakeaways.join(' · ')}
            </div>

            <div className="flex flex-col gap-3">
              <h4 className="text-xs font-bold text-slate-900">ขั้นตอนการปฏิบัติ:</h4>
              {ch.steps.map((st, i) => (
                <div key={i} className="text-xs text-slate-700 pl-2 border-l-2 border-purple-400">
                  <div className="font-semibold text-slate-800">{i + 1}. {st.title}</div>
                  <div className="text-slate-600 mt-0.5">{st.description}</div>
                  {st.codeBlock && (
                    <pre className="bg-slate-100 p-2 rounded mt-1 font-mono text-[11px] text-slate-800">
                      {st.codeBlock}
                    </pre>
                  )}
                </div>
              ))}
            </div>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs">
              <strong>สถานการณ์งาน Back Office:</strong> {ch.officeUseScenario.situation}
              <div className="text-slate-600 mt-1">{ch.officeUseScenario.howObsidianHelps}</div>
            </div>

            <div className="text-xs text-slate-600 italic">
              เปรียบเทียบ: {ch.analogy}
            </div>
          </article>
        ))}
      </div>

    </div>
  );
};
