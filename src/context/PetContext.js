import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { clamp } from '../theme';

const PetContext = createContext(null);

const INITIAL_PET = {
  hunger: 24,
  happiness: 84,
  energy: 78,
  hygiene: 82,
  coins: 25,
  level: 1,
};

const ACTIONS = {
  eat: {
    message: '¡Qué rico, parce!',
    expression: 'happy',
    update: (pet) => ({ ...pet, hunger: clamp(pet.hunger - 28), happiness: clamp(pet.happiness + 5), energy: clamp(pet.energy + 2), coins: pet.coins + 1 }),
  },
  play: {
    message: '¡Vamos a jugar, pues!',
    expression: 'happy',
    update: (pet) => ({ ...pet, hunger: clamp(pet.hunger + 7), happiness: clamp(pet.happiness + 18), energy: clamp(pet.energy - 15), coins: pet.coins + 3 }),
  },
  bath: {
    message: '¡Ahora sí estoy limpio!',
    expression: 'surprised',
    update: (pet) => ({ ...pet, hygiene: clamp(pet.hygiene + 35), happiness: clamp(pet.happiness + 4), coins: pet.coins + 1 }),
  },
  sleep: {
    message: 'Zzz... no molestar.',
    expression: 'sleepy',
    update: (pet) => ({ ...pet, energy: clamp(pet.energy + 32), hunger: clamp(pet.hunger + 4) }),
  },
};

export function PetProvider({ children }) {
  const [pet, setPet] = useState(INITIAL_PET);
  const [feedback, setFeedback] = useState('¡Hola! Soy Tamachimbo.');
  const [reaction, setReaction] = useState(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setPet((current) => ({
        ...current,
        hunger: clamp(current.hunger + 1.4),
        happiness: clamp(current.happiness - 0.7),
        energy: clamp(current.energy - 0.45),
        hygiene: clamp(current.hygiene - 0.35),
      }));
    }, 15000);

    return () => {
      clearInterval(interval);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const reactTemporarily = useCallback((expression, message, duration = 2200) => {
    setReaction(expression);
    if (message) setFeedback(message);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setReaction(null), duration);
  }, []);

  const performAction = useCallback((actionName) => {
    const action = ACTIONS[actionName];
    if (!action) return;
    setPet((current) => action.update(current));
    reactTemporarily(action.expression, action.message, actionName === 'sleep' ? 3000 : 2200);
  }, [reactTemporarily]);

  const expression = useMemo(() => {
    if (reaction) return reaction;
    if (pet.hunger >= 75) return 'hungry';
    if (pet.energy <= 18) return 'sleepy';
    if (pet.happiness <= 22) return 'sad';
    if (pet.happiness >= 78) return 'happy';
    return 'normal';
  }, [pet, reaction]);

  const value = useMemo(() => ({ pet, feedback, expression, performAction, reactTemporarily }), [pet, feedback, expression, performAction, reactTemporarily]);
  return <PetContext.Provider value={value}>{children}</PetContext.Provider>;
}

export function usePet() {
  const context = useContext(PetContext);
  if (!context) throw new Error('usePet debe utilizarse dentro de PetProvider.');
  return context;
}
