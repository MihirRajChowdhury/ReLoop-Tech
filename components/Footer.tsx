import Link from 'next/link';
import { Recycle, Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="glass-effect mt-auto border-t border-border">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <Recycle className="h-6 w-6 text-primary" />
                            <span className="font-bold text-lg">ReLoop</span>
                        </Link>
                        <p className="text-muted-foreground text-sm max-w-sm">
                            The circular economy marketplace for tech enthusiasts. functionality meets sustainability.
                            Buy, sell, harvest, and track the impact of your electronics.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Marketplace</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/marketplace?category=laptops" className="hover:text-primary">Laptops</Link></li>
                            <li><Link href="/marketplace?category=components" className="hover:text-primary">Components</Link></li>
                            <li><Link href="/marketplace?category=phones" className="hover:text-primary">Phones</Link></li>
                            <li><Link href="/marketplace?category=recyclable" className="hover:text-primary">Recyclables</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Connect</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="text-muted-foreground hover:text-primary">
                                <Github className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-muted-foreground hover:text-primary">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-muted-foreground hover:text-primary">
                                <Linkedin className="h-5 w-5" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-border flex justify-between items-center">
                    <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} ReLoop Tech. All rights reserved.</p>
                    <p className="text-xs text-muted-foreground">Built for the future.</p>
                </div>
            </div>
        </footer>
    );
}
