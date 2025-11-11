import 'server-only';
import * as admin from 'firebase-admin';
import {Booking} from './types';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}

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
