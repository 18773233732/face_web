打开 terminal 命令行界面

git 克隆本项目 `git clone https://github.com/18773233732/face_web.git`

进入项目目录 `cd face_web`

首先确保本机安装 node 版本最好是高一点 例如 16.13.2

## 使用 npm

安装依赖 `npm install `

跑前端项目 `npm start`

## 使用 yarn

安装依赖 `yarn`

跑前端项目 `yarn start`

## 关于代理后端接口

代理文件地址 `face_web/config/proxy.ts`

### 使用线上代理

修改部分内容

```typescript
  dev: {
    // localhost:8000/api/** -> https://preview.pro.ant.design/api/**
    '/api': {
      // 要代理的地址
      target: 'http://124.221.107.247:8088',
      // 配置了这个可以从 http 代理到 https
      // 依赖 origin 的功能可能需要这个，比如 cookie
      changeOrigin: true,
    },
  },
```

### 使用本机跑后端的代理

```typescript
  dev: {
    // localhost:8000/api/** -> https://preview.pro.ant.design/api/**
    '/api': {
      // 要代理的地址
      target: 'http://127.0.0.1:8088',
      // 配置了这个可以从 http 代理到 https
      // 依赖 origin 的功能可能需要这个，比如 cookie
      changeOrigin: true,
    },
  },
```

### 查看项目

`npm start` 或者 `yarn start` 之后浏览器访问本机地址 `http://localhost:8000` 如果 8000 端口被占用会递增寻找空闲端口，terminal 终端会有提示
