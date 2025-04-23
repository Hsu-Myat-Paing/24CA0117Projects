package model;

public class Post {
    private String name;
    private String message;
    private String date;
    private String fontSize;
    private String color;
    private String fontWeight;

    // Constructor
    public Post(String name, String message, String date, String fontSize, String color, String fontWeight) {
        this.name = name;
        this.message = message;
        this.date = date;
        this.fontSize = fontSize;
        this.color = color;
        this.fontWeight = fontWeight;
    }

    // Getter for name
    public String getName() {
        return name;
    }

    // Getter for message
    public String getMessage() {
        return message;
    }

    // Getter for date
    public String getDate() {
        return date;
    }

    // Getter for fontSize
    public String getFontSize() {
        return fontSize;
    }

    // Getter for color
    public String getColor() {
        return color;
    }

    // Getter for fontWeight
    public String getFontWeight() {
        return fontWeight;
    }
}
