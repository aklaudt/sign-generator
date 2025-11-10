import { create } from 'zustand';
import { type TeeSignData, type BasketMarker, type TeeMarker } from '../types';

interface TeeSignStore extends TeeSignData {
  setHoleNumber: (holeNumber: number) => void;
  setUploadedImage: (imageUrl: string | null) => void;
  setTeeMarker: (marker: TeeMarker | null) => void;
  addBasketMarker: (marker: BasketMarker) => void;
  updateBasketMarker: (id: string, updates: Partial<BasketMarker>) => void;
  removeBasketMarker: (id: string) => void;
  clearMarkers: () => void;
  reset: () => void;
}

const initialState: TeeSignData = {
  holeNumber: 1,
  uploadedImage: null,
  teeMarker: null,
  basketMarkers: [],
};

export const useTeeSignStore = create<TeeSignStore>((set) => ({
  ...initialState,

  setHoleNumber: (holeNumber): void => {
    set({ holeNumber });
  },

  setUploadedImage: (imageUrl): void => {
    set({ uploadedImage: imageUrl });
  },

  setTeeMarker: (marker): void => {
    set({ teeMarker: marker });
  },

  addBasketMarker: (marker): void => {
    set((state) => ({
      basketMarkers: [...state.basketMarkers, marker],
    }));
  },

  updateBasketMarker: (id, updates): void => {
    set((state) => ({
      basketMarkers: state.basketMarkers.map((marker) =>
        marker.id === id ? { ...marker, ...updates } : marker
      ),
    }));
  },

  removeBasketMarker: (id): void => {
    set((state) => ({
      basketMarkers: state.basketMarkers.filter((marker) => marker.id !== id),
    }));
  },

  clearMarkers: (): void => {
    set({ teeMarker: null, basketMarkers: [] });
  },

  reset: (): void => {
    set(initialState);
  },
}));
