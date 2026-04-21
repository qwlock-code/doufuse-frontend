import { ColorEntry } from './palettes';

export interface RGB {
  r: number;
  g: number;
  b: number;
}

// 计算两个颜色之间的欧氏距离
export function colorDistance(c1: RGB, c2: RGB): number {
  const dr = c1.r - c2.r;
  const dg = c1.g - c2.g;
  const db = c1.b - c2.b;
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

// 将颜色匹配到色卡中最接近的颜色
export function matchToPalette(color: RGB, palette: ColorEntry[]): ColorEntry {
  let minDistance = Infinity;
  let matchedColor = palette[0];

  for (const entry of palette) {
    const distance = colorDistance(color, entry.rgb);
    if (distance < minDistance) {
      minDistance = distance;
      matchedColor = entry;
    }
  }
  return matchedColor;
}