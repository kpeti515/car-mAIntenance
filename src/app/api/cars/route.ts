import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/authOptions';
import { AppDataSource } from '@/data-source';
import { Car } from '@/entities/Car';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let data;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  // Validate required fields
  if (!data.make || !data.model) {
    return NextResponse.json({ error: 'Make and model are required' }, { status: 400 });
  }

  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    const carRepo = AppDataSource.getRepository(Car);
    const car = carRepo.create({
      ...data,
      user_id: session.user.email, // Use email as user identifier
      year: data.year ? parseInt(data.year) : null,
      initial_mileage: data.initial_mileage ? parseInt(data.initial_mileage) : null,
      purchase_date: data.purchase_date ? data.purchase_date : null,
    });
    await carRepo.save(car);
    return NextResponse.json(car, { status: 201 });
  } catch (err: unknown) {
    console.error('Error in /api/cars POST:', err);
    let message = 'Failed to add car';
    if (err && typeof err === 'object' && err && 'message' in err) {
      message = (err as { message?: string }).message || message;
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
