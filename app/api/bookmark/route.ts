// app/api/bookmark/route.ts

import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongoose";
import SavedProduct from "@/lib/models/savedProduct.model";
import Product from "@/lib/models/product.model";

// GET route for fetching saved products
export async function GET() {
    try {
      await connectToDB(); // Ensure DB connection
  
      // Find all saved products
      const savedProducts = await SavedProduct.find({}).populate('productId');
  
      if (!savedProducts) {
        return NextResponse.json({ message: "No saved products found" }, { status: 404 });
      }
  
      return NextResponse.json({
        message: "Saved products fetched successfully",
        data: savedProducts,
      });
    } catch (error: any) {
      return NextResponse.json({
        message: `Failed to fetch saved products: ${error.message}`,
      }, { status: 500 });
    }
  }


// POST route for bookmarking a product
export async function POST(request: Request) {
  try {
    await connectToDB(); // Make sure the database is connected

    const { productId } = await request.json();

    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    // Save the product as bookmarked
    const savedProduct = new SavedProduct({ productId });
    await savedProduct.save();

    return NextResponse.json({
      message: "Product bookmarked successfully",
      data: savedProduct,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: `Failed to bookmark product: ${error.message}`,
    }, { status: 500 });
  }
}
