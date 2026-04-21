'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { pixelateImage, PixelCell } from '@/lib/perler/pixelator';
import { getPalette, ColorEntry } from '@/lib/perler/palettes';
import { calculateStatistics, ColorStat } from '@/lib/perler/statistics';
import { jsPDF } from 'jspdf';
import { saveAs } from 'file-saver';
import { Upload, Download, Palette, Grid3X3, Trash2, Image as ImageIcon } from 'lucide-react';

export default function PerlerGenerator() {
  const [gridSize, setGridSize] = useState(50);
  const [grid, setGrid] = useState<PixelCell[][] | null>(null);
  const [stats, setStats] = useState<ColorStat[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const palette = getPalette();

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setIsLoading(true);
    const imageUrl = URL.createObjectURL(file);
    try {
      const result = await pixelateImage(imageUrl, gridSize, palette);
      setGrid(result);
      setStats(calculateStatistics(result));
    } catch (error) {
      console.error('Pixelation error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png'] },
    maxFiles: 1,
  });

  // 当网格大小改变时重新处理（如果有图片）
  useEffect(() => {
    // 实际项目中这里需要保存原始图片 URL 以便重新处理
    // 简化起见，这里仅展示逻辑
  }, [gridSize]);

  // 渲染画布
  useEffect(() => {
    if (!grid || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = grid.length;
    const cellSize = Math.floor(600 / size); // 固定显示宽度 600px
    canvas.width = size * cellSize;
    canvas.height = size * cellSize;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const cell = grid[y][x];
        ctx.fillStyle = cell.mappedColor.hex;
        ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
    }

    // 绘制网格线
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    for (let i = 0; i <= size; i++) {
      ctx.moveTo(i * cellSize, 0);
      ctx.lineTo(i * cellSize, canvas.height);
      ctx.moveTo(0, i * cellSize);
      ctx.lineTo(canvas.width, i * cellSize);
    }
    ctx.stroke();
  }, [grid, gridSize]);

  const handleExportPNG = () => {
    if (!canvasRef.current) return;
    canvasRef.current.toBlob((blob) => {
      if (blob) saveAs(blob, 'perler-pattern.png');
    });
  };

  const handleExportPDF = () => {
    if (!grid) return;
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Perler Beads Pattern", 14, 22);
    
    doc.setFontSize(12);
    doc.text(`Grid Size: ${gridSize}x${gridSize}`, 14, 32);
    doc.text(`Total Beads: ${stats.reduce((sum, s) => sum + s.count, 0)}`, 14, 40);

    let y = 50;
    stats.forEach(stat => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
      doc.setFillColor(stat.hex);
      doc.rect(14, y - 5, 10, 10, 'F');
      doc.text(`${stat.colorName} (${stat.colorId}): ${stat.count}`, 30, y + 4);
      y += 10;
    });

    doc.save('perler-pattern.pdf');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-indigo-600">Perler Beads Generator</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左侧：控制与上传 */}
          <div className="lg:col-span-1 space-y-6">
            <div 
              {...getRootProps()} 
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400'}`}
            >
              <input {...getInputProps()} />
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">拖拽图片到此处，或点击上传</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-semibold mb-4 flex items-center gap-2"><Grid3X3 size={20}/> 网格设置</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    网格尺寸: {gridSize}x{gridSize}
                  </label>
                  <input 
                    type="range" 
                    min="10" 
                    max="100" 
                    value={gridSize} 
                    onChange={(e) => setGridSize(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>
              </div>
            </div>

            {stats.length > 0 && (
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-semibold mb-4 flex items-center gap-2"><Palette size={20}/> 颜色统计</h3>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {stats.map((stat) => (
                    <div key={stat.colorId} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded border border-gray-200" style={{ backgroundColor: stat.hex }}></div>
                        <span>{stat.colorName}</span>
                      </div>
                      <span className="font-mono">{stat.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 右侧：预览与导出 */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center justify-center min-h-[600px]">
              {isLoading ? (
                <div className="animate-pulse text-indigo-600">正在生成拼豆图纸...</div>
              ) : grid ? (
                <>
                  <canvas ref={canvasRef} className="max-w-full h-auto border border-gray-200 shadow-sm" />
                  <div className="mt-6 flex gap-4">
                    <button onClick={handleExportPNG} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                      <Download size={18} /> 导出 PNG
                    </button>
                    <button onClick={handleExportPDF} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                      <Download size={18} /> 导出 PDF
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-gray-400 flex flex-col items-center">
                  <ImageIcon size={64} className="mb-4 opacity-50" />
                  <p>请上传图片开始生成</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}