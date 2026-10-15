import React, { useState, useRef, useEffect } from 'react';
import { 
  PenTool, Eye, RefreshCw, Sparkles, CheckSquare, 
  Share2, FileText, Info, HelpCircle, Layers, Check
} from 'lucide-react';
import { sampleGraphNodes } from '../data/templatesData';

const sampleSnippets = {
  daily: `# 📅 บันทึกประจำวัน: 2026-10-13
วันอังคาร | เวลาเริ่มงาน: 08:30 น.

## 🎯 3 งานสำคัญที่สุดวันนี้
- [ ] สรุปรายงานงบประมาณส่ง [[คุณวิภา บัญชี]] ก่อนเที่ยง
- [x] ตรวจสอบใบแจ้งหนี้ค่าอินเทอร์เน็ตสำนักงาน
- [ ] ติดตามใบเสนอราคาเก้าอี้จาก [[บ. ไทยเทค แอร์]]

## 📞 บันทึกรับสายด่วน
- **เวลา 10:15 น.:** [[คุณสมชาย จัดซื้อ]] โทรมาแจ้งว่าซัพพลายเออร์จะเข้ามาดูหน้างานวันพฤหัสนี้

> [!NOTE]
> อย่าลืมเตรียมบัตรผ่านเข้าอาคารให้ทีมช่างซ่อมบำรุงล่วงหน้า 1 วัน

## 📝 บันทึกช่วยจำ
เอกสารเบิกจ่ายให้ดูตาม [[SOP เบิกเงินสดย่อย]] ห้ามเกิน ==2,000 บาท==`,

  meeting: `# 📝 บันทึกประชุม: พิจารณาจัดซื้อระบบปรับอากาศ
**วันที่:** 2026-10-13 | **ห้อง:** ประชุม 2

### 👥 ผู้เข้าร่วม
- ประธาน: [[คุณเกรียงศักดิ์ ซ่อมบำรุง]]
- สมาชิก: [[คุณสมชาย จัดซื้อ]], [[คุณวิภา บัญชี]]

### 💬 สรุปการหารือ
> [!WARNING]
> แอร์ตัวเก่ากินไฟมาก จำเป็นต้องเปลี่ยนเป็นระบบ Inverter เพื่อประหยัดค่าไฟ 30%

### ✅ มอบหมายงาน (Action Items)
- [ ] ติดต่อ [[บ. ไทยเทค แอร์]] เพื่อขอส่วนลดพิเศษ ภายในวันศุกร์
- [ ] จัดทำเอกสารขออนุมัติจัดซื้อตาม [[SOP จัดซื้อจัดจ้าง]]`,

  callout: `# ตัวอย่างการใช้ Callouts สวยๆ ใน Obsidian

> [!NOTE]
> นี่คือกล่องบันทึกข้อความทั่วไป ให้ข้อมูลเพิ่มเติมกับผู้อ่าน

> [!WARNING]
> คำเตือน: เอกสารนี้เป็นความลับเฉพาะพนักงานภายใน ห้ามเผยแพร่

> [!TIP]
> ทริคเด็ด: คุณสามารถกด Ctrl + O เพื่อค้นหาและกระโดดไปเปิดโน้ตใดก็ได้ใน 1 วินาที!

> [!SUCCESS]
> โครงการผ่านการตรวจรับ 100% เรียบร้อยแล้ว`,

  table: `# ตารางติดตามงาน Back Office ประจำสัปดาห์

| ชื่องาน | ผู้รับผิดชอบ | วันที่ส่ง | สถานะ |
| --- | --- | --- | --- |
| สรุปยอดเงินสดย่อย | [[คุณวิภา บัญชี]] | 15 ต.ค. | รอดำเนินการ |
| ซ่อมแซมไฟทางเดิน | [[คุณเกรียงศักดิ์ ซ่อมบำรุง]] | 16 ต.ค. | กำลังซ่อม |
| สั่งกระดาษ A4 เพิ่ม | [[คุณสมชาย จัดซื้อ]] | 14 ต.ค. | เสร็จสิ้น |

- [x] ตรวจนับสต็อกอุปกรณ์สำนักงานประจำเดือน
- [ ] ส่งใบเสนอราคาให้ผู้จัดการเซ็น`
};

export const ObsidianSimulator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'editor' | 'graph'>('editor');
  const [markdownText, setMarkdownText] = useState(sampleSnippets.daily);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [selectedGraphNode, setSelectedGraphNode] = useState<string | null>('meeting-q4');
  const [nodes, setNodes] = useState(sampleGraphNodes);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Helper to parse simple markdown to JSX safely for simulation
  const renderSimulatedMarkdown = (text: string) => {
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];

    let inTable = false;
    let tableRows: string[][] = [];

    const flushTable = (key: number) => {
      if (tableRows.length > 0) {
        const header = tableRows[0];
        const body = tableRows.slice(2); // Skip separator row
        elements.push(
          <div key={`table-${key}`} className="my-3 overflow-x-auto">
            <table className={`w-full border-collapse text-xs ${theme === 'dark' ? 'border-slate-700 text-slate-200' : 'border-slate-200 text-slate-800'}`}>
              <thead>
                <tr className={theme === 'dark' ? 'bg-slate-800 border-b border-slate-700' : 'bg-slate-100 border-b border-slate-200'}>
                  {header.map((col, cIdx) => (
                    <th key={cIdx} className="p-2 font-semibold text-left border border-slate-300 dark:border-slate-700">{col.trim()}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {body.map((row, rIdx) => (
                  <tr key={rIdx} className={rIdx % 2 === 0 ? (theme === 'dark' ? 'bg-slate-900/60' : 'bg-white') : (theme === 'dark' ? 'bg-slate-800/40' : 'bg-slate-50')}>
                    {row.map((col, cIdx) => (
                      <td key={cIdx} className="p-2 border border-slate-200 dark:border-slate-700">
                        {renderInlineFormatting(col.trim())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        tableRows = [];
        inTable = false;
      }
    };

    lines.forEach((line, index) => {
      // Check for table line
      if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
        inTable = true;
        const cols = line.trim().slice(1, -1).split('|');
        tableRows.push(cols);
        return;
      } else if (inTable) {
        flushTable(index);
      }

      // Headings
      if (line.startsWith('# ')) {
        elements.push(
          <h1 key={index} className={`text-xl sm:text-2xl font-bold mt-4 mb-2 pb-1 border-b ${theme === 'dark' ? 'text-white border-slate-700' : 'text-slate-900 border-slate-200'}`}>
            {renderInlineFormatting(line.replace('# ', ''))}
          </h1>
        );
      } else if (line.startsWith('## ')) {
        elements.push(
          <h2 key={index} className={`text-lg sm:text-xl font-bold mt-3 mb-1.5 ${theme === 'dark' ? 'text-purple-300' : 'text-purple-900'}`}>
            {renderInlineFormatting(line.replace('## ', ''))}
          </h2>
        );
      } else if (line.startsWith('### ')) {
        elements.push(
          <h3 key={index} className={`text-base font-semibold mt-2.5 mb-1 ${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}>
            {renderInlineFormatting(line.replace('### ', ''))}
          </h3>
        );
      } 
      // Checklists
      else if (line.trim().startsWith('- [ ] ')) {
        const itemText = line.trim().replace('- [ ] ', '');
        elements.push(
          <div 
            key={index} 
            onClick={() => {
              // Toggle to checked in text
              const newLines = [...lines];
              newLines[index] = line.replace('- [ ] ', '- [x] ');
              setMarkdownText(newLines.join('\n'));
            }}
            className="flex items-start gap-2.5 my-1.5 text-xs sm:text-sm cursor-pointer group hover:opacity-80"
          >
            <input type="checkbox" checked={false} readOnly className="mt-1 w-4 h-4 rounded text-purple-600 focus:ring-purple-500 cursor-pointer" />
            <span className={theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}>
              {renderInlineFormatting(itemText)}
            </span>
          </div>
        );
      } else if (line.trim().startsWith('- [x] ') || line.trim().startsWith('- [X] ')) {
        const itemText = line.trim().replace(/- \[[xX]\] /, '');
        elements.push(
          <div 
            key={index} 
            onClick={() => {
              // Toggle back to unchecked
              const newLines = [...lines];
              newLines[index] = line.replace(/- \[[xX]\] /, '- [ ] ');
              setMarkdownText(newLines.join('\n'));
            }}
            className="flex items-start gap-2.5 my-1.5 text-xs sm:text-sm cursor-pointer group hover:opacity-80"
          >
            <input type="checkbox" checked={true} readOnly className="mt-1 w-4 h-4 rounded text-purple-600 focus:ring-purple-500 cursor-pointer" />
            <span className={`line-through opacity-60 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
              {renderInlineFormatting(itemText)}
            </span>
          </div>
        );
      }
      // Callouts
      else if (line.startsWith('> [!NOTE]') || line.startsWith('> [!TIP]') || line.startsWith('> [!WARNING]') || line.startsWith('> [!SUCCESS]')) {
        let calloutType = 'NOTE';
        let borderColor = 'border-blue-500 bg-blue-50 text-blue-900 dark:bg-blue-950/40 dark:text-blue-200 dark:border-blue-500';
        if (line.includes('WARNING')) {
          calloutType = 'WARNING';
          borderColor = 'border-amber-500 bg-amber-50 text-amber-950 dark:bg-amber-950/40 dark:text-amber-200 dark:border-amber-500';
        } else if (line.includes('TIP')) {
          calloutType = 'TIP';
          borderColor = 'border-purple-500 bg-purple-50 text-purple-950 dark:bg-purple-950/40 dark:text-purple-200 dark:border-purple-500';
        } else if (line.includes('SUCCESS')) {
          calloutType = 'SUCCESS';
          borderColor = 'border-emerald-500 bg-emerald-50 text-emerald-950 dark:bg-emerald-950/40 dark:text-emerald-200 dark:border-emerald-500';
        }

        elements.push(
          <div key={index} className={`my-3 p-3.5 rounded-r-xl border-l-4 text-xs sm:text-sm ${borderColor}`}>
            <div className="font-bold flex items-center gap-1.5 mb-1 text-[11px] uppercase tracking-wide">
              <span>{calloutType}</span>
            </div>
          </div>
        );
      } else if (line.startsWith('> ')) {
        // Callout content line
        const calloutText = line.replace('> ', '');
        elements.push(
          <p key={index} className={`pl-4 text-xs sm:text-sm italic leading-relaxed my-0.5 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
            {renderInlineFormatting(calloutText)}
          </p>
        );
      }
      // Bullet list
      else if (line.trim().startsWith('- ')) {
        elements.push(
          <div key={index} className="flex items-start gap-2 my-1 text-xs sm:text-sm pl-2">
            <span className="text-purple-600 font-bold">•</span>
            <span className={theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}>
              {renderInlineFormatting(line.trim().replace('- ', ''))}
            </span>
          </div>
        );
      }
      // Empty line
      else if (line.trim() === '') {
        elements.push(<div key={index} className="h-2" />);
      }
      // Regular paragraph
      else {
        elements.push(
          <p key={index} className={`text-xs sm:text-sm leading-relaxed my-1 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
            {renderInlineFormatting(line)}
          </p>
        );
      }
    });

    if (inTable) {
      flushTable(lines.length);
    }

    return elements;
  };

  // Helper for inline markdown: [[wikilink]], **bold**, *italic*, ==highlight==
  const renderInlineFormatting = (raw: string): React.ReactNode => {
    // Process Wikilinks first
    const parts = raw.split(/(\[\[[^\]]+\]\]|==[^=]+==|\*\*[^*]+\*\*|\*[^*]+\*|~~[^~]+~~)/g);

    return parts.map((part, i) => {
      if (part.startsWith('[[') && part.endsWith(']]')) {
        const linkName = part.slice(2, -2);
        return (
          <span 
            key={i} 
            className="text-purple-600 dark:text-purple-400 font-medium bg-purple-50 dark:bg-purple-950/60 px-1.5 py-0.5 rounded cursor-pointer hover:underline border border-purple-200 dark:border-purple-800"
            title={`ลิงก์ไปยังโน้ต: ${linkName}`}
          >
            {linkName}
          </span>
        );
      }
      if (part.startsWith('==') && part.endsWith('==')) {
        const highlighted = part.slice(2, -2);
        return (
          <mark key={i} className="bg-amber-200 text-amber-950 px-1 rounded">
            {highlighted}
          </mark>
        );
      }
      if (part.startsWith('**') && part.endsWith('**')) {
        const boldText = part.slice(2, -2);
        return <strong key={i} className="font-bold">{boldText}</strong>;
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        const italicText = part.slice(1, -1);
        return <em key={i} className="italic">{italicText}</em>;
      }
      if (part.startsWith('~~') && part.endsWith('~~')) {
        const strikeText = part.slice(2, -2);
        return <s key={i} className="line-through">{strikeText}</s>;
      }
      return part;
    });
  };

  // Canvas Drawing for Graph View
  useEffect(() => {
    if (activeTab !== 'graph') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number = 0;

    const renderGraph = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background
      ctx.fillStyle = theme === 'dark' ? '#0f172a' : '#f8fafc';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Connections (Lines)
      nodes.forEach(node => {
        node.connections.forEach(targetId => {
          const target = nodes.find(n => n.id === targetId);
          if (target) {
            const isSelected = selectedGraphNode === node.id || selectedGraphNode === target.id;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(target.x, target.y);
            ctx.strokeStyle = isSelected 
              ? (theme === 'dark' ? '#a855f7' : '#7e22ce')
              : (theme === 'dark' ? '#334155' : '#cbd5e1');
            ctx.lineWidth = isSelected ? 2.5 : 1;
            ctx.stroke();
          }
        });
      });

      // Draw Nodes (Circles)
      nodes.forEach(node => {
        const isSelected = selectedGraphNode === node.id;
        const radius = isSelected ? 12 : 8;

        // Outer glow if selected
        if (isSelected) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, radius + 4, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(168, 85, 247, 0.3)';
          ctx.fill();
        }

        // Main Node Circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        if (node.group === 'pkm') ctx.fillStyle = '#6366f1';
        else if (node.group === 'daily') ctx.fillStyle = '#06b6d4';
        else if (node.group === 'person') ctx.fillStyle = '#f59e0b';
        else if (node.group === 'meeting') ctx.fillStyle = '#ec4899';
        else if (node.group === 'sop') ctx.fillStyle = '#10b981';
        else ctx.fillStyle = '#8b5cf6';
        ctx.fill();

        // Node Label Text
        ctx.font = isSelected ? 'bold 11px Prompt, sans-serif' : '10px Prompt, sans-serif';
        ctx.fillStyle = theme === 'dark' ? '#f1f5f9' : '#0f172a';
        ctx.textAlign = 'center';
        ctx.fillText(node.label, node.x, node.y + radius + 14);
      });
    };

    renderGraph();

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [activeTab, selectedGraphNode, theme, nodes]);

  // Handle Canvas click to select node
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = (e.clientX - rect.left) * (canvas.width / rect.width);
    const clickY = (e.clientY - rect.top) * (canvas.height / rect.height);

    const clickedNode = nodes.find(n => {
      const dist = Math.hypot(n.x - clickX, n.y - clickY);
      return dist <= 20;
    });

    if (clickedNode) {
      setSelectedGraphNode(clickedNode.id);
    } else {
      setSelectedGraphNode(null);
    }
  };

  const selectedNodeData = nodes.find(n => n.id === selectedGraphNode);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">
      
      {/* Top Banner explaining the Sandbox */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-900 mb-1">
            <span className="w-2 h-2 rounded-full bg-purple-700" />
            <span>ห้องทดลองพิมพ์ Obsidian Simulator & Graph View</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            ทดลองพิมพ์จริงโดยไม่ต้องติดตั้งโปรแกรม
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            ฝั่งซ้ายคือพิมพ์แบบ Markdown ดิบๆ · ฝั่งขวาคือหน้าจอแสดงผลสด (Live Preview) ของ Obsidian ลองคลิกติ๊กถูกหรือพิมพ์สัญลักษณ์เล่นได้เลย!
          </p>
        </div>

        {/* Mode switcher (Editor vs Graph View) */}
        <div className="flex items-center gap-2">
          <div className="flex p-1 bg-slate-100 rounded-xl">
            <button
              onClick={() => setActiveTab('editor')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                activeTab === 'editor'
                  ? 'bg-white text-purple-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <PenTool className="w-3.5 h-3.5" />
              <span>โหมดพิมพ์โน้ต (Editor)</span>
            </button>
            <button
              onClick={() => setActiveTab('graph')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                activeTab === 'graph'
                  ? 'bg-white text-purple-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>โหมดใยแมงมุม (Graph View)</span>
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'editor' ? (
        <div className="flex flex-col gap-4">
          
          {/* Preset Buttons Strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
            <span className="text-slate-500 font-medium">โหลดตัวอย่างงานออฟฟิศ:</span>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setMarkdownText(sampleSnippets.daily)}
                className="px-3 py-1 bg-white hover:bg-purple-50 text-slate-700 hover:text-purple-900 border border-slate-200 rounded-lg cursor-pointer transition-colors"
              >
                1. บันทึก Daily Note
              </button>
              <button
                onClick={() => setMarkdownText(sampleSnippets.meeting)}
                className="px-3 py-1 bg-white hover:bg-purple-50 text-slate-700 hover:text-purple-900 border border-slate-200 rounded-lg cursor-pointer transition-colors"
              >
                2. บันทึกการประชุม
              </button>
              <button
                onClick={() => setMarkdownText(sampleSnippets.callout)}
                className="px-3 py-1 bg-white hover:bg-purple-50 text-slate-700 hover:text-purple-900 border border-slate-200 rounded-lg cursor-pointer transition-colors"
              >
                3. กล่อง Callout เตือนใจ
              </button>
              <button
                onClick={() => setMarkdownText(sampleSnippets.table)}
                className="px-3 py-1 bg-white hover:bg-purple-50 text-slate-700 hover:text-purple-900 border border-slate-200 rounded-lg cursor-pointer transition-colors"
              >
                4. ตารางงาน & Checklists
              </button>
            </div>
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="px-2.5 py-1 text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-lg cursor-pointer"
            >
              สลับธีม: {theme === 'light' ? '☀️ กลางวัน' : '🌙 มืด (Dark)'}
            </button>
          </div>

          {/* Split Screen Simulator */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch min-h-[550px]">
            
            {/* Left Side: Markdown Source Editor */}
            <div className="bg-slate-900 text-slate-100 rounded-2xl border border-slate-800 shadow-sm flex flex-col overflow-hidden">
              <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 font-mono text-slate-300">
                  <PenTool className="w-3.5 h-3.5 text-purple-400" />
                  <span>พื้นที่พิมพ์ข้อความ (Markdown Source)</span>
                </div>
                <span className="text-[11px] text-slate-500 font-mono">ลองแก้ข้อความหรือติ๊ก [x] ได้เลย</span>
              </div>
              <textarea
                value={markdownText}
                onChange={e => setMarkdownText(e.target.value)}
                className="w-full flex-1 p-5 bg-transparent text-xs sm:text-sm font-mono text-slate-200 resize-none focus:outline-none leading-relaxed selection:bg-purple-700"
                placeholder="พิมพ์ข้อความ Markdown ได้ที่นี่..."
                spellCheck={false}
              />
              <div className="bg-slate-950/80 px-4 py-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                <span>บันทึกอัตโนมัติ (ไม่ต้องกดบันทึก)</span>
                <span className="font-mono">{markdownText.length} ตัวอักษร</span>
              </div>
            </div>

            {/* Right Side: Rendered Obsidian View */}
            <div className={`rounded-2xl border shadow-sm flex flex-col overflow-hidden ${
              theme === 'dark' 
                ? 'bg-slate-900 border-slate-800 text-slate-100' 
                : 'bg-white border-slate-200 text-slate-900'
            }`}>
              <div className={`px-4 py-3 border-b flex items-center justify-between text-xs ${
                theme === 'dark' ? 'bg-slate-950/70 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}>
                <div className="flex items-center gap-2 font-semibold">
                  <Eye className="w-3.5 h-3.5 text-purple-600" />
                  <span>ผลลัพธ์หน้าจอจริงใน Obsidian (Live Preview)</span>
                </div>
                <span className="text-[11px] text-purple-600 font-medium">คลิกติ๊กถูกกล่อง To-Do ได้จริง!</span>
              </div>
              
              <div className="p-6 overflow-y-auto flex-1 max-h-[500px]">
                {renderSimulatedMarkdown(markdownText)}
              </div>

              <div className={`px-4 py-2 border-t text-[11px] flex items-center justify-between ${
                theme === 'dark' ? 'bg-slate-950/50 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-500'
              }`}>
                <span>คำที่อยู่ใน [[...]] จะเป็นลิงก์กดเปิดโน้ตได้</span>
                <span>Obsidian 101 Sandbox</span>
              </div>
            </div>

          </div>

        </div>
      ) : (
        /* Graph View Simulator Canvas */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col gap-3">
            <div className="flex items-center justify-between text-xs text-slate-600 pb-2 border-b border-slate-100">
              <span className="font-semibold text-slate-900">แผนผังใยแมงมุมจำลอง (Graph View Interactive)</span>
              <span>คลิกที่จุดวงกลมเพื่อดูรายละเอียดการเชื่อมโยง</span>
            </div>

            <div className="relative rounded-xl overflow-hidden border border-slate-200 aspect-16/10">
              <canvas
                ref={canvasRef}
                width={500}
                height={400}
                onClick={handleCanvasClick}
                className="w-full h-full cursor-pointer"
              />
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
                <span>Daily Notes</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span>บุคคล / เพื่อนร่วมงาน</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-pink-500" />
                <span>บันทึกการประชุม</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>คู่มือ SOP</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                <span>โปรเจกต์งาน</span>
              </div>
            </div>
          </div>

          {/* Node detail inspector */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col gap-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Info className="w-4 h-4 text-purple-700" />
                <span>ข้อมูลโหนดที่เลือก (Inspector)</span>
              </h3>

              {selectedNodeData ? (
                <div className="flex flex-col gap-3">
                  <div className="p-3.5 bg-purple-50 rounded-xl border border-purple-100">
                    <span className="text-[11px] text-purple-700 font-semibold uppercase block">
                      ชื่อโน้ต (Note Title)
                    </span>
                    <h4 className="text-base font-bold text-purple-950 mt-0.5">
                      [[{selectedNodeData.label}]]
                    </h4>
                    <p className="text-xs text-slate-600 mt-1">
                      {selectedNodeData.description}
                    </p>
                  </div>

                  <div>
                    <span className="text-xs font-bold text-slate-800 block mb-2">
                      เชื่อมโยงกับ ({selectedNodeData.connections.length} รายการ):
                    </span>
                    <ul className="flex flex-col gap-1.5">
                      {selectedNodeData.connections.map(targetId => {
                        const target = nodes.find(n => n.id === targetId);
                        return (
                          <li 
                            key={targetId}
                            onClick={() => setSelectedGraphNode(targetId)}
                            className="text-xs p-2 rounded-lg bg-slate-50 hover:bg-purple-100/60 border border-slate-200 text-purple-900 cursor-pointer flex items-center justify-between transition-colors"
                          >
                            <span>[[{target ? target.label : targetId}]]</span>
                            <span className="text-[10px] text-slate-400">คลิกดู</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-xs text-slate-500 py-6 text-center">
                  คลิกที่จุดวงกลมในแผนผังเพื่อดูการเชื่อมโยง
                </div>
              )}
            </div>

            <div className="bg-purple-50/70 rounded-2xl border border-purple-200 p-4 text-xs text-purple-950 flex flex-col gap-2">
              <span className="font-bold">ประโยชน์ของ Graph View:</span>
              <p className="leading-relaxed">
                ในชีวิตจริง ยิ่งคุณพิมพ์ [[ชื่อคน]] หรือ [[ชื่อโปรเจกต์]] มากเท่าไหร่ แผนผังนี้จะยิ่งขยายใหญ่ขึ้นโดยอัตโนมัติ คุณจะเห็นทันทีว่าใครเป็นศูนย์กลางการประสานงาน และโปรเจกต์ไหนมีเอกสารอ้างอิงมากที่สุด
              </p>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
