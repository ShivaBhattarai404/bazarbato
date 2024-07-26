import Product from "@/model/Product";
import dbConnect from "@/helpers/dbConnect";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
  console.time("fetching products");
  await dbConnect();

  const products = await Product.find();
  console.timeEnd("fetching products");
  return NextResponse.json(products);
}
