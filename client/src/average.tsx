export function computeAverage(numbers: number[]): number {
  let sum = 0;

  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  if (numbers.length === 0) {
    return 0;
  }

  const average = sum / numbers.length;

  return Number(average.toFixed(1));
}
