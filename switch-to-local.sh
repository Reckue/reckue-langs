#!/bin/bash

echo "🔄 Возврат к локальной версии..."

# Восстанавливаем оригинальные файлы
echo "📦 Восстановление оригинальных файлов..."
cp src/popup.ts.backup src/popup.ts
cp src/page.ts.backup src/page.ts
cp webpack.config.js.backup webpack.config.js
cp manifest.json.backup manifest.json

# Обновляем версию в package.json
echo "📝 Обновление версии в package.json..."
sed -i 's/"version": "0.5.7-api"/"version": "0.5.7-local"/' package.json

# Собираем проект
echo "🔨 Сборка локальной версии..."
npm run build

echo "✅ Возврат завершен! Плагин теперь использует локальное хранение"
echo "📝 Для переключения на API версию запустите: ./switch-to-api.sh"