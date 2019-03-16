---
title: Ubuntu 18.04 配置开机启动项
date: 2019-03-14 18:47:58
categories:
  - Tips
tags:
  - Ubuntu
---

{% note info %}
本文最后更新于 2019年3月14日 可能会因为没有更新而失效。如已失效或需要修正，请留言！
{% endnote %}

在 Ubuntu 16.04 版本中，配置开机启动项是一件很简单的事情，只需在 `/etc/rc.local` 中添加即可。

但在 Ubuntu 18.04 中，此方法失效。经搜索实践，总结了一下较为简单的设置开机启动项的方法。

首先运行
``` bash
$ crontab -e
```
之后**可能**会出现以下提示
``` bash
no crontab for neo - using an empty one

Select an editor.  To change later, run 'select-editor'.
  1. /bin/nano        <---- easiest
  2. /usr/bin/vim.basic
  3. /usr/bin/vim.tiny
  4. /bin/ed

Choose 1-4 [1]: 
```
推荐选 1。

在末尾添加新的一行
``` bash
@reboot /path/to/your/boot.sh
```

之后把开机启动命令都写在 `/path/to/your/boot.sh` 这个文件里。

最后别忘了给文件加上可执行属性
``` bash
$ chmod +x /path/to/your/boot.sh
```

此时重启即可看到效果。
