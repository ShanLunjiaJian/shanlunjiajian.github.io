---
layout: post
title: oi题选做
subtitle: 麻麻麻
tags: 题选做
---

## Polish OI

poi大概是，有三轮，r1五题，r2 r3都是有D0 D1 D2，D0一题，D1 D2两题。

#### VIII(2000~2001)

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

考虑那个简单的最小表示都需要啥。发现我们需要求lcp，然后需要保证可能作为最小表示开头的位置数量很少。注意到一段只有第一次循环和最后一次循环中的位置可能成为最小表示的开头，所以后者已经结束了，而前者，考虑倍增hash，结束了。

Zwiedzanie miasta

智障了。随便跑一个欧拉回路，然后找到前缀和最小的点，从它出发就得到一个全正的。和raney引理有点像。

D2

Bank

如果只有一种货币，注意到每个人都不会让你的资金量变小，所以我们会每次选择加最少初始资金就能选的。

但是现在有四种货币，感觉上贪心好像真的可以得到一个极优解，我们只需要先让第一种最小，如果有很多个可以选的，让第二种最小，这样的。

Kopalnia złota

枚举一个横坐标，线段树维护纵坐标，那么一个点在一个横坐标区间贡献一个纵坐标区间。

Łańcuch

直接dp。考虑我们首先要让$$n-1$$是1，剩下的都是0，所以设$$dp(i)$$表示变成$$i$$是1前面都是0的步数，为了这么做发现我们只有送一个1上去才能把最低的1拿掉，所以看起来策略就是每次把当前末尾极长我们想要的段(一些0之后一个1)往上扩展一个1，然后把下面那个1扔了，直到够到$$n$$这样的。

#### IX(2001~2002)

R1

Superskoczek

我们尝试让马分别往上走一步，往下走一步，往左走一步，往右走一步。注意到必然存在一种方案使得马的坐标绝对值保持在$$101$$以内。搜即可。

或者使用格的线性基，称为hermite标准化的算法。std做法本质就是这个。

Komiwojażer Bajtazar

模拟。

Wyspa

转一圈双指针即可。

Zamek

直接dp。

Koleje

noip2012 借教室。noip出poi原题/jy

线段树模拟一下。

-----

R2

D0

Izolator

这是一个匹配问题。考虑每个数可能贡献正的它，负的它或者不贡献，不贡献显然没劲，然后我们希望让最大的若干个数贡献正的，最小的贡献负的，所以构造一下发现可以最大的$$\lfloor\frac{n}{2}\rfloor$$个数贡献正的，最小的$$\lfloor\frac{n}{2}\rfloor$$个数贡献负的。

D1

Działka

模板 最大子矩形。

Wyliczanka

excrt。

D2

Kurort narciarski

还是直接dp。

Protokoły

不是很能看懂题意。不过肯定可以直接dp吧。

-----

R3

D0

Minusy

这个问题好像很经典，似乎在arc出现过。对于每一段连续的加号，我们在两边放一对括号。arc搬poi/jy

D1

Narciarze

这个看起来不是最小路径覆盖啊，也不是最小割。但是上下界最小流就好了!

Waga

背包。

D2

Liczby B-gładkie

数论题/jy

min_25/洲阁筛的第二部分。

Nawiasy

直接dp。

Szyfr

模板 knapsack。折半。

#### X(2002~2003)

R1

Ciągi bez zająknięć

考虑有没有一个$$\log$$个的构造。发现可以把原序列复制一份，在中间加入一个没有出现过的字符。

交一发wa了。考虑有没有一个$$O(1)$$的构造。发现两个字母肯定不行，但是搜一搜或者手动构造，发现三个字母可以构造出$$n=8$$，一个做法是$$abcbabca$$。结论是thue-morse序列的差分是square free的。

或者可以大力随。注意到长度超过某个足够大的$$k$$的square几乎不可能出现，而它们有$$n^2$$个，那么取$$k=120$$看起来足够，如果往后加入一个字符后，出现了长度$$\leq k$$的square，则删掉它。我们只需要维护$$k$$个前缀和即可。为了证明这个东西的复杂度，请见 https://www.sciencedirect.com/science/article/pii/S0304397515006489。

为了写checker，看起来需要使用lyndon array那一套。

Liczby Przesmyków

数位dp。

Czekolada

也就是如果选一个x的时候，前面有$$k$$个y被选了，那么它带一个$$k+1$$的系数。dp即可。

Przemytnicy

dij。

Płytki drukowane

大力dp，直接存两端的状态。

R2

D0

Mastermind II

模拟。

D1

Autostrady

2-sat。hnoi搬poi/jy

Trójmian

读错了三遍题。

弱于 zjoi2017 多项式。

D2

Kafelki

根据周期引理，如果$$k+l-\gcd(k,l)\leq n$$，那么$$\gcd(k,l)$$也是周期，并且显然不需要存在比它更小的周期，所以答案是$$\gcd(k,l)$$。如果$$k+l-\gcd(k,l)>n$$，那么$$\max(k,l)>\frac{n}{2}$$，不妨设$$k>l$$，那么我们知道如果没有$$k$$，$$l$$导致了$$l$$个等价类，而$$k$$的作用是合并了其中$$n-k$$对，所以答案是$$l-(n-k)$$。

Połączenia

考虑k短路说了啥，我们跑一个floyd，从每个点出发建最短路树，然后真的跑k短路。这里我们可以$$O(nk)$$跑一次，方法是不合并堆而直接爆力向上找。

R3

D0

Gra w dzielniki

如果这个数是一个素数，那么我们就需要遍历所有的素数。所以按任意顺序问所有的素数，问中了就除一下再问剩下的就好了。

D1

Skarb

主要问题是两个人能不能相遇。我们分别找到环，进入环之前模拟一下，进入环之后只需要算个$$\gcd$$。

Sumy



D2

Kryształ



Małpki



Tasowanie

