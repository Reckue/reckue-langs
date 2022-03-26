import {Levels} from "../enum/Levels";

export const colorResolver = (ref, level) => {
    switch (level) {
        case Levels.NATIVE.name:
            ref.style.color = Levels.NATIVE.hex;
            break;
        case Levels.ADVANCED.name:
            ref.style.color = Levels.ADVANCED.hex;
            break;
        case Levels.INTERMEDIATE.name:
            ref.style.color = Levels.INTERMEDIATE.hex;
            break;
        case Levels.ELEMENTARY.name:
            ref.style.color = Levels.ELEMENTARY.hex;
            break;
        case Levels.BEGINNER.name:
            ref.style.color = Levels.BEGINNER.hex;
            break;
    }
}