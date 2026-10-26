/**
 * Homepage featured destinations carousel.
 * CMS/admin: set `media` to image or short cinematic video per destination.
 */

export type DestinationMedia =
    | { type: 'image'; src: string; hoverSrc?: string }
    | { type: 'video'; src: string; poster: string };

export type FeaturedDestination = {
    id: number;
    name: string;
    startsFrom: string;
    media: DestinationMedia;
    type: 'india' | 'international';
    href: string;
};

export const featuredDestinations: FeaturedDestination[] = [
    {
        id: 1,
        name: 'Ladakh',
        startsFrom: 'INR 15,800/-',
        media: {
            type: 'image',
            src: 'https://images.unsplash.com/photo-1593181629936-11c609b8db9b?auto=format&fit=crop&q=85&w=1200',
            hoverSrc: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=85&w=1200',
        },
        type: 'india',
        href: '/packages?destination=ladakh',
    },
    {
        id: 2,
        name: 'Sri Lanka',
        startsFrom: 'INR 59,999/-',
        media: {
            type: 'image',
            src: 'https://images.unsplash.com/photo-1586500036706-41963de24d8b?auto=format&fit=crop&q=85&w=1200',
            hoverSrc: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=85&w=1200',
        },
        type: 'india',
        href: '/packages?destination=sri-lanka',
    },
    {
        id: 3,
        name: 'Kashmir',
        startsFrom: 'INR 24,499/-',
        media: {
            type: 'image',
            src: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&q=85&w=1200',
            hoverSrc: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=85&w=1200',
        },
        type: 'india',
        href: '/packages?destination=kashmir',
    },
    {
        id: 4,
        name: 'Bhutan',
        startsFrom: 'INR 45,999/-',
        media: {
            type: 'image',
            src: 'https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?auto=format&fit=crop&q=85&w=1200',
            hoverSrc: 'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&q=85&w=1200',
        },
        type: 'international',
        href: '/packages?destination=bhutan',
    },
    {
        id: 5,
        name: 'Himachal Pradesh',
        startsFrom: 'INR 7,499/-',
        media: {
            type: 'image',
            src: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=85&w=1200',
            hoverSrc: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&q=85&w=1200',
        },
        type: 'india',
        href: '/packages?destination=himachal-pradesh',
    },
    {
        id: 6,
        name: 'Sikkim',
        startsFrom: 'INR 21,499/-',
        media: {
            type: 'image',
            src: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1200',
            hoverSrc: 'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&q=85&w=1200',
        },
        type: 'india',
        href: '/packages?destination=sikkim',
    },
    {
        id: 7,
        name: 'Maldives',
        startsFrom: 'INR 1,45,000/-',
        media: {
            type: 'image',
            src: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&q=85&w=1200',
        },
        type: 'international',
        href: '/packages?destination=maldives',
    },
    {
        id: 8,
        name: 'Dubai',
        startsFrom: 'INR 44,999/-',
        media: {
            type: 'video',
            src: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-at-night-11-small.mp4',
            poster: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=85&w=1200',
        },
        type: 'international',
        href: '/packages?destination=dubai',
    },
    {
        id: 9,
        name: 'Switzerland',
        startsFrom: 'INR 1,69,999/-',
        media: {
            type: 'image',
            src: 'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?auto=format&fit=crop&q=85&w=1200',
            hoverSrc: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&q=85&w=1200',
        },
        type: 'international',
        href: '/packages?destination=switzerland',
    },
    {
        id: 10,
        name: 'Thailand',
        startsFrom: 'INR 49,999/-',
        media: {
            type: 'image',
            src: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&q=85&w=1200',
            hoverSrc: 'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&q=85&w=1200',
        },
        type: 'international',
        href: '/packages?destination=thailand',
    },
    {
        id: 11,
        name: 'Goa',
        startsFrom: 'INR 8,999/-',
        media: {
            type: 'image',
            src: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=85&w=1200',
            hoverSrc: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=85&w=1200',
        },
        type: 'india',
        href: '/packages?destination=goa',
    },
    {
        id: 12,
        name: 'Kerala',
        startsFrom: 'INR 14,000/-',
        media: {
            type: 'image',
            src: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=85&w=1200',
            hoverSrc: 'https://images.unsplash.com/photo-1593693411515-c20261bcad6e?auto=format&fit=crop&q=85&w=1200',
        },
        type: 'india',
        href: '/packages?destination=kerala',
    },
    {
        id: 13,
        name: 'Rajasthan',
        startsFrom: 'INR 15,999/-',
        media: {
            type: 'image',
            src: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&q=85&w=1200',
            hoverSrc: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=85&w=1200',
        },
        type: 'india',
        href: '/packages?destination=rajasthan',
    },
    {
        id: 14,
        name: 'Andaman',
        startsFrom: 'INR 29,999/-',
        media: {
            type: 'image',
            src: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&q=85&w=1200',
            hoverSrc: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=85&w=1200',
        },
        type: 'india',
        href: '/packages?destination=andaman',
    },
    {
        id: 15,
        name: 'Uttarakhand',
        startsFrom: 'INR 5,499/-',
        media: {
            type: 'image',
            src: 'https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=1200',
            hoverSrc: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=85&w=1200',
        },
        type: 'india',
        href: '/packages?destination=uttarakhand',
    },
    {
        id: 16,
        name: 'Meghalaya',
        startsFrom: 'INR 21,499/-',
        media: {
            type: 'image',
            src: 'https://images.pexels.com/photos/355241/pexels-photo-355241.jpeg?auto=compress&cs=tinysrgb&w=1200',
            hoverSrc: 'https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?auto=format&fit=crop&q=85&w=1200',
        },
        type: 'india',
        href: '/packages?destination=meghalaya',
    },
    {
        id: 17,
        name: 'Tamil Nadu',
        startsFrom: 'INR 12,999/-',
        media: {
            type: 'image',
            src: 'https://images.unsplash.com/photo-1593693411515-c20261bcad6e?auto=format&fit=crop&q=85&w=1200',
            hoverSrc: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=85&w=1200',
        },
        type: 'india',
        href: '/packages?destination=tamil-nadu',
    },
    {
        id: 18,
        name: 'Karnataka',
        startsFrom: 'INR 11,999/-',
        media: {
            type: 'image',
            src: 'https://images.pexels.com/photos/21014/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1200',
            hoverSrc: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=85&w=1200',
        },
        type: 'india',
        href: '/packages?destination=karnataka',
    },
    {
        id: 19,
        name: 'Arunachal Pradesh',
        startsFrom: 'INR 32,999/-',
        media: {
            type: 'image',
            src: 'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=1200',
            hoverSrc: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&q=85&w=1200',
        },
        type: 'india',
        href: '/packages?destination=arunachal-pradesh',
    },
    {
        id: 20,
        name: 'Odisha',
        startsFrom: 'INR 10,999/-',
        media: {
            type: 'image',
            src: 'https://images.pexels.com/photos/534164/pexels-photo-534164.jpeg?auto=compress&cs=tinysrgb&w=1200',
            hoverSrc: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&q=85&w=1200',
        },
        type: 'india',
        href: '/packages?destination=odisha',
    },
    {
        id: 21,
        name: 'Vietnam',
        startsFrom: 'INR 34,999/-',
        media: {
            type: 'image',
            src: 'https://images.pexels.com/photos/2166711/pexels-photo-2166711.jpeg?auto=compress&cs=tinysrgb&w=1200',
            hoverSrc: 'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&q=85&w=1200',
        },
        type: 'international',
        href: '/packages?destination=vietnam',
    },
    {
        id: 22,
        name: 'Japan',
        startsFrom: 'INR 94,999/-',
        media: {
            type: 'image',
            src: 'https://images.unsplash.com/photo-1492571350019-22de08371fd3?auto=format&fit=crop&q=85&w=1200',
            hoverSrc: 'https://images.unsplash.com/photo-1480796927426-f609979314bd?auto=format&fit=crop&q=85&w=1200',
        },
        type: 'international',
        href: '/packages?destination=japan',
    },
    {
        id: 23,
        name: 'Singapore',
        startsFrom: 'INR 44,999/-',
        media: {
            type: 'image',
            src: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&q=85&w=1200',
            hoverSrc: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?auto=format&fit=crop&q=85&w=1200',
        },
        type: 'international',
        href: '/packages?destination=singapore',
    },
    {
        id: 24,
        name: 'Bali',
        startsFrom: 'INR 42,999/-',
        media: {
            type: 'image',
            src: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=85&w=1200',
            hoverSrc: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&q=85&w=1200',
        },
        type: 'international',
        href: '/packages?destination=bali',
    },
    {
        id: 25,
        name: 'Turkey',
        startsFrom: 'INR 1,09,990/-',
        media: {
            type: 'image',
            src: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&q=85&w=1200',
            hoverSrc: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&q=85&w=1200',
        },
        type: 'international',
        href: '/packages?destination=turkey',
    },
    {
        id: 26,
        name: 'France',
        startsFrom: 'INR 1,59,999/-',
        media: {
            type: 'image',
            src: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=85&w=1200',
            hoverSrc: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=85&w=1200',
        },
        type: 'international',
        href: '/packages?destination=france',
    },
    {
        id: 27,
        name: 'Italy',
        startsFrom: 'INR 1,49,990/-',
        media: {
            type: 'image',
            src: 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&q=85&w=1200',
            hoverSrc: 'https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&q=85&w=1200',
        },
        type: 'international',
        href: '/packages?destination=italy',
    },
    {
        id: 28,
        name: 'Norway',
        startsFrom: 'INR 1,79,999/-',
        media: {
            type: 'image',
            src: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=85&w=1200',
            hoverSrc: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&q=85&w=1200',
        },
        type: 'international',
        href: '/packages?destination=norway',
    },
    {
        id: 29,
        name: 'South Korea',
        startsFrom: 'INR 89,999/-',
        media: {
            type: 'image',
            src: 'https://images.pexels.com/photos/237211/pexels-photo-237211.jpeg?auto=compress&cs=tinysrgb&w=1200',
            hoverSrc: 'https://images.unsplash.com/photo-1492571350019-22de08371fd3?auto=format&fit=crop&q=85&w=1200',
        },
        type: 'international',
        href: '/packages?destination=south-korea',
    },
    {
        id: 30,
        name: 'Mauritius',
        startsFrom: 'INR 1,21,999/-',
        media: {
            type: 'image',
            src: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=1200',
            hoverSrc: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=85&w=1200',
        },
        type: 'international',
        href: '/packages?destination=mauritius',
    },
    {
        id: 31,
        name: 'Canada',
        startsFrom: 'INR 1,35,000/-',
        media: {
            type: 'image',
            src: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&q=85&w=1200',
            hoverSrc: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&q=85&w=1200',
        },
        type: 'international',
        href: '/packages?destination=canada',
    },
    {
        id: 32,
        name: 'Australia',
        startsFrom: 'INR 1,29,990/-',
        media: {
            type: 'image',
            src: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&q=85&w=1200',
            hoverSrc: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=85&w=1200',
        },
        type: 'international',
        href: '/packages?destination=australia',
    },
];
