---
title: Lab8
date: 2016-06-13 13:46:18
categories:
  - Code
tags:
  - Java
---

马上就要考 MCQ2 了，我也不瞎 BB 了，各位有需要的赶紧看啊~

首先看懂题啥意思哈，看不懂题的话你也看不懂我在写啥……<!--more-->这题意思大概是说输入 7 位二进制数，even parity 的时候 0 和 1 的个数都是偶数个，odd parity 的时候 0 和 1 的个数都是奇数个。
``` java
/**
 * Title        ParityBitAdder.java
 * Description  This class defines a parity bit adder.
 * Copyright    (c) 2016 Copyright Holder All Rights Reserved.
 * @author      Question
 * @date        June 13th, 2016
 * @version     1.0
 */

public class ParityBitAdder {
	private char[] number;
	private static int oddEven;
	private String result;

	public static void main(String[] args) {
		ParityBitAdder myAdder = new ParityBitAdder(args);
		System.out.println("Adding " + (oddEven > 0 ? "odd" : "even")
						   + " parity to '" + args[0] + "' results in the binary pattern '"
						   + myAdder.getResult() + "'.");
	}

	/**
	 *  This constructor just tell the right usage and exit.
	 */
	public ParityBitAdder() {
		System.out.println("Usage:\njava ParityBitAdder 1010011 0\nOr:\njava ParityBitAdder 1010011 1");
		System.exit(0);
	}

	/**
	 *  This constructor check if user have input right parameters.
	 */
	public ParityBitAdder(String[] args) {
		if (args.length != 2 || args[0].length() != 7 || args[1].length() != 1) {
			System.out.println("Usage:\njava ParityBitAdder 1010011 0\nOr:\njava ParityBitAdder 1010011 1");
			System.exit(0);
		}
		number = args[0].toCharArray();
		for (int i = 0; i < number.length; i++) {
			if (!Character.isDigit(number[i]) || Integer.parseInt("" + number[i]) > 1 || Integer.parseInt("" + number[i]) < 0) {
				System.out.println("Usage:\njava ParityBitAdder 1010011 0\nOr:\njava ParityBitAdder 1010011 1");
				System.exit(0);
			}
		}
		if (!Character.isDigit(args[1].charAt(0)) || Integer.parseInt(args[1]) > 1 || Integer.parseInt(args[1]) < 0) {
			System.out.println("Usage:\njava ParityBitAdder 1010011 0\nOr:\njava ParityBitAdder 1010011 1");
			System.exit(0);
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
``` java
/**
 * Title        StringConverter.java
 * Description  This class defines a string converter.
 * Copyright    (c) 2016 Copyright Holder All Rights Reserved.
 * @author      Question
 * @date        June 13th, 2016
 * @version     1.0
 */

public class StringConverter {
	private String input;
	private String result;

	public static void main(String[] args) {
		StringConverter myConverter = new StringConverter(args);
		System.out.println("Output: " + myConverter.getResult());
	}

	/**
	 *  This constructor just tell the right usage and exit.
	 */
	public StringConverter() {
		System.out.println("Usage:\njava StringConverter \"My car Goes verY FAST!\"");
		System.exit(0);
	}

	/**
	 *  This constructor check if user have input right parameters.
	 */
	public StringConverter(String[] args) {
		if (args.length != 1) {
			System.out.println("Usage:\njava StringConverter \"My car Goes verY FAST!\"");
			System.exit(0);
		}
		input = args[0];
	}

	/**
	 *  This method call convertString method and return result.
	 *  @return result The convertation result.
	 */
	public String getResult() {
		convertString();
		return result;
	}

	/**
	 *  This method convert the input by some rules.
	 */
	private void convertString() {
		String middle = input.toUpperCase();
		middle = middle.replace("A", "a");
		middle = middle.replace("E", "e");
		middle = middle.replace("I", "i");
		middle = middle.replace("O", "o");
		middle = middle.replace("U", "u");
		middle = middle.replace("Y", "y");

		char[] middleChar = middle.toCharArray();
		for (int i = 0; i < middleChar.length; i++) {
			if (!Character.isLetter(middleChar[i])) {
				middleChar[i] = "*".charAt(0);
			}
		}

		result = new String(middleChar);
	}
}
```
