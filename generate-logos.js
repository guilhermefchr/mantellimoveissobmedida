const fs = require('fs');
const sharp = require('sharp');
const path = require('path');

const dir = path.join(__dirname, 'img', 'parceiros');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

// Generate an SVG for each brand
const logos = [
    { name: 'blum.webp', text: 'blum', color: '#ff6600', w: 120, h: 40 },
    { name: 'hafele.webp', text: 'Häfele', color: '#e3000f', w: 120, h: 40 },
    { name: 'arauco.webp', text: 'ARAUCO', color: '#005a3c', w: 120, h: 40 },
    { name: 'duratex.webp', text: 'Duratex', color: '#00529b', w: 120, h: 40 }
];

async function generateLogos() {
    for (const logo of logos) {
        const dest = path.join(dir, logo.name);
        
        let svg = `
        <svg width="${logo.w}" height="${logo.h}" viewBox="0 0 ${logo.w} ${logo.h}" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="transparent" />
            <text x="50%" y="55%" font-family="Arial, sans-serif" font-weight="bold" font-size="20" fill="${logo.color}" text-anchor="middle" dominant-baseline="middle">${logo.text}</text>
        </svg>
        `;
        
        try {
            await sharp(Buffer.from(svg))
                .webp({ quality: 90 })
                .toFile(dest);
            console.log(`Generated and saved ${logo.name}`);
        } catch (err) {
            console.error(`Error generating ${logo.name}:`, err);
        }
    }
}

generateLogos().then(() => console.log('Done')).catch(console.error);
