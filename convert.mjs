import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const assetsDir = path.join(__dirname, 'Assets');
const outDir = path.join(__dirname, 'img');

if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir);
}

const images = [
    { in: 'Logo-tipografia-03-Mantelli-Moveis.png', out: 'logo.webp' },
    { in: 'IMG_4593-Media.jpeg', out: 'hero-bg.webp' },
    { in: 'Cozinha3-LP.jpeg', out: 'projeto-cozinha.webp' },
    { in: 'cozinha_provencal.webp', out: 'projeto-cozinha-provencal.webp' },
    { in: 'WhatsApp-Image-2024-05-20-at-08.46.04.jpeg', out: 'projeto-armario.webp' },
    { in: 'WhatsApp-Image-2024-05-20-at-08.46.48.jpeg', out: 'projeto-sala.webp' },
    { in: 'Office_room-1.webp', out: 'projeto-escritorio.webp' }
];

async function convertAll() {
    for (const img of images) {
        let inputPath = path.join(assetsDir, img.in);
        let outputPath = path.join(outDir, img.out);

        try {
            await sharp(inputPath)
                .webp({ quality: 80 })
                .toFile(outputPath);
            console.log(`Converted ${img.in} to ${img.out}`);
        } catch (err) {
            console.error(`Error converting ${img.in}:`, err);
        }
    }
}

convertAll();
