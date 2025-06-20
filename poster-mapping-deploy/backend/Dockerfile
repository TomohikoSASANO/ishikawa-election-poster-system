# Node.js バックエンド用 Dockerfile
FROM node:18-alpine

# curlをインストール（ヘルスチェック用）
RUN apk add --no-cache curl

# 作業ディレクトリを設定
WORKDIR /app

# パッケージファイルをコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm ci --only=production

# アプリケーションファイルをコピー
COPY . .

# ログディレクトリを作成
RUN mkdir -p logs

# ポートを公開
EXPOSE 3001

# ヘルスチェック
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3001/health || exit 1

# アプリケーションを起動
CMD ["npm", "start"] 