---
title: IA-Lab4
date: 2017-04-21 12:00:00
categories:
  - Code
tags:
  - C
  - 互联网应用
---

{% codeblock l4-1.c lang:c https://github.com/questionyu/InternetApplications Github %}
#include <fcntl.h>
#include <unistd.h>
#include <stdio.h>

int main() {
	char buf[10];
	int fd1, fd2;

	if ((fd1 = open("test1", O_RDWR | O_APPEND)) == -1) {
		printf("Error in opening-1\n");
		return 1;
	}

	if ((fd2 = open("test2", O_RDONLY)) == -1) {
		printf("Error in opening-2\n");
		return 1;
	}

	while ((read(fd2, buf, 1)) != 0) {
		write(fd1, buf, 1);
	}

	close(fd1);
	close(fd2);

	return 0;
}
{% endcodeblock %}
<!--more-->
{% codeblock l4-2.c lang:c https://github.com/questionyu/InternetApplications Github %}
#include <fcntl.h>
#include <unistd.h>
#include <stdio.h>

int main() {
	int fd1;
	off_t off;
	char s[50];

	if ((fd1 = open("test1", O_RDWR | O_APPEND)) == -1) {
		printf("Error in opening-1\n");
		return 1;
	}

	write(fd1, "Hiiii", 5);
	off = lseek(fd1, 0, SEEK_SET);
	printf("Using append, offset: %lli\n", (long long) off);

//	off = lseek(fd1, -502, SEEK_CUR);
//	printf("%lli\n", (long long)off);

	read(fd1, s, 50);
	printf("String: %s\n", s);
	lseek(fd1, 0, SEEK_SET);
	write(fd1, "Abbbb", 5);

	close(fd1);

	return 0;
}
{% endcodeblock %}
