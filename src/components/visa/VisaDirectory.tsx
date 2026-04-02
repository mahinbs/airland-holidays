import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { CountryCard } from './CountryCard';
import type { CountryVisa } from '../../data/visaData';

interface VisaDirectoryProps {
    countries: CountryVisa[];
}

export const VisaDirectory = ({ countries }: VisaDirectoryProps) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    const filtered = countries.filter((vc) => {
        const matchSearch = !searchTerm || vc.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchStatus = filterStatus === 'all' || vc.visaStatus === filterStatus;
        return matchSearch && matchStatus;
    });

    return (
        <div id="all-countries" className="py-24 bg-slate-50 scroll-mt-20">
            <div className="content-container">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Find Your Visa</h2>
                    <p className="text-slate-600 text-lg">Search requirements by country</p>
                </div>

                {/* Filter Bar */}
                <div className="bg-white rounded-3xl p-4 md:p-6 shadow-lg shadow-slate-200/50 flex flex-col md:flex-row gap-4 mb-12">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
                        <input
                            type="text"
                            placeholder="Search by destination..."
                            className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <Filter className="w-5 h-5 text-slate-400 hidden sm:block" />
                        <select
                            className="py-3.5 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:border-primary focus:ring-1 focus:ring-primary outline-none min-w-[200px]"
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                        >
                            <option value="all">All Visa Types</option>
                            <option value="required">Visa Required</option>
                            <option value="on-arrival">Visa on Arrival</option>
                            <option value="free">Visa Free</option>
                        </select>
                    </div>
                </div>

                {/* All Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <AnimatePresence>
                        {filtered.map((country, idx) => (
                            <CountryCard key={country.slug} country={country} index={idx} />
                        ))}
                    </AnimatePresence>
                </div>

                {filtered.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-slate-500 text-lg">No countries match your search filters.</p>
                        <button
                            onClick={() => {
                                setSearchTerm('');
                                setFilterStatus('all');
                            }}
                            className="mt-4 text-primary font-bold hover:underline"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
