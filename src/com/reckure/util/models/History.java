package com.reckure.util.models;

import com.reckure.util.enums.ModelType;

import java.util.List;
import java.util.Objects;

public class History {

    private ModelType modelType;
    private List<String> modelIdList;

    public History() {
    }

    public History(ModelType modelType, List<String> modelIdList) {
        this.modelType = modelType;
        this.modelIdList = modelIdList;
    }

    public ModelType getModelType() {
        return modelType;
    }

    public void setModelType(ModelType modelType) {
        this.modelType = modelType;
    }

    public List<String> getModelIdList() {
        return modelIdList;
    }

    public void setModelIdList(List<String> modelIdList) {
        this.modelIdList = modelIdList;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        History history = (History) o;
        return modelType == history.modelType &&
                Objects.equals(modelIdList, history.modelIdList);
    }

    @Override
    public int hashCode() {
        return Objects.hash(modelType, modelIdList);
    }

    @Override
    public String toString() {
        return "History{" +
                "modelType=" + modelType +
                ", modelIdList=" + modelIdList +
                '}';
    }
}
