import dbConnect from '@/lib/db';
import Review from '@/models/Review';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const productId = searchParams.get('productId');

        if (!productId) {
            return NextResponse.json({ success: false, error: 'Product ID is required' }, { status: 400 });
        }

        const reviews = await Review.find({ productId }).sort({ createdAt: -1 });

        return NextResponse.json({ success: true, data: reviews });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to fetch reviews' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const body = await req.json();

        // Basic validation
        if (!body.productId || !body.user || !body.rating || !body.comment) {
            return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
        }

        const review = await Review.create(body);

        return NextResponse.json({ success: true, data: review }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
