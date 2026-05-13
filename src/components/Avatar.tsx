import React from 'react';
import { PlayerCharacter } from '../gameData';

interface AvatarProps {
  character: PlayerCharacter | null;
  className?: string;
}

export function Avatar({ character, className = "" }: AvatarProps) {
  if (!character) {
    return <div className={`bg-slate-800 rounded-lg ${className}`} />;
  }

  const skinColors: Record<string, string> = {
    'light': '#fcdcd3',
    'medium-light': '#f2cbbd',
    'medium': '#dca484',
    'medium-dark': '#b97a57',
    'dark': '#5c3a21'
  };

  const hairColors: Record<string, string> = {
    'black': '#1f2937',
    'brown': '#451a03',
    'blonde': '#fcd34d',
    'red': '#9f1239',
    'silver': '#e5e7eb',
    'pink': '#f472b6',
    'green': '#166534'
  };

  const skin = skinColors[character.skinTone] || skinColors['medium'];
  const hair = hairColors[character.hairColor] || hairColors['black'];
  
  const hatId = character.equipment.hat;
  const shirtId = character.equipment.shirt;

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
       <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-2xl" xmlns="http://www.w3.org/2000/svg">
         <defs>
           <clipPath id="body-clip">
             <path d="M 20 120 Q 50 60 80 120 Z" />
           </clipPath>
         </defs>

         {/* Hair Back layer (e.g. for long hair) */}
         <g id="hair-back" fill={hair}>
            {character.hairStyle === 'long' && (
                <path d="M 28 40 Q 20 80 30 85 Q 10 70 28 35 L 72 35 Q 90 70 70 85 Q 80 80 72 40 Z" />
            )}
            {character.hairStyle === 'curly' && (
                <path d="M 25 40 Q 10 60 25 75 Q 15 65 28 35 L 72 35 Q 85 65 75 75 Q 90 60 75 40 Z" />
            )}
            {character.hairStyle === 'ponytail' && (
                <path d="M 50 15 Q 85 0 85 30 Q 90 40 80 50 Q 85 20 70 20 Z" />
            )}
         </g>

         {/* Body Base */}
         <path d="M 20 120 Q 50 65 80 120 Z" fill={skin} />

         {/* Shirt */}
         <g clipPath="url(#body-clip)">
           {shirtId === 's1' && ( // T-shirt
             <g>
               <path d="M 10 120 L 10 80 Q 50 75 90 80 L 90 120 Z" fill="#3b82f6" />
               <path d="M 30 80 Q 50 95 70 80 Z" fill={skin} opacity="0.3" /> {/* Neckline shading */}
             </g>
           )}
           {shirtId === 's2' && ( // Plaid/Collar Shirt
             <g>
               <path d="M 10 120 L 10 80 Q 50 75 90 80 L 90 120 Z" fill="#e2e8f0" />
               <path d="M 10 80 L 45 100 L 55 100 L 90 80 Z" fill="#cbd5e1" />
               <path d="M 40 80 L 50 100 L 60 80 Z" fill="#0f172a" /> {/* Tie/Inner */}
               <line x1="50" y1="100" x2="50" y2="120" stroke="#94a3b8" strokeWidth="2" />
               <path d="M 40 80 L 50 95 L 35 100 Z" fill="#f8fafc" />
               <path d="M 60 80 L 50 95 L 65 100 Z" fill="#f8fafc" />
             </g>
           )}
           {shirtId === 's3' && ( // Tank top
             <g>
               <path d="M 25 120 L 25 85 Q 50 95 75 85 L 75 120 Z" fill="#10b981" />
               <path d="M 25 85 L 35 75 L 40 85 Z" fill="#059669" />
               <path d="M 75 85 L 65 75 L 60 85 Z" fill="#059669" />
             </g>
           )}
           {shirtId === 's4' && ( // Armor
             <g>
               <path d="M 15 120 L 15 80 Q 50 65 85 80 L 85 120 Z" fill="#64748b" />
               <path d="M 30 90 L 70 90 L 70 120 L 30 120 Z" fill="#475569" />
               <rect x="40" y="80" width="20" height="40" fill="#334155" />
               <circle cx="50" cy="100" r="6" fill="#0ea5e9" />
             </g>
           )}
           {shirtId === 's5' && ( // Cyber
             <g>
               <path d="M 15 120 L 15 75 L 85 75 L 85 120 Z" fill="#1e1b4b" />
               <path d="M 50 75 L 50 120" stroke="#06b6d4" strokeWidth="2" />
               <path d="M 30 90 L 70 90" stroke="#ec4899" strokeWidth="2" />
               <path d="M 30 100 L 70 100" stroke="#ec4899" strokeWidth="2" />
               <circle cx="50" cy="95" r="4" fill="#a855f7" />
             </g>
           )}
           {(!shirtId || shirtId === 's0') && ( // Basic
             <path d="M 15 120 L 15 85 Q 50 80 85 85 L 85 120 Z" fill="#f1f5f9" />
           )}
         </g>

         <g id="head">
           {/* Neck */}
           <rect x="40" y="60" width="20" height="20" fill={skin} rx="5" />
           {/* Shadow under chin */}
           <path d="M 40 68 Q 50 75 60 68 L 60 60 L 40 60 Z" fill="#000000" opacity="0.1" />

           {/* Face */}
           <ellipse cx="50" cy="45" rx="22" ry="26" fill={skin} />
           
           {/* Eyes */}
           <circle cx="41" cy="45" r="2.5" fill="#1e293b" />
           <circle cx="59" cy="45" r="2.5" fill="#1e293b" />
           
           {/* Eyebrows */}
           <path d="M 37 40 Q 41 38 45 40" stroke={hair} strokeWidth="2" fill="transparent" strokeLinecap="round" />
           <path d="M 55 40 Q 59 38 63 40" stroke={hair} strokeWidth="2" fill="transparent" strokeLinecap="round" />

           {/* Blush */}
           <ellipse cx="35" cy="50" rx="3" ry="2" fill="#ef4444" opacity="0.2" />
           <ellipse cx="65" cy="50" rx="3" ry="2" fill="#ef4444" opacity="0.2" />

           {/* Smile */}
           <path d="M 44 54 Q 50 58 56 54" stroke="#1e293b" strokeWidth="2" fill="transparent" strokeLinecap="round" />
         </g>

         {/* Hair Front Layer */}
         <g id="hair-front" fill={hair}>
            {character.hairStyle === 'short' && hatId === 'h0' && (
               <path d="M 26 40 Q 25 10 50 10 Q 75 10 74 40 Q 70 20 50 15 Q 30 20 26 40 Z" />
            )}
            {character.hairStyle === 'short' && hatId !== 'h0' && (
               <path d="M 26 40 Q 30 28 50 28 Q 70 28 74 40 Z" />
            )}
            {character.hairStyle === 'long' && hatId === 'h0' && (
               <path d="M 28 40 Q 25 15 50 15 Q 75 15 72 40 Q 70 20 50 20 Q 30 20 28 40 Z" />
            )}
            {character.hairStyle === 'long' && hatId !== 'h0' && (
               <path d="M 28 40 Q 30 30 50 30 Q 70 30 72 40 Z" />
            )}
            {character.hairStyle === 'curly' && hatId === 'h0' && (
               <path d="M 25 40 Q 20 15 50 10 Q 80 15 75 40 Q 70 20 50 20 Q 30 20 25 40 Z" />
            )}
            {character.hairStyle === 'curly' && hatId !== 'h0' && (
               <path d="M 25 40 Q 30 25 50 25 Q 70 25 75 40 Z" />
            )}
            {character.hairStyle === 'ponytail' && hatId === 'h0' && (
               <path d="M 28 40 Q 25 15 50 15 Q 75 15 72 40 Q 70 20 50 20 Q 30 20 28 40 Z" />
            )}
            {character.hairStyle === 'bald' && (
                 <path d="M 28 40 Q 30 15 50 15 Q 70 15 72 40 L 70 40 Q 70 18 50 18 Q 30 18 30 40 Z" fill={hair} opacity="0.3" />
            )}
         </g>

         {/* Hat */}
         <g id="hat">
           {hatId === 'h1' && ( // Cap
             <g>
               <path d="M 25 35 Q 50 10 75 35 L 75 35 Q 50 25 25 35 Z" fill="#ef4444" />
               <path d="M 70 35 Q 90 35 95 40 Q 70 38 70 35 Z" fill="#dc2626" />
               <circle cx="50" cy="18" r="3" fill="#fca5a5" />
             </g>
           )}
           {hatId === 'h2' && ( // Beanie
             <g>
               <path d="M 26 35 Q 50 -5 74 35 Z" fill="#f59e0b" />
               <rect x="25" y="30" width="50" height="8" rx="4" fill="#d97706" />
               <circle cx="50" cy="8" r="5" fill="#fcd34d" />
             </g>
           )}
           {hatId === 'h3' && ( // Helmet
             <g>
               <path d="M 22 35 Q 50 -10 78 35 L 78 40 Q 50 30 22 40 Z" fill="#15803d" />
               <path d="M 22 35 L 22 43 Q 50 33 78 43 L 78 35 Z" fill="#166534" />
               <rect x="40" y="25" width="20" height="8" fill="#14532d" />
             </g>
           )}
           {hatId === 'h4' && ( // Cowboy
             <g>
               <path d="M 32 25 Q 50 -5 68 25 Z" fill="#a16207" />
               <path d="M 5 35 Q 50 15 95 35 Q 50 25 5 35 Z" fill="#854d0e" />
               <path d="M 32 23 L 68 23 L 68 27 L 32 27 Z" fill="#422006" />
               <path d="M 32 25 Q 50 32 68 25 Z" fill="#ca8a04" opacity="0.5" />
             </g>
           )}
         </g>

       </svg>
    </div>
  );
}
