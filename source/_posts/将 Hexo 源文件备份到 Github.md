---
title: 将 Hexo 源文件备份到 Github
date: 2016-11-17 13:18:29
categories:
  - Tips
tags:
  - Hexo
  - Github
  - 备份
---

## 首次备份
在 Hexo 根目录下，初始化 git 仓库
```bash
git init
```
创建并切换到分支 "hexo"
```bash
git checkout -b hexo
```
添加 README.md 文件，可忽略
```bash
git add README.md
```
添加文件列表
```bash
git add -A
```
添加提交说明
```bash
git commit -m "First commit"
```
设置远程仓库映射
```bash
git remote add origin git@github.com:real-neo/real-neo.github.io.git
```
提交
```bash
git push -u origin hexo
```

## 之后备份
```bash
git add -A
git commit -m "Update message"
git push origin hexo # 或 git push
```
