#!/bin/bash

echo "🔍 Проверка версии плагина..."

# Проверяем версию в package.json
PACKAGE_VERSION=$(grep '"version"' package.json | cut -d'"' -f4)
echo "📦 Package.json версия: $PACKAGE_VERSION"

# Проверяем версию в manifest.json
MANIFEST_VERSION=$(grep '"version"' manifest.json | cut -d'"' -f4)
echo "📋 Manifest.json версия: $MANIFEST_VERSION"

# Проверяем имя в manifest.json
MANIFEST_NAME=$(grep '"name"' manifest.json | cut -d'"' -f4)
echo "🏷️  Имя плагина: $MANIFEST_NAME"

# Определяем тип версии
if [[ $PACKAGE_VERSION == *"api"* ]]; then
    echo "✅ Текущая версия: API (синхронизация с сервером)"
elif [[ $PACKAGE_VERSION == *"local"* ]]; then
    echo "✅ Текущая версия: Local (локальное хранение)"
else
    echo "❓ Неизвестная версия"
fi

echo ""
echo "📝 Для переключения версий используйте:"
echo "   ./switch-to-api.sh    - переключиться на API версию"
echo "   ./switch-to-local.sh  - переключиться на локальную версию"