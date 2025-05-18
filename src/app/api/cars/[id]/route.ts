import { NextRequest, NextResponse } from 'next/server';
import { AppDataSource } from '@/data-source';
import { Car } from '@/entities/Car';
import { getServerSession } from 'next-auth/next'; // Import getServerSession
import { authOptions } from '../../auth/authOptions'; // Import authOptions

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions); // Get user session
  if (!session || !session.user || !session.user.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    const carRepo = AppDataSource.getRepository(Car);
    const car = await carRepo.findOne({ where: { id: parseInt(params.id) } });

    if (!car) {
      return NextResponse.json({ error: 'Car not found' }, { status: 404 });
    }

    return NextResponse.json(car, { status: 200 });
  } catch (err: unknown) {
    console.error('Error in /api/cars/[id] GET:', err);
    let message = 'Failed to fetch car';
    if (err && typeof err === 'object' && err && 'message' in err) {
      message = (err as { message?: string }).message || message;
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions); // Get user session
  if (!session || !session.user || !session.user.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    const carRepo = AppDataSource.getRepository(Car);
    const carId = parseInt(params.id, 10);

    const existingCar = await carRepo.findOne({ where: { id: carId } });

    if (!existingCar) {
      return NextResponse.json({ error: 'Car not found' }, { status: 404 });
    }

    const data = await req.json();

    // Update the car properties
    existingCar.make = data.make || existingCar.make;
    existingCar.model = data.model || existingCar.model;
    existingCar.year = data.year !== undefined ? parseInt(data.year) : existingCar.year;
    existingCar.vin = data.vin || existingCar.vin;
    existingCar.license_plate = data.license_plate || existingCar.license_plate;
    existingCar.nickname = data.nickname || existingCar.nickname;
    existingCar.color = data.color || existingCar.color;
    existingCar.purchase_date = data.purchase_date || existingCar.purchase_date;
    existingCar.initial_mileage = data.initial_mileage !== undefined ? parseInt(data.initial_mileage) : existingCar.initial_mileage;
    existingCar.notes = data.notes || existingCar.notes;

    await carRepo.save(existingCar);

    return NextResponse.json(existingCar, { status: 200 });
  } catch (err: unknown) {
    console.error('Error in /api/cars/[id] PUT:', err);
    let message = 'Failed to update car';
    if (err && typeof err === 'object' && err && 'message' in err) {
      message = (err as { message?: string }).message || message;
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
