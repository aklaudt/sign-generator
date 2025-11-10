export function validateHoleNumber(holeNumber: number): boolean {
  return Number.isInteger(holeNumber) && holeNumber >= 1 && holeNumber <= 36;
}

export function validateDistance(distance: number): boolean {
  return Number.isInteger(distance) && distance > 0 && distance <= 2000;
}

export function validatePar(par: number): par is 3 | 4 | 5 {
  return par === 3 || par === 4 || par === 5;
}

export function validateImageFile(file: File): boolean {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const maxSize = 10 * 1024 * 1024; // 10MB

  return validTypes.includes(file.type) && file.size <= maxSize;
}
