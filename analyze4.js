const { chromium } = require('playwright');

async function analyzeDesigner() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1600 } });
  const page = await context.newPage();
  
  console.log('=== ANALYZING DESIGNER PAGE ===\n');
  
  // Go to a designer page with a sample image
  await page.goto('https://perlerbeads.net/designer?src=%2Fgallery%2Fpink-sprinkles-donut.jpg&width=48&title=Pink%20Sprinkles%20Donut', { waitUntil: 'networkidle', timeout: 30000 });
  
  await page.screenshot({ path: 'D:/AI/opencode/docs/perlerbeads-designer.png', fullPage: true });
  
  // Analyze the designer interface
  const designer = await page.evaluate(() => {
    return {
      // Main sections
      hasImagePreview: !!document.querySelector('img[src*="sprinkles"]'),
      hasCanvas: !!document.querySelector('canvas'),
      hasGrid: !!document.querySelector('[class*="grid"]'),
      
      // Controls
      buttons: Array.from(document.querySelectorAll('button, [role="button"]')).map(b => ({
        text: b.textContent.trim().substring(0, 30),
        class: b.className.split(' ').slice(0, 3).join(' ')
      })).filter(b => b.text),
      
      // Selects/dropdowns
      selects: Array.from(document.querySelectorAll('select')).map(s => ({
        id: s.id,
        class: s.className,
        options: Array.from(s.options).map(o => o.value)
      })),
      
      // Inputs
      inputs: Array.from(document.querySelectorAll('input')).map(i => ({
        type: i.type,
        id: i.id,
        class: i.className.split(' ')[0],
        value: i.value
      })),
      
      // Palette display
      paletteColors: Array.from(document.querySelectorAll('[class*="color"]')).slice(0, 30).map(el => {
        const style = el.getAttribute('style') || '';
        const bg = style.match(/background(-color)?:\s*([^;"]+)/);
        return bg ? bg[2].trim() : null;
      }).filter(Boolean),
      
      // Download options
      downloadOptions: Array.from(document.querySelectorAll('a[download], button, [class*="download"]')).map(b => ({
        text: b.textContent.trim(),
        href: b.href || b.getAttribute('download')
      }))
    };
  });
  
  console.log('Designer Analysis:');
  console.log('- Has Image Preview:', designer.hasImagePreview);
  console.log('- Has Canvas:', designer.hasCanvas);
  console.log('- Has Grid:', designer.hasGrid);
  console.log('\nButtons:', designer.buttons);
  console.log('\nSelects:', JSON.stringify(designer.selects, null, 2));
  console.log('\nInputs:', designer.inputs);
  console.log('\nDownload Options:', designer.downloadOptions);
  
  // Check for specific UI elements
  const features = await page.evaluate(() => {
    const result = {
      paletteSelector: false,
      gridSizeControl: false,
      brightnessControl: false,
      beadCount: false,
      undoRedo: false,
      zoomControl: false,
      downloadPDF: false,
      downloadPNG: false,
    };
    
    // Check for specific text/elements
    const pageText = document.body.innerText.toLowerCase();
    result.paletteSelector = pageText.includes('palette') || pageText.includes('perler') || pageText.includes('hama');
    result.gridSizeControl = pageText.includes('grid') || pageText.includes('size');
    result.beadCount = pageText.includes('bead') || pageText.includes('count');
    result.undoRedo = pageText.includes('undo') || pageText.includes('redo');
    
    // Check download buttons
    result.downloadPDF = pageText.includes('pdf');
    result.downloadPNG = pageText.includes('download') || pageText.includes('export');
    
    return result;
  });
  
  console.log('\nFeatures Check:');
  console.log(JSON.stringify(features, null, 2));
  
  await browser.close();
}

analyzeDesigner().catch(console.error);