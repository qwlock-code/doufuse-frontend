import { PixelCell } from './pixelator';

export interface ColorStat {
  colorId: string;
  colorName: string;
  hex: string;
  count: number;
}

// 统计颜色数量
export function calculateStatistics(grid: PixelCell[][]): ColorStat[] {
  const statsMap = new Map<string, ColorStat>();

  for (const row of grid) {
    for (const cell of row) {
      if (cell.isExternal) continue;

      const id = cell.mappedColor.id;
      if (!statsMap.has(id)) {
        statsMap.set(id, {
          colorId: id,
          colorName: cell.mappedColor.name,
          hex: cell.mappedColor.hex,
          count: 0,
        });
      }
      statsMap.get(id)!.count++;
    }
  }

  return Array.from(statsMap.values()).sort((a, b) => b.count - a.count);
}