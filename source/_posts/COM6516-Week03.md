---
title: COM6516 Week03
date: 2018-10-08 11:58:45
categories:
  - Code
tags:
  - Java
  - COM6516
---

``` java
/*
 * FoodStore.java  	1.0 26/08/2011
 *
 * Copyright (c) University of Sheffield 2011
 */


/**
 * FoodStore.java
 * <p>
 * A simple class used in COM6516 lab class
 */

// this line of code declares the class
public class FoodStore {
	// this is the constructor, which is called when a new object is created
	// the constructor name is always the same as the class name
	// classes can have more than one constructor
	// the constructor make take zero or more parameters
	// in this case there is one parameter (int a) that is used to set the
	// instance field of the class
	public FoodStore(int a) {
		amountStored = a;
	}


	// these are class methods, which enable the value of the instance
	// field to be modified
	// these methods have a public access modifier, because they need to
	// be called by other classes
	// neither class method returns anything, so the return type is void
	public void depositFood(int amountToDeposit) {
		depositAmount += amountToDeposit;
		amountStored = amountStored + amountToDeposit;
	}

	public void withdrawFood(int amountToWithdraw) {
		withdrawAmount += amountToWithdraw;
		amountStored = amountStored - amountToWithdraw;
	}

	// these are accessor methods, which return the value of the
	// instance field
	public int getAmountStored() {
		return (amountStored);
	}

	// this is the instance field, which is an attribute associated with
	// each object of the FoodStore class
	// the access modifier is private, which means that this field can 
	// only be accessed through the class methods
	// by keeping instance fields private there is a well specified interface 
	// to the data associated with each object
	// this approach is called encapsulation
	private int amountStored;

	private int depositAmount = 0;
	private int withdrawAmount = 0;

	public int getDepositAmount() {
		return depositAmount;
	}

	public int getWithdrawAmount() {
		return withdrawAmount;
	}
}
```
<!--more-->
``` java
public class TestFoodStore {
	public static void main(String[] args) {
		// create a new FoodStore object called MyFoodStore
		// by invoking the constructor
		FoodStore MyFoodStore = new FoodStore(10);

		// display the amount stored by calling the getAmountStored
		// method associated with the MyFoodStore object
		System.out.println("Contains " + MyFoodStore.getAmountStored());

		System.out.println("Deposit 5 foods.");

		MyFoodStore.depositFood(5);

		System.out.println("Contains " + MyFoodStore.getAmountStored());

		System.out.println("Withdraw 10 foods.");

		MyFoodStore.withdrawFood(10);

		System.out.println("Contains " + MyFoodStore.getAmountStored());
	}
}
```

``` java
import sheffield.*;

class FoodManage {
	public static void main(String[] args) {
		FoodStore MyFoodStore = new FoodStore(10);

		EasyReader keyboard = new EasyReader();

		int numberOfWithdrawal = 0;
		int numberOfDeposit = 0;
		int numberOfRefuse = 0;

		while (true) {
			int amount = keyboard.readInt("Food manage: ");
			if (amount > 0) {
				MyFoodStore.depositFood(amount);
				System.out.println("Deposit " + amount + " foods.");
				numberOfDeposit++;
			} else if (amount < 0) {
				if (MyFoodStore.getAmountStored() < -amount) {
					System.out.println("Transaction refused.");
					numberOfRefuse++;
				} else {
					MyFoodStore.withdrawFood(-amount);
					System.out.println("Withdraw " + (-amount) + " foods.");
					numberOfWithdrawal++;
				}
			} else {
				System.out.println("Nothing to do.");
			}

			System.out.println("Total number of withdrawals: " + numberOfWithdrawal);
			System.out.println("Total number of deposits: " + numberOfDeposit);
			System.out.println("Total number of refused transactions: " + numberOfRefuse);

			System.out.println("Total amount of food deposited: " + MyFoodStore.getDepositAmount() + " foods.");
			System.out.println("Total amount of food withdrawn: " + MyFoodStore.getWithdrawAmount() + " foods.");
		}
	}
}
```

``` java
class TestBasket {
	public static void main(String[] args) {
		Item[] shopping = {new Item("baked beans", 0.3), new Item("tomato soup", 0.4)};
		for (Item i : shopping) {
			System.out.println(i.toString());
		}

		Basket myBasket = new Basket(shopping);

		System.out.println("Total price: " + myBasket.total());
	}
}
```

``` java
/**
 * Basket.java
 * <p>
 * Part of lab class for COM6516
 * Written by Mark Stevenson mark.stevenson@sheffield.ac.uk
 * Based on code written by Steve Maddock
 * Last modified 19 September 2014
 */

public class Basket {

	// Constructor function
	// Create a instance of Basket
	public Basket(Item[] it) {
		items = it;
	}

	// get total price of items in the basket
	public double total() {
		double tot = 0.0;
		for (int i = 0; i < items.length; i++) {
			tot += items[i].getPrice();
		} // for loop
		return tot;
	}

	// item collections
	private Item[] items;
}
```

``` java
/**
 * Item.java
 * <p>
 * Part of lab class for COM6516
 * Written by Mark Stevenson mark.stevenson@sheffield.ac.uk
 * Based on code written by Steve Maddock and Richard Clayton
 */

public class Item {
	public Item(String n, double p) {
		name = n;
		price = p;
	}

	public String getName() {
		return name;
	}

	public double getPrice() {
		return price;
	}

	// using ukp to denote pounds sterling as unicode pound symbol
	// does not display properly in MS Command Window
	@Override
	public String toString() {
		return ("Class type: " + getClass().getTypeName() +
				" Class name: " + getClass().getName() +
				" Name: " + name +
				" Price: " + price);
	}

	@Override
	public boolean equals(Object obj) {
		if (obj == this) return true;
		if (obj == null) return false;
		if (obj.getClass() != this.getClass()) return false;
		if (((Item) obj).getName() == this.getName() && ((Item) obj).getPrice() == this.getPrice()) return true;
		return false;
	}

	// equals method to be added here
	//public boolean equals(Object obj) {
	// check if identical objects
	// must be false if parameter is null
	// must be false if objects have different classes
	// now we can cast and do something specific for Item
	//}

	// instance fields
	private final double price;
	private final String name;

	public static void main(String[] args) {
		String TESTNAME = "testObject";
		double TESTPRICE = 10.0;
		Item testObject = new Item(TESTNAME, TESTPRICE);
		System.out.println("Name:");
		System.out.println("Actual field " + testObject.getName());
		System.out.println("Expected " + TESTNAME);
		System.out.println("Price:");
		System.out.println("Actual field " + testObject.getPrice());
		System.out.println("Expected " + TESTPRICE);
	}
}
```

``` java
class TestItemEquals {
	public static void main(String[] args) {
		Item tomato = new Item("Tomato", 0.2);

		Item tomatoCopy = tomato;

		System.out.println(tomato.equals(tomatoCopy));
	}
}
```
