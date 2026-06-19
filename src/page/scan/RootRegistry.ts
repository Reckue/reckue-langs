/**
 * Список открытых shadow roots, найденных при обходе. Нужен hit-test'у:
 * caretPositionFromPoint умеет пробивать теневые границы только если передать
 * их явно. Детач удалённых roots не отслеживаем — устаревший root в caret
 * просто не даст совпадения, это безопасно.
 */
export class RootRegistry {

    private readonly shadows = new Set<ShadowRoot>();

    add = (root: ShadowRoot) => {
        this.shadows.add(root);
    };

    shadowRoots = (): ShadowRoot[] => {
        return [...this.shadows];
    };
}
