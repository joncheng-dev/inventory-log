import { useEffect, useState } from 'react';
import { CheckIcon, ErrorIcon, WarningIcon, InfoIcon, CloseIcon } from './icons';
import type { NotificationItem, NotificationConfig, NotificationType } from '../../types/notification';

interface NotificationProps {
  notification: NotificationItem;
  onClose: () => void;
}

export default function Notification({ notification, onClose }: NotificationProps) {
  const { type, message, duration } = notification;
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (duration > 0) {
      // Start exit animation 300ms before removal
      const exitTimer = setTimeout(() => {
        setIsExiting(true);
      }, duration - 300);

      return () => clearTimeout(exitTimer);
    }
  }, [duration]);

  const config: Record<NotificationType, NotificationConfig> = {
    success: {
      icon: CheckIcon,
      bgColor: 'bg-green-50',
      borderColor: 'border-green-500',
      textColor: 'text-green-800',
      iconColor: 'text-green-600'
    },
    error: {
      icon: ErrorIcon,
      bgColor: 'bg-red-50',
      borderColor: 'border-red-500',
      textColor: 'text-red-800',
      iconColor: 'text-red-600'
    },
    warning: {
      icon: WarningIcon,
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-500',
      textColor: 'text-yellow-800',
      iconColor: 'text-yellow-600'
    },
    info: {
      icon: InfoIcon,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-500',
      textColor: 'text-blue-800',
      iconColor: 'text-blue-600'
    }
  };

  const { icon: Icon, bgColor, borderColor, textColor, iconColor } = config[type];

  return (
    <div 
      className={`${bgColor} ${textColor} border-l-4 ${borderColor} p-4 rounded-lg shadow-lg flex items-start gap-3 min-w-80 transition-all duration-300 ${
        isExiting ? 'animate-slide-out' : 'animate-slide-in'
      }`}
      role="alert"
      onClick={onClose}
    >
      <div className={iconColor}>
        <Icon />
      </div>
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button
        className={`${textColor} hover:opacity-70 transition-opacity flex-shrink-0`}
        aria-label="Close notification"
      >
        <CloseIcon />
      </button>
    </div>
  );
}
