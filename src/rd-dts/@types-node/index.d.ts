
/// <reference types="../@types" />

type BooleanString = 'true' | 'false';

declare global {


  namespace NodeJS {

    interface ProcessEnv {
      /**
       * 注入的变量, 用于在 NodeJs 中获取启动的 Web URL
       */
      readonly ELECTRON_RENDERER_URL: string;

      /**
       * node 位置
       */
      readonly NODE: string;

      ELECTRON_RUN_AS_NODE?: BooleanString;
      ELECTRON_NO_ASAR?: BooleanString;
      GOOGLE_API_KEY?: string;
      NODE_OPTIONS?: string;

      /**
       * 输出 Chromium 内部日志到文件
       */
      ELECTRON_LOG_FILE?: string;

      /**
       * 输出 Chromium 内部日志到控制台，用于调试渲染进程或底层行为
       */
      ELECTRON_ENABLE_LOGGING?: BooleanString;

      /**
       * 创建或激活新通知时，将显示额外的日志记录。在执行常见作时，也会显示这些通知：显示通知、关闭通知、单击通知按钮或回复通知。
       * @see https://www.electronjs.org/docs/latest/api/environment-variables#electron_debug_notifications
       */
      ELECTRON_DEBUG_NOTIFICATIONS?: BooleanString;

      /**
       * 当 Electron 从 ASAR 文件中读取时，将读取偏移量和文件路径记录到 tmpdir 系统 .生成的文件可以提供给 ASAR 模块 以优化文件排序。
       * @see https://www.electronjs.org/docs/latest/api/environment-variables#electron_log_asar_reads
       */
      ELECTRON_LOG_ASAR_READS?: BooleanString;

      /**
       * 当 Electron 崩溃时，将堆栈跟踪打印到控制台。
       * 如果 crashReporter 已启动，则此环境变量将不起作用。
       * @see https://www.electronjs.org/docs/latest/api/environment-variables#electron_enable_stack_dumping
       */
      ELECTRON_ENABLE_STACK_DUMPING?: BooleanString;

      /**
       * 崩溃时显示系统原生错误对话框，而非静默退出(仅 Windows)
       */
      ELECTRON_DEFAULT_ERROR_MODE?: BooleanString;

      /**
       * 禁用全局菜单栏，强制使用窗口内菜单栏(仅 linux)
       */
      ELECTRON_FORCE_WINDOW_MENU_BAR?: BooleanString;

      /**
       * 禁止附加到当前控制台会话，避免日志输出冲突(仅 Windows)
       */
      ELECTRON_NO_ATTACH_CONSOLE?: BooleanString;

      /**
       * 设置文件删除的底层实现，可选 gio（默认）、gvfs-trash 等 (仅 Linux)
       */
      ELECTRON_TRASH?: 'gio' | 'gvfs-trash' | 'trash-cli' | 'kioclient5' | 'kioclient';

      /**
       * 指定自定义 Electron 构建路径，覆盖默认的 npm install 版本
       */
      ELECTRON_OVERRIDE_DIST_PATH?: string;

      ELECTRON_DISABLE_SECURITY_WARNINGS?: BooleanString;
    }
  }
}

export { };
