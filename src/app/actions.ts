'use server';

import 'server-only';
import { admin } from '@/lib/firebase-admin-sdk';

const ADMIN_UID = 'sC8s4rXwP2Z6lJ8f3tH7kY9oV1r2'; // Replace with your actual admin UID

export const isUserAdmin = async (uid: string): Promise<boolean> => {
  // In a real app, you might check custom claims
  // const user = await admin.auth().getUser(uid);
  // return user.customClaims?.admin === true;
  return uid === ADMIN_UID;
};
