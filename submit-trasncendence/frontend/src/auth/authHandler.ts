// Type definitions
interface LoginData {
  username: string;
  email: string;
  password: string;
}

interface RegisterData extends LoginData {
  confirmPassword: string;
}

interface ApiResponse {
  Message?: string;
  message?: string;
  error?: string;
  success?: boolean;
  requires2FA?: boolean;
  hasSetup?: boolean; // This matches your backend response
}

// Main AuthHandler class
export class AuthHandler {
  // Use relative URL so it works through nginx
  private baseURL: string = '/api/auth'; // Remove localhost:5173

  constructor() {
    this.initializeEventListeners();
    this.checkAuthStatus();
  }

  private initializeEventListeners(): void {
    // Login form
    const loginForm = document.getElementById('loginForm') as HTMLFormElement;
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => this.handleLogin(e));
    }

    // Register form  
    const registerForm = document.getElementById('registerForm') as HTMLFormElement;
    if (registerForm) {
      registerForm.addEventListener('submit', (e) => this.handleRegister(e));
    }
  }

  private async checkAuthStatus(): Promise<void> {
    // Skip auth check on all auth-related pages
    if (window.location.pathname.includes('/auth/')) {
      console.log('On authentication page, skipping auth check');
      return;
    }
    
    console.log('🔍 Running auth check on page:', window.location.pathname);
    
    try {
      const response = await fetch(`${this.baseURL}/verify-session`, {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        console.log('✅ User is already authenticated');
        // We're already on a non-auth page, so we're good
      } else {
        console.log('❌ User is not authenticated');
        // Redirect to login from any non-auth page
        window.location.href = '/auth/login.html';
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
    }
  }

  private async handleLogin(event: Event): Promise<void> {
    event.preventDefault();
    this.removeMessages();

    try {
        const emailInput = document.getElementById('email') as HTMLInputElement;
        const passwordInput = document.getElementById('password') as HTMLInputElement;

        if (!emailInput || !passwordInput) {
            this.showError('Login form not properly initialized');
            return;
        }

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        const response = await fetch(`${this.baseURL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const result = await response.json();
            console.log('✅ Login response:', result);
            
            // Always redirect to QR setup first
            this.showSuccess('Login successful! Redirecting to 2FA setup...');
            setTimeout(() => {
                window.location.href = '/auth/qr-setup.html';
            }, 1000);
        } else {
            const result = await response.json();
            // Don't log authentication errors to console for security
            this.showError(result.error || result.message || 'Login failed. Please try again.');
        }
    } catch (error) {
        // Don't log authentication errors to console for security
        this.showError('An error occurred during login. Please try again.');
    }
}

  private async handleRegister(event: Event): Promise<void> {
    event.preventDefault();
    this.removeMessages();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const registerData: RegisterData = {
      username: formData.get('username') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string,
    };

    if (!this.validateRegistrationData(registerData)) {
      return;
    }

    try {
      console.log('Attempting registration with:', { username: registerData.username, email: registerData.email });
      
      const response = await fetch(`${this.baseURL}/register`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: registerData.username,
          email: registerData.email,
          password: registerData.password,
          confirmPassword: registerData.confirmPassword,
        }),
      });

      const result: ApiResponse = await response.json();
      console.log('Registration response:', result);

      if (response.ok) {
        console.log('Registration successful');
        this.showSuccess('Registration successful! Please login.');
        
        setTimeout(() => {
          this.navigateToLogin();
        }, 2000);
      } else {
        // Don't log registration errors to console for security
        this.showError(result.error || 'Registration failed. Please try again.');
      }
    } catch (error) {
      // Don't log registration errors to console for security
      this.showError('Network error occurred. Please check your connection.');
    }
  }

  private validateRegistrationData(data: RegisterData): boolean {
    if (data.password !== data.confirmPassword) {
      this.showError('Passwords do not match.');
      return false;
    }

    if (data.password.length < 8) {
      this.showError('Password must be at least 8 characters long.');
      return false;
    }

    if (!data.username || data.username.length < 3) {
      this.showError('Username must be at least 3 characters long.');
      return false;
    }

    if (!data.email || !data.email.includes('@')) {
      this.showError('Please enter a valid email address.');
      return false;
    }

    return true;
  }

  private redirectTo2FA(): void {
    // Redirect to QR setup page instead
    window.location.href = '/auth/qr-setup.html';
  }

  private navigateToHome(): void {
    window.location.href = '/home/home.html';
  }

  private navigateToLogin(): void {
    window.location.href = '/auth/login.html'; // Add .html here
  }

  private navigateToRegister(): void {
    window.location.href = '/auth/register.html'; // Add .html here
  }

  private showError(message: string): void {
    this.removeMessages();
    const errorDiv = document.createElement('div');
    errorDiv.className = 'bg-red-500/20 border border-red-500 text-red-100 px-4 py-3 rounded-lg mb-4';
    errorDiv.textContent = message;
    
    const form = document.querySelector('form');
    if (form) {
      form.insertBefore(errorDiv, form.firstChild);
    }
  }

  private showSuccess(message: string): void {
    this.removeMessages();
    const successDiv = document.createElement('div');
    successDiv.className = 'bg-green-500/20 border border-green-500 text-green-100 px-4 py-3 rounded-lg mb-4';
    successDiv.textContent = message;
    
    const form = document.querySelector('form');
    if (form) {
      form.insertBefore(successDiv, form.firstChild);
    }
  }

  private removeMessages(): void {
    const existingMessages = document.querySelectorAll('.bg-red-500\\/20, .bg-green-500\\/20');
    existingMessages.forEach(msg => msg.remove());
  }

  private isValidEmail(email: string): boolean {
    return email.includes('@') && email.includes('.');
  }
}

// Auto-initialize when module loads
new AuthHandler();