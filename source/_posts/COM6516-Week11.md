---
title: COM6516 Week11
date: 2018-12-03 17:25:31
categories:
  - Code
tags:
  - Java
  - COM6516
---

``` java
/*
 * Developed by Neo on 12/8/18 7:39 PM.
 * Last modified 11/24/17 2:18 PM.
 * Copyright (c) 2018. All rights reserved.
 */

/*
 * JCalculator.java
 * Class to produce a simple calculator in a window
 */

import javax.swing.*;
import java.awt.*;

public class JCalculator extends JFrame {
	private JCalculator() {
		super("JCalculator");
		Dimension dimension = Toolkit.getDefaultToolkit().getScreenSize();
		setSize(300, 400);
		setLocationRelativeTo(null);
		Container contentPane = this.getContentPane();

		JTextArea display = new JTextArea(1, 20);
		display.setEditable(false);
		display.setFont(new Font("Courier", Font.BOLD, 40));
		display.setPreferredSize(new Dimension(300, 100));
		contentPane.add(display, BorderLayout.NORTH);

		CalculatorButtons buttons = new CalculatorButtons(display);
		contentPane.add(buttons, BorderLayout.CENTER);

	}

	public static void main(String[] args) {
		JFrame frm = new JCalculator();
		frm.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		frm.setVisible(true);
	}
}
```
<!--more-->
``` java
/*
 * Developed by Neo on 12/8/18 7:48 PM.
 * Last modified 11/24/17 2:18 PM.
 * Copyright (c) 2018. All rights reserved.
 */

/*
 * CalculatorButtons.java
 * COM6516
 */

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.Arrays;

class CalculatorButtons extends JPanel {

	private static final String[] buttonLabels = {"7", "8", "9", "+", "4", "5", "6", "-",
			"1", "2", "3", "*", "0", "=", "+/-", "/"};
	private static final String[] opButtonLabels = {"+", "-", "*", "=", "+/-", "/"};

	private String displayedValue = "0";
	private String operand1;

	private enum OP {PLUS, MINUS, MULT, DIV}

	private OP operation = null;

	CalculatorButtons(JTextArea display) {
		setLayout(new GridLayout(4, 4));

		// create buttons using factory method
		for (int i = 0; i < 16; i++) {
			makeButton(this, buttonLabels[i], display);
		}
	}

	// factory method for making buttons
	private void makeButton(JPanel panel, String name, JTextArea display) {
		JButton button = new JButton(name);
		panel.add(button);
		// ADD CODE HERE TO CREATE NEW BUTTON ACTION, AND LINK BUTTON TO DISPLAY
		button.addActionListener(new ButtonAction(name, display));
	}

	private class ButtonAction implements ActionListener {
		private String theLabel;
		private JTextArea theDisplay;

		ButtonAction(String name, JTextArea display) {
			theLabel = name;
			theDisplay = display;
		}

		public void actionPerformed(ActionEvent actionEvent) {
			if (Arrays.asList(opButtonLabels).contains(theLabel)) { //If pressed + - * / = +/-
				if (theLabel.equals("=")) { //=
					if (operation == null) { //No second value
						//No need to update display
						System.out.println("No-op " + displayedValue);
					} else { //Calculate
						int result = 0;
						try {
							switch (operation) {
								case PLUS:
									result = Math.addExact(Integer.parseInt(operand1), Integer.parseInt(displayedValue));
									break;
								case MINUS:
									result = Math.subtractExact(Integer.parseInt(operand1), Integer.parseInt(displayedValue));
									break;
								case MULT:
									result = Math.multiplyExact(Integer.parseInt(operand1), Integer.parseInt(displayedValue));
									break;
								case DIV:
									//No need to check result if overflow
									result = Integer.parseInt(operand1) / Integer.parseInt(displayedValue);
									break;
							}
							System.out.println("Operands are " + operand1 + " and " + displayedValue);
							System.out.println("Result = " + result);
							displayedValue = Integer.toString(result);
							theDisplay.setText(displayedValue);
						} catch (ArithmeticException e) {
							displayedValue = "0";
							theDisplay.setText(e.getMessage());
						}
						operation = null;
					}
				} else if (theLabel.equals("+/-")) { //+/-
					int temp = Integer.parseInt(displayedValue) * -1;
					displayedValue = Integer.toString(temp);
					theDisplay.setText(displayedValue);
				} else { //+-*/
					if (operation == null) { //Continue only null operation
						switch (theLabel) {
							case "+":
								operation = OP.PLUS;
								theDisplay.setText("+");
								break;
							case "-":
								operation = OP.MINUS;
								theDisplay.setText("-");
								break;
							case "*":
								operation = OP.MULT;
								theDisplay.setText("*");
								break;
							case "/":
								operation = OP.DIV;
								theDisplay.setText("/");
								break;
						}
						operand1 = displayedValue;
						displayedValue = "0";
					}
				}
			} else { //If pressed number
				if (displayedValue.equals("0"))
					displayedValue = theLabel;
				else {
					if (displayedValue.length() < 8) //Cannot larger than 10M to prevent overflow
						displayedValue += theLabel;
				}

				theDisplay.setText(displayedValue);
			}
		}
	}
}
```

``` java
/*
 * Developed by Neo on 12/8/18 7:48 PM.
 * Last modified 11/24/17 2:18 PM.
 * Copyright (c) 2018. All rights reserved.
 */

/*
 * CalculatorButtons.java
 * COM6516
 */

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.Arrays;

class CalculatorButtons extends JPanel {

	private static final String[] buttonLabels = {"7", "8", "9", "+", "4", "5", "6", "-",
			"1", "2", "3", "*", "0", "=", ".", "/"};
	private static final String[] opButtonLabels = {"+", "-", "*", "=", "/"};

	private String displayedValue = "0";
	private String operand1;

	private enum OP {PLUS, MINUS, MULT, DIV}

	private OP operation = null;

	private boolean dotPressed = false;

	CalculatorButtons(JTextArea display) {
		setLayout(new GridLayout(4, 4));

		// create buttons using factory method
		for (int i = 0; i < 16; i++) {
			makeButton(this, buttonLabels[i], display);
		}
	}

	// factory method for making buttons
	private void makeButton(JPanel panel, String name, JTextArea display) {
		JButton button = new JButton(name);
		panel.add(button);
		// ADD CODE HERE TO CREATE NEW BUTTON ACTION, AND LINK BUTTON TO DISPLAY
		button.addActionListener(new ButtonAction(name, display));
	}

	private class ButtonAction implements ActionListener {
		private String theLabel;
		private JTextArea theDisplay;

		ButtonAction(String name, JTextArea display) {
			theLabel = name;
			theDisplay = display;
		}

		public void actionPerformed(ActionEvent actionEvent) {
			if (Arrays.asList(opButtonLabels).contains(theLabel)) { //If pressed + - * / =
				if (theLabel.equals("=")) { //=
					if (operation == null) { //No second value
						//No need to update display
						System.out.println("No-op " + displayedValue);
					} else { //Calculate
						float result = 0;
						try {
							switch (operation) {
								case PLUS:
									result = Float.parseFloat(operand1) + Float.parseFloat(displayedValue);
									break;
								case MINUS:
									result = Float.parseFloat(operand1) - Float.parseFloat(displayedValue);
									break;
								case MULT:
									result = Float.parseFloat(operand1) * Float.parseFloat(displayedValue);
									break;
								case DIV:
									result = Float.parseFloat(operand1) / Float.parseFloat(displayedValue);
									break;
							}
							System.out.println("Operands are " + operand1 + " and " + displayedValue);
							System.out.println("Result = " + result);
							displayedValue = Float.toString(result);
							theDisplay.setText(displayedValue);
						} catch (ArithmeticException e) {
							displayedValue = "0";
							theDisplay.setText(e.getMessage());
						}
						dotPressed = true; //Because result must be float and have a "."
						operation = null;
					}
				} else { //+-*/
					if (operation == null) { //Continue only null operation
						switch (theLabel) {
							case "+":
								operation = OP.PLUS;
								theDisplay.setText("+");
								break;
							case "-":
								operation = OP.MINUS;
								theDisplay.setText("-");
								break;
							case "*":
								operation = OP.MULT;
								theDisplay.setText("*");
								break;
							case "/":
								operation = OP.DIV;
								theDisplay.setText("/");
								break;
						}
						dotPressed = false;
						operand1 = displayedValue;
						displayedValue = "0";
					}
				}
			} else { //If pressed number or "."
				if (displayedValue.length() < 8) { //Prevent overflow
					if (theLabel.equals(".")) { //Press "."
						if (!dotPressed) {
							displayedValue += theLabel;
						}
						dotPressed = true;
					} else { //Press number
						if (displayedValue.equals("0"))
							displayedValue = theLabel;
						else {
							displayedValue += theLabel;
						}
					}
				}
				theDisplay.setText(displayedValue);
			}
		}
	}
}
```
