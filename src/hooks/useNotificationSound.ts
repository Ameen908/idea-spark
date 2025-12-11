import { useCallback } from 'react';

export type SoundType = 'chime' | 'bell' | 'pop' | 'success' | 'none';

const SOUND_URLS: Record<Exclude<SoundType, 'none'>, string> = {
  chime: 'https://cdn.pixabay.com/audio/2022/03/10/audio_c8c8a73467.mp3',
  bell: 'https://cdn.pixabay.com/audio/2022/03/15/audio_c8c8a73467.mp3',
  pop: 'https://cdn.pixabay.com/audio/2022/01/18/audio_8c3bdf5564.mp3',
  success: 'https://cdn.pixabay.com/audio/2021/08/04/audio_c6ccf3232f.mp3',
};

export function useNotificationSound() {
  const playSound = useCallback((soundType: SoundType) => {
    if (soundType === 'none') return;
    
    try {
      const audio = new Audio(SOUND_URLS[soundType]);
      audio.volume = 0.5;
      audio.play().catch(() => {
        // Silently fail if autoplay is blocked
      });
    } catch {
      // Silently fail
    }
  }, []);

  return { playSound };
}

export const SOUND_OPTIONS: { value: SoundType; label: string }[] = [
  { value: 'none', label: 'None' },
  { value: 'chime', label: 'Chime' },
  { value: 'bell', label: 'Bell' },
  { value: 'pop', label: 'Pop' },
  { value: 'success', label: 'Success' },
];
