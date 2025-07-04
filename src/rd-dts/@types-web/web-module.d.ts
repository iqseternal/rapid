declare module "*.module.scss" {
  const classNames: Record<string, string>;
  export default classNames;
}

declare module "*.module.less" {
  const classNames: Record<string, string>;
  export default classNames;
}

declare module "*.module.css" {
  const classNames: Record<string, string>;
  export default classNames;
}

declare module "*?url" {
  const url: string;
  export default url;
}

declare module "*.scss";

declare module "*.css";

declare module "*.less";

