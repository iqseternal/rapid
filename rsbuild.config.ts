
import { spawn } from 'child_process';

import concurrently from 'concurrently';

const buildMain = () => {

  return spawn(`pnpm -C ./packages/desktop-node run dev`);
}

const buildRenderer =  () => {

  return spawn(`pnpm -C ./packages/desktop-web run dev`);
}



const { result } = concurrently([
  `pnpm -C ./packages/desktop-node run dev`,
  `pnpm -C ./packages/desktop-web run dev`,
  `pnpm rs`
])
