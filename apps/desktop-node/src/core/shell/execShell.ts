
import { exec } from "child_process";

export const execShell = (shell: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    exec(shell, (error, data: string) => {
      if (error) {
        reject();

        return;
      }

      resolve(data);
    });
  });
}
