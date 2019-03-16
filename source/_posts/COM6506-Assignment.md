---
title: COM6506-Assignment
date: 2018-12-04 14:09:47
categories:
  - Code
tags:
  - Java
  - COM6506
---

``` java
package dateTests;

import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import static org.junit.jupiter.api.Assertions.assertEquals;

class MetaMorphicTestingExample {
	/**
	 * Illustration of how one might test the Metamorphic relation MA,
	 * given as example in the assignment (that the day of the week can
	 * be optional.
	 */
	@Test
	void MA() {
		//Imagine that the following string had been in our CatPart tests:
		String originalInput = "Tue, 3 Jun 2008 11:05:30 GMT";
		//Now we compute the output from the original test case.
		LocalDateTime originalDateTime = LocalDateTime.parse(originalInput, DateTimeFormatter.RFC_1123_DATE_TIME);

		/*Now we generate a new test input to test the Metamorphic relation.
		 * For the relation MA, we remove the 'Tue' part of the input, and make
		 * the assumption that we should also remove the subsequent comma and space
		 * as well to avoid a parsing error:
		 */

		String metaMorphInput = "3 Jun 2008 11:05:30 GMT";
		LocalDateTime metaMorphDateTime = LocalDateTime.parse(metaMorphInput, DateTimeFormatter.RFC_1123_DATE_TIME);

		/*Our Metamorphic relation suggests that the resulting time should remain
		 * equal to the original time. Therefore we make this our test oracle:
		 */

		assertEquals(originalDateTime, metaMorphDateTime);
	}
}
```
<!--more-->
``` java
package dateTests;

import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

class CatPart {
	@Test
	void test0() {
		String originalInput = "Mon, 6 Jan 2020 10:05:04 GMT";
		LocalDateTime originalDateTime = LocalDateTime.parse(originalInput, DateTimeFormatter.RFC_1123_DATE_TIME);
		/*
		 * day-of-week: weekdays
		 * day-of-month: first third of month
		 * month-of-year: quarter 1
		 * year: leap year
		 * hour-of-day: am, even
		 * minute-of-hour: <10, odd
		 * second-of-minute: <10, even
		 * offset ID: GMT
		 */
	}

	@Test
	void test1() {
		String originalInput = "Tue, 17 Apr 2018 09:06:07 -0100";
		LocalDateTime originalDateTime = LocalDateTime.parse(originalInput, DateTimeFormatter.RFC_1123_DATE_TIME);
		/*
		 * day-of-week: weekdays
		 * day-of-month: middle third of month
		 * month-of-year: quarter 2
		 * year: common year
		 * hour-of-day: am, odd
		 * minute-of-hour: <10, even
		 * second-of-minute: <10, odd
		 * offset ID: -, is a multiple of an hour
		 */
	}

	@Test
	void test2() {
		String originalInput = "Wed, 22 Jul 2020 08:12:33 -0130";
		LocalDateTime originalDateTime = LocalDateTime.parse(originalInput, DateTimeFormatter.RFC_1123_DATE_TIME);
		/*
		 * day-of-week: weekdays
		 * day-of-month: last third of month
		 * month-of-year: quarter 3
		 * year: leap year
		 * hour-of-day: am, even
		 * minute-of-hour: >=10, even
		 * second-of-minute: >=10, odd
		 * offset ID: -, is not a multiple of an hour
		 */
	}

	@Test
	void test3() {
		String originalInput = "Thu, 4 Oct 2018 13:16:21 +0230";
		LocalDateTime originalDateTime = LocalDateTime.parse(originalInput, DateTimeFormatter.RFC_1123_DATE_TIME);
		/*
		 * day-of-week: weekdays
		 * day-of-month: first third of month
		 * month-of-year: quarter 4
		 * year: common year
		 * hour-of-day: pm, odd
		 * minute-of-hour: >=10, even
		 * second-of-minute: >=10, odd
		 * offset ID: +, is not a multiple of an hour
		 */
	}

	@Test
	void test4() {
		String originalInput = "Fri, 14 Feb 2020 14:05:30 +0330";
		LocalDateTime originalDateTime = LocalDateTime.parse(originalInput, DateTimeFormatter.RFC_1123_DATE_TIME);
		/*
		 * day-of-week: weekdays
		 * day-of-month: middle third of month
		 * month-of-year: quarter 1
		 * year: leap year
		 * hour-of-day: pm, even
		 * minute-of-hour: <10, odd
		 * second-of-minute: >=10, even
		 * offset ID: +, is not a multiple of an hour
		 */
	}

	@Test
	void test5() {
		String originalInput = "Sat, 26 May 2018 07:03:40 -0500";
		LocalDateTime originalDateTime = LocalDateTime.parse(originalInput, DateTimeFormatter.RFC_1123_DATE_TIME);
		/*
		 * day-of-week: weekends
		 * day-of-month: last third of month
		 * month-of-year: quarter 2
		 * year: common year
		 * hour-of-day: am, odd
		 * minute-of-hour: <10, odd
		 * second-of-minute: >=10, even
		 * offset ID: -, is a multiple of an hour
		 */
	}

	@Test
	void test6() {
		String originalInput = "Sat, 8 Aug 2020 06:35:07 GMT";
		LocalDateTime originalDateTime = LocalDateTime.parse(originalInput, DateTimeFormatter.RFC_1123_DATE_TIME);
		/*
		 * day-of-week: weekends
		 * day-of-month: first third of month
		 * month-of-year: quarter 3
		 * year: leap year
		 * hour-of-day: am, even
		 * minute-of-hour: >=10, odd
		 * second-of-minute: <10, odd
		 * offset ID: GMT
		 */
	}

	@Test
	void test7() {
		String originalInput = "Sat, 17 Nov 2018 15:08:02 +0630";
		LocalDateTime originalDateTime = LocalDateTime.parse(originalInput, DateTimeFormatter.RFC_1123_DATE_TIME);
		/*
		 * day-of-week: weekends
		 * day-of-month: middle third of month
		 * month-of-year: quarter 4
		 * year: common year
		 * hour-of-day: pm, odd
		 * minute-of-hour: >=10, even
		 * second-of-minute: <10, even
		 * offset ID: +, is not a multiple of an hour
		 */
	}

	@Test
	void test8() {
		String originalInput = "Sun, 22 Mar 2020 17:09:03 -0700";
		LocalDateTime originalDateTime = LocalDateTime.parse(originalInput, DateTimeFormatter.RFC_1123_DATE_TIME);
		/*
		 * day-of-week: weekends
		 * day-of-month: last third of month
		 * month-of-year: quarter 1
		 * year: leap year
		 * hour-of-day: pm, odd
		 * minute-of-hour: <10, odd
		 * second-of-minute: <10, odd
		 * offset ID: -, is a multiple of an hour
		 */
	}

	@Test
	void test9() {
		String originalInput = "Sun, 3 Jun 2018 18:50:20 +0800";
		LocalDateTime originalDateTime = LocalDateTime.parse(originalInput, DateTimeFormatter.RFC_1123_DATE_TIME);
		/*
		 * day-of-week: weekends
		 * day-of-month: first third of month
		 * month-of-year: quarter 2
		 * year: common year
		 * hour-of-day: pm, even
		 * minute-of-hour: >=10, even
		 * second-of-minute: >=10, even
		 * offset ID: +, is a multiple of an hour
		 */
	}
}
```

``` java
package dateTests;

import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import static org.junit.jupiter.api.Assertions.assertEquals;

class MA {
	/*
	 * The year plus 1 should equals to the day plus 365 or 366(when leap year).
	 */
	@Test
	void test0() {
		String originalInput = "Mon, 6 Jan 2020 10:05:04 GMT";
		LocalDateTime originalDateTime = LocalDateTime.parse(originalInput, DateTimeFormatter.RFC_1123_DATE_TIME);
		/*
		 * day-of-week: weekdays
		 * day-of-month: first third of month
		 * month-of-year: quarter 1
		 * year: leap year
		 * hour-of-day: am, even
		 * minute-of-hour: <10, odd
		 * second-of-minute: <10, even
		 * offset ID: GMT
		 */
		String metamorphicInput = "Wed, 6 Jan 2021 10:05:04 GMT";
		LocalDateTime metamorphicDateTime = LocalDateTime.parse(metamorphicInput, DateTimeFormatter.RFC_1123_DATE_TIME);

		assertEquals(originalDateTime, metamorphicDateTime.minusDays(366));
	}

	@Test
	void test1() {
		String originalInput = "Tue, 17 Apr 2018 09:06:07 -0100";
		LocalDateTime originalDateTime = LocalDateTime.parse(originalInput, DateTimeFormatter.RFC_1123_DATE_TIME);
		/*
		 * day-of-week: weekdays
		 * day-of-month: middle third of month
		 * month-of-year: quarter 2
		 * year: common year
		 * hour-of-day: am, odd
		 * minute-of-hour: <10, even
		 * second-of-minute: <10, odd
		 * offset ID: -, is a multiple of an hour
		 */
		String metamorphicInput = "Wed, 17 Apr 2019 09:06:07 -0100";
		LocalDateTime metamorphicDateTime = LocalDateTime.parse(metamorphicInput, DateTimeFormatter.RFC_1123_DATE_TIME);

		assertEquals(originalDateTime, metamorphicDateTime.minusDays(365));
	}

	@Test
	void test2() {
		String originalInput = "Wed, 22 Jul 2020 08:12:33 -0130";
		LocalDateTime originalDateTime = LocalDateTime.parse(originalInput, DateTimeFormatter.RFC_1123_DATE_TIME);
		/*
		 * day-of-week: weekdays
		 * day-of-month: last third of month
		 * month-of-year: quarter 3
		 * year: leap year
		 * hour-of-day: am, even
		 * minute-of-hour: >=10, even
		 * second-of-minute: >=10, odd
		 * offset ID: -, is not a multiple of an hour
		 */
		String metamorphicInput = "Thu, 22 Jul 2021 08:12:33 -0130";
		LocalDateTime metamorphicDateTime = LocalDateTime.parse(metamorphicInput, DateTimeFormatter.RFC_1123_DATE_TIME);

		assertEquals(originalDateTime, metamorphicDateTime.minusDays(365));
	}

	@Test
	void test3() {
		String originalInput = "Thu, 4 Oct 2018 13:16:21 +0230";
		LocalDateTime originalDateTime = LocalDateTime.parse(originalInput, DateTimeFormatter.RFC_1123_DATE_TIME);
		/*
		 * day-of-week: weekdays
		 * day-of-month: first third of month
		 * month-of-year: quarter 4
		 * year: common year
		 * hour-of-day: pm, odd
		 * minute-of-hour: >=10, even
		 * second-of-minute: >=10, odd
		 * offset ID: +, is not a multiple of an hour
		 */
		String metamorphicInput = "Fri, 4 Oct 2019 13:16:21 +0230";
		LocalDateTime metamorphicDateTime = LocalDateTime.parse(metamorphicInput, DateTimeFormatter.RFC_1123_DATE_TIME);

		assertEquals(originalDateTime, metamorphicDateTime.minusDays(365));
	}

	@Test
	void test4() {
		String originalInput = "Fri, 14 Feb 2020 14:05:30 +0330";
		LocalDateTime originalDateTime = LocalDateTime.parse(originalInput, DateTimeFormatter.RFC_1123_DATE_TIME);
		/*
		 * day-of-week: weekdays
		 * day-of-month: middle third of month
		 * month-of-year: quarter 1
		 * year: leap year
		 * hour-of-day: pm, even
		 * minute-of-hour: <10, odd
		 * second-of-minute: >=10, even
		 * offset ID: +, is not a multiple of an hour
		 */
		String metamorphicInput = "Sun, 14 Feb 2021 14:05:30 +0330";
		LocalDateTime metamorphicDateTime = LocalDateTime.parse(metamorphicInput, DateTimeFormatter.RFC_1123_DATE_TIME);

		assertEquals(originalDateTime, metamorphicDateTime.minusDays(366));
	}

	@Test
	void test5() {
		String originalInput = "Sat, 26 May 2018 07:03:40 -0500";
		LocalDateTime originalDateTime = LocalDateTime.parse(originalInput, DateTimeFormatter.RFC_1123_DATE_TIME);
		/*
		 * day-of-week: weekends
		 * day-of-month: last third of month
		 * month-of-year: quarter 2
		 * year: common year
		 * hour-of-day: am, odd
		 * minute-of-hour: <10, odd
		 * second-of-minute: >=10, even
		 * offset ID: -, is a multiple of an hour
		 */
		String metamorphicInput = "Sun, 26 May 2019 07:03:40 -0500";
		LocalDateTime metamorphicDateTime = LocalDateTime.parse(metamorphicInput, DateTimeFormatter.RFC_1123_DATE_TIME);

		assertEquals(originalDateTime, metamorphicDateTime.minusDays(365));
	}

	@Test
	void test6() {
		String originalInput = "Sat, 8 Aug 2020 06:35:07 GMT";
		LocalDateTime originalDateTime = LocalDateTime.parse(originalInput, DateTimeFormatter.RFC_1123_DATE_TIME);
		/*
		 * day-of-week: weekends
		 * day-of-month: first third of month
		 * month-of-year: quarter 3
		 * year: leap year
		 * hour-of-day: am, even
		 * minute-of-hour: >=10, odd
		 * second-of-minute: <10, odd
		 * offset ID: GMT
		 */
		String metamorphicInput = "Sun, 8 Aug 2021 06:35:07 GMT";
		LocalDateTime metamorphicDateTime = LocalDateTime.parse(metamorphicInput, DateTimeFormatter.RFC_1123_DATE_TIME);

		assertEquals(originalDateTime, metamorphicDateTime.minusDays(365));
	}

	@Test
	void test7() {
		String originalInput = "Sat, 17 Nov 2018 15:08:02 +0630";
		LocalDateTime originalDateTime = LocalDateTime.parse(originalInput, DateTimeFormatter.RFC_1123_DATE_TIME);
		/*
		 * day-of-week: weekends
		 * day-of-month: middle third of month
		 * month-of-year: quarter 4
		 * year: common year
		 * hour-of-day: pm, odd
		 * minute-of-hour: >=10, even
		 * second-of-minute: <10, even
		 * offset ID: +, is not a multiple of an hour
		 */
		String metamorphicInput = "Sun, 17 Nov 2019 15:08:02 +0630";
		LocalDateTime metamorphicDateTime = LocalDateTime.parse(metamorphicInput, DateTimeFormatter.RFC_1123_DATE_TIME);

		assertEquals(originalDateTime, metamorphicDateTime.minusDays(365));
	}

	@Test
	void test8() {
		String originalInput = "Sun, 22 Mar 2020 17:09:03 -0700";
		LocalDateTime originalDateTime = LocalDateTime.parse(originalInput, DateTimeFormatter.RFC_1123_DATE_TIME);
		/*
		 * day-of-week: weekends
		 * day-of-month: last third of month
		 * month-of-year: quarter 1
		 * year: leap year
		 * hour-of-day: pm, odd
		 * minute-of-hour: <10, odd
		 * second-of-minute: <10, odd
		 * offset ID: -, is a multiple of an hour
		 */
		String metamorphicInput = "Mon, 22 Mar 2021 17:09:03 -0700";
		LocalDateTime metamorphicDateTime = LocalDateTime.parse(metamorphicInput, DateTimeFormatter.RFC_1123_DATE_TIME);

		assertEquals(originalDateTime, metamorphicDateTime.minusDays(365));
	}

	@Test
	void test9() {
		String originalInput = "Sun, 3 Jun 2018 18:50:20 +0800";
		LocalDateTime originalDateTime = LocalDateTime.parse(originalInput, DateTimeFormatter.RFC_1123_DATE_TIME);
		/*
		 * day-of-week: weekends
		 * day-of-month: first third of month
		 * month-of-year: quarter 2
		 * year: common year
		 * hour-of-day: pm, even
		 * minute-of-hour: >=10, even
		 * second-of-minute: >=10, even
		 * offset ID: +, is a multiple of an hour
		 */
		String metamorphicInput = "Mon, 3 Jun 2019 18:50:20 +0800";
		LocalDateTime metamorphicDateTime = LocalDateTime.parse(metamorphicInput, DateTimeFormatter.RFC_1123_DATE_TIME);

		assertEquals(originalDateTime, metamorphicDateTime.minusDays(365));
	}
}
```

``` java
package dateTests;

import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import static org.junit.jupiter.api.Assertions.assertEquals;

class MB {
	/*
	 * When year changes, the month of year of two time should be equal.
	 */
	@Test
	void test0() {
		String originalInput = "Mon, 6 Jan 2020 10:05:04 GMT";
		LocalDateTime originalDateTime = LocalDateTime.parse(originalInput, DateTimeFormatter.RFC_1123_DATE_TIME);
		/*
		 * day-of-week: weekdays
		 * day-of-month: first third of month
		 * month-of-year: quarter 1
		 * year: leap year
		 * hour-of-day: am, even
		 * minute-of-hour: <10, odd
		 * second-of-minute: <10, even
		 * offset ID: GMT
		 */
		String metamorphicInput = "Mon, 6 Jan 2025 10:05:04 GMT";
		LocalDateTime metamorphicDateTime = LocalDateTime.parse(metamorphicInput, DateTimeFormatter.RFC_1123_DATE_TIME);

		assertEquals(originalDateTime.getMonth(), metamorphicDateTime.getMonth());
	}

	@Test
	void test1() {
		String originalInput = "Tue, 17 Apr 2018 09:06:07 -0100";
		LocalDateTime originalDateTime = LocalDateTime.parse(originalInput, DateTimeFormatter.RFC_1123_DATE_TIME);
		/*
		 * day-of-week: weekdays
		 * day-of-month: middle third of month
		 * month-of-year: quarter 2
		 * year: common year
		 * hour-of-day: am, odd
		 * minute-of-hour: <10, even
		 * second-of-minute: <10, odd
		 * offset ID: -, is a multiple of an hour
		 */
		String metamorphicInput = "Mon, 17 Apr 2017 09:06:07 -0100";
		LocalDateTime metamorphicDateTime = LocalDateTime.parse(metamorphicInput, DateTimeFormatter.RFC_1123_DATE_TIME);

		assertEquals(originalDateTime.getMonth(), metamorphicDateTime.getMonth());
	}

	@Test
	void test2() {
		String originalInput = "Wed, 22 Jul 2020 08:12:33 -0130";
		LocalDateTime originalDateTime = LocalDateTime.parse(originalInput, DateTimeFormatter.RFC_1123_DATE_TIME);
		/*
		 * day-of-week: weekdays
		 * day-of-month: last third of month
		 * month-of-year: quarter 3
		 * year: leap year
		 * hour-of-day: am, even
		 * minute-of-hour: >=10, even
		 * second-of-minute: >=10, odd
		 * offset ID: -, is not a multiple of an hour
		 */
		String metamorphicInput = "Sat, 22 Jul 2028 08:12:33 -0130";
		LocalDateTime metamorphicDateTime = LocalDateTime.parse(metamorphicInput, DateTimeFormatter.RFC_1123_DATE_TIME);

		assertEquals(originalDateTime.getMonth(), metamorphicDateTime.getMonth());
	}

	@Test
	void test3() {
		String originalInput = "Thu, 4 Oct 2018 13:16:21 +0230";
		LocalDateTime originalDateTime = LocalDateTime.parse(originalInput, DateTimeFormatter.RFC_1123_DATE_TIME);
		/*
		 * day-of-week: weekdays
		 * day-of-month: first third of month
		 * month-of-year: quarter 4
		 * year: common year
		 * hour-of-day: pm, odd
		 * minute-of-hour: >=10, even
		 * second-of-minute: >=10, odd
		 * offset ID: +, is not a multiple of an hour
		 */
		String metamorphicInput = "Sat, 4 Oct 2008 13:16:21 +0230";
		LocalDateTime metamorphicDateTime = LocalDateTime.parse(metamorphicInput, DateTimeFormatter.RFC_1123_DATE_TIME);

		assertEquals(originalDateTime.getMonth(), metamorphicDateTime.getMonth());
	}

	@Test
	void test4() {
		String originalInput = "Fri, 14 Feb 2020 14:05:30 +0330";
		LocalDateTime originalDateTime = LocalDateTime.parse(originalInput, DateTimeFormatter.RFC_1123_DATE_TIME);
		/*
		 * day-of-week: weekdays
		 * day-of-month: middle third of month
		 * month-of-year: quarter 1
		 * year: leap year
		 * hour-of-day: pm, even
		 * minute-of-hour: <10, odd
		 * second-of-minute: >=10, even
		 * offset ID: +, is not a multiple of an hour
		 */
		String metamorphicInput = "Tue, 14 Feb 2012 14:05:30 +0330";
		LocalDateTime metamorphicDateTime = LocalDateTime.parse(metamorphicInput, DateTimeFormatter.RFC_1123_DATE_TIME);

		assertEquals(originalDateTime.getMonth(), metamorphicDateTime.getMonth());
	}

	@Test
	void test5() {
		String originalInput = "Sat, 26 May 2018 07:03:40 -0500";
		LocalDateTime originalDateTime = LocalDateTime.parse(originalInput, DateTimeFormatter.RFC_1123_DATE_TIME);
		/*
		 * day-of-week: weekends
		 * day-of-month: last third of month
		 * month-of-year: quarter 2
		 * year: common year
		 * hour-of-day: am, odd
		 * minute-of-hour: <10, odd
		 * second-of-minute: >=10, even
		 * offset ID: -, is a multiple of an hour
		 */
		String metamorphicInput = "Tue, 26 May 2218 07:03:40 -0500";
		LocalDateTime metamorphicDateTime = LocalDateTime.parse(metamorphicInput, DateTimeFormatter.RFC_1123_DATE_TIME);

		assertEquals(originalDateTime.getMonth(), metamorphicDateTime.getMonth());
	}

	@Test
	void test6() {
		String originalInput = "Sat, 8 Aug 2020 06:35:07 GMT";
		LocalDateTime originalDateTime = LocalDateTime.parse(originalInput, DateTimeFormatter.RFC_1123_DATE_TIME);
		/*
		 * day-of-week: weekends
		 * day-of-month: first third of month
		 * month-of-year: quarter 3
		 * year: leap year
		 * hour-of-day: am, even
		 * minute-of-hour: >=10, odd
		 * second-of-minute: <10, odd
		 * offset ID: GMT
		 */
		String metamorphicInput = "Thu, 8 Aug 2120 06:35:07 GMT";
		LocalDateTime metamorphicDateTime = LocalDateTime.parse(metamorphicInput, DateTimeFormatter.RFC_1123_DATE_TIME);

		assertEquals(originalDateTime.getMonth(), metamorphicDateTime.getMonth());
	}

	@Test
	void test7() {
		String originalInput = "Sat, 17 Nov 2018 15:08:02 +0630";
		LocalDateTime originalDateTime = LocalDateTime.parse(originalInput, DateTimeFormatter.RFC_1123_DATE_TIME);
		/*
		 * day-of-week: weekends
		 * day-of-month: middle third of month
		 * month-of-year: quarter 4
		 * year: common year
		 * hour-of-day: pm, odd
		 * minute-of-hour: >=10, even
		 * second-of-minute: <10, even
		 * offset ID: +, is not a multiple of an hour
		 */
		String metamorphicInput = "Sun, 17 Nov 1996 15:08:02 +0630";
		LocalDateTime metamorphicDateTime = LocalDateTime.parse(metamorphicInput, DateTimeFormatter.RFC_1123_DATE_TIME);

		assertEquals(originalDateTime.getMonth(), metamorphicDateTime.getMonth());
	}

	@Test
	void test8() {
		String originalInput = "Sun, 22 Mar 2020 17:09:03 -0700";
		LocalDateTime originalDateTime = LocalDateTime.parse(originalInput, DateTimeFormatter.RFC_1123_DATE_TIME);
		/*
		 * day-of-week: weekends
		 * day-of-month: last third of month
		 * month-of-year: quarter 1
		 * year: leap year
		 * hour-of-day: pm, odd
		 * minute-of-hour: <10, odd
		 * second-of-minute: <10, odd
		 * offset ID: -, is a multiple of an hour
		 */
		String metamorphicInput = "Mon, 22 Mar 1920 17:09:03 -0700";
		LocalDateTime metamorphicDateTime = LocalDateTime.parse(metamorphicInput, DateTimeFormatter.RFC_1123_DATE_TIME);

		assertEquals(originalDateTime.getMonth(), metamorphicDateTime.getMonth());
	}

	@Test
	void test9() {
		String originalInput = "Sun, 3 Jun 2018 18:50:20 +0800";
		LocalDateTime originalDateTime = LocalDateTime.parse(originalInput, DateTimeFormatter.RFC_1123_DATE_TIME);
		/*
		 * day-of-week: weekends
		 * day-of-month: first third of month
		 * month-of-year: quarter 2
		 * year: common year
		 * hour-of-day: pm, even
		 * minute-of-hour: >=10, even
		 * second-of-minute: >=10, even
		 * offset ID: +, is a multiple of an hour
		 */
		String metamorphicInput = "Sat, 3 Jun 2000 18:50:20 +0800";
		LocalDateTime metamorphicDateTime = LocalDateTime.parse(metamorphicInput, DateTimeFormatter.RFC_1123_DATE_TIME);

		assertEquals(originalDateTime.getMonth(), metamorphicDateTime.getMonth());
	}
}
```

``` java
package dateTests;

import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import static org.junit.jupiter.api.Assertions.assertNotEquals;

class MC {
	/*
	 * The second of minute is optional.
	 * Missing out this value should affect the time where second is not zero.
	 */
	@Test
	void test0() {
		String originalInput = "Mon, 6 Jan 2020 10:05:04 GMT";
		LocalDateTime originalDateTime = LocalDateTime.parse(originalInput, DateTimeFormatter.RFC_1123_DATE_TIME);
		/*
		 * day-of-week: weekdays
		 * day-of-month: first third of month
		 * month-of-year: quarter 1
		 * year: leap year
		 * hour-of-day: am, even
		 * minute-of-hour: <10, odd
		 * second-of-minute: <10, even
		 * offset ID: GMT
		 */
		String metamorphicInput = "Mon, 6 Jan 2020 10:05 GMT";
		LocalDateTime metamorphicDateTime = LocalDateTime.parse(metamorphicInput, DateTimeFormatter.RFC_1123_DATE_TIME);

		assertNotEquals(originalDateTime, metamorphicDateTime);
	}

	@Test
	void test1() {
		String originalInput = "Tue, 17 Apr 2018 09:06:07 -0100";
		LocalDateTime originalDateTime = LocalDateTime.parse(originalInput, DateTimeFormatter.RFC_1123_DATE_TIME);
		/*
		 * day-of-week: weekdays
		 * day-of-month: middle third of month
		 * month-of-year: quarter 2
		 * year: common year
		 * hour-of-day: am, odd
		 * minute-of-hour: <10, even
		 * second-of-minute: <10, odd
		 * offset ID: -, is a multiple of an hour
		 */
		String metamorphicInput = "Tue, 17 Apr 2018 09:06 -0100";
		LocalDateTime metamorphicDateTime = LocalDateTime.parse(metamorphicInput, DateTimeFormatter.RFC_1123_DATE_TIME);

		assertNotEquals(originalDateTime, metamorphicDateTime);
	}

	@Test
	void test2() {
		String originalInput = "Wed, 22 Jul 2020 08:12:33 -0130";
		LocalDateTime originalDateTime = LocalDateTime.parse(originalInput, DateTimeFormatter.RFC_1123_DATE_TIME);
		/*
		 * day-of-week: weekdays
		 * day-of-month: last third of month
		 * month-of-year: quarter 3
		 * year: leap year
		 * hour-of-day: am, even
		 * minute-of-hour: >=10, even
		 * second-of-minute: >=10, odd
		 * offset ID: -, is not a multiple of an hour
		 */
		String metamorphicInput = "Wed, 22 Jul 2020 08:12 -0130";
		LocalDateTime metamorphicDateTime = LocalDateTime.parse(metamorphicInput, DateTimeFormatter.RFC_1123_DATE_TIME);

		assertNotEquals(originalDateTime, metamorphicDateTime);
	}

	@Test
	void test3() {
		String originalInput = "Thu, 4 Oct 2018 13:16:21 +0230";
		LocalDateTime originalDateTime = LocalDateTime.parse(originalInput, DateTimeFormatter.RFC_1123_DATE_TIME);
		/*
		 * day-of-week: weekdays
		 * day-of-month: first third of month
		 * month-of-year: quarter 4
		 * year: common year
		 * hour-of-day: pm, odd
		 * minute-of-hour: >=10, even
		 * second-of-minute: >=10, odd
		 * offset ID: +, is not a multiple of an hour
		 */
		String metamorphicInput = "Thu, 4 Oct 2018 13:16 +0230";
		LocalDateTime metamorphicDateTime = LocalDateTime.parse(metamorphicInput, DateTimeFormatter.RFC_1123_DATE_TIME);

		assertNotEquals(originalDateTime, metamorphicDateTime);
	}

	@Test
	void test4() {
		String originalInput = "Fri, 14 Feb 2020 14:05:30 +0330";
		LocalDateTime originalDateTime = LocalDateTime.parse(originalInput, DateTimeFormatter.RFC_1123_DATE_TIME);
		/*
		 * day-of-week: weekdays
		 * day-of-month: middle third of month
		 * month-of-year: quarter 1
		 * year: leap year
		 * hour-of-day: pm, even
		 * minute-of-hour: <10, odd
		 * second-of-minute: >=10, even
		 * offset ID: +, is not a multiple of an hour
		 */
		String metamorphicInput = "Fri, 14 Feb 2020 14:05 +0330";
		LocalDateTime metamorphicDateTime = LocalDateTime.parse(metamorphicInput, DateTimeFormatter.RFC_1123_DATE_TIME);

		assertNotEquals(originalDateTime, metamorphicDateTime);
	}

	@Test
	void test5() {
		String originalInput = "Sat, 26 May 2018 07:03:40 -0500";
		LocalDateTime originalDateTime = LocalDateTime.parse(originalInput, DateTimeFormatter.RFC_1123_DATE_TIME);
		/*
		 * day-of-week: weekends
		 * day-of-month: last third of month
		 * month-of-year: quarter 2
		 * year: common year
		 * hour-of-day: am, odd
		 * minute-of-hour: <10, odd
		 * second-of-minute: >=10, even
		 * offset ID: -, is a multiple of an hour
		 */
		String metamorphicInput = "Sat, 26 May 2018 07:03 -0500";
		LocalDateTime metamorphicDateTime = LocalDateTime.parse(metamorphicInput, DateTimeFormatter.RFC_1123_DATE_TIME);

		assertNotEquals(originalDateTime, metamorphicDateTime);
	}

	@Test
	void test6() {
		String originalInput = "Sat, 8 Aug 2020 06:35:07 GMT";
		LocalDateTime originalDateTime = LocalDateTime.parse(originalInput, DateTimeFormatter.RFC_1123_DATE_TIME);
		/*
		 * day-of-week: weekends
		 * day-of-month: first third of month
		 * month-of-year: quarter 3
		 * year: leap year
		 * hour-of-day: am, even
		 * minute-of-hour: >=10, odd
		 * second-of-minute: <10, odd
		 * offset ID: GMT
		 */
		String metamorphicInput = "Sat, 8 Aug 2020 06:35 GMT";
		LocalDateTime metamorphicDateTime = LocalDateTime.parse(metamorphicInput, DateTimeFormatter.RFC_1123_DATE_TIME);

		assertNotEquals(originalDateTime, metamorphicDateTime);
	}

	@Test
	void test7() {
		String originalInput = "Sat, 17 Nov 2018 15:08:02 +0630";
		LocalDateTime originalDateTime = LocalDateTime.parse(originalInput, DateTimeFormatter.RFC_1123_DATE_TIME);
		/*
		 * day-of-week: weekends
		 * day-of-month: middle third of month
		 * month-of-year: quarter 4
		 * year: common year
		 * hour-of-day: pm, odd
		 * minute-of-hour: >=10, even
		 * second-of-minute: <10, even
		 * offset ID: +, is not a multiple of an hour
		 */
		String metamorphicInput = "Sat, 17 Nov 2018 15:08 +0630";
		LocalDateTime metamorphicDateTime = LocalDateTime.parse(metamorphicInput, DateTimeFormatter.RFC_1123_DATE_TIME);

		assertNotEquals(originalDateTime, metamorphicDateTime);
	}

	@Test
	void test8() {
		String originalInput = "Sun, 22 Mar 2020 17:09:03 -0700";
		LocalDateTime originalDateTime = LocalDateTime.parse(originalInput, DateTimeFormatter.RFC_1123_DATE_TIME);
		/*
		 * day-of-week: weekends
		 * day-of-month: last third of month
		 * month-of-year: quarter 1
		 * year: leap year
		 * hour-of-day: pm, odd
		 * minute-of-hour: <10, odd
		 * second-of-minute: <10, odd
		 * offset ID: -, is a multiple of an hour
		 */
		String metamorphicInput = "Sun, 22 Mar 2020 17:09 -0700";
		LocalDateTime metamorphicDateTime = LocalDateTime.parse(metamorphicInput, DateTimeFormatter.RFC_1123_DATE_TIME);

		assertNotEquals(originalDateTime, metamorphicDateTime);
	}

	@Test
	void test9() {
		String originalInput = "Sun, 3 Jun 2018 18:50:20 +0800";
		LocalDateTime originalDateTime = LocalDateTime.parse(originalInput, DateTimeFormatter.RFC_1123_DATE_TIME);
		/*
		 * day-of-week: weekends
		 * day-of-month: first third of month
		 * month-of-year: quarter 2
		 * year: common year
		 * hour-of-day: pm, even
		 * minute-of-hour: >=10, even
		 * second-of-minute: >=10, even
		 * offset ID: +, is a multiple of an hour
		 */
		String metamorphicInput = "Sun, 3 Jun 2018 18:50 +0800";
		LocalDateTime metamorphicDateTime = LocalDateTime.parse(metamorphicInput, DateTimeFormatter.RFC_1123_DATE_TIME);

		assertNotEquals(originalDateTime, metamorphicDateTime);
	}
}
```

``` java
package dateTests;

import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import static org.junit.jupiter.api.Assertions.assertEquals;

class MD {
	/*
	 * Case insensitive.
	 */
	@Test
	void test0() {
		String originalInput = "Mon, 6 Jan 2020 10:05:04 GMT";
		LocalDateTime originalDateTime = LocalDateTime.parse(originalInput, DateTimeFormatter.RFC_1123_DATE_TIME);
		/*
		 * day-of-week: weekdays
		 * day-of-month: first third of month
		 * month-of-year: quarter 1
		 * year: leap year
		 * hour-of-day: am, even
		 * minute-of-hour: <10, odd
		 * second-of-minute: <10, even
		 * offset ID: GMT
		 */
		String metamorphicInput = "mon, 6 jan 2020 10:05:04 gmt";
		LocalDateTime metamorphicDateTime = LocalDateTime.parse(metamorphicInput, DateTimeFormatter.RFC_1123_DATE_TIME);

		assertEquals(originalDateTime, metamorphicDateTime);
	}

	@Test
	void test1() {
		String originalInput = "Tue, 17 Apr 2018 09:06:07 -0100";
		LocalDateTime originalDateTime = LocalDateTime.parse(originalInput, DateTimeFormatter.RFC_1123_DATE_TIME);
		/*
		 * day-of-week: weekdays
		 * day-of-month: middle third of month
		 * month-of-year: quarter 2
		 * year: common year
		 * hour-of-day: am, odd
		 * minute-of-hour: <10, even
		 * second-of-minute: <10, odd
		 * offset ID: -, is a multiple of an hour
		 */
		String metamorphicInput = "tue, 17 apr 2018 09:06:07 -0100";
		LocalDateTime metamorphicDateTime = LocalDateTime.parse(metamorphicInput, DateTimeFormatter.RFC_1123_DATE_TIME);

		assertEquals(originalDateTime, metamorphicDateTime);
	}

	@Test
	void test2() {
		String originalInput = "Wed, 22 Jul 2020 08:12:33 -0130";
		LocalDateTime originalDateTime = LocalDateTime.parse(originalInput, DateTimeFormatter.RFC_1123_DATE_TIME);
		/*
		 * day-of-week: weekdays
		 * day-of-month: last third of month
		 * month-of-year: quarter 3
		 * year: leap year
		 * hour-of-day: am, even
		 * minute-of-hour: >=10, even
		 * second-of-minute: >=10, odd
		 * offset ID: -, is not a multiple of an hour
		 */
		String metamorphicInput = "wed, 22 jul 2020 08:12:33 -0130";
		LocalDateTime metamorphicDateTime = LocalDateTime.parse(metamorphicInput, DateTimeFormatter.RFC_1123_DATE_TIME);

		assertEquals(originalDateTime, metamorphicDateTime);
	}

	@Test
	void test3() {
		String originalInput = "Thu, 4 Oct 2018 13:16:21 +0230";
		LocalDateTime originalDateTime = LocalDateTime.parse(originalInput, DateTimeFormatter.RFC_1123_DATE_TIME);
		/*
		 * day-of-week: weekdays
		 * day-of-month: first third of month
		 * month-of-year: quarter 4
		 * year: common year
		 * hour-of-day: pm, odd
		 * minute-of-hour: >=10, even
		 * second-of-minute: >=10, odd
		 * offset ID: +, is not a multiple of an hour
		 */
		String metamorphicInput = "thu, 4 oct 2018 13:16:21 +0230";
		LocalDateTime metamorphicDateTime = LocalDateTime.parse(metamorphicInput, DateTimeFormatter.RFC_1123_DATE_TIME);

		assertEquals(originalDateTime, metamorphicDateTime);
	}

	@Test
	void test4() {
		String originalInput = "Fri, 14 Feb 2020 14:05:30 +0330";
		LocalDateTime originalDateTime = LocalDateTime.parse(originalInput, DateTimeFormatter.RFC_1123_DATE_TIME);
		/*
		 * day-of-week: weekdays
		 * day-of-month: middle third of month
		 * month-of-year: quarter 1
		 * year: leap year
		 * hour-of-day: pm, even
		 * minute-of-hour: <10, odd
		 * second-of-minute: >=10, even
		 * offset ID: +, is not a multiple of an hour
		 */
		String metamorphicInput = "fri, 14 feb 2020 14:05:30 +0330";
		LocalDateTime metamorphicDateTime = LocalDateTime.parse(metamorphicInput, DateTimeFormatter.RFC_1123_DATE_TIME);

		assertEquals(originalDateTime, metamorphicDateTime);
	}

	@Test
	void test5() {
		String originalInput = "Sat, 26 May 2018 07:03:40 -0500";
		LocalDateTime originalDateTime = LocalDateTime.parse(originalInput, DateTimeFormatter.RFC_1123_DATE_TIME);
		/*
		 * day-of-week: weekends
		 * day-of-month: last third of month
		 * month-of-year: quarter 2
		 * year: common year
		 * hour-of-day: am, odd
		 * minute-of-hour: <10, odd
		 * second-of-minute: >=10, even
		 * offset ID: -, is a multiple of an hour
		 */
		String metamorphicInput = "sAt, 26 mAy 2018 07:03:40 -0500";
		LocalDateTime metamorphicDateTime = LocalDateTime.parse(metamorphicInput, DateTimeFormatter.RFC_1123_DATE_TIME);

		assertEquals(originalDateTime, metamorphicDateTime);
	}

	@Test
	void test6() {
		String originalInput = "Sat, 8 Aug 2020 06:35:07 GMT";
		LocalDateTime originalDateTime = LocalDateTime.parse(originalInput, DateTimeFormatter.RFC_1123_DATE_TIME);
		/*
		 * day-of-week: weekends
		 * day-of-month: first third of month
		 * month-of-year: quarter 3
		 * year: leap year
		 * hour-of-day: am, even
		 * minute-of-hour: >=10, odd
		 * second-of-minute: <10, odd
		 * offset ID: GMT
		 */
		String metamorphicInput = "saT, 8 auG 2020 06:35:07 gmT";
		LocalDateTime metamorphicDateTime = LocalDateTime.parse(metamorphicInput, DateTimeFormatter.RFC_1123_DATE_TIME);

		assertEquals(originalDateTime, metamorphicDateTime);
	}

	@Test
	void test7() {
		String originalInput = "Sat, 17 Nov 2018 15:08:02 +0630";
		LocalDateTime originalDateTime = LocalDateTime.parse(originalInput, DateTimeFormatter.RFC_1123_DATE_TIME);
		/*
		 * day-of-week: weekends
		 * day-of-month: middle third of month
		 * month-of-year: quarter 4
		 * year: common year
		 * hour-of-day: pm, odd
		 * minute-of-hour: >=10, even
		 * second-of-minute: <10, even
		 * offset ID: +, is not a multiple of an hour
		 */
		String metamorphicInput = "SAT, 17 NOV 2018 15:08:02 +0630";
		LocalDateTime metamorphicDateTime = LocalDateTime.parse(metamorphicInput, DateTimeFormatter.RFC_1123_DATE_TIME);

		assertEquals(originalDateTime, metamorphicDateTime);
	}

	@Test
	void test8() {
		String originalInput = "Sun, 22 Mar 2020 17:09:03 -0700";
		LocalDateTime originalDateTime = LocalDateTime.parse(originalInput, DateTimeFormatter.RFC_1123_DATE_TIME);
		/*
		 * day-of-week: weekends
		 * day-of-month: last third of month
		 * month-of-year: quarter 1
		 * year: leap year
		 * hour-of-day: pm, odd
		 * minute-of-hour: <10, odd
		 * second-of-minute: <10, odd
		 * offset ID: -, is a multiple of an hour
		 */
		String metamorphicInput = "SUn, 22 MAr 2020 17:09:03 -0700";
		LocalDateTime metamorphicDateTime = LocalDateTime.parse(metamorphicInput, DateTimeFormatter.RFC_1123_DATE_TIME);

		assertEquals(originalDateTime, metamorphicDateTime);
	}

	@Test
	void test9() {
		String originalInput = "Sun, 3 Jun 2018 18:50:20 +0800";
		LocalDateTime originalDateTime = LocalDateTime.parse(originalInput, DateTimeFormatter.RFC_1123_DATE_TIME);
		/*
		 * day-of-week: weekends
		 * day-of-month: first third of month
		 * month-of-year: quarter 2
		 * year: common year
		 * hour-of-day: pm, even
		 * minute-of-hour: >=10, even
		 * second-of-minute: >=10, even
		 * offset ID: +, is a multiple of an hour
		 */
		String metamorphicInput = "SuN, 3 JuN 2018 18:50:20 +0800";
		LocalDateTime metamorphicDateTime = LocalDateTime.parse(metamorphicInput, DateTimeFormatter.RFC_1123_DATE_TIME);

		assertEquals(originalDateTime, metamorphicDateTime);
	}
}
```

``` java
package dateTests;

import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import static org.junit.jupiter.api.Assertions.assertEquals;

class ME {
	/*
	 * The month of year can be number or words.
	 */
	@Test
	void test0() {
		String originalInput = "Mon, 6 Jan 2020 0010:05:04 GMT";
		LocalDateTime originalDateTime = LocalDateTime.parse(originalInput, DateTimeFormatter.RFC_1123_DATE_TIME);
		/*
		 * day-of-week: weekdays
		 * day-of-month: first third of month
		 * month-of-year: quarter 1
		 * year: leap year
		 * hour-of-day: am, even
		 * minute-of-hour: <10, odd
		 * second-of-minute: <10, even
		 * offset ID: GMT
		 */
		String metamorphicInput = "Mon, 6 1 2020 0010:05:04 GMT";
		LocalDateTime metamorphicDateTime = LocalDateTime.parse(metamorphicInput, DateTimeFormatter.RFC_1123_DATE_TIME);

		assertEquals(originalDateTime, metamorphicDateTime);
	}

	@Test
	void test1() {
		String originalInput = "Tue, 17 Apr 2018 09:06:07 -0100";
		LocalDateTime originalDateTime = LocalDateTime.parse(originalInput, DateTimeFormatter.RFC_1123_DATE_TIME);
		/*
		 * day-of-week: weekdays
		 * day-of-month: middle third of month
		 * month-of-year: quarter 2
		 * year: common year
		 * hour-of-day: am, odd
		 * minute-of-hour: <10, even
		 * second-of-minute: <10, odd
		 * offset ID: -, is a multiple of an hour
		 */
		String metamorphicInput = "Tue, 17 4 2018 09:06:07 -0100";
		LocalDateTime metamorphicDateTime = LocalDateTime.parse(metamorphicInput, DateTimeFormatter.RFC_1123_DATE_TIME);

		assertEquals(originalDateTime, metamorphicDateTime);
	}

	@Test
	void test2() {
		String originalInput = "Wed, 22 Jul 2020 08:12:33 -0130";
		LocalDateTime originalDateTime = LocalDateTime.parse(originalInput, DateTimeFormatter.RFC_1123_DATE_TIME);
		/*
		 * day-of-week: weekdays
		 * day-of-month: last third of month
		 * month-of-year: quarter 3
		 * year: leap year
		 * hour-of-day: am, even
		 * minute-of-hour: >=10, even
		 * second-of-minute: >=10, odd
		 * offset ID: -, is not a multiple of an hour
		 */
		String metamorphicInput = "Wed, 22 7 2020 08:12:33 -0130";
		LocalDateTime metamorphicDateTime = LocalDateTime.parse(metamorphicInput, DateTimeFormatter.RFC_1123_DATE_TIME);

		assertEquals(originalDateTime, metamorphicDateTime);
	}

	@Test
	void test3() {
		String originalInput = "Thu, 4 Oct 2018 13:16:21 +0230";
		LocalDateTime originalDateTime = LocalDateTime.parse(originalInput, DateTimeFormatter.RFC_1123_DATE_TIME);
		/*
		 * day-of-week: weekdays
		 * day-of-month: first third of month
		 * month-of-year: quarter 4
		 * year: common year
		 * hour-of-day: pm, odd
		 * minute-of-hour: >=10, even
		 * second-of-minute: >=10, odd
		 * offset ID: +, is not a multiple of an hour
		 */
		String metamorphicInput = "Thu, 4 10 2018 13:16:21 +0230";
		LocalDateTime metamorphicDateTime = LocalDateTime.parse(metamorphicInput, DateTimeFormatter.RFC_1123_DATE_TIME);

		assertEquals(originalDateTime, metamorphicDateTime);
	}

	@Test
	void test4() {
		String originalInput = "Fri, 14 Feb 2020 14:05:30 +0330";
		LocalDateTime originalDateTime = LocalDateTime.parse(originalInput, DateTimeFormatter.RFC_1123_DATE_TIME);
		/*
		 * day-of-week: weekdays
		 * day-of-month: middle third of month
		 * month-of-year: quarter 1
		 * year: leap year
		 * hour-of-day: pm, even
		 * minute-of-hour: <10, odd
		 * second-of-minute: >=10, even
		 * offset ID: +, is not a multiple of an hour
		 */
		String metamorphicInput = "Fri, 14 2 2020 14:05:30 +0330";
		LocalDateTime metamorphicDateTime = LocalDateTime.parse(metamorphicInput, DateTimeFormatter.RFC_1123_DATE_TIME);

		assertEquals(originalDateTime, metamorphicDateTime);
	}

	@Test
	void test5() {
		String originalInput = "Sat, 26 May 2018 07:03:40 -0500";
		LocalDateTime originalDateTime = LocalDateTime.parse(originalInput, DateTimeFormatter.RFC_1123_DATE_TIME);
		/*
		 * day-of-week: weekends
		 * day-of-month: last third of month
		 * month-of-year: quarter 2
		 * year: common year
		 * hour-of-day: am, odd
		 * minute-of-hour: <10, odd
		 * second-of-minute: >=10, even
		 * offset ID: -, is a multiple of an hour
		 */
		String metamorphicInput = "Sat, 26 5 2018 07:03:40 -0500";
		LocalDateTime metamorphicDateTime = LocalDateTime.parse(metamorphicInput, DateTimeFormatter.RFC_1123_DATE_TIME);

		assertEquals(originalDateTime, metamorphicDateTime);
	}

	@Test
	void test6() {
		String originalInput = "Sat, 8 Aug 2020 06:35:07 GMT";
		LocalDateTime originalDateTime = LocalDateTime.parse(originalInput, DateTimeFormatter.RFC_1123_DATE_TIME);
		/*
		 * day-of-week: weekends
		 * day-of-month: first third of month
		 * month-of-year: quarter 3
		 * year: leap year
		 * hour-of-day: am, even
		 * minute-of-hour: >=10, odd
		 * second-of-minute: <10, odd
		 * offset ID: GMT
		 */
		String metamorphicInput = "Sat, 8 8 2020 06:35:07 GMT";
		LocalDateTime metamorphicDateTime = LocalDateTime.parse(metamorphicInput, DateTimeFormatter.RFC_1123_DATE_TIME);

		assertEquals(originalDateTime, metamorphicDateTime);
	}

	@Test
	void test7() {
		String originalInput = "Sat, 17 Nov 2018 15:08:02 +0630";
		LocalDateTime originalDateTime = LocalDateTime.parse(originalInput, DateTimeFormatter.RFC_1123_DATE_TIME);
		/*
		 * day-of-week: weekends
		 * day-of-month: middle third of month
		 * month-of-year: quarter 4
		 * year: common year
		 * hour-of-day: pm, odd
		 * minute-of-hour: >=10, even
		 * second-of-minute: <10, even
		 * offset ID: +, is not a multiple of an hour
		 */
		String metamorphicInput = "Sat, 17 11 2018 15:08:02 +0630";
		LocalDateTime metamorphicDateTime = LocalDateTime.parse(metamorphicInput, DateTimeFormatter.RFC_1123_DATE_TIME);

		assertEquals(originalDateTime, metamorphicDateTime);
	}

	@Test
	void test8() {
		String originalInput = "Sun, 22 Mar 2020 17:09:03 -0700";
		LocalDateTime originalDateTime = LocalDateTime.parse(originalInput, DateTimeFormatter.RFC_1123_DATE_TIME);
		/*
		 * day-of-week: weekends
		 * day-of-month: last third of month
		 * month-of-year: quarter 1
		 * year: leap year
		 * hour-of-day: pm, odd
		 * minute-of-hour: <10, odd
		 * second-of-minute: <10, odd
		 * offset ID: -, is a multiple of an hour
		 */
		String metamorphicInput = "Sun, 22 3 2020 17:09:03 -0700";
		LocalDateTime metamorphicDateTime = LocalDateTime.parse(metamorphicInput, DateTimeFormatter.RFC_1123_DATE_TIME);

		assertEquals(originalDateTime, metamorphicDateTime);
	}

	@Test
	void test9() {
		String originalInput = "Sun, 3 Jun 2018 18:50:20 +0800";
		LocalDateTime originalDateTime = LocalDateTime.parse(originalInput, DateTimeFormatter.RFC_1123_DATE_TIME);
		/*
		 * day-of-week: weekends
		 * day-of-month: first third of month
		 * month-of-year: quarter 2
		 * year: common year
		 * hour-of-day: pm, even
		 * minute-of-hour: >=10, even
		 * second-of-minute: >=10, even
		 * offset ID: +, is a multiple of an hour
		 */
		String metamorphicInput = "Sun, 3 6 2018 18:50:20 +0800";
		LocalDateTime metamorphicDateTime = LocalDateTime.parse(metamorphicInput, DateTimeFormatter.RFC_1123_DATE_TIME);

		assertEquals(originalDateTime, metamorphicDateTime);
	}
}
```
