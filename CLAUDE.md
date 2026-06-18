# Reckue Languages (reckue-langs)

Chrome-расширение (Manifest V3) — интерактивный словарь: пользователь кликает слова на любой странице, они сохраняются, подсвечиваются и превращаются в карточки.

Стек: JavaScript + TypeScript (миграция в процессе), сборка Webpack 5 + ts-loader. Точки входа: `src/page.ts`, `src/popup.tsx` → `dist/page/page.js`, `dist/popup/popup.js`.

## Архитектура: две независимые поверхности

- **Content script (`src/page/*`, бандл `page.js`)** — vanilla TS/JS, прямая работа с DOM хост-страницы (парсинг, подсветка, попапы). React/Preact сюда НЕ применять. Разметка — обычные template-литералы (`HTMLMapper.toElement(html)`); CSS подключается как сырой текст через webpack `asset/source` (`{test: /\.css$/, type: 'asset/source'}`). Активный путь `PageManager.run` — фактически debug-прототип с проблемами производительности (layout thrashing, синхронный обход DOM).
- **Popup (`src/popup/ui/*`, бандл `popup.js`)** — **Preact** (`src/popup.tsx` → `render(<App/>)`). Компоненты: `App`, `Navbar`, `WordbookView`, `SettingsView`, `InfoBar`. Слой данных (`src/core/words/*`: `WordbookService`, `Wordbook`, `Word`) — общий, vanilla, НЕ трогать React'ом. UI попапа на pug/ручном DOM удалён.

JSX настроен на Preact: `tsconfig` → `"jsx": "react-jsx"`, `"jsxImportSource": "preact"`.

Шаблонизатор pug (`pug`/`pug-loader`/`apply-loader`) полностью удалён — `npm install` ставится без `--legacy-peer-deps`.

## Версионирование

Схема — **SemVer на стадии 0.x** (`0.MINOR.PATCH`), до релиза 1.0. Сейчас `0.5.7`.

- **Источник истины — два файла, держать синхронными:** `manifest.json` → `version` и `package.json` → `version`. При бампе менять оба на одно значение в одном коммите. Версия из `manifest.json` читается в рантайме и выводится в инфобар попапа (`src/popup/info/InfoBarBuilder.js`).
- **Git-тегов и GitHub Releases нет** — версия не маркируется тегами, не полагаться на `git tag`/`git describe`.
- **Ветки:** `version/<x.y.z>_<краткий-слаг>`, где слаг — тема или автор работы. Примеры: `version/0.5.0_manifest_3`, `version/0.5.3_parse-by-click`, `version/0.5.7_TS_Viktor_Refactoring`. Несколько фич могут идти параллельно под близкими версиями.
- **Интеграция — через Pull Request в `master`** (см. историю merge-коммитов). Прямые пуши в master не приняты.
- **Коммиты (исторический стиль):** префикс `[version X.Y.Z] <описание>`. Бамп версии — отдельным коммитом (`Update version` / `Increment version`).

### Правила коммитов в этом проекте
- **Сообщения — максимально короткие** (~2 слова), без раздутых тел. Не перегружать описанием.
- **НЕ добавлять трейлер `Co-Authored-By`** (и никаких подписей ассистента).
- Сохранять префикс `[version X.Y.Z]` при бампе версии.

### Когда поднимать версию
- PATCH (`0.5.x`) — багфиксы, хотфиксы рендера/парсинга, мелкие правки UI.
- MINOR (`0.x.0`) — новые фичи и заметные изменения поведения (новый способ парсинга, миграция манифеста, редизайн попапа).
- MAJOR (`1.0.0`) — пока не используется (проект до-релизный).
