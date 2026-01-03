'use client';

import { useState, useEffect } from 'react';
import { motion, useSpring, useTransform, animate } from 'framer-motion';
import { Leaf, Award, TrendingUp, TreeDeciduous, Car, Zap, Globe } from 'lucide-react';

function Counter({ value, duration = 2 }: { value: number, duration?: number }) {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        const controls = animate(0, value, {
            duration: duration,
            onUpdate: (latest) => setDisplayValue(Math.floor(latest)),
        });
        return () => controls.stop();
    }, [value, duration]);

    return <span>{displayValue.toLocaleString()}</span>;
}

export default function ImpactPage() {
    const stats = [
        { label: 'CO2e Saved', value: 124, unit: 'kg', icon: Leaf, color: 'text-green-500', bg: 'bg-green-500/10' },
        { label: 'Eco-Rank', value: 95, unit: 'th Percentile', icon: Award, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
        { label: 'Devices Upcycled', value: 12, unit: 'Devices', icon: TrendingUp, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    ];

    const equivalents = [
        { label: 'Trees Planted', value: 3.2, icon: TreeDeciduous, desc: 'Equivalent to the carbon absorbed by 3 trees.' },
        { label: 'Miles Driven', value: 310, icon: Car, desc: 'Avoided emissions from driving 310 miles.' },
        { label: 'Energy Saved', value: 450, icon: Zap, desc: 'Saved enough energy to power a home for 2 days.' },
    ];

    return (
        <div className="min-h-screen bg-background pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-green-500 bg-clip-text text-transparent">
                        Your Environmental Impact
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Track the real-world carbon emissions you&apos;ve prevented by choosing circular tech and extending the lifecycle of electronics.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-card p-8 rounded-2xl text-center relative overflow-hidden group"
                        >
                            <div className={`absolute top-0 right-0 p-4 transition-transform group-hover:scale-110`}>
                                <stat.icon className={`w-24 h-24 ${stat.color} opacity-5 -mr-8 -mt-8`} />
                            </div>
                            <stat.icon className={`w-12 h-12 ${stat.color} mx-auto mb-4`} />
                            <h3 className="text-5xl font-bold mb-2 tracking-tighter">
                                <Counter value={stat.value} />
                                <span className="text-2xl ml-1">{stat.unit === 'kg' ? 'kg' : ''}</span>
                            </h3>
                            <p className="text-muted-foreground font-medium uppercase tracking-wider text-sm">{stat.label}</p>
                            {stat.unit !== 'kg' && <p className="text-xs text-muted-foreground mt-1">{stat.unit}</p>}
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="glass-card p-8 rounded-2xl"
                    >
                        <h3 className="font-bold text-2xl mb-8 flex items-center gap-2">
                            <Globe className="w-6 h-6 text-primary" /> Environmental Equivalencies
                        </h3>
                        <div className="space-y-6">
                            {equivalents.map((eq, i) => (
                                <div key={i} className="flex gap-4 items-start">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                        <eq.icon className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg">{eq.label}</h4>
                                        <p className="text-muted-foreground text-sm">{eq.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="glass-card p-8 rounded-2xl"
                    >
                        <h3 className="font-bold text-2xl mb-8">Recent Activity</h3>
                        <div className="space-y-4">
                            {[
                                { action: 'Purchased Used GPU', date: 'Jan 2, 2026', savings: 15 },
                                { action: 'Recycled MacBook Pro', date: 'Dec 28, 2025', savings: 45 },
                                { action: 'Bought Refurbished iPhone', date: 'Dec 15, 2025', savings: 12 },
                            ].map((activity, i) => (
                                <div key={i} className="flex items-center justify-between p-4 border border-border/50 rounded-xl hover:bg-secondary/30 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center text-green-600">
                                            <Leaf className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="font-semibold">{activity.action}</p>
                                            <p className="text-xs text-muted-foreground">{activity.date}</p>
                                        </div>
                                    </div>
                                    <span className="font-bold text-green-600">+{activity.savings} kg CO2e</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

