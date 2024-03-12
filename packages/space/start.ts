import { defineStartConfig } from './vite.config.util';
import type { DevConfig, BuildConfig } from './vite.config.util';
import { PLATFORMS, ENV } from './target.config';
import { printError } from '@suey/printer';
import { spawn } from 'cross-spawn';

// const appWeb = spawn('pnpm dev', [], {
//   stdio: 'inherit'
// });

// const doc = spawn('pnpm docs:dev', [], {
//   stdio: 'inherit'
// });

// appWeb.on('exit', () => doc.kill());
// appWeb.on('error', (err) => {
//   // printError(err.message);
// })

// appWeb.on('message', (message) => {
//   console.log(message.toString());
// })


// export default defineStartConfig(({ env, plactform }) => {
//   const devConfig: DevConfig = {
//     lint: {


//     },
//     docs: {
//       autoStart: true
//     }
//   }

//   const buildConfig: BuildConfig = {

//   }


//   return { devConfig, buildConfig }
// })



