// This is the main entry point for Vite - simplified approach

// Global styles that all pages need
import './auth/auth.css'
import './home/style_home.css'

// Global utilities or shared code can go here
console.log('Main entry point loaded - Vite is running');

// Optional: Add global error handling
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
});

// Optional: Add global unhandled promise rejection handling
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});

// Export empty object to make this a module
export {};