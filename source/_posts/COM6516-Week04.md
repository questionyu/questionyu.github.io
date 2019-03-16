---
title: COM6516 Week04
date: 2018-10-15 11:07:29
categories:
  - Code
tags:
  - Java
  - COM6516
---

``` java
class Person {
	String name;
	String birth;

	Person(String name, String birth) {
		this.name = name;
		this.birth = birth;
	}

	@Override
	public String toString() {
		return "Name: " + name + "\n" +
				"Birth: " + birth;
	}
}
```
<!--more-->
``` java
class Student extends Person {
	private String course;

	Student(String name, String birth, String course) {
		super(name, birth);
		this.course = course;
	}

	@Override
	public String toString() {
		return "Name: " + name + "\n" +
				"Birth: " + birth + "\n" +
				"Course: " + course;
	}
}
```

``` java
class Tutor extends Person {
	private String office;

	Tutor(String name, String birth, String office) {
		super(name, birth);
		this.office = office;
	}

	@Override
	public String toString() {
		return "Name: " + name + "\n" +
				"Birth: " + birth + "\n" +
				"Office: " + office;
	}
}
```

``` java
public class TestPerson {
	public static void main(String[] args) {
		Person testPerson = new Person("Walker", "1996/06/16");

		System.out.println(testPerson);

		Student testStudent = new Student("Neo", "1996/08/01", "COM6516");

		System.out.println(testStudent);

		Tutor testTutor = new Tutor("Anand", "1980/01/01", "C14");

		System.out.println(testTutor);
	}
}
```

``` java
public class Sheep extends Animal {
	public void talk() {
		System.out.println("Baaa!");
	}
}
```

``` java
public class NewAnimalTest {
	public static void main(String[] args) {
		Animal cow = new Cow();
		Animal pig = new Pig();
		Animal sheep = new Sheep();

		Animal[] animals = new Animal[3];
		animals[0] = cow;
		animals[1] = pig;
		animals[2] = sheep;

		for (Animal testAnimal : animals) {
			testAnimal.talk();
		}
	}
}
```

``` java
public abstract class Animal {
	public void talk() {
		System.out.println("Animals can't talk");
	}
}
```

``` java
/*
 * AnimalTest.java  	1.0 01/10/2010
 *
 * Copyright (c) University of Sheffield 2011
 */

/**
 * AnimalTest.java
 * <p>
 * Test class to demonstrate inheritance
 *
 * @author Mark Stevenson (mark.stevenson@sheffield.ac.uk)
 * Original code written by Guy Brown and Richard Clayton
 * @version 1.1 01 October 2010
 */

public class AnimalTest {
	public static void main(String[] args) {
		Cow daisy = new Cow();
		Pig wilbur = new Pig();
//		Animal animal = new Animal();

		Animal[] farm = new Animal[4];
//		farm[0] = animal;
		farm[0] = daisy;
		farm[1] = wilbur;

		for (int i = 0; i < 2; i++) {
			farm[i].talk();
		} // for
	} // main
}
```

``` java
public interface Drawable {
	public void draw(sheffield.EasyGraphics g);
}
```

``` java
/**
 * Shape.java
 * <p>
 * A simple class used in week 4 to implement an abstract superclass
 *
 * @version 1.1 26 August 2011
 * @author Richard Clayton  (r.h.clayton@sheffield.ac.uk)
 */

import sheffield.*;

public abstract class Shape implements Drawable {

	// instance fields
	// these could be implemented as protected (as shown in the lecture notes)
	// or more safely as private, with getX and getY methods as shown here
	private double x;
	private double y;

	public Shape() {
		this(0.0, 0.0);
	}

	public Shape(double x, double y) {
		setPosition(x, y);
	}

	public void setPosition(double xval, double yval) {
		x = xval;
		y = yval;
	}

	public double getX() {
		return x;
	}

	public double getY() {
		return y;
	}

	public abstract double area();

	public abstract void draw(EasyGraphics g);

}
```
