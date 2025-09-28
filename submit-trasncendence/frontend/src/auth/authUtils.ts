// Auth utility functions

export function getAuthToken(): string | null {
  return localStorage.getItem('authToken');
}

export function isAuthenticated(): boolean {
  return !!getAuthToken();
}

export function logout(): void {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
  window.location.href = '/auth/login.html';
}

export function getCurrentUser(): User | null {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
}

// Import the User type from our types file
import { User } from '../tournament/types';
