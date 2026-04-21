export interface ColorEntry {
  id: string;
  name: string;
  rgb: { r: number; g: number; b: number };
  hex: string;
}

// Perler Beads 常用色卡数据 (部分核心颜色)
export const PERLER_PALETTE: ColorEntry[] = [
  { id: 'P01', name: 'White', rgb: { r: 255, g: 255, b: 255 }, hex: '#FFFFFF' },
  { id: 'P02', name: 'Black', rgb: { r: 0, g: 0, b: 0 }, hex: '#000000' },
  { id: 'P03', name: 'Red', rgb: { r: 230, g: 0, b: 0 }, hex: '#E60000' },
  { id: 'P04', name: 'Orange', rgb: { r: 255, g: 128, b: 0 }, hex: '#FF8000' },
  { id: 'P05', name: 'Yellow', rgb: { r: 255, g: 255, b: 0 }, hex: '#FFFF00' },
  { id: 'P06', name: 'Green', rgb: { r: 0, g: 204, b: 0 }, hex: '#00CC00' },
  { id: 'P07', name: 'Blue', rgb: { r: 0, g: 102, b: 255 }, hex: '#0066FF' },
  { id: 'P08', name: 'Purple', rgb: { r: 153, g: 0, b: 204 }, hex: '#9900CC' },
  { id: 'P09', name: 'Pink', rgb: { r: 255, g: 102, b: 204 }, hex: '#FF66CC' },
  { id: 'P10', name: 'Brown', rgb: { r: 153, g: 76, b: 0 }, hex: '#994C00' },
  { id: 'P11', name: 'Gray', rgb: { r: 128, g: 128, b: 128 }, hex: '#808080' },
  { id: 'P12', name: 'Light Blue', rgb: { r: 153, g: 204, b: 255 }, hex: '#99CCFF' },
  { id: 'P13', name: 'Light Green', rgb: { r: 153, g: 255, b: 153 }, hex: '#99FF99' },
  { id: 'P14', name: 'Light Yellow', rgb: { r: 255, g: 255, b: 153 }, hex: '#FFFF99' },
  { id: 'P15', name: 'Light Pink', rgb: { r: 255, g: 204, b: 204 }, hex: '#FFCCCC' },
  { id: 'P16', name: 'Navy Blue', rgb: { r: 0, g: 0, b: 128 }, hex: '#000080' },
  { id: 'P17', name: 'Teal', rgb: { r: 0, g: 128, b: 128 }, hex: '#008080' },
  { id: 'P18', name: 'Lavender', rgb: { r: 204, g: 153, b: 255 }, hex: '#CC99FF' },
  { id: 'P19', name: 'Peach', rgb: { r: 255, g: 204, b: 153 }, hex: '#FFCC99' },
  { id: 'P20', name: 'Tan', rgb: { r: 210, g: 180, b: 140 }, hex: '#D2B48C' },
];

export function getPalette(): ColorEntry[] {
  return PERLER_PALETTE;
}