
import { CONFIG } from '#/constants';
import { Notification } from 'electron';
import icon from '#/../resources/icon.png?asset';

/**
 * 系统通知
 */
export class NotificationService {
  static showNotificationInfo() {
    return new Promise((resolve, reject) => {
      const notification = new Notification({
        title: CONFIG.PROJECT,
        subtitle: '通知',
        body: '这是一则通知',
        silent: false,
        icon,
        hasReply: true,
        timeoutType: 'default',
        replyPlaceholder: '默认回复',
        urgency: 'normal',
        closeButtonText: '关闭',
      });

      if (notification.hasReply) {
        resolve(1);
      }

      notification.show();
    })
  }
}
