/** 
 * Debug API route for seeding data
 */

import { NextResponse } from 'next/server';
import { resetDb, initializeDb } from '@/lib/db';

export async function GET() {
  try {
    // Reset the database first
    await resetDb();
    
    // Reinitialize with fixtures
    await initializeDb();
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to seed database:', error);
    return NextResponse.json({ error: 'Failed to seed database' }, { status: 500 });
  }
}