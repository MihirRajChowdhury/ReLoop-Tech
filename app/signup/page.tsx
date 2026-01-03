'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function SignupPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4 py-24">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md glass-card p-8 rounded-2xl shadow-xl"
            >
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2">Create an Account</h1>
                    <p className="text-muted-foreground">Join the ReLoop movement today.</p>
                </div>

                <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium" htmlFor="first-name">First name</label>
                            <input id="first-name" placeholder="Max" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium" htmlFor="last-name">Last name</label>
                            <input id="last-name" placeholder="Robinson" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium" htmlFor="email">Email</label>
                        <input type="email" id="email" placeholder="m@example.com" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium" htmlFor="password">Password</label>
                        <input type="password" id="password" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium" htmlFor="role">I am a...</label>
                        <select id="role" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                            <option value="buyer">Buyer / Hobbyist</option>
                            <option value="seller">Seller / Recycler</option>
                        </select>
                    </div>

                    <Button className="w-full" size="lg">Sign Up</Button>
                </form>

                <div className="mt-6 text-center text-sm">
                    Already have an account?{' '}
                    <Link href="/login" className="font-semibold text-primary hover:underline">
                        Sign in
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
