import React, { useState } from 'react';
import { 
  FileText, Copy, Check, Download, Layers, 
  HelpCircle, Sparkles, FolderPlus, Settings
} from 'lucide-react';
import { officeTemplates } from '../data/templatesData';
import { OfficeTemplate } from '../types';

export const TemplateLibrary: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredTemplates = selectedCategory === 'all'
    ? officeTemplates
    : officeTemplates.filter(t => t.category === selectedCategory);

  const copyTemplate = (template: OfficeTemplate) => {
    navigator.clipboard.writeText(template.markdownContent);
    setCopiedId(template.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const categories = [
    { id: 'all', label: 'ทั้งหมด (5 แม่แบบ)' },
    { id: 'daily', label: 'บันทึกประจำวัน (Daily)' },
    { id: 'meeting', label: 'บันทึกการประชุม (Meeting)' },
    { id: 'sop', label: 'คู่มือการทำงาน (SOP)' },
    { id: 'project', label: 'ติดตามโครงการ (Project)' },
    { id: 'contact', label: 'ข้อมูลผู้ติดต่อ (Contact)' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">
      
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-900 mb-1">
            <span className="w-2 h-2 rounded-full bg-purple-700" />
            <span>คลังแม่แบบสำเร็จรูปสำหรับคน Back Office (Office Templates Hub)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            ก๊อปปี้ไปวางใน Obsidian แล้วเริ่มงานได้ทันที
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            แม่แบบภาษาไทยที่ออกแบบมาสำหรับงานเอกสารออฟฟิศจริง ตรวจสอบความถูกต้อง จัดหัวข้อและ Checklist ไว้เรียบร้อยแล้ว กดปุ่มคัดลอกเพียง 1 คลิก!
          </p>
        </div>

        {/* Quick Instructions Badge */}
        <div className="bg-purple-50/80 rounded-xl border border-purple-200 p-4 shrink-0 text-xs text-purple-950 flex flex-col gap-1.5 max-w-sm">
          <div className="font-bold flex items-center gap-1.5 text-purple-900">
            <FolderPlus className="w-4 h-4 text-purple-700" />
            <span>วิธีนำไปใช้ใน Obsidian:</span>
          </div>
          <p className="text-slate-700 leading-relaxed text-[11px]">
            1. สร้างโฟลเดอร์ชื่อ <code>Templates</code> ใน Obsidian<br/>
            2. สร้างโน้ตใหม่ แล้วก๊อปปี้ข้อความด้านล่างไปวาง<br/>
            3. เวลาใช้งาน กดไอคอน <strong>Insert Template</strong> ได้ทันที
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-purple-900 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Templates List */}
      <div className="grid grid-cols-1 gap-6">
        {filteredTemplates.map(tmpl => {
          const isCopied = copiedId === tmpl.id;

          return (
            <div 
              key={tmpl.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col"
            >
              {/* Template Card Top Header */}
              <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                    <span className="font-semibold text-purple-800">
                      {tmpl.category.toUpperCase()}
                    </span>
                    <span>·</span>
                    <span>{tmpl.tags.join(', ')}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {tmpl.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                    {tmpl.description}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => copyTemplate(tmpl)}
                    className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl transition-all shadow-xs cursor-pointer ${
                      isCopied
                        ? 'bg-emerald-600 text-white'
                        : 'bg-purple-900 text-white hover:bg-purple-950'
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>คัดลอกลงคลิปบอร์ดแล้ว!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>คัดลอกแม่แบบ (Copy)</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Template Code Viewer */}
              <div className="p-5 sm:p-6 bg-slate-900 text-slate-200 font-mono text-xs overflow-x-auto">
                <pre className="whitespace-pre-wrap leading-relaxed text-purple-100 selection:bg-purple-700">
                  {tmpl.markdownContent}
                </pre>
              </div>

              {/* Template Usage Hint Footer */}
              <div className="px-5 sm:px-6 py-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-600 flex items-start gap-2">
                <HelpCircle className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <span><strong>คำแนะนำ:</strong> {tmpl.howToUseInObsidian}</span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
