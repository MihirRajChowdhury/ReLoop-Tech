import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

// We need to access params from the context argument
// In Next.js App Router, dynamic route params are passed as the second argument to the route handler
export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> } // params is now a Promise in newer Next.js versions often, but usually just { params } type works if not awaited. Let's stick safe.
) {
    // Await params if necessary or treat as normal object depending on Next.js version. 
    // Types imply waiting might be good but let's try standard standard access first or await if it's a promise.
    // Actually, in Next.js 15+ params is async. Next 16.1.1.
    // So `params` is a Promise.

    try {
        await dbConnect();

        const resolvedParams = await params;
        const id = resolvedParams.id;

        const product = await Product.findById(id);

        if (!product) {
            return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: product });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to fetch product' }, { status: 500 });
    }
}
