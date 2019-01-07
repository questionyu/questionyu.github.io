---
title: COM6516-Assessed-Lab
date: 2018-12-10 17:14:55
categories:
  - Code
tags:
  - Java
  - COM6516
---

{% note info %}
## Assessed Lab 1
{% endnote %}

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

{% note info %}
## Assessed Lab 2
{% endnote %}

``` java
/*
 * Developed by Neo on 12/10/18 5:17 PM.
 * Last modified 12/10/18 11:24 AM.
 * Copyright (c) 2018. All rights reserved.
 */

import javax.swing.*;

/**
 * This class will show the Scorer GUI.
 */
public class ScorerGUI {
	/**
	 * Program starts here.
	 *
	 * @param args command line arguments
	 */
	public static void main(String[] args) {
		JFrame f = new ScoringFrame();
		//Set the frame visible
		f.setVisible(true);
	}
}
```

``` java
/*
 * Developed by Neo on 12/10/18 5:17 PM.
 * Last modified 12/10/18 11:24 AM.
 * Copyright (c) 2018. All rights reserved.
 */

/**
 * This class is a score record.
 */
class Scorer {
	/**
	 * Scorer's name.
	 */
	private String name;
	/**
	 * Scorer's score.
	 */
	private int score;

	/**
	 * Constructor method of Scorer.
	 *
	 * @param name  Scorer's name.
	 * @param score Scorer's score.
	 */
	Scorer(String name, int score) {
		this.name = name;
		this.score = score;
	}

	/**
	 * Getter method of name.
	 *
	 * @return Scorer's name.
	 */
	String getName() {
		return name;
	}

	/**
	 * Getter method of score.
	 *
	 * @return Scorer's score.
	 */
	int getScore() {
		return score;
	}
}
```

``` java
/*
 * Developed by Neo on 12/10/18 5:17 PM.
 * Last modified 12/10/18 11:38 AM.
 * Copyright (c) 2018. All rights reserved.
 */

import java.util.Comparator;

/**
 * This comparator will compare two scorer's score.
 */
public class ScoreComparator implements Comparator<Scorer> {
	/**
	 * Compare to scorer's score.
	 *
	 * @param a First scorer.
	 * @param b Second scorer.
	 * @return The difference of two scorers' score.
	 */
	@Override
	public int compare(Scorer a, Scorer b) {
		return b.getScore() - a.getScore();
	}
}
```

``` java
/*
 * Developed by Neo on 12/10/18 5:17 PM.
 * Last modified 12/10/18 11:47 AM.
 * Copyright (c) 2018. All rights reserved.
 */

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.Set;
import java.util.TreeSet;

/**
 * This class will create a score frame.
 */
class ScoringFrame extends JFrame implements ActionListener {
	/**
	 * "Enter Score" button.
	 */
	private JButton enterButton;
	/**
	 * "Quit" button.
	 */
	private JButton quitButton;
	/**
	 * Name text field.
	 */
	private JTextField nameText;
	/**
	 * Score text field.
	 */
	private JTextField scoreText;

	/**
	 * This label show the highest score.
	 */
	private JLabel highestLabel;

	/**
	 * This set stores all scores.
	 */
	private Set<Scorer> scorerList;

	/**
	 * Constructor method of ScoringFrame.
	 */
	ScoringFrame() {
		//Set title
		super("Competition score GUI");
		//Set window's size
		setSize(960, 270);
		//Set window's position in the centre of screen
		this.setLocationRelativeTo(null);
		//Set this windows can only be closed by quit button
		this.setDefaultCloseOperation(JFrame.DO_NOTHING_ON_CLOSE);

		//Components of this frame
		JLabel nameLabel = new JLabel("Name: ");
		nameText = new JTextField(20);
		JLabel scoreLabel = new JLabel("Score: ");
		scoreText = new JTextField(5);
		enterButton = new JButton("Enter Score");
		enterButton.addActionListener(this);

		//Top
		JPanel topPanel = new JPanel();
		topPanel.add(nameLabel);
		topPanel.add(nameText);
		topPanel.add(scoreLabel);
		topPanel.add(scoreText);
		topPanel.add(enterButton);
		this.add(topPanel, BorderLayout.NORTH);

		//Centre
		highestLabel = new JLabel("Top scorer is", JLabel.CENTER);
		highestLabel.setFont(new Font("Arial", Font.PLAIN, 36));
		highestLabel.setForeground(Color.RED);
		this.add(highestLabel, BorderLayout.CENTER);

		//Bottom
		JPanel bottomPanel = new JPanel();
		quitButton = new JButton("Quit");
		quitButton.addActionListener(this);
		bottomPanel.add(quitButton);
		this.add(bottomPanel, BorderLayout.SOUTH);

		//Use comparator to sort this set
		scorerList = new TreeSet<>(new ScoreComparator());
	}

	/**
	 * This method execute every time when action happens.
	 *
	 * @param e Action event.
	 */
	@Override
	public void actionPerformed(ActionEvent e) {
		//If clicked "Enter Score" button
		if (e.getSource().equals(enterButton)) {
			//If user did not input correct data, popup a message
			if (nameText.getText().equals("") || scoreText.getText().equals("")) {
				JLabel promptLabel = new JLabel("Please input correct data!", JLabel.CENTER);
				JOptionPane.showMessageDialog(null, promptLabel, "Oops!", JOptionPane.ERROR_MESSAGE);
				return;
			}
			try {
				int tempScore = Integer.parseInt(scoreText.getText());
				//Check if user input correct number
				if (tempScore < 0 || tempScore >= 100)
					throw new NumberFormatException();

				//No problem, create new scorer, and store it
				Scorer newScorer = new Scorer(nameText.getText(), tempScore);
				scorerList.add(newScorer);

				//No need to check if has next
				Scorer highestScorer = scorerList.iterator().next();
				//Then set the text of high label
				highestLabel.setText("Top scorer is " + highestScorer.getName() + " with " + highestScorer.getScore() + "points");
			} catch (NumberFormatException ex) { //If user did not input correct number
				JLabel promptLabel = new JLabel("Please input correct data!", JLabel.CENTER);
				JOptionPane.showMessageDialog(null, promptLabel, "Oops!", JOptionPane.ERROR_MESSAGE);
			}
		} else if (e.getSource().equals(quitButton)) { //If clicked "Quit" button
			//Print all scorer's name and score.
			for (Scorer s : scorerList)
				System.out.println("Name = " + s.getName() + ", Score = " + s.getScore());
			//At last, goodbye my friend!
			System.exit(0);
		}
	}
}
```
