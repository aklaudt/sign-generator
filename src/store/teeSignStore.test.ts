import { describe, it, expect, beforeEach } from 'vitest';
import { useTeeSignStore } from './teeSignStore';

describe('teeSignStore', () => {
  beforeEach(() => {
    useTeeSignStore.getState().reset();
  });

  it('initializes with default values', () => {
    const state = useTeeSignStore.getState();
    expect(state.holeNumber).toBe(1);
    expect(state.uploadedImage).toBeNull();
    expect(state.teeMarker).toBeNull();
    expect(state.basketMarkers).toEqual([]);
  });

  it('sets hole number', () => {
    useTeeSignStore.getState().setHoleNumber(5);
    expect(useTeeSignStore.getState().holeNumber).toBe(5);
  });

  it('clears all markers', () => {
    // Add some markers
    useTeeSignStore.getState().setTeeMarker({ id: 'tee-1', position: { x: 50, y: 50 } });
    useTeeSignStore.getState().addBasketMarker({
      id: 'basket-1',
      color: 'red',
      position: { x: 60, y: 60 },
      par: 3,
      distance: 250,
    });

    // Verify markers are added
    let state = useTeeSignStore.getState();
    expect(state.teeMarker).not.toBeNull();
    expect(state.basketMarkers.length).toBe(1);

    // Clear markers
    useTeeSignStore.getState().clearMarkers();

    // Verify markers are cleared
    state = useTeeSignStore.getState();
    expect(state.teeMarker).toBeNull();
    expect(state.basketMarkers).toEqual([]);
  });
});
