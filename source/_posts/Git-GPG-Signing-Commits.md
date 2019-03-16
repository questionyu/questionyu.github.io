---
title: 使用 GPG 签名你的 Commits
date: 2019-03-15 16:37:08
categories:
  - Tips
tags:
  - Github
  - GPG
---

{% note info %}
本文最后更新于 2019年3月15日 可能会因为没有更新而失效。如已失效或需要修正，请留言！
{% endnote %}

## 准备工作

首先要安装好 GPG 工具。
``` bash
$ brew install gnupg gnupg2 pinentry-mac
```

配置使用环境。
``` bash
$ test -r ~/.bash_profile && echo 'export GPG_TTY=$(tty)' >> ~/.bash_profile
$ echo 'export GPG_TTY=$(tty)' >> ~/.profile

$ echo "pinentry-program /usr/local/bin/pinentry-mac" >> ~/.gnupg/gpg-agent.conf

$ killall gpg-agent
```

## 检查现有的 GPG 秘钥
``` bash
$ gpg --list-secret-keys --keyid-format LONG
```
如果没有返回值，则说明此电脑上没有配置 GPG 秘钥。
如果有，则可以跳过生成 GPG 秘钥的步骤。<!--more-->

## 生成一个新的 GPG 秘钥

``` bash
$ gpg --full-generate-key
```
第一步，选择加密类型，可以直接回车选择默认的 `RSA and RSA`。
第二步，输入秘钥的强度，推荐输入 `4096`。
第三步，选择秘钥的过期时间，嫌麻烦的同学可以直接回车选择默认的永不过期。
第四步，确认一下以上信息有没有错。
第五步，输入你的名字。
第六步，输入你的邮箱，注意此邮箱需要是你的 Github 账号中添加过的邮箱。
第七步，设置此秘钥的密码，使用此秘钥需要用这个密码来解密。
之后稍等片刻，GPG 秘钥即生成完毕。

## 使用 GPG 秘钥

在终端中使用 `gpg --list-secret-keys --keyid-format LONG` 命令查看当前秘钥的信息。
``` bash
$ gpg --list-secret-keys --keyid-format LONG
/Users/hubot/.gnupg/secring.gpg
  ------------------------------------
sec   4096R/3AA5C34371567BD2 2016-03-10 [expires: 2017-03-10]
uid                          Hubot 
ssb   4096R/42B317FD4BA89E7A 2016-03-10
```
在这里 `3AA5C34371567BD2` 就是秘钥的 **ID**。

使用以下命令来获得 GPG 秘钥的公钥，注意 `<ID>` 需要替换为自己秘钥的 ID。
``` bash
$ gpg --armor --export <ID>
```
复制以上公钥，去往 Github 账户设置页面即可添加 GPG 秘钥。

接着使用以下命令配置 git 以使用 GPG 秘钥。
``` bash
$ git config --global user.signingkey <ID>
$ git config --global commit.gpgsign true
$ git config --global gpg.program gpg
```

带有 GPG 验证的 commit 只是多了 `-S` 参数。
``` bash
$ git commit -S -m "your commit message"
```

## 验证

在提交改动之后，可以使用以下命令来检验以下是否成功使用 GPG 秘钥来签名 commit。
``` bash
$ git log --show-signature -1
```

若带有下面的提示，则说明成功。
``` bash
gpg: Good signature from "Your Name <your@email.com>"
```

![](/uploads/2019/03/屏幕快照 2019-03-16 04.30.09.png)
