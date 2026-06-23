import sharp from 'sharp'
await sharp({ create: { width: 1600, height: 1200, channels: 3, background: { r: 255, g: 87, b: 34 } } })
  .png()
  .toFile('test-upload.png')
console.log('created test-upload.png')
