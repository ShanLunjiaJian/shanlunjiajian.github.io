---
layout: post
title: oi题选做
subtitle: 麻麻麻
tags: 题选做
---

## Polish OI

poi大概是，有三轮，r1五题，r2 r3都是有D0 D1 D2，D0一题，D1 D2两题。

从2001~2002开始做。可能以后会做前面的。

### 2001~2002

R1

A. Superskoczek

我们尝试让马分别往上走一步，往下走一步，往左走一步，往右走一步。注意到必然存在一种方案使得马的坐标绝对值保持在$$101$$以内。搜即可。

std非常复杂。

考虑我们刚才做了naipc 2019/xix open cup gp of America K. Knight of the Tarot Cards，看起来它是这个的弱化版。

考虑先给每个向量$$\mathrm{v}=(x,y)$$找到$$-\mathrm{v}$$，做法是我们寻找四个平行于坐标轴方向的向量$$\mathrm{a}=(a,0),\mathrm{b}=(-b,0),\mathrm{c}=(0,c),\mathrm{d}=(0,-d)$$，不妨设$$x,y>0$$，那么有$$(-x,-y)=(bd-1)(x,y)+dx(-b,0)+by(0,-d)$$。为了找到这样的四个向量，在每个象限选一个向量，然后相邻两个exgcd一下消去一维即可。显然如果有一个象限没有向量则不可能覆盖整个平面。

**结论** 现在我们断言，如果向量集合中每个向量都有加法逆，那么它的效果等价于某两个向量，其中一个平行于$$x$$轴。显然有一个向量的时候它是正确的，现在考虑它是$$(a,0),(b,c)$$，我们加入一个$$(d,e)$$会发生什么。设新的东西等价于$$(a^\prime,0),(b^\prime,c^\prime)$$，设$$g=\gcd(c,e)$$，且$$cx+ey=g$$，则我们断言$$a^\prime=\gcd(a,\frac{eb-cd}{g}),b^\prime=xb+yd,c^\prime=g$$，也就是横轴上用三者拼出最小的位移，而纵轴上用$$(b,c),(d,e)$$拼出最小的非零位移(而不管横轴发生了什么)。

**证明** 考虑它是用$$(a,0),(b,c),(d,e)$$拼出来的，所以我们只需要证明它还能拼出$$(a,0),(b,c),(d,e)$$。显然可以拼出$$(a,0)$$。

考虑$$(b,c)$$，$$(d,e)$$是同理的。我们知道$$b^\prime=xb+yd,c^\prime=g,cx+ey=g$$，那么直接拼可以知道$$\frac{c}{g}(xb+yd,g)+y(\frac{eb-cd}{g},0)=(b,c)$$。但是这是怎么想到的呢?

B. Komiwojażer Bajtazar

模拟。

C. Wyspa

转一圈双指针即可。

D. Zamek

直接dp。

E. Koleje

noip2012 借教室。noip出poi原题/jy

线段树模拟一下。

-----

R2

D0

A. Izolator

这是一个匹配问题。考虑每个数可能贡献正的它，负的它或者不贡献，不贡献显然没劲，然后我们希望让最大的若干个数贡献正的，最小的贡献负的，所以构造一下发现可以最大的$$\lfloor\frac{n}{2}\rfloor$$个数贡献正的，最小的$$\lfloor\frac{n}{2}\rfloor$$个数贡献负的。

D1

A. Działka

模板 最大子矩形。

B. Wyliczanka

excrt。

D2

A. Kurort narciarski

还是直接dp。

B. Protokoły

不是很能看懂题意。不过肯定可以直接dp吧。

-----

R3

D0

A. Minusy

这个问题好像很经典，似乎在arc出现过。对于每一段连续的加号，我们在两边放一对括号。arc搬poi/jy

D1

A. Narciarze

好像，直接就是最大流?

B. Waga

背包。

D2

A. Liczby B-gładkie



B. Nawiasy



C. Szyfr


