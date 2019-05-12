---
title: macOS 原生输入法设置自然码
date: 2019-04-14 23:18:14
categories:
  - Tips
tags:
  - macOS
  - 双拼
  - 自然码
---

用了 macOS 一段时间了，一直使用的是搜狗输入法，因为系统自带的双拼输入法不支持自然码。

不过最近在网上看相关的双拼练习时，发现原来用过的[双拼练习](https://api.ihint.me/shuang/)的作者 [@BlueSky](https://github.com/BlueSky-07) 给出了提示，macOS 其实内置隐藏了双拼的自然码方案。

只需在终端内输入以下命令即可：
```bash
$ defaults write com.apple.inputmethod.CoreChineseEngineFramework shuangpinLayout 5
```

在输入法偏好设置中会看到这样的效果：
![](/uploads/2019/04/屏幕快照 2019-04-14 23.30.29.png)

此时即可使用自然码方案了。

附：系统为 macOS 10.14.4
