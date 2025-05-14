import { Notification } from 'electron';
import { AppInformationService } from 'rd/base/common/service/AppInformationService';

const appInformation = AppInformationService.getInstance();

/**
 * 系统通知
 */
export class NotificationService {
  public static showNotificationInfo() {
    return new Promise((resolve, reject) => {
      const notification = new Notification({
        title: appInformation.information.appName,

        subtitle: '通知',
        body: '这是一则通知',
        silent: false,
        icon: './icon.png',
        hasReply: true,
        timeoutType: 'default',
        replyPlaceholder: '默认回复',
        urgency: 'normal',
        closeButtonText: '关闭',
      });

      notification.on('close', () => {

      })
      notification.on('reply', (evt, reply) => {
        resolve(reply);
      })

      notification.show();
    })
  }
}
