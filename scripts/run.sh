#!/bin/bash
. ~/.bashrc
cd ~/solidus
bundle exec rails server -b 0.0.0.0 > /tmp/solidus.log &
echo "サンプルサービス起動中です。数十秒後に http://$HOSTNAME.$_SANDBOX_ID.instruqt.io:3000 にアクセスしてみましょう。"
sleep 10
echo "New RelicのAPMへのアクセスリンクはこちらです。"
grep Reporting ~/solidus/log/newrelic_agent.log | sed "s|.*Reporting to: ||"
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
