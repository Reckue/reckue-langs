# API Integration Module

Этот модуль обеспечивает интеграцию плагина с API reckue.com для работы со словарями и словами.

## Архитектура

### Основные компоненты

1. **ApiConfig** - Конфигурация API endpoints и базовые настройки
2. **ApiService** - Основной сервис для работы с API
3. **ApiWordbookAdapter** - Адаптер для совместимости с существующей архитектурой
4. **WordbookServiceFactory** - Фабрика для переключения между локальным и API режимами
5. **ApiUtils** - Утилиты для работы с API
6. **Languages** - Константы поддерживаемых языков

### Режимы работы

- **Локальный режим** - Использует chrome.storage.local (существующая функциональность)
- **API режим** - Использует reckue.com API с временной авторизацией

## Использование

### Базовое использование

```javascript
import {ApiIntegrationExample} from './src/core/api/index.js';

const integration = new ApiIntegrationExample();

// Переключение на API режим
await integration.switchToApiMode();

// Добавление слова
await integration.addWord('hello', 1);

// Переключение на локальный режим
integration.switchToLocalMode();
```

### Прямое использование API

```javascript
import {ApiService} from './src/core/api/index.js';

const apiService = new ApiService();

// Временная авторизация
await apiService.tempAuth();

// Получение словарей
const wordbooks = await apiService.getWordbooks();

// Добавление слова
await apiService.addWord('wordbookId', 'word', 1);
```

### Использование фабрики

```javascript
import {WordbookServiceFactory} from './src/core/api/index.js';

const factory = new WordbookServiceFactory(true); // API режим
const wordbookService = factory.createService();

// Инициализация API адаптера
await wordbookService.initialize();
await wordbookService.loadMainWordbook();
```

## API Endpoints

### Авторизация
- `POST /api/1/temp-users/create` - Создание временного пользователя (возвращает tempId)
- `POST /api/1/auth/tempin` - Временная авторизация с tempId
- `GET /api/1/auth/whoami` - Информация о пользователе

### Словари
- `GET /api/1/wordbooks` - Получение всех словарей
- `GET /api/1/wordbooks/main` - Основной словарь
- `GET /api/1/wordbooks/language/{language}` - Словари по языку

### Слова
- `POST /api/1/wordbook/words/{wordbookId}` - Получение слов с пагинацией
- `POST /api/1/wordbook/words` - Добавление слова
- `POST /api/1/wordbook/words/levels` - Обновление уровня слова

## Логика авторизации

Процесс временной авторизации состоит из двух этапов:

1. **Создание временного пользователя** (`/temp-users/create`)
   - Создает нового временного пользователя на сервере
   - Возвращает уникальный tempId (например: `0a4f1f49-9582-4af3-9197-913c358ec571`)
   - TempId сохраняется в `chrome.storage.local` для повторного использования

2. **Авторизация** (`/auth/tempin`)
   - Использует сохраненный tempId для авторизации
   - Возвращает JWT токен для последующих запросов
   - Если tempId отсутствует, автоматически создает нового пользователя

### Хранение данных

- TempId сохраняется в `chrome.storage.local` под ключом `tempUserId`
- При первом запуске создается новый временный пользователь
- При последующих запусках используется сохраненный tempId
- Метод `clearStoredTempId()` позволяет очистить сохраненный tempId

## Поддерживаемые языки

- ENGLISH
- RUSSIAN
- FRENCH
- SPANISH
- KOREAN
- CHINESE
- GERMAN

## Обработка ошибок

Модуль включает встроенную обработку ошибок:

- Сетевые ошибки
- Ошибки авторизации
- Ошибки валидации
- Автоматические повторные попытки

## Миграция с локального хранилища

Для перехода с локального хранилища на API:

1. Создайте экземпляр `ApiIntegrationExample`
2. Вызовите `switchToApiMode()`
3. Используйте существующие методы - они будут автоматически работать с API

## Безопасность

- Используется двухэтапная временная авторизация:
  1. Создание временного пользователя через `/temp-users/create`
  2. Авторизация через `/auth/tempin` с полученным tempId
- TempId сохраняется в `chrome.storage.local` для повторного использования
- JWT токены для аутентификации
- Валидация всех входных данных
- Безопасная обработка ошибок