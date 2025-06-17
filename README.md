# 🗳️ 金沢市選挙ポスター掲示場マッピングシステム

複数のユーザーが協力して金沢市の選挙ポスター掲示場597箇所の確認作業を効率的に行うためのWebアプリケーションです。

![System Overview](docs/images/system-overview.png)

## ✨ 主な機能

### 🎯 基本機能
- **📍 地図表示**: 国土地理院地図でのリアルタイム表示
- **📁 CSVインポート**: エクセル/CSVファイルからの一括データ読み込み
- **🎨 ステータス管理**: 未確認（赤）→ 確認済み（緑）の視覚的ステータス管理
- **🔍 検索・フィルター**: 番号、名称、住所での高速検索
- **📊 進捗統計**: リアルタイム進捗率とダッシュボード

### 🌐 マルチユーザー対応
- **👥 同時作業**: 複数ユーザーでの並列確認作業
- **⚡ リアルタイム同期**: WebSocketによる即座の状態同期
- **🔄 競合回避**: 同一箇所への重複作業防止

### 📱 レスポンシブデザイン
- **💻 PC対応**: 大画面での効率的な作業
- **📱 スマホ対応**: 現地確認時のモバイル操作
- **📝 タッチ操作**: タブレット・スマートフォン最適化

## 🏗️ システム構成

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend API   │    │   Database      │
│   (HTML/CSS/JS) │◄──►│   (Node.js)     │◄──►│   (PostgreSQL)  │
│   Leaflet.js    │    │   Express.js    │    │   Redis Cache   │
│   Socket.io     │    │   Socket.io     │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### 技術スタック

#### フロントエンド
- **HTML5/CSS3/JavaScript** - 基本構成
- **Leaflet.js** - 地図ライブラリ
- **PapaParse** - CSV解析
- **Socket.io Client** - リアルタイム通信

#### バックエンド
- **Node.js + Express** - APIサーバー
- **Socket.io** - WebSocket管理
- **PostgreSQL** - メインデータベース
- **Redis** - セッション・キャッシュ

#### インフラ
- **Docker + Docker Compose** - 開発環境
- **GitHub Actions** - CI/CD
- **Railway/Heroku** - 本番デプロイ

## 🚀 クイックスタート

### 前提条件
- Docker Desktop がインストール済み
- Git がインストール済み
- Node.js 18+ (開発時のみ)

### 1. リポジトリクローン
```bash
git clone https://github.com/your-org/kanazawa-poster-mapping.git
cd kanazawa-poster-mapping
```

### 2. 環境設定
```bash
# 環境変数ファイルをコピー
cp backend/.env.example backend/.env

# 必要に応じて設定を調整
nano backend/.env
```

### 3. 開発環境起動
```bash
# 完全セットアップ（初回のみ）
make setup

# または段階的に
make install  # 依存関係インストール
make dev      # Docker環境起動
make db-seed  # サンプルデータ投入
```

### 4. アクセス
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **pgAdmin**: http://localhost:5050 (admin@poster.local / admin)

## 📖 使用方法

### 1. CSVデータ準備
```csv
NO,ポスター掲示場名称,所在地,緯度,経度
1,金沢駅前掲示場,金沢市木ノ新保町1番1号,36.578054,136.647825
2,香林坊掲示場,金沢市香林坊2丁目,36.561389,136.656667
```

### 2. データインポート
1. サイドバーの「CSVファイルをドラッグ&ドロップ」エリアを使用
2. またはクリックしてファイル選択
3. UTF-8形式のCSVファイルを推奨

### 3. 確認作業
1. 地図上の赤いピン（未確認）をクリック
2. ポップアップの「確認する」ボタンをクリック
3. ピンが緑色（確認済み）に変更
4. 他のユーザーにもリアルタイムで反映

### 4. 進捗確認
- 上部の統計カードで全体進捗を確認
- 「進捗をエクスポート」で現在の状況をCSV出力

## 🛠️ 開発ガイド

### 開発コマンド
```bash
# 開発環境の操作
make dev          # 開発環境起動
make dev-stop     # 開発環境停止
make dev-logs     # ログ表示

# データベース操作
make db-init      # DB初期化
make db-seed      # サンプルデータ投入
make db-reset     # DB完全リセット
make db-backup    # バックアップ作成

# テスト・品質チェック
make test         # テスト実行
make lint         # リンター実行
make format       # コードフォーマット

# ユーティリティ
make status       # サービス状態確認
make health       # ヘルスチェック
make clean        # クリーンアップ
```

### プロジェクト構造
```
kanazawa-poster-mapping/
├── frontend/                 # フロントエンド
│   ├── index.html           # メインHTML
│   ├── css/                 # スタイルシート
│   └── js/                  # JavaScript
├── backend/                 # バックエンドAPI
│   ├── server.js           # メインサーバー
│   ├── routes/             # APIルート
│   ├── services/           # ビジネスロジック
│   ├── config/             # 設定ファイル
│   └── tests/              # テストファイル
├── database/               # データベース
│   └── init.sql           # 初期化SQL
├── docs/                  # ドキュメント
├── docker-compose.yml     # Docker設定
└── Makefile              # 開発用コマンド
```

## 📚 API仕様

### 主要エンドポイント

#### 掲示場データ
```http
GET    /api/locations           # 全掲示場取得
POST   /api/locations/import    # CSV一括インポート
PUT    /api/locations/:id/status # 確認状態更新
```

#### ユーザー管理
```http
POST   /api/auth/login          # ユーザーログイン
GET    /api/users              # アクティブユーザー
```

#### 統計情報
```http
GET    /api/stats              # 全体統計
GET    /api/stats/users        # ユーザー別統計
```

詳細なAPI仕様は [API Documentation](docs/api.md) を参照してください。

## 🔌 WebSocket イベント

### クライアント → サーバー
- `location_status_change` - 確認状態変更
- `user_join` - ユーザー参加通知

### サーバー → クライアント
- `location_updated` - 状態変更配信
- `user_joined` - ユーザー参加配信
- `stats_updated` - 統計更新配信

## 🧪 テスト

```bash
# 単体テスト
make test

# カバレッジ付きテスト
cd backend && npm run test:coverage

# E2Eテスト（開発中）
make test:e2e
```

## 📊 モニタリング

### ログ確認
```bash
# 全サービスログ
make dev-logs

# 個別サービスログ
make logs-backend
make logs-postgres
```

### ヘルスチェック
```bash
# システム状態確認
make status

# API ヘルスチェック
make health
```

## 🚢 デプロイ

### ステージング環境
```bash
make deploy-staging
```

### 本番環境
```bash
make deploy-prod
```

詳細なデプロイ手順は [Deployment Guide](docs/deployment.md) を参照してください。

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

詳細は [CONTRIBUTING.md](CONTRIBUTING.md) を参照してください。

## 📝 ライセンス

このプロジェクトは MIT ライセンスの下で公開されています。詳細は [LICENSE](LICENSE) ファイルを参照してください。

## 📞 サポート

- **Issue**: [GitHub Issues](https://github.com/your-org/kanazawa-poster-mapping/issues)
- **Wiki**: [プロジェクトWiki](https://github.com/your-org/kanazawa-poster-mapping/wiki)
- **Email**: poster-support@your-org.com

## 🏆 関連プロジェクト

- [金沢市オープンデータ](https://www4.city.kanazawa.lg.jp/data/open_data/)
- [国土地理院 Web API](https://maps.gsi.go.jp/development/)
- [Leaflet.js](https://leafletjs.com/)

---

**Made with ❤️ for Kanazawa City Election Management** 