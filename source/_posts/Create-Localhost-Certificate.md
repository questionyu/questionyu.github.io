---
title: 创建 Localhost 证书
date: 2019-03-05 19:53:15
categories:
  - Tips
tags:
  - 证书
  - macOS
---

{% note info %}
本文最后更新于 2019年3月5日 可能会因为没有更新而失效。如已失效或需要修正，请留言！
{% endnote %}

有时因为开发的需求，需要为本地的网页服务器设置 https 访问。在这里记录一下在 macOS 系统下快速创建自签名证书并设置可信的方法。

## Xcode Command Line Tools
基本所有在 macOS 中开发的人应该都已经安装过了命令行工具，在终端中一句命令即可安装。
```bash
xcode-select --install
```
<!--more-->
## 生成证书
在终端里运行以下命令即可在用户目录里生成证书和秘钥。
```bash
openssl req -x509 -days 3650 -out localhost.crt -keyout localhost.key \
  -newkey rsa:2048 -nodes -sha256 \
  -subj '/CN=localhost' -extensions EXT -config <( \
   printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")
```

其中 `-days 3650` 参数是指定证书的有效时间为 3650 天。
![](/uploads/2019/03/屏幕快照 2019-03-05 20.03.20.png)

## 设置信任
最后，需要在系统中设置信任，否则直接使用仍会提示不信任。

直接搜索打开“钥匙串访问”，“文件” - “导入项目” - 选择刚生成的 crt 文件。

双击打开刚导入的证书，设置“使用此证书时：始终信任”。
![](/uploads/2019/03/屏幕快照 2019-03-05 20.17.10.png)

效果如下图。
![](/uploads/2019/03/屏幕快照 2019-03-05 20.19.24.png)
