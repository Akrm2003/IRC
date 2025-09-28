/**
 * Language Switcher Component
 * Simple dropdown for switching between English and Arabic
 */

import i18n from '../services/i18nService.js';

export class LanguageSwitcher {
  private container: HTMLElement;
  private isOpen: boolean = false;

  constructor(container: HTMLElement) {
    this.container = container;
    this.render();
    this.setupEventListeners();
  }

  private render(): void {
    const currentLang = i18n.getCurrentLanguage();
    const languages = i18n.getAvailableLanguages();
    const currentLanguage = languages.find(lang => lang.code === currentLang);

    this.container.innerHTML = `
      <div class="relative">
        <!-- Language Button -->
        <button id="languageBtn" class="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 transition-all duration-200 border border-slate-600/30 hover:border-slate-500/50">
          <svg class="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path>
          </svg>
          <span class="text-sm font-medium text-white hidden sm:inline">
            ${currentLanguage?.nativeName || 'English'}
          </span>
          <svg class="w-4 h-4 text-slate-400 transition-transform duration-200" id="languageChevron" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>

        <!-- Language Dropdown -->
        <div id="languageDropdown" class="hidden absolute top-full mt-2 right-0 bg-slate-800/95 backdrop-blur-xl border border-slate-600/50 rounded-xl shadow-2xl z-50 min-w-[160px] overflow-hidden">
          ${languages.map(lang => `
            <button 
              class="language-option w-full px-4 py-3 text-left hover:bg-slate-700/50 transition-colors duration-200 flex items-center justify-between ${lang.code === currentLang ? 'bg-slate-700/30 text-blue-400' : 'text-slate-200'}"
              data-lang="${lang.code}"
            >
              <div class="flex flex-col">
                <span class="font-medium">${lang.nativeName}</span>
                <span class="text-xs text-slate-400">${lang.name}</span>
              </div>
              ${lang.code === currentLang ? `
                <svg class="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
              ` : ''}
            </button>
          `).join('')}
        </div>
      </div>
    `;
  }

  private setupEventListeners(): void {
    const languageBtn = this.container.querySelector('#languageBtn') as HTMLButtonElement;
    const languageDropdown = this.container.querySelector('#languageDropdown') as HTMLElement;
    const languageChevron = this.container.querySelector('#languageChevron') as HTMLElement;

    if (!languageBtn || !languageDropdown || !languageChevron) {
      console.error('Language switcher elements not found');
      return;
    }

    // Toggle dropdown
    languageBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleDropdown();
    });

    // Language selection
    const languageOptions = this.container.querySelectorAll('.language-option');
    languageOptions.forEach(option => {
      option.addEventListener('click', async (e) => {
        e.stopPropagation();
        const langCode = (e.currentTarget as HTMLElement).getAttribute('data-lang');
        if (langCode && langCode !== i18n.getCurrentLanguage()) {
          await this.switchLanguage(langCode);
        }
        this.closeDropdown();
      });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.container.contains(e.target as Node)) {
        this.closeDropdown();
      }
    });

    // Close dropdown on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.closeDropdown();
      }
    });
  }

  private toggleDropdown(): void {
    if (this.isOpen) {
      this.closeDropdown();
    } else {
      this.openDropdown();
    }
  }

  private openDropdown(): void {
    const dropdown = this.container.querySelector('#languageDropdown') as HTMLElement;
    const chevron = this.container.querySelector('#languageChevron') as HTMLElement;
    
    if (dropdown && chevron) {
      dropdown.classList.remove('hidden');
      chevron.style.transform = 'rotate(180deg)';
      this.isOpen = true;
    }
  }

  private closeDropdown(): void {
    const dropdown = this.container.querySelector('#languageDropdown') as HTMLElement;
    const chevron = this.container.querySelector('#languageChevron') as HTMLElement;
    
    if (dropdown && chevron) {
      dropdown.classList.add('hidden');
      chevron.style.transform = 'rotate(0deg)';
      this.isOpen = false;
    }
  }

  private async switchLanguage(langCode: string): Promise<void> {
    try {
      // Show loading state
      const button = this.container.querySelector('#languageBtn span') as HTMLElement;
      const originalText = button?.textContent;
      if (button) {
        button.textContent = 'Loading...';
      }

      // Switch language
      await i18n.switchLanguage(langCode);
      
      // Re-render the component with new language
      this.render();
      this.setupEventListeners();

      // Show success message
      this.showNotification('Language changed successfully!', 'success');
      
    } catch (error) {
      console.error('Failed to switch language:', error);
      this.showNotification('Failed to change language', 'error');
      
      // Restore original state
      this.render();
      this.setupEventListeners();
    }
  }

  private showNotification(message: string, type: 'success' | 'error'): void {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full ${
      type === 'success' 
        ? 'bg-green-500/90 text-white border border-green-400/50' 
        : 'bg-red-500/90 text-white border border-red-400/50'
    }`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);

    // Animate out and remove
    setTimeout(() => {
      notification.style.transform = 'translateX(full)';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }

  /**
   * Update the component when language changes externally
   */
  public update(): void {
    this.render();
    this.setupEventListeners();
  }
}
