export interface CruisePackage {
    id: string;
    name: string;
    image: string;
    videoUrl?: string;
    duration: string;
    departureLocation: string;
    startingPrice: number;
    category: 'International' | 'India';
    featured: boolean;
    destination: string;
    overview: string;
    highlights: string[];
    itinerary: { day: string; title: string; desc: string; attractions?: string[]; images?: string[] }[];
    inclusions: string[];
    exclusions: string[];
    experience: { title: string; desc: string }[];
    accommodation?: {
        title: string;
        desc: string;
        cabins: { name: string; desc: string; image: string }[];
    };
    gallery: string[];
    faqs: { question: string; answer: string }[];
}

export const cruisePackages: CruisePackage[] = [
    {
        id: 'singapore-malaysia-cruise',
        name: 'Singapore & Malaysia Getaway',
        image: 'https://images.unsplash.com/photo-1599640842225-85d111c60e6b?q=80&w=1000&auto=format&fit=crop',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-cruise-ship-sailing-in-the-ocean-4364-small.mp4',
        duration: '3 Nights / 4 Days',
        departureLocation: 'Singapore',
        startingPrice: 35000,
        category: 'International',
        featured: true,
        destination: 'Singapore, Malaysia',
        overview: 'Experience the ultimate luxury aboard our premier cruise liner travelling from Singapore to Malaysia. Enjoy world-class dining, spectacular entertainment, and breathtaking ocean views. Perfect for families and couples looking for a quick, luxurious escape.',
        highlights: [
            'All meals included (Breakfast, Lunch, Dinner)',
            'Broadway-style entertainment shows',
            'Access to swimming pools and fitness center',
            'Luxurious ocean-view accommodation'
        ],
        itinerary: [
            { day: 'Day 1', title: 'Embarkation in Singapore', desc: 'Board the cruise in Singapore. Enjoy a welcome dinner and live entertainment as we set sail.', attractions: ['Welcome Dinner', 'Live Entertainment', 'Pool Deck Party'], images: ['https://images.unsplash.com/photo-1548574505-5e239809ee19?q=80&w=800'] },
            { day: 'Day 2', title: 'Kuala Lumpur (Port Klang)', desc: 'Arrive at Port Klang. Optional shore excursions to explore Kuala Lumpur. Evening themed party on board.', attractions: ['Port Klang', 'Batu Caves', 'Themed Party'], images: ['https://images.unsplash.com/photo-1596422846543-75c6fc197f0a?q=80&w=800'] },
            { day: 'Day 3', title: 'Cruising the Malacca Strait', desc: 'A full day at sea. Enjoy the ship\'s amenities, spa treatments, and water park.', attractions: ['Spa Treatments', 'Water Park', 'Broadway Show'], images: ['https://images.unsplash.com/photo-1582236166827-0db7218671c6?q=80&w=800'] },
            { day: 'Day 4', title: 'Disembarkation in Singapore', desc: 'Arrive back in Singapore in the morning. Disembark after breakfast.', attractions: ['Farewell Breakfast', 'Marina Bay Sands'], images: ['https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=800'] }
        ],
        inclusions: [
            'Accommodation in selected cabin category',
            'All meals at complimentary dining venues',
            'Use of swimming pools and hot tubs',
            'Nightly entertainment and stage shows'
        ],
        exclusions: [
            'Flights and airport transfers',
            'Shore excursions',
            'Specialty dining and alcoholic beverages',
            'Spa treatments and personal expenses'
        ],
        experience: [
            { title: 'Fine Dining', desc: 'Savor culinary masterpieces crafted by world-renowned chefs in our elegant dining rooms.' },
            { title: 'Family Fun', desc: 'Dedicated kids clubs, water slides, and family-friendly activities.' },
            { title: 'Entertainment', desc: 'Dazzling performances, live bands, and comedy clubs every evening.' }
        ],
        accommodation: {
            title: "Luxurious Cabins & Suites",
            desc: "Choose from a range of beautifully appointed cabins designed for your ultimate comfort at sea.",
            cabins: [
                {
                    name: "Interior Stateroom",
                    desc: "Cozy and comfortable with modern amenities, perfect for budget-conscious travelers.",
                    image: "https://images.unsplash.com/photo-1590490359683-658d3d23f972?q=80&w=800"
                },
                {
                    name: "Oceanview Cabin",
                    desc: "Wake up to stunning views of the sea right from your personal window.",
                    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=800"
                },
                {
                    name: "Balcony Suite",
                    desc: "Enjoy the fresh ocean breeze from your private balcony with spacious seating.",
                    image: "https://images.unsplash.com/photo-1560662105-57f8ad6ae2d1?q=80&w=800"
                }
            ]
        },
        gallery: [
            'https://images.unsplash.com/photo-1505832018823-50331d70d237?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1572911516047-9f75ecfb523f?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1569974512965-f481c96dd9b6?q=80&w=800&auto=format&fit=crop'
        ],
        faqs: [
            { question: 'What is the boarding time?', answer: 'Boarding typically begins 4 hours before departure.' },
            { question: 'Are passports required?', answer: 'Yes, a valid passport with at least 6 months validity is required for international cruises.' }
        ]
    },
    {
        id: 'mumbai-goa-cruise',
        name: 'Mumbai to Goa Coastal Escape',
        image: 'https://images.unsplash.com/photo-1505832018823-50331d70d237?q=80&w=1000&auto=format&fit=crop',
        duration: '2 Nights / 3 Days',
        departureLocation: 'Mumbai',
        startingPrice: 18000,
        category: 'India',
        featured: true,
        destination: 'Goa',
        overview: 'Sail along the beautiful Konkan coast from Mumbai to Goa. This short getaway is packed with fun, music, and delicious Indian and international cuisine.',
        highlights: [
            'All meals included',
            'DJ nights and Bollywood parties',
            'Ocean-facing lounges',
            'Comfortable staterooms'
        ],
        itinerary: [
            { day: 'Day 1', title: 'Embark in Mumbai', desc: 'Board the cruise at Mumbai port. Enjoy the sail-away party and dinner.' },
            { day: 'Day 2', title: 'At Sea', desc: 'Enjoy various activities on board, pool games, and a grand evening gala.' },
            { day: 'Day 3', title: 'Arrive in Goa', desc: 'Arrive in Goa in the morning. Disembark after breakfast.' }
        ],
        inclusions: [
            'Cabin accommodation',
            'Meals at designated restaurants',
            'Access to standard entertainment',
            'Port taxes'
        ],
        exclusions: [
            'Onboard Wi-Fi',
            'Alcoholic drinks',
            'Spa services'
        ],
        experience: [
            { title: 'Party Atmosphere', desc: 'Non-stop music and parties by the pool.' },
            { title: 'Culinary Delights', desc: 'A wide spread of Indian and continental buffet.' }
        ],
        gallery: [
            'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1621501103258-3e135c8c1875?q=80&w=800&auto=format&fit=crop'
        ],
        faqs: [
            { question: 'Is it suitable for kids?', answer: 'Yes, there are designated kids areas and activities.' }
        ]
    },
    {
        id: 'mediterranean-magic',
        name: 'Mediterranean Magic',
        image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1000&auto=format&fit=crop',
        duration: '7 Nights / 8 Days',
        departureLocation: 'Barcelona',
        startingPrice: 85000,
        category: 'International',
        featured: false,
        destination: 'Spain, Italy, France',
        overview: 'Discover the charm of the Mediterranean. Visit historic ports in Spain, Italy, and France while enjoying unparalleled luxury on our mega-ship.',
        highlights: [
            'Visit 3 countries in 8 days',
            'Premium dining options',
            'Award-winning spa',
            'Broadway-caliber shows'
        ],
        itinerary: [
            { day: 'Day 1', title: 'Barcelona, Spain', desc: 'Board the ship in the afternoon and set sail.' },
            { day: 'Day 2', title: 'Marseille, France', desc: 'Explore the historic port city of Marseille.' },
            { day: 'Day 3', title: 'Genoa, Italy', desc: 'Wander through the narrow streets of Genoa.' },
            { day: 'Day 4', title: 'Naples, Italy', desc: 'Visit the ruins of Pompeii or enjoy authentic Neapolitan pizza.' },
            { day: 'Day 5', title: 'At Sea', desc: 'A day to relax and enjoy the ship\'s amenities.' },
            { day: 'Day 6', title: 'Palma de Mallorca', desc: 'Beautiful beaches and historic architecture.' },
            { day: 'Day 7', title: 'At Sea', desc: 'Final night gala dinner.' },
            { day: 'Day 8', title: 'Barcelona', desc: 'Disembarkation.' }
        ],
        inclusions: [
            'Accommodation',
            'All meals',
            'Port charges',
            'Basic beverages'
        ],
        exclusions: [
            'Flights',
            'Visa fees',
            'Shore excursions'
        ],
        experience: [
            { title: 'Cultural Immersion', desc: 'Wake up in a new historic city almost every day.' },
            { title: 'Luxury Spa', desc: 'Rejuvenate with world-class thermal suites and treatments.' }
        ],
        gallery: [
            'https://images.unsplash.com/photo-1569974512965-f481c96dd9b6?q=80&w=800&auto=format&fit=crop'
        ],
        faqs: [
            { question: 'Do I need a Schengen visa?', answer: 'Yes, a multiple-entry Schengen visa is required.' }
        ]
    }
];
