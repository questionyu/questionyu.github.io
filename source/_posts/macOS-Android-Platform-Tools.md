---
title: macOS 下 Android 平台工具的 PATH 配置
date: 2019-03-07 11:19:53
categories:
  - Tips
tags:
  - macOS
  - Android
---

{% note info %}
本文最后更新于 2019年3月7日 可能会因为没有更新而失效。如已失效或需要修正，请留言！
{% endnote %}

在安装了 Android Studio 之后，相关的 `adb` `fastboot` 等工具应该都应经下载在电脑里了。但是 AS 并没有把相关的目录加入 PATH，导致在终端里不可以方便的直接使用，需要加上很长的一串路径才可可以。这个文章记录下解决的办法。

编辑 BASH 的配置文件
``` bash
$ nano ~/.bash_profile 
```

在文件最后追加几行
``` bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH="$PATH:$ANDROID_HOME/platform-tools"
export PATH="$PATH:$ANDROID_HOME/tools"
```

macOS 下的默认 `ANDROID_HOME` 位置就是如上配置，无需修改，其他系统下的路径需要根据实际情况修改。

之后再使刚改好的配置生效，或者重新打开终端。
``` bash
$ source ~/.bash_profile
```

配置好后的效果如下图。
![](/uploads/2019/03/屏幕快照 2019-03-07 12.46.11.png)
