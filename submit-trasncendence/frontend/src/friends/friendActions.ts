import { userService } from '../services/userService';

export async function inviteToGame(friendId: number) {
    alert(`Invite to game functionality for friend #${friendId} will be implemented soon!`);
    // You would implement this with your game invitation system
}

export async function removeFriend(friendId: number, friendName: string): Promise<boolean> {
    return new Promise((resolve) => {
        // Show custom block modal
        const blockModal = document.getElementById('blockModal') as HTMLElement;
        const blockUserName = document.getElementById('blockUserName') as HTMLElement;
        const confirmBtn = document.getElementById('confirmBlockBtn') as HTMLElement;
        const cancelBtn = document.getElementById('cancelBlockBtn') as HTMLElement;
        
        if (!blockModal || !blockUserName || !confirmBtn || !cancelBtn) {
            console.error('Block modal elements not found');
            resolve(false);
            return;
        }
        
        // Set the user name in the modal
        blockUserName.textContent = friendName;
        
        // Show the modal
        blockModal.classList.remove('hidden');
        
        // Handle confirm button
        const handleConfirm = async () => {
            blockModal.classList.add('hidden');
            try {
                // Actually delete the friend behind the scenes using the delete endpoint
                await userService.removeFriend(friendId);
                showSuccess('User blocked successfully'); // Show "blocked" message
                resolve(true); // Indicate success for refresh
            } catch (error) {
                console.error('Error blocking user:', error);
                showError('Failed to block user. Please try again.');
                resolve(false);
            }
            // Clean up event listeners
            confirmBtn.removeEventListener('click', handleConfirm);
            cancelBtn.removeEventListener('click', handleCancel);
        };
        
        // Handle cancel button
        const handleCancel = () => {
            blockModal.classList.add('hidden');
            resolve(false);
            // Clean up event listeners
            confirmBtn.removeEventListener('click', handleConfirm);
            cancelBtn.removeEventListener('click', handleCancel);
        };
        
        // Add event listeners
        confirmBtn.addEventListener('click', handleConfirm);
        cancelBtn.addEventListener('click', handleCancel);
        
        // Close modal when clicking outside
        blockModal.addEventListener('click', (e) => {
            if (e.target === blockModal) {
                handleCancel();
            }
        });
    });
}

export async function respondToRequest(friendId: number, status: 'ACCEPTED' | 'DECLINED') {
    try {
        await userService.respondToFriendRequest(friendId, status);
        
        if (status === 'ACCEPTED') {
            showSuccess('Friend request accepted');
        } else {
            showSuccess('Friend request declined');
        }
        
        return true; // Indicate success for refresh
    } catch (error) {
        console.error('Error responding to friend request:', error);
        showError('Failed to process friend request. Please try again.');
        return false;
    }
}

export function setupFriendActionHandlers(loadFriendsDataCallback: () => Promise<void>) {
    document.addEventListener('click', async (e) => {
        const target = e.target as HTMLElement;
        const friendId = target.getAttribute('data-friend-id');
        
        console.log('🔥 Click detected on:', target.className, 'friendId:', friendId);
        
        if (!friendId) return;

        let shouldRefresh = false;

        if (target.classList.contains('accept-btn')) {
            shouldRefresh = await respondToRequest(parseInt(friendId), 'ACCEPTED');
        }
        else if (target.classList.contains('decline-btn')) {
            shouldRefresh = await respondToRequest(parseInt(friendId), 'DECLINED');
        }
        else if (target.classList.contains('cancel-request-btn')) {
            const friendName = target.closest('.friend-card')?.querySelector('h3')?.textContent || 'User';
            shouldRefresh = await removeFriend(parseInt(friendId), friendName);
        }
        else if (target.classList.contains('invite-btn')) {
            await inviteToGame(parseInt(friendId));
        }
        else if (target.classList.contains('remove-btn')) {
            console.log('🚫 Block button clicked for friend:', friendId);
            const friendName = target.closest('.friend-card')?.querySelector('h3')?.textContent || 'User';
            shouldRefresh = await removeFriend(parseInt(friendId), friendName);
        }

        // Refresh friends list if action was successful
        if (shouldRefresh) {
            await loadFriendsDataCallback();
        }
    });
}

function showSuccess(message: string) {
    const notification = document.createElement('div');
    notification.className = 
        'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition-all';
    notification.textContent = message;

    document.body.appendChild(notification);

    // Remove after 5 seconds
    setTimeout(() => {
        notification.classList.add('opacity-0');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

function showError(message: string) {
    const notification = document.createElement('div');
    notification.className = 
        'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition-all';
    notification.textContent = message;

    document.body.appendChild(notification);

    // Remove after 5 seconds
    setTimeout(() => {
        notification.classList.add('opacity-0');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}
