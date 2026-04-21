import { ColorEntry } from './palettes';
import { RGB, matchToPalette } from './colorMatcher';

export interface PixelCell {
  x: number;
  y: number;
  originalColor: RGB;
  mappedColor: ColorEntry;
  isExternal: boolean; // 是否为背景/外部区域
}

// 提取网格单元的主导色 (局部 max pooling)
function extractDominantColor(
  ctx: CanvasRenderingContext2D,
  cellX: number,
  cellY: number,
  cellSize: number
): RGB {
  const imageData = ctx.getImageData(cellX * cellSize, cellY * cellSize, cellSize, cellSize);
  const colorMap = new Map<string, number>();

  for (let i = 0; i < imageData.data.length; i += 4) {
    const r = imageData.data[i];
    const g = imageData.data[i + 1];
    const b = imageData.data[i + 2];
    const key = `${r},${g},${b}`;
    colorMap.set(key, (colorMap.get(key) || 0) + 1);
  }

  let maxCount = 0;
  let dominantKey = '0,0,0';
  colorMap.forEach((count, key) => {
    if (count > maxCount) {
      maxCount = count;
      dominantKey = key;
    }
  });

  const [r, g, b] = dominantKey.split(',').map(Number);
  return { r, g, b };
}

// 像素化处理主函数
export async function pixelateImage(
  imageUrl: string,
  gridSize: number, // 例如 50 表示 50x50
  palette: ColorEntry[]
): Promise<PixelCell[][]> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return reject(new Error('Canvas context not available'));

      // 保持比例，以较短边为基准或者固定最大尺寸
      const maxSize = 800;
      let width = img.width;
      let height = img.height;
      
      if (width > maxSize || height > maxSize) {
        const ratio = Math.min(maxSize / width, maxSize / height);
        width *= ratio;
        height *= ratio;
      }

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      const cellWidth = width / gridSize;
      const cellHeight = height / gridSize;
      const grid: PixelCell[][] = [];

      for (let y = 0; y < gridSize; y++) {
        const row: PixelCell[] = [];
        for (let x = 0; x < gridSize; x++) {
          const dominantColor = extractDominantColor(ctx, x, y, Math.ceil(cellWidth));
          const mappedColor = matchToPalette(dominantColor, palette);
          row.push({
            x,
            y,
            originalColor: dominantColor,
            mappedColor,
            isExternal: false,
          });
        }
        grid.push(row);
      }
      resolve(grid);
    };
    img.onerror = reject;
    img.src = imageUrl;
  });
}