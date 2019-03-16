---
title: macOS 下的包管理器 Homebrew
date: 2019-03-08 17:46:23
categories:
  - Tips
tags:
  - macOS
  - Homebrew
---

{% note info %}
本文最后更新于 2019年3月8日 可能会因为没有更新而失效。如已失效或需要修正，请留言！
{% endnote %}

## 介绍

之前使用 Ubuntu 和 CentOS 的时候，它们都各自拥有便捷的包管理器 `APT` 和 `YUM`，使用它们安装卸载软件，自动解决依赖问题，非常方便。最近在换用 macOS 系统之后，却没有了类似的管理器，安装软件又回到了和 Windows 一样的体验。虽说 App Store 拥有一些很优秀的软件，但是作为一个未来的码农，需要的很多软件并没有 App Store 版，如果手动下载安装，以后软件更新了还需要再下载安装一次，这些无意义的重复劳动需要解决掉。

早在换 Mac 之前就听说过了 `Homebrew` 的名字，它自己的介绍就是 `The missing package manager for macOS (or Linux)`，很厉害的一个项目，方便实用。它的野心不小，不满足于 macOS 系统，还将支持扩展到了 Linux 发行版系统上，甚至还支持在 WSL 中使用。<!--more-->

## 安装

安装非常简单，终端中一行命令即可完成。
``` bash
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

## 使用

### 搜索软件

在 `Homebrew` 中搜索软件很很简单。
``` bash
$ brew search chrome
```
![](/uploads/2019/03/屏幕快照 2019-03-07 18.14.24.png)
如上图可以看到，我搜索 `Chrome` 的结果。搜索结果有两部分，`Formulae` 和 `Casks`，前者指命令行工具，后者指图形化程序。

如果想查询相关程序的信息，可以使用以下命令，对于 `Formulae` 程序
``` bash
$ brew info chrome-cli
```
![](/uploads/2019/03/屏幕快照 2019-03-07 18.19.07.png)
对于 `Casks` 程序
``` bash
$ brew cask info google-chrome
```
![](/uploads/2019/03/屏幕快照 2019-03-07 18.19.31.png)

### 安装软件

在知道程序准确名称之后，可以使用以下命令安装，对于 `Formulae` 程序
``` bash
$ brew install chrome-cli
```
对于 `Casks` 程序
``` bash
$ brew cask install google-chrome
```

### 卸载软件

卸载软件同样很简单，对于 `Formulae` 程序
``` bash
$ brew uninstall chrome-cli
```
对于 `Casks` 程序
``` bash
$ brew cask uninstall google-chrome
```

### 升级软件

更新软件源和 `Homebrew` 本身。
``` bash
$ brew update
```

列出没有更新到最新版本的 `Formulae` 程序。
``` bash
$ brew outdated
```
![](/uploads/2019/03/屏幕快照 2019-03-07 18.29.24.png)

更新所有 `Formulae` 程序，
``` bash
$ brew upgrade
```
![](/uploads/2019/03/屏幕快照 2019-03-07 18.33.04.png)
或者更新特定 `Formulae` 程序。
``` bash
$ brew upgrade node
```

对于 `Casks` 程序来说，更新并没有如此简单，不过可以使用一个小插件来使之简化。
``` bash
$ brew tap buo/cask-upgrade
```

之后，只需运行以下命令即可检查 `Casks` 程序的更新。
``` bash
$ brew cu
```
![](/uploads/2019/03/屏幕快照 2019-03-07 18.36.24.png)

默认不会检查带有自动更新功能的程序，不过我想要的是让它检查，帮我更新，只需添加一个参数即可。
``` bash
$ brew cu -a
```
![](/uploads/2019/03/屏幕快照 2019-03-07 18.38.50.png)
