'use client';

import { useCompare } from '@/context/CompareContext';
import { Button } from '@/components/ui/button';
import { X, ArrowRightLeft, Leaf } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';

export default function CompareBar() {
    const { selectedProducts, removeFromCompare, clearCompare } = useCompare();

    if (selectedProducts.length === 0) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-4"
            >
                <div className="bg-background/80 backdrop-blur-xl border border-primary/20 p-4 rounded-2xl shadow-2xl flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="text-sm font-semibold text-muted-foreground hidden sm:block">
                            Compare ({selectedProducts.length}/3):
                        </div>
                        <div className="flex gap-2">
                            {selectedProducts.map(p => (
                                <div key={p._id} className="relative group">
                                    <div className="w-12 h-12 rounded-lg bg-secondary overflow-hidden border border-border">
                                        <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover" />
                                    </div>
                                    <button
                                        onClick={() => removeFromCompare(p._id)}
                                        className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={clearCompare}>
                            ClearAll
                        </Button>

                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="gap-2 shadow-lg shadow-primary/20">
                                    <ArrowRightLeft className="w-4 h-4" /> Compare Now
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl bg-background/95 backdrop-blur-xl border-primary/10">
                                <DialogHeader>
                                    <DialogTitle>Product Comparison</DialogTitle>
                                </DialogHeader>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                                    {selectedProducts.map(product => {
                                        // Simple Best Option Logic
                                        const isBestOption = selectedProducts.reduce((prev, current) => (prev.carbonSaved > current.carbonSaved) ? prev : current)._id === product._id;

                                        return (
                                            <div key={product._id} className={`border rounded-xl p-4 relative ${isBestOption ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-border bg-secondary/10'}`}>
                                                {isBestOption && (
                                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                                                        <Leaf className="w-3 h-3" /> Best for Planet
                                                    </div>
                                                )}
                                                <div className="aspect-video mb-4 rounded-lg overflow-hidden bg-secondary">
                                                    <img src={product.images[0]} alt={product.title} className="w-full h-full object-contain" />
                                                </div>
                                                <h3 className="font-bold text-lg mb-2 line-clamp-1">{product.title}</h3>
                                                <p className="text-2xl font-bold text-primary mb-4">${product.price}</p>

                                                <div className="space-y-3 text-sm">
                                                    <div className="flex justify-between border-b border-border/50 pb-2">
                                                        <span className="text-muted-foreground">Category</span>
                                                        <span className="font-medium">{product.category}</span>
                                                    </div>
                                                    <div className="flex justify-between border-b border-border/50 pb-2">
                                                        <span className="text-muted-foreground">Condition</span>
                                                        <span className="font-medium">{product.condition}</span>
                                                    </div>
                                                    <div className="flex justify-between border-b border-border/50 pb-2">
                                                        <span className="text-muted-foreground">CO2e Saved</span>
                                                        <span className="font-medium text-green-500">{product.carbonSaved}kg</span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
