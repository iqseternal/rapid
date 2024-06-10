import 'vue-router';
import type * as icons from '@ant-design/icons-vue/lib/icons';
import type * as assrtUrls from '@renderer/assets';

export type IconRealKey = keyof typeof icons;

export type IconLikeKey = `icon-${string}`;

declare module "vue-router" {
  interface RouteMeta {
    // 设置该路由在侧边栏和面包屑中展示的名字
    title?: string;

    fullpath?: string;

    // 面包屑对应的标题 -> 展示的描述
    crumbsTitle?: string;
    // 面包屑name -> 简短精简的name, 默认是 title
    crumbsName?: string;
    // 面包屑路径
    curmbsMeta?: Required<RouteMeta & { name: string; }>[]; // { name: string; } 补充 route.name 用户展开菜单, 这样展开标识每一项


    icon?: IconRealKey | IconLikeKey;

    // 设置该路由的图标, 暂时是一个 path 路径
    svg?: string;

    // 默认 false，设置 true 的时候该路由不会在侧边栏出现
    hidden?: boolean;

    // 设置该路由进入的权限，支持多个权限叠加, 适合对用户角色的分类
    roles?: string[];

    // 权限, 取决于采用哪种形式, 如果使用下面这种形式, 那么就是动态叠加的权限
    // 采用二进制, 每一位对应一种权限, 如果查看是否拥有用 | 运算, 如果要添加权限, 使用 & 运算
    permission?: number;
  }
}


export {};
