# API Integration Module

Этот модуль обеспечивает интеграцию плагина с API reckue.com для работы со словарями и словами.

## Архитектура

### Основные компоненты

1. **ApiConfig** - Конфигурация API endpoints и базовые настройки
2. **ApiService** - Основной сервис для работы с API
3. **ApiWordbookAdapter** - Адаптер для совместимости с существующей архитектурой
4. **ApiWordbook** - Класс для работы со словарями в API режиме
5. **ApiSettingsService** - Сервис для работы с настройками через API
6. **WordbookServiceFactory** - Фабрика для создания API сервисов
7. **ApiUtils** - Утилиты для работы с API
8. **Languages** - Константы поддерживаемых языков

### Режим работы

- **API режим** - Использует reckue.com API с временной авторизацией

## Использование

### Базовое использование

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

const factory = new WordbookServiceFactory();
const wordbookService = factory.createService();

// Инициализация API адаптера
await wordbookService.initialize();
await wordbookService.loadMainWordbook();
```

### Использование настроек

```javascript
import {ApiSettingsService} from './src/core/api/index.js';

const settingsService = new ApiSettingsService();

// Инициализация
await settingsService.initialize();

// Получение настроек
const settings = settingsService.getSettings();

// Обновление настройки
await settingsService.updateSetting('enable', false);
```

## API Endpoints

### Авторизация
- `POST /api/1/temp-users/create` - Создание временного пользователя (возвращает tempId)
- `POST /api/1/auth/tempin` - Временная авторизация с tempId
- `GET /api/1/auth/whoami` - Информация о пользователе

### Словари
- `GET /api/1/wordbooks` - Получение всех словарей
- `POST /api/1/wordbooks` - Создание нового словаря
- `GET /api/1/wordbooks/main` - Основной словарь (с fallback логикой)
- `GET /api/1/wordbooks/language/{language}` - Словари по языку

### Слова
- `POST /api/1/wordbook/words/{wordbookId}` - Получение слов с пагинацией
- `POST /api/1/wordbook/words` - Добавление слова
- `POST /api/1/wordbook/words/levels` - Обновление уровня слова

## Логика работы со словарями

### Получение основного словаря

Метод `getMainWordbook()` включает fallback логику:

1. **Попытка получения основного словаря** (`GET /api/1/wordbooks/main`)
2. **Если словарь не найден** (ошибка 500 с сообщением "Current user hasn't wordbooks"):
   - Автоматически создается новый основной словарь (`POST /api/1/wordbooks`)
   - Язык определяется из настроек пользователя (russian, english, china, korean)
   - По умолчанию используется English
3. **Повторная попытка получения** основного словаря после создания

### Создание словаря

При создании словаря используется POST запрос с телом:
```json
{
  "language": "English"
}
```

Поддерживаемые языки: English, Russian, Chinese, Korean, French, Spanish, German

## Логика авторизации

Процесс временной авторизации состоит из двух этапов:

1. **Создание временного пользователя**:
   - POST запрос к `/api/1/temp-users/create`
   - Возвращает tempId (строка)

2. **Временная авторизация**:
   - POST запрос к `/api/1/auth/tempin` с tempId в body
   - Возвращает token и userId

### Особенности авторизации

- TempId создается заново при каждом вызове tempAuth()
- TempId не сохраняется между сессиями
- Авторизация действительна только для текущей сессии

## Миграция с Local Storage

### Удаленные компоненты

- `Store.js` - Класс для работы с chrome.storage.local
- `WordbookService.js` - Локальная реализация сервиса словарей
- `Wordbook.js` - Локальная реализация словаря
- `Pages.js` - Класс для пагинации в локальном режиме

### Новые компоненты

- `ApiWordbook.js` - Класс для работы со словарями в API режиме
- `ApiSettingsService.js` - Сервис для работы с настройками через API

### Изменения в существующих компонентах

- `App.js` - Убрана fallback логика на локальный режим
- `WordbookServiceFactory.js` - Убрана поддержка локального режима
- `PageService.js` - Использует ApiSettingsService вместо Store
- `SettingsService.js` - Использует ApiSettingsService вместо chrome.storage.local