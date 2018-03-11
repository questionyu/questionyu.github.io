---
title: Coursework 2015
date: 2015-06-09 00:15:45
categories:
  - Code
tags:
  - C
---

## Question

Write a program that will help elementary school pupils practice math.

### a) The program will first ask the user for his/her ID number (including two letters & 4 digits), e.g.:
Please input your four digit ID no: AB1234
The program should have input validation.
Then the program prompts three choices:
* Start a test
* Check scores
* Exit

### b) Test: the program will give 10 math problems, e.g.:
* 12 * 3 = 36
* 48 + 32 = 80
* …
* 56 / 28 = 2<!--more-->

### Note:
i) Pupils will answer each problem before the next one is given.
ii) The problems should include addition, subtraction, multiplication and division. They are randomly generated.
iii) Randomly generates numbers for problems. However, must ensure that both the problem and the result are no larger than two digits. The problem and the result should be greater than or equal to zero. The divisor cannot be zero.
iv) After ten problems are finished, record the time used by the student to do the ten problems.
v) Gives a score to each student. Saves this student's ID, his/her score and the time used into a file named 'record.txt'.
vi) Print the following information on the screen:
Prob. | Correct Answ.  |  Ur Answ

### c) Check scores: Searches the file 'record.txt' and lists all the historical scores for this student, e.g.:
Your previous records are:
* AB1234  80  150 seconds
* AB1234  50  182 seconds
* AB1234  90  98 seconds

You will be marked based on your program's:
* Correctiveness
* Readability
* Robustness
* Conciseness

## Answer

关于这个大作业，我写了一天后来又改动了一天半，这才有了下面第一个版本。不过这个版本并没有完成题目中的所有要求，尤其是最后输出所有的题目与正确答案和输入答案。

{% codeblock 第一个版本 lang:c %}
#include <stdio.h>
#include <stdlib.h> //随机函数相关的头文件
#include <time.h> //时间函数相关的头文件
#include <ctype.h> //判断数字字母函数相关的头文件
#include <string.h> //判断字符串相等函数的头文件
char ID[7]; //定义全局变量，以便多个函数引用
int main()
{
	int choice(),cycle();
	printf("Please type in your ID No:"); //欢迎提示
	gets(ID); //获得输入数据
	if(ID[6]=='\0'&&isalpha(ID[0])&&isalpha(ID[1])&&isdigit(ID[2])&&isdigit(ID[3])&&isdigit(ID[4])&&isdigit(ID[5])) //检验ID是否符合格式
		choice();
	else
		main();
	cycle();
	return 0;
}
int choice() //判断选择函数
{
	int work(),grades(),i;
	char typein[2];
	printf("Next, what do you want to do?n1) Start a test.n2) Check scoresn3) ExitnPlease type in your choice:n"); //给出选择提示
	gets(typein); //获得输入数据
	if(typein[1]!='' || isdigit(typein[0])==0) //检验是否输入一位字符
	{
		printf("Please type in a number.n");
		choice();
	}
	switch(typein[0]) //用ASCII检验是否为数字
	{
		case 49: //判断进行测试
			work();
			break;
		case 50: //判断查询分数
			grades();
			break;
		case 51: //判断选择退出
			printf("Bye! Thanks for using my program!n");
			exit(0);
		default: //输入错误的选择
			printf("Please type in a number.n");
			choice();
	}
	return 0;
}
int work() //计算题目函数
{
	int addition(),subtraction(),multiplication(),division(),choice(),n,o,i=0;
	long start,end;
	FILE *data;
	srand((unsigned)time(NULL)); //利用时间进行播种，以生成真正的随机数
	printf("Test Will start! Are you ready?"); //提示测试将要开始
	getchar(); //等待按下任意键开始测试
	time(&start); //记录开始测试时的时间
	for(o=0;o<10;o++) //循环10次给出问题
	{
		n=rand()%4; //使用随机数来选择加减乘除
		switch(n)
		{
			case 0:
				i+=addition(); //回答正确时函数返回值为1，记录下总和，即为答对题目数
				break;
			case 1:
				i+=subtraction(); //回答正确时函数返回值为1，记录下总和，即为答对题目数
				break;
			case 2:
				i+=multiplication(); //回答正确时函数返回值为1，记录下总和，即为答对题目数
				break;
			case 3:
				i+=division(); //回答正确时函数返回值为1，记录下总和，即为答对题目数
		}
	}
	time(&end); //记录测试结束时的时间
	i*=10; //将答对的题目数扩大10倍成为分数
	printf("You have got %3d score(s).n",i); //提示得分
	data=fopen("record.txt","a+");
	fprintf(data,"%s %3d %3ldn",ID,i,end-start); //将ID 得分 时间写入文件
	fclose(data);
	return 0;
}
int addition() //加法运算函数
{
	int a,b;
	char convert[3],typein[3];
	a=rand()%100; //在[0,100)的范围内取随机数
	b=rand()%(100-a); //由于是加法运算，可以在[0,100-a)的范围内取随机数
	printf("%2d + %2d = ",a,b); //打印题目
	gets(typein); //扫描回答
	itoa(a+b,convert,10); //将正确答案转换为字符串
	if(strcmp(convert,typein)) //判断回答是否正确
	{
		printf("%2d + %2d = %2d | Your answer: %s Wrong!n",a,b,a+b,typein);
		return 0;
	}
	else
	{
		printf("%2d + %2d = %2d | Your answer: %s Right!n",a,b,a+b,typein);
		return 1;
	}
}
int subtraction() //减法运算函数
{
	int a,b;
	char convert[3],typein[3];
	a=rand()%100; //在[0,100)的范围内取随机数
	b=rand()%(a+1); //由于是减法运算，可以在[0,a+1)的范围内取随机数
	printf("%2d - %2d = ",a,b); //打印题目
	gets(typein); //扫描回答
	itoa(a-b,convert,10); //将正确答案转换为字符串
	if(strcmp(convert,typein)) //判断回答是否正确
	{
		printf("%2d - %2d = %2d | Your answer: %s Wrong!n",a,b,a-b,typein);
		return 0;
	}
	else
	{
		printf("%2d - %2d = %2d | Your answer: %s Right!n",a,b,a-b,typein);
		return 1;
	}
}
int multiplication() //乘法运算函数
{
	int a,b;
	char convert[3],typein[3];
	while(1) //循环进行随机，直到有符合要求的题目
	{
		a=rand()%100; //在[0,100)的范围内取随机数
		b=rand()%100; //在[0,100)的范围内取随机数
		if(a*b<100) //判断两个随机数的乘积是否小于100
			break;
	}
	printf("%2d * %2d = ",a,b); //打印题目
	gets(typein); //扫描回答
	itoa(a*b,convert,10); //将正确答案转换为字符串
	if(strcmp(convert,typein)) //判断回答是否正确
	{
		printf("%2d * %2d = %2d | Your answer: %s Wrong!n",a,b,a*b,typein);
		return 0;
	}
	else
	{
		printf("%2d * %2d = %2d | Your answer: %s Right!n",a,b,a*b,typein);
		return 1;
	}
}
int division() //除法运算函数
{
	int a,b;
	char convert[3],typein[3];
	while(1) //循环进行随机，直到有符合要求的题目
	{
		a=rand()%100; //在[0,100)的范围内取随机数
		b=rand()%a+1; //由于是除法运算，可以在[1,a+1)的范围内取随机数
		if(a%b==0) //判断前一个随机数是否可以被后一个随机数整除
			break;
	}
	printf("%2d / %2d = ",a,b); //打印题目
	gets(typein); //扫描回答
	itoa(a/b,convert,10); //将正确答案转换为字符串
	if(strcmp(convert,typein)) //判断回答是否正确
	{
		printf("%2d / %2d = %2d | Your answer: %s Wrong!n",a,b,a/b,typein);
		return 0;
	}
	else
	{
		printf("%2d / %2d = %2d | Your answer: %s Right!n",a,b,a/b,typein);
		return 1;
	}
}
int grades() //查询成绩函数
{
	int i=0,grade=-1,time,cycle();
	char scan[7];
	FILE *fp;
	if((fp=fopen("record.txt","r"))==NULL)
	{
		printf("Now program doesn't hava any grades.n"); //如果文件不存在，提示不存在成绩
		cycle();
	}
	printf("Your previous records are:nID:	Grades: Time:n"); //给出成绩提示
	while(!feof(fp))
	{
		memset(scan,0,sizeof(scan));
		fseek(fp,i,SEEK_SET); //将文件读写指针移动到i指定的位置
		fgets(scan,7,fp); //一次读取(7-1)个字符
		if(strcmp(scan,ID)==0) //判断读取的字符和ID是否相同
		{
			fseek(fp,i+7,SEEK_SET); //将文件读写指针移动到i指定的位置，即当前成绩条目的起始位置
			fscanf(fp,"%3d %3d",&grade,&time); //扫描成绩与答题时间
			printf("%s   %3d   %3d secondsn",ID,grade,time); //打印ID 成绩 时间
		}
		i+=16;
	}
	if(grade<0) //初始化grade的值为-1，若未查找到成绩，则grade的值不变，仍为-1，以此判断是否存在成绩
		printf("You have never do the test before.n");
	return 0;
}
int cycle() //循环函数
{
	int choice(),i;
	char typein[2];
	printf("Do you want continue?n1)NO, exit.n2)Yes, and change ID.n3)Yes, but not change ID.n");//给出选择提示
	gets(typein); //获得输入数据
	if(typein[1]!=''||isdigit(typein[0])==0) //检验是否输入一位数字
	{
		printf("Please type in a number:n");
		cycle();
	}
	switch(typein[0]) //用ASCII码判断选择
	{
		case 49:
			printf("Bye! Thanks for using my program!n");
			exit(0);
		case 50:
			main();
		case 51:
			choice();
		default:
			printf("Please type in a number:n");
			cycle();
	}
	return 0;
}
{% endcodeblock %}
后来在看到室友的代码后由 *``goto``* 受到了启发，于是大幅精简，合并函数，完成了第二个版本，并加上了第一个版本缺失的功能。

{% codeblock 第二个版本 lang:c %}
#include <stdio.h>
#include <stdlib.h> //随机函数相关的头文件
#include <time.h> //时间函数相关的头文件
#include <ctype.h> //判断数字字母函数相关的头文件
#include <string.h> //判断字符串相等函数的头文件
int main()
{
	int n,i,score=0,a[10],b[10],result[10],grade=-1,readtime,count=0;
	long start,end;
	char ID[7],typein[3],convert[3],input[10][3],scan[7],symbol[10];
	FILE *data;
	printf("Welcome!\n"); //欢迎提示
	inputID:
	do
	{
		printf("Please type in your ID No:"); //提示输入学号
		gets(ID); //获得输入数据
	}
	while(!(ID[6]=='\0'&&isalpha(ID[0])&&isalpha(ID[1])&&isdigit(ID[2])&&isdigit(ID[3])&&isdigit(ID[4])&&isdigit(ID[5]))); //检验ID是否符合格式
	choice: //选择功能部分
	printf("(Please type in a number.)\nWhat do you want to do?\n1) Start a test.\n2) Check scores\n3) Exit\nPlease type in your choice:\n"); //给出选择提示
	gets(typein); //获得输入数据
	if(typein[1]!='\0'||isdigit(typein[0])==0) //检验是否输入一位字符
		goto choice;
	switch(typein[0]) //用ASCII检验是否为数字
	{
		case 49: //判断进行测试
			srand(time(NULL)); //利用时间进行播种，以生成真正的随机数
			printf("Test Will start! Are you ready?"); //提示测试将要开始
			getchar(); //等待按下任意键开始测试
			time(&start); //记录开始测试时的时间
			for(i=0;i<10;i++) //循环10次给出问题
			{
				n=rand()%4; //使用随机数来选择加减乘除
				giveProblem:
				a[i]=rand()%100; //在[0,100)的范围内取随机数
				b[i]=rand()%100; //在[0,100)的范围内取随机数
				switch(n)
				{
					case 0:
						symbol[i]='+';
						result[i]=a[i]+b[i];
						break;
					case 1:
						symbol[i]='-';
						result[i]=a[i]-b[i];
						break;
					case 2:
						symbol[i]='*';
						result[i]=a[i]*b[i];
						break;
					case 3:
						symbol[i]='/';
						result[i]=a[i]/b[i];
				}
				if(result[i]>99||result[i]<0)
					goto giveProblem;
				if(n==3&&(a[i]%b[i]!=0))
					goto giveProblem;
				printf("%2d %c %2d = ",a[i],symbol[i],b[i]); //打印题目
				itoa(result[i],convert,10); //将正确答案转换为字符串
				gets(input[i]); //扫描回答
				if(!strcmp(convert,input[i])) //判断回答是否正确
					score+=10; //正确加10分
			}
			time(&end); //记录测试结束时的时间
			printf("You have got %3d score(s).\n",score); //提示得分
			printf("Prob.    | Correct Answ. | Ur Answ.\n"); //打印每道题的答案
			for(i=0;i<10;i++)
				printf("%2d %c %2d =       %3d           %s\n",a[i],symbol[i],b[i],result[i],input[i]);
			data=fopen("record.txt","a");
			fprintf(data,"%s %3d %3ld\n",ID,score,end-start); //将ID 得分 时间写入文件
			fclose(data);
			break;
		case 50: //判断查询分数
			if((data=fopen("record.txt","r"))==NULL)
			{
				printf("Now program doesn't hava any grades.\n"); //如果文件不存在，提示不存在成绩
				goto cycle;
			}
			i=0;
			while(!feof(data))
			{
				memset(scan,0,7); //将scan的内容清空
				fseek(data,i,SEEK_SET); //将文件读写指针移动到i指定的位置
				fgets(scan,7,data); //一次读取(7-1)个字符
				if(strcmp(scan,ID)==0) //判断读取的字符和ID是否相同
				{
					fseek(data,i+7,SEEK_SET); //将文件读写指针移动到i+7指定的位置，即当前成绩条目的位置
					fscanf(data,"%3d %3d",&grade,&readtime); //扫描成绩与答题时间
					if(!(count++))
						printf("Your previous records are:\nID:    Grades: Time:\n"); //给出成绩提示
					printf("%s   %3d   %3d seconds\n",ID,grade,readtime); //打印ID 成绩 时间
				}
				i+=16;
			}
			if(grade<0) //初始化grade的值为-1，若未查找到成绩，则grade的值不变，仍为-1，以此判断是否存在成绩
				printf("You have never do the test before.\n");
			fclose(data);
			break;
		case 51: //判断选择退出
			printf("Bye! Thanks for using my program!\n");
			exit(0);
		default: //输入错误的选择
			printf("Please type in a number.\n");
			goto choice;
	}
	cycle:
	printf("(Please type in a number.)\nDo you want continue?\n1)NO, exit.\n2)Yes, and change ID.\n3)Yes, but not change ID.\n");//给出选择提示
	gets(typein); //获得输入数据
	if(typein[1]!='\0'||isdigit(typein[0])==0) //检验是否输入一位数字
	{
		printf("Please type in a number:\n");
		goto cycle;
	}
	switch(typein[0]) //用ASCII码判断选择
	{
		case 49:
			printf("Bye! Thanks for using my program!\n");
			exit(0);
		case 50:
			goto inputID;
		case 51:
			goto choice;
		default:
			goto cycle;
	}
}
{% endcodeblock %}
我这里将所有的输入部分都进行了正确性检测，所以代码稍微长了一点点，另外又多于要求多了一个循环的功能，目测仅按题目最小要求做可以控制在一百行以内。

以上。

-------更新：2016-3-1-------

惭愧，假期里又看了看我这代码感觉写的好傻，目不忍视，遂又重写了一遍，改进一下。
{% codeblock 第三个版本 lang:c %}
#include <stdio.h>
#include <stdlib.h> //随机函数相关的头文件
#include <time.h> //时间函数相关的头文件
#include <ctype.h> //判断数字字母函数相关的头文件
#include <string.h> //判断字符串相等函数的头文件

struct information {
	int score;
	long int time;
	char ID[7];
} infor[1000];

int main(int argc, char const *argv[]) {
	int n, score = 0, a[10], b[10], result[10], grade = -1, readtime, count = 0, i;
	time_t start, end;
	char ID[7], typein[3], convert[3], input[10][3], scan[7], symbol[10];
	FILE *data;
	printf("Welcome!\n");
	inputID:
	do {
		printf("Please type in your ID No: (Like AB1234)\n");
		gets(ID);
	} while(ID[6] != '\0' || !isupper(ID[0]) || !isupper(ID[1]) || !isdigit(ID[2]) || !isdigit(ID[3]) || !isdigit(ID[4]) || !isdigit(ID[5]));
	choice:
	do {
		printf("What do you want to do? (Please type in a number)\n1) Start a test.\n2) Check scores\n3) Exit\nPlease type in your choice:\n");
		gets(typein);
	} while(typein[1] != '\0' || typein[0] < 49 || typein[0] > 51);
	if (typein[0] == 49) {
		srand((unsigned)time(NULL)); //利用时间进行播种，以生成真正的随机数
		printf("Test Will start! Are you ready?");
		getchar(); //等待按下任意键开始测试
		time(&start); //记录开始测试时的时间
		for (i = 0; i < 10; i++) {
			n = rand() % 4;
			do {
				a[i] = rand() % 100;
				b[i] = rand() % 100;
				switch (n) {
					case 0:
						symbol[i] = '+';
						result[i] = a[i] + b[i];
						break;
					case 1:
						symbol[i] = '-';
						result[i] = a[i] - b[i];
						break;
					case 2:
						symbol[i] = '*';
						result[i] = a[i] * b[i];
						break;
					case 3:
						symbol[i] = '/';
						result[i] = a[i] / b[i];
				}
			} while(result[i] > 99 || result[i] < 0 || n==3 && a[i] % b[i] != 0);
			printf("%2d %c %2d = ", a[i], symbol[i], b[i]);
			itoa(result[i], convert, 10);
			gets(input[i]);
			if (!strcmp(convert, input[i])) {
				score += 10;
			}
		}
		time(&end); //记录测试结束时的时间
		printf("You have got %3d score(s).\n", score); //提示得分
		printf("Prob.		| Correct Answ. | Ur Answ.\n"); //打印每道题的答案
		for (i = 0; i < 10; i++) {
			printf("%2d %c %2d =	%3d				%s\n", a[i], symbol[i], b[i], result[i], input[i]);
		}
		data = fopen("record.txt", "a+");
		fprintf(data, "%s %3d %3ld\n", ID, score, end - start); //将ID 得分 时间写入文件
		fclose(data);
	}
	if (typein[0] == 50) {
		data = fopen("record.txt", "a+");
		for (i = 0, n = 0; !feof(data); i++) {
			fscanf(data, "%s %d %ld", infor[i].ID, &infor[i].score, &infor[i].time);
			if (!strcmp(infor[i].ID, ID)) {
				n++;
				printf("%s %d %ld seconds", infor[i].ID, infor[i].score, infor[i].time);
			}
		}
		fclose(data);
		i -= 2;
		if (n == 0) {
			printf("You have never do the test before.\n");
		}
	}
	if (typein[0] == 51) {
		printf("Bye! Thanks for using my program!\n");
		exit(0);
	}
	do {
		printf("Do you want continue? (Please type in a number)\n1)No, exit.\n2)Yes, and change ID.\n3)Yes, but not change ID.\n");//给出选择提示
		gets(typein);
	} while(typein[1] != '\0' || typein[0] < 49 || typein[0] > 51);
	switch (typein[0]) {
		case 49:
			printf("Bye! Thanks for using my program!\n");
			exit(0);
		case 50:
			goto inputID;
		case 51:
			goto choice;
	}
}
{% endcodeblock %}
