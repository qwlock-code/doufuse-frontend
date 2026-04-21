const { chromium } = require('playwright');

async function detailedAnalysis() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  
  console.log('=== DETAILED PERLERBEADS.NET vs DO-U-FUSE COMPARISON ===\n');
  
  // Analyze perlerbeads.net editor features
  await page.goto('https://perlerbeads.net', { waitUntil: 'networkidle', timeout: 30000 });
  
  // 1. Get all key UI elements
  const elements = await page.evaluate(() => {
    const allElements = document.querySelectorAll('*');
    const result = {
      buttons: [],
      inputs: [],
      selects: [],
      images: []
    };
    
    document.querySelectorAll('button, [role="button"]').forEach(el => {
      result.buttons.push(el.textContent.trim().substring(0, 40));
    });
    
    document.querySelectorAll('input, textarea, select').forEach(el => {
      result.inputs.push({ type: el.type, placeholder: el.placeholder, id: el.id, class: el.className.split(' ')[0] });
    });
    
    document.querySelectorAll('img').forEach(el => {
      if (el.naturalWidth > 50) {
        result.images.push({ src: el.src.substring(0, 80), alt: el.alt });
      }
    });
    
    return result;
  });
  
  console.log('--- UI ELEMENTS ---');
  console.log('Buttons:', elements.buttons.filter(b => b));
  
  // 2. Check for specific perlerbeads features
  const perlerFeatures = await page.evaluate(() => {
    return {
      hasImageUpload: !!document.querySelector('input[type="file"]'),
      hasDragDrop: !!document.querySelector('[class*="drop"], [class*="drag"]'),
      hasPaletteSelect: !!document.querySelector('select, [class*="palette"], [class*="color"]'),
      hasGridSizeSlider: !!document.querySelector('[type="range"], [class*="size"], [class*="grid"]'),
      hasDownload: !!document.querySelector('[class*="download"], [class*="export"], [class*="pdf"]'),
      hasBeadCount: !!document.querySelector('[class*="count"], [class*="bead"]'),
      hasBrightness: !!document.querySelector('[class*="bright"], [class*="contrast"]'),
      hasUndoRedo: !!document.querySelector('[class*="undo"], [class*="redo"]'),
    };
  });
  
  console.log('\n--- FEATURE COMPARISON ---');
  console.log('perlerbeads.net features:');
  Object.entries(perlerFeatures).forEach(([key, val]) => {
    console.log(`  ${key}: ${val}`);
  });
  
  // 3. Get palette colors
  console.log('\n--- COLOR PALETTE ---');
  const palette = await page.evaluate(() => {
    // Get any color-related elements
    const colors = [];
    document.querySelectorAll('[class*="color"], [style*="background"]').forEach(el => {
      const style = el.getAttribute('style') || '';
      if (style.includes('#') || style.includes('rgb')) {
        const match = style.match(/#\w{3,6}|rgb\([^)]+\)/g);
        if (match) colors.push(...match);
      }
    });
    return [...new Set(colors)].slice(0, 30);
  });
  console.log('Colors found:', palette.slice(0, 20));
  
  // 4. Check gallery page
  console.log('\n--- GALLERY ANALYSIS ---');
  try {
    await page.goto('https://perlerbeads.net/gallery', { waitUntil: 'networkidle', timeout: 30000 });
    const galleryCategories = await page.evaluate(() => {
      const cats = [];
      document.querySelectorAll('[class*="category"], a[class*="cat"], button[class*="cat"]').forEach(el => {
        cats.push(el.textContent.trim());
      });
      return cats;
    });
    console.log('Gallery categories:', galleryCategories.filter(c => c));
  } catch(e) {
    console.log('Gallery error:', e.message);
  }
  
  // 5. Check tutorials/tutorials page
  console.log('\n--- TUTORIALS PAGE ---');
  try {
    await page.goto('https://perlerbeads.net/tutorials', { waitUntil: 'networkidle', timeout: 30000 });
    const tutorialContent = await page.evaluate(() => {
      return {
        exists: document.body.textContent.length > 100,
        title: document.querySelector('h1, h2')?.textContent?.trim(),
        sections: document.querySelectorAll('section, article').length
      };
    });
    console.log('Tutorial exists:', tutorialContent.exists);
    console.log('Tutorial sections:', tutorialContent.sections);
  } catch(e) {
    console.log('Tutorials error:', e.message);
  }
  
  await browser.close();
  console.log('\n=== ANALYSIS COMPLETE ===');
}

detailedAnalysis().catch(console.error);