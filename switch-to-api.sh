#!/bin/bash

echo "🔄 Переключение на API версию..."

# Создаем резервную копию оригинальных файлов
echo "📦 Создание резервных копий..."
cp src/popup.ts src/popup.ts.backup
cp src/page.ts src/page.ts.backup
cp webpack.config.js webpack.config.js.backup
cp manifest.json manifest.json.backup

# Заменяем файлы на API версии
echo "🔄 Замена файлов на API версии..."
cp src/api-popup.ts src/popup.ts
cp src/api-page.ts src/page.ts
cp webpack-api.config.js webpack.config.js
cp manifest-api.json manifest.json

# Обновляем версию в package.json
echo "📝 Обновление версии в package.json..."
sed -i 's/"version": "0.5.7-local"/"version": "0.5.7-api"/' package.json

# Собираем проект
echo "🔨 Сборка API версии..."
npm run build

echo "✅ Переключение завершено! Плагин теперь использует API reckue.com"
echo "📝 Для возврата к локальной версии запустите: ./switch-to-local.sh"