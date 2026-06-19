/**
 * Уровни знания слова. Палитра и шкала 1–5 — как в reckue langs (frontend):
 * beginner красный → native зелёный. `number` задаёт позицию на слайдере.
 * Хранится и матчится слово по `name`; `hex` идёт в подсветку и слайдер.
 */
export const Levels = Object.freeze({
    NATIVE:       { name: "native",       hex: "#1f7a1d", number: 5 },
    ADVANCED:     { name: "advanced",     hex: "#2aab27", number: 4 },
    INTERMEDIATE: { name: "intermediate", hex: "#2894c3", number: 3 },
    ELEMENTARY:   { name: "elementary",   hex: "#e0963f", number: 2 },
    BEGINNER:     { name: "beginner",     hex: "#d83e3e", number: 1 }
});

export interface Level {
    name: string;
    hex: string;
    number: number;
}

/** По возрастанию (для слайдера): позиция 1..5 = индекс+1. */
export const LEVEL_LIST: Level[] = [
    Levels.BEGINNER,
    Levels.ELEMENTARY,
    Levels.INTERMEDIATE,
    Levels.ADVANCED,
    Levels.NATIVE
];

export const LEVEL_COUNT = LEVEL_LIST.length;

export const levelByName = (name: string): Level | undefined =>
    LEVEL_LIST.find((level) => level.name === name);

/** Позиция (1..5) для уровня; неизвестный → 0. */
export const levelNumber = (name: string): number =>
    levelByName(name)?.number ?? 0;

/** Уровень по позиции на слайдере (1..5), с клампом в диапазон. */
export const levelAt = (position: number): Level =>
    LEVEL_LIST[Math.max(1, Math.min(LEVEL_COUNT, position)) - 1];

export const levelHex = (name: string): string =>
    levelByName(name)?.hex ?? "#d9d9d9";
