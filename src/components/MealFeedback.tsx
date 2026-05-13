import React from "react";
import { motion } from "motion/react";
import { Food, evaluateMeal } from "../gameData";
import { CheckCircle2, AlertTriangle, XCircle, ArrowRight } from "lucide-react";

interface MealFeedbackProps {
  mealName: string;
  foods: Food[];
  isLast: boolean;
  onNext: () => void;
}

export function MealFeedback({ mealName, foods, isLast, onNext }: MealFeedbackProps) {
  const result = evaluateMeal(foods);

  return (
    <div className="min-h-screen p-4 py-8 max-w-2xl mx-auto flex flex-col justify-center">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-xl shadow-sm border-2 border-slate-200 overflow-hidden flex flex-col font-sans"
      >
        {/* Header */}
        <div className="bg-emerald-600 p-6 text-center text-white border-b-4 border-emerald-800">
          <p className="text-[10px] uppercase font-bold text-emerald-200 tracking-widest mb-1">รายงานโภชนาการ</p>
          <h2 className="text-xl font-black tracking-wider uppercase">สรุป {mealName}</h2>
        </div>

        <div className="p-4 sm:p-6 flex flex-col gap-6">
          {/* Chosen Foods */}
          <div>
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-slate-300 rounded-full"></span> เมนูที่จัดไว้
            </h3>
            {foods.length === 0 ? (
              <p className="text-[10px] text-slate-500 font-mono bg-slate-50 border border-slate-200 p-3 rounded-lg text-center">NO_FOOD_SELECTED</p>
            ) : (
              <div className="flex flex-wrap gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                {foods.map((food, i) => (
                  <div key={i} className="flex items-center gap-1.5 bg-white px-2 py-1.5 rounded border border-slate-200 shadow-sm">
                    <span className="text-sm">{food.emoji}</span>
                    <span className="text-[10px] font-bold text-slate-700 uppercase">{food.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-xl p-3 border-2 border-slate-200 shadow-sm relative overflow-hidden">
              <div className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1 flex justify-between">
                <span>แคลอรี่รวม</span>
                <span>(KCAL)</span>
              </div>
              <div className="text-3xl font-black text-slate-800">{result.totalKcal}</div>
              <div className="absolute -bottom-4 -right-4 text-emerald-50 opacity-10 font-bold text-6xl">🔥</div>
            </div>
            <div className={`bg-white rounded-xl p-3 border-2 border-slate-200 shadow-sm relative overflow-hidden`}>
              <div className={`text-[10px] font-black uppercase tracking-widest mb-1 flex justify-between ${result.totalHealth < 0 ? "text-amber-500" : "text-blue-500"}`}>
                <span>คะแนนสุขภาพ</span>
                <span>(PTS)</span>
              </div>
              <div className="text-3xl font-black text-slate-800">{result.totalHealth > 0 ? `+${result.totalHealth}` : result.totalHealth}</div>
              <div className="absolute -bottom-4 -right-4 text-blue-50 opacity-10 font-bold text-6xl">❤️</div>
            </div>
          </div>

          {/* AI-Free Logic Generator Feedbacks */}
          <div>
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-slate-300 rounded-full"></span> การวิเคราะห์จากฐานข้อมูล
            </h3>
            <div className="space-y-2">
              {result.feedbacks.map((fb, idx) => {
                let Icon = null;
                let borderClass = "";
                let textClass = "";
                let bgClass = "";

                if (fb.type === 'positive') {
                  Icon = CheckCircle2;
                  bgClass = "bg-emerald-50";
                  borderClass = "border-emerald-200";
                  textClass = "text-emerald-800";
                } else if (fb.type === 'negative') {
                  Icon = XCircle;
                  bgClass = "bg-rose-50";
                  borderClass = "border-rose-200";
                  textClass = "text-rose-800";
                } else {
                  Icon = AlertTriangle;
                  bgClass = "bg-amber-50";
                  borderClass = "border-amber-200";
                  textClass = "text-amber-800";
                }

                return (
                  <motion.div 
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    key={idx} 
                    className={`flex items-start gap-3 p-3 rounded-lg border ${bgClass} ${borderClass}`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 mt-0.5 ${textClass}`} />
                    <p className={`font-bold text-xs ${textClass}`}>{fb.text}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={onNext}
            className="w-full flex items-center justify-center gap-2 py-4 mt-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-black text-sm uppercase tracking-widest shadow-[0_4px_0_0_#065f46] active:shadow-none active:translate-y-1 transition-all"
          >
            ต่อไป: กิจกรรมเผาผลาญ
            <ArrowRight size={16} strokeWidth={3} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
