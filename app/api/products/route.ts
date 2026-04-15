import { NextResponse } from "next/server";
import { fetchProductsFromSources } from "@/lib/products-source";

export async function GET() {
  const data = await fetchProductsFromSources();

  if (!data.ok) {
    return NextResponse.json(data, { status: 500 });
  }

  return NextResponse.json(data);
}
