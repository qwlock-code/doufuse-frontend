'use client'

import { useState, useCallback } from 'react'
import { useEditorStore } from '@/stores/editorStore'
import { DOUFUSE_COLORS, COLOR_CATEGORIES } from '@/lib/colors'
import { 
  MousePointer, 
  Paintbrush, 
  Eraser, 
  Undo2, 
  Redo2, 
  Trash2, 
  Download, 
  Save,
  Grid3X3,
  ZoomIn,
  ZoomOut
} from 'lucide-react'

const tools = [
  { id: 'brush', icon: MousePointer, label: 'Brush' },
  { id: 'fill', icon: Paintbrush, label: 'Fill' },
  { id: 'eraser', icon: Eraser, label: 'Eraser' },
] as const

export default function EditorPage() {
  const {
    tool,
    selectedColor,
    gridWidth,
    gridHeight,
    gridData,
    showGrid,
    zoom,
    historyIndex,
    historyLength,
    setTool,
    setSelectedColor,
    setCell,
    fillArea,
    clearGrid,
    undo,
    redo,
    setZoom,
    toggleGrid,
    saveToHistory,
  } = useEditorStore()

  const [isDrawing, setIsDrawing] = useState(false)

  const handleCellClick = useCallback((x: number, y: number) => {
    if (tool === 'brush') {
      setCell(x, y, selectedColor)
      saveToHistory()
    } else if (tool === 'fill') {
      fillArea(x, y, selectedColor)
    } else if (tool === 'eraser') {
      setCell(x, y, null)
      saveToHistory()
    }
  }, [tool, selectedColor, setCell, fillArea, saveToHistory])

  const handleMouseDown = (x: number, y: number) => {
    setIsDrawing(true)
    handleCellClick(x, y)
  }

  const handleMouseMove = (x: number, y: number) => {
    if (isDrawing && tool === 'brush') {
      setCell(x, y, selectedColor)
    } else if (isDrawing && tool === 'eraser') {
      setCell(x, y, null)
    }
  }

  const handleMouseUp = () => {
    if (isDrawing && (tool === 'brush' || tool === 'eraser')) {
      saveToHistory()
    }
    setIsDrawing(false)
  }

  const handleExport = () => {
    const canvas = document.createElement('canvas')
    const cellSize = 20
    canvas.width = gridWidth * cellSize
    canvas.height = gridHeight * cellSize
    const ctx = canvas.getContext('2d')!
    
    // Fill white background
    ctx.fillStyle = '#FFFFFF'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // Draw cells
    Object.entries(gridData).forEach(([key, color]) => {
      const [x, y] = key.split(',').map(Number)
      ctx.fillStyle = color
      ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize)
    })
    
    // Download
    const link = document.createElement('a')
    link.download = 'pattern.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  const colorCounts = Object.values(gridData).reduce((acc, color) => {
    acc[color] = (acc[color] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Toolbar */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Tools */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              {tools.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTool(t.id)}
                  className={`p-2 rounded-md transition-colors ${
                    tool === t.id 
                      ? 'bg-white shadow text-red-600' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  title={t.label}
                >
                  <t.icon className="w-5 h-5" />
                </button>
              ))}
            </div>

            {/* Undo/Redo */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={undo}
                disabled={historyIndex === 0}
                className="p-2 rounded-md text-gray-600 hover:text-gray-900 disabled:opacity-50"
                title="Undo"
              >
                <Undo2 className="w-5 h-5" />
              </button>
              <button
                onClick={redo}
                disabled={historyIndex === historyLength - 1}
                className="p-2 rounded-md text-gray-600 hover:text-gray-900 disabled:opacity-50"
                title="Redo"
              >
                <Redo2 className="w-5 h-5" />
              </button>
            </div>

            {/* Grid Toggle */}
            <button
              onClick={toggleGrid}
              className={`p-2 rounded-md transition-colors ${
                showGrid ? 'bg-gray-100 text-red-600' : 'text-gray-400'
              }`}
              title="Toggle Grid"
            >
              <Grid3X3 className="w-5 h-5" />
            </button>

            {/* Zoom */}
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setZoom(zoom - 0.25)}
                className="p-2 rounded-md text-gray-600 hover:text-gray-900"
                title="Zoom Out"
              >
                <ZoomOut className="w-5 h-5" />
              </button>
              <span className="px-2 text-sm font-medium text-gray-700">
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={() => setZoom(zoom + 0.25)}
                className="p-2 rounded-md text-gray-600 hover:text-gray-900"
                title="Zoom In"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
            </div>

            {/* Clear */}
            <button
              onClick={clearGrid}
              className="p-2 rounded-md text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors"
              title="Clear All"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-4">
            {/* Export */}
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download className="w-5 h-5" />
              Export PNG
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Color Palette */}
        <div className="w-72 bg-white border-r border-gray-200 p-4 overflow-y-auto">
          <h3 className="font-semibold text-gray-900 mb-4">Do-U-Fuse Colors</h3>
          
          {COLOR_CATEGORIES.map((category) => (
            <div key={category.id} className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span>{category.emoji}</span>
                <span className="font-medium text-gray-700">{category.name}</span>
              </div>
              <div className="grid grid-cols-6 gap-2">
                {DOUFUSE_COLORS.filter(c => c.category === category.id).map((color) => (
                  <button
                    key={color.hex}
                    onClick={() => setSelectedColor(color.hex)}
                    className={`w-8 h-8 rounded-md border-2 transition-all ${
                      selectedColor === color.hex
                        ? 'border-red-500 scale-110 shadow-md'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          ))}

          {/* Selected Color Info */}
          <div className="mt-6 p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-3 mb-3">
              <div 
                className="w-12 h-12 rounded-lg border-2 border-gray-300"
                style={{ backgroundColor: selectedColor }}
              />
              <div>
                <div className="font-medium text-gray-900">
                  {DOUFUSE_COLORS.find(c => c.hex === selectedColor)?.name || 'Custom'}
                </div>
                <div className="text-sm text-gray-500">{selectedColor}</div>
              </div>
            </div>
            
            {Object.keys(colorCounts).length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Color Count</h4>
                <div className="space-y-1 text-sm">
                  {Object.entries(colorCounts)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 5)
                    .map(([color, count]) => (
                      <div key={color} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-4 h-4 rounded"
                            style={{ backgroundColor: color }}
                          />
                          <span className="text-gray-600">{count}</span>
                        </div>
                      </div>
                    ))}
                  <div className="pt-2 border-t border-gray-200 font-medium">
                    Total: {Object.keys(gridData).length} beads
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Canvas */}
        <div 
          className="flex-1 overflow-auto p-8 bg-gray-200"
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div 
            className="inline-block bg-white shadow-xl rounded-lg overflow-hidden"
            style={{ 
              transform: `scale(${zoom})`,
              transformOrigin: 'top left'
            }}
          >
            <div 
              className="grid"
              style={{
                gridTemplateColumns: `repeat(${gridWidth}, 20px)`,
                gridTemplateRows: `repeat(${gridHeight}, 20px)`,
              }}
            >
              {Array.from({ length: gridHeight }).map((_, y) =>
                Array.from({ length: gridWidth }).map((_, x) => (
                  <div
                    key={`${x}-${y}`}
                    className={`w-5 h-5 border border-gray-200 cursor-crosshair transition-colors ${
                      showGrid ? '' : 'border-transparent'
                    }`}
                    style={{ 
                      backgroundColor: gridData[`${x},${y}`] || '#FFFFFF'
                    }}
                    onMouseDown={() => handleMouseDown(x, y)}
                    onMouseEnter={() => handleMouseMove(x, y)}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
