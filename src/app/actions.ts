'use server';
import * as admin from 'firebase-admin';

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  try {
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY;

    if (!projectId || !clientEmail || !privateKey) {
      console.error('Missing Firebase Admin credentials');
      console.log('projectId:', projectId);
      console.log('clientEmail:', clientEmail);
      console.log('privateKey exists:', !!privateKey);
    } else {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId,
          clientEmail,
          privateKey: privateKey.replace(/\\n/g, '\n'),
        }),
      });
      console.log('Firebase Admin initialized successfully');
    }
  } catch (error) {
    console.error('Firebase admin initialization error', error);
  }
}

export async function isUserAdmin(uid: string): Promise<boolean> {
  try {
    const userDoc = await admin
      .firestore()
      .collection('userProfile')
      .doc(uid)
      .get();
    if (userDoc.exists) {
      return userDoc.data()?.role === 'admin';
    }
    return false;
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
}
