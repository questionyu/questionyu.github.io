---
title: Java Lab6
date: 2016-05-17 22:11:38
categories:
  - Code
tags:
  - Java
---

Java 的大作业在今天（2016-05-17）公布了，要求半个月时间写好，目测又是一波波哀嚎接连不断，我稍微看了两眼，是要求编写一个图形化的点菜系统，老师给的要求足足有 4 页那么多……丧心病狂的英方课……说到丧心病狂，还是应该数企管产开最变态，算了不扯了，都是伤心事……

这次的 Lab6 和上次的 Lab5 感觉在难度和水平上都比以前提升了一大截，有点让人招架不住，Lab6 建议还是好好写，自己写，毕竟又是一次要验收的实验。<!--more-->

第一题写的很慢，我的渣英语，题都看不懂，实在是心累，找同学帮忙翻译才明白啥意思。首先是老师提供的 MonsterMash.java，添加了几个怪到 List 里，然后所有的怪都出来打一轮，直到某一轮打完，伤害累积超过 100 就结束，不用修改：
``` java
import java.util.*;

/**
 *  Title      : MonsterMash.java
 *  Description: This class is the test class for Monsters.
 *  @author  Laurissa Tokarchuk
 *  @version 1.0
 *  @author  Paula Fonseca
 *  @version 1.1
 */
public class MonsterMash {
	public static void main(String[] args) {
		ArrayList<Monster> monsters = new ArrayList<Monster>();

		monsters.add(new Monster("Tom"));
		monsters.add(new Monster("George"));

		monsters.add(new Dragon("Smaug"));
		monsters.add(new Dragon("Jabosh"));

		monsters.add(new Troll("Salomon"));
		monsters.add(new Troll("Bender"));

		int damageDone = 0;
		while (damageDone < 100) {
			for (Monster m : monsters) {
				m.move((int)(Math.random()*4) + 1);
				damageDone += m.attack();
			}
		}
	}
}
```
2016-05-18 更新：这里面最后一段代码，``for`` 函数与我们之前见到的都不一样，今天有同学问我我才注意到，这里的 ``for`` 函数括号中间有两部分，用冒号（colon）隔开，其实是 ``foreach`` 函数，用来遍历，在这里的作用就是将 monsters 里面所有的对象都调出来，并建立引用（reference），将所有的对象都 move 一下，attack 一下。

定义一个 Monster 类，包括了怪的通用的方法（method），attack 和 move，如果你在这里也把 name 设置成 private，就需要像我一样多写一个 setter 和 getter 函数：
``` java
/**
 *  A class that defines monster.
 *
 *  @author Question
 *  @date   May 14, 2016
 */
public class Monster {
	// Instance variables.
	private String name;

	// Constructor.
	public Monster(String newName) {
		name = newName;
	}

	/**
	 *  A setter method.
	 *  @param newName The new name you want to set.
	 */
	public void setName(String newName) {
		name = newName;
	}

	/**
	 *  A getter method.
	 *  @return name The name of monster.
	 */
	public String getName() {
		return name;
	}

	/**
	 *  A method to add a student to the list.
	 *  @return attackValue The value of monster's attack.
	 */
	public int attack() {
		int attackValue = (int) (Math.random() * 5 + 1); // Random attack between 1 and 5.
		System.out.println(name + ", of type "
						   + this.getClass() + ", attacks generically: "
						   + attackValue + " points damage caused.");
		return attackValue;
	}

	/**
	 *  A method to show which direction the monster move.
	 *  @param direction The direction of monster.
	 */
	public void move(int direction) {
		switch(direction) {
			case 1:
				System.out.println(this.name + " is moving 1 step NORTH.");
				break;
			case 2:
				System.out.println(this.name + " is moving 1 step EAST.");
				break;
			case 3:
				System.out.println(this.name + " is moving 1 step SOUTH.");
				break;
			default:
				System.out.println(this.name + " is moving 1 step WEST.");
				break;
		}
	}
}
```
接下来写龙这种怪（感觉怪怪的），题目写明：30% 的时间龙是用龙息（吐火）来攻击的，剩下的时间是普通攻击，在这里时间上的分割其实可以用随机数来代替实现，随机生成 1 到 10 的整数，小于等于 3 时使用龙息：
``` java
/**
 *  A class that defines dragon.
 *
 *  @author Question
 *  @date   May 17, 2016
 */
public class Dragon extends Monster {
	// Constructor.
	public Dragon(String newName) {
		super(newName);
	}

	/**
	 *  Attack method of Dragon.
	 *  @return attackValue The value of dragon's attack.
	 */
	public int attack() {
		int timeSelect = (int) (Math.random() * 10 + 1); // Random integer number to decide how to attack.
		if(timeSelect <= 3) { // 30% of the time.
			int attackValue = (int) (Math.random() * 50 + 1); // Random attack between 1 and 50.
			System.out.println(this.getName() + ", of type "
							   + this.getClass() + ", attacks by breathing fire: "
							   + attackValue + " points damage caused.");
			return attackValue;
		} else {
			return super.attack();
		}
	}
}
```
然后是 Troll 这货，这是个啥我也不知道，英语渣：
``` java
/**
 *  A class that defines troll.
 *
 *  @author Question
 *  @date   May 17, 2016
 */
public class Troll extends Monster {
	// Constructor.
	public Troll(String newName) {
		super(newName);
		if(newName.equals("Saul") || newName.equals("Salomon")) { // If the name is Saul,
			System.out.println("Error!"); // print Error and
			setName("Detritus"); // set new name.
		}
	}
}
```
都写好之后，运行 MonsterMash 就出来一大片各种怪的攻击记录。

第二题在第一题的基础上有了更多的要求，将 Monster 变成抽象类，强制所有怪都要有特殊攻击方式，并定义了个特殊攻击的概率。Monster：
``` java
/**
 *  A class that defines monster.
 *
 *  @author Question
 *  @date   May 17, 2016
 */
public abstract class Monster implements SpecialAttack {
	// Instance variables.
	private String name;
	private double spAttackProbability = 0.2;

	/**
	 *  A constructor.
	 *  @param newName The new name you want to set.
	 */
	public Monster(String newName) {
		name = newName;
	}

	/**
	 *  A another constructor.
	 *  @param newName The new name you want to set.
	 *  @param spAttackProbability The probability of special attack you want to set.
	 */
	public Monster(String newName, double spAttackProbability) {
		name = newName;
		this.spAttackProbability = spAttackProbability;
	}

	/**
	 *  A setter method.
	 *  @param newName The new name you want to set.
	 */
	public void setName(String newName) {
		name = newName;
	}

	/**
	 *  A getter method.
	 *  @return name The name of monster.
	 */
	public String getName() {
		return name;
	}

	/**
	 *  A method to add a student to the list.
	 *  @return attackValue The value of monster's attack.
	 */
	public final int attack() {
		if(Math.random() < spAttackProbability) {
			return this.specialAttack();
		} else {
			int attackValue = (int) (Math.random() * 5 + 1); // Random attack between 1 and 5.
			System.out.println(name + ", of type "
							   + this.getClass() + ", attacks generically: "
							   + attackValue + " points damage caused.");
			return attackValue;
		}
	}

	/**
	 *  A method to show which direction the monster move.
	 *  @param direction The direction of monster.
	 */
	public void move(int direction) {
		switch(direction) {
			case 1:
				System.out.println(this.name + " is moving 1 step NORTH.");
				break;
			case 2:
				System.out.println(this.name + " is moving 1 step EAST.");
				break;
			case 3:
				System.out.println(this.name + " is moving 1 step SOUTH.");
				break;
			default:
				System.out.println(this.name + " is moving 1 step WEST.");
				break;
		}
	}
}
```
因为题目要求所有的怪强制定义特殊攻击，所以就想到了就接口来实现：
``` java
/**
 *  An interface that force classes to provide specialAttack method.
 *
 *  @author Question
 *  @date   May 17, 2016
 */
public interface SpecialAttack {
	public int specialAttack();
}
```
然后在 Dragon.java 和 Troll.java 里加上 specialAttack 函数就好了：
``` java
/**
 *  A class that defines dragon.
 *
 *  @author Question
 *  @date   May 17, 2016
 */
public class Dragon extends Monster {
	// Instance variable.
	private static double spAttackProbability = 0.3;

	// Constructors.
	public Dragon(String newName) {
		super(newName, spAttackProbability);
	}

	public Dragon(String newName, double newProbability) {
		super(newName, newProbability);
	}

	/**
	 *  Special attack method of Dragon.
	 *  @return attackValue The value of dragon's attack.
	 */
	public int specialAttack() {
		int attackValue = (int) (Math.random() * 50 + 1); // Random attack between 1 and 50.
		System.out.println(this.getName() + ", of type "
						   + this.getClass() + ", attacks by breathing fire: "
						   + attackValue + " points damage caused.");
		return attackValue;
	}
}
```
``` java
/**
 *  A class that defines troll.
 *
 *  @author Question
 *  @date   May 17, 2016
 */
public class Troll extends Monster {
	// Constructors.
	public Troll(String newName) {
		super(newName);
		if(newName.equals("Saul")) { // If the name is Saul,
			System.out.println("Error!"); // print Error and
			setName("Detritus"); // set new name.
		}
		if(newName.equals("Salomon")) { // If the name is Saul,
			System.out.println("Error!"); // print Error and
			setName("Detritus"); // set new name.
		}
	}

	public Troll(String newName, double newProbability) {
		super(newName, newProbability);
		if(newName.equals("Saul")) { // If the name is Saul,
			System.out.println("Error!"); // print Error and
			setName("Detritus"); // set new name.
		}
		if(newName.equals("Salomon")) { // If the name is Saul,
			System.out.println("Error!"); // print Error and
			setName("Detritus"); // set new name.
		}
	}

	/**
	 *  Special attack method of Troll.
	 *  @return attackValue The value of dragon's attack.
	 */
	public int specialAttack() {
		int attackValue = (int) (Math.random() * 15 + 1); // Random attack between 1 and 15.
		System.out.println(this.getName() + ", of type "
						   + this.getClass() + ", attacks by hiting with a club: "
						   + attackValue + " points damage caused.");
		return attackValue;
	}
}
```
最后，原先的 MonsterMash.java 已经不能编译了，因为 Monster 已经变成了抽象类，不能实例化，需要修改一下：
``` java
import java.util.*;

/**
 *  Title      : MonsterMash.java
 *  Description: This class is the test class for Monsters.
 *  @author  Laurissa Tokarchuk
 *  @version 1.0
 *  @author  Paula Fonseca
 *  @version 1.1
 *  @author  Question
 *  @version 1.2
 */
public class MonsterMash {
	public static void main(String[] args) {
		ArrayList<Monster> monsters = new ArrayList<Monster>();

		// The Monster class have been modified to an abstract class,
		// so java cannot create monster object.
		/*
		monsters.add(new Monster("Tom"));
		monsters.add(new Monster("George"));
		*/

		monsters.add(new Dragon("Smaug"));
		monsters.add(new Dragon("Jabosh"));

		monsters.add(new Troll("Salomon"));
		monsters.add(new Troll("Bender"));

		int damageDone = 0;
		while (damageDone < 100) {
			for (Monster m : monsters) {
				m.move((int)(Math.random()*4) + 1);
				damageDone += m.attack();
			}
		}
	}
}
```
