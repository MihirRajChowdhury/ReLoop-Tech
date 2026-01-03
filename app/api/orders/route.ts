import dbConnect from '@/lib/db';
import Order from '@/models/Order';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const body = await req.json();

        // Basic validation could go here
        const order = await Order.create(body);

        return NextResponse.json({ success: true, data: order }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

export async function GET(req: NextRequest) {
    try {
        await dbConnect();
        // For now, fetch all orders (admin view) or user specific orders if auth implemented
        const orders = await Order.find({}).sort({ createdAt: -1 }).populate('items.product');
        return NextResponse.json({ success: true, data: orders });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to fetch orders' }, { status: 500 });
    }
}
