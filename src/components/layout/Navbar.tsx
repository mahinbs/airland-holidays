import { useLocation, useNavigate } from 'react-router-dom';
import { Search, Menu, X, ChevronDown, Send, ChevronRight, MessageCircle } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import UtilityBar from './UtilityBar';
import { navStructure } from '../../data/navConfig';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    
    // Desktop Nav State
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'international' | 'india'>('international');
    
    // Mobile Accordion State
    const [expandedMobile, setExpandedMobile] = useState<Record<string, boolean>>({});
    
    const location = useLocation();
    const navigate = useNavigate();
    const searchInputRef = useRef<HTMLInputElement>(null);
    const headerRef = useRef<HTMLElement>(null);
    const [headerHeight, setHeaderHeight] = useState(100);

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
            if (e.key === 'Escape') {
                setIsSearchOpen(false);
                setActiveMenu(null);
            }
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

    useEffect(() => {
        const updateHeight = () => {
            if (headerRef.current) {
                setHeaderHeight(headerRef.current.getBoundingClientRect().bottom);
            }
        };
        updateHeight();
        window.addEventListener('scroll', updateHeight);
        window.addEventListener('resize', updateHeight);
        return () => {
            window.removeEventListener('scroll', updateHeight);
            window.removeEventListener('resize', updateHeight);
        };
    }, [isScrolled]);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMobileMenuOpen]);

    const isRouteActive = (item: { href?: string; type: string; items?: { href: string }[] }) => {
        if (item.href && location.pathname === item.href) return true;
        if (item.type === 'dropdown' && item.items?.some((sub) => location.pathname === sub.href)) return true;
        if (item.type === 'mega' && location.pathname.startsWith('/packages')) return true;
        return false;
    };

    const toggleMobile = (id: string) => {
        setExpandedMobile(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <>
        <header ref={headerRef} className="sticky top-0 z-50 w-full flex flex-col transition-all duration-300 shadow-sm" onMouseLeave={() => setActiveMenu(null)}>
            <UtilityBar />
            <nav
                className={clsx(
                    'w-full transition-all duration-300 relative',
                    isScrolled ? 'bg-white shadow-md py-3' : 'bg-white/95 backdrop-blur-sm py-5'
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
                <div className="hidden lg:flex items-center gap-6 xl:gap-8">
                    <LayoutGroup>
                        <div className="flex items-center gap-5 xl:gap-6">
                            {navStructure.map((item) => {
                                const isActive = isRouteActive(item);
                                const isHovered = activeMenu === item.label;

                                return (
                                    <div 
                                        key={item.label} 
                                        className="relative"
                                        onMouseEnter={() => setActiveMenu(item.label)}
                                        onFocus={() => setActiveMenu(item.label)}
                                    >
                                        {item.type === 'link' ? (
                                            <a
                                                href={item.href}
                                                className={clsx(
                                                    'relative py-2 text-[13px] xl:text-[15px] font-bold font-["Marcellus"] transition-colors duration-200 flex items-center gap-1',
                                                    isActive || isHovered ? 'text-primary' : 'text-slate-800 hover:text-primary'
                                                )}
                                            >
                                                {item.label}
                                                {(isActive || isHovered) && (
                                                    <motion.span
                                                        layoutId="navUnderline"
                                                        className="absolute bottom-0 left-0 h-[2px] bg-primary rounded-full w-full"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0 }}
                                                    />
                                                )}
                                            </a>
                                        ) : (
                                            <button
                                                className={clsx(
                                                    'relative py-2 text-[13px] xl:text-[15px] font-bold font-["Marcellus"] transition-colors duration-200 flex items-center gap-1',
                                                    isActive || isHovered ? 'text-primary' : 'text-slate-800 hover:text-primary'
                                                )}
                                            >
                                                {item.label}
                                                <ChevronDown className={clsx("w-3.5 h-3.5 ml-1 transition-transform duration-200", isHovered && "rotate-180")} />
                                                {(isActive || isHovered) && (
                                                    <motion.span
                                                        layoutId="navUnderline"
                                                        className="absolute bottom-0 left-0 h-[2px] bg-primary rounded-full w-full"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0 }}
                                                    />
                                                )}
                                            </button>
                                        )}

                                        {/* Simple Dropdown Panel */}
                                        {item.type === 'dropdown' && (
                                            <AnimatePresence>
                                                {isHovered && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: -6 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -6 }}
                                                        transition={{ duration: 0.15 }}
                                                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white rounded-2xl border border-slate-200/80 shadow-xl shadow-slate-900/10 py-2 min-w-[200px]"
                                                    >
                                                        {item.items?.map((subItem, idx) => (
                                                            <div key={subItem.label}>
                                                                {idx > 0 && <div className="border-t border-slate-100 mt-1 pt-1" />}
                                                                <a 
                                                                    href={subItem.href}
                                                                    className={clsx(
                                                                        "flex items-center gap-3 px-5 py-3 text-sm font-medium transition-all",
                                                                        location.pathname === subItem.href 
                                                                            ? "text-primary bg-primary/5" 
                                                                            : "text-slate-700 hover:text-primary hover:bg-primary/5"
                                                                    )}
                                                                >
                                                                    {subItem.label}
                                                                </a>
                                                            </div>
                                                        ))}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </LayoutGroup>

                    <div className="flex items-center gap-4 pl-6 border-l border-slate-200">
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="text-slate-600 hover:text-primary transition-colors"
                            aria-label="Search"
                        >
                            <Search className="w-5 h-5" />
                        </button>
                        <a
                            href="/contact"
                            className="bg-primary hover:bg-primary/90 text-white font-black text-xs md:text-sm px-5 md:px-6 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 flex items-center gap-2 uppercase tracking-wider"
                        >
                            <Send className="w-3.5 h-3.5" />
                            Enquire Now
                        </a>
                    </div>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="lg:hidden text-slate-900"
                    onClick={() => setIsMobileMenuOpen(true)}
                >
                    <Menu className="w-6 h-6" />
                </button>
            </div>
            </nav>

            {/* Desktop Mega Menu Panel - Rendered always, hidden via CSS */}
            {navStructure.map((item) => {
                if (item.type !== 'mega') return null;
                const isHovered = activeMenu === item.label;
                const activeTabData = item.tabs?.find(t => t.id === activeTab) || item.tabs?.[0];

                return (
                    <div
                        key={`mega-${item.label}`}
                        className={clsx(
                            "fixed left-0 right-0 bg-white shadow-2xl shadow-slate-900/10 border-t border-slate-200/60 transition-all duration-200 min-h-[360px]",
                            isHovered ? "opacity-100 visible translate-y-0" : "opacity-0 invisible pointer-events-none -translate-y-2"
                        )}
                        style={{ top: headerHeight }}
                    >
                        <div className="content-container py-8 flex gap-8 h-full">
                            {/* Left: Tabs + Columns */}
                            <div className="flex-1 flex flex-col">
                                {/* Tab Bar */}
                                <div className="flex gap-1 mb-6 border-b border-slate-100 pb-4">
                                    {item.tabs?.map(tab => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id as 'international' | 'india')}
                                            className={clsx(
                                                "px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer",
                                                activeTab === tab.id 
                                                    ? "bg-primary text-white shadow-md" 
                                                    : "text-slate-500 hover:text-primary hover:bg-primary/5"
                                            )}
                                        >
                                            {tab.label}
                                        </button>
                                    ))}
                                </div>

                                {/* Columns */}
                                <div className="flex-1 relative">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={activeTab}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className={clsx(
                                                "grid gap-6",
                                                activeTab === 'international' ? "grid-cols-3 lg:grid-cols-6" : "grid-cols-3 lg:grid-cols-5"
                                            )}
                                        >
                                            {activeTabData?.columns?.map(col => (
                                                <div key={col.heading}>
                                                    <h4 className="font-['Marcellus'] text-xs text-primary uppercase tracking-widest font-bold mb-3 pb-2 border-b border-primary/20">
                                                        {col.heading}
                                                    </h4>
                                                    <div className="flex flex-col">
                                                        {col.destinations.map(dest => (
                                                            <button
                                                                key={dest}
                                                                onClick={() => {
                                                                    navigate(`/packages?destination=${encodeURIComponent(dest.toLowerCase())}`);
                                                                    setActiveMenu(null);
                                                                }}
                                                                className="text-left block text-sm text-slate-600 hover:text-primary hover:bg-primary/5 rounded-lg px-2 py-1.5 transition-all cursor-pointer -mx-2"
                                                            >
                                                                {dest}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            </div>

                            {/* Right: Promo Image */}
                            <div className="w-[220px] shrink-0 rounded-2xl overflow-hidden border border-slate-100 shadow-md relative h-full min-h-[280px]">
                                <img 
                                    src={activeTabData?.promoImage?.src} 
                                    alt={activeTabData?.promoImage?.label}
                                    loading="lazy"
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-4">
                                    <h4 className="font-['Marcellus'] text-white text-lg font-bold leading-tight">
                                        {activeTabData?.promoImage?.label}
                                    </h4>
                                    <p className="text-white/70 text-xs mt-1 mb-3">
                                        {activeTabData?.promoImage?.sub}
                                    </p>
                                    <button 
                                        onClick={() => {
                                            navigate(activeTabData?.promoImage?.href || '/packages');
                                            setActiveMenu(null);
                                        }}
                                        className="bg-primary text-white text-xs font-bold px-4 py-2 rounded-xl text-center hover:bg-primary/90 transition-colors"
                                    >
                                        {activeTabData?.promoImage?.cta}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </header>

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

        {/* Mobile Full-Screen Accordion Overlay */}
        <AnimatePresence>
            {isMobileMenuOpen && (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-[100] bg-white flex flex-col lg:hidden"
                >
                    {/* Top Bar */}
                    <div className="flex items-center justify-between p-4 border-b border-slate-100">
                        <a href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                            <div className="w-10 h-10 bg-primary text-white rounded-lg flex items-center justify-center font-bold text-xl">
                                A
                            </div>
                            <span className="font-sans text-2xl font-bold text-slate-900 tracking-tight">
                                Airland<span className="text-primary">.</span>
                            </span>
                        </a>
                        <button 
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Body */}
                    <div className="overflow-y-auto flex-1 px-4 py-6">
                        {navStructure.map((item) => (
                            <div key={item.label} className="border-b border-slate-100">
                                {item.type === 'link' ? (
                                    <a 
                                        href={item.href}
                                        className="flex items-center justify-between py-4 font-bold text-slate-900 font-['Marcellus'] text-lg"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {item.label}
                                    </a>
                                ) : (
                                    <>
                                        <button 
                                            onClick={() => toggleMobile(item.label)}
                                            className="w-full flex items-center justify-between py-4 font-bold text-slate-900 font-['Marcellus'] text-lg"
                                        >
                                            {item.label}
                                            <ChevronRight className={clsx("w-5 h-5 text-slate-400 transition-transform", expandedMobile[item.label] && "rotate-90")} />
                                        </button>
                                        
                                        <AnimatePresence initial={false}>
                                            {expandedMobile[item.label] && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="overflow-hidden"
                                                >
                                                    {item.type === 'mega' && item.tabs?.map(tab => (
                                                        <div key={tab.id}>
                                                            <button 
                                                                onClick={() => toggleMobile(`${item.label}-${tab.id}`)}
                                                                className="w-full flex items-center justify-between pl-4 py-3 text-slate-600 text-sm border-b border-slate-50 font-semibold"
                                                            >
                                                                {tab.label}
                                                                <ChevronRight className={clsx("w-4 h-4 text-slate-300 transition-transform", expandedMobile[`${item.label}-${tab.id}`] && "rotate-90")} />
                                                            </button>
                                                            
                                                            <AnimatePresence initial={false}>
                                                                {expandedMobile[`${item.label}-${tab.id}`] && (
                                                                    <motion.div
                                                                        initial={{ height: 0, opacity: 0 }}
                                                                        animate={{ height: 'auto', opacity: 1 }}
                                                                        exit={{ height: 0, opacity: 0 }}
                                                                        className="overflow-hidden"
                                                                    >
                                                                        {tab.columns?.map(col => (
                                                                            <div key={col.heading}>
                                                                                <button 
                                                                                    onClick={() => toggleMobile(`${item.label}-${tab.id}-${col.heading}`)}
                                                                                    className="w-full flex items-center justify-between pl-8 py-3 text-slate-500 text-sm font-medium"
                                                                                >
                                                                                    {col.heading}
                                                                                    <ChevronRight className={clsx("w-3.5 h-3.5 text-slate-200 transition-transform", expandedMobile[`${item.label}-${tab.id}-${col.heading}`] && "rotate-90")} />
                                                                                </button>
                                                                                
                                                                                <AnimatePresence initial={false}>
                                                                                    {expandedMobile[`${item.label}-${tab.id}-${col.heading}`] && (
                                                                                        <motion.div
                                                                                            initial={{ height: 0, opacity: 0 }}
                                                                                            animate={{ height: 'auto', opacity: 1 }}
                                                                                            exit={{ height: 0, opacity: 0 }}
                                                                                            className="overflow-hidden flex flex-col"
                                                                                        >
                                                                                            {col.destinations.map(dest => (
                                                                                                <button
                                                                                                    key={dest}
                                                                                                    onClick={() => {
                                                                                                        navigate(`/packages?destination=${encodeURIComponent(dest.toLowerCase())}`);
                                                                                                        setIsMobileMenuOpen(false);
                                                                                                    }}
                                                                                                    className="text-left pl-12 py-2.5 text-slate-500 text-sm hover:text-primary transition-colors"
                                                                                                >
                                                                                                    {dest}
                                                                                                </button>
                                                                                            ))}
                                                                                        </motion.div>
                                                                                    )}
                                                                                </AnimatePresence>
                                                                            </div>
                                                                        ))}
                                                                    </motion.div>
                                                                )}
                                                            </AnimatePresence>
                                                        </div>
                                                    ))}

                                                    {item.type === 'dropdown' && item.items?.map(subItem => (
                                                        <a
                                                            key={subItem.label}
                                                            href={subItem.href}
                                                            className="block pl-4 py-3 text-slate-600 text-sm border-b border-slate-50 hover:text-primary transition-colors"
                                                            onClick={() => setIsMobileMenuOpen(false)}
                                                        >
                                                            {subItem.label}
                                                        </a>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Bottom Sticky CTA */}
                    <div className="sticky bottom-0 bg-white border-t border-slate-200 p-4 flex gap-3">
                        <a 
                            href="/contact" 
                            className="flex-1 bg-primary text-white font-bold py-3.5 rounded-xl text-center text-sm font-['Marcellus']"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Enquire Now
                        </a>
                        <a 
                            href="https://wa.me/919090403075" 
                            target="_blank" 
                            rel="noreferrer" 
                            className="flex-1 bg-green-500 text-white font-bold py-3.5 rounded-xl text-center text-sm flex items-center justify-center gap-2"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <MessageCircle className="w-4 h-4" /> WhatsApp
                        </a>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
        </>
    );
}
