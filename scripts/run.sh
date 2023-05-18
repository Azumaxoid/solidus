#!/bin/bash
. ~/.bashrc
cd ~/solidus
bundle exec rails server -b 0.0.0.0 > /tmp/solidus.log &
echo "サンプルサービスが起動しました。 http://$HOSTNAME.$_SANDBOX_ID.instruqt.io:8000 にアクセスしてみましょう。"
export PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
nvm install 16 && nvm use 16
cd ~/solidus/scripts/puppeteer
echo "自動テスト環境準備中"
npm i --silent
echo "自動テスト環境準備完了"
echo "テストユーザーを作成します。"
node createUsers.js
echo "テストユーザーを作成しました。"
echo "自動テストを開始します。"
node buy.js &
