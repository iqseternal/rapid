import { CONFIG_ENV_MODE, CONFIG_ENV_COMMAND } from '../target.config';


export const mode = process.env.NODE_ENV ?? CONFIG_ENV_MODE.DEVELOPMENT;
export const IS_DEV = mode === CONFIG_ENV_MODE.DEVELOPMENT;
export const IS_PROD = mode === CONFIG_ENV_MODE.PRODUCTION;

export const command = process.env.npm_lifecycle_event ?? CONFIG_ENV_COMMAND.DEV;
