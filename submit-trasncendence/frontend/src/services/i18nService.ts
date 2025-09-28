/**
 * Simple but powerful internationalization service for ft_transcendence
 * Supports English and Arabic with RTL layout switching
 */

interface TranslationData {
  [key: string]: any;
}

class I18nService {
  private currentLanguage: string = 'en';
  private translations: Record<string, TranslationData> = {};
  private fallbackLanguage: string = 'en';

  constructor() {
    // Load saved language preference or detect from browser
    this.currentLanguage = this.getSavedLanguage() || this.detectBrowserLanguage();
    this.init();
  }

  /**
   * Initialize the translation service
   */
  async init(): Promise<void> {
    try {
      await this.loadLanguage(this.currentLanguage);
      this.applyLanguageSettings();
    } catch (error) {
      console.warn('Failed to load language, falling back to English:', error);
      await this.loadLanguage(this.fallbackLanguage);
      this.currentLanguage = this.fallbackLanguage;
    }
  }

  /**
   * Load translation data for a specific language
   */
  async loadLanguage(language: string): Promise<void> {
    if (this.translations[language]) {
      return; // Already loaded
    }

    try {
      const response = await fetch(`/locales/${language}.json`);
      if (!response.ok) {
        throw new Error(`Failed to load ${language} translations`);
      }
      
      this.translations[language] = await response.json();
      console.log(`✅ Loaded ${language} translations`);
    } catch (error) {
      console.error(`❌ Failed to load ${language} translations:`, error);
      throw error;
    }
  }

  /**
   * Switch to a different language
   */
  async switchLanguage(language: string): Promise<void> {
    if (language === this.currentLanguage) {
      return;
    }

    try {
      await this.loadLanguage(language);
      this.currentLanguage = language;
      this.saveLanguagePreference(language);
      this.applyLanguageSettings();
      this.updatePageContent();
      
      console.log(`🌍 Switched to ${language}`);
    } catch (error) {
      console.error(`Failed to switch to ${language}:`, error);
      throw error;
    }
  }

  /**
   * Get translation for a key with optional parameters
   */
  t(key: string, params?: Record<string, string>): string {
    const keys = key.split('.');
    let value: any = this.translations[this.currentLanguage];

    // Navigate through nested keys
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Fallback to English if key not found
        value = this.translations[this.fallbackLanguage];
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object' && fallbackKey in value) {
            value = value[fallbackKey];
          } else {
            console.warn(`Translation key not found: ${key}`);
            return key; // Return key as fallback
          }
        }
        break;
      }
    }

    if (typeof value !== 'string') {
      console.warn(`Translation key "${key}" is not a string:`, value);
      return key;
    }

    // Replace parameters if provided
    if (params) {
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        value = value.replace(new RegExp(`{{${paramKey}}}`, 'g'), paramValue);
      });
    }

    return value;
  }

  /**
   * Get current language
   */
  getCurrentLanguage(): string {
    return this.currentLanguage;
  }

  /**
   * Get available languages
   */
  getAvailableLanguages(): Array<{code: string, name: string, nativeName: string}> {
    return [
      { code: 'en', name: 'English', nativeName: 'English' },
      { code: 'ar', name: 'Arabic', nativeName: 'العربية' }
    ];
  }

  /**
   * Check if current language is RTL
   */
  isRTL(): boolean {
    return this.currentLanguage === 'ar';
  }

  /**
   * Apply language-specific settings (RTL, fonts, etc.)
   */
  private applyLanguageSettings(): void {
    const html = document.documentElement;
    
    if (this.isRTL()) {
      html.setAttribute('dir', 'rtl');
      html.setAttribute('lang', 'ar');
      document.body.style.fontFamily = '"Segoe UI", Tahoma, Arial, sans-serif';
    } else {
      html.setAttribute('dir', 'ltr');
      html.setAttribute('lang', 'en');
      document.body.style.fontFamily = '"Inter", "Segoe UI", Tahoma, Arial, sans-serif';
    }

    // Add language class for CSS targeting
    html.className = html.className.replace(/lang-\w+/g, '');
    html.classList.add(`lang-${this.currentLanguage}`);
  }

  /**
   * Update all translatable content on the current page
   */
  private updatePageContent(): void {
    // Update elements with data-i18n attribute
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach((element) => {
      const key = element.getAttribute('data-i18n');
      if (key) {
        element.textContent = this.t(key);
      }
    });

    // Update placeholder attributes
    const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
    placeholderElements.forEach((element) => {
      const key = element.getAttribute('data-i18n-placeholder');
      if (key && element instanceof HTMLInputElement) {
        element.placeholder = this.t(key);
      }
    });

    // Update title attributes
    const titleElements = document.querySelectorAll('[data-i18n-title]');
    titleElements.forEach((element) => {
      const key = element.getAttribute('data-i18n-title');
      if (key) {
        element.setAttribute('title', this.t(key));
      }
    });

    // Trigger custom event for components that need manual updates
    window.dispatchEvent(new CustomEvent('languageChanged', {
      detail: { language: this.currentLanguage, isRTL: this.isRTL() }
    }));
  }

  /**
   * Get saved language preference
   */
  private getSavedLanguage(): string | null {
    return localStorage.getItem('ft_transcendence_language');
  }

  /**
   * Save language preference
   */
  private saveLanguagePreference(language: string): void {
    localStorage.setItem('ft_transcendence_language', language);
  }

  /**
   * Detect browser language
   */
  private detectBrowserLanguage(): string {
    const browserLang = navigator.language.split('-')[0];
    const supportedLanguages = ['en', 'ar'];
    
    return supportedLanguages.includes(browserLang) ? browserLang : 'en';
  }
}

// Create global instance
const i18n = new I18nService();

// Export for use in modules
export default i18n;

// Also make it available globally for HTML usage
(window as any).i18n = i18n;
