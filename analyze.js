const { chromium } = require('playwright');

async function analyzeSite() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  
  // Capture console errors
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('CONSOLE ERROR:', msg.text());
    }
  });
  
  try {
    // Go to perlerbeads.net
    await page.goto('https://perlerbeads.net', { waitUntil: 'networkidle', timeout: 30000 });
    console.log('=== PERLERBEADS.NET ANALYSIS ===\n');
    
    // 1. Check page title
    const title = await page.title();
    console.log('Title:', title);
    
    // 2. Check main sections
    const sections = await page.evaluate(() => {
      const results = [];
      document.querySelectorAll('section, header, footer, nav').forEach(el => {
        if (el.textContent.trim().length > 20) {
          results.push({
            tag: el.tagName.toLowerCase(),
            id: el.id,
            className: el.className.split(' ').slice(0, 3).join(' '),
            text: el.textContent.trim().substring(0, 100)
          });
        }
      });
      return results;
    });
    
    console.log('\n--- SECTIONS ---');
    sections.slice(0, 10).forEach(s => {
      console.log(`[${s.tag}] ${s.className.substring(0, 50)}`);
    });
    
    // 3. Check for key elements
    const features = await page.evaluate(() => {
      const result = {
        uploadArea: !!document.querySelector('[class*="upload"], input[type="file"]'),
        paletteSelector: !!document.querySelector('[class*="palette"], [class*="color"]'),
        gridEditor: !!document.querySelector('[class*="grid"], [class*="board"]'),
        downloadBtn: !!document.querySelector('[class*="download"], [class*="export"]'),
        gallery: !!document.querySelector('[class*="gallery"]'),
        editor: !!document.querySelector('[class*="editor"]'),
      };
      
      // Find key buttons
      const buttons = [];
      document.querySelectorAll('button, [role="button"], a').forEach(el => {
        const text = el.textContent.trim().toLowerCase();
        if (text.includes('upload') || text.includes('download') || text.includes('create') || text.includes('convert')) {
          buttons.push({ text: el.textContent.trim(), class: el.className.split(' ').slice(0, 3).join(' ') });
        }
      });
      result.buttons = buttons.slice(0, 15);
      
      return result;
    });
    
    console.log('\n--- KEY FEATURES ---');
    console.log('Upload area:', features.uploadArea);
    console.log('Palette selector:', features.paletteSelector);
    console.log('Grid editor:', features.gridEditor);
    console.log('Download button:', features.downloadBtn);
    console.log('Gallery:', features.gallery);
    console.log('\nKey buttons:', features.buttons.map(b => b.text));
    
    // 4. Check color palette options
    console.log('\n--- COLOR PALETTE ---');
    
    // 5. Navigate to gallery
    await page.click('a[href*="gallery"]');
    await page.waitForTimeout(2000);
    
    const galleryCount = await page.evaluate(() => {
      return {
        categoryCount: document.querySelectorAll('[class*="category"], [class*="filter"]').length,
        itemCount: document.querySelectorAll('[class*="card"], [class*="pattern"]').length,
        categories: Array.from(document.querySelectorAll('[class*="category"], [class*="filter"]')).map(el => el.textContent.trim()).slice(0, 10)
      };
    });
    
    console.log('Gallery categories:', galleryCount.categories);
    console.log('Gallery items shown:', galleryCount.itemCount);
    
  } catch (error) {
    console.log('Error:', error.message);
  } finally {
    await browser.close();
  }
}

analyzeSite();