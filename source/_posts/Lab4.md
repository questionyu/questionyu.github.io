---
title: Java Lab4
date: 2016-04-29 18:22:29
categories:
  - Code
tags:
  - Java
---

隔了好久，直到第三周 Java 课都上完了才想起来要把 Lab4 的代码赶紧写了。第三周的课讲的好快，而且感觉是目前最重要的内容……这实在是有点让人头疼。但是这周讲到最令人激动的 GUI 部分了，大概以后写的实验代码都会是图形操作界面的吧，想想还是挺让人激动的，终于可以写带图形的程序了。其实在去年这个时候学的 C 语言也可以写图形化的程序，但是学校没有教，想想 C 语言执行效率这么高的语言却没有学到图形化，只能写 Java 的图形化程序，还是有点遗憾的。

Lab4 涉及到的知识大部分在第二周的课件中，不熟悉的可以回去多翻翻第二周课件。有些基本的格式还是需要注意的，我写第二个随机数组的时候，运行总是报空指针的错误，来来回回看了半天才发现是数组忘了 new……<!--more-->

第一题里面用到了 Lab3 的 Cat.java，这里我就不放出来了，看看新的 CatTest2.java 就好了：
``` java
/**
 * A class that test Cat class.
 *
 * @author      Question
 * @date        Apr 29, 2016
 * @version     1.0
 */
import java.awt.Color;

public class CatTest2 {
	public static void main(String[] args) {
		// Instance array variable.
		Cat[] test = new Cat[6];

		// Create 6 different cats.
		test[0] = new Cat("Napoleon", "straight", true, Color.GRAY, 5);
		test[1] = new Cat("Princess", "short", false, Color.WHITE, 10);
		test[2] = new Cat("Whiskers", "long", true, Color.GRAY, 15);
		test[3] = new Cat("Tom", "long", true, Color.BLUE, 10);
		test[4] = new Cat("Jerry", "straight", true, Color.YELLOW, 10);
		test[5] = new Cat("Bob", "short", false, Color.BLACK, 15);

		// Use a for loop to print all cats' attributes.
		for (int i = 0; i < test.length; i++) {
			System.out.println(test[i]);
		}
	}
}
```

第二个是随机数组，随机生成指定数量的 0 至 9 范围的整数，并计算和与均值：
``` java
/**
 * A class that represents a random array.
 *
 * @author      Ling Ma
 * @date        Jan 19, 2009
 * @version     1.0
 * @author      Paula Fonseca
 * @date        Apr 11, 2016
 * @version     1.1
 * @author      Question
 * @date        Apr 29, 2016
 * @version     1.2
 */
public class RandomArray {
	private int[] array; // instance variable

	/**
	 *  Constructor
	 *  @param  size  The size of the array.
	 */
	public RandomArray(int size) {
		// Check to see if the user has actually sent a postive number to the method.
		if (size <= 0) {
			System.out.println("Please input a postive integer. Example: java RandomArray 5");
			System.exit(-1);
		}

		// Create an array of int.
		array = new int[size];

		// Use a for loop to give all random number.
		for (int i = 0; i < size; i++) {
			array[i] = (int) (Math.random() * 10);
		}
	}

	/**
	 *  A method to print the array elements.
	 */
	public void printArray() {
		// Use a for loop to print all numbers.
		for (int i = 0; i < array.length; i++) {
			System.out.print(array[i] + " ");
		}
		System.out.println();
	}

	/**
	 *  A method to calculate the sum of all elements.
	 *  @return  The sum.
	 */
	public int calcSum() {
		// Calculate the sum of array.
		int sum = 0;
		for (int i = 0; i < array.length; i++) {
			sum += array[i];
		}
		return sum;
	}

	/**
	 *  A method to calculate the mean (or average) of all elements.
	 *  @return  The mean.
	 */
	public double calcMean() {
		// Calculate the average of array.
		double mean = calcSum() / array.length;
		return mean;
	}

	/**
	 *  A main method to test.
	 */
	public static void main(String[] args) {
		// Check to see if the user has actually sent a parameter to the method.
		if (args.length != 1) {
			System.out.println("Usage: java RandomArray <NUM>. Example: java RandomArray 5");
			System.exit(-1);
		}

		// Create an instance of the class.
		RandomArray test = new RandomArray(Integer.parseInt(args[0]));

		// Print the array.
		test.printArray();

		// Calculate the sum of all the values in the array and print it.
		System.out.println("Sum: " + test.calcSum());

		// Calculate the mean of all the values in the array and print it.
		System.out.println("Mean: " + test.calcMean());
	}
}
```
