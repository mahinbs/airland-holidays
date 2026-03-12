import { PhoneIcon as WhatsappIcon } from 'lucide-react'; // Placeholder for WhatsApp

export default function FloatingLeadGen() {
    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
            {/* Tooltip (Optional, hidden on mobile for cleaner look) */}
            <div className="hidden md:flex bg-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium text-slate-700 border border-slate-100 items-center justify-center animate-bounce">
                Need help planning?
                {/* Little triangle pointer */}
                <div className="absolute -bottom-2 right-4 w-4 h-4 bg-white border-b border-r border-slate-100 transform rotate-45"></div>
            </div>

            {/* Main WhatsApp FAB */}
            <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="relative group flex items-center justify-center"
            >
                {/* Pulse Ring */}
                <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-25"></div>
                {/* Button */}
                <div className="relative bg-green-500 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300">
                    <WhatsappIcon className="w-7 h-7" />
                </div>
            </a>
        </div>
    );
}
