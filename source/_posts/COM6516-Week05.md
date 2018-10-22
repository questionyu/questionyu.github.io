---
title: COM6516-Week05
categories:
  - Code
date: 2018-10-22 23:10:11
tags:
  - Java
  - COM6516
---

{% codeblock MultiplicationTable.java lang:java %}
/**
 * Multiplication table
 * Create a table to show 1 to 9 multiplication.
 */
public class MultiplicationTable {

	/**
	 * World starts here
	 *
	 * @param args Command line arguments
	 */
	public static void main(String[] args) {
		int num = 9;
		System.out.print("  |");
		for (int i = 0; i < num; i++) {
			System.out.printf("%4d", i + 1);
		}
		System.out.println();
		System.out.print("---");
		for (int i = 0; i < num; i++) {
			System.out.print("----");
		}
		System.out.println("--");
		for (int i = 0; i < num; i++) {
			System.out.print((i + 1) + " |");
			for (int j = 0; j < num; j++) {
				System.out.printf("%4d", (i + 1) * (j + 1));
			}
			System.out.println();
		}
	}
}
{% endcodeblock %}
<!--more-->
{% codeblock TestCircle.java lang:java %}
/**
 * Test Circle class
 */
public class TestCircle {
	/**
	 * World starts here
	 *
	 * @param args Command line arguments
	 */
	public static void main(String[] args) {
		System.out.println(Circle.PI);
		System.out.println(Circle.radToDeg(3.141));

		Circle myCircle = new Circle(1);
		System.out.println(myCircle.toString());
		System.out.println(myCircle.getClass());

		Circle myCircle2 = new Circle(1);
		System.out.println(myCircle.equals(myCircle2));
	}
}
{% endcodeblock %}
{% codeblock Circle.java lang:java %}
/*
 * Circle.java
 *
 * Copyright (c) University of Sheffield 2014
 */

public class Circle {

	// class field
	public static final double PI = 3.1415927;

	// instance field
	private double radius;

	// constructor
	public Circle(double r) {
		radius = r;
	}

	// class method
	public static double radToDeg(double angleRad) {
		return angleRad * 180.0 / PI;
	}

	// instance methods
	public double area() {
		// returns area of the circle
		return PI * radius * radius;
	}

	public double circumference() {
		// returns circumference of the circle
		return 2.0 * PI * radius;
	}

	@Override
	public String toString() {
		return "Circle radius: " + radius;
	}

	@Override
	public boolean equals(Object obj) {
		// Check if the two objects' class are same, then if the references are same
		return obj.getClass() == this.getClass() && obj == this;
	}
}
{% endcodeblock %}
{% codeblock PhDThesis.java lang:java %}
class PhDThesis extends Publication {
	private int numChapters;
	private String university;
	private String supervisor;

	PhDThesis(String title, String author, int ISBN, int numPages, int numChapters, String university, String supervisor) {
		super(title, author, ISBN, numPages);
		this.numChapters = numChapters;
		this.university = university;
		this.supervisor = supervisor;
	}

	@Override
	public String toString() {
		return super.toString() + "[numChapters=" + numChapters +
				",university=\"" + university + "\",supervisor=\"" + supervisor + "\"]";
	}
}
{% endcodeblock %}
{% codeblock TestPublication.java lang:java %}
public class TestPublication {
	public static void main(String[] args) {
		Publication publication = new Publication();
		Book book = new Book("Test Book", "Test Author", 10000, 1000, 100);
		MagazineArticle magazineArticle = new MagazineArticle("Test Mag", "Test Author", 10001, 10, "Test Name", 1, 2, 3);
		PhDThesis phDThesis = new PhDThesis("Test Title", "Neo", 10002, 100, 10, "UoS", "Anand");

		System.out.println(publication.toString());
		System.out.println(book.toString());
		System.out.println(magazineArticle.toString());
		System.out.println(phDThesis.toString());
	}
}
{% endcodeblock %}
{% codeblock RandomTable.java lang:java %}
import java.util.ArrayList;
import java.util.Random;

/**
 * Create a random number table
 */
public class RandomTable {

	/**
	 * World starts here
	 *
	 * @param args Command line arguments
	 */
	public static void main(String[] args) {
		Random random = new Random(0);
		int num = 9;

		ArrayList<Integer> columns = new ArrayList<>();
		while (columns.size() < num) {
			int randomNum = random.nextInt(num + 1);
			if (randomNum > 0 && !columns.contains(randomNum)) {
				columns.add(randomNum);
			}
		}

		ArrayList<Integer> rows = new ArrayList<>();
		while (rows.size() < num) {
			int randomNum = random.nextInt(num + 1);
			if (randomNum > 0 && !rows.contains(randomNum)) {
				rows.add(randomNum);
			}
		}

		System.out.print("  |");
		for (int i = 0; i < num; i++) {
			System.out.printf("%4d", columns.get(i));
		}
		System.out.println();
		System.out.print("---");
		for (int i = 0; i < num; i++) {
			System.out.print("----");
		}
		System.out.println("--");
		for (int i = 0; i < num; i++) {
			System.out.print(rows.get(i) + " |");
			for (int j = 0; j < num; j++) {
				System.out.printf("%4d", rows.get(i) * columns.get(j));
			}
			System.out.println();
		}
	}
}
{% endcodeblock %}
