
import { apiPost, toNil } from '@rapid/libs';
import { Pool } from 'pg';
import { Printer } from '@suey/printer';


import ExcelJS from 'exceljs';

import * as fs from 'fs';

const workbook = new ExcelJS.stream.xlsx.WorkbookWriter({
  filename: 'output.xlsx',
  useStyles: false,
  useSharedStrings: false
});
// 创建一个工作表
const worksheet = workbook.addWorksheet('Sheet 1');

// 添加列标题
worksheet.columns = [
  { header: 'task_id', key: 'task_id', width: 20 },
  { header: 'created_at', key: 'created_at', width: 10 },
  { header: 'task_type', key: 'task_type', width: 20 },
  { header: 'business_type', key: 'business_type', width: 20 },
  { header: 'title', key: 'title', width: 20 },
  { header: 'task_owner', key: 'task_owner', width: 20 },
  { header: 'llm_args', key: 'llm_args', width: 20 },
  { header: 'model_id', key: 'model_id', width: 20 },
  { header: 'model_version', key: 'model_version', width: 20 },
  { header: 'prompt', key: 'prompt', width: 20 },
  { header: '大模型', key: '大模型', width: 20 },
  { header: 'answer', key: 'answer', width: 20 },
  { header: 'total_tokens', key: 'total_tokens', width: 20 },
  { header: 'prompt_tokens', key: 'prompt_tokens', width: 20 },
  { header: 'completion_tokens', key: 'completion_tokens', width: 20 },
];

let limit = 30, offset = 0;
let i = 0;
let errTimes = 0;

;(async function() {
  async function A() {
    i ++;

    const [err, res] = await toNil(apiPost<{
      timeout: 5000,
      data: {
        total: number;
        list: any[];
      }
    }>('https://e0wm9o.faas.xiaoduoai.com/t', {

      data: {
        sql: `
select
    dbt.id as task_id,
    dbt.business_type,
    dbt.title,
    dbt.evalue_target,
    dbt.owner as task_owner,
    dbt.llm_args,
    pv.model_id as model_id,
    pv.name as model_version,
    pv.sys_variables,
    pv.system_prompt,
    pv.user_prompt,
    pv.user_variables,
    dbd.evalue_sample,
    dbd.model_outputs,
    dbd.created_at
from
    data_mark.double_blind_task dbt
left join
    model_cloud.prompt_version pv
    on dbt.task_type = 'prompt' and COALESCE(dbt.evalue_target ->> 'model_version_id', '0')::integer = pv.id and COALESCE(dbt.evalue_target ->> 'model_version_name', '0') = pv.name
left join
    data_mark.double_blind_detail dbd
    ON dbd.task_type = 'prompt' and dbd.task_id = dbt.id

where
    dbt.task_type = 'prompt'
order by task_id desc
limit ${limit}
offset ${offset}
`
      }
    }))

    if (err) {
      Printer.printError('获取数据失败', err.data);

      errTimes ++;

      if (errTimes > 10) {
        return;
      }

      await A();
      return;
    }

    const { list } = res.data.data;

    list.forEach(li => {
      const 大模型 = Object.keys(li.model_outputs ?? {})[0] ?? '';

      const answer = (li.model_outputs ?? {})[大模型]?.answer ?? '';
      const usage = (li.model_outputs ?? {})[大模型]?.usage ?? {};


      const evalue_sample = li.evalue_sample ?? {};

      const sys_variables: string[] = li.sys_variables;
      let system_prompt = (li.system_prompt ?? '') as string;

      sys_variables.forEach(va => {
        const tva = va.replaceAll('{', '').replaceAll('}', '');
        system_prompt = system_prompt.replaceAll(`{{${tva}}}`, evalue_sample[tva] ?? '');
      })

      const user_variables = li.user_variables;
      let user_prompt = (li.user_prompt ?? '') as string;

      user_variables.forEach(va => {
        const tva = va.replaceAll('{', '').replaceAll('}', '');
        user_prompt = user_prompt.replaceAll(`{{${tva}}}`, evalue_sample[tva] ?? '');
      })

      const prompt = `${system_prompt}\n${user_prompt}`;

      const row = ({
        task_id: li.task_id,
        created_at: li.created_at,
        task_type: 'prompt',
        business_type: li.business_type,
        title: li.title,
        task_owner: li.task_owner,
        llm_args: li.llm_args,
        model_id: li.model_id,
        model_version: li.model_version,

        '大模型': 大模型,
        prompt: prompt,

        answer: answer,
        total_tokens: usage.total_tokens,
        prompt_tokens: usage.prompt_tokens,
        completion_tokens: usage.completion_tokens
      })

      worksheet.addRow(row);
    })

    Printer.printSuccess(`${i}: 写入 ${list.length} 条.`);

    if (list.length < limit) {
      return;
    }

    offset += limit;
    await new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 200);
    })
    await A();
  }

  await A();

  await workbook.commit();

  Printer.printInfo('COMMIT');
})();

