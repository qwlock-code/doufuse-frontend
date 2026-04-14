export interface BeadColor {
  name: string
  hex: string
  rgb: [number, number, number]
  category: 'fuse' | 'spark' | 'dream' | 'base'
}

export const DOUFUSE_COLORS: BeadColor[] = [
  // FUSE Collection (Warm Tones) - 12 colors
  { name: 'Fuse Red', hex: '#DC2626', rgb: [220, 38, 38], category: 'fuse' },
  { name: 'Hot Coral', hex: '#F97316', rgb: [249, 115, 22], category: 'fuse' },
  { name: 'Sunset Orange', hex: '#EA580C', rgb: [234, 88, 12], category: 'fuse' },
  { name: 'Cherry', hex: '#BE123C', rgb: [190, 18, 60], category: 'fuse' },
  { name: 'Pepper Red', hex: '#EF4444', rgb: [239, 68, 68], category: 'fuse' },
  { name: 'Tangerine', hex: '#FB923C', rgb: [251, 146, 60], category: 'fuse' },
  { name: 'Flame', hex: '#DC6803', rgb: [220, 104, 3], category: 'fuse' },
  { name: 'Ember', hex: '#B45309', rgb: [180, 83, 9], category: 'fuse' },
  { name: 'Rust', hex: '#92400E', rgb: [146, 64, 14], category: 'fuse' },
  { name: 'Blush', hex: '#FB7185', rgb: [251, 113, 133], category: 'fuse' },
  { name: 'Salmon', hex: '#FDA4AF', rgb: [253, 164, 175], category: 'fuse' },
  { name: 'Coral', hex: '#FB6F92', rgb: [251, 111, 146], category: 'fuse' },

  // SPARK Collection (Brights) - 12 colors
  { name: 'Sunshine', hex: '#FBBF24', rgb: [251, 191, 36], category: 'spark' },
  { name: 'Lemon', hex: '#FDE047', rgb: [253, 224, 71], category: 'spark' },
  { name: 'Honey', hex: '#FACC15', rgb: [250, 204, 21], category: 'spark' },
  { name: 'Chartreuse', hex: '#A3E635', rgb: [163, 230, 53], category: 'spark' },
  { name: 'Lime', hex: '#84CC16', rgb: [132, 204, 22], category: 'spark' },
  { name: 'Mint', hex: '#4ADE80', rgb: [74, 222, 128], category: 'spark' },
  { name: 'Emerald', hex: '#22C55E', rgb: [34, 197, 94], category: 'spark' },
  { name: 'Teal', hex: '#14B8A6', rgb: [20, 184, 166], category: 'spark' },
  { name: 'Sky', hex: '#38BDF8', rgb: [56, 189, 248], category: 'spark' },
  { name: 'Ocean', hex: '#0EA5E9', rgb: [14, 165, 233], category: 'spark' },
  { name: 'Sapphire', hex: '#2563EB', rgb: [37, 99, 235], category: 'spark' },
  { name: 'Navy', hex: '#1D4ED8', rgb: [29, 78, 216], category: 'spark' },

  // DREAM Collection (Cool/Purple) - 12 colors
  { name: 'Grape', hex: '#7C3AED', rgb: [124, 58, 237], category: 'dream' },
  { name: 'Violet', hex: '#8B5CF6', rgb: [139, 92, 246], category: 'dream' },
  { name: 'Lavender', hex: '#A78BFA', rgb: [167, 139, 250], category: 'dream' },
  { name: 'Plum', hex: '#C026D3', rgb: [192, 38, 211], category: 'dream' },
  { name: 'Fuchsia', hex: '#D946EF', rgb: [217, 70, 239], category: 'dream' },
  { name: 'Orchid', hex: '#E879F9', rgb: [232, 121, 249], category: 'dream' },
  { name: 'Bubblegum', hex: '#F472B6', rgb: [244, 114, 182], category: 'dream' },
  { name: 'Rose', hex: '#F9A8D4', rgb: [249, 168, 212], category: 'dream' },
  { name: 'Magenta', hex: '#E11D48', rgb: [225, 29, 72], category: 'dream' },
  { name: 'Purple', hex: '#9333EA', rgb: [147, 51, 234], category: 'dream' },
  { name: 'Indigo', hex: '#6366F1', rgb: [99, 102, 241], category: 'dream' },
  { name: 'Periwinkle', hex: '#A5B4FC', rgb: [165, 180, 252], category: 'dream' },

  // BASE Collection (Neutrals) - 12 colors
  { name: 'White', hex: '#FFFFFF', rgb: [255, 255, 255], category: 'base' },
  { name: 'Cream', hex: '#FEF3C7', rgb: [254, 243, 199], category: 'base' },
  { name: 'Pearl', hex: '#E5E7EB', rgb: [229, 231, 235], category: 'base' },
  { name: 'Silver', hex: '#D1D5DB', rgb: [209, 213, 219], category: 'base' },
  { name: 'Smoke', hex: '#9CA3AF', rgb: [156, 163, 175], category: 'base' },
  { name: 'Charcoal', hex: '#6B7280', rgb: [107, 114, 128], category: 'base' },
  { name: 'Graphite', hex: '#4B5563', rgb: [75, 85, 99], category: 'base' },
  { name: 'Jet', hex: '#374151', rgb: [55, 65, 81], category: 'base' },
  { name: 'Black', hex: '#111827', rgb: [17, 24, 39], category: 'base' },
  { name: 'Tan', hex: '#D4A574', rgb: [212, 165, 116], category: 'base' },
  { name: 'Cocoa', hex: '#A16207', rgb: [161, 98, 7], category: 'base' },
  { name: 'Mocha', hex: '#78350F', rgb: [120, 53, 15], category: 'base' },
]

export const COLOR_CATEGORIES = [
  { id: 'fuse', name: 'FUSE', emoji: '🔥', description: 'Warm Tones' },
  { id: 'spark', name: 'SPARK', emoji: '✨', description: 'Bright Tones' },
  { id: 'dream', name: 'DREAM', emoji: '💜', description: 'Cool Tones' },
  { id: 'base', name: 'BASE', emoji: '⬜', description: 'Neutrals' },
] as const

export function getColorByHex(hex: string): BeadColor | undefined {
  return DOUFUSE_COLORS.find(c => c.hex.toLowerCase() === hex.toLowerCase())
}

export function getColorsByCategory(category: BeadColor['category']): BeadColor[] {
  return DOUFUSE_COLORS.filter(c => c.category === category)
}

// Calculate color distance using Delta E (simplified)
export function colorDistance(hex1: string, hex2: string): number {
  const rgb1 = hexToRgb(hex1)
  const rgb2 = hexToRgb(hex2)
  
  if (!rgb1 || !rgb2) return Infinity
  
  const rDiff = rgb1[0] - rgb2[0]
  const gDiff = rgb1[1] - rgb2[1]
  const bDiff = rgb1[2] - rgb2[2]
  
  return Math.sqrt(rDiff * rDiff + gDiff * gDiff + bDiff * bDiff)
}

export function hexToRgb(hex: string): [number, number, number] | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
    : null
}

export function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')
}

export function findClosestColor(hex: string): BeadColor {
  let closest = DOUFUSE_COLORS[0]
  let minDistance = Infinity
  
  for (const color of DOUFUSE_COLORS) {
    const distance = colorDistance(hex, color.hex)
    if (distance < minDistance) {
      minDistance = distance
      closest = color
    }
  }
  
  return closest
}
