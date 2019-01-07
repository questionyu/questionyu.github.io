---
title: DBSCAN 的初步了解
date: 2018-01-01 18:44:13
categories:
  - 聚类分析
tags:
  - 聚类算法
  - DBSCAN
---

K-means 解决不了不规则形状的聚类。于是就有了 Density-based methods 来系统解决这个问题。该方法同时也对噪声数据的处理比较好。典型的基于密度的方法就是 DBSCAN 了。

DBSCAN，英文全写为 Density-based spatial clustering of applications with noise，是在 1996 年由 Martin Ester, Hans-Peter Kriegel, Jörg Sander 及 Xiaowei Xu 提出的聚类分析算法， 这个算法是以密度为本的：给定某空间里的一个点集合，这算法能把附近的点分成一组（有很多相邻点的点），并标记出位于低密度区域的局外点（最接近它的点也十分远），DBSCAN 是其中一个最常用的聚类分析算法，也是其中一个科学文章中最常引用的。

## DBSCAN 的数据分类
* 核心点。在半径 Eps 内含有超过 MinPts 数目的点。
* 边界点。在半径 Eps 内点的数量小于 MinPts，但是落在核心点的邻域内。
* 噪音点。既不是核心点也不是边界点的点。<!-- more -->

## DBSCAN 的一些定义
* ε-邻域：对于样本集中的 xj, 它的 ε-邻域为样本集中与它距离小于 ε 的样本所构成的集合。
* 核心对象：若 xj 的 ε-邻域中至少包含MinPts个样本，则xj为一个核心对象。
* 密度直达：若 xj 位于 xi 的 ε-邻域中，且 xi 为核心对象，则 xj 由 xi 密度直达。
* 密度可达：若样本序列 p1, p2, ……, pn。pi+1 由 pi 密度直达，则 p1 由 pn 密度可达。

## DBSCAN 的基本思路
1. 初始化核心对象集合 T 为空，遍历一遍样本集 D 中所有的样本，计算每个样本点的 ε-邻域中包含样本的个数，如果个数大于等于 MinPts，则将该样本点加入到核心对象集合中。初始化聚类簇数 k = 0， 初始化未访问样本集和为 P = D。
2. 当 T 集合中存在样本时执行如下步骤：
	1. 记录当前未访问集合 P_old = P
	2. 从 T 中随机选一个核心对象 o,初始化一个队列 Q = [o]
	3. P = P-o (从 T 中删除 o)
	4. 当 Q 中存在样本时执行：
		1. 取出队列中的首个样本 q
		2. 计算 q的 ε-邻域中包含样本的个数，如果大于等于 MinPts，则令 S 为 q 的 ε-邻域与 P 的交集，Q = Q + S，P = P - S
	5. k = k + 1，生成聚类簇为 Ck = P_old - P
	6. T = T - Ck
3. 划分为 C= {C1, C2, ……, Ck}

## Pros and Cons
1. 与 K-means 相比，DBSCAN 不需要事先知道要形成的簇类的数量。
2. 与 K-means 相比，DBSCAN 可以发现任意形状的簇类。
3. 同时，DBSCAN 能够识别出噪声点。
4. DBSCAN 对于 eps，MinPts 的值敏感，聚类质量受较大影响。
5. DBSCAN 不能很好反映高尺寸数据。
6. DBSCAN 不能很好反映数据集变化的密度。
7. 对于高维数据，密度定义很难。