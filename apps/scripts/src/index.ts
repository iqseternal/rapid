import * as fs from 'fs';
import * as path from 'path';

const source_dir = `C:\\Users\\suey\\Desktop\\worker\\gongga-laf\\functions\\`;

const function_names = [] as string[];
const function_dirs = [] as string[];

function find(parentPath: string) {
  if (fs.statSync(parentPath).isDirectory()) {
    fs.readdirSync(parentPath).forEach((subPath) => {
      const t_path = path.join(parentPath, subPath);
      if (fs.statSync(t_path).isDirectory()) find(t_path);

      if (fs.statSync(t_path).isFile()) {
        if (subPath.endsWith('.ts')) {
          function_names.push(subPath.replace('.ts', ''));
          function_dirs.push(t_path.replace(source_dir, '').replace('\\', '/'));
        }
      }
    })
  }
}

find(source_dir);

fs.writeFileSync('./function_names', function_names.join('\n'));
fs.writeFileSync('./function_dirs', function_dirs.join('\n'));

console.log(function_names, function_dirs);
