import React, { useState } from 'react';
import { 
  Sparkles, Bot, ShieldCheck, Copy, Check, Terminal, 
  HelpCircle, ArrowRight, MessageSquare, Layers, Lock,
  FileText, ExternalLink, Printer, Compass, Lightbulb, CheckCircle2
} from 'lucide-react';
import { aiPluginsList, aiOfficeScenarios, aiSafetyRules } from '../data/aiObsidianData';

export const AiObsidianView: React.FC<{ onPrint: () => void }> = ({ onPrint }) => {
  const [activeScenarioId, setActiveScenarioId] = useState<string>('meeting-summary');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const activeScenario = aiOfficeScenarios.find(s => s.id === activeScenarioId) || aiOfficeScenarios[0];

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-8">
      
      {/* Top Banner Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs relative overflow-hidden flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-900 mb-2">
            <span className="w-2 h-2 rounded-full bg-purple-700" />
            <span>นวัตกรรมงานออฟฟิศ: Obsidian + AI Integration Guide</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            การเชื่อมต่อและนำ AI มาใช้ร่วมกับ Obsidian สำหรับคน Back Office
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
            เปลี่ยนตู้เอกสารธรรมดาให้กลายเป็น <strong>"เลขาฯ อัจฉริยะประจำแผนก"</strong> ที่ช่วยสรุปประชุม ร่างคู่มือ SOP ตอบคำถามจากโน้ตทั้งตู้ และเกลาสำนวนเอกสารทางการ โดยยังคงความปลอดภัยตามกฎหมาย PDPA
          </p>
        </div>

        <div className="no-print flex items-center gap-3 shrink-0">
          <button
            onClick={onPrint}
            className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-purple-900 hover:bg-purple-950 rounded-xl transition-colors shadow-xs cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>พิมพ์คู่มือ AI เป็น PDF</span>
          </button>
        </div>
      </div>

      {/* Concept Comparison: Traditional AI vs Obsidian + AI */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Traditional AI Box */}
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-slate-600 font-bold text-sm">
            <span className="w-7 h-7 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center text-xs">
              1
            </span>
            <span>AI ทั่วไป (เช่น ChatGPT บนเบราว์เซอร์)</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            • <strong>ไม่รู้จักข้อมูลบริษัท:</strong> ไม่รู้ว่าใครคือคุณสมชายฝ่ายจัดซื้อ ไม่รู้ว่าระเบียบเบิกเงินออฟฟิศเราเขียนไว้อย่างไร<br/>
            • <strong>ต้องก๊อปปี้ไป-มา:</strong> ต้องคอยพิมพ์อธิบายบริบทใหม่ทุกครั้งในหน้าต่างแชท<br/>
            • <strong>ข้อมูลกระจัดกระจาย:</strong> คำตอบที่ได้อยู่ในประวัติแชท ไม่ได้เชื่อมโยงกับเอกสารงานจริง
          </p>
        </div>

        {/* Obsidian + AI Box */}
        <div className="p-6 rounded-2xl bg-purple-50/80 border border-purple-200 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-purple-950 font-bold text-sm">
            <span className="w-7 h-7 rounded-lg bg-purple-900 text-white flex items-center justify-center text-xs">
              2
            </span>
            <span>Obsidian + AI (ตู้เอกสาร + สมองอัจฉริยะ)</span>
          </div>
          <p className="text-xs sm:text-sm text-purple-950 leading-relaxed">
            • <strong>อ่านและเข้าใจโน้ตทั้ง Vault ของเรา:</strong> AI รู้จักโครงการ รายชื่อเพื่อนร่วมงาน และมติประชุมในอดีต<br/>
            • <strong>สร้างผลลัพธ์เป็น Markdown อัตโนมัติ:</strong> สร้าง <code>[[ลิงก์บุคคล]]</code> และช่องติ๊กถูก <code>- [ ]</code> ให้ทันที<br/>
            • <strong>ปลอดภัยสูงสุด:</strong> สามารถเลือกรัน AI แบบ Local ในเครื่องตนเอง ข้อมูลไม่รั่วไหลออกนอกองค์กร
          </p>
        </div>

      </div>

      {/* Interactive AI Sandbox: 4 Real Office Scenarios */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-purple-900 mb-1">
              <Sparkles className="w-4 h-4 text-purple-700" />
              <span>ห้องทดลองสาธิตจริง (Interactive AI Office Simulator)</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              4 กรณีตัวอย่างการนำ AI มาใช้จริงในงาน Back Office
            </h2>
          </div>
          <span className="text-xs text-slate-500">คลิกเลือกสถานการณ์เพื่อดูผลลัพธ์เปรียบเทียบ</span>
        </div>

        {/* Scenario Switcher Tabs */}
        <div className="no-print flex overflow-x-auto border-b border-slate-200 p-2 gap-2 bg-slate-100/60">
          {aiOfficeScenarios.map(sc => (
            <button
              key={sc.id}
              onClick={() => setActiveScenarioId(sc.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                activeScenarioId === sc.id
                  ? 'bg-white text-purple-950 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              {sc.title}
            </button>
          ))}
        </div>

        {/* Active Scenario Content */}
        <div className="p-6 sm:p-8 flex flex-col gap-6">
          
          {/* Metadata bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-purple-900 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-100">
                แผนก: {activeScenario.department}
              </span>
              <span className="text-slate-500">
                ปัญหา: {activeScenario.problem}
              </span>
            </div>

            <button
              onClick={() => copyToClipboard(activeScenario.promptExample, 'prompt')}
              className="flex items-center gap-1.5 text-purple-700 hover:text-purple-950 font-medium cursor-pointer"
            >
              {copiedKey === 'prompt' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">คัดลอกคำสั่งแล้ว!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>คัดลอกสูตรคำสั่ง (Prompt)</span>
                </>
              )}
            </button>
          </div>

          {/* Prompt Formula Display */}
          <div className="p-3.5 bg-amber-50/80 rounded-xl border border-amber-200 text-xs text-amber-950 flex flex-col gap-1">
            <span className="font-bold flex items-center gap-1.5 text-amber-900">
              <MessageSquare className="w-3.5 h-3.5 text-amber-700" />
              <span>สูตรคำสั่งที่ใช้สั่ง AI (Prompt):</span>
            </span>
            <p className="italic leading-relaxed">
              "{activeScenario.promptExample}"
            </p>
          </div>

          {/* Split Screen: Before (Raw Input) vs After (Obsidian Output) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            
            {/* Left: Raw text */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 flex flex-col gap-2">
              <div className="text-xs font-bold text-slate-700 pb-2 border-b border-slate-200 flex items-center justify-between">
                <span>1. ข้อความดิบที่จดมาลวกๆ หรือคำถาม</span>
                <span className="text-[11px] text-slate-400 font-normal">ก่อนใช้ AI</span>
              </div>
              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed font-mono whitespace-pre-wrap p-2 flex-1">
                {activeScenario.rawInput}
              </div>
            </div>

            {/* Right: AI Output in Obsidian Format */}
            <div className="bg-slate-900 text-slate-100 rounded-2xl border border-slate-800 p-5 flex flex-col gap-2 shadow-sm">
              <div className="text-xs font-bold text-purple-300 pb-2 border-b border-slate-800 flex items-center justify-between">
                <span>2. ผลลัพธ์ที่ AI แปลงเป็นรูปแบบ Obsidian พร้อม [[ลิงก์]]</span>
                <button
                  onClick={() => copyToClipboard(activeScenario.aiOutput, 'output')}
                  className="text-purple-400 hover:text-purple-300 flex items-center gap-1 text-[11px] cursor-pointer"
                >
                  {copiedKey === 'output' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>คัดลอกผลลัพธ์</span>
                </button>
              </div>
              <div className="text-xs sm:text-sm text-purple-100 leading-relaxed font-mono whitespace-pre-wrap p-2 flex-1">
                {activeScenario.aiOutput}
              </div>
            </div>

          </div>

          {/* Practical Value Explanation */}
          <div className="p-4 bg-purple-50 rounded-xl border border-purple-200 text-xs text-purple-950 flex items-start gap-2.5">
            <Lightbulb className="w-4 h-4 text-purple-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block mb-0.5">ทำไมวิธีนี้ถึงเปลี่ยนชีวิตคน Back Office:</span>
              <span>{activeScenario.explanation}</span>
            </div>
          </div>

        </div>
      </div>

      {/* 4 Recommended AI Plugins for Obsidian */}
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            แนะนำ 4 ปลั๊กอิน AI ยอดนิยมใน Obsidian (ติดตั้งง่าย ไม่ต้องเขียนโค้ด)
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            ติดตั้งได้โดยตรงผ่านเมนู <em>Settings ➔ Community plugins</em> ภายในตัวโปรแกรม Obsidian
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {aiPluginsList.map(plugin => (
            <div 
              key={plugin.id} 
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between gap-4"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-semibold text-purple-800 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-100">
                    {plugin.badge}
                  </span>
                  <span className="text-xs text-slate-400">
                    {plugin.rating}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900">
                  {plugin.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                  {plugin.description}
                </p>

                <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-700">
                  <strong>เหมาะกับ:</strong> {plugin.bestFor}
                </div>

                <div className="mt-4 flex flex-col gap-2">
                  <span className="text-xs font-bold text-slate-800">ขั้นตอนการติดตั้ง:</span>
                  <ol className="flex flex-col gap-1.5 text-xs text-slate-600 pl-1">
                    {plugin.setupSteps.map((step, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-2">
                        <span className="text-purple-700 font-bold font-mono">{sIdx + 1}.</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 text-xs text-purple-950 bg-purple-50/50 p-3 rounded-xl border border-purple-100">
                💼 <strong>ตัวอย่างงานจริง:</strong> {plugin.howItWorksInOffice}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Data Privacy & PDPA Rules */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col gap-5">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-6 h-6 text-emerald-400" />
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white">
              ความปลอดภัยของข้อมูลบริษัท & กฎหมาย PDPA เมื่อใช้ AI
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              แนวทางปฏิบัติที่ถูกต้องสำหรับพนักงาน Back Office เพื่อให้มั่นใจ 100% ว่าข้อมูลความลับไม่รั่วไหล
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {aiSafetyRules.map((rule, rIdx) => (
            <div key={rIdx} className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 flex flex-col gap-1.5">
              <span className="text-sm font-bold text-purple-300">
                {rule.title}
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {rule.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Print-Only View for PDF export */}
      <div className="print-only hidden flex flex-col gap-6">
        <h2 className="text-2xl font-bold">คู่มือการเชื่อมต่อและนำ AI มาใช้ร่วมกับ Obsidian สำหรับคน Back Office</h2>
        <p className="text-xs text-slate-600">สรุปแนวทางการใช้งาน ปลั๊กอินแนะนำ และข้อควรระวังเรื่อง PDPA</p>

        {aiOfficeScenarios.map(sc => (
          <div key={sc.id} className="page-break p-4 border border-slate-300 rounded-xl flex flex-col gap-2">
            <h3 className="font-bold text-sm">{sc.title} ({sc.department})</h3>
            <div className="text-xs"><strong>คำสั่ง AI (Prompt):</strong> "{sc.promptExample}"</div>
            <div className="text-xs bg-slate-100 p-2 rounded">
              <strong>ข้อความดิบ:</strong> {sc.rawInput}
            </div>
            <div className="text-xs bg-purple-50 p-2 rounded font-mono">
              <strong>ผลลัพธ์ใน Obsidian:</strong><br/>
              {sc.aiOutput}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
