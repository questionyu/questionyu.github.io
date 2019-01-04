---
title: Java Lab9
date: 2016-06-13 22:32:50
categories:
  - Code
tags:
  - Java
---

Lab9 里面有两个题都是和 Lab8 相关的，看 Lab9 的话要先把 Lab8 看了。

第一个题是装了个逼，把 Lab8 的代码加个抛出异常~ParityBitAdder 升级到了 v2~<!--more-->
``` java
/**
 * Title        ParityBitAdder_v2.java
 * Description  This class defines a parity bit adder.
 * Copyright    (c) 2016 Copyright Holder All Rights Reserved.
 * @author      Question
 * @date        June 13th, 2016
 * @version     1.0
 */

public class ParityBitAdder_v2 {
	private char[] number;
	private static int oddEven;
	private String result;

	public static void main(String[] args) {
		try {
			ParityBitAdder_v2 myAdder = new ParityBitAdder_v2(args);
			System.out.println("Adding " + (oddEven > 0 ? "odd" : "even")
							   + " parity to '" + args[0] + "' results in the binary pattern '"
							   + myAdder.getResult() + "'.");
		} catch (NonBinaryValue e) {
			System.out.println("Error: The first input to this program must be a 7-bit binary number. Please try again!");
			System.exit(0);
		} catch (IllegalParityValue e) {
			System.out.println("Error: The program's parity bit input (the second argument) must be either 0 or 1. Please try again!");
			System.exit(0);
		}
	}

	/**
	 *  This constructor just tell the right usage and exit.
	 */
	public ParityBitAdder_v2() {
		System.out.println("Usage:\njava ParityBitAdder 1010011 0\nOr:\njava ParityBitAdder 1010011 1");
		System.exit(0);
	}

	/**
	 *  This constructor check if user have input right parameters.
	 */
	public ParityBitAdder_v2(String[] args) throws NonBinaryValue, IllegalParityValue {
		if (args.length != 2) {
			System.out.println("Usage:\njava ParityBitAdder 1010011 0\nOr:\njava ParityBitAdder 1010011 1");
			System.exit(0);
		}
		if (args[0].length() != 7) {
			throw new NonBinaryValue();
		}
		if (args[1].length() != 1) {
			throw new IllegalParityValue();
		}
		number = args[0].toCharArray();
		for (int i = 0; i < number.length; i++) {
			if (!Character.isDigit(number[i]) || Integer.parseInt("" + number[i]) > 1 || Integer.parseInt("" + number[i]) < 0) {
				throw new NonBinaryValue();
			}
		}
		if (!Character.isDigit(args[1].charAt(0)) || Integer.parseInt(args[1]) > 1 || Integer.parseInt(args[1]) < 0) {
			throw new IllegalParityValue();
		}
		oddEven = Integer.parseInt(args[1]);
	}

	/**
	 *  This method call calculateParity method and return result.
	 *  @return result The calculation result.
	 */
	public String getResult() {
		calculateParity();
		return result;
	}

	/**
	 *  This method calculate the parity and add into a string.
	 */
	private void calculateParity() {
		int one = 0;
		for (int i = 0; i < number.length; i++) {
			if (Integer.parseInt("" + number[i]) == 1) {
				one++;
			}
		}
		if ((one % 2) == oddEven) {
			result = "0" + (new String(number));
		} else {
			result = "1" + (new String(number));
		}
	}
}
```

需要抛出的俩异常要自己写出来：
``` java
/**
 * Title        NonBinaryValue.java
 * Description  This class defines a custom exception.
 * Copyright    (c) 2016 Copyright Holder All Rights Reserved.
 * @author      Question
 * @date        June 13th, 2016
 * @version     1.0
 */

public class NonBinaryValue extends RuntimeException {
	public NonBinaryValue() {}
	public NonBinaryValue(String message) {
		super(message);
	}
}
```

``` java
/**
 * Title        IllegalParityValue.java
 * Description  This class defines a custom exception.
 * Copyright    (c) 2016 Copyright Holder All Rights Reserved.
 * @author      Question
 * @date        June 13th, 2016
 * @version     1.0
 */

public class IllegalParityValue extends RuntimeException {
	public IllegalParityValue() {}
	public IllegalParityValue(String message) {
		super(message);
	}
}
```

第二题小改一下，不再是带着参数运行程序了，而是运行中要求用户在控制台输入，就是加个 `System.in`，最多也就是再来个友好的提示：
``` java
/**
 * Title        ParityBitAdder_v3.java
 * Description  This class defines a parity bit adder.
 * Copyright    (c) 2016 Copyright Holder All Rights Reserved.
 * @author      Question
 * @date        June 13th, 2016
 * @version     1.0
 */

import java.util.Scanner;

public class ParityBitAdder_v3 {
	private char[] number;
	private static int oddEven;
	private String result;

	public static void main(String[] waste) {
		System.out.println("#########################################");
		System.out.println("#                 Hello                 #");
		System.out.println("#      Welcome use ParityBitAdder!      #");
		System.out.println("#########################################");
		System.out.println("Please input 7-bit binary number:");
		Scanner binaryScanner = new Scanner(System.in);
		String binaryString = binaryScanner.nextLine();
		System.out.println("Please input the type of parity:(0 = even, 1 = odd)");
		Scanner typeScanner = new Scanner(System.in);
		String typeString = typeScanner.nextLine();
		String[] args = {binaryString, typeString};
		try {
			ParityBitAdder_v3 myAdder = new ParityBitAdder_v3(args);
			System.out.println("Adding " + (oddEven > 0 ? "odd" : "even")
							   + " parity to '" + args[0] + "' results in the binary pattern '"
							   + myAdder.getResult() + "'.");
		} catch (NonBinaryValue e) {
			System.out.println("Error: The first input to this program must be a 7-bit binary number. Please try again!");
			System.exit(0);
		} catch (IllegalParityValue e) {
			System.out.println("Error: The program's parity bit input (the second argument) must be either 0 or 1. Please try again!");
			System.exit(0);
		}
	}

	/**
	 *  This constructor check if user have input right parameters.
	 */
	public ParityBitAdder_v3(String[] args) throws NonBinaryValue, IllegalParityValue {
		if (args[0].length() != 7) {
			throw new NonBinaryValue();
		}
		if (args[1].length() != 1) {
			throw new IllegalParityValue();
		}
		number = args[0].toCharArray();
		for (int i = 0; i < number.length; i++) {
			if (!Character.isDigit(number[i]) || Integer.parseInt("" + number[i]) > 1 || Integer.parseInt("" + number[i]) < 0) {
				throw new NonBinaryValue();
			}
		}
		if (!Character.isDigit(args[1].charAt(0)) || Integer.parseInt(args[1]) > 1 || Integer.parseInt(args[1]) < 0) {
			throw new IllegalParityValue();
		}
		oddEven = Integer.parseInt(args[1]);
	}

	/**
	 *  This method call calculateParity method and return result.
	 *  @return result The calculation result.
	 */
	public String getResult() {
		calculateParity();
		return result;
	}

	/**
	 *  This method calculate the parity and add into a string.
	 */
	private void calculateParity() {
		int one = 0;
		for (int i = 0; i < number.length; i++) {
			if (Integer.parseInt("" + number[i]) == 1) {
				one++;
			}
		}
		if ((one % 2) == oddEven) {
			result = "0" + (new String(number));
		} else {
			result = "1" + (new String(number));
		}
	}
}
```

和上一题一样，也用到那俩异常了，直接复制粘贴过来用就行了。

第三题瞎 BB 一堆，又是扯遗传算法又是扯染色体什么玩意儿的，都不用看，直接看小标号的要求就可以了。
``` java
/**
 * Title        Chromosome.java
 * Description  This class defines a chromosome.
 * Copyright    (c) 2016 Copyright Holder All Rights Reserved.
 * @author      Question
 * @date        June 13th, 2016
 * @version     1.0
 */

public class Chromosome {
	int[] chromosomeArray;

	/**
	 *  Main method creates two Chromosome objects.
	 */
	public static void main(String[] args) {
		int[] first = {1, 0, 1, 1, 1, 0, 1};
		int[] second = {3, 5, 2, 2};

		try {
			Chromosome firstChromosome = new Chromosome(first);
			System.out.println(firstChromosome.toString());
			Chromosome secondChromosome = new Chromosome(second);
			System.out.println(secondChromosome.toString());
		} catch (NonBinaryValue e) {
			System.out.println("Error: The input must be a binary number.");
			System.out.println("Wrong chromosome will be reset to default chromosome.");
			e.printStackTrace();
			System.exit(0);
		}
	}

	/**
	 *  This constructor check if input is right.
	 */
	public Chromosome(int[] args) throws NonBinaryValue {
		chromosomeArray = args;
		for (int i = 0; i < args.length; i++) {
			if (args[i] > 1 || args[i] < 0) {
				for (int j = 0; j < chromosomeArray.length; j++) {
					chromosomeArray[j] = 1;
				}
				throw new NonBinaryValue();
			}
		}
	}

	/**
	 *  This method will calculate the number of "1" and return.
	 *  @return one The number of "1".
	 */
	public int getFitness() {
		int one = 0;
		for (int i = 0; i < chromosomeArray.length; i++) {
			if (chromosomeArray[i] == 1) {
				one++;
			}
		}
		return one;
	}

	/**
	 *  This method transfer chromosome to a string and return.
	 *  @return myStringBuffer.toString() The string which contains all numbers of chromosome.
	 */
	public String toString() {
		StringBuffer myStringBuffer = new StringBuffer("[");
		for (int i = 0; i < chromosomeArray.length - 1; i++) {
			myStringBuffer.append(chromosomeArray[i]);
			myStringBuffer.append(" ");
		}
		myStringBuffer.append(chromosomeArray[chromosomeArray.length - 1]);
		myStringBuffer.append("]");
		return myStringBuffer.toString();
	}
}
```

最后扯一句，有时间最好自己看看题，只看我的代码恐怕会在一定程度上影响你们的想法，不是太好~

祝各位，Java 都高分考过！
