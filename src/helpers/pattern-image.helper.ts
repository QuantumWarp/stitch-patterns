import type { Pattern } from '@/models/pattern';

const pixelSize = { width: 25 / 5, height: 20 / 5 };

export function createPatternImage(pattern: Pattern): string {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;

  canvas.width = pattern.dimensions.width * pixelSize.width;
  canvas.height = pattern.dimensions.height * pixelSize.height;

  for (const square of pattern.squares) {
    ctx.fillStyle = pattern.colors[square.colorIndex];
    ctx.fillRect(
      square.x * pixelSize.width,
      square.y * pixelSize.height,
      pixelSize.width,
      pixelSize.height,
    );
  }

  return canvas.toDataURL();
}
