import { motion } from "motion/react";
import { Utensils } from "lucide-react";

interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-4 font-sans">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.5 }}
        className="bg-white border-2 border-slate-200 rounded-xl p-6 shadow-sm max-w-[400px] w-full flex flex-col text-center"
      >
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-xl border-2 border-emerald-200 flex items-center justify-center mx-auto mb-4">
          <Utensils size={32} />
        </div>
        <h1 className="text-xl font-black text-slate-800 uppercase tracking-widest mb-2">โภชนาการ มาสเตอร์</h1>
        <p className="text-xs text-slate-500 mb-6 font-medium leading-relaxed">
          แอปจำลองการจัดจานอาหาร (Active Learning) สร้างมื้ออาหารสุขภาพใน 1 วัน! รับบททดสอบ 3 มื้อ
        </p>
        <div className="text-left bg-slate-50 border border-slate-200 p-4 rounded-lg mb-6 space-y-3">
          <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">กฎโภชนาการ (RULES)</h2>
          <div className="flex gap-2 items-start">
            <span className="text-emerald-500 text-sm mt-0.5">✅</span>
            <span className="text-xs font-bold text-slate-600">วิกฤตความหิว: ห้ามอดอาหารเด็ดขาด</span>
          </div>
          <div className="flex gap-2 items-start">
            <span className="text-amber-500 text-sm mt-0.5">⚠️</span>
            <span className="text-xs font-bold text-slate-600">กับดักน้ำตาล: เลี่ยงขนมหวาน</span>
          </div>
          <div className="flex gap-2 items-start">
            <span className="text-blue-500 text-sm mt-0.5">⚖️</span>
            <span className="text-xs font-bold text-slate-600">จัดจานแบบ MyPlate ให้สมดุล</span>
          </div>
        </div>
        <button
          onClick={onStart}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl font-black text-sm uppercase tracking-wider shadow-[0_4px_0_0_#065f46] active:shadow-none active:translate-y-1 transition-all"
        >
          เริ่มภารกิจจำลอง
        </button>
      </motion.div>
    </div>
  );
}
