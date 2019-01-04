---
title: 修复 Ubuntu 下拼音输入法崩溃问题
categories:
  - 生活随笔
date: 2019-01-03 21:36:03
tags:
---

最近在使用 Ubuntu 18.04 的过程中，遇到了一个拼音输入法总是在选字的时候崩溃的问题。

## 崩溃表现

`crashed with SIGABRT in __assert_fail_base()`

具体表现为：在打字时，无法使用数字键选择字词，鼠标点选也无效，只能按空格打出第一个字词。当按数字键选择字词时，输入法会崩溃，并输出字母和数字，例如我想打出“谷歌”，“谷歌”在候选列表第二个位置，按下 `2`，输入法崩溃，输出 `guge2`。

我搜索了一下，并没有找到解决办法，只好退而求其次，使用 fcitx 代替了 ibus，就这么过了半个月。然而我今天再次搜索的时候竟然找到了解决办法：[Selecting a number does not always return a Chinese character with ibus pinyin](https://askubuntu.com/questions/1053182/selecting-a-number-does-not-always-return-a-chinese-character-with-ibus-pinyin)。

## 解决办法

直接删除输入法的缓存就好：`rm ~/.cache/ibus/libpinyin/*`
