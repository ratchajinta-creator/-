import React, { useState } from "react";
import { motion } from "motion/react";
import { FOOD_DATABASE, Food, PlayerCharacter } from "../gameData";
import { Avatar } from "./Avatar";

interface MealBuilderProps {
  mealName: string;
  mealIndex: number;
  character: PlayerCharacter | null;
  onSubmit: (foods: Food[]) => void;
}

export function MealBuilder({ mealName, mealIndex, character, onSubmit }: MealBuilderProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleSelection = (id: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) return prev.filter((i) => i !== id);
      if (prev.length >= 5) return prev; // Max 5 items per meal
      return [...prev, id];
    });
  };

  const selectedFoods = selectedIds.map(id => FOOD_DATABASE.find(f => f.id === id)!);
  const currentKcal = selectedFoods.reduce((sum, f) => sum + f.kcal, 0);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      <header className="h-16 bg-emerald-600 flex items-center justify-between px-4 sm:px-8 shadow-md border-b-4 border-emerald-800 shrink-0 sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center text-xl shadow-inner border border-emerald-400 overflow-hidden relative">
            <Avatar character={character} />
          </div>
          <div className="bg-white px-2 py-1 flex items-center justify-center rounded-lg text-emerald-700 font-black text-xs sm:text-sm">STG {mealIndex + 1}</div>
          <h1 className="font-bold text-white text-sm sm:text-xl uppercase tracking-wider hidden sm:block">{mealName}</h1>
        </div>
        <div className="flex items-center gap-2">
           <span className="text-emerald-100 text-[10px] sm:text-xs font-bold uppercase tracking-widest hidden sm:inline">พลังงานรวม:</span>
           <span className={`text-2xl font-black ${currentKcal > 800 ? "text-rose-300" : "text-white"}`}>{currentKcal}</span>
        </div>
      </header>

      <main className="flex-1 p-4 max-w-5xl mx-auto w-full flex flex-col gap-4">
        <aside className="bg-slate-900 rounded-xl p-3 text-white shadow-sm">
          <p className="text-[10px] text-slate-400 font-mono mb-1">SYS_LOG: MISSION_START</p>
          <p className="text-[10px] text-emerald-400 font-mono">{"> "} เลือกประสมอาหาร 1-5 อย่าง ให้สมดุลโภชนาการ</p>
          <p className="text-[10px] text-slate-400 font-mono">{"> "} ระวังอย่าให้แคลอรี่รวมเกินความพอดี</p>
        </aside>

        <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {FOOD_DATABASE.map((food, i) => {
            const isSelected = selectedIds.includes(food.id);
            return (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.02 }}
                key={food.id}
                onClick={() => toggleSelection(food.id)}
                className={`bg-white border-2 p-3 rounded-xl cursor-pointer shadow-sm flex flex-col relative transition-all min-h-[160px] ${
                  isSelected 
                    ? "border-emerald-500 ring-2 ring-emerald-50" 
                    : "border-slate-200 hover:border-emerald-500 hover:-translate-y-0.5"
                }`}
              >
                {isSelected && (
                  <div className="absolute -top-2 -right-2 bg-emerald-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold z-10 shadow-sm leading-none">SELECTED</div>
                )}
                <div className={`h-24 rounded-lg mb-2 flex items-center justify-center text-6xl drop-shadow-md shrink-0 transition-colors ${isSelected ? 'bg-emerald-50' : 'bg-slate-100'}`}>
                  {food.emoji}
                </div>
                <h3 className="font-bold text-sm leading-tight flex-1">{food.name}</h3>
                <div className="mt-2 text-[10px] font-bold text-slate-500 flex justify-between items-center border-t border-slate-100 pt-2">
                   <span>{food.kcal} kcal</span>
                </div>
              </motion.div>
            );
          })}
        </section>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 h-16 bg-slate-100 border-t border-slate-200 flex items-center px-4 sm:px-8 gap-4 shadow-[0_-4px_10px_rgba(0,0,0,0.02)] z-30">
        <div className="flex gap-2 text-[10px] sm:text-xs font-bold text-slate-500 flex-1 uppercase tracking-widest">
          <span>เลือกแล้ว: <span className="text-emerald-600">{selectedIds.length}</span>/5</span>
        </div>
        <button
          onClick={() => onSubmit(selectedFoods)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 sm:px-8 py-3 rounded-xl font-black text-sm uppercase tracking-wider shadow-[0_4px_0_0_#065f46] active:shadow-none active:translate-y-1 transition-all"
        >
          ยืนยันมื้ออาหาร
        </button>
      </footer>
    </div>
  );
}
