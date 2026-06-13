# 静 · 个人简历主页

一套纯静态的个人简历主页，设计融合 **苹果式简洁** 、 **东方禅意美学** 与 **现代高级前端界面**。
包含个人信息、教育经历、简介、爱好，以及一个基于 Markdown 的 **博客 / 笔记** 功能。
通过 **GitHub Actions** 自动发布到 **GitHub Pages**。

## ✨ 特性

- 🍵 **禅意 + 苹果式设计**：米纸暖色调、黛青点缀、留白节奏、Enso 圆相
- 🌗 **明暗双主题**：跟随系统并支持手动切换，偏好本地持久化
- 📝 **Markdown 笔记**：在 `posts/` 下新增文章即可，无需构建
- 📱 **响应式 + 无障碍**：移动端友好，尊重 `prefers-reduced-motion`
- 🚀 **零依赖部署**：纯 HTML/CSS/JS，GitHub Actions 一键发布

## 📁 目录结构

```
.
├── index.html              # 主页（信息 / 教育 / 简介 / 爱好 / 笔记列表）
├── post.html               # 单篇笔记阅读页（?slug=xxx）
├── assets/
│   ├── css/style.css       # 设计系统与样式
│   └── js/main.js          # 主题切换、滚动动画、笔记索引加载
├── posts/
│   ├── index.json          # 笔记清单（标题 / 日期 / 标签 / 摘要）
│   └── *.md                # 每篇笔记的 Markdown 正文
├── .github/workflows/deploy.yml   # 自动发布到 GitHub Pages
└── .nojekyll               # 跳过 Jekyll 处理
```

## ✏️ 如何修改

### 1. 个人内容
直接编辑 `index.html` 中对应的小节（姓名、信息、教育经历、爱好等）。

### 2. 新增一篇笔记
1. 在 `posts/` 下创建 `my-note.md`，写入正文（支持标准 Markdown）。
2. 在 `posts/index.json` 顶部添加一条记录：
   ```json
   {
     "slug": "my-note",
     "title": "我的新笔记",
     "date": "2026-06-13",
     "tag": "随笔",
     "summary": "一句话摘要。"
   }
   ```
   > `slug` 必须与文件名一致（不含 `.md`），且只能包含字母、数字、`-`、`_`。

提交后，列表与阅读页会自动更新。

## 🚀 部署到 GitHub Pages

仓库已包含发布工作流，**推送到 `main` 分支即自动部署**。首次需要启用 Pages：

1. 打开仓库 **Settings → Pages**；
2. **Build and deployment → Source** 选择 **GitHub Actions**；
3. 向 `main` 推送（或在 **Actions** 标签页手动运行 *Deploy to GitHub Pages*）；
4. 部署完成后，站点地址形如 `https://<用户名>.github.io/<仓库名>/`。

> 当前开发分支为 `claude/clever-dirac-vbulya`。合并到 `main` 后即可触发自动发布。

## 🔧 本地预览

```bash
# 任选其一，在仓库根目录启动一个静态服务器
python3 -m http.server 8000
# 然后浏览器访问 http://localhost:8000
```

> 直接双击 `index.html` 也能看到大部分内容，但笔记需要通过 `fetch` 加载，
> 请务必使用本地服务器预览，否则浏览器会因 `file://` 协议拦截请求。
