---
title: Linux 安装配置 Shadowsocks-Libev
date: 2015-03-04 19:16:13
categories:
  - Tips
tags:
  - Linux
  - Shadowsocks
---

{% note info %}
本文最后更新于 2018年3月16日 可能会因为没有更新而失效。如已失效或需要修正，请留言！
{% endnote %}

Shadowsocks 目前是众多梯子中非常出色的一款，本文记录一下 Shadowsocks-Libev 版在 Linux 系统下的安装步骤。

{% blockquote Wikipedia https://zh.wikipedia.org/wiki/Shadowsocks "Shadowsocks" %}
Shadowsocks（中文名称：影梭）是使用Python等语言开发的、基于Apache许可证开源的代理软件。Shadowsocks使用Socks5代理，用于保护网络流量。在中国大陆被广泛用于突破防火长城（GFW），以浏览被封锁的内容。
Shadowsocks分为服务器端和客户端。在使用之前，需要先将服务器端部署在支持Python的服务器上面，然后通过客户端连接并创建本地代理。
{% endblockquote %}
<!--more-->

{% centerquote %}
**以下操作均在终端中执行**
{% endcenterquote %}

## 首先安装必要组件

如果是 Debian/Ubuntu
``` bash
sudo apt-get install --no-install-recommends gettext build-essential autoconf libtool libpcre3-dev asciidoc xmlto libev-dev libc-ares-dev automake
```
如果是 CentOS/Fedora/RHEL
``` bash
sudo yum install gettext gcc autoconf libtool automake make asciidoc xmlto c-ares-devel libev-devel
```

## 然后安装加密组件安装

一行一行的复制粘贴执行就可以了。
``` bash
export LIBSODIUM_VER=1.0.16
wget https://download.libsodium.org/libsodium/releases/libsodium-$LIBSODIUM_VER.tar.gz
tar xvf libsodium-$LIBSODIUM_VER.tar.gz
pushd libsodium-$LIBSODIUM_VER
./configure --prefix=/usr && make
sudo make install
popd
sudo ldconfig

export MBEDTLS_VER=2.7.0
wget https://tls.mbed.org/download/mbedtls-$MBEDTLS_VER-gpl.tgz
tar xvf mbedtls-$MBEDTLS_VER-gpl.tgz
pushd mbedtls-$MBEDTLS_VER
make SHARED=1 CFLAGS=-fPIC
sudo make DESTDIR=/usr install
popd
sudo ldconfig
```

## 接下来编译安装

同样是一行一行地执行。
``` bash
git clone https://github.com/shadowsocks/shadowsocks-libev.git
cd shadowsocks-libev
git submodule update --init --recursive
./autogen.sh && ./configure && make
sudo make install
```
至此，Shadowsocks-Libev 的安装已经结束。

## 接下来设置端口密码加密方式

首先创建配置文件
``` bash
mkdir /etc/shadowsocks-libev
touch /etc/shadowsocks-libev/config.json
nano /etc/shadowsocks-libev/config.json
```
（如果提示 ``command not found``，那就执行一下 ``sudo apt-get install nano``，安装 ``nano`` 之后再次执行上面的最后一行代码。）
然后将下列内容复制粘贴进去
``` json
{
    "server":["[::0]", "0.0.0.0"],
    "server_port": 这里换成你想要的端口,

    "password": "这里换成你想要的密码",
    "method": "这里换成你想要的加密方式",

    "timeout": 1800,
    "fast_open": true,
    "mode": "tcp_and_udp",
    "nameserver": "8.8.8.8",
    "ipv6_first": true,
    "no_delay": true
}
```
将上面的对应信息修改一下，只能替换中文文字，任何其他的字符包括引号都不要修改，加密方式有这些可选
``` bash
rc4-md5, aes-128-gcm, aes-192-gcm, aes-256-gcm, aes-128-cfb, aes-192-cfb, aes-256-cfb, aes-128-ctr, aes-192-ctr, aes-256-ctr, camellia-128-cfb, camellia-192-cfb, camellia-256-cfb, bf-cfb, chacha20-poly1305, chacha20-ietf-poly1305, salsa20, chacha20, chacha20-ietf
```
这些加密方式随便选择一个就可以了，注意不要包含空格逗号，推荐这些 ``aes-128-gcm, aes-192-gcm, aes-256-gcm, chacha20-ietf-poly1305``

## 最后添加开机启动

打开 ``rc.local`` 文件
``` bash
nano /etc/rc.local
```
将下列代码添加在 ``exit 0`` 之前的空行内
``` bash
nohup ss-server -c /etc/shadowsocks-libev/config.json > /dev/null 2>&1 &
```

## 别忘了防火墙

如果是 Ubuntu(>=16)
``` bash
sudo ufw allow 端口
```
如果是 CentOS(>=7)
``` bash
sudo firewall-cmd --add-port=端口/tcp --permanent
sudo firewall-cmd --add-port=端口/udp --permanent
sudo firewall-cmd --reload
```

所有的工作都完成了！重启一下你的 VPS，在你的客户端上配置好，就可以体验自由的网络世界了～
