# 金陵札记 - 南京城市游攻略

一个使用 Next.js 15 构建的现代化南京旅游攻略网站。

## 功能特点

- 🎠 **景点展示**：30+ 精选景点，详细介绍和分类筛选
- 🍜 **美食推荐**：地道南京美食，价格和位置信息
- 🤖 **AI 顾问**：智能美食推荐和行程规划
- 📝 **游记笔记**：50+ 真实游客笔记
- 🎵 **背景音乐**：跨页面持续播放
- ❄️ **季节效果**：根据季节自动切换

## 技术栈

- **框架**: Next.js 15 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **部署**: Vercel

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm run start
```

## 项目结构

```
src/
├── app/           # 页面路由
├── components/    # React 组件
├── contexts/      # 全局状态
└── data/          # JSON 数据
```

## 部署到 Vercel

1. Fork 或 Push 此仓库到 GitHub
2. 在 [Vercel](https://vercel.com) 中导入项目
3. 自动部署完成

## 许可证

MIT License
