import Product from "@/models/Product";
import dbConnect from "@/helpers/dbConnect";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
  await dbConnect();

  const products = await Product.find();
  return NextResponse.json(products);
}
