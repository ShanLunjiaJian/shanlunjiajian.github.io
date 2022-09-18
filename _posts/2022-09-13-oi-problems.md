---
layout: post
title: oi题选做
subtitle: 麻麻麻
tags: 题选做
---

## Polish OI

poi大概是，有三轮，r1五题，r2 r3都是有D0 D1 D2，D0一题，D1 D2两题。

### VIII(2000~2001)

R1

A. Liczby antypierwsze

tooooooooooooooo classic。

B. Mapa gęstości

前缀和。

C. Przedziały

模拟。

D. Gra w zielone

幸运的，这个题在谷上有。

请注意是在环上的部分要走过一个绿点，而不是整个/jy

发现如果一个A的点的后继有让A赢的，它就也是赢的，否则它是输的。如果一个B的点后继全是让A赢的，那么它也是赢的，否则它是输的。但是只知道这些不管用，我们可以让所有点都赢，也可以让所有点都不赢。

考虑如果不在环上的绿点也算数的话，那么我们只要一开始让所有绿点赢，然后按上面递推就好了。注意到如果从一个绿点出发必然可以到达自己，那么它必然是赢的，否则这个绿点是无用的。发现我们从有用的绿点出发递推就可以得到正确答案，所以问题是求出哪些绿点是有用的。

做法是，我们先把所有绿点置为有用的，然后有用的绿点必然是赢的，递推出哪些点是赢的，如果一个有用的绿点其实是输的，那么就把它置为无用的。于是每轮减少至少一个绿点，复杂度$$O(cm)$$。

为了证明这个奇怪东西的正确性，考虑最后每个输的点显然真的不能赢，而每个赢的点确实可以走到一个环上，而由于是从一些绿点开始递推，环上确实必然有一个绿点。

R2

D0

Gorszy Goldbach

找到一些大素数快速减少数的大小。打表即可。

D1

Spokojna komisja

2-sat。

Wyspa

没太看懂题意。应该模拟就行了吧/oh

D2

Mrówki i biedronka

没太看懂题意。应该模拟就行了吧/oh

Podróż

题意不是很懂，看起来是什么大力建图dij?

R3

D0

Wędrowni treserzy pcheł

判定基环树森林同构，考虑基环树，每个子树树hash之后相当于判定两个序列是否循环同构，跑个最小表示然后hash即可。

D1

Porównywanie naszyjników

考虑那个简单的最小表示都需要啥。发现我们需要求lcp，然后需要保证可能作为最小表示开头的位置数量很少。注意到一个循环节只有第一次循环和最后一次循环中的位置可能成为最小表示的开头，所以后者已经结束了，而前者，考虑对于循环节分别为$$a,b$$的两段，

Zwiedzanie miasta

D2

Bank

Kopalnia złota

Łańcuch


### IX(2001~2002)

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

这个看起来不是最小路径覆盖啊，也不是最小割。但是上下界最小流就好了!

B. Waga

背包。

D2

A. Liczby B-gładkie

数论题/jy

min_25/洲阁筛的第二部分。

B. Nawiasy

直接dp。

C. Szyfr

模板 knapsack。折半。
