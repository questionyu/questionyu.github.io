---
title: 校园网使用 IPv6 免流量上网
date: 2016-08-01 16:57:35
categories:
  - Tips
tags:
  - 免流
  - 校园网
  - DNS64
  - IPv6
  - Shadowsocks
  - SSTap
---

{% note info %} 本文最后更新于 2018年3月16日 可能会因为没有更新而失效。如已失效或需要修正，请留言！ {% endnote %}

自从挖煤的校长来了之后，校园网就不再是免费使用了，变成了现在这个样子：每个月 20G 免费流量，超出需要付费。对于大部分人来说，寝室的 WiFi 好像突然就变得鸡肋了，连上了 WiFi 也不敢放肆了，真是让人憋屈。

在我搬回本部之前就已经在研究这个如何免流量上网的事情了，在宏福那里研究不是很顺利，毕竟宏福的 IPv6 不是很好折腾，好在电信还算有点良心，分配了 240E 开头的原生 IPv6 地址，各种关于 IPv6 的实验得以进行。7 月刚从宏福搬回本部，室友不到两天就用了 12G 的流量，一个月 20G 的免费流量完全不够用。免流，势在必行。我稍微研究总结了一下，目前主要有两种免流方式，下面我一个一个慢慢说。<!--more-->

## 免流原理

中国的校园网网络一般都是双栈网络，IPv4+IPv6，而一般的学校是对 IPv4 流量收费的，对 IPv6 流量免费，我们只要把所有系统软件产生的需要收费的 IPv4 流量转换为 IPv6 流量走出校园就可以做到免费上网了。对 IPv6 流量免费并不是不能对 IPv6 流量计费，而是现在校园网作为推广试验 IPv6 的环境，国家政策鼓励的结果。现在的移动 4G 已经启用了 IPv6，不可能放你免费用的。

但是，中国的大部分网站（其实世界上多数网站也这样）没有配置 IPv6 地址，只能通过 IPv4 流量访问，所以我们的 IPv6 流量从校园网出去之后还要转换回 IPv4 流量才能正常使用网络服务。一般来说我们需要一台这样服务器：同时有 IPv4+IPv6 环境，与我们的电脑使用 IPv6 通信，与各大网站使用 IPv4 通信，服务器在中间中转转换。

接下来我们关注的重点就是这个可以转换我们流量的服务器了。

## 环境前提

你必须得有访问 IPv6 网络的权限，如果你可以正常打开 {% exturl 北邮人BT https://bt.byr.cn/ "BYRBT" %} 并能正常 BT 下载做种等操作，说明你的网络是有 IPv6 环境的，具备免流量的条件。

---

## 一、DNS64

维基百科是这样解释 DNS64 的：
{% blockquote Wikipedia https://en.wikipedia.org/wiki/IPv6_transition_mechanism#DNS64 "DNS64" %}
DNS64 describes a DNS server that when asked for a domain's AAAA records, but only finds A records, synthesizes the AAAA records from the A records. The first part of the synthesized IPv6 address points to an IPv6/IPv4 translator and the second part embeds the IPv4 address from the A record. The translator in question is usually a NAT64 server. The standard-track specification of DNS64 is in RFC 6147.[10]
There are two noticeable issues with this transition mechanism:
It only works for cases where DNS is used to find the remote host address, if IPv4 literals are used the DNS64 server will never be involved.
Because the DNS64 server needs to return records not specified by the domain owner, DNSSEC validation against the root will fail in cases where the DNS server doing the translation is not the domain owner's server.
{% endblockquote %}
通过配置 IPv6 DNS，对内容服务商的域名进行 IPv4 → IPv6 解析结果转换，实现 IPv6 与 IPv4 资源互通。简单的说就是，我们使用了一个“不正常”的 DNS 服务器，在我们访问某个网址域名时，返回一个“错误”的地址，这个地址是 IPv6 地址，我访问这个错误的地址却也能得到正确的结果，这就是这个服务器在中间转换的结果了。
比如正常情况下我访问凤凰网，连接的是 ``211.68.71.214`` 这个地址，在使用 DNS64 之后，我连接的地址就变为了 ``240c:f:1:6644:2:0:3ccf:f662``，但是同样能打开凤凰网。

下面以 Windows 10 为例说明设置方法，各 Linux 发行版、macOS 设置方法请自行搜索“系统名称 + 修改 DNS”，方法大同小异。

首先“打开网络和 Internet 设置”

![打开网络和 Internet 设置](/uploads/2018/03/打开网络和 Internet 设置.png)

然后选择“更改适配器选项”

![更改适配器选项](/uploads/2018/03/更改适配器选项.png)

如果你使用网线接入校园网，则选择“本地连接/以太网”，如果你使用 WiFi 接入校园网，则选择“无线网络连接”。在相应的连接上面右键，选择“属性”。

选中“Internet 协议版本 6 (TCP/IPv6)”，然后点击“属性”

![以太网 属性](/uploads/2018/03/以太网-属性.png)

选择“使用下面的 DNS 服务器地址”，并如图填入 ``240C::6644``

![Internet 协议版本 6 (TCP/IPv6) 属性](/uploads/2018/03/Internet-协议版本-6-TCP-IPv6-属性.png)

之后逐次点击确定保存更改。

此时退出校园网登陆，试一试现在能否打开百度新浪等页面？

手机连接 WiFi 也可以更改 DNS 服务器，具体每部手机修改方法请搜索解决。

这种方法最简单，但同时也有缺点：不能播放视频，网页加载速度慢，不能使用 QQ（因为 QQ 客户端是通过 IPv4 地址直接连接的，不使用域名）。

## 二、使用代理服务器

这一种方法就没有了上一个方法的缺点了，可以正常播放视频，实测优酷土豆爱奇艺流畅播放，同时还可以观看 YouTube 视频。原理很简单：使用支持 IPv6 的主机作为代理服务器。架设代理的方法有很多，Shadowsocks、OpenVPN 等支持 IPv6 的软件是不错的选择，我们这里介绍使用 Shadowsocks。

维基百科上面对于 Shadowsocks 的解释：
{% blockquote Wikipedia https://zh.wikipedia.org/wiki/Shadowsocks "Shadowsocks" %}
Shadowsocks（中文名称：影梭）是使用Python等语言开发的、基于Apache许可证开源的代理软件。Shadowsocks使用Socks5代理，用于保护网络流量。在中国大陆被广泛用于突破防火长城（GFW），以浏览被封锁的内容。
Shadowsocks分为服务器端和客户端。在使用之前，需要先将服务器端部署在支持Python的服务器上面，然后通过客户端连接并创建本地代理。
2015年8月22日，Shadowsocks原作者Clowwindy因受到中国政府的压力，宣布停止维护此项目。不过Git仓库的日志显示该项目仍然在有人维护，并且代码实际上并未被真正删除。
{% endblockquote %}
虽然 Shadowsocks 的目的是为了翻墙，但是 Shadowsocks 功能强大方便易用，也可以拿来作为我们的免流上网中转工具。

第一步，你需要有一个支持 IPv6 的 Shadowsocks 服务器节点，这一步很重要，没有可用的服务器怎么也玩不转。个人推荐 Bandwagon、Digital Ocean、Vultr 这些服务商，一般都比较便宜，如果你想使用 Vultr 的话，可以使用我的{% exturl 邀请链接 https://www.vultr.com/?ref=7071081 "Vultr.com" %}，这样的话你我都可以获得 $10 的优惠。注册之后，开一个最低配置的 VPS 就可以满足我们的需求了，一般选择美国的节点，系统推荐选择 Ubuntu 16.04，安装方法可以参考我的另一篇文章：{% exturl "Linux 安装配置 Shadowsocks-Libev" https://questionyu.com/Install-Shadowsocks-Libev.html "Linux 安装配置 Shadowsocks-Libev" %}

第二步，下载 Shadowsocks 客户端程序，打开软件，将 Shadowsocks 服务器信息对应填入其中。

![编辑服务器](/uploads/2018/03/编辑服务器.png)

![编辑服务器](/uploads/2018/03/编辑服务器 local-1080.png)

第三步，服务器信息填写完毕后，下载安装 SSTap。

安装过程中会提示“您想安装这个设备软件吗？，”勾选始终信任来自...的软件，并点击安装。

打开 SSTap，点击添加新代理，选择“添加一个 SOCKS5 代理”，这里不能选择添加 SS 代理，因为 SSTap 不支持使用 IPv6 连接。然后按照下图设置。

![SSTap 添加代理](/uploads/2018/03/SSTap 添加代理.png)

添加完成回到主界面，点击“创建或者修改代理模式”

![SSTap 选择修改代理](/uploads/2018/03/SSTap 选择修改代理.png)

在弹出的“代理模式管理”窗口中，点击“添加”，按照下图填写。

![SSTap 添加新规则](/uploads/2018/03/SSTap 添加新规则.png)

规则列表如下
```
0.0.0.0/8
10.0.0.0/8
100.64.0.0/10
127.0.0.0/8
169.254.0.0/16
172.16.0.0/12
192.0.0.0/29
192.0.2.0/24
192.88.99.0/24
192.168.0.0/16
198.18.0.0/15
198.51.100.0/24
203.0.113.0/24
224.0.0.0/3
```

至此，全部设置已经完成，点击保存，返回主界面，点击连接，稍等片刻即可完成。

![SSTap 成功连接](/uploads/2018/03/SSTap 成功连接.png)

现在打开浏览器，任意打开网站看一看，是不是可以免登陆校园网就可以打开了？

手机上的设置相对简单，前提也是必须可以正常访问 IPv6 网络。Android 手机下载安装“影梭”，iPhone 下载安装“Shadowrocket”。

添加新配置，选择“手动配置”，将服务器的地址，远程端口，密码，加密方法填写正确，路由选项选择“绕过局域网地址”，其他选项无需修改。

![Screenshot_影梭_20180310-192509](/uploads/2018/03/Screenshot_影梭_20180310-192509.png)

填写完毕，点击保存，回到主界面，点一下纸飞机便可以免流上网了。

iOS 系统的设置方法类似，这里不再演示。

由于是使用代理服务器进行网络浏览，所以正常情况下会比直接访问速度稍慢，但还是可以接受的。

各种各样的免流方法并没有一个是完美无缺的，在免流情况下，玩游戏的延迟很可怕，几乎是不可能的事情，所以玩游戏还是用流量吧。20G 的专属游戏流量，对我来说，足矣。

---

末尾贴上各平台客户端下载地址：

> * Windows: [shadowsocks-windows](https://github.com/shadowsocks/shadowsocks-windows/releases) [SSTap](https://www.sockscap64.com/sstap/)
> * macOS: [ShadowsocksX-NG](https://github.com/shadowsocks/ShadowsocksX-NG/releases)
> * Android: [shadowsocks-android](https://github.com/shadowsocks/shadowsocks-android/releases)
> * iOS: [Shadowrocket](https://itunes.apple.com/us/app/shadowrocket/id932747118?mt=8)
