import fs from 'fs';
import path from 'path';
import sharp  from 'sharp';

console.log('prebuild script running')

const data = fs.readFileSync('./utils/imagesData.json', 'utf8')
const imagesData = JSON.parse(data);

const publicDirectory = path.join(process.cwd(), './public/images');
  
// Use fs.readdirSync to get all file names in the public directory
const results = fs.readdirSync(publicDirectory);
const reducedResults = []
let i = 0
for (let result of results) {
  if(result === '.DS_Store') continue
  const metadata = await sharp("./public/images/"+result).metadata();
  const buffer = await sharp("./public/images/"+result).resize({ width: 10}).toBuffer()
  const base64Image = `data:image/jpeg;base64,${buffer.toString('base64')}`;
  let imageData = {}
  reducedResults.push({
    id: i,
    name: result,
    blur:base64Image,
    width: metadata.width,
    height: metadata.height,
    faces: imagesData[result] || []
  })

  i++
}

fs.writeFileSync('./utils/cachedImages.json', JSON.stringify(reducedResults,null,1))