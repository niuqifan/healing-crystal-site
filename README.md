# 东方疗愈水晶馆 - 产品目录网站

这是一个 React + Vite + TailwindCSS 的单页网站，可部署到 Vercel、Netlify、Cloudflare Pages、Render 等平台。

## 本地运行

```bash
npm install
npm run dev
```

## 构建部署

```bash
npm run build
```

构建后的静态文件在 `dist/` 文件夹。

## 部署建议

### Vercel / Netlify
- Build Command: `npm run build`
- Output Directory: `dist`

## 修改产品

产品数据在：

```txt
src/main.jsx
```

修改 `crystals` 数组即可替换产品名称、价格、图片、标签 and 分类。
