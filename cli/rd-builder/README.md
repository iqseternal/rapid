# Usage:

rd-builder [options] [command]

rapid插件脚手架, 用于构建 electron

## Options:

-V, --version    output the version number

-h, --help       display help for command

## Commands:

dev [options]    启用开发时脚手架

build [options]  启用构建时脚手架

help [command]   display help for command

## Examples

rd-builder dev
rd-builder dev --watch
rd-builder dev --config ./rd-builder.config.ts

rd-builder build
rd-builder build --preview


## More

### dev

Usage: rd-builder dev [options]

启用开发时脚手架

Options:

-c, --config \<string\>  指定配置文件

-p, --platform         指定构建平台

-w, --watch            是否开启 watch 模式

-h, --help             display help for command

### build

Usage: rd-builder build [options]

启用构建时脚手架

Options:

-c, --config \<string\>  指定配置文件

-p, --platform         指定构建平台

--preview              是否开启预览模式

-h, --help             display help for command
