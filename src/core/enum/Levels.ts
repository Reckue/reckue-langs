/**
 * Уровни знания слова — как в reckue langs (frontend): 4 уровня, шкала 1–4,
 * beginner красный → advanced зелёный. `number` задаёт позицию на слайдере.
 * Слово хранится/матчится по `name`; `hex` идёт в подсветку и слайдер.
 */
export const Levels = Object.freeze({
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

/** По возрастанию (для слайдера): позиция 1..4 = индекс+1. */
export const LEVEL_LIST: Level[] = [
    Levels.BEGINNER,
    Levels.ELEMENTARY,
    Levels.INTERMEDIATE,
    Levels.ADVANCED
];

export const LEVEL_COUNT = LEVEL_LIST.length;

export const levelByName = (name: string): Level | undefined =>
    LEVEL_LIST.find((level) => level.name === name);

/** Позиция (1..4) для уровня; неизвестный → 0. */
export const levelNumber = (name: string): number =>
    levelByName(name)?.number ?? 0;

/** Уровень по позиции на слайдере (1..4), с клампом в диапазон. */
export const levelAt = (position: number): Level =>
    LEVEL_LIST[Math.max(1, Math.min(LEVEL_COUNT, position)) - 1];

export const levelHex = (name: string): string =>
    levelByName(name)?.hex ?? "#d9d9d9";

/**
 * Миграция со старой 5-уровневой системы: убран `native` (был выше advanced).
 * Несуществующий уровень понижаем до максимального имеющегося (advanced).
 */
export const migrateLevel = (name: string): string =>
    levelByName(name) ? name : Levels.ADVANCED.name;
