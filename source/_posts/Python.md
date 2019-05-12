---
title: Python程序设计
date: 2018-03-16 17:53:12
categories:
  - Code
tags:
  - Python
  - Python程序设计
---

## 第二周
* 利用嵌套循环 ， 输出 2-100 之间的质数。
* 有四个数字：1、2、3、4，能组成多少个互不相同且无重复数字的三位数？各是多少？
* 输出 9*9 乘法口诀表。

``` python
# 输出2-100之间的素数
for i in range(2, 101):
    for j in range(2, i):
        if not (i % j):         # 如果 i 整除 j（i 不是素数）
            break                   # 跳出循环
    else:
        print(i, "是素数")
```
<!--more-->
``` python
# 有四个数字：1、2、3、4，能组成多少个互不相同且无重复数字的三位数？各是多少？
# num = 0
# for i in range(1, 5):
#     for j in range(1, 5):
#         for k in range(1, 5):
#             if (i != j) & (i != k) & (j != k):
#                 print("%d%d%d" % (i, j, k))
#                 num = num + 1
# print("共有", num, "个")

# 👆第一种，👇第二种

from itertools import permutations

num = 0
for x in permutations([1, 2, 3, 4], 3):
    for y in x:
        print(y, end="")
    num = num + 1
    print()
print("共有", num, "个")
```

``` python
# 输出 9*9 乘法口诀表
for i in range(1, 10):
    for j in range(1, i + 1):
        print("%d*%d=%2d" % (i, j, i * j), end=" ")
    print()
```

## 第三周
* 绘画如图所示分形树。

![分形树](/uploads/2018/03/分形树.png)

``` python
# 绘画分形树。
import turtle


def draw_y(size, n):
    for angle in [30, 120]:
        turtle.left(angle)
        if n < 2:
            turtle.pencolor("green")
        else:
            turtle.pencolor("red")
        turtle.fd(size)
        if n != 0:
            draw_y(size / 1.5, n - 1)
            turtle.left(30)
        else:
            turtle.left(180)
        turtle.penup()
        turtle.fd(size)
        turtle.pendown()


turtle.setup(600, 600)
turtle.penup()
turtle.goto(0, -200)
turtle.pensize(1)
turtle.left(90)
turtle.pencolor("red")
turtle.pendown()
level = 5
turtle.fd(150)
draw_y(100, level)
```
