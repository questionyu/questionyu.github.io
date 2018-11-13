---
title: COM6516-Week08
categories:
  - Code
date: 2018-11-12 10:46:46
tags:
  - Java
  - COM6516
---

{% codeblock ListStringConvert.java lang:java %}
/*
 * Developed by Neo on 12/11/18 10:21.
 * Last modified 12/11/18 10:21.
 * Copyright (c) 2018. All rights reserved.
 */

import java.util.*;

public class ListStringConvert {
	public static void main(String[] args) {
		List<String> fixedList = Arrays.asList("elephant","lion","leopard", "tiger");
		System.out.println(fixedList);
		List<String> myList = new LinkedList<String>(fixedList);

//		Iterator<String> iter = myList.iterator();
		ListIterator<String> iter = myList.listIterator();

		ArrayList<String> newList = new ArrayList<>();
		while (iter.hasNext()) {
			newList.add(iter.next().toUpperCase());
		}

		System.out.println(newList);
	}
}
{% endcodeblock %}
<!--more-->
{% codeblock HashSetTest.java lang:java %}
import java.io.File;
import java.io.FileNotFoundException;
import java.util.*;

/*
	HashSetTest.java

	Example class that demonstrates used of HashSet Collection.
 */

public class HashSetTest {

	public static void main(String args[]) {
		Set<Person> people = new TreeSet<Person>(new AgeComparator());// here we declare people to be the most general type, which makes it possible to swap HashSet for TreeSet.
		StringTokenizer st;
		String firstName, surname, line;
		int age;

		// read data from file
		// (The try/catch construction catches an exception, ie. error,               
		// if the file is not found) 
		try {
			Scanner file = new Scanner(new File("Person.txt"));
			// assume file has at least one line
			// that specifies the number of records
			int numData = file.nextInt();

			// read in each line, and split into tokens
			for (int i = 0; i < numData; i++) {
				line = file.next();
				st = new StringTokenizer(line, "|");
				firstName = st.nextToken();
				surname = st.nextToken();
				age = Integer.parseInt(st.nextToken());
				people.add(new Person(firstName, surname, age));
			}
			file.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
			return;
		}

		// iterate through hash set
		Iterator<Person> iter = people.iterator();
		while (iter.hasNext()) {
			Person p = iter.next();
			if (!p.getSurname().equals("James") && !p.getSurname().equals("Cole")) {
				iter.remove();
			}
		}

		Iterator<Person> iter = people.iterator();
		while (iter.hasNext()) {
			Person p = iter.next();
			if (p.getSurname().equals("Wright-Phillips")) {
				iter.remove();
			}
		}

		// iterate through hash set
		Iterator<Person> i = people.iterator();
		while (i.hasNext()) {
			Person p = i.next();
			System.out.print(p);
			System.out.print(", hash code ");
			System.out.println(p.hashCode());
		}

		System.out.println("Using a comparator of a person class :");
		Person firstPerson = people.iterator().next();//grab the first one
		for (Person p : people)
			System.out.println(firstPerson + " compared to " + p + " returns " + firstPerson.compareTo(p));

		System.out.println("Using AgeComparator :");
		Comparator<Person> comparator = new AgeComparator();
		firstPerson = people.iterator().next();//grab the first one
		for (Person p : people)
			System.out.println(firstPerson + " compared to " + p + " returns " + comparator.compare(firstPerson, p));
	}
}
{% endcodeblock %}
{% codeblock AgeComparator.java lang:java %}
import java.util.*;

public class AgeComparator implements Comparator<Person> {

	public int compare(Person a, Person b) {
		return b.getAge() - a.getAge();
	}
}
{% endcodeblock %}
{% codeblock Shakespeare.java lang:java %}
/*
	Shakespeare.java

	Reads information from Shakespeare.txt
 */

import java.io.File;
import java.io.FileNotFoundException;
import java.util.*;

public class Shakespeare {

	public static void main(String args[]) {
		String line;
		String wd;
		StringTokenizer st;
		List<String> words = new LinkedList<String>();

		// Read data from file and split into tokens, i.e. words
		// (The try/catch construction catches an exception, ie. error, 
		// if the file is not found)
		try {
			Scanner file = new Scanner(new File("Shakespeare.txt"));
			// read in each line, and split into tokens
			while (file.hasNext()) {
				line = file.next();
				st = new StringTokenizer(line, " .,:?'");
				// space, full stop, comma, etc.
				// are included as token delimiters
				// and are thus not tokens themselves
				while (st.hasMoreTokens()) {
					wd = st.nextToken();
					words.add(wd);
				}
			}
			file.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
			return;
		}
		System.out.println("words: " + words);

		for (String word : words) {
			if (word.charAt(0) == 'a')
				System.out.print(word + ", ");
		}
		System.out.println();

		// Produce a sorted list
		Set<String> wds = new TreeSet<String>(new StringComparator());

		wds.addAll(words);

		System.out.println("sorted words: " + wds);

		List<String> lowerWords = new LinkedList<String>();
		for (String word : words)
			lowerWords.add(word.toLowerCase());

		Set<String> lowerWds = new TreeSet<String>(new StringComparator());

		lowerWds.addAll(lowerWords);

		for (String word : lowerWds)
			System.out.println(word + ": " + Collections.frequency(lowerWords, word));
	}
}
{% endcodeblock %}
{% codeblock StringComparator.java lang:java %}
/*
 * Developed by Neo on 12/11/18 11:40.
 * Last modified 12/11/18 11:40.
 * Copyright (c) 2018. All rights reserved.
 */

import java.util.Comparator;

public class StringComparator implements Comparator<String> {
	@Override
	public int compare(String o1, String o2) {
		return o1.compareTo(o2);
	}
}
{% endcodeblock %}
{% codeblock ListAgain.java lang:java %}
/*
 * Developed by Neo on 12/11/18 14:40.
 * Last modified 12/11/18 14:40.
 * Copyright (c) 2018. All rights reserved.
 */

import java.util.ArrayList;
import java.util.List;

public class ListAgain {
	public static void main(String[] args) {
		List<Integer> listA = new ArrayList<>();

		listA.add(1);
		listA.add(2);
		listA.add(3);
		listA.add(4);
		listA.add(5);

		List<Integer> listB = new ArrayList<>();

		listB.add(3);
		listB.add(4);
		listB.add(5);
		listB.add(6);
		listB.add(7);

		List<Integer> listC = new ArrayList<>(listA);

		listC.retainAll(listB);

		listA.addAll(listB);
		listA.removeAll(listC);

		System.out.println(listA);
	}
}
{% endcodeblock %}
{% codeblock MoreList.java lang:java %}
/*
 * Developed by Neo on 12/11/18 15:26.
 * Last modified 12/11/18 15:26.
 * Copyright (c) 2018. All rights reserved.
 */

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.ListIterator;

public class MoreList {
	public static void main(String[] args) {
		LinkedList<Integer> listA = new LinkedList<>();

		listA.add(0);
		listA.add(1);
		listA.add(2);
		listA.add(3);
		listA.add(4);

		List<Integer> listB = new ArrayList<>();

		listB.add(5);
		listB.add(6);
		listB.add(7);
		listB.add(8);
		listB.add(9);

		ListIterator<Integer> iteratorA;
		ListIterator<Integer> iteratorB;

		// 1
		iteratorA = listA.listIterator();
		iteratorB = listB.listIterator();

		while (iteratorA.hasNext()) {
			iteratorA.next();
			if (iteratorB.hasNext())
				iteratorA.add(iteratorB.next());
		}

		while (iteratorB.hasNext()) {
			iteratorA.add(iteratorB.next());
		}

		System.out.println("List A=" + listA);
		System.out.println("List B=" + listB);

		// 2
		iteratorB = listB.listIterator();

		while (iteratorB.hasNext()) {
			iteratorB.next();
			if (iteratorB.hasNext()) {
				iteratorB.next();
				iteratorB.remove();
			}
		}

		System.out.println("List A=" + listA);
		System.out.println("List B=" + listB);

		// 3
		listA.removeAll(listB);

		System.out.println("List A=" + listA);
		System.out.println("List B=" + listB);
	}
}
{% endcodeblock %}
