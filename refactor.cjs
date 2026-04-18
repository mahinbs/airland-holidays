const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/pages/ContinentDetail.tsx');
let content = fs.readFileSync(filePath, 'utf-8');

// 1. Rename function and variables
content = content.replace(/DestinationDetail/g, 'ContinentDetail');
content = content.replace(/mockCountryData/g, 'mockContinentData');
content = content.replace(/const \{ country \} = useParams\(\);/g, 'const { continent } = useParams();');

// 2. Update country to continent in render
content = content.replace(/\{country\?\.replace\('-', ' '\) \|\| data\.name\}/g, "{continent?.replace('-', ' ') || data.name}");
content = content.replace(/What's in \{data\.name\}/g, "Top Countries in {data.name}");

// 3. Update top Attractions to Top Countries
content = content.replace(/activeAttractionCat/g, 'activeCountryCat');
content = content.replace(/setActiveAttractionCat/g, 'setActiveCountryCat');
content = content.replace(/filteredAttractions/g, 'filteredCountries');
content = content.replace(/attractions:/g, 'topCountries:');

const topAttractionsSectionStr = `                    {/* 7. ATTRACTIONS & EXPERIENCES */}
                    <section className="mb-14 bg-slate-50 p-6 md:p-10 rounded-3xl border border-slate-100">
                        <h2 className="font-marcellus text-3xl md:text-4xl text-slate-900 mb-8">Top Attractions</h2>`;

const topCountriesSectionStr = `                    {/* 7. TOP COUNTRIES */}
                    <section className="mb-14 bg-slate-50 p-6 md:p-10 rounded-3xl border border-slate-100">
                        <h2 className="font-marcellus text-3xl md:text-4xl text-slate-900 mb-8">Top Countries in {data.name}</h2>`;

content = content.replace(topAttractionsSectionStr, topCountriesSectionStr);

const attrMapStart = `{filteredCountries.map((attr, i) => (`
const countryMapStart = `{filteredCountries.map((country, i) => (`
content = content.replace(attrMapStart, countryMapStart);

content = content.replace(/<motion\.div key=\{i\} variants=\{\{ hidden: \{ scale: 0\.95, opacity: 0 \}, visible: \{ scale: 1, opacity: 1 \} \}\} className="relative rounded-2xl overflow-hidden group cursor-pointer h-\[200px\] md:h-\[240px\] shadow-sm">/g, `<motion.div key={i} variants={{ hidden: { scale: 0.95, opacity: 0 }, visible: { scale: 1, opacity: 1 } }}><Link to={\`/destinations/\${country.slug || 'indonesia'}\`} className="relative rounded-2xl overflow-hidden group cursor-pointer h-[200px] md:h-[240px] shadow-sm block">`);

content = content.replace(/<img src=\{attr\.image\} alt=\{attr\.name\}/g, '<img src={country.image} alt={country.name}');
content = content.replace(/\{attr\.category\}/g, '{country.category}');
content = content.replace(/\{attr\.name\}/g, '{country.name}');
content = content.replace(/<\/motion\.div>\n                            \}\)\)/g, '</Link></motion.div>\n                            ))');

// 4. Update the mock data
const mockDataStart = `const mockContinentData = {
    name: 'Asia',
    slug: 'asia',
    heroImage: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=2000&q=80',
    description: 'From ancient temples and spiritual retreats to hyper-modern cities and pristine beaches, Asia is a continent of stunning contrasts and endless discovery.',

    overview: {
        timeZone: 'UTC+4 to UTC+9',
        currency: 'Various',
        language: 'Hundreds of languages',
        callingCode: 'Various',
        visaType: 'Varies by Country',
        visaBadge: 'mixed',
        bestTime: 'Varies (Oct - Apr typical)',
        capital: '-',
        continent: 'Asia',
    },

    insights: {
        annualVisitors: '250.1M',
        genderSplit: { male: 52, female: 48 },
        travelPurpose: [
            { type: 'Couples & Honeymoon', percent: 35, icon: Heart },
            { type: 'Family', percent: 30, icon: Users },
            { type: 'Solo Travellers', percent: 20, icon: User },
            { type: 'Business', percent: 15, icon: Briefcase },
        ],
        topIndianCities: ['Mumbai', 'Delhi', 'Bengaluru', 'Chennai', 'Hyderabad'],
    },

    about: 'Asia is not a single destination — it is a universe of experiences. From the spiritual serenity of Bali\\'s rice terraces to the raw wildness of the Himalayas, from Tokyo\\'s electric energy to the untouched beauty of the Maldives, every country tells a different story. It is the most biodiverse continent on earth, with cultures that are as warm as its tropical climates.',

    whyIndians: [
        { icon: FileCheck, title: 'Easy Visas', desc: 'Many Asian countries offer Visa on Arrival or E-Visas for Indians.' },
        { icon: Wallet, title: 'Budget Friendly', desc: 'Outstanding value for money across Southeast Asia.' },
        { icon: Plane, title: 'Short Flights', desc: 'Direct, quick flights from major Indian hubs.' },
        { icon: Star, title: 'Cultural Familiarity', desc: 'Similar values, incredible hospitality, and amazing food.' },
    ],

    bestTime: [
        { month: 'Jan', weather: 'Dry', score: 5 },
        { month: 'Feb', weather: 'Dry', score: 5 },
        { month: 'Mar', weather: 'Spring', score: 4 },
        { month: 'Apr', weather: 'Hot', score: 3 },
        { month: 'May', weather: 'Transition', score: 3 },
        { month: 'Jun', weather: 'Rainy', score: 2 },
        { month: 'Jul', weather: 'Rainy', score: 2 },
        { month: 'Aug', weather: 'Rainy', score: 2 },
        { month: 'Sep', weather: 'Transition', score: 3 },
        { month: 'Oct', weather: 'Good', score: 4 },
        { month: 'Nov', weather: 'Best', score: 5 },
        { month: 'Dec', weather: 'Best', score: 5 },
    ],

    topCountries: [
        { name: 'Indonesia', category: 'Nature', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80', slug: 'indonesia' },
        { name: 'Thailand', category: 'Cultural', image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=600&q=80', slug: 'thailand' },
        { name: 'Maldives', category: 'Beaches', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=80', slug: 'maldives' },
        { name: 'Singapore', category: 'City', image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&q=80', slug: 'singapore' },
        { name: 'Vietnam', category: 'Cultural', image: 'https://images.unsplash.com/photo-1528127269322-53981cb2442c?w=600&q=80', slug: 'vietnam' },
        { name: 'Japan', category: 'Discovery', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80', slug: 'japan' },
    ],`;
    
const dataRegex = /const mockContinentData = \{[\s\S]*?topCountries: \[[\s\S]*?\],/m;
content = content.replace(/const mockContinentData = \{[\s\S]*?attractions: \[[\s\S]*?\],/m, mockDataStart);

fs.writeFileSync(filePath, content);
console.log('Refactor complete');
