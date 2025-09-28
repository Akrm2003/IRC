import { requireAuth, logout } from '../router/authRouter';
import { userService, Match, ProfileResponse } from '../services/userService';

// Get DOM elements
const profileAvatar = document.getElementById('profileAvatar') as HTMLImageElement;
const profileDisplayName = document.getElementById('profileDisplayName') as HTMLElement;
const profileUsername = document.getElementById('profileUsername') as HTMLElement;
const profileEmail = document.getElementById('profileEmail') as HTMLElement;

// Stats elements
const totalMatches = document.getElementById('totalMatches') as HTMLElement;
const totalWins = document.getElementById('totalWins') as HTMLElement;
const winRate = document.getElementById('winRate') as HTMLElement;
const averageScore = document.getElementById('averageScore') as HTMLElement;

// Match history
const matchHistory = document.getElementById('matchHistory') as HTMLElement;

// Modal elements
const editProfileBtn = document.getElementById('editProfileBtn') as HTMLButtonElement;
const editProfileModal = document.getElementById('editProfileModal') as HTMLElement;
const profileForm = document.getElementById('profileForm') as HTMLFormElement;
const displayNameInput = document.getElementById('displayName') as HTMLInputElement;
const avatarUrlInput = document.getElementById('avatarUrl') as HTMLInputElement;
const cancelEditBtn = document.getElementById('cancelEditBtn') as HTMLButtonElement;

// Navigation buttons
const homeBtn = document.getElementById('homeBtn') as HTMLButtonElement;
const friendsBtn = document.getElementById('friendsBtn') as HTMLButtonElement;
const logoutBtn = document.getElementById('logoutBtn') as HTMLButtonElement;

let currentProfile: ProfileResponse | null = null;
let currentUserId: number;

document.addEventListener('DOMContentLoaded', async () => {
  console.log('Profile page loading...');
  
  // Check authentication first
  if (!await requireAuth()) {
    console.log('Not authenticated, redirecting to login');
    return;
  }
  
  console.log('User authenticated, setting up profile page');
  
  // Set up navigation
  setupNavigation();
  
  // Load profile data
  await loadProfileData();
  
  // Set up event listeners
  setupEventListeners();
});

function setupNavigation() {
  const homeBtn = document.getElementById('homeBtn') as HTMLButtonElement;
  const friendsBtn = document.getElementById('friendsBtn') as HTMLButtonElement;
  const logoutBtn = document.getElementById('logoutBtn') as HTMLButtonElement;

  homeBtn?.addEventListener('click', () => {
    window.location.href = '/home/home.html';
  });
  
  friendsBtn?.addEventListener('click', () => {
    window.location.href = '/friends/friends.html';
  });
  
  logoutBtn?.addEventListener('click', async () => {
    await logout();
  });
}

async function loadProfileData() {
  try {
    // Show loading state
    showLoading();
    
    // Get profile data
    currentProfile = await userService.getProfile();
    
    if (!currentProfile || !currentProfile.profile || currentProfile.profile.length === 0) {
      throw new Error('Profile data not found');
    }
    
    const profile = currentProfile.profile[0];
    currentUserId = profile.id;
    
    // Update UI with profile data
    updateProfileUI(profile);
    
    // Update stats UI
    updateStatsUI(currentProfile.stats);
    
    // Load match history
    await loadMatchHistory(profile.id);
    
    // Hide loading
    hideLoading();
  } catch (error) {
    console.error('Error loading profile:', error);
    showError('Failed to load profile data. Please try again later.');
    hideLoading();
  }
}

function updateProfileUI(profile: any) {
  // Always use backend URL for avatars
  const backendUrl = 'http://localhost:3000';
  profileAvatar.onerror = () => {
    profileAvatar.src = 'https://via.placeholder.com/150';
  };
  profileAvatar.src = profile.avatar_url
    ? backendUrl + profile.avatar_url + '?t=' + Date.now()
    : 'https://via.placeholder.com/150';

  profileDisplayName.textContent = profile.display_name || 'No Display Name';
  profileUsername.textContent = `@${profile.username}`;
  profileEmail.textContent = profile.email;

  // Update form inputs
  displayNameInput.value = profile.display_name || '';
  avatarUrlInput.value = profile.avatar_url || '';
}

function updateStatsUI(stats: any) {
  totalMatches.textContent = stats.totalMatches;
  totalWins.textContent = stats.totalWins;
  winRate.textContent = `${stats.winRate}%`;
  averageScore.textContent = stats.averageScore;
}

async function loadMatchHistory(userId: number) {
  try {
    const matches = await userService.getMatches(userId);
    renderMatchHistory(matches);
  } catch (error) {
    console.error('Error loading match history:', error);
    matchHistory.innerHTML = '<tr><td colspan="4" class="px-4 py-3 text-center">Failed to load match history</td></tr>';
  }
}

function renderMatchHistory(matches: Match[]) {
  if (!matches || matches.length === 0) {
    matchHistory.innerHTML = '<tr><td colspan="4" class="px-4 py-3 text-center">No matches played yet</td></tr>';
    return;
  }
  
  matchHistory.innerHTML = matches
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .map(match => {
      const isPlayer1 = match.player1Id === currentUserId;
      const opponentId = isPlayer1 ? match.player2Id : match.player1Id;
      const playerScore = isPlayer1 ? match.score_p1 : match.score_p2;
      const opponentScore = isPlayer1 ? match.score_p2 : match.score_p1;
      const won = match.winnerId === currentUserId;
      const resultClass = won ? 'text-green-500' : 'text-red-500';
      const resultText = won ? 'Won' : 'Lost';
      const date = new Date(match.createdAt).toLocaleDateString();
      
      return `
        <tr class="border-t border-slate-700">
          <td class="px-4 py-3">Player ${opponentId}</td>
          <td class="px-4 py-3 text-center">${playerScore} - ${opponentScore}</td>
          <td class="px-4 py-3 text-right font-medium ${resultClass}">${resultText}</td>
          <td class="px-4 py-3 text-right text-slate-400">${date}</td>
        </tr>
      `;
    })
    .join('');
}

function setupEventListeners() {
  // Edit profile button
  editProfileBtn.addEventListener('click', () => {
    editProfileModal.classList.remove('hidden');
  });
  
  // Cancel edit button
  cancelEditBtn.addEventListener('click', () => {
    editProfileModal.classList.add('hidden');
  });
  
  // Profile form submission
  profileForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    try {
      const displayName = displayNameInput.value.trim();
      const avatarUrl = avatarUrlInput.value.trim();
      
      await userService.updateProfile({ 
        display_name: displayName || undefined, 
        avatar_url: avatarUrl || undefined 
      });
      
      // Refresh profile data
      await loadProfileData();
      
      // Hide modal
      editProfileModal.classList.add('hidden');
      
      // Show success message
      showSuccess('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      showError('Failed to update profile. Please try again.');
    }
  });
}

function showLoading() {
  // You could implement a loading spinner here
}

function hideLoading() {
  // Hide loading spinner
}

function showSuccess(message: string) {
  alert(message); // Replace with a better UI notification
}

function showError(message: string) {
  alert(message); // Replace with a better UI notification
}

// Example: Upload avatar (replace with actual upload logic)
async function uploadAvatar(avatarFile: File) {
    // Replace '/api/upload-avatar' with your actual endpoint
    const formData = new FormData();
    formData.append('avatar', avatarFile);

    const response = await fetch('http://localhost:3000/api/upload-avatar', {
        method: 'POST',
        body: formData,
        credentials: 'include',
    });

    // After successful upload
    if (response.ok) {
        const result = await response.json();
        // Update avatar immediately with backend URL
        profileAvatar.src = 'http://localhost:3000' + result.avatar_url + '?t=' + Date.now();
        // Optionally refresh all profile data
        await loadProfileData();
        showSuccess('Avatar updated successfully!');
    } else {
        showError('Failed to upload avatar.');
    }
}