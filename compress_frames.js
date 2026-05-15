const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const inputDir = path.join(__dirname, 'public', 'frames');
const outputDir = path.join(__dirname, 'public', 'frames_compressed');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function compressFrames() {
  console.log("Starting frame compression! This may take a minute or two...");
  
  const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.jpg') || f.endsWith('.jpeg'));
  let count = 0;
  
  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file);
    
    // Resize to max 1280px width (plenty for web) and 60% quality JPEG
    await sharp(inputPath)
      .resize({ width: 1280, withoutEnlargement: true })
      .jpeg({ quality: 60, progressive: true })
      .toFile(outputPath);
      
    count++;
    if (count % 50 === 0 || count === files.length) {
      console.log(`Compressed ${count} / ${files.length} frames...`);
    }
  }

  // Swap directories
  console.log("Swapping directories...");
  fs.rmSync(inputDir, { recursive: true, force: true });
  fs.renameSync(outputDir, inputDir);
  
  console.log("✅ Compression complete! Your 1.5GB frames are now tiny and web-ready!");
}

compressFrames().catch(console.error);
