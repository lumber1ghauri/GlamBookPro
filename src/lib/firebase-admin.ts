import 'server-only';
import { admin } from '@/lib/firebase-admin-sdk';
import {Booking} from './types';

export const getAllBookingsForServer = async (): Promise<Booking[]> => {
  const firestore = admin.firestore();
  const bookings: Booking[] = [];
  const usersSnapshot = await firestore.collection('users').get();
  for (const userDoc of usersSnapshot.docs) {
    const bookingsSnapshot = await userDoc.ref.collection('bookings').get();
    bookingsSnapshot.forEach((doc) => {
      bookings.push({id: doc.id, ...doc.data()} as Booking);
    });
  }
  return bookings;
};
