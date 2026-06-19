import {PageScanner} from "../scan/PageScanner";
import {RootRegistry} from "../scan/RootRegistry";
import {WordMatcher} from "../word/WordMatcher";
import {HighlightStore} from "../highlight/HighlightStore";
import {Queue} from "./Queue";
import {isUi} from "../ui/Ui";

/**
 * Инвалидация (бывш. PageChangeListener + Queue из 0.5.0, но событийно и
 * инкрементально). MutationObserver кладёт изменённые ноды в очереди с дедупом,
 * idle-коалесер сливает их одним заходом и гонит через Scanner→Matcher→Store —
 * обрабатывая ТОЛЬКО изменённое, а не весь body (главное отличие от 0.6.x PoC).
 * Никаких setInterval: тихо, пока страница тихо.
 */
export class MutationPipeline {

    private readonly added = new Queue<Node>();
    private readonly removed = new Queue<Node>();
    private readonly observed = new WeakSet<Node>();
    private scheduled = false;

    private readonly scanner: PageScanner;
    private readonly matcher: WordMatcher;
    private readonly store: HighlightStore;
    private readonly roots: RootRegistry;

    constructor(scanner: PageScanner, matcher: WordMatcher, store: HighlightStore, roots: RootRegistry) {
        this.scanner = scanner;
        this.matcher = matcher;
        this.store = store;
        this.roots = roots;
    }

    /** Первичный/инкрементальный скан поддерева: подсветка + регистрация shadow roots. */
    scan = (root: Node) => {
        this.scanner.walk(
            root,
            (text) => this.store.apply(text, this.matcher.matchNode(text)),
            (shadow) => {
                this.roots.add(shadow);
                this.store.ensureStyles(shadow);
                this.observe(shadow);
            }
        );
    };

    observe = (root: Node) => {
        if (this.observed.has(root)) {
            return;
        }
        new MutationObserver(this.onRecords).observe(root, {childList: true, subtree: true, characterData: true});
        this.observed.add(root);
    };

    private onRecords = (records: MutationRecord[]) => {
        let relevant = false;
        for (const record of records) {
            if (record.type === "characterData") {
                if (!isUi(record.target)) {
                    this.added.add(record.target);
                    relevant = true;
                }
                continue;
            }
            relevant = this.collect(record.addedNodes, this.added) || relevant;
            relevant = this.collect(record.removedNodes, this.removed) || relevant;
        }
        if (relevant) {
            this.schedule();
        }
    };

    private collect = (list: NodeList, queue: Queue<Node>): boolean => {
        let any = false;
        for (let i = 0; i < list.length; i++) {
            const node = list[i];
            if (isUi(node)) {
                continue;
            }
            queue.add(node);
            any = true;
        }
        return any;
    };

    private schedule = () => {
        if (this.scheduled) {
            return;
        }
        this.scheduled = true;
        const run = () => {
            this.scheduled = false;
            this.drain();
        };
        const idle = (window as any).requestIdleCallback;
        idle ? idle(run, {timeout: 500}) : setTimeout(run, 200);
    };

    private drain = () => {
        // Сначала снимаем подсветку с удалённых поддеревьев (ноды уже отсоединены,
        // но обход и element.shadowRoot на них работают). TreeWalker не возвращает
        // сам корень, поэтому удалённую голую текстовую ноду снимаем напрямую.
        this.removed.drain((node) => {
            if (node.nodeType === Node.TEXT_NODE) {
                this.store.remove(node as Text);
                return;
            }
            this.scanner.walk(node, this.store.remove);
        });
        this.added.drain((node) => {
            if (!node.isConnected) {
                return;
            }
            if (node.nodeType === Node.TEXT_NODE) {
                this.store.apply(node as Text, this.matcher.matchNode(node as Text));
                return;
            }
            this.scan(node);
        });
    };
}
