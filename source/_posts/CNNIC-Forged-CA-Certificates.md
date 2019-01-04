---
title: 谷歌称 CNNIC 发布伪造 CA 证书
date: 2015-06-17 00:14:55
categories:
  - 生活随笔
tags:
  - CNNIC
  - 证书
  - Google
author: 月光博客
url: https://www.williamlong.info/archives/4183.html
---

根据 [谷歌在线安全博客](https://security.googleblog.com/2015/03/maintaining-digital-certificate-security.html "Google Online Security Blog") 报道和 [Mozilla 安全博客](https://blog.mozilla.org/security/2015/03/23/revoking-trust-in-one-cnnic-intermediate-certificate/ "Mozilla Security Blog") 报道，谷歌发现 CNNIC 颁发了多个针对谷歌域名的伪造 CA 假证书。这个名为 MCS 集团的中级证书颁发机构发行了多个谷歌域名的假证书，而 MCS 集团的中级证书则来自中国的 [CNNIC](https://www.williamlong.info/archives/2219.html "CNNIC 遭网友质疑")。

该证书冒充成受信任的谷歌的域名，被用于部署到网络防火墙中，用于劫持所有处于该防火墙后的HTTPS网络通信，而绕过浏览器警告。

谷歌联系了 CNNIC，CNNIC 在 3 月 22 日回应称，CNNIC 向 MCS 发行了一个无约束的中级证书，MCS 本应该只向它拥有的域名发行证书，但 MCS 将其安装在一个防火墙设备上充当中间人代理，伪装成目标域名，用于执行加密连接拦截(SSL MITM)。企业如出于法律或安全理由需要监控员工的加密连接，必须限制在企业内网中，然而防火墙设备却在用户访问外部服务时发行了不受其控制的域名的证书，这种做法严重违反了证书信任系统的规则。尽管这种解释看起来符合事实，然而，CNNIC 还是签发了不适合 MCS 持有的证书。<!--more-->

![CNNIC](/uploads/2015/06/CNNIC.jpg)

CNNIC 作为根 CA 被几乎所有操作系统和浏览器信任，谷歌已经将这些情况通知了所有的主流浏览器，谷歌所有版本的 Chrome 浏览器（包括 Windows、OS X、Linux 版）、Firefox 浏览器都会拦截这些证书，Firefox 从 37 版开始引入 OneCRL 机制，建立证书黑名单，拦截被滥用及不安全的证书。

这件事情再次显示，互联网证书颁发机制公开透明的必要性。

谷歌英文博客原文：[Maintaining digital certificate security](https://security.googleblog.com/2015/03/maintaining-digital-certificate-security.html "Google Online Security Blog")

Mozilla 英文博客原文：[Revoking Trust in one CNNIC Intermediate Certificate](https://blog.mozilla.org/security/2015/03/23/revoking-trust-in-one-cnnic-intermediate-certificate/ "Mozilla Security Blog")

后续：

MCS [回应称](http://www.mcsholding.com/MCSResponse.aspx)，该证书用于测试环境，并且是人为操作错误引起的。

CNNIC [回应称](http://www.cnnic.net.cn/gywm/xwzx/xwzxtzgg/201503/t20150325_52018.htm)，1、CNNIC 未发布用于中间人攻击的证书。2、CNNIC 服务器证书业务合作方 MCS 公司确认其不当签发的测试证书仅用于其实验室内部测试。3、CNNIC 已于 3 月 22 日撤销对 MCS 公司的业务授权。

{% note info %}
中国互联网络信息中心（China Internet Network Information Center，缩写为 CNNIC），是经中华人民共和国国务院主管部门批准，于 1997 年 6 月 3 日成立的互联网管理和服务机构。中国互联网络信息中心成立伊始，由中国科学院主管；2014 年末，改由中央网络安全和信息化领导小组办公室、国家互联网信息办公室主管。
{% endnote %}
