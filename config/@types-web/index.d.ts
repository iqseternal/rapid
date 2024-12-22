
/// <reference types="../@types" />

declare module "*.module.scss" {
  const data: Record<string, string>;
  export default data;
}

declare module "*.scss";
