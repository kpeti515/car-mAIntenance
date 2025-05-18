import { NextRequest, NextResponse } from 'next/server';
import { AppDataSource } from '@/data-source';
import { Car } from '@/entities/Car';
import { getServerSession } from 'next-auth/next'; // Import getServerSession
import { authOptions } from '../auth/authOptions'; // Import authOptions

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions); // Get user session
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

    // Check if this is the user's first car
    const existingCarsCount = await carRepo.count({
      where: { user_id: session.user.email },
    });

    const car = carRepo.create({
      ...data,
      user_id: session.user.email, // Use email as user identifier
      year: data.year ? parseInt(data.year) : null,
      initial_mileage: data.initial_mileage ? parseInt(data.initial_mileage) : null,
      purchase_date: data.purchase_date ? data.purchase_date : null,
      isDefault: existingCarsCount === 0, // Set as default if it's the first car
      lastAccessedAt: new Date(), // Set last accessed to now on creation
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

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions); // Get user session
  if (!session || !session.user || !session.user.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    const carRepo = AppDataSource.getRepository(Car);
    const cars = await carRepo.find({
      where: { user_id: session.user.email },
      order: { lastAccessedAt: { direction: 'DESC', nulls: 'LAST' } }, // Order by lastAccessedAt descending, with nulls last
    });

    return NextResponse.json(cars, { status: 200 });
  } catch (err: unknown) {
    console.error('Error in /api/cars GET:', err);
    let message = 'Failed to fetch cars';
    if (err && typeof err === 'object' && err && 'message' in err) {
      message = (err as { message?: string }).message || message;
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
