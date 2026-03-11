const fs = require('fs');
const sharp = require('sharp');
const path = require('path');

const dir = path.join(__dirname, 'img', 'parceiros');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

const urls = [
    { url: 'http://web.archive.org/web/20230601000000if_/https://www.mantellimoveis.com.br/wp-content/uploads/2021/04/blum.png', name: 'blum.webp' },
    { url: 'http://web.archive.org/web/20230601000000if_/https://www.mantellimoveis.com.br/wp-content/uploads/2021/04/hafele.png', name: 'hafele.webp' },
    { url: 'http://web.archive.org/web/20230601000000if_/https://www.mantellimoveis.com.br/wp-content/uploads/2021/04/arauco.png', name: 'arauco.webp' },
    { url: 'http://web.archive.org/web/20230601000000if_/https://www.mantellimoveis.com.br/wp-content/uploads/2021/04/duratex.png', name: 'duratex.webp' }
];

async function downloadAndConvert() {
    for (const item of urls) {
        const dest = path.join(dir, item.name);
        try {
            console.log(`Downloading ${item.url}...`);
            const response = await fetch(item.url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
                }
            });
            console.log(`Status: ${response.status}`);
            
            if (response.status !== 200) {
                console.error(`Skipping ${item.name} due to status ${response.status}`);
                continue;
            }
            
            const arrayBuffer = await response.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            
            await sharp(buffer)
                .webp({ quality: 80, effort: 6 })
                .toFile(dest);
            console.log(`Saved ${item.name}`);
        } catch (err) {
            console.error(`Error with ${item.name}:`, err);
        }
    }
}

downloadAndConvert().then(() => console.log('Done')).catch(console.error);
