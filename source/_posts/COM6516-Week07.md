---
title: COM6516 Week07
date: 2018-11-12 10:46:42
categories:
  - Code
tags:
  - Java
  - COM6516
---

``` java
/*
 * Developed by Neo on 05/11/18 11:12.
 * Last modified 05/11/18 10:39.
 * Copyright (c) 2018. All rights reserved.
 */

import sheffield.EasyReader;

/**
 * This class can generate a walking plan for a old person
 */
public class GenerateWalkingPlan {
	/**
	 * Program starts here.
	 *
	 * @param args command line arguments.
	 */
	public static void main(String[] args) {
		// Ask for user's name and age for creating plan
		EasyReader myReader = new EasyReader();

		String name = myReader.readString("What is your name? ");
		int age = myReader.readInt("Hello " + name + ", how old are you? ");

		// Create a walk plan and print it
		WalkingPlan newPlan = new WalkingPlan(name, age);

		newPlan.generate();
		newPlan.toPrint();
	}
}
```
<!--more-->
``` java
/*
 * Developed by Neo on 05/11/18 11:10.
 * Last modified 05/11/18 10:45.
 * Copyright (c) 2018. All rights reserved.
 */

import java.util.Random;

/**
 * This is walk plan for old person
 */
class WalkingPlan {
	/**
	 * This plan only contains 14 days plan
	 */
	private static final int PLAN_DAYS = 14;
	/**
	 * We define more than 1500 meters as hard day
	 */
	private static final int HARD_MODE = 1500;
	/**
	 * If two hard days in a row, we need change second day as relax day
	 */
	private static final int RELAX_MODE = 1000;

	/**
	 * User's name
	 */
	private String name;
	/**
	 * User's age
	 */
	private int age;

	/**
	 * Every days plan
	 */
	private int[] plan;
	/**
	 * The total meters of whole plan
	 */
	private int total;
	/**
	 * Average meters of this plan
	 */
	private long average;

	/**
	 * Constructor method for WalkingPlan
	 *
	 * @param name user's name
	 * @param age  user's age
	 */
	WalkingPlan(String name, int age) {
		this.name = name;
		this.age = age;

		// Initialize these variables
		plan = new int[PLAN_DAYS];
		total = 0;
		average = 0;
	}

	/**
	 * This method will generate a waling plan
	 */
	void generate() {
		Random random = new Random();
		for (int i = 0; i < PLAN_DAYS; i++) {
			plan[i] = 10 * (10 + random.nextInt(240)); // Generate a int in [100, 2500)
			if (i > 0) {
				if (plan[i] > HARD_MODE && plan[i - 1] > HARD_MODE)
					plan[i] = RELAX_MODE;
			}
			total += plan[i];
		}
		average = Math.round((double) total / PLAN_DAYS);
	}

	/**
	 * This method will print walking plan
	 */
	void toPrint() {
		System.out.println();
		System.out.println(name + "(age=" + age + ") - this is your walking plan:");
		for (int i = 0; i < PLAN_DAYS; i++) {
			System.out.print("Day " + (i + 1) + ": walk " + plan[i] + "m");
			if (plan[i] > HARD_MODE)
				System.out.println(" <--- hard");
			else
				System.out.println();
		}

		System.out.println();

		System.out.println("Total number of meters walked = " + total);
		System.out.println("Average number of meters walked per day = " + average);
	}
}
```
