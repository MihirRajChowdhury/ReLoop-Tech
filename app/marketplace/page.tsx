'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import { Filter, Search, X, Loader2 } from 'lucide-react';
import CompareBar from '@/components/CompareBar';

const CATEGORIES = ['Laptops', 'Phones', 'Components', 'Audio', 'Gaming'];
const CONDITIONS = ['Mint', 'Good', 'Fair', 'Salvage'];

interface Product {
    _id: string;
    title: string;
    price: number;
    category: string;
    condition: 'Mint' | 'Good' | 'Fair' | 'Salvage';
    carbonSaved: number;
    images: string[];
}

export default function MarketplacePage() {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('featured');

    // Data State
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (selectedCategories.length) params.append('category', selectedCategories.join(','));
            if (selectedConditions.length) params.append('condition', selectedConditions.join(','));
            if (searchQuery) params.append('search', searchQuery);

            const res = await fetch(`/api/products?${params.toString()}`);
            const data = await res.json();

            if (data.success) {
                setProducts(data.data);
            } else {
                setError('Failed to load products');
            }
        } catch (err) {
            setError('An error occurred while fetching products.');
        } finally {
            setLoading(false);
        }
    };

    // Debounce search and fetch
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchProducts();
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [selectedCategories, selectedConditions, searchQuery]);

    const sortedProducts = [...products].sort((a, b) => {
        if (sortBy === 'price_asc') return a.price - b.price;
        if (sortBy === 'price_desc') return b.price - a.price;
        if (sortBy === 'carbon_desc') return b.carbonSaved - a.carbonSaved;
        return 0; // Featured or default sort (creation date from API)
    });

    const toggleCategory = (category: string) => {
        setSelectedCategories(prev =>
            prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
        );
    };

    const toggleCondition = (condition: string) => {
        setSelectedConditions(prev =>
            prev.includes(condition) ? prev.filter(c => c !== condition) : [...prev, condition]
        );
    };

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Header */}
            <div className="pt-24 pb-12 bg-secondary/20 border-b border-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold mb-4">Marketplace</h1>
                    <p className="text-muted-foreground max-w-2xl">
                        Browse thousands of verified upcycled parts and devices. Save money and the planet simultaneously.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar Filters */}
                    <aside className="w-full md:w-64 space-y-6">
                        <div className="glass-card p-4 rounded-lg sticky top-24">
                            <div className="flex items-center justify-between font-bold mb-4 text-lg">
                                <div className="flex items-center gap-2"><Filter className="w-5 h-5" /> Filters</div>
                                {(selectedCategories.length > 0 || selectedConditions.length > 0) && (
                                    <Button variant="ghost" size="sm" className="h-auto p-1 text-xs text-muted-foreground hover:text-destructive" onClick={() => {
                                        setSelectedCategories([]);
                                        setSelectedConditions([]);
                                    }}>
                                        Clear
                                    </Button>
                                )}
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-sm font-semibold mb-3">Category</h3>
                                    <div className="space-y-2">
                                        {CATEGORIES.map(c => (
                                            <div key={c} className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    id={`category-${c}`}
                                                    checked={selectedCategories.includes(c)}
                                                    onChange={() => toggleCategory(c)}
                                                    className="rounded border-input text-primary focus:ring-primary cursor-pointer accent-primary h-4 w-4"
                                                />
                                                <label htmlFor={`category-${c}`} className="text-sm font-medium leading-none cursor-pointer hover:text-primary transition-colors select-none">
                                                    {c}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-sm font-semibold mb-3">Condition</h3>
                                    <div className="space-y-2">
                                        {CONDITIONS.map(c => (
                                            <div key={c} className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    id={`condition-${c}`}
                                                    checked={selectedConditions.includes(c)}
                                                    onChange={() => toggleCondition(c)}
                                                    className="rounded border-input text-primary focus:ring-primary cursor-pointer accent-primary h-4 w-4"
                                                />
                                                <label htmlFor={`condition-${c}`} className="text-sm font-medium leading-none cursor-pointer hover:text-primary transition-colors select-none">
                                                    {c}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Product Grid */}
                    <main className="flex-1">
                        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                            <div className="relative max-w-md w-full">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="Search GPU, Screen, CPU..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                />
                                {searchQuery && (
                                    <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                                        <X className="h-4 w-4" />
                                    </button>
                                )}
                            </div>
                            <div className="flex items-center gap-2 w-full sm:w-auto">
                                <select
                                    className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-ring w-full sm:w-auto"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                >
                                    <option value="featured">Sort by: Featured</option>
                                    <option value="price_asc">Price: Low to High</option>
                                    <option value="price_desc">Price: High to Low</option>
                                    <option value="carbon_desc">Carbon Saved: High to Low</option>
                                </select>
                            </div>
                        </div>

                        {loading ? (
                            <div className="flex justify-center py-20">
                                <Loader2 className="h-10 w-10 animate-spin text-primary" />
                            </div>
                        ) : error ? (
                            <div className="text-center py-20 text-destructive">
                                <p>{error}</p>
                                <Button variant="outline" onClick={fetchProducts} className="mt-4">Try Again</Button>
                            </div>
                        ) : sortedProducts.length === 0 ? (
                            <div className="text-center py-20 opacity-50">
                                <Filter className="w-16 h-16 mx-auto mb-4" />
                                <h3 className="text-xl font-bold">No items found</h3>
                                <p>Try adjusting your category or condition filters.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {sortedProducts.map(product => (
                                    <ProductCard
                                        key={product._id}
                                        id={product._id}
                                        title={product.title}
                                        price={product.price}
                                        images={product.images}
                                        category={product.category}
                                        condition={product.condition}
                                        carbonSaved={product.carbonSaved}
                                    />
                                ))}
                            </div>
                        )}
                    </main>
                </div>
            </div>

            <CompareBar />
        </div>
    );
}
