import React, { useState } from 'react';
import { 
  HelpCircle, CheckCircle2, AlertTriangle, ShieldCheck, 
  MessageSquare, Lightbulb, Users, Clock, Sparkles
} from 'lucide-react';

export const TrainerPrepGuide: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const trickyFaqs = [
    {
      q: '1. "ถ้าคอมพิวเตอร์เครื่องนี้พัง หรือฮาร์ดดิสก์เสีย โน้ตที่เราจดไว้ทั้งหมดจะหายไหม?"',
      answer: 'ตอบอย่างมั่นใจ: "หายได้ถ้าเราไม่สำรองข้อมูล เหมือนไฟล์ Word หรือ Excel ทั่วไปเลยครับ! แต่วิธีป้องกันของ Obsidian ง่ายที่สุดในโลกคือ: Vault ของเราคือโฟลเดอร์ธรรมดา แค่เราคลิกขวา Copy โฟลเดอร์นี้ไปเก็บไว้ใน Google Drive, OneDrive ของบริษัท หรือ Flash Drive ทุกเย็นวันศุกร์ (ใช้เวลาแค่ 10 วินาที) ข้อมูลก็จะปลอดภัยตลอดไปครับ"',
      trainerTip: 'ไม่ต้องพูดเรื่อง Git หรือ GitHub เด็ดขาด ให้บอกแค่ "Copy โฟลเดอร์ไปวางในไดรฟ์"'
    },
    {
      q: '2. "ทำไมเราไม่ใช้ Microsoft Word หรือ OneNote ต่อไปล่ะ? ทำไมต้องมานั่งเรียนโปรแกรมใหม่?"',
      answer: 'ตอบอย่างเห็นภาพ: "Word เหมาะมากสำหรับการทำรายงานรูปเล่มส่งหัวหน้าครับ แต่ไม่เหมาะกับการเป็นสมุดบันทึกประจำวัน เพราะ Word โหลดช้า บรรทัดเด้ง และเชื่อมโยงหากันไม่ได้ ส่วน Obsidian เหมือนสมุดพกติดตัวที่เปิดจดได้ใน 1 วินาที และมีจุดเด่นที่สุดคือเวลาเราพิมพ์ชื่อเพื่อนร่วมงานด้วย [[...]] มันจะตามรอยประวัติการทำงานให้เราเองอัตโนมัติ ซึ่ง Word ทำไม่ได้ครับ"',
      trainerTip: 'ชูจุดเด่นเรื่อง Backlinks และความเร็วในการเปิดโปรแกรม'
    },
    {
      q: '3. "ถ้าหัวหน้าหรือเพื่อนร่วมงานที่ไม่ได้ลง Obsidian อยากอ่านโน้ตของเรา เขาจะเปิดอ่านได้ไหม?"',
      answer: 'ตอบ: "เปิดได้สบายมากครับ! มี 2 วิธีง่ายๆ: 1) ไฟล์ของเราคือนามสกุล .md เปิดด้วยโปรแกรม Notepad ธรรมดาในเครื่องไหนในโลกก็ได้ หรือ 2) ใน Obsidian มีปุ่มลัด Export to PDF กดปุ่มเดียวแปลงเป็นไฟล์ PDF สวยงามส่งอีเมลให้หัวหน้าอ่านได้ทันทีครับ"',
      trainerTip: 'ผู้เรียนกลัวว่าไฟล์จะถูกล็อกในระบบ ยืนยันว่าไฟล์เป็น Plain Text เปิดที่ไหนก็ได้'
    },
    {
      q: '4. "Obsidian มีค่าใช้จ่ายแอบแฝงไหม ในอนาคตบริษัทจะมาเรียกเก็บเงินเราไหม?"',
      answer: 'ตอบ: "Obsidian ใช้งานได้ฟรี 100% สำหรับการใช้งานส่วนบุคคลและการจัดระเบียบงานส่วนตัวครับ ไม่ต้องกรอกบัตรเครดิต ไม่ต้องผูกบัญชีใดๆ ทั้งสิ้นครับ"',
      trainerTip: 'คลายกังวลเรื่องการเบิกเงินหรือเรื่องลิขสิทธิ์'
    },
    {
      q: '5. "ใช้ในโทรศัพท์มือถือได้ไหม? ข้อมูลจะซิงก์กันยังไง?"',
      answer: 'ตอบ: "Obsidian มีแอปทั้งบน iPhone และ Android ครับ แต่สำหรับระดับ 101 แนะนำให้ทุกคนเริ่มใช้บนคอมพิวเตอร์ทำงานให้คล่องก่อน เมื่อคล่องแล้ว สามารถซิงก์ผ่าน iCloud หรือ Google Drive ได้อย่างง่ายดายครับ"',
      trainerTip: 'อย่าเพิ่งพานักเรียนไปซิงก์มือถือในสัปดาห์แรกๆ เพราะจะทำให้หลุดโฟกัสจากพื้นฐาน'
    }
  ];

  const troubleshootingList = [
    {
      issue: 'พิมพ์เครื่องหมาย # แล้วตัวหนังสือไม่ใหญ่ขึ้น',
      cause: 'ลืมเคาะ Spacebar 1 ครั้ง',
      solution: 'ต้องพิมพ์ "# สรุปงาน" (มีเว้นวรรค) ไม่ใช่ "#สรุปงาน"'
    },
    {
      issue: 'พิมพ์ [[ แล้วไม่มีรายชื่อโน้ตขึ้นมา',
      cause: 'คีย์บอร์ดค้างภาษาไทย หรือกดวงเล็บไม่ครบ 2 ตัว',
      solution: 'สลับภาษาเป็นอังกฤษ แล้วกด [[ สองตัวติดกัน'
    },
    {
      issue: 'หาปุ่ม Save (บันทึกไฟล์) ไม่เจอ กลัวงานหาย',
      cause: 'ติดนิสัยจากโปรแกรม Word',
      solution: 'Obsidian บันทึกให้อัตโนมัติทุกตัวอักษรทันทีที่พิมพ์ ไม่ต้องกดบันทึกเลย'
    },
    {
      issue: 'จำไม่ได้ว่าเซฟ Vault ไว้ที่โฟลเดอร์ไหนในเครื่อง',
      cause: 'ตอนสร้างคลิกผ่านไปเร็ว',
      solution: 'คลิกขวาที่ชื่อโน้ตในแถบซ้าย แล้วเลือก "Show in system explorer" จะเปิดหน้าต่างโฟลเดอร์ใน Windows ให้ทันที'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
      
      {/* Hero Box for Trainer */}
      <div className="bg-gradient-to-br from-purple-900 to-indigo-950 text-white rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-semibold text-purple-300 mb-2">
          <Sparkles className="w-4 h-4" />
          <span>Trainer's Rescue & Confidence Kit</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
          คู่มือเตรียมตัวสำหรับผู้สอนมือใหม่ (อ่านจบใน 10 นาที)
        </h1>
        <p className="text-sm sm:text-base text-purple-200 leading-relaxed max-w-2xl">
          แม้คุณจะไม่ใช่เซียนไอที คุณก็สามารถสอนคลาสนี้ได้อย่างมั่นใจ! นี่คือเคล็ดลับ จิตวิทยาการสอนคน Non-IT และคำตอบสำเร็จรูปเมื่อโดนถามคำถามในห้องเรียน
        </p>
      </div>

      {/* 4 Golden Rules */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>4 กฎเหล็กในการสอนคน Back Office ให้เข้าใจง่าย</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col gap-1.5">
            <span className="font-bold text-slate-900 text-sm">1. ห้ามใช้คำศัพท์ไอทีเด็ดขาด</span>
            <p className="text-xs text-slate-600 leading-relaxed">
              อย่าพูดคำว่า "Database", "Repository", "Syntax", "Markup" ให้ใช้คำว่า "ตู้เอกสาร", "กระดาษโน้ต", "สัญลักษณ์ย่อ" แทนเสมอ
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col gap-1.5">
            <span className="font-bold text-slate-900 text-sm">2. ยกตัวอย่างงานจริงที่เขาทำทุกวัน</span>
            <p className="text-xs text-slate-600 leading-relaxed">
              เช่น "ใบคืนเงินสดย่อย", "การสั่งซื้อของ", "นัดประชุมผู้จัดการ" อย่าใช้ตัวอย่างแนวโปรแกรมมิ่งหรือเขียนบล็อก
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col gap-1.5">
            <span className="font-bold text-slate-900 text-sm">3. เน้นจับมือทำทีละ 1 บรรทัด</span>
            <p className="text-xs text-slate-600 leading-relaxed">
              หลังพูด 1 หัวข้อ ให้หยุดแล้วบอกว่า "ตอนนี้ให้ทุกคนลองพิมพ์ตามนะครับ ผมจะรอ 2 นาที" อย่าพูดรวดเดียวจบสไลด์
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col gap-1.5">
            <span className="font-bold text-slate-900 text-sm">4. ถ้าตอบไม่ได้ ให้ตอบว่า "เดี๋ยวเช็คให้"</span>
            <p className="text-xs text-slate-600 leading-relaxed">
              ถ้าผู้เรียนถามฟังก์ชันลึกๆ ไม่ต้องตื่นตระหนก ตอบอย่างสุภาพว่า "เป็นคำถามที่ดีมากครับ ฟีเจอร์นี้เดี๋ยวผมขอไปลองเล่นแล้วมาแชร์ในสัปดาห์หน้าครับ"
            </p>
          </div>
        </div>
      </div>

      {/* Tricky FAQ Accordion */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-purple-700" />
            <span>คลังคำตอบสำเร็จรูป เมื่อเจอคำถามยากๆ ในคลาส</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            คลิกดูคำตอบที่คุณสามารถนำไปพูดตอบผู้เรียนได้ทันที
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {trickyFaqs.map((faq, idx) => (
            <div 
              key={idx}
              className="border border-slate-200 rounded-xl overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full text-left p-4 bg-slate-50 hover:bg-slate-100/80 flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-800 cursor-pointer"
              >
                <span>{faq.q}</span>
                <span className="text-slate-400 font-bold ml-2">
                  {openFaq === idx ? '−' : '+'}
                </span>
              </button>

              {openFaq === idx && (
                <div className="p-4 bg-white flex flex-col gap-2.5 border-t border-slate-200 text-xs sm:text-sm">
                  <div className="p-3 bg-purple-50/70 rounded-lg border border-purple-200 text-purple-950 leading-relaxed">
                    🗣️ <strong>แนวทางการตอบ:</strong> {faq.answer}
                  </div>
                  <div className="text-[11px] text-amber-800 flex items-center gap-1.5 font-medium">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>โน้ตสำหรับผู้สอน: {faq.trainerTip}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Troubleshooting Table */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col gap-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
          <span>ตารางแก้ไขปัญหาเฉพาะหน้า (เวลานักเรียนร้องบอกว่า "ทำไม่ได้!")</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-700">
                <th className="py-2.5 px-3 font-semibold">อาการที่ผู้เรียนพบ</th>
                <th className="py-2.5 px-3 font-semibold">สาเหตุที่แท้จริง</th>
                <th className="py-2.5 px-3 font-semibold">วิธีแก้ง่ายๆ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {troubleshootingList.map((t, i) => (
                <tr key={i} className="hover:bg-slate-50/40">
                  <td className="py-2.5 px-3 font-medium text-rose-900 bg-rose-50/30">
                    {t.issue}
                  </td>
                  <td className="py-2.5 px-3 text-slate-600">
                    {t.cause}
                  </td>
                  <td className="py-2.5 px-3 text-emerald-800 font-medium bg-emerald-50/30">
                    {t.solution}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
