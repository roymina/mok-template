![https://github.com/roymina/mok-template](https://img.shields.io/badge/mok-electron%2Bvite-brightgreen) 
![https://tailwindcss.com/](https://img.shields.io/badge/tailwind-v3-blue)
![https://vitejs.dev/](https://img.shields.io/badge/vite-fast-yellowgreen)
![https://vueuse.org/](https://img.shields.io/badge/%40vueuse-yes-lightgrey)
# Mok Template
一个现代Vue3+Vite+Electron+tailwindcss桌面开发模板
 
## 特性
⚡️ Vue 3, Vite 3, pnpm, ESBuild - born with fastness

🗂 基于文件的路由

📦 组件自动引入

🎨 TailwindCSS - 原子化 CSS engine.

😃 随时随地使用任何Icon图标

🔥 使用setup语法糖 `<script setup> style`

🐺 使用 @VueUse

📭 开箱即用的Login页面跳转

🎗️ 开始新建项目吧

# 如何使用

1. 使用degit初始化（推荐）

`npx degit git@github.com:roymina/mok-template.git`

2. 或者直接clone本项目(clone到本地后删除.git文件夹)
3. pnpm i, pnpm dev

## 其它
- 已添加`ElementPlus`支持，不需要的话去`vite.config.js`中移除即可
- 已配置mirror-config-china, 解决elecrton打包问题：https://www.npmjs.com/package/mirror-config-china
- 主要文件（夹）
  - src
    - main: electron nodejs 
    - preload: renderer和electron通讯
    - renderer：SPA前端（vue3+pinia+tailwind+iconify+Element Plus...） 
  - `electron.vite.config.js`中配置vite相关选项

