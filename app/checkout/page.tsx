'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Separator } from "@/components/ui/separator";
import { Leaf, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
    const { cart, totalPrice, totalCarbonSaved, clearCart } = useCart();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        zip: '',
        cardNumber: '',
        expiry: '',
        cvv: ''
    });

    // Determine shipping cost (mock logic)
    const shippingCost = totalPrice > 500 ? 0 : 25;
    const finalTotal = totalPrice + shippingCost;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Mock API call to create order
            const res = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    buyer: "654321654321654321654321", // Mock User ID
                    items: cart.map(item => ({
                        product: item.id, // Ensure this matches Product Schema Object ID
                        quantity: item.quantity,
                        priceAtPurchase: item.price
                    })),
                    totalAmount: finalTotal,
                    shippingAddress: `${formData.address}, ${formData.city} ${formData.zip}`,
                    status: 'processing'
                })
            });

            if (res.ok) {
                // Success
                clearCart();
                router.push('/tracking');
            } else {
                alert("Failed to place order. Please try again.");
            }
        } catch (error) {
            console.error("Checkout error:", error);
            alert("An error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    if (cart.length === 0) {
        return (
            <div className="min-h-screen pt-24 pb-12 flex flex-col items-center justify-center">
                <div className="text-center space-y-4">
                    <h1 className="text-3xl font-bold">Your cart is empty</h1>
                    <p className="text-muted-foreground">Add some items before checking out.</p>
                    <Button asChild>
                        <Link href="/marketplace">Go to Marketplace</Link>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Button variant="ghost" className="mb-8 pl-0 hover:bg-transparent hover:text-primary" asChild>
                    <Link href="/marketplace"><ArrowLeft className="mr-2 h-4 w-4" /> Continue Shopping</Link>
                </Button>

                <h1 className="text-4xl font-bold mb-8">Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Form Section */}
                    <div className="space-y-8">
                        <section className="glass-card p-6 rounded-xl">
                            <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Full Name</label>
                                        <input required name="name" value={formData.name} onChange={handleChange} className="w-full p-2 rounded-md border bg-transparent" placeholder="John Doe" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Email</label>
                                        <input required name="email" type="email" value={formData.email} onChange={handleChange} className="w-full p-2 rounded-md border bg-transparent" placeholder="john@example.com" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Address</label>
                                    <input required name="address" value={formData.address} onChange={handleChange} className="w-full p-2 rounded-md border bg-transparent" placeholder="123 Eco St" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">City</label>
                                        <input required name="city" value={formData.city} onChange={handleChange} className="w-full p-2 rounded-md border bg-transparent" placeholder="New York" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">ZIP Code</label>
                                        <input required name="zip" value={formData.zip} onChange={handleChange} className="w-full p-2 rounded-md border bg-transparent" placeholder="10001" />
                                    </div>
                                </div>
                            </form>
                        </section>

                        <section className="glass-card p-6 rounded-xl">
                            <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Card Number</label>
                                    <input required name="cardNumber" value={formData.cardNumber} onChange={handleChange} className="w-full p-2 rounded-md border bg-transparent" placeholder="0000 0000 0000 0000" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Expiry</label>
                                        <input required name="expiry" value={formData.expiry} onChange={handleChange} className="w-full p-2 rounded-md border bg-transparent" placeholder="MM/YY" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">CVV</label>
                                        <input required name="cvv" value={formData.cvv} onChange={handleChange} className="w-full p-2 rounded-md border bg-transparent" placeholder="123" />
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Order Summary */}
                    <div className="space-y-6">
                        <div className="glass-card p-6 rounded-xl sticky top-24">
                            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
                            <div className="space-y-4 mb-6">
                                {cart.map(item => (
                                    <div key={item.id} className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <p className="font-medium text-sm">{item.title}</p>
                                            <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                                        </div>
                                        <p className="font-medium">${item.price * item.quantity}</p>
                                    </div>
                                ))}
                            </div>

                            <Separator className="my-4" />

                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span>${totalPrice}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Shipping</span>
                                    <span>{shippingCost === 0 ? 'Free' : `$${shippingCost}`}</span>
                                </div>
                                <div className="flex justify-between text-sm text-green-600">
                                    <span className="flex items-center gap-1"><Leaf className="w-3 h-3" /> Carbon Saved</span>
                                    <span>{totalCarbonSaved}kg</span>
                                </div>
                            </div>

                            <Separator className="my-4" />

                            <div className="flex justify-between text-xl font-bold mb-8">
                                <span>Total</span>
                                <span>${finalTotal}</span>
                            </div>

                            <Button
                                type="submit"
                                form="checkout-form"
                                className="w-full h-12 text-lg"
                                disabled={isLoading}
                            >
                                {isLoading ? <Loader2 className="animate-spin mr-2" /> : null}
                                {isLoading ? 'Processing...' : 'Place Order'}
                            </Button>

                            <p className="text-xs text-center text-muted-foreground mt-4">
                                By placing this order, you agree to our Terms of Service and Privacy Policy.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
