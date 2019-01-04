---
title: Java Lab5
date: 2016-05-07 15:00:03
categories:
  - Code
tags:
  - Java
---

这周二的 Java 测试，31 个选择题，做的是相当的爽啊～酸爽～

首先是前后左右相邻的两个人的卷子不一样，一个考场分 A1 和 A2 卷，前所未闻啊，估计不同时间考试的话还会有 B1 和 B2 卷，英国老师这想法真是给跪了，这样的防作弊，我还真是头一次见到。

让我跪了的不只是这个形式，还有考试内容，有的题完全就是问你前几次代码实验的内容，如果不是自己写的代码那题还真没法做，有的题干脆就直接问你 Lab4 实验中第二题的函数都叫什么名称，听说过，没见过，这和以前网上的新闻说某高校期末考试题是一个照片选择题，要求选出哪个是老师差不多，这头一次见到这样考的啊……

幸好，我在五一之前写完了第四次的实验代码，这才不至于栽了跟头。也有同学很幸运，自己没有写代码，看了我的代码之后竟然记住了 Lab4 代码里函数的名称，那个选择题他写对了～<!--more-->

好了，不说了，各位同学以后要好好写代码哦～下面是这次的实验代码内容。

第一题里，又用到了第三次实验的 `Cat.java`，我还是不放出来了，有需要的同学自己去看我的上一篇博客。

这里我建议可以先看看第二题的 `StudentList.java`，看了之后会对第一题有一点帮助。
``` java
/**
 * A class that test Cat class.
 *
 * @author      Question
 * @date        May 7, 2016
 * @version     1.0
 */
import java.awt.Color;
import java.util.ArrayList;

public class CatTest3 {
	public static void main(String[] args) {
		// Create an ArrayList which will contains many objects.
		ArrayList<Cat> list = new ArrayList<Cat>(5);

		// Create 5 different cats and add them to ArrayList.
		list.add(new Cat("Napoleon", "straight", true, Color.GRAY, 5));
		list.add(new Cat("Princess", "short", false, Color.WHITE, 10));
		list.add(new Cat("Whiskers", "long", true, Color.GRAY, 15));
		list.add(new Cat("Tom", "long", true, Color.BLUE, 10));
		list.add(new Cat("Jerry", "straight", true, Color.YELLOW, 10));

		// Print out the object of index 4.
		System.out.println(list.get(4));

		// Print out the size of ArrayList.
		System.out.println("The size of ArrayList is " + list.size() + ".");

		// Remove the object of index 3.
		list.remove(3);

		// Use a for loop to print out all cats' details.
		for (int i = 0; i < list.size(); i++) {
			System.out.println(list.get(i));
		}
	}
}
```

当写完 CatTest3，并且终于没有错误的时候，第二题写起来就非常的快了。

首先是实验给的 `Student.java`，不需要有任何改动，只用下载下来就可以了，这里我贴出来方便看：
``` java
/**
 *  A class that represents a student.
 *  @author  Ling Ma
 *  @created 2009
 *  @version 1.0
 *  @author  Paula Fonseca
 *  @version 1.1
 */
public class Student {
	private String firstName;
	private String lastName;
	private String email;
	private int year; // Year of registration on the course.

	/**
	 *  Constructor
	 *  @param  first name, last name, email and year of registration
	 */
	public Student(String firstName, String lastName, String email, int year) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.year = year;
	}

	/**
	 *  Get the first name.
	 *  @return  The student's first name.
	 */
	public String getFirstName() { return firstName; }

	/**
	 *  Get the last name.
	 *  @return  The student's last name.
	 */
	public String getLastName() { return lastName; }

	/**
	 *  A toString() method to give a String representation of a Student.
	 *  @return  The String representation of a Student.
	 */
	public String toString() {
		String fullName = firstName + " " + lastName;
		return "Name: " + fullName + " Email: " + email + " Year: " + year;
	}
}
```

然后是很快写好的 `StudentList.java`：
``` java
import java.util.ArrayList;

/**
 *  A class that holds a list of students.
 *
 *  @author Question
 *  @date   May 7, 2016
 */
public class StudentList {
	private ArrayList<Student> list; // instance variable

	/**
	 *  Constructor
	 */
	public StudentList() { list = new ArrayList<Student>(); }

	/**
	 *  A method to print off all ArrayList elements.
	 */
	public void printList() {
		System.out.println("--Begin--");
		for (int i = 0; i < list.size(); i++) {
			System.out.println(list.get(i));
		}
		System.out.println("--End--");
	}

	/**
	 *  A method to add a student to the list.
	 *  @param  The student.
	 */
	public void addToList(Student stu) {
		list.add(stu);
		System.out.println(stu.getFirstName()
						   + " "
						   + stu.getLastName()
						   + " has been added to the student list");
	}

	/**
	 *  A method to remove a student from the list.
	 *  @param  The student.
	 */
	public void removeFromList(Student stu) {
		boolean isRemove = list.remove(stu);
		if(isRemove) {
			System.out.println(stu.getFirstName()
							   + " "
							   + stu.getLastName()
							   + " has been removed from the list");
		} else {
			System.out.println("Woops! Something wrong! Failed to delete this student.");
		}
	}

	/**
	 *  A main() method to test.
	 */
	public static void main(String[] args) {
		// Create an instance of the class.
		StudentList studentList = new StudentList();

		// Create 3 student objects.
		Student stu1 = new Student("John", "Smith", "js@qmul.ac.uk", 2011);
		Student stu2 = new Student("Mary", "Davis", "md@qmul.ac.uk", 2012);
		Student stu3 = new Student("Sherlock", "Holmes", "xxx@qmul.ac.uk", 2014);

		// Add the 3 students to the list.
		studentList.addToList(stu1);
		studentList.addToList(stu2);
		studentList.addToList(stu3);

		// Print the list.
		studentList.printList();

		// Remove the student "Mary Davis"
		studentList.removeFromList(stu2);

		// Print the list again
		studentList.printList();
	}
}
```
