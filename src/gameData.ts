export type Category = 'carb' | 'protein' | 'veg' | 'fruit' | 'drink' | 'treat';

export type Gender = 'male' | 'female';
export type SkinTone = 'light' | 'medium-light' | 'medium' | 'medium-dark' | 'dark';
export type HairColor = 'black' | 'brown' | 'blonde' | 'red' | 'silver' | 'pink' | 'green';
export type HairStyle = 'short' | 'long' | 'curly' | 'bald' | 'ponytail';

export type EquipmentSlot = 'hat' | 'shirt' | 'jacket' | 'pants' | 'shoes' | 'bag';
export type Rarity = 'common' | 'rare' | 'epic' | 'legendary';

export interface Equipment {
  id: string;
  name: string;
  slot: EquipmentSlot;
  emoji: string;
  rarity: Rarity;
}

export const EQUIPMENT_DATABASE: Equipment[] = [
  { id: 'h0', name: 'No Hat', slot: 'hat', emoji: '🚫', rarity: 'common' },
  { id: 'h1', name: 'หมวกแก๊ป (Cap)', slot: 'hat', emoji: '🧢', rarity: 'common' },
  { id: 'h2', name: 'หมวกไหมพรม', slot: 'hat', emoji: '👲', rarity: 'rare' },
  { id: 'h3', name: 'Tactical Helmet', slot: 'hat', emoji: '🪖', rarity: 'epic' },
  { id: 'h4', name: 'หมวกคาวบอย', slot: 'hat', emoji: '🤠', rarity: 'legendary' },
  
  { id: 's1', name: 'เสื้อยืดแขนสั้น', slot: 'shirt', emoji: '👕', rarity: 'common' },
  { id: 's2', name: 'เสื้อเชิ้ตลายสก็อต', slot: 'shirt', emoji: '👔', rarity: 'common' },
  { id: 's3', name: 'เสื้อกล้าม', slot: 'shirt', emoji: '🎽', rarity: 'rare' },
  { id: 's4', name: 'ชุดเกราะรบ (Armor)', slot: 'shirt', emoji: '🥋', rarity: 'epic' },
  { id: 's5', name: 'ชุดไซเบอร์เนติค', slot: 'shirt', emoji: '🥷', rarity: 'legendary' },

  { id: 'j0', name: 'No Jacket', slot: 'jacket', emoji: '🚫', rarity: 'common' },
  { id: 'j1', name: 'เสื้อกันหนาว', slot: 'jacket', emoji: '🧥', rarity: 'rare' },
  { id: 'j2', name: 'เสื้อกั๊กนิรภัย', slot: 'jacket', emoji: '🦺', rarity: 'epic' },

  { id: 'p1', name: 'กางเกงยีนส์', slot: 'pants', emoji: '👖', rarity: 'common' },
  { id: 'p2', name: 'กางเกงขาสั้น', slot: 'pants', emoji: '🩳', rarity: 'common' },
  { id: 'p3', name: 'กางเกงรบ (Combat)', slot: 'pants', emoji: '🪖', rarity: 'epic' },

  { id: 'sh1', name: 'รองเท้าผ้าใบ', slot: 'shoes', emoji: '👟', rarity: 'common' },
  { id: 'sh2', name: 'รองเท้าแตะ', slot: 'shoes', emoji: '👡', rarity: 'common' },
  { id: 'sh3', name: 'รองเท้าบูท', slot: 'shoes', emoji: '👢', rarity: 'rare' },
  { id: 'sh4', name: 'Tactical Boots', slot: 'shoes', emoji: '🥾', rarity: 'legendary' },

  { id: 'b0', name: 'No Bag', slot: 'bag', emoji: '🚫', rarity: 'common' },
  { id: 'b1', name: 'กระเป๋านักเรียน', slot: 'bag', emoji: '🎒', rarity: 'common' },
  { id: 'b2', name: 'กระเป๋าหนัง', slot: 'bag', emoji: '👜', rarity: 'rare' },
  { id: 'b3', name: 'กระเป๋าเอกสาร', slot: 'bag', emoji: '💼', rarity: 'epic' },
  { id: 'b4', name: 'Survivor Backpack', slot: 'bag', emoji: '🎒', rarity: 'legendary' },
];

export interface PlayerCharacter {
  gender: Gender;
  skinTone: SkinTone;
  hairColor: HairColor;
  hairStyle: HairStyle;
  equipment: Record<EquipmentSlot, string>;
}

export function getBaseAvatarEmoji(char: PlayerCharacter | null): string {
  if (!char) return '👤';
  const skinMap: Record<SkinTone, string> = {
    'light': '🏻', 'medium-light': '🏼', 'medium': '🏽', 'medium-dark': '🏾', 'dark': '🏿'
  };
  const base = char.gender === 'male' ? '👨' : '👩';
  return base + skinMap[char.skinTone];
}

export interface Food {
  id: string;
  name: string;
  category: Category;
  kcal: number;
  health: number; // -5 to 5
  joy: number; // -5 to 5
  emoji: string;
}

export const FOOD_DATABASE: Food[] = [
  { id: 'f1', name: 'ข้าวสวย (1 ทัพพี)', category: 'carb', kcal: 130, health: 1, joy: 2, emoji: '🍙' },
  { id: 'f2', name: 'ข้าวกล้อง (1 ทัพพี)', category: 'carb', kcal: 110, health: 4, joy: 1, emoji: '🍚' },
  { id: 'f3', name: 'ขนมปังโฮลวีท', category: 'carb', kcal: 70, health: 3, joy: 1, emoji: '🍞' },
  { id: 'f4', name: 'อกไก่ย่าง', category: 'protein', kcal: 165, health: 5, joy: 2, emoji: '🍗' },
  { id: 'f5', name: 'หมูสามชั้นทอด', category: 'protein', kcal: 500, health: -3, joy: 5, emoji: '🥓' },
  { id: 'f6', name: 'ไข่ต้ม', category: 'protein', kcal: 78, health: 4, joy: 2, emoji: '🥚' },
  { id: 'f7', name: 'ปลาแซลมอนย่าง', category: 'protein', kcal: 200, health: 5, joy: 4, emoji: '🍣' },
  { id: 'f8', name: 'ผัดกะเพราหมูสับ', category: 'protein', kcal: 450, health: 0, joy: 4, emoji: '🍛' },
  { id: 'f9', name: 'บรอกโคลี', category: 'veg', kcal: 55, health: 5, joy: 1, emoji: '🥦' },
  { id: 'f10', name: 'สลัดผัก', category: 'veg', kcal: 100, health: 4, joy: 2, emoji: '🥗' },
  { id: 'f11', name: 'กะหล่ำปลีผัด', category: 'veg', kcal: 150, health: 2, joy: 3, emoji: '🥬' },
  { id: 'f12', name: 'กล้วยทอด', category: 'treat', kcal: 250, health: -2, joy: 4, emoji: '🍌' },
  { id: 'f13', name: 'กล้วยหอม (สด)', category: 'fruit', kcal: 120, health: 4, joy: 3, emoji: '🍌' },
  { id: 'f14', name: 'แอปเปิล', category: 'fruit', kcal: 50, health: 5, joy: 2, emoji: '🍎' },
  { id: 'f15', name: 'ส้ม', category: 'fruit', kcal: 45, health: 4, joy: 2, emoji: '🍊' },
  { id: 'f16', name: 'น้ำเปล่า', category: 'drink', kcal: 0, health: 5, joy: 1, emoji: '💧' },
  { id: 'f17', name: 'ชานมไข่มุก', category: 'treat', kcal: 350, health: -4, joy: 5, emoji: '🧋' },
  { id: 'f18', name: 'กาแฟดำ', category: 'drink', kcal: 10, health: 3, joy: 2, emoji: '☕' },
  { id: 'f19', name: 'ลาเต้เย็น', category: 'drink', kcal: 180, health: 0, joy: 4, emoji: '🧊' },
  { id: 'f20', name: 'เค้กช็อกโกแลต', category: 'treat', kcal: 400, health: -4, joy: 5, emoji: '🍰' },
  { id: 'f21', name: 'เฟรนช์ฟรายส์', category: 'treat', kcal: 310, health: -3, joy: 4, emoji: '🍟' },
  { id: 'f22', name: 'น้ำอัดลม', category: 'drink', kcal: 140, health: -4, joy: 3, emoji: '🥤' }
];

export interface Activity {
  id: string;
  name: string;
  burnKcal: number;
  health: number;
  emoji: string;
}

export const ACTIVITY_DATABASE: Activity[] = [
  { id: 'a1', name: 'นั่งทำงาน / พักผ่อน (ไม่มีกิจกรรม)', burnKcal: 0, health: 0, emoji: '💻' },
  { id: 'a2', name: 'ทำงานบ้าน / เดินเล่น (30 นาที)', burnKcal: 100, health: 1, emoji: '🧹' },
  { id: 'a3', name: 'วิ่งจ๊อกกิ้ง / คาดิโอ (30 นาที)', burnKcal: 300, health: 3, emoji: '🏃' },
  { id: 'a4', name: 'เวทเทรนนิ่ง (45 นาที)', burnKcal: 250, health: 4, emoji: '🏋️' },
  { id: 'a5', name: 'โยคะ / ยืดเหยียด (45 นาที)', burnKcal: 150, health: 3, emoji: '🧘' },
  { id: 'a6', name: 'เต้นแอโรบิก (30 นาที)', burnKcal: 350, health: 4, emoji: '💃' },
  { id: 'a7', name: 'ว่ายน้ำ / ปั่นจักรยาน (45 นาที)', burnKcal: 300, health: 4, emoji: '🏊' },
];

export interface MealResult {
  totalKcal: number;
  totalHealth: number;
  totalJoy: number;
  feedbacks: { type: 'positive' | 'negative' | 'warning', text: string }[];
  score: number;
  grade: 'S' | 'A' | 'B' | 'C' | 'F';
}

export function evaluateMeal(foods: Food[]): MealResult {
  let totalKcal = 0;
  let totalHealth = 0;
  let totalJoy = 0;
  const categories = new Set(foods.map(f => f.category));

  foods.forEach(f => {
    totalKcal += f.kcal;
    totalHealth += f.health;
    totalJoy += f.joy;
  });

  const feedbacks: { type: 'positive' | 'negative' | 'warning', text: string }[] = [];
  let score = 50; // base score

  // Score adjustments
  score += totalHealth * 4; // Health items boost score
  
  // Calorie constraints (target is ~300 to 700)
  if (totalKcal > 800) {
    score -= 20;
    feedbacks.push({ type: 'warning', text: 'แคลอรี่มื้อนี้ทะลุ 800 kcal แล้ว! ถ้านี่ไม่ใช่วันที่เล่นกีฬาหนักๆ ระวังน้ำหนักจะพุ่งนะ' });
  } else if (totalKcal < 300 && foods.length > 0) {
    score -= 10;
    feedbacks.push({ type: 'warning', text: 'พลังงานน้อยเกินไป (ไม่ถึง 300 kcal) ระวังจะหิวเร็วและตบะแตกกินจุบจิบทีหลังนะคะ' });
  } else if (foods.length > 0) {
     score += 15;
     feedbacks.push({ type: 'positive', text: 'พลังงานโดยรวมในมื้อนี้กำลังดี! เหมาะกับการใช้ชีวิตประจำวัน' });
  }

  // Nutrition constraints
  if (!categories.has('protein') && foods.length > 0) {
    score -= 15;
    feedbacks.push({ type: 'negative', text: 'มื้อนี้ลืมโปรตีนหรือเปล่า? ร่างกายสร้างกล้ามเนื้อและซ่อมแซมตัวเองไม่ได้ถ้าขาดโปรตีนนะ' });
  }
  
  if (!categories.has('veg') && !categories.has('fruit') && foods.length > 0) {
    score -= 10;
    feedbacks.push({ type: 'negative', text: 'ไฟเบอร์เป็นศูนย์! อย่าลืมเพิ่มผักหรือผลไม้ เพื่อช่วยระบบขับถ่ายและเติมวิตามินด้วย' });
  }
  
  if (categories.has('protein') && (categories.has('veg') || categories.has('fruit')) && categories.has('carb')) {
     score += 20;
     feedbacks.push({ type: 'positive', text: 'ยอดเยี่ยม! ทานครบ 3 หมู่หลัก (คาร์บ+โปรตีน+ผักผลไม้) ถือเป็นมื้อคุณภาพ' });
  }

  const treatCount = foods.filter(f => f.category === 'treat').length;
  if (treatCount > 0) {
     score -= treatCount * 5;
     feedbacks.push({ type: 'warning', text: 'การทานขนมหรือของหวานมอบความสุขให้จิตใจ แต่ต้องระวังน้ำตาลและไขมันแฝงด้วยนะ' });
  }

  if (totalHealth < 0) {
    score -= 15;
    feedbacks.push({ type: 'negative', text: 'คะแนนสุขภาพโดยรวมติดลบ มื้อนี้ห่างไกลคำว่าสุขภาพดีไปหน่อยนะ' });
  } else if (totalHealth > 8) {
     feedbacks.push({ type: 'positive', text: 'โภชนาการมื้อนี้ดีเลิศต่อสุขภาพสุดๆ ร่างกายต้องขอบคุณที่คุณเลือกสิ่งดีๆ ให้!' });
  }

  // Handle empty plate
  if (foods.length === 0) {
    score = 0;
    feedbacks.push({ type: 'negative', text: 'คุณไม่ได้เลือกอาหารเลย แบบนี้หิวแย่แน่ๆ การอดอาหารไม่ใช่วิธีที่ยั่งยืนนะ' });
  }

  // Clamp score
  score = Math.max(0, Math.min(100, score));

  // Determine Grade
  let grade: 'S' | 'A' | 'B' | 'C' | 'F' = 'F';
  if (score >= 90) grade = 'S';
  else if (score >= 80) grade = 'A';
  else if (score >= 65) grade = 'B';
  else if (score >= 50) grade = 'C';
  else grade = 'F';

  return { totalKcal, totalHealth, totalJoy, feedbacks, score, grade };
}
