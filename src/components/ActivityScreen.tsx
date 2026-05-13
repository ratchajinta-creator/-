import React, { useState } from "react";
import { motion } from "motion/react";
import { Activity, ACTIVITY_DATABASE } from "../gameData";

interface ActivityScreenProps {
  mealName: string;
  onSubmit: (activity: Activity) => void;
}

export function ActivityScreen({ mealName, onSubmit }: ActivityScreenProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedActivity = selectedId ? ACTIVITY_DATABASE.find(a => a.id === selectedId) : null;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      <header className="h-16 bg-blue-600 flex items-center justify-between px-4 sm:px-8 shadow-md border-b-4 border-blue-800 shrink-0 sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <div className="bg-white px-2 py-1 flex items-center justify-center rounded-lg text-blue-700 font-black text-sm sm:text-lg">ACTIVITY</div>
          <h1 className="font-bold text-white text-sm sm:text-xl uppercase tracking-wider">หลัง{mealName}</h1>
        </div>
        <div className="flex items-center gap-2">
           <span className="text-blue-100 text-[10px] sm:text-xs font-bold uppercase tracking-widest hidden sm:inline">เผาผลาญ:</span>
           <span className="text-2xl font-black text-white">{selectedActivity ? selectedActivity.burnKcal : 0}</span>
        </div>
      </header>

      <main className="flex-1 p-4 max-w-5xl mx-auto w-full flex flex-col gap-4">
        <aside className="bg-slate-900 rounded-xl p-3 text-white shadow-sm">
          <p className="text-[10px] text-slate-400 font-mono mb-1">SYS_LOG: ACTIVITY_SELECTION</p>
          <p className="text-[10px] text-blue-400 font-mono">{"> "} เลือกระดับการออกกำลังกายหรือกิจกรรมหลังมื้ออาหาร</p>
          <p className="text-[10px] text-slate-400 font-mono">{"> "} ช่วยเผาผลาญแคลอรี่ไขมันและเพิ่มความแข็งแรง</p>
        </aside>

        <section className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {ACTIVITY_DATABASE.map((activity, i) => {
            const isSelected = selectedId === activity.id;
            return (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.02 }}
                key={activity.id}
                onClick={() => setSelectedId(activity.id)}
                className={`bg-white border-2 p-3 rounded-xl cursor-pointer shadow-sm flex flex-col relative transition-all min-h-[140px] ${
                  isSelected 
                    ? "border-blue-500 ring-2 ring-blue-50" 
                    : "border-slate-200 hover:border-blue-500 hover:-translate-y-0.5"
                }`}
              >
                {isSelected && (
                  <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold z-10 shadow-sm leading-none">SELECTED</div>
                )}
                <div className={`h-20 rounded-lg mb-2 flex items-center justify-center text-4xl shrink-0 transition-colors ${isSelected ? 'bg-blue-50' : 'bg-slate-100'}`}>
                  {activity.emoji}
                </div>
                <h3 className="font-bold text-sm leading-tight flex-1 line-clamp-2">{activity.name}</h3>
                <div className="mt-2 text-[10px] font-bold text-slate-500 flex justify-between items-center border-t border-slate-100 pt-2">
                   <span className="text-amber-600">🔥 {activity.burnKcal} kcal</span>
                   <span className="text-emerald-600">❤️ +{activity.health} pts</span>
                </div>
              </motion.div>
            );
          })}
        </section>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 h-16 bg-slate-100 border-t border-slate-200 flex items-center px-4 sm:px-8 gap-4 shadow-[0_-4px_10px_rgba(0,0,0,0.02)] z-30">
        <div className="flex gap-2 text-[10px] sm:text-xs font-bold text-slate-500 flex-1 uppercase tracking-widest">
          {selectedId ? <span>กิจกรรม: <span className="text-blue-600">{selectedActivity?.name}</span></span> : <span>กรุณาเลือกกิจกรรมอย่างน้อย 1 รายการ</span>}
        </div>
        <button
          disabled={!selectedId}
          onClick={() => {
            if (selectedActivity) onSubmit(selectedActivity);
          }}
          className={`px-6 sm:px-8 py-3 rounded-xl font-black text-sm uppercase tracking-wider shadow-[0_4px_0_0_rgba(0,0,0,0.2)] active:shadow-none active:translate-y-1 transition-all ${
            selectedId ? "bg-blue-600 hover:bg-blue-700 text-white shadow-[0_4px_0_0_#1e40af]" : "bg-slate-300 text-slate-500 cursor-not-allowed"
          }`}
        >
          ยืนยันกิจกรรม
        </button>
      </footer>
    </div>
  );
}
