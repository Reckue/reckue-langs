# Reckue Languages (reckue-langs)

Chrome-расширение (Manifest V3) — интерактивный словарь: пользователь кликает слова на любой странице, они сохраняются, подсвечиваются и превращаются в карточки.

Стек: TypeScript (миграция с JS завершена — в `src/` только `.ts`/`.tsx`), сборка Webpack 5 + ts-loader, `target: es2022` (нативные `#private`-поля, без даунлевела). Точки входа: `src/page.ts`, `src/popup.tsx`, `src/reader.ts` → `dist/page/page.js`, `dist/popup/popup.js`, `dist/reader/reader.js`.

## Принцип документации

Кратко. По умолчанию в пару слов, если не просят иначе — не буквально, но без полотен текста. Разжёвывать в большинстве случаев не нужно. Касается и того, что пишется в этот CLAUDE.md.

## Архитектура: три независимые поверхности

- **Content script (`src/page/*`, бандл `page.js`)** — vanilla TS, прямая работа с DOM хост-страницы. React/Preact сюда НЕ применять. CSS подключается как сырой текст через webpack `asset/source` (`{test: /\.css$/, type: 'asset/source'}`). Активный путь: `page.ts → App → PageService → PageManager.run`. Подсветка — через **CSS Custom Highlight API** (красит `Range`'и, чужой DOM НЕ переписывает), событийно (MutationObserver + rAF/`requestIdleCallback`, без `setInterval`), с заходом в shadow roots. Разложено на слои: `scan/PageScanner` (обход + shadow), `word/WordMatcher` (токен→уровень), `highlight/HighlightStore` (Range'и по уровням, **инкрементально** через `Highlight.add/delete` + индекс `Node→Range`), `invalidate/MutationPipeline` (обрабатывает только изменённое поддерево, не весь body), `interact/*` (HitTester/Hover/Click/Popup/Hint через `caretFromPoint`). `PageManager` оркестрирует и держит lifecycle (visibility/bfcache). Старые поколения (координатный парсер `realtime/*`, `block/*`, `lib/`, PoC `HighlightPoc`) удалены.
- **Popup (`src/popup/ui/*`, бандл `popup.js`)** — **Preact** (`src/popup.tsx` → `render(<App/>)`). Компоненты: `App`, `Navbar`, `WordbookView`, `SettingsView`, `InfoBar`. Слой данных (`src/core/words/*`: `WordbookService`, `Wordbook`, `Word`) — общий, vanilla, НЕ трогать React'ом. UI попапа на pug/ручном DOM удалён.
- **Reader (`src/reader/*`, бандл `reader.js` + `dist/reader/index.html`)** — extension-страница, свой вьювер **PDF** на **PDF.js** (`pdfjs-dist`). Нативный вьювер Chrome контент-скрипту недоступен (PDFium в отдельном процессе), поэтому PDF рендерится в обычный DOM: `pdf/PageView` (canvas + прозрачный `TextLayer`), `pdf/PdfViewer` (ленивый постраничный рендер через IntersectionObserver), `source/PdfSource` (байты из `?file=` / локального файла), `ui/Toolbar`. По text-нодам текстового слоя запускается **тот же движок слов**, что и на странице: `ReaderService` зовёт `PageManager.run({background: true})` — `background` переключает `HighlightStore` на фоновую заливку (цвет текста не виден поверх растра canvas). Поверх по-нодового движка — `pdf/WordStitcher`: PDF.js кладёт каждый text item отдельным спаном, поэтому слово, разорванное на два спана (перенос по слогам, буквица/drop cap), движок не видит. Сшиватель собирает текст страницы в одну строку с картой символ→нода, склеивает разрывы по геометрии и красит слова из словаря Range'ом через несколько нод во ВТОРОЙ `HighlightStore` (namespace `reckue-stitch-`, чтобы не конфликтовать с по-нодовой подсветкой). Одно-нодовые слова отдаются движку. Триггеры: `PageView.onTextLayer` (страница отрисована), зум (`onReset`), смена словаря (`chrome.storage.onChanged` по ключам `wordbook*`). Клик: сшиватель держит карту `node→слово` для ВСЕХ мульти-нодовых токенов (не только известных) и отдаёт `wordAt` в `PageManager.run({resolveWord})` → `ClickController` достраивает фрагмент до целого слова, поэтому клик по `brane`/`mem-` сохраняет/меняет уровень целого `membrane`. Перехват PDF: динамическое правило `declarativeNetRequest` в `background/application.js` редиректит `*.pdf` (http/https + file://) на `index.html?file=<url>`. Worker PDF.js кладётся в `dist/reader/pdf.worker.mjs` через `copy-webpack-plugin`. Локальные файлы требуют «Allow access to file URLs». Ограничение: DNR матчит только по URL, PDF без `.pdf` в адресе не перехватывается (запасной путь — кнопка/drag&drop во вьювере).

JSX настроен на Preact: `tsconfig` → `"jsx": "react-jsx"`, `"jsxImportSource": "preact"`.

Шаблонизатор pug (`pug`/`pug-loader`/`apply-loader`) полностью удалён — `npm install` ставится без `--legacy-peer-deps`.

## Версионирование

Схема — **SemVer на стадии 0.x** (`0.MINOR.PATCH`), до релиза 1.0. Текущую версию смотреть в `manifest.json`/`package.json`, не дублировать здесь.

- **Источник истины — два файла, держать синхронными:** `manifest.json` → `version` и `package.json` → `version`. При бампе менять оба на одно значение в одном коммите. Версия из `manifest.json` читается в рантайме (`chrome.runtime.getManifest().version`) и выводится в инфобар попапа (`src/popup/ui/InfoBar.tsx`).
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

### Кто бампает (важно)
- **MINOR и MAJOR определяет пользователь** — сам, на своё усмотрение. Ассистент их НЕ поднимает по своей инициативе.
- **PATCH (снапшот) ассистент поднимает сам** после каждой +- крупной правки: бампит патч (оба файла синхронно), коммитит с префиксом `[version X.Y.Z]` и **пушит ветку `version/*`**. Без отдельного запроса.

## План развития (19.06.2026)

Фичи (free, если не помечено):
1. Выбор языка, деление на языки
2. Автоопределение языка
3. Автоопределение инфинитива
4. Грамматики — **платно**
5. Автоопределение грамматик — **платно**
6. Подсветка грамматик — **платно**
7. Работа с грамматиками в popup — **платно**
8. Группы слов — **платно** (предварительно)
9. % слов на странице, известных из словаря
10. Авторизация
11. Синхронизация словаря
12. Платные подписки
13. Определения слов, по умолчанию скрыты
14. Определение в текущем контексте

Определения:
- Free — перевод через Google Translate (или базовое из БД, коротко).
- Платно — контекстный разбор через ИИ, на языке слова и на родном языке пользователя.
- Не вываливать сырые словарные значения списком (как делала старая Reckue) — коротко и по делу.
