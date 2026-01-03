'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart, Activity, ArrowRightLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { useCart } from '@/context/CartContext';
import { useCompare } from '@/context/CompareContext';
import { Checkbox } from '@/components/ui/checkbox';


interface ProductCardProps {
    id: string; // Changed to string for MongoDB _id
    title: string;
    price: number;
    images: string[]; // Changed to array
    category: string;
    condition: 'Mint' | 'Good' | 'Fair' | 'Salvage';
    carbonSaved: number;
}

export default function ProductCard({ id, title, price, images, category, condition, carbonSaved }: ProductCardProps) {
    const { addToCart } = useCart();
    const { addToCompare, removeFromCompare, isInCompare, selectedProducts } = useCompare();

    // Handle image fallback
    const displayImage = images && images.length > 0 ? images[0] : '/placeholder.png'; // Basic fallback

    const getConditionColor = (c: string) => {
        switch (c) {
            case 'Mint': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
            case 'Good': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
            case 'Fair': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
            case 'Salvage': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const handleCompareChange = (checked: boolean) => {
        const product = { _id: id, title, price, images, category, condition, carbonSaved };
        if (checked) {
            addToCompare(product);
        } else {
            removeFromCompare(id);
        }
    };

    return (
        <motion.div
            whileHover={{ y: -8 }}
            className="glass-card rounded-xl overflow-hidden group shadow-sm hover:shadow-xl transition-all duration-300 relative"
        >
            <div className="relative h-48 w-full bg-secondary/50 overflow-hidden">
                <Link href={`/products/${id}`}>
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-gradient-to-br from-secondary to-background cursor-pointer">
                        <img src={displayImage} alt={title} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" />
                    </div>
                </Link>

                <div className="absolute top-2 right-2 flex gap-2">
                    <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-md hover:bg-white text-destructive">
                        <Heart className="h-4 w-4" />
                    </Button>
                </div>

                <div className="absolute bottom-2 right-2">
                    <div className="flex items-center gap-2 bg-background/80 backdrop-blur-md px-2 py-1 rounded-full shadow-sm border border-border/50">
                        <Checkbox
                            id={`compare-${id}`}
                            checked={isInCompare(id)}
                            onCheckedChange={handleCompareChange}
                            className="rounded-full w-4 h-4"
                        />
                        <label htmlFor={`compare-${id}`} className="text-[10px] font-medium cursor-pointer uppercase tracking-wider">Compare</label>
                    </div>
                </div>

                <div className="absolute top-2 left-2">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full backdrop-blur-md ${getConditionColor(condition)}`}>
                        {condition}
                    </span>
                </div>
            </div>

            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">{category}</p>
                        <Link href={`/products/${id}`}>
                            <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors line-clamp-1 cursor-pointer">{title}</h3>
                        </Link>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="font-bold text-lg">${price}</span>
                    </div>
                </div>

                <div className="flex items-center gap-2 mb-4 text-xs text-muted-foreground">
                    <Activity className="h-3 w-3 text-green-500" />
                    <span>Saves <span className="font-bold text-green-600 dark:text-green-400">{carbonSaved}kg</span> CO2e</span>
                </div>

                <Button
                    className="w-full gap-2 group-hover:bg-primary group-hover:text-primary-foreground transition-all cursor-pointer"
                    onClick={() => addToCart({ id, title, price, image: displayImage, carbonSaved })}
                >
                    <ShoppingCart className="h-4 w-4" /> Add to Cart
                </Button>
            </div>
        </motion.div>
    );
}
