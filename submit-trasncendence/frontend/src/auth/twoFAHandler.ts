import { getApiUrl, API_CONFIG } from '../config/api';

interface TwoFAResponse {
  Message?: string;
  message?: string;
  error?: string;
  success?: boolean;
}

class TwoFAHandler {
  constructor() {
    this.initializeEventListeners();
    this.checkTmpToken();
  }

  private checkTmpToken(): void {
    const cookies = document.cookie.split(';');
    const hasTmpToken = cookies.some(cookie => cookie.trim().startsWith('tmp_token='));
    
    if (!hasTmpToken) {
      console.log('No tmp_token found, redirecting to login');
      this.showError('Session expired. Please login again.');
      setTimeout(() => {
        window.location.href = '/auth/login.html';
      }, 2000);
    }
  }

  private initializeEventListeners(): void {
    const twoFAForm = document.getElementById('twoFAForm') as HTMLFormElement;
    const codeInput = document.getElementById('code') as HTMLInputElement;

    if (twoFAForm) {
      twoFAForm.addEventListener('submit', (e) => this.handleTwoFASubmit(e));
    }

    if (codeInput) {
      codeInput.addEventListener('input', (e) => {
        const target = e.target as HTMLInputElement;
        target.value = target.value.replace(/\D/g, '');
        
        if (target.value.length === 6) {
          setTimeout(() => {
            twoFAForm.dispatchEvent(new Event('submit'));
          }, 500);
        }
      });

      codeInput.focus();
    }
  }

  private async handleTwoFASubmit(event: Event): Promise<void> {
    event.preventDefault();
    this.removeMessages();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const code = formData.get('code') as string;

    if (!code || code.length !== 6) {
        this.showError('Please enter a valid 6-digit code.');
        return;
    }

    try {
        console.log('🔄 Submitting 2FA code...');
        
        const response = await fetch('/api/auth/2fa/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code }),
        });

        console.log('📡 2FA Response status:', response.status);
        
        const result: TwoFAResponse = await response.json();
        console.log('📨 2FA Response:', result);

        if (response.ok && result.success) {
            console.log('✅ 2FA verification successful - redirecting to home');
            this.showSuccess('Verification successful! Redirecting to home...');
            
            setTimeout(() => {
                console.log('🏠 Going to home page...');
                window.location.href = '/home/home.html';
            }, 1500);
        } else {
            // Don't log 2FA errors to console for security
            this.showError(result.error || 'Invalid verification code. Please try again.');
            
            const codeInput = document.getElementById('code') as HTMLInputElement;
            if (codeInput) {
                codeInput.value = '';
                codeInput.focus();
            }
        }
    } catch (error) {
        // Don't log 2FA errors to console for security
        this.showError('Network error occurred. Please try again.');
    }
  }

  private showError(message: string): void {
    this.removeMessages();
    const errorDiv = document.createElement('div');
    errorDiv.className = 'bg-red-500/20 border border-red-500 text-red-100 px-4 py-3 rounded-lg mb-4';
    errorDiv.textContent = message;
    
    const form = document.getElementById('twoFAForm');
    if (form) {
      form.insertBefore(errorDiv, form.firstChild);
    }
  }

  private showSuccess(message: string): void {
    this.removeMessages();
    const successDiv = document.createElement('div');
    successDiv.className = 'bg-green-500/20 border border-green-500 text-green-100 px-4 py-3 rounded-lg mb-4';
    successDiv.textContent = message;
    
    const form = document.getElementById('twoFAForm');
    if (form) {
      form.insertBefore(successDiv, form.firstChild);
    }
  }

  private removeMessages(): void {
    const existingMessages = document.querySelectorAll('.bg-red-500\\/20, .bg-green-500\\/20');
    existingMessages.forEach(msg => msg.remove());
  }
}

new TwoFAHandler();