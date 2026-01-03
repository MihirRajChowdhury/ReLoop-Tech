'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart, Activity, Star, User, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useCompare } from '@/context/CompareContext';
import { Checkbox } from '@/components/ui/checkbox';

interface Product {
    _id: string;
    title: string;
    description: string;
    price: number;
    category: string;
    condition: 'Mint' | 'Good' | 'Fair' | 'Salvage';
    carbonSaved: number;
    images: string[];
}

interface Review {
    _id: string;
    user: string;
    rating: number;
    comment: string;
    createdAt: string;
}

export default function ProductPage() {
    const params = useParams();
    const id = params.id as string;

    const [product, setProduct] = useState<Product | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();
    const { addToCompare, removeFromCompare, isInCompare } = useCompare();

    // Review Form State
    const [newReview, setNewReview] = useState({ user: '', rating: 5, comment: '' });
    const [submittingReview, setSubmittingReview] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch Product
                const prodRes = await fetch(`/api/products/${id}`);
                const prodData = await prodRes.json();
                if (prodData.success) setProduct(prodData.data);

                // Fetch Reviews
                const revRes = await fetch(`/api/reviews?productId=${id}`);
                const revData = await revRes.json();
                if (revData.success) setReviews(revData.data);
            } catch (error) {
                console.error("Failed to fetch data", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchData();
    }, [id]);

    const handleCompareChange = (checked: boolean) => {
        if (!product) return;
        if (checked) {
            addToCompare(product);
        } else {
            removeFromCompare(product._id);
        }
    };

    const submitReview = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!product) return;
        setSubmittingReview(true);
        try {
            const res = await fetch('/api/reviews', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...newReview, productId: product._id })
            });
            const data = await res.json();
            if (data.success) {
                setReviews(prev => [data.data, ...prev]);
                setNewReview({ user: '', rating: 5, comment: '' });
            }
        } catch (error) {
            console.error("Failed to submit review");
        } finally {
            setSubmittingReview(false);
        }
    };

    if (loading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin h-10 w-10 text-primary" /></div>;
    if (!product) return <div className="flex h-screen items-center justify-center">Product not found</div>;

    const displayImage = product.images && product.images.length > 0 ? product.images[0] : '/placeholder.png';

    return (
        <div className="min-h-screen bg-background pb-20 pt-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Button variant="ghost" className="mb-6 pl-0 hover:bg-transparent hover:text-primary" asChild>
                    <Link href="/marketplace"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Marketplace</Link>
                </Button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                    {/* Image Section */}
                    <div className="rounded-2xl overflow-hidden bg-secondary border border-border aspect-square relative group">
                        <img src={displayImage} alt={product.title} className="w-full h-full object-cover" />
                        <div className="absolute top-4 right-4">
                            <Button size="icon" variant="secondary" className="rounded-full bg-white/80 backdrop-blur-md text-destructive">
                                <Heart className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>

                    {/* Info Section */}
                    <div className="space-y-6">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary uppercase tracking-wide">
                                    {product.category}
                                </span>
                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-secondary text-secondary-foreground uppercase tracking-wide">
                                    {product.condition}
                                </span>
                            </div>
                            <h1 className="text-4xl font-bold mb-2">{product.title}</h1>
                            <div className="flex items-center gap-2 text-green-500 font-medium">
                                <Activity className="w-4 h-4" />
                                <span>Saves {product.carbonSaved}kg CO2e</span>
                            </div>
                        </div>

                        <div className="text-3xl font-bold">${product.price}</div>

                        <p className="text-muted-foreground text-lg leading-relaxed">
                            {product.description}
                        </p>

                        <div className="flex items-center gap-4 border-y border-border py-4">
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    id="compare-detail"
                                    checked={isInCompare(product._id)}
                                    onCheckedChange={handleCompareChange}
                                    className="w-5 h-5 rounded-full"
                                />
                                <label htmlFor="compare-detail" className="font-medium cursor-pointer">Compare</label>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Button size="lg" className="w-full gap-2 text-lg h-12" onClick={() => addToCart({
                                id: product._id,
                                title: product.title,
                                price: product.price,
                                image: displayImage,
                                carbonSaved: product.carbonSaved
                            })}>
                                <ShoppingCart className="w-5 h-5" /> Add to Cart
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="max-w-3xl">
                    <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
                        Customer Reviews <span className="text-base font-normal text-muted-foreground">({reviews.length})</span>
                    </h2>

                    {/* Add Review Form */}
                    <div className="glass-card p-6 rounded-xl mb-12">
                        <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
                        <form onSubmit={submitReview} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="sm:col-span-2">
                                    <label className="text-sm font-medium block mb-2">Name</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-ring"
                                        value={newReview.user}
                                        onChange={e => setNewReview({ ...newReview, user: e.target.value })}
                                        placeholder="Your name"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium block mb-2">Rating</label>
                                    <select
                                        className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-ring"
                                        value={newReview.rating}
                                        onChange={e => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                                    >
                                        <option value="5">5 - Excellent</option>
                                        <option value="4">4 - Good</option>
                                        <option value="3">3 - Average</option>
                                        <option value="2">2 - Fair</option>
                                        <option value="1">1 - Poor</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium block mb-2">Comment</label>
                                <textarea
                                    required
                                    className="w-full h-24 rounded-md border border-input bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-ring resize-none"
                                    value={newReview.comment}
                                    onChange={e => setNewReview({ ...newReview, comment: e.target.value })}
                                    placeholder="Share your experience..."
                                />
                            </div>
                            <Button type="submit" disabled={submittingReview}>
                                {submittingReview ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                                Submit Review
                            </Button>
                        </form>
                    </div>

                    {/* Review List */}
                    <div className="space-y-6">
                        {reviews.length === 0 ? (
                            <p className="text-muted-foreground italic">No reviews yet. Be the first to review!</p>
                        ) : (
                            reviews.map(review => (
                                <div key={review._id} className="border-b border-border pb-6 last:border-0 animation-fade-in">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center gap-2">
                                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                                {review.user.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-sm">{review.user}</p>
                                                <div className="flex text-yellow-500 text-xs">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-current' : 'text-muted/30'}`} />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <span className="text-xs text-muted-foreground">
                                            {new Date(review.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p className="text-sm text-foreground/80 leading-relaxed max-w-2xl pl-10">
                                        {review.comment}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
