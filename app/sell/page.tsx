'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Camera, Loader2, CheckCircle, Tag } from 'lucide-react';
import Image from 'next/image';

export default function SellPage() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState<any | null>(null);
    const [isListed, setIsListed] = useState(false);

    const handleList = () => {
        setIsListed(true);
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
            setAnalysisResult(null);
            setIsListed(false);

            // Simulate AI Analysis
            setIsAnalyzing(true);
            setTimeout(() => {
                setIsAnalyzing(false);
                setAnalysisResult({
                    item: "NVIDIA GeForce RTX 3070",
                    condition: "Good",
                    estimatedValue: 320,
                    confidence: 94
                });
            }, 2500);
        }
    };

    return (
        <div className="min-h-screen bg-background pt-24 pb-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">Turn E-Waste into Cash</h1>
                    <p className="text-muted-foreground text-lg">
                        Upload a photo of your old tech. Our AI will identify sellable components and estimate their value.
                    </p>
                </div>

                {!selectedImage ? (
                    <div className="glass-card p-12 rounded-2xl border-2 border-dashed border-primary/20 hover:border-primary/50 transition-colors text-center cursor-pointer group relative">
                        <input
                            type="file"
                            accept="image/*"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            onChange={handleImageUpload}
                        />
                        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                            <Camera className="w-10 h-10 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Upload Photo</h3>
                        <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                            Drag and drop your image here, or click to browse. We support JPG, PNG, and HEIC.
                        </p>
                        <Button size="lg" className="rounded-full pointer-events-none">
                            <Upload className="mr-2 h-4 w-4" /> Select Image
                        </Button>
                    </div>
                ) : isListed ? (
                    <div className="glass-card p-12 rounded-2xl text-center space-y-6 animate-in zoom-in duration-500">
                        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                            <CheckCircle className="w-10 h-10 text-green-500" />
                        </div>
                        <h2 className="text-3xl font-bold">Item Listed Successfully!</h2>
                        <p className="text-muted-foreground max-w-sm mx-auto">
                            Your {analysisResult?.item} is now live on the marketplace. We'll notify you when someone shows interest.
                        </p>
                        <div className="flex gap-4 justify-center">
                            <Button asChild>
                                <a href="/marketplace">View Marketplace</a>
                            </Button>
                            <Button variant="outline" onClick={() => { setSelectedImage(null); setIsListed(false); }}>
                                List Another
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="glass-card p-6 rounded-2xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <div className="relative rounded-xl overflow-hidden aspect-square border border-border">
                                <img src={selectedImage} alt="Uploaded" className="w-full h-full object-cover" />
                                {isAnalyzing && (
                                    <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center flex-col">
                                        <div className="scan-line absolute w-full h-1 bg-primary/50 top-0 left-0 animate-[scan_2s_ease-in-out_infinite]"></div>
                                        <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
                                        <p className="font-bold text-lg animate-pulse">Analyzing Component...</p>
                                    </div>
                                )}
                            </div>

                            <div>
                                {isAnalyzing ? (
                                    <div className="space-y-4">
                                        <div className="h-8 bg-secondary rounded w-3/4 animate-pulse"></div>
                                        <div className="h-4 bg-secondary rounded w-1/2 animate-pulse"></div>
                                        <div className="h-24 bg-secondary rounded w-full animate-pulse"></div>
                                    </div>
                                ) : analysisResult ? (
                                    <div className="space-y-6 animate-in slide-in-from-right-10 fade-in duration-500">
                                        <div className="flex items-center gap-2 text-green-500 text-sm font-bold uppercase tracking-wide mb-2">
                                            <CheckCircle className="w-4 h-4" /> Analysis Complete
                                        </div>
                                        <h2 className="text-3xl font-bold">{analysisResult.item}</h2>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="p-4 bg-secondary/50 rounded-lg">
                                                <p className="text-xs text-muted-foreground uppercase">Condition</p>
                                                <p className="font-bold text-lg">{analysisResult.condition}</p>
                                            </div>
                                            <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                                                <p className="text-xs text-primary/80 uppercase">Est. Value</p>
                                                <p className="font-bold text-2xl text-primary">${analysisResult.estimatedValue}</p>
                                            </div>
                                        </div>

                                        <p className="text-muted-foreground text-sm">
                                            Based on our AI analysis, this item appears to be a functional {analysisResult.item}.
                                            We've identified it with {analysisResult.confidence}% confidence.
                                        </p>

                                        <div className="flex gap-3 pt-4">
                                            <Button size="lg" className="w-full" onClick={handleList}>List for Sale</Button>
                                            <Button variant="outline" size="lg" onClick={() => setSelectedImage(null)}>Try Another</Button>
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </div>
                )}

                <div className="mt-12">
                    <h3 className="font-bold text-xl mb-6">How it works</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div>
                            <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">1</div>
                            <h4 className="font-semibold mb-2">Snap</h4>
                            <p className="text-sm text-muted-foreground">Take a clear photo of your device or component.</p>
                        </div>
                        <div>
                            <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">2</div>
                            <h4 className="font-semibold mb-2">Scan</h4>
                            <p className="text-sm text-muted-foreground">Our AI identifies parts (RAM, HDD, Screen) and condition.</p>
                        </div>
                        <div>
                            <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">3</div>
                            <h4 className="font-semibold mb-2">Sell</h4>
                            <p className="text-sm text-muted-foreground">List instantly on the marketplace or sell to recyclers.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
