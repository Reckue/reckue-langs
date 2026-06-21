import {Context} from "../core/Context";
import {WordbookService} from "../core/words/WordbookService";
import {HighlightStore} from "./highlight/HighlightStore";
import {PageScanner} from "./scan/PageScanner";
import {RootRegistry} from "./scan/RootRegistry";
import {WordMatcher} from "./word/WordMatcher";
import {LemmaDictionary} from "./word/LemmaDictionary";
import {LemmaMigration} from "./word/LemmaMigration";
import {MutationPipeline} from "./invalidate/MutationPipeline";
import {HitTester} from "./interact/HitTester";
import {HoverController} from "./interact/HoverController";
import {ClickController} from "./interact/ClickController";
import {Hint} from "./interact/Hint";
import {Popup} from "./interact/Popup";

/**
 * Оркестратор работы со страницей: проводит слои и держит жизненный цикл.
 *
 * Слои (структура из 0.5.0) поверх движка 0.6.x (CSS Custom Highlight API):
 *   PageScanner   — обход DOM + shadow roots → текстовые ноды
 *   WordMatcher   — токен → уровень из словаря
 *   HighlightStore— Range'и по уровням, инкрементально
 *   MutationPipeline — событийная инвалидация только изменённого
 *   HitTester/Hover/Click/Popup/Hint — взаимодействие через caretFromPoint
 */
export class PageManager {

    /**
     * background=true — для reader-поверхности (PDF): подсветка уровней рисуется
     * фоновой заливкой, т.к. текстовый слой PDF.js прозрачный поверх canvas.
     * Скан/observe идут по document.body в обоих случаях: страницы PDF
     * добавляются в body лениво, MutationPipeline подхватывает их по мере появления.
     */
    run = (opts: { background?: boolean } = {}) => {
        const service: WordbookService = Context.getWordbookService();
        if (!service) {
            return;
        }
        if (!HighlightStore.supported()) {
            window.console.warn("Reckue: CSS Custom Highlight API не поддерживается этим браузером");
            return;
        }

        const roots = new RootRegistry();
        const scanner = new PageScanner();
        const matcher = new WordMatcher(service.getWordbookCache());
        const store = new HighlightStore({background: opts.background});
        store.init(document);

        const pipeline = new MutationPipeline(scanner, matcher, store, roots);
        pipeline.scan(document.body);
        pipeline.observe(document.body);

        const hit = new HitTester(roots);
        const hint = new Hint();
        const popup = new Popup();
        const hover = new HoverController(hit, store, hint);
        hover.attach();
        // refresh: после смены уровня пере-сканируем всю страницу, иначе остальные
        // вхождения того же слова и его формы не перекрасятся (store.apply трогал
        // только кликнутую ноду). Скан идемпотентен; клики редки.
        const refresh = () => pipeline.scan(document.body);
        new ClickController(hit, matcher, service, popup, hint, refresh).attach();

        // Словарь лемм грузится из storage асинхронно: сканируем сразу на правилах,
        // а как словарь появится (или SW его обновит) — разовая миграция
        // словоформ→леммы (см. LemmaMigration) и пере-скан, чтобы подсветка
        // подхватила неправильные формы (went→go) и схлопнутые записи.
        const syncLemmas = () => LemmaMigration.run(service).then(refresh);
        LemmaDictionary.load().then(syncLemmas);
        LemmaDictionary.watch(syncLemmas);

        this.lifecycle(hover, pipeline);
    };

    /**
     * Жизненный цикл контент-скрипта: глушим hover на скрытой вкладке, а при
     * восстановлении из bfcache (тот же realm оживает) пере-сканируем body —
     * apply идемпотентен, так что повторный проход безопасен.
     */
    private lifecycle = (hover: HoverController, pipeline: MutationPipeline) => {
        document.addEventListener("visibilitychange", () => hover.setEnabled(!document.hidden));
        window.addEventListener("pageshow", (event: PageTransitionEvent) => {
            if (event.persisted) {
                pipeline.scan(document.body);
            }
        });
    };
}
