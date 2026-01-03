'use client';

import { motion } from 'framer-motion';
import { Recycle, Heart, Globe, Users } from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Hero */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-green-600 bg-clip-text text-transparent">
                            About ReLoop
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            We are on a mission to close the loop on e-waste, one device at a time.
                        </p>
                    </motion.div>
                </div>

                {/* Mission Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
                    <div className="relative h-96 rounded-2xl overflow-hidden glass-card">
                        <Image
                            src="https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=1000&auto=format&fit=crop"
                            alt="E-waste recycling"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <Recycle className="w-24 h-24 text-white/80 animate-pulse" />
                        </div>
                    </div>
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold">The Problem</h2>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            E-waste is the fastest-growing waste stream in the world. Millions of usable components are shredded or dumped in landfills every year.
                        </p>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            At ReLoop, we believe that <span className="text-primary font-bold">broken doesn't mean trash</span>. By connecting hobbyists, fixers, and recyclers, we create a circular economy where value is harvested, not wasted.
                        </p>
                    </div>
                </div>

                {/* Values Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                    <div className="glass-card p-8 rounded-2xl text-center hover:scale-105 transition-transform duration-300">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                            <Globe className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Sustainability First</h3>
                        <p className="text-muted-foreground">Every feature we build is designed to maximize carbon savings and minimize waste.</p>
                    </div>
                    <div className="glass-card p-8 rounded-2xl text-center hover:scale-105 transition-transform duration-300">
                        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500">
                            <Heart className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Community Driven</h3>
                        <p className="text-muted-foreground">We empower a global community of makers, fixers, and eco-warriors.</p>
                    </div>
                    <div className="glass-card p-8 rounded-2xl text-center hover:scale-105 transition-transform duration-300">
                        <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-500">
                            <Users className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Transparency</h3>
                        <p className="text-muted-foreground">From carbon tracking to verified listings, we believe in radical transparency.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
