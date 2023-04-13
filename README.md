# nnn-jira

## 初始化

```bash
yarn
```

## 启动项目

```bash
yarn start
```

## 打包项目

```bash
yarn build
```

[serve](https://create-react-app.dev/docs/deployment/)

打包之后本地可以安装 `serve` 启动对应的 `build` 文件，查看页面效果

## 简单说明

### 配置路径别名

1. 安装 `craco`
2. 目录新增 `craco.config.js` 文件
3. 修改 `tsconfig.json` 文件
4. 修改启动命令 `package.json` 文件

craco.config.js

```javascript
const path = require("node:path");
const resolve = (dir) => path.resolve(__dirname, dir);

module.exports = {
  webpack: {
    alias: {
      "@": resolve("src"),
      "@components": resolve("src/components"),
      "@helpers": resolve("src/helpers"),
      "@hooks": resolve("src/hooks"),
      "@constants": resolve("src/constants"),
      "@context": resolve("src/context"),
    },
  },
};
```

tsconfig.json

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@hooks/*": ["src/hooks/*"],
      "@helpers/*": ["src/helpers/*"],
      "@constants/*": ["src/constants/*"],
      "@context/*": ["src/context/*"]
    }
  }
}
```

package.json

```json
{
  "scripts": {
    "start": "craco start",
    "build": "craco build",
    "test": "craco test",
    "eject": "react-scripts eject",
    "prepare": "husky install"
  }
}
```

### grid 布局和 flex 布局的使用场景

1. 一维场景使用 flex，二维场景使用 grid
2. 内容出发使用 flex，布局出发使用 grid

#### 一维场景和二维场景

- 一维场景：只涉及到行或者列的其中一项布局
- 二维场景：同时涉及到行和列的布局

#### 内容出发和布局出发

- 内容出发：现有内容，才布局，根据内容自己的大小显示布局
- 布局出发：先布局，内容根据布局来显示

### [why-did-you-render](https://www.npmjs.com/package/@welldone-software/why-did-you-render)

用于查看你的组件为什么会都次渲染
