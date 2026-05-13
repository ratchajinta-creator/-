import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  PlayerCharacter, Gender, SkinTone, HairColor, HairStyle, 
  EquipmentSlot, EQUIPMENT_DATABASE, Equipment
} from "../gameData";
import { Avatar } from "./Avatar";

interface CharacterScreenProps {
  onSubmit: (character: PlayerCharacter) => void;
}

const SKIN_TONES: { id: SkinTone, color: string }[] = [
  { id: 'light', color: '#fcdcd3' },
  { id: 'medium-light', color: '#f2cbbd' },
  { id: 'medium', color: '#dca484' },
  { id: 'medium-dark', color: '#b97a57' },
  { id: 'dark', color: '#7b4c3a' }
];

const HAIR_COLORS: { id: HairColor, color: string }[] = [
  { id: 'black', color: '#1a1a1a' },
  { id: 'brown', color: '#4a3018' },
  { id: 'blonde', color: '#f3c457' },
  { id: 'red', color: '#901a1e' },
  { id: 'silver', color: '#e0e0e0' },
  { id: 'pink', color: '#f48fb1' },
  { id: 'green', color: '#4caf50' }
];

const HAIR_STYLES: { id: HairStyle, label: string }[] = [
  { id: 'short', label: 'สั้น' },
  { id: 'long', label: 'ยาว' },
  { id: 'curly', label: 'หยิก' },
  { id: 'bald', label: 'สกินเฮด' },
  { id: 'ponytail', label: 'หางม้า' }
];

export function CharacterScreen({ onSubmit }: CharacterScreenProps) {
  const [gender, setGender] = useState<Gender>('male');
  const [skinTone, setSkinTone] = useState<SkinTone>('medium');
  const [hairColor, setHairColor] = useState<HairColor>('black');
  const [hairStyle, setHairStyle] = useState<HairStyle>('short');
  
  const [equipment, setEquipment] = useState<Record<EquipmentSlot, string>>({
    hat: 'h0', shirt: 's1', jacket: 'j0', pants: 'p1', shoes: 'sh1', bag: 'b0'
  });

  const [activeTab, setActiveTab] = useState<'base' | 'clothes'>('base');
  const [activeSlot, setActiveSlot] = useState<EquipmentSlot>('shirt');

  const currentChar: PlayerCharacter = { gender, skinTone, hairColor, hairStyle, equipment };

  const handleEquip = (slot: EquipmentSlot, id: string) => {
    setEquipment(prev => ({ ...prev, [slot]: id }));
  };

  const getEquippedItems = () => {
    return Object.values(equipment).map(id => EQUIPMENT_DATABASE.find(e => e.id === id)).filter(Boolean) as Equipment[];
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-900 font-sans text-slate-100 pb-28 selection:bg-yellow-500 selection:text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-black z-0"></div>

      <header className="h-16 flex items-center px-4 sm:px-8 shrink-0 relative z-20 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="bg-yellow-500 px-3 py-1 flex items-center justify-center rounded text-yellow-950 font-black text-sm sm:text-lg italic tracking-widest transform -skew-x-12">VAULT</div>
        </div>
      </header>

      <main className="flex-1 p-4 max-w-6xl mx-auto w-full flex flex-col md:flex-row gap-6 relative z-10">
        
        {/* Avatar Presentation Area */}
        <section className="flex-1 min-h-[300px] md:min-h-[500px] flex flex-col items-center justify-center relative">
           <motion.div
            key="avatar-base"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-56 h-72 sm:w-72 sm:h-[400px] rounded-3xl bg-slate-800 flex flex-col items-center justify-center border border-slate-700 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-black/20 mix-blend-overlay"></div>
            
            <div className="flex flex-col items-center relative z-10 w-full h-full justify-center">
               {/* Base Avatar */}
               <div className="w-48 h-48 sm:w-64 sm:h-64 drop-shadow-2xl flex items-center justify-center -mt-8">
                 <Avatar character={currentChar} className="w-full h-full" />
               </div>
               
               {/* Equipped items shown beneath as icons */}
               <div className="flex gap-2 mt-4 bg-slate-900/80 p-3 rounded-xl backdrop-blur-sm border border-slate-700 shadow-xl z-20 absolute bottom-6">
                  {getEquippedItems().filter(e => e.id !== 'h0' && e.id !== 'j0' && e.id !== 'b0').map(eq => (
                    <div key={eq.id} className="text-3xl rounded" title={eq.name}>{eq.emoji}</div>
                  ))}
               </div>
            </div>
          </motion.div>
        </section>

        {/* Configuration Sidebar */}
        <aside className="w-full md:w-[450px] flex flex-col gap-4">
          
          <div className="flex gap-2">
             <button 
               onClick={() => setActiveTab('base')}
               className={`flex-1 py-3 text-xs font-black uppercase tracking-widest rounded-xl transition-all ${activeTab === 'base' ? 'bg-yellow-400 text-yellow-950 shadow-[0_0_15px_rgba(250,204,21,0.4)]' : 'bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700'}`}
             >
               BASE INFO
             </button>
             <button 
               onClick={() => setActiveTab('clothes')}
               className={`flex-1 py-3 text-xs font-black uppercase tracking-widest rounded-xl transition-all ${activeTab === 'clothes' ? 'bg-yellow-400 text-yellow-950 shadow-[0_0_15px_rgba(250,204,21,0.4)]' : 'bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700'}`}
             >
               EQUIPMENT
             </button>
          </div>

          <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 shadow-xl backdrop-blur-sm flex-1 overflow-y-auto">
             
             {activeTab === 'base' && (
                <div className="flex flex-col gap-6">
                   {/* Gender */}
                   <div>
                     <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">GENDER (เพศ)</h3>
                     <div className="flex gap-2">
                       <button onClick={() => setGender('male')} className={`flex-1 py-2 rounded-lg font-bold text-xs uppercase ${gender === 'male' ? 'bg-slate-700 text-white ring-2 ring-yellow-400' : 'bg-slate-900/50 text-slate-500'}`}>MALE</button>
                       <button onClick={() => setGender('female')} className={`flex-1 py-2 rounded-lg font-bold text-xs uppercase ${gender === 'female' ? 'bg-slate-700 text-white ring-2 ring-yellow-400' : 'bg-slate-900/50 text-slate-500'}`}>FEMALE</button>
                     </div>
                   </div>

                   {/* Skin Tone */}
                   <div>
                     <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">SKIN TONE (สีผิว)</h3>
                     <div className="flex gap-3">
                       {SKIN_TONES.map(skin => (
                         <button 
                           key={skin.id}
                           onClick={() => setSkinTone(skin.id)}
                           className={`w-10 h-10 rounded-full shrink-0 shadow-sm transition-all ${skinTone === skin.id ? 'ring-4 ring-yellow-400 scale-110' : 'ring-2 ring-slate-700 hover:scale-105'}`}
                           style={{ backgroundColor: skin.color }}
                         />
                       ))}
                     </div>
                   </div>

                   {/* Hair Color */}
                   <div>
                     <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">HAIR COLOR (สีผม)</h3>
                     <div className="flex gap-3 flex-wrap">
                       {HAIR_COLORS.map(hair => (
                         <button 
                           key={hair.id}
                           onClick={() => setHairColor(hair.id)}
                           className={`w-10 h-10 rounded-full shrink-0 shadow-sm transition-all ${hairColor === hair.id ? 'ring-4 ring-yellow-400 scale-110' : 'ring-2 ring-slate-700 hover:scale-105'}`}
                           style={{ backgroundColor: hair.color }}
                         />
                       ))}
                     </div>
                   </div>

                   {/* Hair Style */}
                   <div>
                     <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">HAIR STYLE (ทรงผม)</h3>
                     <div className="grid grid-cols-3 gap-2">
                       {HAIR_STYLES.map(style => (
                         <button 
                           key={style.id}
                           onClick={() => setHairStyle(style.id)}
                           className={`py-2 rounded-lg font-bold text-xs ${hairStyle === style.id ? 'bg-slate-700 text-white ring-2 ring-yellow-400' : 'bg-slate-900/50 text-slate-500 hover:bg-slate-800'}`}
                         >
                           {style.label}
                         </button>
                       ))}
                     </div>
                   </div>
                </div>
             )}

             {activeTab === 'clothes' && (
                <div className="flex flex-col gap-4 h-full">
                   {/* Slots Nav */}
                   <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                     {(['hat', 'shirt', 'jacket', 'pants', 'shoes', 'bag'] as EquipmentSlot[]).map(slot => (
                        <button
                          key={slot}
                          onClick={() => setActiveSlot(slot)}
                          className={`px-4 py-2 rounded-lg font-black text-[10px] uppercase tracking-widest shrink-0 transition-all ${activeSlot === slot ? 'bg-slate-700 text-white ring-1 ring-slate-500' : 'bg-slate-900/50 text-slate-500 hover:bg-slate-800'}`}
                        >
                          {slot}
                        </button>
                     ))}
                   </div>
                   
                   {/* Items Grid */}
                   <div className="grid grid-cols-3 gap-3">
                     {EQUIPMENT_DATABASE.filter(e => e.slot === activeSlot).map(item => (
                       <button
                         key={item.id}
                         onClick={() => handleEquip(item.slot, item.id)}
                         className={`relative p-3 rounded-xl border flex flex-col items-center justify-center gap-2 aspect-square transition-all ${
                           equipment[activeSlot] === item.id
                             ? 'border-yellow-400 bg-slate-700 shadow-[0_0_15px_rgba(250,204,21,0.2)]'
                             : 'border-slate-700 bg-slate-900/40 hover:bg-slate-800'
                         }`}
                       >
                         <span className="text-4xl drop-shadow-md">{item.emoji}</span>
                         <span className="text-[9px] font-bold text-center text-slate-300 leading-tight w-full truncate">{item.name}</span>
                         
                         {item.rarity !== 'common' && (
                           <div className={`absolute top-0 right-0 w-2 h-2 rounded-full m-1 ${
                             item.rarity === 'legendary' ? 'bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,1)]' :
                             item.rarity === 'epic' ? 'bg-fuchsia-500 shadow-[0_0_8px_rgba(217,70,239,1)]' :
                             'bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,1)]'
                           }`}></div>
                         )}
                       </button>
                     ))}
                   </div>
                </div>
             )}

          </div>
        </aside>

      </main>

      {/* FIXED action button */}
      <footer className="fixed bottom-0 left-0 right-0 p-4 sm:p-6 z-30 pointer-events-none flex justify-center">
        <button
          onClick={() => onSubmit(currentChar)}
          className="pointer-events-auto max-w-sm w-full bg-yellow-400 hover:bg-yellow-300 text-yellow-950 py-4 sm:py-5 rounded-2xl font-black text-lg uppercase tracking-widest shadow-[0_6px_0_0_#a16207,0_15px_20px_rgba(0,0,0,0.5)] active:shadow-[0_0px_0_0_#a16207,0px_0px_0px_rgba(0,0,0,0)] active:translate-y-[6px] transition-all flex justify-center items-center gap-2"
        >
          <span className="animate-pulse">▶</span> START BATTLE
        </button>
      </footer>
    </div>
  );
}
