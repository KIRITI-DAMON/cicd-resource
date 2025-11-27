
import { User, UserRole } from "@/types";
import { mockUsers } from "./data";

export interface Credentials {
  email: string;
  password?: string;
}

export interface SignUpCredentials extends Credentials {
  name: string;
  role: UserRole;
}

const AUTH_STORAGE_KEY = 'synergy-ems-auth-user';
const API_BASE_URL = 'http://localhost:8060/api/auth';

// --- Auth State ---

let currentUser: User | null = null;
const listeners: ((user: User | null) => void)[] = [];

if (typeof window !== 'undefined') {
  try {
    const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);
    if (storedUser) {
      currentUser = JSON.parse(storedUser);
    }
  } catch (error) {
    console.error("Failed to parse user from localStorage", error);
  }
}

function notifyListeners() {
  listeners.forEach(listener => listener(currentUser));
}

function handleAuthSuccess(user: User) {
    currentUser = user;
    try {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(currentUser));
    } catch (error) {
        console.error("Failed to save user to localStorage", error);
    }
    notifyListeners();
    return user;
}

// --- Auth Functions ---

/**
 * Signs a user in by calling the backend API.
 * @param credentials The user's email and password.
 * @returns A promise that resolves with the User object.
 */
export const signIn = async (credentials: Credentials): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed.");
    }

    const user = await response.json();
    return handleAuthSuccess(user);
};

/**
 * Signs a new user up by calling the backend API.
 * @param credentials The new user's details.
 * @returns A promise that resolves with the new User object.
 */
export const signUp = async (credentials: SignUpCredentials): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Sign up failed.");
    }
    
    const user = await response.json();
    return handleAuthSuccess(user);
};


/**
 * Signs a user out by calling the backend API.
 * @returns A promise that resolves when sign-out is complete.
 */
export const signOut = async (): Promise<void> => {
    // We can optimistically remove the user from the client.
    currentUser = null;
    try {
        localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (error) {
        console.error("Failed to remove user from localStorage", error);
    }
    notifyListeners();
    
    // Attempt to sign out from the server, but don't block on it.
    try {
        await fetch(`${API_BASE_URL}/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error("Failed to sign out from server:", error);
    }
};


/**
 * Simulates a listener for auth state changes, like Firebase's onAuthStateChanged.
 * @param callback The function to call when the auth state changes.
 * @returns An unsubscribe function.
 */
export const onAuthStateChanged = (callback: (user: User | null) => void): (() => void) => {
  // Immediately call the listener with the current user state
  callback(currentUser);

  // Add the listener to the list
  listeners.push(callback);

  // Return an unsubscribe function
  return () => {
    const index = listeners.indexOf(callback);
    if (index > -1) {
      listeners.splice(index, 1);
    }
  };
};

// Renaming mock functions for backward compatibility with components that might still use them.
export { signIn as mockSignIn, signUp as mockSignUp, signOut as mockSignOut, onAuthStateChanged as onMockAuthStateChanged };
