# Frontend Documentation - ft_transcendence
*Documentation for Development Team*

## 🎯 Quick Start for Teammates

### What We Built
A modern web frontend for our ping pong game platform with:
- **Authentication system** (Login/Register/2FA/Google OAuth)
- **Home dashboard** with game modes
- **Real-time backend integration**
- **Responsive design**

### Get Running in 2 Minutes
```bash
cd ft_transcendence/frontend
npm install
npm run dev
# Visit: http://localhost:5173/home/
```

## 🗂️ Project Structure (What Goes Where)

```
frontend/
├── 📁 src/                    # ⚡ Our TypeScript code
│   ├── auth/authHandler.ts    # 🔐 Login/Register logic
│   └── home/home.ts           # 🏠 Home page logic
├── 📁 auth/                   # 📄 Auth HTML pages
│   ├── login.html             # Login form
│   ├── register.html          # Registration form  
│   └── auth.css               # Auth styling
├── 📁 home/                   # 📄 Home HTML pages
│   ├── index.html             # Main dashboard
│   └── style_home.css         # Home styling
└── 📁 assets/                 # 🖼️ Images & static files
```

### 📝 File Responsibilities

| File | What It Does | When You Edit It |
|------|--------------|------------------|
| `src/auth/authHandler.ts` | Handles login, register, 2FA | Adding auth features |
| `src/home/home.ts` | Home page interactions | Adding game modes/nav |
| `auth/login.html` | Login form UI | Changing login design |
| `auth/register.html` | Register form UI | Changing register design |
| `home/index.html` | Main dashboard UI | Adding dashboard features |

## 🔄 How Authentication Works (For Backend Team)

### 1. User Registration
```typescript
// What frontend sends:
POST /register
{
  "username": "player123",
  "email": "player@example.com", 
  "password": "MyPassword123!",
  "confirmPassword": "MyPassword123!"
}

// What backend should return:
{ "success": true } // or { "error": "Email already exists" }
```

### 2. User Login
```typescript
// What frontend sends:
POST /login
{
  "username": "player123",
  "email": "player@example.com",
  "password": "MyPassword123!"
}

// What backend should return:
{ "Message": "succeed" } // Sets tmp_token cookie
```

### 3. 2FA Setup
```typescript
// Frontend calls:
POST /2fa/verify (with tmp_token cookie)

// Backend should return:
{
  "secret": "JBSWY3DPEHPK3PXP",
  "qrCodeImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
}
```

### 4. 2FA Verification
```typescript
// What frontend sends:
POST /2fa/login (with tmp_token cookie)
{ "code": "123456" }

// What backend should return:
{ "Message": "login succeed !" } // Sets access_token & refresh_token cookies
```

## 🚀 Adding New Features

### Adding a New Page
1. **Create HTML file**: `newpage/index.html`
2. **Create TypeScript file**: `src/newpage/newpage.ts`
3. **Create CSS file**: `newpage/style.css`
4. **Update vite.config.js**:
```javascript
input: {
  // ...existing entries...
  newpage: './newpage/index.html'
}
```

### Adding New API Calls
Edit `src/auth/authHandler.ts` or create new handler:
```typescript
async function callNewEndpoint() {
  try {
    const response = await fetch('http://localhost:3000/new-endpoint', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: 'example' }),
      credentials: 'include' // ⚠️ IMPORTANT: Includes cookies
    });
    
    const result = await response.json();
    if (response.ok) {
      // Handle success
    } else {
      // Handle error
      showError(result.error);
    }
  } catch (error) {
    showError('Network error');
  }
}
```

## 🎨 Styling Guide (For Design Changes)

### We Use Tailwind CSS
Instead of writing custom CSS, use utility classes:

```html
<!-- ❌ Don't do this -->
<div style="display: flex; justify-content: center; padding: 20px;">

<!-- ✅ Do this -->
<div class="flex justify-center p-5">
```

### Common Classes You'll Use
```css
/* Layout */
flex flex-col items-center justify-center    /* Centered column */
w-full h-screen max-w-md                     /* Full width, screen height, max width */
px-8 py-4 mb-6                               /* Padding & margin */

/* Colors */
text-white text-blue-400 text-red-500       /* Text colors */
bg-blue-500 bg-red-500/20                   /* Background colors */

/* Interactive */
hover:text-blue-300 transition-colors       /* Hover effects */
```

### Custom Components
For complex styling, we have custom CSS classes in `.css` files:
```css
.auth-card        /* Glassmorphism card effect */
.auth-input       /* Styled form inputs */
.auth-btn-primary /* Gradient buttons */
```

## 🔧 Development Workflow

### Daily Development
```bash
# 1. Start development server
npm run dev

# 2. Make changes to .ts, .html, .css files
# 3. Browser auto-refreshes with changes

# 4. Check for TypeScript errors
npm run typecheck

# 5. Build for testing
npm run build
```

### Testing Your Changes
1. **Login Flow**: Go to `/auth/login.html` → Enter credentials → Check 2FA
2. **Register Flow**: Go to `/auth/register.html` → Create account → Check validation
3. **Navigation**: Test all buttons and links work
4. **Mobile**: Check responsive design (DevTools → Mobile view)

## 🐛 Common Issues & Solutions

### "Cannot find module" Error
```bash
# Clear cache and reinstall
rm -rf node_modules
npm install
```

### TypeScript Errors
```bash
# Check for syntax errors
npm run typecheck

# Restart VS Code TypeScript server
Cmd+Shift+P → "TypeScript: Restart TS Server"
```

### Backend Connection Issues
- ✅ Backend running on `http://localhost:3000`?
- ✅ CORS enabled in backend?
- ✅ Using `credentials: 'include'` in fetch calls?

### Styling Not Working
- ✅ Tailwind CDN loaded in HTML `<head>`?
- ✅ Custom CSS file linked correctly?
- ✅ Check browser DevTools for CSS errors

## 📱 Pages & Navigation

### Current Pages
| Page | URL | Purpose | Key Features |
|------|-----|---------|--------------|
| **Home** | `/home/` | Main dashboard | Game modes, navigation |
| **Login** | `/auth/login.html` | User login | Email/password, 2FA, Google OAuth |
| **Register** | `/auth/register.html` | User registration | Form validation, password requirements |

### Navigation Flow
```
Home ← → Login ← → Register
  ↓
Game Modes (AI, PvP, Tournament)
  ↓
Profile, Friends, Settings
```

## 🔌 Backend Integration Points

### What Backend Team Needs to Know

**Required Endpoints:**
- `POST /register` - User registration
- `POST /login` - User login  
- `POST /2fa/verify` - 2FA setup
- `POST /2fa/login` - 2FA verification
- `GET /auth/google` - Google OAuth start
- `GET /auth/callback` - Google OAuth callback

**Required CORS Setup:**
```javascript
// In your backend
cors({
  origin: 'http://localhost:5173',
  credentials: true  // ⚠️ IMPORTANT
})
```

**Cookie Names We Expect:**
- `tmp_token` - Temporary token after login
- `access_token` - Main auth token after 2FA
- `refresh_token` - Token refresh

## 🎮 Game Integration (Future)

### When Adding Game Features
1. **Create game folder**: `game/pong.html`
2. **Add TypeScript**: `src/game/pong.ts`
3. **Update navigation** in `src/home/home.ts`:
```typescript
aiBtn?.addEventListener('click', () => {
  window.location.href = '../game/pong.html?mode=ai';
});
```

### Game State Management
```typescript
// Example for game data
interface GameState {
  player1Score: number;
  player2Score: number;
  gameMode: 'ai' | 'pvp' | 'tournament';
}
```

## 📚 Resources for Team

### Learning Materials
- **Tailwind CSS**: https://tailwindcss.com/docs
- **TypeScript**: https://www.typescriptlang.org/docs
- **Vite**: https://vitejs.dev/guide
- **Fetch API**: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API

### VS Code Extensions (Recommended)
- **Tailwind CSS IntelliSense** - Auto-complete for classes
- **TypeScript Importer** - Auto imports
- **Vite** - Syntax highlighting

### Browser DevTools Tips
- **F12** → Network tab → See all API calls
- **F12** → Console → See JavaScript errors  
- **F12** → Application → Check cookies
- **F12** → Elements → Test CSS changes live

## 🤝 Team Communication

### Before Making Changes
1. **Pull latest changes**: `git pull origin main`
2. **Check if someone else is working on same area**
3. **Create feature branch**: `git checkout -b feature/your-feature`

### Code Review Checklist
- [ ] TypeScript compiles without errors
- [ ] All pages load correctly
- [ ] Authentication flow works
- [ ] Mobile responsive
- [ ] No console errors
- [ ] API calls include `credentials: 'include'`

### Git Commit Messages
```bash
git commit -m "feat: add tournament mode selection"
git commit -m "fix: resolve login form validation"
git commit -m "style: improve mobile responsiveness"
git commit -m "docs: update API integration guide"
```

---

## 🆘 Need Help?

1. **Check this documentation first**
2. **Look at browser console for errors**
3. **Test with `npm run typecheck`**
4. **Ask team members**
5. **Check if backend is running**

**Happy coding! 🎮✨**