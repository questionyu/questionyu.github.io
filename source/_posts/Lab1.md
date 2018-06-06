---
title: Java Lab1
date: 2016-03-08 19:45:19
categories:
  - Code
tags:
  - Java
---

新学期，新的语言学习开始了~还是老样子，写代码~
``` java
public class TestArgs {
	public static void main (String[] args) {
		System.out.println("Name			= " + args[0] + " " + args[1]);
		System.out.println("BUPT Email Username	= " + args[2]);
		System.out.println("Student Number		= " + args[3]);
	}
}
```
<!--more-->
``` java
public class WeekDayConverter {
    public static void main(String[] args) {
        int weekDay = Integer.parseInt(args[0]);
        switch (weekDay) {
            case 1:
                System.out.println("The 1st day of week is Mon!");
                break;
            case 2:
                System.out.println("The 2nd day of week is Tue!");
                break;
            case 3:
                System.out.println("The 3rd day of week is Wed!");
                break;
            case 4:
                System.out.println("The 4th day of week is Thu!");
                break;
            case 5:
                System.out.println("The 5th day of week is Fri!");
                break;
            case 6:
                System.out.println("The 6th day of week is Sat!");
                break;
            case 7:
                System.out.println("The 7th day of week is Sun!");
                break;
            default:
                System.out.println("Error!");
        }
    }
}
```
``` java
public class BMICalculator {
    public static void main(String[] args) {
        float weight = Float.parseFloat(args[0]);
        float height = Float.parseFloat(args[1]) / 100;
        float BMI = weight / (height * height);
        System.out.println("Your weight: " + weight + " kg");
        System.out.println("Your height: " + height + " m");
        System.out.printf("Your BMI: %4.2fn", BMI);
        if (BMI < 18.5F) {
            System.out.println("You are in the Underweight range.");
        } else if (BMI < 25F) {
            System.out.println("You are in the Normal range.");
        } else if (BMI < 30F) {
            System.out.println("You are in the Overweight range.");
        } else {
            System.out.println("You are in the Obese range.");
        }
    }
}
```
``` java
public class DoublingNumbers1 {
    public static void main(String[] args) {
        int i = 1;
        do {
            System.out.println("The double of " + i + " is " + 2 * i);
            i++;
        } while (i < 11);
    }
}
```
``` java
public class DoublingNumbers2 {
    public static void main(String[] args) {
        for (int i = 1; i < 11; i++) {
            System.out.println("The double of " + i + " is " + 2 * i);
        }
    }
}
```
