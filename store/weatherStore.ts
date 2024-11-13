import { IWeatherReport } from '@/types/weather';
import { create } from 'zustand';

interface IWeatherStore {
  selectedWeather: IWeatherReport | null;
  reports: IWeatherReport[];
  addReport: (report: IWeatherReport) => void;
  selectWeather: (report: IWeatherReport) => void;
}

export const useWeatherStore = create<IWeatherStore>(set => ({
  selectedWeather: null,
  reports: [],

  addReport: report => set(state => ({ reports: [...state.reports, report] })),
  selectWeather: report => set({ selectedWeather: report }),
}));
