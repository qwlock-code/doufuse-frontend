import { create } from 'zustand'
import { EditorState, GridData, EditorTool } from '@/types'

interface EditorStore extends EditorState {
  setTool: (tool: EditorTool) => void
  setSelectedColor: (color: string) => void
  setGridSize: (width: number, height: number) => void
  setGridData: (data: GridData) => void
  setCell: (x: number, y: number, color: string | null) => void
  fillArea: (x: number, y: number, color: string) => void
  clearGrid: () => void
  setZoom: (zoom: number) => void
  toggleGrid: () => void
  undo: () => void
  redo: () => void
  saveToHistory: () => void
  reset: () => void
}

const initialState: EditorState = {
  tool: 'brush',
  selectedColor: '#DC2626',
  gridWidth: 29,
  gridHeight: 29,
  gridData: {},
  zoom: 1,
  showGrid: true,
  history: [{}],
  historyIndex: 0,
  historyLength: 1,
}

export const useEditorStore = create<EditorStore>((set, get) => ({
  ...initialState,

  setTool: (tool) => set({ tool }),

  setSelectedColor: (color) => set({ selectedColor: color }),

  setGridSize: (width, height) => {
    set({ gridWidth: width, gridHeight: height, gridData: {} })
    get().saveToHistory()
  },

  setGridData: (data) => {
    set({ gridData: data })
    get().saveToHistory()
  },

  setCell: (x, y, color) => {
    const key = `${x},${y}`
    const newData = { ...get().gridData }
    
    if (color === null || color === 'transparent') {
      delete newData[key]
    } else {
      newData[key] = color
    }
    
    set({ gridData: newData })
  },

  fillArea: (startX, startY, fillColor) => {
    const { gridData, gridWidth, gridHeight } = get()
    const targetKey = `${startX},${startY}`
    const targetColor = gridData[targetKey] || null
    
    if (targetColor === fillColor) return
    
    const newData = { ...gridData }
    const stack = [[startX, startY]]
    const visited = new Set<string>()
    
    while (stack.length > 0) {
      const [x, y] = stack.pop()!
      const key = `${x},${y}`
      
      if (visited.has(key)) continue
      if (x < 0 || x >= gridWidth || y < 0 || y >= gridHeight) continue
      
      const currentColor = gridData[key] || null
      if (currentColor !== targetColor) continue
      
      visited.add(key)
      
      if (fillColor === null) {
        delete newData[key]
      } else {
        newData[key] = fillColor
      }
      
      stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1])
    }
    
    set({ gridData: newData })
    get().saveToHistory()
  },

  clearGrid: () => {
    set({ gridData: {} })
    get().saveToHistory()
  },

  setZoom: (zoom) => set({ zoom: Math.max(0.5, Math.min(3, zoom)) }),

  toggleGrid: () => set((state) => ({ showGrid: !state.showGrid })),

  undo: () => {
    const { historyIndex, history } = get()
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1
      set({ 
        gridData: history[newIndex], 
        historyIndex: newIndex,
        historyLength: history.length
      })
    }
  },

  redo: () => {
    const { historyIndex, history } = get()
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1
      set({ 
        gridData: history[newIndex], 
        historyIndex: newIndex,
        historyLength: history.length
      })
    }
  },

  saveToHistory: () => {
    const { gridData, history, historyIndex } = get()
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push({ ...gridData })
    
    if (newHistory.length > 50) {
      newHistory.shift()
    }
    
    set({ 
      history: newHistory, 
      historyIndex: newHistory.length - 1,
      historyLength: newHistory.length 
    })
  },

  reset: () => {
    set(initialState)
  },
}))
