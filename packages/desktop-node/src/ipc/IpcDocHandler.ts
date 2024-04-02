import { IpcMain, FrameworkIpcHandler, Exception } from '@rapid/framework';
import { WindowService } from '@/service/WindowService';
import { app, dialog } from 'electron';
import { FileService } from '@/service/FileService';
import { ConvertService } from '@/service/ConvertService';
import { EXTENSIONS, EXPORTS_EXTENSIONS } from '@rapid/config/constants';
import { AppFileStorageService } from '@/service/AppStorageService';

import { RuntimeException } from '@/core';
import type { Meta2dData } from '@/../../desktop-web/node_modules/@meta2d/core';

import { Printer } from '@suey/printer';
import { PrinterService } from '@/service/PrinterService';


import * as path from 'path';
import * as fs from 'fs';

type ExportFileTypeToData = {
  [EXPORTS_EXTENSIONS.JSON]: Meta2dData;
  [EXPORTS_EXTENSIONS.PNG]: string;
  [EXPORTS_EXTENSIONS.SVG]: string;
}

@IpcMain.IpcController()
export class IpcDocHandler extends FrameworkIpcHandler {
  public readonly id = 'IpcDoc';

  @IpcMain.Handler()
  async save(windowService: WindowService, filePath: string, data: Meta2dData) {
    const ext = path.extname(filePath).substring(1);


    PrinterService.printWarn(filePath, ext);
    if (!EXTENSIONS.DOCS.EXTENSIONS.includes(ext)) throw new RuntimeException('保存的图纸文件路径扩展名不符合要求', {
      label: 'IpcDocHandler:save'
    })
    return new AppFileStorageService(filePath).save(data);
  }


  @IpcMain.Handler()
  async saveAs(windowService: WindowService, data: Meta2dData) {
    const filePath = dialog.showSaveDialogSync(windowService.window, {
      filters: [{ extensions: EXTENSIONS.DOCS.EXTENSIONS, name: EXTENSIONS.DOCS.NAME }]
    });
    if (!filePath) throw new RuntimeException('选择另存为文件路径失败', {
      label: 'IpcDocHandler:saveAs'
    })

    return this.save(windowService, filePath, data);
  }

  @IpcMain.Handler()
  async openDoc(windowService: WindowService, docPath?: string) {
    const filePath = docPath ? [docPath] : dialog.showOpenDialogSync(windowService.window, {
      filters: [{ extensions: EXTENSIONS.DOCS.EXTENSIONS, name: EXTENSIONS.DOCS.NAME }]
    });

    if (!filePath || filePath.length === 0) throw new RuntimeException('打开文件时未选择任何文件', {
      label: 'IpcDocHandler:openDoc'
    })

    const data = (await new AppFileStorageService(filePath[0]).read()).toJson<Meta2dData>();

    return {
      filename: filePath[0],
      filePath: filePath[0],
      data
    };
  }

  @IpcMain.Handler()
  async exportsDoc<FileType extends EXPORTS_EXTENSIONS>(windowService: WindowService, filetype: FileType, data: ExportFileTypeToData[FileType]) {
    const filePath = dialog.showSaveDialogSync(windowService.window, {
      filters: [{ extensions: [filetype], name: filetype }]
    });

    if (!filePath) throw new RuntimeException('选择另存为文件路径失败', {
      label: 'IpcDocHandler:exportsDoc'
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
  }

  @IpcMain.Handler()
  async importDoc<FileType extends EXPORTS_EXTENSIONS.JSON>(windowService: WindowService, filetype: FileType) {
    if (filetype === EXPORTS_EXTENSIONS.JSON) {
      const filePath = dialog.showOpenDialogSync(windowService.window, {
        filters: [{ extensions: [filetype], name: EXTENSIONS.DOCS.NAME }]
      });

      if (!filePath || filePath.length === 0) throw new RuntimeException('选择导入文件路径失败', {
        label: 'IpcDocHandler:importDoc'
      })

      return ConvertService.toJson<Meta2dData>(await FileService.readFile(filePath[0]));
    }

    throw new RuntimeException(`在导入文件时传递了错误的扩展名 ${filetype}`, {
      label: 'IpcDocHandler:importDoc'
    })
  }
}
