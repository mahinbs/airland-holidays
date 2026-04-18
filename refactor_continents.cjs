const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/components/home/Continents.tsx');
let content = fs.readFileSync(filePath, 'utf-8');

// replace names
content = content.replace(/Destinations/g, 'Continents');
content = content.replace(/DestinationCard/g, 'ContinentCard');
content = content.replace(/Destination/g, 'Continent');
content = content.replace(/destinations/g, 'continents');
content = content.replace(/dest\./g, 'cont.');
content = content.replace(/dest\}/g, 'cont}');
content = content.replace(/\{ dest :/g, '{ cont :');
content = content.replace(/dest, /g, 'cont, ');

// update the URL
content = content.replace(/href=\{`\/continents\/\$\{cont\.name\.toLowerCase\(\)\.replace\(', ', '-'\)\}`\}/g, 'href={`/continents/${cont.id}`}');

// Update titles
content = content.replace(/Wanderlust Awaits/g, 'Travel the World');
content = content.replace(/Top Continents/g, 'Browse by Region');
content = content.replace(/View All Continents/g, 'View All Regions');

// Replace destinations data
const dataRegex = /const continents = \[[\s\S]*?\];/m;
const newContinents = `const continents = [
    { id: 'asia', name: 'Asia', tours: 142, image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80', tag: 'Trending' },
    { id: 'europe', name: 'Europe', tours: 118, image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&q=80' },
    { id: 'africa', name: 'Africa', tours: 48, image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=600&q=80', tag: 'Wild' },
    { id: 'middle-east', name: 'Middle East', tours: 64, image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80' },
    { id: 'americas', name: 'Americas', tours: 56, image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=600&q=80' },
    { id: 'pacific', name: 'Australia & Pacific', tours: 32, image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80' },
];`;

content = content.replace(dataRegex, newContinents);

fs.writeFileSync(filePath, content);
console.log('Continents refactor complete');
