package com.reckure.util.models;

import java.util.List;
import java.util.Objects;

public class Note {

    private List<Content> contentList;

    public Note() {
    }

    public Note(List<Content> contentList) {
        this.contentList = contentList;
    }

    public List<Content> getContentList() {
        return contentList;
    }

    public void setContentList(List<Content> contentList) {
        this.contentList = contentList;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Note note = (Note) o;
        return Objects.equals(contentList, note.contentList);
    }

    @Override
    public int hashCode() {
        return Objects.hash(contentList);
    }

    @Override
    public String toString() {
        return "Note{" +
                "contentList=" + contentList +
                '}';
    }
}
