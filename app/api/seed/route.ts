import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import Review from '@/models/Review';
import { MOCK_PRODUCTS } from '@/lib/mockData';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        await dbConnect();

        // 1. Clear existing data
        await Product.deleteMany({});
        await Review.deleteMany({});

        // 2. Prepare Products (remove hardcoded string _id to let Mongo generate ObjectIds)
        const productsToInsert = MOCK_PRODUCTS.map(p => {
            const { _id, ...rest } = p; // Remove _id
            return {
                ...rest,
                status: 'available'
            };
        });

        // 3. Insert Products
        const createdProducts = await Product.insertMany(productsToInsert);

        // 4. Generate Mock Reviews
        const reviewComments = [
            { rating: 5, comment: "Absolutely amazing! Better than described." },
            { rating: 4, comment: "Good quality, fast shipping." },
            { rating: 5, comment: "Works perfectly, saved me so much money." },
            { rating: 3, comment: "Decent, but packaging could be better." },
            { rating: 5, comment: "Love the eco-friendly mission!" },
            { rating: 4, comment: "Item as described. Satisfied." },
            { rating: 5, comment: "Mint condition indeed. Will buy again." }
        ];

        const users = ["Alice", "Bob", "Charlie", "David", "Eve", "Frank", "Grace"];

        const reviewsToInsert = [];

        for (const product of createdProducts) {
            // Generate 1-3 reviews per product
            const numReviews = Math.floor(Math.random() * 3) + 1;

            for (let i = 0; i < numReviews; i++) {
                const randomReview = reviewComments[Math.floor(Math.random() * reviewComments.length)];
                const randomUser = users[Math.floor(Math.random() * users.length)];

                reviewsToInsert.push({
                    productId: product._id,
                    user: randomUser,
                    rating: randomReview.rating,
                    comment: randomReview.comment,
                    createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)) // Random past date
                });
            }
        }

        await Review.insertMany(reviewsToInsert);

        return NextResponse.json({
            success: true,
            message: "Database seeded successfully",
            counts: {
                products: createdProducts.length,
                reviews: reviewsToInsert.length
            }
        });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
