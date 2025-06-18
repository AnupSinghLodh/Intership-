import React, { useState, useEffect } from 'react';
import { Bell, BellOff, X } from 'lucide-react';

export function NotificationManager() {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  useEffect(() => {
    // Show notification prompt after 5 seconds if permission is default
    const timer = setTimeout(() => {
      if (permission === 'default') {
        setShowPrompt(true);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [permission]);

  const requestNotificationPermission = async () => {
    if (!('Notification' in window)) {
      alert('This browser does not support notifications');
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      setPermission(permission);
      
      if (permission === 'granted') {
        await subscribeToNotifications();
        setShowPrompt(false);
        
        // Show welcome notification
        new Notification('Welcome to EliteStore!', {
          body: 'You\'ll now receive updates about new products and offers.',
          icon: '/icons/icon-192x192.png',
          badge: '/icons/icon-72x72.png'
        });
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
    }
  };

  const subscribeToNotifications = async () => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      try {
        const registration = await navigator.serviceWorker.ready;
        
        // In a real app, you would get this from your server
        const vapidKey = 'BEl62iUYgUivxIkv69yViEuiBIa40HI6Y0SzRi9zu0-IU0rNHXcyR6A_LR9T2QX9hb9M9q8a7b0b9c4d5e6f7g8h';
        
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: vapidKey
        });
        
        setSubscription(subscription);
        
        // In a real app, you would send this subscription to your server
        console.log('Push subscription:', JSON.stringify(subscription));
      } catch (error) {
        console.error('Error subscribing to push notifications:', error);
      }
    }
  };

  const unsubscribeFromNotifications = async () => {
    if (subscription) {
      try {
        await subscription.unsubscribe();
        setSubscription(null);
      } catch (error) {
        console.error('Error unsubscribing from push notifications:', error);
      }
    }
  };

  const sendTestNotification = () => {
    if (permission === 'granted') {
      new Notification('Test Notification', {
        body: 'This is a test notification from EliteStore!',
        icon: '/icons/icon-192x192.png',
        badge: '/icons/icon-72x72.png'
      });
    }
  };

  if (!showPrompt && permission === 'default') {
    return null;
  }

  return (
    <>
      {/* Notification Permission Prompt */}
      {showPrompt && permission === 'default' && (
        <div className="fixed bottom-4 right-4 bg-white rounded-xl shadow-lg border border-gray-200 p-6 max-w-sm z-50">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <Bell className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-900">
                Stay Updated
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Get notified about new products, deals, and order updates.
              </p>
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={requestNotificationPermission}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-3 py-2 rounded-lg transition-colors duration-200"
                >
                  Allow
                </button>
                <button
                  onClick={() => setShowPrompt(false)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium px-3 py-2 rounded-lg transition-colors duration-200"
                >
                  Not Now
                </button>
              </div>
            </div>
            <button
              onClick={() => setShowPrompt(false)}
              className="flex-shrink-0 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Notification Controls (for testing) */}
      {permission === 'granted' && (
        <div className="fixed bottom-4 left-4 space-y-2 z-50">
          <button
            onClick={sendTestNotification}
            className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg transition-colors duration-200"
            title="Send test notification"
          >
            <Bell className="h-5 w-5" />
          </button>
          
          {subscription && (
            <button
              onClick={unsubscribeFromNotifications}
              className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-full shadow-lg transition-colors duration-200"
              title="Disable push notifications"
            >
              <BellOff className="h-5 w-5" />
            </button>
          )}
        </div>
      )}
    </>
  );
}