import categories from '@/data/categories.json';
import { NextResponse } from 'next/server';

export async function GET() {
  // Simulate API latency
  await new Promise(resolve => setTimeout(resolve, 300));

  return NextResponse.json(categories);
}

