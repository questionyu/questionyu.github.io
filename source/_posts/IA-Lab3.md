---
title: 互联网应用 Lab3
date: 2017-04-20 12:00:00
categories:
  - Code
tags:
  - C
  - 互联网应用
---

{% codeblock l3-exec1.c lang:c https://github.com/questionyu/InternetApplications Github %}
#include <unistd.h>
#include <stdio.h>

int main() {
	char *arg[] = {"/bin/ls", 0};

	/* fork, and exec within child process */
	if (fork() == 0) {
		printf("In child process:\n");
		execv(arg[0], arg);
		printf("I will never be called\n");
	}

	printf("Execution continues in parent process\n");

	return 0;
}
{% endcodeblock %}
<!--more-->
{% codeblock l3-fork1.c lang:c https://github.com/questionyu/InternetApplications Github %}
#include <unistd.h>
#include <stdio.h>

int main() {
	pid_t t;
	t = fork();
	printf("fork returned %d\n", t);

	return 0;
}
{% endcodeblock %}
{% codeblock l3-fork2.c lang:c https://github.com/questionyu/InternetApplications Github %}
#include <unistd.h>
#include <stdio.h>

int main() {

	pid_t t;

	printf("Original program, pid = %d\n", getpid());

	t = fork();
	if (t == 0) {
		printf("In child process, pid = %d, ppid = %d\n", getpid(), getppid());
	} else {
		printf("In parent, pid = %d, for returned = %d\n", getpid(), t);
	}

	return 0;
}
{% endcodeblock %}
{% codeblock l3-lseek1.c lang:c https://github.com/questionyu/InternetApplications Github %}
#include <fcntl.h>
#include <unistd.h>
#include <stdio.h>

char buf1[] = "abcdefghij";
char buf2[] = "ABCDEFGHIJ";
#define FILE_MODE 0644

int main(void) {
	int fd;
	if ((fd = creat("file.hole", FILE_MODE)) < 0) {
		printf("creat error\n");
		return 1;
	}
	if (write(fd, buf1, 10) != 10) {
		printf("buf1 write error\n");
		return 1;
	}
	/*offset now = 10*/
	if (lseek(fd, 40, SEEK_SET) == -1) {
		printf("lseek error\n");
		return 1;
	}
	/*offset now = 40*/
	if (write(fd, buf2, 10) != 10) {
		printf("buf2 write error\n");
		return 1;
	}
	/*offset now = 50*/

	return 0;
}
{% endcodeblock %}
{% codeblock l3-readwrite1.c lang:c https://github.com/questionyu/InternetApplications Github %}
#include <fcntl.h>
#include <unistd.h>
#include <stdio.h>

int main(void) {
	char quit = '.';
	char buf[10];
	int fd;
	if ((fd = open("out.out", O_RDWR | O_CREAT)) == -1)
		printf("Error in opening\n");
	while (buf[0] != quit) {
		read(0, buf, 1);
		write(fd, buf, 1);
		write(1, buf, 1);
	}
	close(fd);

	return 0;
}
{% endcodeblock %}
{% codeblock l3-signal1.c lang:c https://github.com/questionyu/InternetApplications Github %}
#include <signal.h>
#include <stdio.h>
#include <stdlib.h>

void signalRoutine(int);

int main(void) {
	printf("signal processing demo program\n");
	while (1) {
		signal(SIGINT, signalRoutine);
	}
}

void signalRoutine(int dummy) {
	printf("Signal routine called[%d]\n", dummy);
	exit(0);
}
{% endcodeblock %}
