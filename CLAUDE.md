# CLAUDE.md

このファイルは、Claude Code (claude.ai/code) がこのリポジトリでコードを操作する際のガイダンスを提供します。

## プロジェクト概要

KatalogはVue開発者向けに特化して設計されたStorybookの代替となるVue 3コンポーネントカタログツールです。TypeScript、Viteを使用し、Vue 3 Composition APIパターンに従っています。

## 開発コマンド

- `pnpm dev` - Vite開発サーバーを起動
- `pnpm build` - プロジェクトをビルド（型チェック後にvite buildを実行）
- `pnpm typecheck` - vue-tscでTypeScript型チェックを実行
- `pnpm test` - Vitestでテストを実行
- `pnpm test:cov` - カバレッジ付きでテストを実行
- `pnpm check` - 型チェックとテスト両方を実行（品質ゲート）

## アーキテクチャ

### コアシステム (`src/core/`)

アプリケーションは3つの主要なコアシステムを持つモジュラーアーキテクチャに従っています：

1. **ComponentLoader** (`component-loader.ts`) - Viteのimport.meta.globを使用して`/src/components/**/*.vue`からVueコンポーネントを動的に読み込み。名前、パス、コンポーネント参照を含むコンポーネントメタデータを抽出。現在、props/emits/slotsを抽出するためのTypeScript解析のTODOがあります。

2. **ComponentSandbox** (`component-sandbox.ts`) - 依存関係のモック化によるコンポーネントの分離されたレンダリング環境を提供。グローバル状態の汚染を防ぐために別々のVueアプリインスタンスを作成。ルーター、ストア、プラグイン、グローバルプロパティのモック化をサポート。

3. **DependencyResolver** (`dependency-resolver.ts`) - Vitestモックを使用してVueエコシステムの一般的な依存関係（Vue Router、Pinia、Vue I18n）のモック化を処理。分離されたテストのために親/子コンポーネントをモック化するユーティリティを提供。

### コンポーネント構造

コンポーネントはVue 3 + TypeScriptパターンに従っています：
- `<script setup lang="ts">` 構文を使用
- TypeScriptインターフェースでpropsを定義
- TypeScriptジェネリクスで`defineEmits`を使用
- BEMライクなCSSクラス命名に従う（`.btn--variant`, `.btn--size`）

### テスト設定

- c8経由でカバレッジ付きの単体テストにVitest使用
- テストは`import.meta.vitest`パターンをインラインテストで使用
- テストファイル: `src/**/*.{test,spec}.{ts}`
- ソースファイルにテストを含めることができる: `includeSource: ["src/**/*.ts"]`

### TypeScript設定

- `@vue/tsconfig/tsconfig.dom.json`を拡張
- 厳密モード有効
- bundlerモジュール解決でES2022ターゲット
- Vitest import metaタイプを含む

## プロジェクトステータス

これは以下の特徴を持つ初期段階のプロジェクトのようです：
- 基本的なVue 3アプリ構造が配置済み
- コアのコンポーネント読み込み/サンドボックスシステムが設計されているが完全には実装されていない
- 意図されたコンポーネントカタログアプローチを示すサンプルButtonコンポーネント
- Vue向けに最適化されたStorybookライクな体験の基盤