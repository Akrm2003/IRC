import { getApiUrl, API_CONFIG } from '../config/api';

interface QRResponse {
  secret: string;
  qrCodeUrl: string;
  qrCodeImage: string;
  error?: string;
}

interface VerifyResponse {
  Message?: string;
  error?: string;
}

class QRSetupHandler {
  constructor() {
    this.checkTmpToken();
    this.initializeEventListeners();
    this.setupQR(); // This should call /2fa/verify to GET the QR code
  }

  private checkTmpToken(): void {
    const cookies = document.cookie.split(';');
    const hasTmpToken = cookies.some(cookie => 
        cookie.trim().startsWith('tmp_token=') && 
        cookie.trim() !== 'tmp_token='
    );
    
    console.log('🍪 Checking tmp_token:', { 
        cookies: document.cookie,
        hasTmpToken 
    });
    
    if (!hasTmpToken) {
        console.log('❌ No tmp_token found, redirecting to login');
        this.showError('No temporary token found. Please login again.');
        
        // Clear any existing auth cookies
        document.cookie = 'tmp_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        
        setTimeout(() => {
            window.location.href = '/auth/login.html'; // Add .html extension
        }, 2000);
        return;
    }
    
    console.log('✅ Found tmp_token, proceeding with 2FA setup');
}

  private async setupQR(): Promise<void> {
    try {
        // First check if we have the tmp_token
        const cookies = document.cookie.split(';');
        const tmpToken = cookies.find(cookie => cookie.trim().startsWith('tmp_token='));
        
        if (!tmpToken) {
            // Don't log token errors to console for security
            throw new Error('No temporary token found');
        }

        const token = tmpToken.split('=')[1].trim();
        console.log('🔄 Fetching QR code with tmp_token:', token);

        const response = await fetch('/api/auth/2fa/verify', {
          method: 'POST',
          credentials: 'include',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Cache-Control': 'no-cache',
              'Pragma': 'no-cache',
              'X-Requested-With': 'XMLHttpRequest',
              'Cookie': `tmp_token=${token}` // Explicitly set the cookie
          },
          body: JSON.stringify({
              token: token // Send token in body as well
          })
      });

        console.log('🔍 QR setup response status:', response.status);

        if (response.ok) {
            const data: QRResponse = await response.json();
            console.log('✅ QR setup data received:', data);
            
            if (!data.qrCodeImage && !data.qrCodeUrl) {
                throw new Error('No QR code data received from server');
            }

            this.displayQRCode(data);
            
            document.getElementById('loadingState')!.style.display = 'none';
            document.getElementById('qrSetupContent')!.style.display = 'block';
        } else {
            const errorData = await response.json();
            // Don't log QR setup errors to console for security
            throw new Error(errorData.error || 'Failed to get QR code');
        }
    } catch (error) {
        // Don't log QR setup errors to console for security
        this.showError('Authentication failed. Please login again.');
        
        // Only clear cookies and redirect if it's a token error
        if (error instanceof Error && error.message.includes('token')) {
            this.clearAuthCookies();
            setTimeout(() => {
                window.location.href = '/auth/login.html';
            }, 1500);
        }
    }
}

  private displayQRCode(data: QRResponse): void {
    console.log('🖼️ Displaying QR code...');
    
    const qrCodeImage = document.getElementById('qrCodeImage') as HTMLImageElement;
    
    if (!qrCodeImage) {
        console.error('QR code image element not found');
        return;
    }

    if (data.qrCodeImage) {
        // Fix the base64 image data - remove the duplicate prefix
        const base64Data = data.qrCodeImage.replace('data:image/png;base64,', '');
        qrCodeImage.src = `data:image/png;base64,${base64Data}`;
        console.log('Setting QR code from base64 data');
    } else if (data.qrCodeUrl) {
        qrCodeImage.src = data.qrCodeUrl;
        console.log('Setting QR code from URL');
    } else {
        console.error('No valid QR code data provided');
        return;
    }

    qrCodeImage.alt = 'QR Code for 2FA setup';
    qrCodeImage.style.display = 'block';
    console.log('QR code image set successfully');
}

  private initializeEventListeners(): void {
    const verifyForm = document.getElementById('verifyForm') as HTMLFormElement;
    const codeInput = document.getElementById('code') as HTMLInputElement;

    if (verifyForm) {
      verifyForm.addEventListener('submit', (e) => this.handleVerification(e));
    }

    if (codeInput) {
      codeInput.addEventListener('input', (e) => {
        const target = e.target as HTMLInputElement;
        target.value = target.value.replace(/\D/g, '');
        
        if (target.value.length === 6) {
          setTimeout(() => {
            if (!verifyForm) return;
            
            // Use requestSubmit() instead of dispatchEvent for modern browsers
            if ('requestSubmit' in verifyForm) {
              (verifyForm as any).requestSubmit();
            } else {
              // Fallback for older browsers
              (verifyForm as HTMLFormElement).dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
            }
          }, 500);
        }
      });
    }
  }

  private async handleVerification(event: Event): Promise<void> {
    event.preventDefault();
    this.removeMessages();

    try {
        // Get tmp_token first
        const cookies = document.cookie.split(';');
        const tmpToken = cookies.find(cookie => cookie.trim().startsWith('tmp_token='));
        
        if (!tmpToken) {
            // Don't log token errors to console for security
            throw new Error('Session expired. Please login again.');
        }

        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        const code = formData.get('code') as string;

        if (!code || code.length !== 6) {
            this.showFormError('Please enter a valid 6-digit code.');
            return;
        }

        console.log('🔄 Verifying 2FA code...');
        
        const response = await fetch('/api/auth/2fa/login', {
          method: 'POST',
          credentials: 'include',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Cache-Control': 'no-cache',
              'Pragma': 'no-cache',
              'X-Requested-With': 'XMLHttpRequest'
          },
          body: JSON.stringify({ 
              code: code.trim(),
              tmp_token: tmpToken.split('=')[1].trim() // Send the tmp_token
          })
      });
        console.log('📡 2FA Response:', response);

        const result = await response.json();
        console.log('📡 2FA Response:', { status: response.status, result });

        if (response.ok && result.success) {
            console.log('✅ 2FA verification successful');
            this.showFormSuccess('2FA verified successfully! Redirecting...');
            
            // Verify we're authenticated before redirecting
            const authCheck = await fetch('/api/auth/verify-session', {
                method: 'GET',
                credentials: 'include'
            });

            if (authCheck.ok) {
                console.log('🔒 Authentication confirmed');
                setTimeout(() => {
                    console.log('🏠 Redirecting to home page...');
                    window.location.replace('/home/home.html');
                }, 1500);
            } else {
                throw new Error('Authentication failed after 2FA verification');
            }
        } else {
            throw new Error(result.error || 'Verification failed');
        }
    } catch (error) {
        // Don't log verification errors to console for security
        this.showFormError(error instanceof Error ? error.message : 'Invalid code. Please try again.');
        
        const codeInput = document.getElementById('code') as HTMLInputElement;
        if (codeInput) {
            codeInput.value = '';
            codeInput.focus();
        }
    }
}

  // Add the missing methods:
  private showFormError(message: string): void {
    this.removeMessages();
    const form = document.getElementById('verifyForm');
    if (form) {
      const errorDiv = document.createElement('div');
      errorDiv.className = 'bg-red-500/20 border border-red-500 text-red-100 px-4 py-3 rounded-lg mb-4 form-message';
      errorDiv.textContent = message;
      form.insertBefore(errorDiv, form.firstChild);
    }
  }

  private showFormSuccess(message: string): void {
    this.removeMessages();
    const form = document.getElementById('verifyForm');
    if (form) {
      const successDiv = document.createElement('div');
      successDiv.className = 'bg-green-500/20 border border-green-500 text-green-100 px-4 py-3 rounded-lg mb-4 form-message';
      successDiv.textContent = message;
      form.insertBefore(successDiv, form.firstChild);
    }
  }

  private removeMessages(): void {
    const messages = document.querySelectorAll('.form-message');
    messages.forEach(msg => msg.remove());
  }

  private showError(message: string): void {
    const loadingState = document.getElementById('loadingState');
    const errorState = document.getElementById('errorState');
    const errorMessage = document.getElementById('errorMessage');
    
    if (loadingState) loadingState.classList.add('hidden');
    if (errorState) errorState.classList.remove('hidden');
    if (errorMessage) errorMessage.textContent = message;
  }

  // Add helper method for clearing cookies
  private clearAuthCookies(): void {
    document.cookie = 'tmp_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    console.log('🗑️ Cleared auth cookies');
}
}

new QRSetupHandler();