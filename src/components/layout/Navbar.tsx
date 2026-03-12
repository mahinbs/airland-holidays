import { useLocation, useNavigate } from 'react-router-dom';
import { Search, Menu, X, Phone, ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);
    const location = useLocation();
    const navigate = useNavigate();
    const searchInputRef = useRef<HTMLInputElement>(null);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const q = searchQuery.trim();
        if (q) {
            navigate(`/packages?q=${encodeURIComponent(q)}`);
        } else {
            navigate('/packages');
        }
        setIsSearchOpen(false);
        setSearchQuery('');
        setIsMobileMenuOpen(false);
    };

    useEffect(() => {
        if (isSearchOpen) {
            searchInputRef.current?.focus();
        }
    }, [isSearchOpen]);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsSearchOpen(false);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { 
            name: 'Packages', 
            path: '/packages',
            dropdown: [
                { name: 'Honeymoon', path: '/packages?type=honeymoon' },
                { name: 'Adventure', path: '/packages?type=adventure' },
                { name: 'Family', path: '/packages?type=family' },
                { name: 'Luxury', path: '/packages?type=luxury' },
            ]
        },
        { name: 'Visa', path: '/visa' },
        { name: 'Services', path: '/services' },
        { name: 'Guide', path: '/guide' },
        { name: 'About', path: '/about' },
    ];

    return (
        <nav
            className={clsx(
                'fixed top-0 w-full z-50 transition-all duration-300',
                isScrolled ? 'bg-white shadow-md py-3' : 'bg-white/95 backdrop-blur-sm py-5 shadow-sm'
            )}
        >
            <div className="content-container flex items-center justify-between">
                {/* Logo */}
                <a href="/" className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-primary text-white rounded-lg flex items-center justify-center font-bold text-xl">
                        A
                    </div>
                    <span className="font-sans text-2xl font-bold text-slate-900 tracking-tight">
                        Airland<span className="text-primary">.</span>
                    </span>
                </a>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    <div className="flex items-center gap-6">
                        {navLinks.map((link) => (
                            <div 
                                key={link.name} 
                                className="relative"
                                onMouseEnter={() => setHoveredLink(link.name)}
                                onMouseLeave={() => setHoveredLink(null)}
                            >
                                <a
                                    href={link.path}
                                    className={clsx(
                                        'text-sm  transition-colors hover:text-primary flex items-center gap-1',
                                        location.pathname === link.path ? 'text-primary' : 'text-slate-600'
                                    )}
                                >
                                    {link.name}
                                    {link.dropdown && <ChevronDown className="w-3 h-3" />}
                                </a>

                                {/* Dropdown */}
                                <AnimatePresence>
                                    {link.dropdown && hoveredLink === link.name && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden p-2"
                                        >
                                            {link.dropdown.map((item, index) => (
                                                <motion.div
                                                    key={item.name}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: index * 0.05 }}
                                                >
                                                    <a 
                                                        href={item.path}
                                                        className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-primary rounded-lg transition-colors"
                                                    >
                                                        {item.name}
                                                    </a>
                                                </motion.div>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center gap-4 pl-6 border-l border-slate-200">
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="text-slate-600 hover:text-primary transition-colors"
                            aria-label="Search"
                        >
                            <Search className="w-5 h-5" />
                        </button>
                        <a href="/contact">
                            <motion.button
                                whileHover="hover"
                                className="btn-primary py-2 px-5 text-sm gap-2 relative overflow-hidden flex items-center"
                            >
                                <motion.div
                                    variants={{
                                        hover: { x: "100%" }
                                    }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                    className="absolute inset-0 bg-white/20 -translate-x-full"
                                />
                                <Phone className="w-4 h-4 relative z-10" />
                                <span className="relative z-10">Enquire</span>
                            </motion.button>
                        </a>
                    </div>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-slate-900"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Search Overlay */}
            <AnimatePresence>
                {isSearchOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] bg-slate-900/80 backdrop-blur-sm flex items-start justify-center pt-24 px-4"
                        onClick={() => setIsSearchOpen(false)}
                    >
                        <motion.form
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            onSubmit={handleSearchSubmit}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-2xl"
                        >
                            <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
                                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400" />
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search packages, destinations..."
                                    className="w-full pl-14 pr-24 py-5 text-lg text-slate-900 placeholder-slate-400 focus:outline-none"
                                />
                                <button
                                    type="submit"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 btn-primary py-2.5 px-5 text-sm"
                                >
                                    Search
                                </button>
                            </div>
                            <p className="text-white/80 text-sm mt-3 text-center">Press Enter to search • Packages, Destinations, Visa</p>
                        </motion.form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Navigation */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-lg py-4 px-4 flex flex-col gap-4">
                    {navLinks.map((link) => (
                        <div key={link.name}>
                            <a
                                href={link.path}
                                className={clsx(
                                    'text-base font-medium p-2 rounded-md block',
                                    location.pathname === link.path ? 'bg-slate-50 text-primary' : 'text-slate-600'
                                )}
                                onClick={() => !link.dropdown && setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                            </a>
                            {link.dropdown && (
                                <div className="pl-4 mt-2 space-y-2 border-l-2 border-slate-100 ml-2">
                                    {link.dropdown.map(item => (
                                        <a 
                                            key={item.name}
                                            href={item.path}
                                            className="block text-sm text-slate-500 py-1"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                    <div className="pt-4 border-t border-slate-100 flex gap-4">
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="btn-outline flex-1 py-2 text-sm justify-center gap-2"
                        >
                            <Search className="w-4 h-4" /> Search
                        </button>
                        <a href="/contact" className="btn-primary flex-1 py-2 text-sm justify-center gap-2">
                            <Phone className="w-4 h-4" /> Enquire
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
}
