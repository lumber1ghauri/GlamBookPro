'use client';

import { useFirebase } from '@/firebase/provider';
import type { User } from 'firebase/auth';

/**
 * Defines the return shape for the useUser hook.
 */
export interface UserHookResult {
  user: User | null;
  isUserLoading: boolean;
  userError: Error | null;
}

/**
 * A hook specifically for accessing the authenticated user's state.
 * It provides the User object, loading status, and any authentication errors.
 * This hook is the recommended way to access user information in your components.
 *
 * @returns {UserHookResult} An object containing the user, loading state, and error state.
 */
export const useUser = (): UserHookResult => {
  // This hook now safely consumes the state from the central FirebaseContext
  const { user, isUserLoading, userError } = useFirebase();
  return { user, isUserLoading, userError };
};
