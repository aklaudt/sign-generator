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
});
