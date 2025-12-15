import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import NotificationContainer from '../components/notifications/NotificationContainer';
import type { NotificationItem, NotificationType, NotificationContextType } from '../types/notification';

const NotificationContext = createContext<NotificationContextType | null>(null);

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export function NotificationProvider({ children }: NotificationProviderProps) {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const addNotification = useCallback((
    message: string, 
    type: NotificationType = 'info', 
    duration: number = 5000
  ) => {
    const id = Date.now() + Math.random();
    setNotifications(prev => [...prev, { id, message, type, duration }]);

    if (duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, duration);
    }
  }, []);

  const removeNotification = useCallback((id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const success = useCallback((message: string, duration?: number) => {
    addNotification(message, 'success', duration);
  }, [addNotification]);

  const error = useCallback((message: string, duration: number = 7000) => {
    addNotification(message, 'error', duration);
  }, [addNotification]);

  const warning = useCallback((message: string, duration?: number) => {
    addNotification(message, 'warning', duration);
  }, [addNotification]);

  const info = useCallback((message: string, duration?: number) => {
    addNotification(message, 'info', duration);
  }, [addNotification]);

  return (
    <NotificationContext.Provider value={{ success, error, warning, info }}>
      {children}
      <NotificationContainer 
        notifications={notifications} 
        removeNotification={removeNotification} 
      />
    </NotificationContext.Provider>
  );
}
