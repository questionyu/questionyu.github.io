---
title: Linux 修改 SSH 端口号
date: 2015-04-24 00:04:29
categories:
  - Tips
tags:
  - Linux
  - SSH
---

管理自己的主机，一般都是用 SSH 的方式，默认使用 22 端口。为了安全着想，最好修改默认端口。

找到 `/etc/ssh/sshd_config`，打开修改，将
```bash
#Port 22
```
修改为
```bash
Port 2333
```
在这里 `2333` 设置为自己想要的端口。

不要忘记把 `2333` 端口加入防火墙规则里面，否则就无法管理主机了。

最后重启一下 SSH 服务
```bash
service sshd restart
```
