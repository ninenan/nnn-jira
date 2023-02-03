# nnn-jira

## 初始化

```bash
yarn
```

## 启动项目

```bash
yarn start
```

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
  // ...
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
