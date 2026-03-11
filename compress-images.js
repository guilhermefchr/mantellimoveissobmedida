const sharp = require('sharp');

async function optimize() {
    console.log('Optimizing Mobile Hero...');
    await sharp('img/Hero Mobile.webp')
        .resize({ width: 800 })
        .webp({ quality: 80, effort: 6 })
        .toFile('img/Hero Mobile-min.webp');

    console.log('Optimizing Desktop Hero...');
    await sharp('img/Hero Desktop.webp')
        .resize({ width: 1600 })
        .webp({ quality: 80, effort: 6 })
        .toFile('img/Hero Desktop-min.webp');

    console.log('Images optimized successfully.');
}

optimize().catch(err => console.error(err));
