export const navStructure = [
  {
    label: 'Holidays',
    type: 'mega',
    tabs: [
      {
        id: 'international',
        label: 'International Holidays',
        columns: [
          {
            heading: 'Asia',
            destinations: ['Singapore', 'Vietnam', 'Bhutan', 'South Korea', 'Maldives', 'China', 'Hong Kong', 'Malaysia', 'Thailand', 'Japan', 'Indonesia', 'Cambodia', 'Nepal', 'Sri Lanka', 'Armenia', 'Philippines', 'Uzbekistan', 'Azerbaijan', 'Georgia', 'Russia'],
          },
          {
            heading: 'Europe',
            destinations: ['Switzerland', 'UK', 'Denmark', 'France', 'Norway', 'Germany', 'Austria', 'Belgium', 'Italy', 'Czech', 'Finland', 'Greece', 'Spain', 'Croatia', 'Ireland', 'Netherlands', 'Bulgaria', 'Hungary', 'Iceland', 'Romania', 'Portugal', 'Sweden', 'Greenland'],
          },
          {
            heading: 'Middle East',
            destinations: ['UAE (Dubai)', 'Jordan', 'Qatar', 'Egypt', 'Israel', 'Oman', 'Turkey', 'Bahrain'],
          },
          {
            heading: 'Africa',
            destinations: ['Mauritius', 'Tanzania', 'Morocco', 'Kenya', 'South Africa', 'Zimbabwe', 'Seychelles'],
          },
          {
            heading: 'America',
            destinations: ['USA', 'Canada', 'Alaska', 'South America', 'Central America'],
          },
          {
            heading: 'Australia & Pacific',
            destinations: ['Australia', 'New Zealand', 'Fiji'],
          },
        ],
        promoImage: {
          src: 'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=400&q=80',
          label: 'International Tour Packages',
          sub: 'Best Price • Trusted Agency',
          cta: 'View All International',
          href: '/packages?type=international',
        },
      },
      {
        id: 'india',
        label: 'India Holidays',
        columns: [
          {
            heading: 'South India',
            destinations: ['Kerala', 'Goa', 'Tamil Nadu', 'Karnataka', 'Andaman & Nicobar', 'Lakshadweep'],
          },
          {
            heading: 'North India',
            destinations: ['Rajasthan', 'Himachal Pradesh', 'Uttarakhand', 'Jammu & Kashmir', 'Delhi', 'Agra'],
          },
          {
            heading: 'East India',
            destinations: ['Darjeeling', 'Sikkim', 'Odisha', 'West Bengal'],
          },
          {
            heading: 'West India',
            destinations: ['Mumbai', 'Gujarat', 'Diu & Daman'],
          },
          {
            heading: 'North East',
            destinations: ['Assam', 'Meghalaya', 'Arunachal Pradesh', 'Manipur', 'Nagaland', 'Mizoram'],
          },
        ],
        promoImage: {
          src: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&q=80',
          label: 'Incredible India',
          sub: 'Explore your own backyard',
          cta: 'View All India Tours',
          href: '/packages?type=india',
        },
      },
    ],
  },
  {
    label: 'Destinations',
    type: 'link',
    href: '/destinations',
  },
  {
    label: 'Services',
    type: 'dropdown',
    items: [
      { label: 'All Services', href: '/services' },
      { label: 'Flight Booking', href: '/services/flight-booking' },
      { label: 'Hotel Reservations', href: '/services/hotel-reservation' },
      { label: 'Forex & Currency', href: '/services/forex' },
      { label: 'Travel Insurance', href: '/services/travel-insurance' },
      { label: 'Visa Assistance', href: '/visa' },
      { label: 'Cruise Booking', href: '/services/cruise-booking' },
      { label: 'Group Travel', href: '/services/group-travel' },
      { label: 'Holiday Customisation', href: '/services/holiday-customisation' },
    ],
  },
  {
    label: 'Visa',
    type: 'link',
    href: '/visa',
  },
  {
    label: 'Guide',
    type: 'dropdown',
    items: [
      { label: 'Travel Tips', href: '/guide/travel-tips' },
      { label: 'Blogs', href: '/guide/blogs' },
      { label: 'Visa Guide', href: '/guide/visa-guide' },
    ],
  },
  {
    label: 'Company',
    type: 'dropdown',
    items: [
      { label: 'About Us', href: '/about' },
      { label: 'Testimonials', href: '/testimonials' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Contact', href: '/contact' },
      { label: 'Pay Online', href: '/payment' },
    ],
  },
];
