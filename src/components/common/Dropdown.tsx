import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export type DropdownOption = { value: string; label: string };

type DropdownProps = {
    options: DropdownOption[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
    label?: string;
    size?: 'sm' | 'md' | 'lg';
};

export default function Dropdown({
    options,
    value,
    onChange,
    placeholder = 'Select...',
    className = '',
    label,
    size = 'md',
}: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const selectedOption = options.find((o) => o.value === value);
    const displayLabel = selectedOption ? selectedOption.label : placeholder;

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const sizeClasses = {
        sm: 'py-2 pl-3 pr-8 text-sm',
        md: 'py-2.5 px-4 text-sm',
        lg: 'py-3 px-4 text-base',
    };

    return (
        <div ref={ref} className={`relative ${className}`}>
            {label && (
                <label className="block text-sm font-semibold text-slate-700 mb-2">{label}</label>
            )}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full flex items-center justify-between gap-2 bg-white border border-slate-700 rounded-xl text-left text-slate-700 hover:border-slate-300 focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${sizeClasses[size]}`}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                aria-labelledby={label ? undefined : undefined}
            >
                <span className={!selectedOption ? 'text-slate-600' : ''}>{displayLabel}</span>
                <ChevronDown
                    className={`w-5 h-5 text-slate-700 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            {isOpen && (
                <ul
                    role="listbox"
                    className="absolute z-50 mt-1 w-full max-h-60 overflow-auto bg-white border border-slate-700 rounded-xl shadow-lg py-1"
                >
                    {options.map((opt) => (
                        <li
                            key={opt.value}
                            role="option"
                            aria-selected={opt.value === value}
                            onClick={() => {
                                onChange(opt.value);
                                setIsOpen(false);
                            }}
                            className={`px-4 py-2.5 cursor-pointer transition-colors ${opt.value === value
                                ? 'bg-primary/10 text-primary font-medium'
                                : 'text-slate-700 hover:bg-slate-50'
                                }`}
                        >
                            {opt.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
