import { NextRequest, NextResponse } from 'next/server';
import { AppDataSource } from '@/data-source';
import { Car } from '@/entities/Car';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/authOptions';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userEmail = session.user.email; // Use user email as stored in the Car entity

  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    const carRepo = AppDataSource.getRepository(Car);

    const lastAccessedCar = await carRepo.findOne({
      where: { user_id: userEmail }, // Corrected to use userEmail
      order: { lastAccessedAt: { direction: 'DESC', nulls: 'LAST' } },
    });

    return NextResponse.json(lastAccessedCar, { status: 200 });
  } catch (error) {
    console.error('Error fetching last accessed car:', error);
    return NextResponse.json({ error: 'Failed to fetch last accessed car' }, { status: 500 });
  }
}
