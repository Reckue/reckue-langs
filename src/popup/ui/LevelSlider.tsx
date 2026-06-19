import {useCallback, useEffect, useRef, useState} from "preact/hooks";
import {LEVEL_COUNT, levelAt, levelHex, levelNumber} from "../../core/enum/Levels";

interface LevelSliderProps {
    level: string;
    onChange: (name: string) => void;
}

/**
 * Слайдер уровня (как в reckue langs): серый трек + цветная заливка + число 1..5.
 * Контролируемый компонент: во время перетаскивания меняется только локальная
 * позиция, коммит уровня — на отпускании, чтобы не спамить storage на каждый move.
 */
export function LevelSlider({level, onChange}: LevelSliderProps) {
    const [pos, setPos] = useState<number>(levelNumber(level));
    const posRef = useRef(pos);
    const dragging = useRef(false);
    const trackRef = useRef<HTMLDivElement>(null);
    const onChangeRef = useRef(onChange);
    onChangeRef.current = onChange;

    useEffect(() => {
        const next = levelNumber(level);
        posRef.current = next;
        setPos(next);
    }, [level]);

    const update = useCallback((p: number) => {
        posRef.current = p;
        setPos(p);
    }, []);

    const fromX = useCallback((clientX: number): number => {
        const el = trackRef.current;
        if (!el) {
            return posRef.current;
        }
        const rect = el.getBoundingClientRect();
        const ratio = (clientX - rect.left) / rect.width;
        return Math.max(1, Math.min(LEVEL_COUNT, Math.ceil(ratio * LEVEL_COUNT)));
    }, []);

    const move = useCallback((e: PointerEvent) => {
        if (dragging.current) {
            update(fromX(e.clientX));
        }
    }, [fromX, update]);

    const up = useCallback(() => {
        if (!dragging.current) {
            return;
        }
        dragging.current = false;
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", up);
        onChangeRef.current(levelAt(posRef.current).name);
    }, [move]);

    const down = useCallback((e: PointerEvent) => {
        dragging.current = true;
        update(fromX(e.clientX));
        window.addEventListener("pointermove", move);
        window.addEventListener("pointerup", up);
    }, [fromX, update, move, up]);

    const color = pos ? levelHex(levelAt(pos).name) : "#d9d9d9";

    return (
        <div class="level-slider" onPointerDown={down}>
            <div class="level-slider-track" ref={trackRef}>
                <div class="level-slider-fill" style={{width: `${(pos / LEVEL_COUNT) * 100}%`, background: color}}/>
            </div>
            <div class="level-slider-value">{pos || "–"}</div>
        </div>
    );
}
