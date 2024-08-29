# 使用官方的 Node.js 18 镜像作为基础镜像
FROM node

# 设置工作目录
WORKDIR /app

# 安装 pnpm
RUN npm config set registry https://registry.npmmirror.com

# 复制 package.json 和 pnpm-lock.yaml 文件到工作目录
COPY package.json pnpm-lock.yaml ./

# 安装依赖
RUN npm install

# 复制应用程序代码到工作目录
COPY . .

# 构建应用程序
RUN npm run build

# 暴露应用程序运行的端口（假设你的应用运行在 3000 端口）
EXPOSE 3000

# 运行应用程序
CMD ["node", "dist/main"]
