
import * as path from 'path';
import * as xlsx from 'xlsx';
import * as fs from 'fs';

const workbook = xlsx.readFile(path.join(__dirname, './12133.xlsx'));

const sheetName = workbook.SheetNames[0];

const sheet = workbook.Sheets[sheetName];

const data = xlsx.utils.sheet_to_json(sheet);

data.map((item: any) => {

  console.log(item.contents.length)
});

const dataList = data;
const exposeWorkbook = xlsx.utils.book_new();
const exposeSheet = xlsx.utils.json_to_sheet(dataList);

xlsx.utils.book_append_sheet(exposeWorkbook, exposeSheet, sheetName);
xlsx.writeFile(exposeWorkbook, path.join(__dirname, './expose.xlsx'));
