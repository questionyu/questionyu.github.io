---
title: 去除 Next 主题图片的灰色边框
date: 2019-03-06 22:52:49
categories:
  - Tips
tags:
  - Next
---

{% note info %}
本文最后更新于 2019年3月6日 可能会因为没有更新而失效。如已失效或需要修正，请留言！
{% endnote %}

最近发了篇文章，带了些截图，发现对于 macOS 处理过的截图，Next 主题在图片周围加一圈灰色边框并不美观。
![](/uploads/2019/03/屏幕快照 2019-03-06 22.50.30.png)

于是便想办法去掉它。<!--more-->打开浏览器检查图片样式，发现图片周围加了一圈一个像素宽度的灰色边框。
![](/uploads/2019/03/屏幕快照 2019-03-06 23.03.19.png)

打开 Hexo 博客目录，直接搜索整个目录，果然在 `themes/next/source/css/_common/components/post/post-expand.styl` 这个文件里找到了配置。

只需将以下代码
```css
img {
  box-sizing: border-box;
  margin: 0 auto 25px;
  padding: 3px;
  border: 1px solid $gray-lighter;
}
```
改为
```css
img {
  box-sizing: border-box;
  margin: 0 auto 25px;
  padding: 3px;
  border: none;
}
```
即可去除边框。

去除边框之后的效果，看起来舒服多了。
![](/uploads/2019/03/屏幕快照 2019-03-06 22.51.55.png)

最后记得一点，一定要先执行 `hexo clean` 再部署，否则样式表文件并不会更新导致修改不生效。
