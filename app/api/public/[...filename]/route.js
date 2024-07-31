import fs from "fs/promises";
import path from "path";
import { Buffer } from "buffer";
import { NextResponse } from "next/server";
import { notFound } from "next/navigation";

export async function GET(req, { params: { filename } }) {
  const filePath = path.join(
    process.cwd(),
    "images",
    "products",
    filename.join("/")
  );
  try {
    const file = await fs.readFile(filePath);
    const buffer = Buffer.from(file);
    const response = new NextResponse(buffer);
    response.headers.set("content-type", "image/png");
    return response;
  } catch {
    return notFound();
  }
}
