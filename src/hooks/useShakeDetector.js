import { useEffect, useRef, useState } from 'react';
import { Accelerometer } from 'expo-sensors';

/** Detecta cambios bruscos entre muestras del acelerómetro; entrega un evento por cooldown. */
export default function useShakeDetector(onShake, { threshold = 0.9, cooldownMs = 1200, intervalMs = 100 } = {}) {
  const callbackRef = useRef(onShake);
  const lastSampleRef = useRef(null);
  const lastShakeRef = useRef(0);
  const [available, setAvailable] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => { callbackRef.current = onShake; }, [onShake]);

  useEffect(() => {
    let mounted = true;
    let subscription = null;

    const start = async () => {
      try {
        const isAvailable = await Accelerometer.isAvailableAsync();
        if (!mounted) return;
        setAvailable(isAvailable);
        if (!isAvailable) return;

        Accelerometer.setUpdateInterval(intervalMs);
        subscription = Accelerometer.addListener((sample) => {
          const previous = lastSampleRef.current;
          lastSampleRef.current = sample;
          if (!previous) return;

          const delta = Math.sqrt(
            (sample.x - previous.x) ** 2 +
            (sample.y - previous.y) ** 2 +
            (sample.z - previous.z) ** 2
          );
          const now = Date.now();
          if (delta >= threshold && now - lastShakeRef.current >= cooldownMs) {
            lastShakeRef.current = now;
            callbackRef.current?.();
          }
        });
      } catch (sensorError) {
        if (mounted) {
          setAvailable(false);
          setError(sensorError?.message || 'No fue posible iniciar el acelerómetro.');
        }
      }
    };

    start();
    return () => {
      mounted = false;
      subscription?.remove();
      lastSampleRef.current = null;
    };
  }, [cooldownMs, intervalMs, threshold]);

  return { available, error };
}
