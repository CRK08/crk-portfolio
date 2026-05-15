const fs = require('fs');
const path = require('path');

const framesDir = path.join(__dirname, 'public', 'frames');

async function thinFrames() {
  console.log("Starting frame thinning process...");
  
  // Read all current frames
  let files = fs.readdirSync(framesDir).filter(f => f.endsWith('.jpg') || f.endsWith('.jpeg')).sort();
  
  if (files.length <= 260) {
    console.log(`Already at ${files.length} frames. No need to thin.`);
    return;
  }

  console.log(`Found ${files.length} frames. Deleting every other frame...`);
  
  // Keep even indexes (0, 2, 4...) -> corresponds to files 1, 3, 5...
  const filesToKeep = files.filter((_, index) => index % 2 === 0);
  const filesToDelete = files.filter((_, index) => index % 2 !== 0);

  // Delete the unwanted frames
  for (const file of filesToDelete) {
    fs.unlinkSync(path.join(framesDir, file));
  }
  
  console.log(`Deleted ${filesToDelete.length} frames. Now renaming the remaining ${filesToKeep.length} frames to be sequential...`);

  // Rename kept files to be perfectly sequential
  for (let i = 0; i < filesToKeep.length; i++) {
    const oldPath = path.join(framesDir, filesToKeep[i]);
    const newName = `frame_${String(i + 1).padStart(4, "0")}.jpg`;
    const newPath = path.join(framesDir, newName);
    
    // Only rename if the name actually needs to change to avoid conflicts
    if (oldPath !== newPath) {
      fs.renameSync(oldPath, newPath);
    }
  }

  console.log("✅ Frame thinning complete! You now have exactly 260 frames.");
}

thinFrames().catch(console.error);
