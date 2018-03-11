---
title: Lab7
date: 2016-06-05 13:39:33
categories:
  - Code
tags:
  - Java
---

这次的 Lab7 是在大作业发布之后的实验，所以这次的更新来的有点慢，有同学都开始催我发 Lab7 了。不是我不想发，而是大作业当头我只好先顾着大作业了，反正往后的几次试验都不验收了，所以先放下了实验，专心写大作业。

Java 的大作业，可以说，非常成功的检验了当代大学生“自学成才”的能力 -_-#，可以这么说：我的大作业有几乎一半的知识点都是在网上自己查资料写出来的。老师教的，课件写的，要么是没有相关知识点，要么就是不够好用。

这次大作业和 C 语言大作业一样，都是会在提交日期之后再放出来，没有办法，这东西是要计算成绩的，我也不敢拿我的成绩开玩笑。

其实先写写 Lab7 可能会对大作业比较有帮助，但毕竟已经是现在这个时间了（2016-06-05），说这些意义也不大了~<!--more-->

第一题和第二题的要求我一起看了，第二题的要求就是比第一题多了一个可以自己定义按钮数量的功能，所以我在写第一题的时候就按照第二题的思路来写了，写好第一题之后第二题几乎就是小小改动一下就可以用了。
``` java
/**
 * Title        CatchButtonGameV1.java
 * Description  This class contains a game which never will success.
 * Copyright    (c) 2016 Copyright Holder All Rights Reserved.
 * @author      Question
 * @date        June 5th, 2016
 * @version     1.0
 */

import java.awt.*;
import java.awt.event.*;
import javax.swing.*;

public class CatchButtonGameV1 extends JFrame {
	private static int number;
	private int size = (int) ((float) (Toolkit.getDefaultToolkit().getScreenSize().width) / 3); // Set the size of GUI.
	private JButton[] gameButton = new JButton[number * number];

	public static void main(String[] args) {
		number = 3;
		CatchButtonGameV1 game = new CatchButtonGameV1();
		game.start();
	}

	// Constructor.
	public CatchButtonGameV1() {
		super("Catch me if you can!");
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE); // Exit when click the exit button.
		getContentPane().setBackground(new Color(90, 154, 212)); // Set the background color of window.
		setSize(size, size); // Set the size of window.
		setResizable(false); // Forbid to resize the window.
		setLocationRelativeTo(null); // Set the window in the centre of screen.

		initialize();
	}

	/**
	 *  This method will create a GridLayout panel and add buttons to it.
	 */
	private void initialize() {
		int hap = (int) ((float) (size) / 100);
		JPanel gamePanel = new JPanel(new GridLayout(number, number, hap, hap));
		gamePanel.setOpaque(false);
		for (int i = 0; i < number * number; i++) {
			gameButton[i] = new JButton();
			gamePanel.add(gameButton[i]);
		}
		this.getContentPane().add(gamePanel);

		MouseListener moveOn = new MouseAdapter() {
			public void mouseEntered(MouseEvent e) {
				int Wooha = 0;
				for (int i = 0; i < number * number; i++) {
					if (e.getSource().equals(gameButton[i])) {
						Wooha = i;
						gameButton[i].setText("");
						gameButton[i].removeMouseListener(this);
						break;
					}
				}

				int i;
				do {
					i = (int) (Math.random() * number * number);
				} while (i == Wooha);
				gameButton[i].addMouseListener(this);
				gameButton[i].setText("Click me");
			}
		};

		int i = (int) (Math.random() * number * number);
		gameButton[i].addMouseListener(moveOn);
		gameButton[i].setText("Click me");
	}

	private void start() {
		this.setVisible(true);
	}
}
```
``` java
/**
 * Title        CatchButtonGameV2.java
 * Description  This class contains a game which never will success.
 * Copyright    (c) 2016 Copyright Holder All Rights Reserved.
 * @author      Question
 * @date        June 5th, 2016
 * @version     1.0
 */

import java.awt.*;
import java.awt.event.*;
import javax.swing.*;

public class CatchButtonGameV2 extends JFrame {
	private static int number;
	private int size = (int) ((float) (Toolkit.getDefaultToolkit().getScreenSize().width) / 3); // Set the size of GUI.
	private JButton[] gameButton = new JButton[number * number];

	public static void main(String[] args) {
		if (args.length < 1 || Double.parseDouble(args[0]) < 9) {
			System.out.println("Usage:\n Java CatchButtonGameV2 16(or 9, 25)");
			System.exit(0);
		}
		number = (int) Math.sqrt(Double.parseDouble(args[0]));
		CatchButtonGameV2 game = new CatchButtonGameV2();
		game.start();
	}

	// Constructor.
	public CatchButtonGameV2() {
		super("Catch me if you can!");
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE); // Exit when click the exit button.
		getContentPane().setBackground(new Color(90, 154, 212)); // Set the background color of window.
		setSize(size, size); // Set the size of window.
		setResizable(false); // Forbid to resize the window.
		setLocationRelativeTo(null); // Set the window in the centre of screen.

		initialize();
	}

	/**
	 *  This method will create a GridLayout panel and add buttons to it.
	 */
	private void initialize() {
		int hap = (int) ((float) (size) / 100);
		JPanel gamePanel = new JPanel(new GridLayout(number, number, hap, hap));
		gamePanel.setOpaque(false);
		for (int i = 0; i < number * number; i++) {
			gameButton[i] = new JButton();
			gamePanel.add(gameButton[i]);
		}
		this.getContentPane().add(gamePanel);

		MouseListener moveOn = new MouseAdapter() {
			public void mouseEntered(MouseEvent e) {
				int Wooha = 0;
				for (int i = 0; i < number * number; i++) {
					if (e.getSource().equals(gameButton[i])) {
						Wooha = i;
						gameButton[i].setText("");
						gameButton[i].removeMouseListener(this);
						break;
					}
				}

				int i;
				do {
					i = (int) (Math.random() * number * number);
				} while (i == Wooha);
				gameButton[i].addMouseListener(this);
				gameButton[i].setText("Click me");
			}
		};

		int i = (int) (Math.random() * number * number);
		gameButton[i].addMouseListener(moveOn);
		gameButton[i].setText("Click me");
	}

	private void start() {
		this.setVisible(true);
	}
}
```
