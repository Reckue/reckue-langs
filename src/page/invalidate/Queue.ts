/**
 * Очередь с дедупом (идея из 0.5.0). Здесь копит изменённые ноды между
 * срабатываниями observer'а и сливается одним заходом в idle-коалесере.
 */
export class Queue<T> {

    private readonly items = new Set<T>();

    add = (item: T) => {
        this.items.add(item);
    };

    isEmpty = (): boolean => {
        return this.items.size === 0;
    };

    drain = (consume: (item: T) => void) => {
        const snapshot = [...this.items];
        this.items.clear();
        snapshot.forEach(consume);
    };
}
