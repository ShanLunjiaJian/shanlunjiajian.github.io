---
layout: post
title: 生活在还原卡上
subtitle: /kk
tags: 杂项
---

虽然是竞赛机房，机子还是每天remake C盘。于是我们需要想个办法让所有东西开箱即用。

-----

qq

这个不行。

-----

浏览器

洋葱本身是完全portable的。但是也不能全用洋葱，看了一圈在k-meleon，pale moon和icecat中选择了firefox。

为了让firefox portable，使用 firefox.exe -profile yourdir 即可。

-----

git

之前只会用github desktop，但是它没有一个官方的portable方式。于是我们换一个。

看起来git本身是portable的。直接使用git-gui。

如果出现中文乱码，执行 git config --global gui.encoding utf-8。如果不想让它提示你要不要压缩，执行git config --global gui.gcwarning false。

-----

梯子

刚才说有洋葱，洋葱以socks监听127.0.0.1:9150，我们搞一个privoxy，然后这么写

```
listen-address 127.0.0.1:7890

forward-socks4 / 127.0.0.1:9150 .
forward-socks4a / 127.0.0.1:9150 .
forward-socks5 / 127.0.0.1:9150 .
forward-socks5t / 127.0.0.1:9150 .

```

7890是因为习惯于clash，并且我这边8118有东西在用，虽然不知道是什么。

-----

编辑器

sublime text本身portable，vscode有官方portable版。

-----

编译器

本机放了一个g++12，但是平时基本是vscode remote-ssh到学校服务器上写。

