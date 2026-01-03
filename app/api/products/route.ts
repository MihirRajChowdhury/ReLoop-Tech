import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

export async function GET(req: NextRequest) {
    try {
        await dbConnect();

        // Parse query params
        const { searchParams } = new URL(req.url);
        const category = searchParams.get('category');
        const condition = searchParams.get('condition');
        const search = searchParams.get('search');

        // Build Filter Query
        const query: any = { status: 'available' };

        if (category) {
            query.category = { $in: category.split(',') };
        }

        if (condition) {
            query.condition = { $in: condition.split(',') };
        }

        if (search) {
            const searchRegex = new RegExp(search, 'i');
            query.$or = [
                { title: searchRegex },
                { description: searchRegex }
            ];
        }

        const products = await Product.find(query).sort({ createdAt: -1 });

        return NextResponse.json({ success: true, data: products });
    } catch (error) {
        console.error("Fetch products error:", error);
        return NextResponse.json({ success: false, error: 'Failed to fetch products' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    // Mock POST for now
    return NextResponse.json({ success: true, data: { _id: "new_mock_id", ...await req.json() } }, { status: 201 });
}
