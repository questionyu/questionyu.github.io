---
title: Java Lab2
date: 2016-03-16 10:38:38
categories:
  - Code
tags:
  - Java
---

第二次的 Java 实验，比第一次有了点意思~不过第一个题。。。这是几岁小孩的游戏啊，竟然是拼代码！当我看到这个题的时候，一口老血，噗！
``` java
public class JavaTest {
    public static void main(String[] args) {
        int loopUntil = Integer.parseInt(args[0]);
        System.out.println();
        for (int i = 0; i < loopUntil; i++) {
            System.out.print(i);
            System.out.print(":");
            for (int j = loopUntil; j > 0; j--) {
                if (((i + j) % 3) == 0) {
                    System.out.print("*");
                } else {
                    System.out.print(j);
                }
            }
            System.out.println();
        }
    }
}
```
<!--more-->
``` java
public class Pattern1 {
	public static void main(String[] args) {
		int loopUntil = Integer.parseInt(args[0]);
		for (int i = 1; i <= loopUntil; i++) {
			for (int j = 1; j <= i; j++) {
				System.out.print(j);
			}
			System.out.println();
		}
	}
}
```

``` java
public class Pattern2 {
	public static void main(String[] args) {
		int loopUntil = Integer.parseInt(args[0]);
		for (int i = loopUntil; i > 0; i--) {
			for (int j = 1; j <= i; j++) {
				System.out.print(j);
			}
			System.out.println();
		}
	}
}
```

``` java
public class Patterns {

	public void printPattern1(int n) {
		for (int i = 1; i <= n; i++) {
			for (int j = 1; j <= i; j++) {
				System.out.print(j);
			}
			System.out.println();
		}
	}

	public void printPattern2(int n) {
		for (int i = n; i > 0; i--) {
			for (int j = 1; j <= i; j++) {
				System.out.print(j);
			}
			System.out.println();
		}
	}

	public static void main(String[] args) {
		int loopUntil = Integer.parseInt(args[0]);

		Patterns Pattern1 = new Patterns();
		Pattern1.printPattern1(loopUntil);

		Patterns Pattern2 = new Patterns();
		Pattern2.printPattern2(loopUntil);
	}
}
```

第五个题，是关于 Javadoc 的，其实有点不太懂，目前也不知道有没有软件可以辅助编写注释的，只能手打了，这个是题目中给的 java 范例：
``` java
public class CountDownExample {

	/**
	 * This method counts down from a specified number
	 * to zero. It will print its progress to the
	 * command line.
	 * @param count The number to count from.
	 */
	public void countDown(int count) {
		/**
		 * Note: If there are no brackets after a for
		 * loop, it is only the sentence that
		 * immediatly follows that is part of the loop.
		 */
		for (int i=count; i > 0; i--)
			System.out.println(i);

		System.out.println("nTime up!");
	}

	/**
	 * Main now only creates a new instance of my
	 * program and calls the program's method.
	 * @param args This program does not use this parameter.
	 */
	public static void main (String[] args) {
		CountDownExample q = new CountDownExample();
		q.countDown(5);
	}
}
```

在创建了 docCD 文件夹之后，运行这样的命令就可以在 docCD 文件夹里看到 Javadoc 文档了：
```shell
javadoc –d docCD CountDownExample.java
```

``` java
public class CountUpExample {
	/**
	 * This method counts down from a specified number
	 * to zero. It will print its progress to the
	 * command line.
	 * @param count The number to count from.
	 */
	public void countUp(int count) {
		/**
		 * Note: If there are no brackets after a for
		 * loop, it is only the sentence that
		 * immediatly follows that is part of the loop.
		 */
		for (int i = 1; i <= count; i++) {
			System.out.println(i);
		}
		System.out.println("nAll done!");
	}
	/**
	 * Main now only creates a new instance of my
	 * program and calls the program's method.
	 * @param args This program does not use this parameter.
	 */
	public static void main (String[] args) {
		CountUpExample q = new CountUpExample();
		q.countUp(5);
	}
}
```
