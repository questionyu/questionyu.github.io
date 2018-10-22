---
title: COM6506-Week02
categories:
  - Code
date: 2018-10-08 15:35:30
tags:
  - Java
  - COM6506
---

{% codeblock Person.java lang:java %}
public class Person {
	String name;
	double weight;
	double height;

	public Person(String name, double weight, double height) {
		this.name = name;
		this.weight = weight;
		this.height = height;
	}

	public String getName() {
		return name;
	}

	public double getWeight() {
		return weight;
	}

	public double getHeight() {
		return height;
	}

	public static void main(String[] args) {
		Person jeff = new Person("Jeff", 72.4, 2.2);
		Person jim = new Person("Jim", 65, 1.7);
		System.out.println("Jeff is " + jeff.getHeight() + "m tall.");
		System.out.println("Jim is " + jim.getHeight() + "m tall.");
	}
}
{% endcodeblock %}
<!--more-->
{% codeblock BMICalculator.java lang:java %}
public class BMICalculator {
	Person person;

	public BMICalculator(Person p) {
		this.person = p;
	}

	public double calculateBMI() {
		double bmi = person.getWeight() / (person.getHeight() * person.getHeight());
		return bmi;
	}

	public static void main(String[] args) {
		Person jeff = new Person("Jeff", 85.4, 1.9);
		BMICalculator calculator = new BMICalculator(jeff);
		System.out.println("Jeff's BMI is: " + calculator.calculateBMI());
	}
}
{% endcodeblock %}
{% codeblock BMICalculatorTest.java lang:java %}
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class BMICalculatorTest {
	/*
	 * BMI should be somewhere between 20 and 30.
	 */
	@Test
	void testPersonInNormalCategory() {
		Person jeff = new Person("Jeff", 85.4, 1.9);
		BMICalculator calculator = new BMICalculator(jeff);
		double result = calculator.calculateBMI();
		assertTrue(result > 20);
		assertTrue(result < 30);
	}

	/*
	 * BMI should be zero
	 */
	@Test
	void testWeightlessPerson() {
		Person jeff = new Person("Jeff", 0, 1.9);
		BMICalculator calculator = new BMICalculator(jeff);
		double result = calculator.calculateBMI();
		assertEquals(result, 0D);
	}

	/*
	 * BMI should be infinite
	 */
	@Test
	void testHeightlessPerson() {
		Person jeff = new Person("Jeff", 85.4, 0);
		BMICalculator calculator = new BMICalculator(jeff);
		double result = calculator.calculateBMI();
		assertTrue(Double.isInfinite(result));
	}
}
{% endcodeblock %}