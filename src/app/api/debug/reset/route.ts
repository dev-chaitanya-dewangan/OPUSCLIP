/** 
 * Debug API route for resetting data
 */

import { NextResponse } from 'next/server';
import { resetDb } from '@/lib/db';

export async function GET() {
  try {
    await resetDb();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to reset database:', error);
    return NextResponse.json({ error: 'Failed to reset database' }, { status: 500 });
  }
}