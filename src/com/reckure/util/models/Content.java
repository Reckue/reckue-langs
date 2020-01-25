package com.reckure.util.models;

import com.reckure.util.enums.ContentType;

import java.util.Objects;

public class Content {

    ContentType type;
    String content;

    public Content() {
    }

    public Content(ContentType type, String content) {
        this.type = type;
        this.content = content;
    }

    public ContentType getType() {
        return type;
    }

    public void setType(ContentType type) {
        this.type = type;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Content content1 = (Content) o;
        return type == content1.type &&
                Objects.equals(content, content1.content);
    }

    @Override
    public int hashCode() {
        return Objects.hash(type, content);
    }

    @Override
    public String toString() {
        return "Content{" +
                "type=" + type +
                ", content='" + content + '\'' +
                '}';
    }
}
