package com.reckure.util.validations;

import com.reckure.util.enums.ModelType;
import com.reckure.util.models.Content;
import com.reckure.util.models.History;
import com.reckure.util.models.Note;

public class IdentifyClass {

    public static ModelType identify(Class objectsClass) {

        if (objectsClass == Note.class) {
            return ModelType.NOTE;
        }

        if (objectsClass == History.class) {
            return ModelType.HISTORY;
        }

        if (objectsClass == Content.class) {
            return ModelType.CONTENT;
        }

        return ModelType.UNDEFINED;
    }

}
