import React, { useState } from 'react';
import { StartScreen } from './components/StartScreen';
import { CharacterScreen } from './components/CharacterScreen';
import { MealBuilder } from './components/MealBuilder';
import { MealFeedback } from './components/MealFeedback';
import { ActivityScreen } from './components/ActivityScreen';
import { SummaryScreen } from './components/SummaryScreen';
import { Food, Activity, PlayerCharacter } from './gameData';

type GameState = 'start' | 'character' | 'building' | 'feedback' | 'activity' | 'summary';

export default function App() {
  const [gameState, setGameState] = useState<GameState>('start');
  const [character, setCharacter] = useState<PlayerCharacter | null>(null);
  const [currentMealIndex, setCurrentMealIndex] = useState(0);
  const [dailyHistory, setDailyHistory] = useState<{mealName: string, foods: Food[], activity?: Activity}[]>([]);
  const [currentSelection, setCurrentSelection] = useState<Food[]>([]);

  const meals = ['มื้อเช้า', 'มื้อกลางวัน', 'มื้อเย็น'];
  const currentMealName = meals[currentMealIndex];

  const startGame = () => {
     setDailyHistory([]);
     setCurrentMealIndex(0);
     setGameState('character');
  };

  const submitCharacter = (char: PlayerCharacter) => {
     setCharacter(char);
     setGameState('building');
  };

  const submitMeal = (foods: Food[]) => {
     setCurrentSelection(foods);
     setGameState('feedback');
  };

  const nextToActivity = () => {
     setGameState('activity');
  };

  const submitActivity = (activity: Activity) => {
     const newHistory = [...dailyHistory, { mealName: currentMealName, foods: currentSelection, activity }];
     setDailyHistory(newHistory);
     
     if (currentMealIndex < meals.length - 1) {
        setCurrentMealIndex(currentMealIndex + 1);
        setGameState('building');
     } else {
        setGameState('summary');
     }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-200">
       {gameState === 'start' && <StartScreen onStart={startGame} />}
       {gameState === 'character' && <CharacterScreen onSubmit={submitCharacter} />}
       {gameState === 'building' && (
         <MealBuilder 
           mealName={currentMealName} 
           mealIndex={currentMealIndex}
           character={character}
           onSubmit={submitMeal} 
         />
       )}
       {gameState === 'feedback' && (
         <MealFeedback 
           mealName={currentMealName} 
           foods={currentSelection} 
           onNext={nextToActivity} 
           isLast={currentMealIndex === meals.length - 1} 
         />
       )}
       {gameState === 'activity' && (
         <ActivityScreen
           mealName={currentMealName}
           onSubmit={submitActivity}
         />
       )}
       {gameState === 'summary' && (
         <SummaryScreen 
           history={dailyHistory}
           character={character}
           onRestart={startGame} 
         />
       )}
    </div>
  );
}
