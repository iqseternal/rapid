
import type { CurrentDeviceInterface, DeviceType } from 'current-device';
import device from 'current-device';

/**
 * 合并多个classname类名,
 *
 * <div className={combinationCName(类名1, 类名2, { [类名3]: 布尔值, [类名4]: 布尔值 }, .....)}></div>
 *
 * @param args
 * @return
 */
export const combinationCName = (...args: (string | undefined | Record<string, boolean>)[]) => {
  const classNameList: string[] = [];

  args.forEach(arg => {
    if (!arg) return;
    if (typeof arg === 'string') {
      classNameList.push(arg);
      return;
    }

    for (const key in arg) {
      if (arg[key]) classNameList.push(key);
    }
  });

  return classNameList.join(' ');
}

export const isDevice = (type: DeviceType) => {
  if (type === 'desktop') return device.desktop();

  if (type === 'mobile') return device.mobile();

  if (type === 'tablet') return device.tablet();

  return (typeof device[type] === 'function') ? device[type]() : false;
}
