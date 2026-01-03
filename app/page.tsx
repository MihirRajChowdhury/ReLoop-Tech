'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, Recycle, Leaf, Zap, Globe, PackageCheck, Cpu } from 'lucide-react';

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 md:pt-32 md:pb-48">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="flex flex-col items-center"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary mb-8 backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
              The future of e-waste is circular
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-4xl md:text-7xl font-bold tracking-tight mb-8 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
              Tech Shouldn't Cost <br /> the Earth.
            </motion.h1>

            <motion.p variants={itemVariants} className="max-w-2xl text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed">
              Join the marketplace for upcycled electronics, harvested components, and sustainable tech.
              Track your carbon impact with every purchase.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 w-full max-w-md justify-center">
              <Button size="lg" className="rounded-full text-base h-12 px-8 shadow-lg shadow-primary/20" asChild>
                <Link href="/marketplace">
                  Start Trading <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full text-base h-12 px-8 bg-background/50 backdrop-blur-sm" asChild>
                <Link href="/sell">
                  Sell Old Tech
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Abstract 3D-like Elements (CSS Only) */}
        <div className="absolute top-1/2 left-10 -translate-y-1/2 -z-10 opacity-30 animate-pulse hidden xl:block">
          <Recycle className="w-64 h-64 text-primary/20 rotate-12" />
        </div>
        <div className="absolute top-1/3 right-10 -translate-y-1/2 -z-10 opacity-30 hidden xl:block">
          <div className="w-48 h-48 rounded-full border-2 border-primary/20 border-dashed animate-[spin_10s_linear_infinite]"></div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why ReLoop?</h2>
            <p className="text-muted-foreground">We aren't just a marketplace. We are a movement.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div
              whileHover={{ y: -5 }}
              className="glass-card p-8 rounded-2xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Cpu className="w-24 h-24" />
              </div>
              <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary">
                <PackageCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Component Verification</h3>
              <p className="text-muted-foreground leading-relaxed">
                Every listing is verified. Our AI tools help sellers identify valid parts from broken devices, ensuring you get exactly what you need.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              whileHover={{ y: -5 }}
              className="glass-card p-8 rounded-2xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Globe className="w-24 h-24" />
              </div>
              <div className="h-12 w-12 bg-green-500/10 rounded-xl flex items-center justify-center mb-6 text-green-500">
                <Leaf className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Carbon Tracking</h3>
              <p className="text-muted-foreground leading-relaxed">
                See the real-world impact of your choices. Track how many kg of CO2 you save by buying used instead of new.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              whileHover={{ y: -5 }}
              className="glass-card p-8 rounded-2xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Zap className="w-24 h-24" />
              </div>
              <div className="h-12 w-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 text-blue-500">
                <Recycle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Circular Economy</h3>
              <p className="text-muted-foreground leading-relaxed">
                Don't let tech die. Pass it on. Whether it's a vintage gaming rig or a server rack, find it a new home here.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
