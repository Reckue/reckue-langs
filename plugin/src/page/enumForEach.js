const enumForEach = (Enum, callback) => {
    Object.entries(Enum).forEach((value) => {
        const entry = value[1];
        callback(entry);
    });
}

const colorResolver = (ref, level) => {
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
        default:
            ref.style.color = "rgb(30,30,30)";
            break;
    }
}