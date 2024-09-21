import { toMakeIpcAction } from '@rapid/framework';
import { WindowService } from '@/service/WindowService';
import { app, dialog } from 'electron';
import { FileService } from '@/service/FileService';
import { ConvertService } from '@/service/ConvertService';
import {EXTENSIONS, EXPORTS_EXTENSIONS, ExtensionType} from '@rapid/config/constants';
import { AppFileStorageService } from '@/service/AppStorageService';
import { RuntimeException, TypeException } from '@/core';
import { PrinterService } from '@/service/PrinterService';
import { convertWindowService } from './middlewares';

import * as path from 'path';

const { makeIpcHandleAction, makeIpcOnAction } = toMakeIpcAction<[WindowService]>({
  handleMiddlewares: [convertWindowService]
});

namespace Meta2d {
  export type Meta2dData = Record<string, any>;

  export type Options = Record<string, any>;
}

type DocData = {
  data: Meta2d.Meta2dData;
  options: Meta2d.Options;
}

type ExportFileTypeToData = {
  [EXPORTS_EXTENSIONS.JSON]: DocData;
  [EXPORTS_EXTENSIONS.PNG]: string;
  [EXPORTS_EXTENSIONS.SVG]: string;
}

const DOC_EXTENSIONS: string[] = [EXTENSIONS.DOC];

/**
 * 保存一个文档到本地
 * @returns
 */
export const ipcRdDocSave = makeIpcHandleAction(
  'IpcDoc/save',
  [],
  async (_, filePath: string, data: DocData) => {
    const ext = path.extname(filePath).substring(1) as ExtensionType;

    PrinterService.printWarn(filePath, ext);
    if (!DOC_EXTENSIONS.includes(ext)) throw new RuntimeException('保存的图纸文件路径扩展名不符合要求', {
      label: 'IpcDocHandler:save',
      level: 'warning'
    })

    return new AppFileStorageService(filePath).save(data);
  }
);


/**
 * 另存为一个文档到本地
 * @returns
 */
export const ipcRdDocSaveAs = makeIpcHandleAction(
  'IpcDoc/saveAs',
  [],
  async (windowService, data: DocData) => {
    const filePath = dialog.showSaveDialogSync(windowService.window, {
      filters: [
        {
          extensions: [EXTENSIONS.DOC],
          name: 'rapid图纸文档'
        }
      ]
    });
    if (!filePath) throw new RuntimeException('选择另存为文件路径失败', {
      label: 'IpcDocHandler:saveAs',
      level: 'warning'
    })

    return ipcRdDocSave.action(windowService, filePath, data);
  }
);

/**
 * 从本地打开一个文档
 * @returns
 */
export const ipcRdDocOpen = makeIpcHandleAction(
  'IpcDoc/openDoc',
  [],
  async (windowService, docPath?: string) => {
    const filePath = docPath ? [docPath] : dialog.showOpenDialogSync(windowService.window, {
      filters: [
        {
          extensions: [EXTENSIONS.DOC],
          name: 'rapid图纸文档'
        }
      ]
    });

    if (!filePath || filePath.length === 0) throw new RuntimeException('打开文件时未选择任何文件', {
      label: 'IpcDocHandler:openDoc',
      level: 'warning'
    })

    const data = (await new AppFileStorageService(filePath[0]).read()).toJson<DocData>();

    return {
      filename: filePath[0],
      filePath: filePath[0],
      data
    };
  }
);

/**
 * 导出一个文档数据到本地
 * @returns
 */
export const ipcRdDocExpose = makeIpcHandleAction(
  'IpcDoc/exportsDoc',
  [],
  async <FileType extends EXPORTS_EXTENSIONS>(windowService: WindowService, filetype: FileType, data: ExportFileTypeToData[FileType]) => {
    const filePath = dialog.showSaveDialogSync(windowService.window, {
      filters: [{ extensions: [filetype], name: filetype }]
    });

    if (!filePath) throw new RuntimeException('选择另存为文件路径失败', {
      label: 'IpcDocHandler:exportsDoc',
      level: 'warning'
    })

    if (filetype === 'json') return FileService.saveFile(filePath, JSON.stringify(data, null, 2));
    else if (filetype === 'png') {
      const base64Code = (data as string).replace(/^data:image\/\w+;base64,/, '');
      return FileService.saveFile(filePath, ConvertService.toBuffer(base64Code, 'base64'));
    }
    else if (filetype === 'svg') {
      const base64Code = (data as string).replace(/^data:image\/\w+;base64,/, '');
      return FileService.saveFile(filePath, ConvertService.toBuffer(base64Code, 'base64'));
    }

    throw new TypeException('错误的导出文件类型', {
      label: 'IpcDocHandler:exportsDoc',
      level: 'error'
    })
  }
);


/**
 * 从本地导入一个文档数据
 * @returns
 */
export const ipcRdDocImport = makeIpcHandleAction(
  'IpcDoc/importDoc',
  [],
  async <FileType extends EXPORTS_EXTENSIONS.JSON>(windowService: WindowService, filetype: FileType) => {
    if (filetype === EXPORTS_EXTENSIONS.JSON) {
      const filePath = dialog.showOpenDialogSync(windowService.window, {
        filters: [
          {
            extensions: [filetype],
            name: 'rapid图纸数据文档'
          }
        ]
      });
      if (!filePath || filePath.length === 0) throw new RuntimeException('选择导入文件路径失败', {
        label: 'IpcDocHandler:importDoc',
        level: 'warning'
      })
      return ConvertService.toJson<DocData>(await FileService.readFile(filePath[0]));
    }

    throw new RuntimeException(`在导入文件时传递了错误的扩展名 ${filetype}`, {
      label: 'IpcDocHandler:importDoc'
    })
  }
);
