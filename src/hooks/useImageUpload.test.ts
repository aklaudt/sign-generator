import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useImageUpload } from './useImageUpload';

describe('useImageUpload', () => {
  it('initializes with null image url', () => {
    const { result } = renderHook(() => useImageUpload());
    expect(result.current.imageUrl).toBeNull();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });
});
