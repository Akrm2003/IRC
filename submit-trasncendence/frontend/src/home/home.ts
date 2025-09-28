import { requireAuth, logout } from '../router/authRouter';

console.log('📄 HOME.TS FILE LOADED');

// Single DOMContentLoaded listener
document.addEventListener('DOMContentLoaded', async () => {
  console.log('=== 🏠 HOME PAGE LOADING ===');
  console.log('URL:', window.location.href);
  console.log('Pathname:', window.location.pathname);
  console.log('Cookies on home page:', document.cookie);
  
  // Check if we have any cookies at all
  if (!document.cookie) {
    console.log('❌ NO COOKIES FOUND ON HOME PAGE!');
  } else {
    console.log('✅ Cookies found, parsing...');
    document.cookie.split(';').forEach(cookie => {
      if (cookie.trim()) {
        const [name, value] = cookie.trim().split('=');
        console.log(`  ${name}: ${value ? 'present' : 'empty'}`);
      }
    });
  }
  
  try {
    console.log('🔐 Starting authentication check...');
    const isAuthenticated = await requireAuth();
    console.log('🔐 Authentication result:', isAuthenticated);
    
    if (isAuthenticated) {
      console.log('✅ User is authenticated - setting up home page');
      setupNavigation();
      setupGameButtons();
    } else {
      console.log('❌ User not authenticated - will be redirected');
    }
  } catch (error) {
    console.error('❌ Error during authentication:', error);
  }
});

function setupNavigation() {
  // DOM elements with proper type annotations
  const homeBtn = document.getElementById('homeBtn') as HTMLButtonElement | null;
  const friendsBtn = document.getElementById('friendsBtn') as HTMLButtonElement | null;
  const profileBtn = document.getElementById('profileBtn') as HTMLButtonElement | null;
  const logoutBtn = document.getElementById('logoutBtn') as HTMLButtonElement | null;

  console.log('Setting up navigation buttons');
  console.log('Profile button found:', profileBtn !== null);

  // Navigation actions
  homeBtn?.addEventListener('click', () => {
    console.log('Home button clicked - already on home');
    window.location.href = '/home/home.html';
  });

  friendsBtn?.addEventListener('click', () => {
    console.log('Friends button clicked');
    window.location.href = '/friends/friends.html';
  });

  // Fix the profile button navigation with console log for debugging
  profileBtn?.addEventListener('click', () => {
    console.log('Profile button clicked - navigating to profile');
    window.location.href = '/profile/profile.html';
  });

  // Use the imported logout function
  logoutBtn?.addEventListener('click', async (e) => {
    e.preventDefault();
    console.log("Logout button clicked!");
    
    if (logoutBtn) {
      logoutBtn.textContent = 'Logging out...';
      logoutBtn.disabled = true;
    }
    
    await logout();
  });
}

function setupGameButtons() {
  const aiBtn = document.getElementById('aiBtn');
  const pvpBtn = document.getElementById('pvpBtn');
  const tournamentBtn = document.getElementById('tournamentBtn');
  const extraBtn = document.getElementById('extraBtn');
  
  console.log('Setting up game buttons');
  
  // Add event listeners to game buttons
  if (aiBtn) aiBtn.addEventListener('click', () => navigateToGame('ai'));
  if (pvpBtn) pvpBtn.addEventListener('click', () => navigateToGame('pvp'));
  if (tournamentBtn) tournamentBtn.addEventListener('click', () => navigateToGame('tournament'));
  if (extraBtn) extraBtn.addEventListener('click', () => navigateToGame('extra'));
}

function navigateToGame(mode: string) {
  console.log(`Navigating to ${mode} game mode`);
  
  switch (mode) {
    case 'ai':
      // Redirect to AI Pong game
      window.location.href = '/game/game_ai/index.html';
      break;
      
    case 'pvp':
      // Redirect to PvP Pong game
      window.location.href = '/game/game_pvp/index.html';
      break;
      
    case 'tournament':
      // Redirect to the tournaments page
      window.location.href = '/tournaments/tournaments.html';
      break;
      
    case 'extra':
      // Redirect to extra games
      window.location.href = '/extraGame/extraGame.html';
      break;
      
    default:
      console.error(`Unknown game mode: ${mode}`);
      alert(`${mode.toUpperCase()} game mode not found!`);
  }
}

// Export for module system
export {};

