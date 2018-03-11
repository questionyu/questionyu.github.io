---
title: OpenGL 开发环境的配置 Win/Mac
date: 2017-03-10 22:50:58
categories:
  - Tips
tags:
  - OpenGL
  -
---

最近3D图形程序设计的课需要用 C 写一些 OpenGL 代码，Windows 下的开发环境配置起来还稍稍有些麻烦，写个文章记录一下步骤。

## Windows

准备工作：{% exturl "点击这里下载 glut 压缩包" http://chortle.ccsu.edu/Bloodshed/glutming.zip "" %}，解压出来待用。

{% centerquote %}
**这里请注意，不同 Windows 版本配置略有差别，请选择你的系统对应的方法。**
{% endcenterquote %}
<!--more-->

### Win7

首先去 {% exturl "下载 Dev-C++" http://prdownloads.sourceforge.net/dev-cpp/devcpp-4.9.9.2_setup.exe "SourceForge.net" %}，确保你可以用它正常编译一个 C 语言程序出来。
假设你的Dev-C++安装在了 ``C:\Dev-Cpp``，那么：

* 从解压文件夹 ``GLUTMingw32\include\GL`` 中复制 ``glut.h`` 到 ``C:\Dev-Cpp\include\GL`` 中
* 从解压文件夹 ``GLUTMingw32\lib`` 中复制 ``libglut32.a`` 到 ``C:\Dev-Cpp\lib`` 中，如果提示已经存在文件，请选择 **替换**
* 从解压文件夹 ``GLUTMingw32`` 中复制 ``glut32.dll`` 到 ``C:\Windows\SysWOW64`` 中（32 位系统则是复制到 ``C:\Windows\System32``）

最后，打开 Dev-C++，新建一个项目/工程 (Project)，类型选择“空工程”，语言类型选择为 C，名称随意，之后下一步，保存到电脑上。
之后，新建一个源文件 (Source File)，询问是否添加到当前的项目中，点击是，然后在这里写 OpenGL 的代码，写好之后选择保存，注意以 ``.c`` 结尾。
**接下来是关键**，菜单栏，“项目/项目属性”，在打开的窗口中切换到“参数 (Parameters)”选项卡，在最右边的框“连接 (Linker)”下方有个大按钮“加入库或对象 (Add Library or Object)”，点击，转到 ``C:\Dev-Cpp\lib``，**必须依次** 添加三个文件：``libopengl32.a`` ``libglu32.a`` ``libglut32.a``，确定保存，然后编译运行就可以看到 OpenGL 的图形了。

### Win8/8.1

至于 Win8 嘛……我还没有测试过，你可以自己决定试试 Win7 的方法，反正 Win10 的方法是通用的，Win7 的不行了再参考 Win10 的方法~

### Win10/Win 通用

现在同学都普遍在用 Win10，而在 Win10 下 Dev-C++ 内置的编译器在编译 OpenGL 的时候又有兼容性问题，这就很气了，需要单独安装另外一个编译器：MinGW (Minimalist GNU for Windows)，就是 GNU 在 Windows 平台上的版本啦~
先去 {% exturl "这里下载 MinGW Installer" https://sourceforge.net/projects/mingw/files/latest/download?source=files "SourceForge.net" %}，双击打开安装，一路下一步，保持默认安装目录不要动。然后你将会看到一个列表页面，按照图中所选，点击方框，选择"Mark for install"打上勾：
![Mark](/uploads/2017/03/mingw-install.png)
之后左上角菜单 Installation - Apply Changes 开始在线安装，等待完成就可以关闭了。

* 从解压文件夹 ``GLUTMingw32\include\GL`` 中复制 ``glut.h`` 到 ``C:\MinGW\include\GL`` 中
* 从解压文件夹 ``GLUTMingw32\lib`` 中复制 ``libglut32.a`` 到 ``C:\MinGW\lib`` 中，如果提示已经存在文件，请选择 **替换**
* 从解压文件夹 ``GLUTMingw32`` 中复制 ``glut32.dll`` 到 ``C:\Windows\SysWOW64`` 中（32位系统则是复制到 ``C:\Windows\System32``）

接下来是 {% exturl "下载安装 Dev-C++" https://sourceforge.net/projects/orwelldevcpp/files/Setup%20Releases/Dev-Cpp%205.11%20TDM-GCC%204.9.2%20Setup.exe/download "SourceForge.net" %}，安装完成后添加这个编译器：
![AddCompiler](/uploads/2017/03/devc1.png)
工具 - 编译选项，在弹出来的窗口中选择 **正中间的加号**，然后定位目录到 ``C:\MinGW``，点击确定返回。

在 Dev-C++ 中，新建一个项目/工程 (Project)，类型选择“空工程”，语言类型选择为 C，名称随意，之后下一步，保存到电脑上。
之后，新建一个源文件 (Source File)，询问是否添加到当前的项目中，点击是，然后在这里写 OpenGL 的代码，写好之后选择保存，注意以 ``.c`` 结尾。
**接下来是关键**，菜单栏，“项目/项目属性”，在打开的窗口中切换到“参数 (Parameters)”选项卡，在最右边的框“连接 (Linker)”下方有个大按钮“加入库或对象 (Add Library or Object)”，点击，转到 ``C:\MinGW\lib``，**必须依次** 添加三个文件：``libopengl32.a`` ``libglu32.a`` ``libglut32.a``，确定保存，然后编译运行就可以看到 OpenGL 的图形了。
![Link](/uploads/2017/03/devc2.png)
![Example](/uploads/2017/03/OpenGL.png)

## Mac

Mac 环境下的开发环境的配置极其简单。

在 App Store 里搜索安装 Xcode。（就是下载的时间会长点，Xcode 约有 4.55G 大）

新建工程，只需要注意头文件的配置就好，和 Windows 的 ``#include <GL/glut.h>`` 不同，换成 ``#include <GLUT/glut.h>`` 就可以了。

其他的就是写代码，写完后直接 ``Command+R`` 就可以了。

就是这么简单，简单的令人发指......

PS: 如果出现了警告 Deprecated 的问题，可以忽略；如果无法编译通过，在新建项目的时候设置一下项目的 OS X Deployment Target 为 10.8 就可以解决问题。

{% blockquote CCSU https://chortle.ccsu.edu/bloodshed/howtogl.html "How to Install Dev-C++ and GLUT" %}
本文参考 Central Connecticut State University 的文章
{% endblockquote %}
