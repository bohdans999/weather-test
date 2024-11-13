import { IWeatherReport } from '@/types/weather';
import { create } from 'zustand';

// Storing all recent reports and currently selected weather report
interface IWeatherStore {
  selectedWeather: IWeatherReport | null;
  selectWeather: (report: IWeatherReport) => void;
}

export const useWeatherStore = create<IWeatherStore>(set => ({
  selectedWeather: null,
  selectWeather: report => set({ selectedWeather: report }),
}));
