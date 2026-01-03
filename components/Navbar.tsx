'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Menu, X, Recycle, Leaf } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ModeToggle } from '@/components/mode-toggle';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const { setIsCartOpen, cart } = useCart();

    const links = [
        { href: '/marketplace', label: 'Marketplace' },
        { href: '/sell', label: 'Sell / Recycle' },
        { href: '/impact', label: 'Impact Tracker' },
        { href: '/about', 'label': 'About' },
    ];

    return (
        <nav className="fixed w-full z-50 glass-effect">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-2">
                        <Link href="/" className="flex items-center gap-2 group cursor-pointer">
                            <div className="relative">
                                <Recycle className="h-8 w-8 text-primary transition-transform group-hover:rotate-180 duration-700" />
                                <Leaf className="h-3 w-3 text-green-400 absolute top-0 right-0 animate-pulse" />
                            </div>
                            <span className="font-bold text-xl tracking-tighter">ReLoop</span>
                        </Link>
                    </div>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            {links.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`
                        transition-colors px-3 py-2 rounded-md text-sm font-medium cursor-pointer relative
                        ${pathname === link.href ? 'text-primary' : 'hover:text-primary'}
                    `}
                                >
                                    {link.label}
                                    {pathname === link.href && (
                                        <motion.div
                                            layoutId="navbar-underline"
                                            className="absolute left-0 right-0 -bottom-1 h-0.5 bg-primary"
                                        />
                                    )}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="hidden md:flex items-center gap-4">
                        <ModeToggle />
                        <Button variant="ghost" size="icon" className="relative cursor-pointer" onClick={() => setIsCartOpen(true)}>
                            <ShoppingBag className="h-5 w-5" />
                            {cart.length > 0 && (
                                <span className="absolute top-1 right-1 h-2 w-2 bg-primary rounded-full animate-ping" />
                            )}
                            {cart.length > 0 && (
                                <span className="absolute -top-1 -right-1 h-4 w-4 bg-primary rounded-full text-[10px] flex items-center justify-center text-primary-foreground font-bold">
                                    {cart.length}
                                </span>
                            )}
                        </Button>
                        <Button className="cursor-pointer" asChild>
                            <Link href="/login">Sign In</Link>
                        </Button>
                    </div>

                    <div className="-mr-2 flex md:hidden items-center gap-2">
                        <ModeToggle />
                        <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </Button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden glass-effect border-b border-border"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {links.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`block px-3 py-2 rounded-md text-base font-medium cursor-pointer ${pathname === link.href ? 'bg-primary/10 text-primary' : 'hover:bg-primary/10'}`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <Button className="w-full mt-4 cursor-pointer" asChild>
                                <Link href="/login">Sign In</Link>
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
