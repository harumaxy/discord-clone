# setup fly postgres

## fly launch で app と同時に作成する

- `DATABASE_URL` が app の secret に入る (消してしまったら再入力)

## fly postgres create で個別に作成する

作成後に `postgres://{username}:{password}@{fly-postgres-db-name}:5432` の接続URLが表示される
これをアプリのシークレットに設置

## fly postgres create 後に、 fly postgres attach でアプリに紐づける

既にアタッチされていると失敗する？
`detach` コマンドもある

`attach` すると、された側の app の secrets に `DATABASE_URL` が追加される

```sh
fly postgres attach discord-clone-wispy-snow-4126-db -a discord-clone-wispy-snow-4126
```


## 注意点

https://fly.io/docs/postgres/getting-started/what-you-should-know/

- fly postgres はマネージドではない
  - 5日分のボリュームスナップショット
  - PGクラスターのための Firecracker VM と、相互接続のための WireGuard ネットワーク
  - Prometheus Metric (収集・アラートは別途ツールを設定)
  - OSSテンプレート
- 無いもの
  - 適切なクラスター構成プロビジョニング = 一つのリージョンで問題があると使えなくなる可能性がある
  - 自動バージョンアップ = 手動でやる (fly image update) 
  - 高度なバックアップ
  - 監視とアラート = Grafana などを別途設定する必要
  - 停止からの回復
    - ボリュームがいっぱいになったら死ぬ
  - グローバルレプリケーション = 外部のリージョンへの分散はユーザー次第。 Fly-Replay ヘッダーはそれを簡素化する
  - config の調整
  - 高度なカスタマイズ = Postgres 拡張機能など。 Postgres Flex をカスタマイズする必要がある
