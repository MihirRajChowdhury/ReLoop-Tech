'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type CartItem = {
    id: string;
    title: string;
    price: number;
    image: string;
    carbonSaved: number;
    quantity: number;
};

type CartContextType = {
    cart: CartItem[];
    addToCart: (item: Omit<CartItem, 'quantity'>) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
    totalPrice: number;
    totalCarbonSaved: number;
    isCartOpen: boolean;
    setIsCartOpen: (open: boolean) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Load cart from local storage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('reloop-cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    // Save cart to local storage whenever it changes
    useEffect(() => {
        localStorage.setItem('reloop-cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (item: Omit<CartItem, 'quantity'>) => {
        setCart((prev) => {
            const existing = prev.find((i) => i.id === item.id);
            if (existing) {
                return prev.map((i) =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            return [...prev, { ...item, quantity: 1 }];
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (id: string) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };

    const clearCart = () => setCart([]);

    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const totalCarbonSaved = cart.reduce((total, item) => total + item.carbonSaved * item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                clearCart,
                totalPrice,
                totalCarbonSaved,
                isCartOpen,
                setIsCartOpen,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
