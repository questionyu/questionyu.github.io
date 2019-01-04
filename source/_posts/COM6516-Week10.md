---
title: COM6516-Week10
categories:
  - Code
date: 2018-11-26 23:33:52
tags:
  - Java
  - COM6516
---

``` java
import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class MyFrame extends JFrame implements ActionListener {
	private MyPanel drawingPanel;

	private MyFrame() {
		int width = (int) (Toolkit.getDefaultToolkit().getScreenSize().getWidth() / 2.0);
		int height = (int) (width / 16.0 * 9.0);
		setSize(width, height);
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		setLocationRelativeTo(null);

		//For better looks.
		try {
			UIManager.setLookAndFeel("com.sun.java.swing.plaf.windows.WindowsLookAndFeel");
		} catch (Exception e) {
			e.printStackTrace();
		}

		drawingPanel = new MyPanel();
		drawingPanel.setPolygon(5);
		Container contentPane = this.getContentPane();
		contentPane.add(drawingPanel, BorderLayout.CENTER);

		JPanel columnOfButtons = new JPanel(new GridLayout(8, 1));
		ButtonGroup buttonGroup = new ButtonGroup();
		for (int i = 3; i < 10; i++) {
			makeRadioButton(columnOfButtons, String.valueOf(i), buttonGroup, this);
		}

		JButton exit = new JButton("Exit");
		exit.addActionListener(this);
		columnOfButtons.add(exit);

		contentPane.add(columnOfButtons, BorderLayout.EAST);

		setVisible(true);
	}

	public static void main(String[] args) {
		javax.swing.SwingUtilities.invokeLater(MyFrame::new);
	}

	private void makeRadioButton(JPanel p, String name, ButtonGroup group, ActionListener target) {
		JRadioButton b = new JRadioButton(name);
		group.add(b);
		// add it to the specified JPanel and make the JPanel listen
		p.add(b);
		b.addActionListener(target);
	}

	public void actionPerformed(ActionEvent e) {
		// Do the appropriate thing depending on which button is pressed.
		// Use the getActionCommand() method to identify the button.
		switch (e.getActionCommand()) {
			case "Exit":
				System.exit(0);
			case "3":
				drawingPanel.setPolygon(3);
				break;
			case "4":
				drawingPanel.setPolygon(4);
				break;
			case "5":
				drawingPanel.setPolygon(5);
				break;
			case "6":
				drawingPanel.setPolygon(6);
				break;
			case "7":
				drawingPanel.setPolygon(7);
				break;
			case "8":
				drawingPanel.setPolygon(8);
				break;
			case "9":
				drawingPanel.setPolygon(9);
				break;
		}
	}

}
```
<!--more-->
``` java
/*
 * Developed by Neo on 26/11/18 15:37.
 * Last modified 17/11/17 14:21.
 * Copyright (c) 2018. All rights reserved.
 */

import javax.swing.*;
import java.awt.*;

public class MyPanel extends JPanel {
	private int sides = 0;

	void setPolygon(int sides) {
		this.sides = sides;
		this.repaint();
	}

	@Override
	protected void paintComponent(Graphics g) {
		super.paintComponent(g);

		Graphics2D g2 = (Graphics2D) g;

		g2.setColor(Color.RED);

		// Make text and shapes appear smoother
		g2.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);

		if (sides == 0) sides = 5;
		int[] x = new int[sides];
		int[] y = new int[sides];

		int width = getWidth();
		int height = getHeight();

		int r = (width > height ? height : width) / 3;

		for (int i = 0; i < sides; i++) {
			x[i] = (int) (width / 2 + r * Math.cos(2 * Math.PI / sides * i));
			y[i] = (int) (height / 2 + r * Math.sin(2 * Math.PI / sides * i));
		}
		Shape shape = new Polygon(x, y, sides);

		g2.draw(shape);
	}
}
```
