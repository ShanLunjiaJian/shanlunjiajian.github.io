---
layout: post
title: Powerful Number学习笔记
subtitle: 求积性函数前缀和的奇妙方法
tags: 数学 数论
---

本文参考[zzq神犇的blog](https://www.cnblogs.com/zzqsblog/p/9904271.html)。

要求数论函数的前缀和，大家都会杜教筛。

Powerful Number跟杜教筛是类似的。杜教筛构造$$f\ast g=h$$，其中$$g,h$$可以快速求前缀和；而Powerful Number构造$$f=g\ast h$$，其中$$g$$可以快速求前缀和，而$$h$$只在Powerful Number处有值。

首先我们来看一道例题。

有一个积性函数$$f$$满足$$f(1)=1$$且$$f(p^k)=p$$，要求$$f$$的前缀和。

我们考虑质数处的点值，发现有一个函数$$g(n)=n$$跟$$f$$在质数处完全一样，同时这个$$g$$还是个(完全)积性函数。

然后我们构造函数$$h$$使得$$h\ast g=f$$，然后考察$$f(p)=h(p)g(1)+h(1)g(p)$$。

发现$$g(p)=p, g(1)=1, h(1)=1$$，那么必然有$$h(p)=0$$。

同时，狄利克雷卷积的逆运算对积性函数也有封闭性，所以$$h$$必然是积性函数。那么对于所有质因子分解形式中，具有次数为$$1$$的质因子的数$$x$$，全都有$$h(x)=0$$。

所以我们只要求出$$h$$不为$$0$$的所有点值，就已经求出$$h$$了。我们定义Powerful Number为每个质因子次数都$$\geq 2$$的数，也就是使$$h$$不为$$0$$的数。容易发现这样的数一定可以表示成$$a^2b^3$$，因为$$2x+3y(x,y\geq 0)$$可以表示出任何$$1$$以外的正整数。那么我们就可以计算$$n$$以内Powerful Number的数量了 : $$\int_{1}^{\sqrt{n}}\sqrt[3]{\frac{n}{x^2}}\,dx=O(\sqrt{n})$$。

然后考虑

$$
\begin{aligned}
\sum_{i=1}^{n}f(i)&=\sum_{i=1}^{n}\sum_{jk=i}g(j)h(k)\\
&=\sum_{jk\leq n}g(j)h(k)\\
&=\sum_{k=1}^{n}h(k)\sum_{j=1}^{\lfloor n/k\rfloor}g(j)
\end{aligned}
$$

，所以我们枚举Powerful Number，然后求一次$$g$$的前缀和即可。

具体怎么计算$$h$$，这个还真有些难度......考虑只要求出$$h(p^k)$$，根据积性就可以求出$$h$$，所以可以这么搞 : 

$$
\begin{aligned}
f(p^k)&=\sum_{d\vert p^k}h(d)g(\frac{p^k}{d})\\
&=\sum_{i=0}^{k}h(p^i)g(p^{k-i})\\
&=h(p^k)+\sum_{i=0}^{k-1}h(p^i)g(p^{k-i})\\
h(p^k)&=f(p^k)-\sum_{i=0}^{k-1}h(p^i)g(p^{k-i})
\end{aligned}
$$

然后有用的质数有$$O(\frac{\sqrt{n}}{\log n})$$个，每个质数的有用的次数都不超过$$\log n$$，总复杂度$$O(\sqrt{n})$$。

具体怎么枚举Powerful Number，可以直接爆搜质因子。

精细实现的话复杂度$$O(\sqrt{n})$$，胡乱实现比如使用hash table或者std::map什么的会多大常数或者多$$\log$$。

-----

[LOJ#6053. 简单的函数](https://loj.ac/p/6053)

考虑$$f(p)=\begin{cases}p+1,&p=2\\p-1,&\text{otherwise.}\end{cases}$$。

那么我们取$$g=\varphi$$。求$$g$$的前缀和可以使用杜教筛。复杂度$$O(n^{\frac{2}{3}})$$。

-----

不知道哪里来的题，题意 : 求积性函数$$f(1)=1, f(p^k)=2^k$$的前缀和。

发现$$f(p)=2$$，于是需要找一个$$g$$，使得$$g(1)=1, g(p)=2$$。

发现除数函数$$d$$具有这样的性质，并且易于求前缀和，所以我们取$$g=d$$。复杂度$$O(\sqrt{n})$$。

-----

又是不知道哪里来的题，题意 : 给定一个$$e$$，求积性函数$$f(1)=1, f(p^k)=p^e$$的前缀和。

发现$$f(p)=p^e$$，取$$g=\mathrm{id}_e$$，$$g$$的前缀和可以插出来。复杂度$$O(k^2+k\sqrt{n})$$。

-----

[洛谷P5325 【模板】Min_25筛](https://www.luogu.com.cn/problem/P5325)

Min_25筛板子题怎么能用Min_25筛做!

$$f(p)=p(p-1)$$，考虑构造$$g(n)=n\varphi(n)$$，这个东西可以杜教筛出来，复杂度$$O(n^{\frac{2}{3}})$$。

-----

总而言之，使用Powerful Number切题的主要问题是找到函数$$g$$，找到它之后就一切都简单了。

在$$f(p)$$中看到$$p^k$$就想到$$\mathrm{id}_k$$，看到$$p-1$$就想到$$\varphi$$，看到$$2$$就想到$$d$$，这大概是几个常见套路。