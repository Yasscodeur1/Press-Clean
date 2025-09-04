import { Button } from '@/components/ui/button';
import { BookingModal } from '@/pages/calendar/BookingModal';
import { Link } from '@inertiajs/react';
import { Menu, Shirt, X } from 'lucide-react';
import { useState } from 'react';

export default function NavBar() {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);

    const navLinks = [
        { href: '#services', label: 'Services' },
        { href: '#avantages', label: 'Avantages' },
        { href: '#tarifs', label: 'Tarifs' },
        { href: '#contact', label: 'Contact' },
    ];

    return (
        <header className="sticky top-0 z-50 bg-transparent shadow-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-6">
                {/* Logo */}
                <div className="flex items-center space-x-2">
                    <Shirt className="h-8 w-8 text-slate-700" />
                    <span className="text-2xl font-bold text-slate-800">RepassPro</span>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden items-center space-x-6 md:flex">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="relative font-medium text-slate-600 transition-colors after:absolute after:bottom-0 after:left-1/2 after:h-[2px] after:w-0 after:-translate-x-1/2 after:bg-slate-800 after:transition-all after:duration-300 after:content-[''] hover:text-slate-800 hover:after:w-full"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* CTA Button */}
                <div className="hidden md:block">
                    <BookingModal>
                        <Button className="bg-slate-800 text-white hover:bg-slate-700">Réserver maintenant</Button>
                    </BookingModal>
                </div>

                {/* Mobile Toggle Button */}
                <button onClick={toggleMobileMenu} className="focus:outline-none md:hidden">
                    {isMobileMenuOpen ? <X className="h-6 w-6 text-slate-700" /> : <Menu className="h-6 w-6 text-slate-700" />}
                </button>
            </div>

            {/* Mobile Menu with Tailwind transition */}
            <div
                className={`overflow-hidden bg-white px-4 transition-all duration-300 ease-in-out md:hidden ${
                    isMobileMenuOpen ? 'max-h-96 py-4 opacity-100' : 'max-h-0 py-0 opacity-0'
                }`}
            >
                <nav className="flex flex-col space-y-3">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="font-medium text-slate-600 transition-colors hover:font-bold hover:text-slate-800"
                        >
                            {link.label}
                        </Link>
                    ))}
                    <BookingModal>
                        <Button className="mt-3 w-full bg-slate-800 text-white hover:bg-slate-700">Réserver maintenant</Button>
                    </BookingModal>
                </nav>
            </div>
        </header>
    );
}
