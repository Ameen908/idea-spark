import { useState, useEffect } from 'react';
import { SoundType } from './useNotificationSound';

export interface AppSettings {
  completionSound: SoundType;
  reminderSound: SoundType;
}

const SETTINGS_KEY = 'taskflow-settings';

const defaultSettings: AppSettings = {
  completionSound: 'success',
  reminderSound: 'chime',
};

export function useSettings() {
  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const stored = localStorage.getItem(SETTINGS_KEY);
      return stored ? { ...defaultSettings, ...JSON.parse(stored) } : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });

  useEffect(() => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }, [settings]);

  const updateSetting = <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return { settings, updateSetting };
}
