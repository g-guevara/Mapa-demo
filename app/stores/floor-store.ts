import { create } from "zustand";

interface FloorState {
  currentFloor: number;
  setCurrentFloor: (floor: number) => void;
}

const useFloorStore = create<FloorState>((set) => ({
  currentFloor: 1, // Cambiar de 0 a 1 para empezar en el primer piso
  setCurrentFloor: (floor) => set({ currentFloor: floor }),
}));

export default useFloorStore;