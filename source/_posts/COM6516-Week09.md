---
title: COM6516 Week09
date: 2018-11-19 16:57:25
categories:
  - Code
tags:
  - Java
  - COM6516
---

``` java
/*
 * Developed by Neo on 19/11/18 11:54.
 * Last modified 19/11/18 11:54.
 * Copyright (c) 2018. All rights reserved.
 */

import javax.swing.*;
import java.awt.*;

public class CornerString extends JFrame {
	public CornerString() {
		super("Corner String");

		//For better looks.
		try {
			UIManager.setLookAndFeel("com.sun.java.swing.plaf.nimbus.NimbusLookAndFeel");
		} catch (Exception e) {
			e.printStackTrace();
		}

		this.setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
		this.setSize(960, 480);
		this.setResizable(false);
		this.setLocationRelativeTo(null);

		this.setContentPane(new StringPanel());

		this.setVisible(true);
	}

	public static void main(String[] args) {
		new CornerString();
	}

	public class StringPanel extends JPanel {
		public StringPanel() {
			super(new BorderLayout());

			JLabel label1 = new JLabel("To be or not to be");
			JLabel label2 = new JLabel("To be or not to be");
			JLabel label3 = new JLabel("To be or not to be");
			JLabel label4 = new JLabel("To be or not to be");

			label1.setFont(new Font("Consolas", Font.PLAIN, 32));
			label1.setForeground(Color.BLUE);
			label2.setFont(new Font("Comic Sans MS", Font.PLAIN, 32));
			label2.setForeground(Color.GREEN);
			label3.setFont(new Font("Monospaced", Font.PLAIN, 32));
			label3.setForeground(Color.RED);
			label4.setFont(new Font("Courier", Font.PLAIN, 32));
			label4.setForeground(Color.YELLOW);

			JPanel northPanel = new JPanel();
			northPanel.setLayout(new BoxLayout(northPanel, BoxLayout.X_AXIS));

			northPanel.add(label1);
			northPanel.add(Box.createHorizontalGlue());
			northPanel.add(label2);

			JPanel southPanel = new JPanel();
			southPanel.setLayout(new BoxLayout(southPanel, BoxLayout.X_AXIS));

			southPanel.add(label3);
			southPanel.add(Box.createHorizontalGlue());
			southPanel.add(label4);

			add(northPanel, BorderLayout.NORTH);
			add(southPanel, BorderLayout.SOUTH);
		}
	}
}
```
<!--more-->
``` java
/*
 * Developed by Neo on 19/11/18 15:44.
 * Last modified 19/11/18 15:44.
 * Copyright (c) 2018. All rights reserved.
 */

import javax.swing.*;

public class GIFFrame extends JFrame {
	public GIFFrame() {
		super("GIF Frame");

		setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);

		ImageIcon imageIcon = new ImageIcon("globe.gif", "globe");

		setSize(imageIcon.getIconWidth(), imageIcon.getIconHeight());

		JLabel imageLabel = new JLabel(imageIcon);

		add(imageLabel);

		setLocationRelativeTo(null);

		setVisible(true);
	}

	public static void main(String[] args) {
		new GIFFrame();
	}
}
```
