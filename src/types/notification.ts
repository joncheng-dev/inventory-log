export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface NotificationItem {
  id: number;
  message: string;
  type: NotificationType;
  duration: number;
}

export interface NotificationContextType {
  success: (message: string, duration?: number) => void;
  error: (message: string, duration?: number) => void;
  warning: (message: string, duration?: number) => void;
  info: (message: string, duration?: number) => void;
}

export interface NotificationConfig {
  icon: React.ComponentType;
  bgColor: string;
  borderColor: string;
  textColor: string;
  iconColor: string;
}
