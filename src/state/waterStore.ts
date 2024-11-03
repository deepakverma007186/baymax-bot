import {create} from 'zustand';
import {mmkvStorage} from './storage';
import {createJSONStorage, persist} from 'zustand/middleware';
import {displayNotifications} from '@notifications/initials';
import {IMAGES} from '@assets/images';

interface WaterStoreProps {
  waterDrinkStamps: string[];
  addWaterIntake: (timestamp: string) => void;
  resetWaterIntake: () => void;
}

export const useWaterStore = create<WaterStoreProps>()(
  persist(
    (set, get) => ({
      waterDrinkStamps: [],
      addWaterIntake: timestamp => {
        console.log('Adding water intake:', timestamp);
        const waterDrinkStamps = [...get().waterDrinkStamps, timestamp];
        set({waterDrinkStamps});
        displayNotifications(
          `Water Intake ${waterDrinkStamps.length}/8`,
          'Stay Hydrated 💧',
          IMAGES.water,
          'water-intake',
        );
      },
      resetWaterIntake: () => {
        console.log('Resetting water intake');
        set({waterDrinkStamps: []});
      },
    }),
    {
      name: 'water-storage',
      storage: createJSONStorage(() => mmkvStorage),
    },
  ),
);

// export const useWaterStore = create<WaterStoreProps>()(set => ({
//   waterDrinkStamps: [],
//   addWaterIntake: timestamp =>
//     set(state => ({
//       waterDrinkStamps: [...state.waterDrinkStamps, timestamp],
//     })),
//   resetWaterIntake: () => set({waterDrinkStamps: []}),
// }));
