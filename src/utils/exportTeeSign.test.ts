import { describe, it, expect, vi } from 'vitest';
import { exportTeeSign } from './exportTeeSign';

describe('exportTeeSign', () => {
  it('throws error when element not found', async () => {
    await expect(exportTeeSign('non-existent')).rejects.toThrow(
      'Element with id "non-existent" not found'
    );
  });
});
