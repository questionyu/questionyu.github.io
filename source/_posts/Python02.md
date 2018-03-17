---
title: Python程序设计 第二周
date: 2018-03-16 17:53:12
categories:
  - Code
tags:
  - Python
---

* 利用嵌套循环 ， 输出 2-100 之间的质数。
* 有四个数字：1、2、3、4，能组成多少个互不相同且无重复数字的三位数？各是多少？
* 输出 9*9 乘法口诀表。

{% codeblock lang:python %}
# 输出2-100之间的素数
for i in range(2, 101):
    for j in range(2, i):
        if not (i % j):         # 如果 i 整除 j（i 不是素数）
            break                   # 跳出循环
    else:
        print(i, "是素数")
{% endcodeblock %}

{% codeblock lang:python %}
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
{% endcodeblock %}

{% codeblock lang:python %}
# 输出 9*9 乘法口诀表
for i in range(1, 10):
    for j in range(1, i + 1):
        print("%d*%d=%2d" % (i, j, i * j), end=" ")
    print()
{% endcodeblock %}