const { chromium } = require('playwright');

async function deepAnalysis() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1600 } });
  const page = await context.newPage();
  
  console.log('=== COMPLETE FEATURE ANALYSIS ===\n');
  
  // Main page analysis
  await page.goto('https://perlerbeads.net', { waitUntil: 'networkidle', timeout: 30000 });
  
  // Take full page screenshot
  await page.screenshot({ path: 'D:/AI/opencode/docs/perlerbeads-home.png', fullPage: true });
  console.log('Screenshot saved to docs/perlerbeads-home.png');
  
  // Extract main content sections
  const mainContent = await page.evaluate(() => {
    const sections = [];
    
    // Hero section
    const hero = document.querySelector('section, div[class*="hero"], main');
    if (hero) {
      sections.push({
        name: 'Hero/Upload Section',
        html: hero.innerHTML.substring(0, 2000)
      });
    }
    
    // Check for file input
    const fileInput = document.querySelector('input[type="file"]');
    sections.push({
      name: 'File Input',
      exists: !!fileInput,
      attributes: fileInput ? {
        accept: fileInput.accept,
        multiple: fileInput.multiple
      } : null
    });
    
    // Check all select/option elements for palette
    const selects = document.querySelectorAll('select');
    sections.push({
      name: 'Select Elements',
      count: selects.length,
      options: Array.from(selects).map(s => ({
        id: s.id,
        class: s.className,
        options: Array.from(s.options).slice(0, 10).map(o => o.value)
      }))
    });
    
    // Check for range inputs (sliders)
    const ranges = document.querySelectorAll('input[type="range"]');
    sections.push({
      name: 'Range Inputs',
      count: ranges.length,
      details: Array.from(ranges).map(r => ({
        min: r.min,
        max: r.max,
        value: r.value,
        class: r.className
      }))
    });
    
    // Check for download buttons
    const downloadBtns = document.querySelectorAll('a[download], button, a[class*="download"]');
    sections.push({
      name: 'Download Buttons',
      count: downloadBtns.length,
      texts: Array.from(downloadBtns).map(b => b.textContent.trim()).filter(t => t)
    });
    
    return sections;
  });
  
  console.log('\n--- MAIN CONTENT ---');
  console.log(JSON.stringify(mainContent, null, 2));
  
  // Check gallery page more thoroughly
  console.log('\n--- GALLERY PAGE ---');
  await page.goto('https://perlerbeads.net/gallery', { waitUntil: 'networkidle', timeout: 30000 });
  await page.screenshot({ path: 'D:/AI/opencode/docs/perlerbeads-gallery.png', fullPage: true });
  
  const galleryInfo = await page.evaluate(() => {
    return {
      url: window.location.href,
      title: document.title,
      // Get all links/buttons for categories
      categoryLinks: Array.from(document.querySelectorAll('a, button')).filter(el => {
        const text = el.textContent.toLowerCase();
        return text.includes('category') || text.includes('cute') || text.includes('animal') || text.includes('food') || text.includes('mini');
      }).map(el => ({
        text: el.textContent.trim(),
        href: el.href || el.getAttribute('data-href'),
        class: el.className.split(' ')[0]
      })),
      // Get pattern cards
      patternCards: Array.from(document.querySelectorAll('[class*="card"], [class*="pattern"], a[href*="/pattern/"]')).slice(0, 10).map(el => ({
        text: el.textContent.trim().substring(0, 50),
        href: el.href || el.querySelector('a')?.href
      }))
    };
  });
  
  console.log(JSON.stringify(galleryInfo, null, 2));
  
  // Get the current Do-U-Fuse editor page to compare
  console.log('\n--- CURRENT DO-U-FUSE EDITOR ---');
  await page.goto('http://doufuse.com/editor', { waitUntil: 'networkidle', timeout: 30000 });
  await page.screenshot({ path: 'D:/AI/opencode/docs/doufuse-editor.png', fullPage: true });
  
  const doufuseEditor = await page.evaluate(() => {
    return {
      url: window.location.href,
      title: document.title,
      hasUpload: !!document.querySelector('input[type="file"]'),
      hasGrid: !!document.querySelector('[class*="grid"]'),
      hasPalette: !!document.querySelector('[class*="palette"], [class*="color"]'),
      hasDownload: !!document.querySelector('[class*="download"], button'),
      bodyText: document.body.innerText.substring(0, 500)
    };
  });
  
  console.log(JSON.stringify(doufuseEditor, null, 2));
  
  await browser.close();
  console.log('\n=== ANALYSIS COMPLETE ===');
}

deepAnalysis().catch(console.error);