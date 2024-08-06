import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { axios } from 'axios';

const useStore = create(
  persist(
    (set, get) => ({
      data: 0,
      increasePopulation: () =>
        set(async (state) => {
          const response = await axios.get('https://api.example.com/data');
          return { data: response.data };
        }),
      removeAllBears: () => set({ bears: 0 }),
      updateBears: (newBears) => set({ bears: newBears }),
    }),
    {
      name: 'storage-bears', // unique name
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

// Store for the Registration modal state
const useRegistrationStore = create((set) => ({
  modal: false,
  setOpenModal: (value) => set({ modal: value }),
}));

export default useRegistrationStore;
