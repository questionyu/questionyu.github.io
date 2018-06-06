---
title: Java Lab3
date: 2016-04-17 11:08:14
categories:
  - Code
tags:
  - Java
---

第三次的 Java 实验中，用到了 Color 类，对于这个类，我很不熟悉，写这一次的实验代码花了好多时间，但其实到现在第一题的代码写的也不好，在 CatTest 中输出猫的颜色不知道除了枚举还有什么方法～～大家凑合着看吧～<!--more-->

首先是第一题的 Cat.java，Setter 和 Getter 重复写那么多也是挺无聊的。
``` java
import java.awt.*;

/**
 * Title		Cat.java
 * Description	This class contains the definition of a cat.
 * Copyright	Copyright (c) 2006 - 2016
 * @author		Laurissa Tokarchuk
 * @version		1.0
 * @author		Paula Fonseca
 * @version		1.1
 * @author		Question
 * @version		1.2
 */
public class Cat {
	// Declaration of instance variables.
	private String  name, furType;
	private boolean tail;
	private Color   colour;
	private int	 speed;

	//Initialize all instance variables.
	public Cat(String name, String furType, boolean tail, Color colour, int speed) {
		this.name = name;
		this.furType = furType;
		this.tail = tail;
		this.colour = colour;
		this.speed = speed;
	}

	/** This is the sleep method for the cat. It dictates the number of
	 *  minutes the cat sleeps.
	 *  @param duration  The number of minutes to sleep.
	 */
	public void sleep(int duration) {
		System.out.println("I am sleeping for " + duration + " minutes.");
	}

	/** This method allows the cat to run. The distance (in a straight line)
	 *  the cat runs is dependent on how long the cat runs and whether or not
	 *  it is running in a zigzag.
	 *  @param duration  The number of minutes to run.
	 *  @param zigzag	Whether to run in a zigzag pattern.
	 *  @return int	 Number of metres ran.
	 */
	public int run(int duration, boolean zigzag) {
		System.out.println("I am running "
						   + (zigzag? "in a zigzag" : "straight")
						   + " for "
						   + duration
						   + " minutes.");
		int distanceRun = duration * speed; // assuming speed is metres per minute
		if (zigzag) {
		/* When in zigzag, distance is 1/3 of what it would have been if
		   the cat was going straight. */
			return distanceRun/3;
		}
		else return distanceRun;
	}

	/** The setter method of name.
	 */
	public void setName(String name) {
		this.name = name;
	}

	/** The setter method of speed.
	 */
	public void setSpeed(int speed) {
		this.speed = speed;
	}

	/** The getter method of name.
	 *  @return name The name of cat.
	 */
	public String getName() {
		return name;
	}

	/** The getter method of speed.
	 *  @return speed The speed of cat.
	 */
	public int getSpeed() {
		return speed;
	}

	/** The getter method of color.
	 *  @return colour The color of cat.
	 */
	public Color getColor() {
		return colour;
	}
}
```
然后是 CatTest.java，这里有一个需要注意的地方就是，这里开头也要写 import，不写报错，QMUL 的老师也是挺坑的。Color 的输出搞了几天仍然没有搞很明白，网上许多的写法是写个 Enum，但我有点懒，不想整那个了，随便写写拉倒吧，辣鸡 Cat。
``` java
import java.awt.*;

/**
 * Title        CatTest.java
 * Description  This class contains the test class for Cat.
 * Copyright    Copyright (c) 2006 - 2016
 * @author      Laurissa Tokarchuk
 * @version     1.0
 * @author      Paula Fonseca
 * @version     1.1
 * @author      Question
 * @version     1.2
 */
public class CatTest {
	public static void main(String[] args) {
/*
		Cat c = new Cat("Napoleon", "straight", true, Color.gray, 5);
		c.setName("Napoleon");
		c.setSpeed(10); // in metres per minute
		c.sleep(5);
		int m = c.run(10, true);
		System.out.println("I have run " + m + " metres.");
		System.out.println("My name is " + c.getName() + ", and my speed is " + c.getSpeed() + ".");
*/

		//Create two cats with all attributes.
		Cat cat1 = new Cat("Princess", "short", false, Color.WHITE, 10);
		Cat cat2 = new Cat("Whiskers", "long", true, Color.GRAY, 15);

		//Print out the name and color of first cat.
		System.out.println("Hi, I'm " + cat1.getName() + ", and I'm " + cat1.getColor().toString() + ".");
		cat1.run(10, false);

		//Print out the name and color of second cat.
		System.out.println("Hi, I'm " + cat2.getName() + ", and I'm " + cat2.getColor().toString() + ".");
		cat2.run(5, true);
	}
}
```
第二题就是写个计算矩形面积，没有什么好说的，很快就写出来了。
``` java
/**
 * Title        Rectangle.java
 * Description  This class contains the definition and test class for rectangle.
 * Copyright    Copyright (c) 2016
 * @author      Question
 * @version     1.0
 */
public class Rectangle {
	// Declaration of instance variables.
	private float l, w;

	// This is the constuctor of Rectangle. Get the length and width of rectangle.
	public Rectangle(float length, float width) {
		l = length;
		w = width;
	}

	/** Calculate the area of rectangle.
	 *  @return l*w The area of rectangle.
	 */
	public float calcArea() {
		return l * w;
	}

	public static void main(String[] args) {
		//Create two rectangles.
		Rectangle rec1 = new Rectangle(8, 6);
		Rectangle rec2 = new Rectangle(7, 7);
		Rectangle rec3 = new Rectangle(5, 3);

		//Print out the area of two rectangles.
		System.out.println("The first rectangle's area is " + rec1.calcArea() +".");
		System.out.println("The second rectangle's area is " + rec2.calcArea() +".");
		System.out.println("The third area is " + rec3.calcArea() + ".");
	}
}
```
最后一题，好像……没什么吐槽的地方……但是这个 Javadoc 注释真是写着让人蛋疼啊……
``` java
/**
 * Title        Counter.java
 * Description  This class contains the definition of a counter.
 * Copyright    Copyright (c) 2016
 * @author      Question
 * @version     1.0
 */
public class Counter {
	// Declaration of instance variables.
	private int count, max;

	/** This is constructor with two parameters.
	 *  @param count The number you need to count.
	 *  @param max The max of count number.
	 */
	public Counter(int count, int max) {
		this.count = count;
		this.max = max;
	}

	/** This is constructor without parameter.
	 *  And set count 0, set max 10.
	 */
	public Counter() {
		count = 0;
		max = 10;
	}

	/** This method increases the count value by 2.
	 *  @return count The count.
	 */
	public int increase() {
		count += 2;
		if(count > max) {
			reset();
		}
		return count;
	}

	/** This method increases the count value by n.
	 *  @param n The value you want increase.
	 *  @return count The count.
	 */
	public int increase(int n) {
		count += n;
		if(count > max) {
			reset();
		}
		return count;
	}

	/** This method decreases the count value by 1.
	 *  @return count The count.
	 */
	public int decrease() {
		count -= 1;
		if(count < 0){
			reset();
		}
		return count;
	}

	/** This method decreases the count value by n.
	 *  @param n The value you want to decrease.
	 *  @return count The count.
	 */
	public int decrease(int n) {
		count -= n;
		if(count < 0){
			reset();
		}
		return count;
	}

	/** This method doubles the count value.
	 *  @return count The count.
	 */
	public int doubler() {
		count *= 2;
		return count;
	}

	/** This method resets the count value to 0.
	 *  And print out "Counter Reset!".
	 */
	public void reset() {
		count = 0;
		System.out.println("Counter Reset!");
	}

	/** This method defines the String of this class.
	 *  @return String The count and max of current.
	 */
	public String toString() {
		return "Count: " + count + "Max:   " + max;
	}

	/** This method is a getter of count.
	 *  @return int The count.
	 */
	public int getCount() {
		return count;
	}

	/** This method is a getter of max.
	 *  @return int The max.
	 */
	public int getMax() {
		return max;
	}

	/** This method is a setter of count.
	 *  Everybody can use this method to change count.
	 */
	public void setCount(int n) {
		this.count = n;
	}

	/** This method is a setter of max.
	 *  Everybody can use this method to change max.
	 */
	public void setMax(int n) {
		this.max = n;
	}
}
```
然后是 CounterTest.java
``` java
/**
 * Title        CounterTest.java
 * Description  This class contains the test class for counter.
 * Copyright    Copyright (c) 2016
 * @author      Question
 * @version     1.0
 */
public class CounterTest {
	public static void main(String[] args) {
		//Create a object of Counter.
		Counter c = new Counter();

		//Show the details of counter.
		System.out.println("The max of counter is "
						   + c.getMax()
						   + ", and counter will increase by 2.");
		c.setMax(20);
		c.setCount(10);
		System.out.println("Now the max of counter is "
						   + c.getMax()
						   + ", and the counter will increase from "
						   + c.getCount()
						   + ".");

		//Reset the count, and show the change of every operations.
		c.reset();
		System.out.println("Increase once, the counter is "
						   + c.increase()
						   + ".");
		System.out.println("Decrease once, the counter is "
						   + c.decrease()
						   + ".");
		System.out.println("Double once, the counter is "
						   + c.doubler()
						   + ".");

		c.reset(); /* Reset the count. */
		while(true) {
			int m = c.increase(1);
			System.out.println(m);
			if (m == 0) {
			/* When n = 0, the counter is over, so need to kill the loop. */
				break;
			}
		}

		c.setCount(20); /* Set the count = 20.*/
		while(true) {
			int m = c.decrease(3);
			System.out.println(m);
			if (m == 0) {
			/* When n = 0, the counter is over, so need to kill the loop. */
				break;
			}
		}
	}
}
```
这次的实验题目就是酱了，有问题可以留言。
