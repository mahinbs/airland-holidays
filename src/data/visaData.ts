import { CreditCard, FileCheck, ShieldCheck, CheckCircle, Clock, Award, Users } from 'lucide-react';

export interface CountryVisa {
    slug: string;
    name: string;
    image: string;
    flag: string;
    price: number;
    highlightText?: string;
    visaStatus: 'required' | 'free' | 'on-arrival';
    featured: boolean;
}

export const visaCountries: CountryVisa[] = [
    { slug: 'usa', name: 'United States', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=800', flag: '🇺🇸', price: 160, visaStatus: 'required', featured: true, highlightText: '10 Year Validity' },
    { slug: 'uk', name: 'United Kingdom', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=800', flag: '🇬🇧', price: 150, visaStatus: 'required', featured: true, highlightText: 'Standard Visitor' },
    { slug: 'france', name: 'France', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=800', flag: '🇫🇷', price: 120, visaStatus: 'required', featured: true, highlightText: 'Schengen Area' },
    { slug: 'switzerland', name: 'Switzerland', image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&q=80&w=800', flag: '🇨🇭', price: 120, visaStatus: 'required', featured: true, highlightText: 'Alpine Beauty' },
    { slug: 'japan', name: 'Japan', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800', flag: '🇯🇵', price: 40, visaStatus: 'required', featured: true, highlightText: 'Quick Process' },
    { slug: 'china', name: 'China', image: 'https://images.unsplash.com/photo-1529921879218-f99546d03a9d?auto=format&fit=crop&q=80&w=800', flag: '🇨🇳', price: 140, visaStatus: 'required', featured: true, highlightText: 'Business Visa' },
    { slug: 'dubai', name: 'Dubai (UAE)', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800', flag: '🇦🇪', price: 95, visaStatus: 'on-arrival', featured: false, highlightText: 'Fast Track' },
    { slug: 'singapore', name: 'Singapore', image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&q=80&w=800', flag: '🇸🇬', price: 45, visaStatus: 'required', featured: false, highlightText: 'E-Visa Available' },
    { slug: 'thailand', name: 'Thailand', image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&q=80&w=800', flag: '🇹🇭', price: 60, visaStatus: 'on-arrival', featured: false, highlightText: 'Easy Entry' },
    { slug: 'malaysia', name: 'Malaysia', image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&q=80&w=800', flag: '🇲🇾', price: 40, visaStatus: 'free', featured: false, highlightText: '30 Days Free' },
    { slug: 'australia', name: 'Australia', image: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&q=80&w=800', flag: '🇦🇺', price: 135, visaStatus: 'required', featured: false, highlightText: 'ETA Online' },
];

export const processSteps = [
    { icon: CreditCard, title: 'Pay', desc: 'Secure online payment to start' },
    { icon: FileCheck, title: 'Submit Documents', desc: 'Upload required paperwork securely' },
    { icon: ShieldCheck, title: 'We Evaluate & Process', desc: 'Expert agents handle the details' },
    { icon: CheckCircle, title: 'Get Your Visa', desc: 'Delivered straight to you' },
];

export const stats = [
    { icon: Clock, value: '20+', label: 'Years Experience' },
    { icon: FileCheck, value: '10,000+', label: 'Visas Processed' },
    { icon: Award, value: '99%', label: 'Success Rate' },
    { icon: Users, value: 'End-to-End', label: 'Support' },
];

export const testimonials = [
    { name: 'Sarah Jenkins', role: 'Frequent Traveler', text: 'The sheer efficiency and absolute transparency were outstanding. Got my US tourist visa seamlessly.', rating: 5, avatar: 'https://i.pravatar.cc/150?u=sarah' },
    { name: 'Michael Chen', role: 'Business Director', text: 'Incredible team. Handled our corporate Schengen applications with remarkable speed.', rating: 5, avatar: 'https://i.pravatar.cc/150?u=michael' },
    { name: 'Emma Watson', role: 'Student', text: 'I was worried about my study visa to the UK, but they made the complex process look so easy!', rating: 5, avatar: 'https://i.pravatar.cc/150?u=emma' }
];

export const statusConfig = {
    'required': { bg: 'bg-red-500', text: 'text-white', label: 'Visa Required' },
    'free': { bg: 'bg-emerald-500', text: 'text-white', label: 'Visa Free' },
    'on-arrival': { bg: 'bg-amber-500', text: 'text-white', label: 'Visa on Arrival' }
};
