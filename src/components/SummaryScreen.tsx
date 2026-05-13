import React from "react";
import { motion } from "motion/react";
import { Food, Activity, evaluateMeal, PlayerCharacter } from "../gameData";
import { Trophy, RefreshCcw, HeartPulse } from "lucide-react";
import { Avatar } from "./Avatar";

interface SummaryScreenProps {
  history: { mealName: string; foods: Food[], activity?: Activity }[];
  character: PlayerCharacter | null;
  onRestart: () => void;
}

export function SummaryScreen({ history, character, onRestart }: SummaryScreenProps) {
  let dailyKcal = 0;
  let dailyHealth = 0;
  let burnedKcal = 0;
  let totalScore = 0;

  history.forEach((h) => {
    const res = evaluateMeal(h.foods);
    dailyKcal += res.totalKcal;
    dailyHealth += res.totalHealth;
    totalScore += res.score;
    if (h.activity) {
       burnedKcal += h.activity.burnKcal;
       dailyHealth += h.activity.health;
    }
  });

  const netKcal = dailyKcal - burnedKcal;
  
  // Calculate average score including activity bonus
  let avgScore = totalScore / (history.length || 1);
  if (burnedKcal > 0) {
     avgScore += 10;
  }
  avgScore = Math.min(100, Math.max(0, avgScore));

  // Determine Overall Grade
  let grade = 'F';
  let gradeColor = 'text-slate-500';
  let gradeMessage = '';

  if (avgScore >= 90) {
    grade = 'S';
    gradeMessage = 'สมบูรณ์แบบ! ร่างกายแข็งแรงสุดๆ กินดีและออกกำลังกายอย่างเหมาะสม การันตีหุ่นเฟิร์มสุขภาพดีระยะยาว (คะแนน: ' + Math.round(avgScore) + '/100)';
    gradeColor = 'text-fuchsia-500';
  } else if (avgScore >= 80) {
    grade = 'A';
    gradeMessage = 'เก่งมาก! มื้ออาหารของคุณและการขยับกายดีต่อสุขภาพอย่างเห็นได้ชัด (คะแนน: ' + Math.round(avgScore) + '/100)';
    gradeColor = 'text-emerald-500';
  } else if (avgScore >= 65) {
    grade = 'B';
    gradeMessage = 'อยู่ในเกณฑ์ดีครับ มีบางมื้อที่ควรปรับปรุงนิดหน่อย แต่ภาพรวมก็โอเค! (คะแนน: ' + Math.round(avgScore) + '/100)';
    gradeColor = 'text-blue-500';
  } else if (avgScore >= 50) {
    grade = 'C';
    gradeMessage = 'ควรระวังเรื่องการทานของทอด/ของหวาน หรืออาจจะกินเยอะเกินไปโดยไม่ออกกำลังกาย ลองปรับให้สมดุลขึ้นนะ (คะแนน: ' + Math.round(avgScore) + '/100)';
    gradeColor = 'text-amber-500';
  } else {
    grade = 'F';
    gradeMessage = 'น่าเป็นห่วง! ถ้ารับประทานแบบนี้ยาวๆ โรคถามหาแน่ๆ พรุ่งนี้ลองแก้ไขด่วน และเพิ่มการขยับร่างกายด้วยนะ! (คะแนน: ' + Math.round(avgScore) + '/100)';
    gradeColor = 'text-rose-500';
  }

  return (
    <div className="min-h-screen p-4 py-8 max-w-lg mx-auto flex flex-col justify-center font-sans">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white rounded-xl shadow-sm border-2 border-slate-200 overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="bg-slate-900 border-b-4 border-slate-800 p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="absolute -top-10 -right-10 opacity-10 w-64 h-64">
            <Avatar character={character} className="w-full h-full grayscale" />
          </div>
          <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center border border-slate-700 mb-4 shadow-inner relative z-10">
            <Trophy className="w-8 h-8 text-yellow-400" />
          </div>
          <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase mb-1 relative z-10">MISSION COMPLETE</p>
          <h1 className="text-xl font-black text-white uppercase tracking-wider relative z-10">สรุปคะแนนประจำวัน</h1>
        </div>

        <div className="p-6">
          {/* Grade Display */}
          <div className="text-center mb-6">
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">เกรดประเมินผลโภชนาการ</div>
            <div className={`text-8xl font-black mb-4 leading-none ${gradeColor}`}>{grade}</div>
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-xs font-bold text-slate-600">
              {gradeMessage}
            </div>
          </div>

          {/* Daily Stats Grid */}
          <div className="space-y-3 mb-6">
            <div className="bg-white border-2 border-slate-200 rounded-xl p-3 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600 border border-emerald-100">
                  <HeartPulse size={20} />
                </div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">รับพลังงานรวม</span>
              </div>
              <div className="text-xl font-black text-slate-800">{dailyKcal} <span className="text-[10px] text-slate-400">KCAL</span></div>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-xl p-3 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center text-amber-600 border border-amber-100">
                  <span className="text-lg">🔥</span>
                </div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">เผาผลาญ (กิจกรรม)</span>
              </div>
              <div className="text-xl font-black text-slate-800">{burnedKcal} <span className="text-[10px] text-slate-400">KCAL</span></div>
            </div>

            <div className="bg-slate-900 border-2 border-slate-800 rounded-xl p-4 flex items-center justify-between shadow-lg">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">พลังงานสุทธิ (NET)</span>
              </div>
              <div className="text-2xl font-black text-white">{netKcal} <span className="text-[10px] text-slate-400">KCAL</span></div>
            </div>
            
            <div className="bg-white border-2 border-slate-200 rounded-xl p-3 flex items-center justify-between shadow-sm">
               <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 border border-blue-100">
                  <span className="text-lg">✨</span>
                </div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">แต้มสุขภาพรวม</span>
              </div>
              <div className="text-xl font-black text-slate-800">{dailyHealth > 0 ? `+${dailyHealth}` : dailyHealth} <span className="text-[10px] text-slate-400">PTS</span></div>
            </div>
          </div>

          <button
            onClick={onRestart}
            className="w-full flex justify-center items-center gap-2 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-black text-sm uppercase tracking-widest shadow-[0_4px_0_0_#065f46] active:shadow-none active:translate-y-1 transition-all"
          >
            <RefreshCcw size={16} strokeWidth={3} />
            เริ่มภารกิจใหม่
          </button>
        </div>
      </motion.div>
    </div>
  );
}
