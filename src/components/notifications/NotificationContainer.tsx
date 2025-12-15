import Notification from './Notification';
import type { NotificationItem } from '../../types/notification';

interface NotificationContainerProps {
  notifications: NotificationItem[];
  removeNotification: (id: number) => void;
}

export default function NotificationContainer({ 
  notifications, 
  removeNotification 
}: NotificationContainerProps) {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-md pointer-events-none">
      {notifications.map(notification => (
        <div key={notification.id} className="pointer-events-auto">
          <Notification
            notification={notification}
            onClose={() => removeNotification(notification.id)}
          />
        </div>
      ))}
    </div>
  );
}
