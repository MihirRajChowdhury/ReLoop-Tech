'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Truck, CheckCircle, Package, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function OrderTracking() {
    const now = new Date();

    // Helper to format date
    const formatDate = (date: Date) => date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ', ' + date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    const steps = [
        { title: 'Order Placed', date: formatDate(new Date(now.getTime() - 2 * 60 * 60 * 1000)), completed: true, icon: Package }, // 2 hours ago
        { title: 'Processing', date: formatDate(new Date(now.getTime() - 1 * 60 * 60 * 1000)), completed: true, icon: Clock }, // 1 hour ago
        { title: 'Harvested / Picked', date: formatDate(now), completed: true, icon: CheckCircle }, // Just now
        { title: 'Shipped', date: 'Pending', completed: false, icon: Truck },
        { title: 'Out for Delivery', date: 'Pending', completed: false, icon: MapPin },
    ];

    const [order, setOrder] = React.useState<any>(null);

    React.useEffect(() => {
        // Fetch latest order
        async function fetchLastOrder() {
            try {
                const res = await fetch('/api/orders');
                const data = await res.json();
                if (data.success && data.data.length > 0) {
                    setOrder(data.data[0]); // Get the most recent order
                }
            } catch (e) {
                console.error("Failed to fetch order", e);
            }
        }
        fetchLastOrder();
    }, []);

    // ... (keep steps logic)

    return (
        <div className="min-h-screen bg-background pt-24 pb-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold mb-8 text-center">Track Your Order</h1>

                <div className="glass-card p-8 rounded-2xl mb-8">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b border-border pb-6">
                        <div>
                            <p className="text-sm text-muted-foreground">Order ID</p>
                            <p className="font-mono text-xl font-bold">{order ? `#RL-${order._id.slice(-6).toUpperCase()}` : '#RL-88392-X'}</p>
                        </div>
                        <div className="mt-4 md:mt-0 text-right">
                            <p className="text-sm text-muted-foreground">Estimated Delivery</p>
                            <p className="text-xl font-bold text-primary">
                                {new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </p>
                        </div>
                    </div>

                    {/* ... Steps (Keep existing structure) ... */}
                    <div className="relative">
                        {/* ... Lines ... */}
                        <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-border md:hidden"></div>
                        <div className="hidden md:block absolute top-[26px] left-0 right-0 h-0.5 bg-border -z-10"></div>

                        <div className="flex flex-col md:flex-row justify-between">
                            {steps.map((step, index) => {
                                const Icon = step.icon;
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex md:flex-col items-center gap-4 md:gap-2 mb-8 md:mb-0 relative"
                                    >
                                        <div className={`
                                        w-12 h-12 rounded-full flex items-center justify-center border-4 border-background z-10
                                        ${step.completed ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}
                                    `}>
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <div className="md:text-center text-left">
                                            <p className={`font-semibold text-sm ${step.completed ? 'text-foreground' : 'text-muted-foreground'}`}>{step.title}</p>
                                            <p className="text-xs text-muted-foreground">{step.date}</p>
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="glass-card p-6 rounded-xl">
                        <h3 className="font-semibold mb-4">Shipping Address</h3>
                        {order ? (
                            <p className="text-sm text-muted-foreground">
                                {order.shippingAddress}
                            </p>
                        ) : (
                            <p className="text-sm text-muted-foreground">
                                Alex Chen<br />
                                123 Eco Avenue, Apt 4B<br />
                                San Francisco, CA 94107
                            </p>
                        )}
                    </div>
                    <div className="glass-card p-6 rounded-xl">
                        <h3 className="font-semibold mb-4">Order Summary</h3>
                        {order && order.items ? (
                            <>
                                {order.items.map((item: any, i: number) => (
                                    <div key={i} className="flex justify-between text-sm mb-2">
                                        <span>{item.product?.title || "Item"} (x{item.quantity})</span>
                                        <span>${item.priceAtPurchase * item.quantity}</span>
                                    </div>
                                ))}
                                <div className="flex justify-between text-sm mb-2">
                                    <span>Shipping</span>
                                    <span>${order.totalAmount > 500 ? 0 : 25}</span>
                                </div>
                                <div className="flex justify-between font-bold pt-4 border-t border-border mt-4">
                                    <span>Total</span>
                                    <span>${order.totalAmount}</span>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="flex justify-between text-sm mb-2">
                                    <span>MacBook Pro Screen (Used)</span>
                                    <span>$120.00</span>
                                </div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span>Shipping</span>
                                    <span>$15.00</span>
                                </div>
                                <div className="flex justify-between font-bold pt-4 border-t border-border mt-4">
                                    <span>Total</span>
                                    <span>$135.00</span>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <Button variant="outline" size="lg">Need Help?</Button>
                </div>
            </div>
        </div>
    );
}
