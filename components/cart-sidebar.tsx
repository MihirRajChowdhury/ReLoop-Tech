'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet"
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { ScrollArea } from "@/components/ui/scroll-area"
import { Trash2, Leaf, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Separator } from "@/components/ui/separator";

export default function CartSidebar() {
    const { cart, removeFromCart, totalPrice, totalCarbonSaved, isCartOpen, setIsCartOpen } = useCart();

    return (
        <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
            <SheetContent className="w-full sm:max-w-md flex flex-col">
                <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                        <ShoppingCart className="w-5 h-5" /> Your Cart
                    </SheetTitle>
                    <SheetDescription>
                        {cart.length === 0 ? "Your cart is currently empty." : `You have ${cart.length} items in your cart.`}
                    </SheetDescription>
                </SheetHeader>

                <div className="flex-1 overflow-hidden py-4">
                    {cart.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                                <ShoppingCart className="w-8 h-8 text-primary" />
                            </div>
                            <p>Start adding items to see them here!</p>
                        </div>
                    ) : (
                        <ScrollArea className="h-[60vh] pr-4">
                            <div className="space-y-4">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="h-20 w-20 relative rounded-md overflow-hidden bg-secondary">
                                            <Image src={item.image} alt={item.title} fill className="object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-sm line-clamp-2">{item.title}</h4>
                                            <p className="text-sm text-primary font-bold mt-1">${item.price}</p>
                                            <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                                                <Leaf className="w-3 h-3" /> <span>+{item.carbonSaved}kg CO2e</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end justify-between">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                                onClick={() => removeFromCart(item.id)}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                            <span className="text-xs text-muted-foreground">x{item.quantity}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    )}
                </div>

                {cart.length > 0 && (
                    <div className="space-y-4 pt-4 border-t">
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Carbon Impact</span>
                                <span className="text-green-600 font-bold flex items-center gap-1">
                                    <Leaf className="w-3 h-3" /> {totalCarbonSaved}kg CO2e Saved
                                </span>
                            </div>
                            <Separator />
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>${totalPrice}</span>
                            </div>
                        </div>
                        <SheetFooter>
                            <Button className="w-full" size="lg" asChild onClick={() => setIsCartOpen(false)}>
                                <Link href="/checkout">Checkout</Link>
                            </Button>
                        </SheetFooter>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
}
