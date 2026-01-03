'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Product {
    _id: string;
    title: string;
    price: number;
    category: string;
    condition: string;
    carbonSaved: number;
    images: string[];
}

interface CompareContextType {
    selectedProducts: Product[];
    addToCompare: (product: Product) => void;
    removeFromCompare: (productId: string) => void;
    isInCompare: (productId: string) => boolean;
    clearCompare: () => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export function CompareProvider({ children }: { children: ReactNode }) {
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

    const addToCompare = (product: Product) => {
        if (selectedProducts.length >= 3) {
            alert("You can only compare up to 3 items at a time.");
            return;
        }
        if (!selectedProducts.find(p => p._id === product._id)) {
            setSelectedProducts(prev => [...prev, product]);
        }
    };

    const removeFromCompare = (productId: string) => {
        setSelectedProducts(prev => prev.filter(p => p._id !== productId));
    };

    const isInCompare = (productId: string) => {
        return selectedProducts.some(p => p._id === productId);
    };

    const clearCompare = () => {
        setSelectedProducts([]);
    };

    return (
        <CompareContext.Provider value={{ selectedProducts, addToCompare, removeFromCompare, isInCompare, clearCompare }}>
            {children}
        </CompareContext.Provider>
    );
}

export function useCompare() {
    const context = useContext(CompareContext);
    if (!context) {
        throw new Error('useCompare must be used within a CompareProvider');
    }
    return context;
}
