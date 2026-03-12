import { useState } from 'react';
import { Search, Filter, FileCheck, CreditCard, Send, CheckCircle, ChevronRight, Sparkles } from 'lucide-react';
import Dropdown from '../components/common/Dropdown';
import { motion } from 'framer-motion';

const visaCountries = [
    { id: 1, name: 'Dubai (UAE)', slug: 'dubai', type: 'E-Visa', processingTime: '2-3 Days', price: 95, flag: '🇦🇪', popular: true },
    { id: 2, name: 'Singapore', slug: 'singapore', type: 'E-Visa', processingTime: '3-5 Days', price: 45, flag: '🇸🇬', popular: true },
    { id: 3, name: 'Schengen Area', slug: 'schengen', type: 'Sticker Visa', processingTime: '15-20 Days', price: 120, flag: '🇪🇺', popular: true },
    { id: 4, name: 'Thailand', slug: 'thailand', type: 'Visa on Arrival / E-Visa', processingTime: '1-2 Days', price: 60, flag: '🇹🇭', popular: false },
    { id: 5, name: 'United Kingdom', slug: 'uk', type: 'Sticker Visa', processingTime: '15-21 Days', price: 150, flag: '🇬🇧', popular: true },
    { id: 6, name: 'Malaysia', slug: 'malaysia', type: 'E-Visa', processingTime: '3-4 Days', price: 40, flag: '🇲🇾', popular: false },
    { id: 7, name: 'Australia', slug: 'australia', type: 'E-Visa', processingTime: '10-15 Days', price: 135, flag: '🇦🇺', popular: false },
    { id: 8, name: 'United States', slug: 'usa', type: 'Sticker Visa', processingTime: 'Varies', price: 160, flag: '🇺🇸', popular: true },
];

const steps = [
    { icon: FileCheck, label: 'Submit' },
    { icon: CreditCard, label: 'Pay' },
    { icon: Send, label: 'We Process' },
    { icon: CheckCircle, label: 'Get Visa' },
];

export default function Visa() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCountry, setFilterCountry] = useState('all');
    const [filterType, setFilterType] = useState('all');

    const filtered = visaCountries.filter((vc) => {
        const matchSearch = !searchTerm || vc.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchCountry = filterCountry === 'all' || vc.slug === filterCountry;
        const matchType = filterType === 'all' ||
            (filterType === 'e-visa' && vc.type.includes('E-Visa')) ||
            (filterType === 'sticker' && vc.type.includes('Sticker')) ||
            (filterType === 'voa' && vc.type.includes('Arrival'));
        return matchSearch && matchCountry && matchType;
    });

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero */}
            <div className="bg-slate-900 pt-32 pb-20 px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=2000')" }} />
                <div className="absolute inset-0 bg-slate-900/85" />
                <div className="content-container text-center relative z-10">
                    <span className="inline-flex items-center gap-2 text-secondary font-bold text-sm uppercase tracking-wider mb-4">
                        <Sparkles className="w-4 h-4" /> 50+ Countries
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 font-sans tracking-tight">Visa Made Simple</h1>
                    <p className="text-slate-300 text-lg max-w-xl mx-auto mb-8">
                        Expert assistance for Tourist, Business & Transit visas. Fast, secure, hassle-free.
                    </p>
                    <div className="max-w-xl mx-auto relative">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 z-10" />
                        <input
                            type="text"
                            placeholder="Search country..."
                            className="w-full pl-14 pr-5 py-4 rounded-2xl border-0 bg-white/10 backdrop-blur-sm text-white placeholder-slate-400 focus:ring-2 focus:ring-primary focus:bg-white/15 transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* How It Works - Compact horizontal strip */}
            <div className="relative -mt-8 z-20">
                <div className="content-container">
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 md:p-8"
                    >
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
                            {steps.map((s, i) => {
                                const Icon = s.icon;
                                return (
                                    <div key={i} className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                            <Icon className="w-6 h-6" strokeWidth={2} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <span className="text-xs text-slate-500 font-medium block">Step {i + 1}</span>
                                            <span className="font-bold text-slate-900">{s.label}</span>
                                        </div>
                                        {i < steps.length - 1 && (
                                            <ChevronRight className="hidden md:block w-5 h-5 text-slate-200 shrink-0" />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Main content */}
            <div className="content-container py-16">
                {/* Filters bar */}
                <div className="flex flex-col sm:flex-row gap-4 mb-10 items-start sm:items-center justify-between">
                    <div className="flex flex-wrap items-center gap-3">
                        <Filter className="w-5 h-5 text-slate-500 shrink-0" />
                        <Dropdown
                            options={[
                                { value: 'all', label: 'All Countries' },
                                ...visaCountries.map((v) => ({ value: v.slug, label: v.name })),
                            ]}
                            value={filterCountry}
                            onChange={setFilterCountry}
                            size="md"
                            className="min-w-[160px]"
                        />
                        <Dropdown
                            options={[
                                { value: 'all', label: 'All Types' },
                                { value: 'e-visa', label: 'E-Visa' },
                                { value: 'sticker', label: 'Sticker Visa' },
                                { value: 'voa', label: 'Visa on Arrival' },
                            ]}
                            value={filterType}
                            onChange={setFilterType}
                            size="md"
                            className="min-w-[160px]"
                        />
                    </div>
                    <p className="text-slate-500 text-sm">{filtered.length} destinations</p>
                </div>

                {/* Visa cards - unique grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {filtered.map((vc, i) => (
                        <motion.a
                            key={vc.id}
                            href={`/visa/${vc.slug}`}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="group relative bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 hover:border-primary/20 transition-all duration-300"
                        >
                            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-primary/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <span className="text-4xl w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:scale-105 transition-transform">
                                        {vc.flag}
                                    </span>
                                    {vc.popular && (
                                        <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                                            Popular
                                        </span>
                                    )}
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-primary transition-colors">{vc.name}</h3>
                                <p className="text-sm text-primary font-medium mb-4">{vc.type}</p>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-slate-500">{vc.processingTime}</span>
                                    <span className="font-bold text-slate-900">${vc.price}</span>
                                </div>
                                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                                    <span className="text-primary font-semibold text-sm">Apply Now</span>
                                    <ChevronRight className="w-4 h-4 text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </div>

                {/* CTA strip */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-20 bg-gradient-to-r from-primary to-primary/90 rounded-3xl p-8 md:p-12 text-center text-white"
                >
                    <h3 className="text-2xl md:text-3xl font-bold mb-2 text-white">Need Expert Assistance?</h3>
                    <p className="text-white/80 mb-6 max-w-xl mx-auto">Our visa consultants are available 24/7 to guide you through the process.</p>
                    <a href="/contact" className="inline-flex items-center gap-2 bg-white text-primary font-bold px-8 py-4 rounded-xl hover:bg-slate-50 transition-colors">
                        Talk to an Expert
                        <ChevronRight className="w-5 h-5" />
                    </a>
                </motion.div>
            </div>
        </div>
    );
}
