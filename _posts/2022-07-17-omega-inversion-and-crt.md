---
layout: post
title: 用crt推导单位根反演
subtitle: /fn
tags: 数学
show: true
---

问题是我们有一个gf $$F$$，要计算$$[z^0]F\bmod{z^n-1}$$。计算$$[z^k]$$的话可以先平移。

考虑分解$$z^n-1$$为$$\prod\limits_i(z-\omega_n^i)$$，然后crt合并。我们知道$$F\bmod{(z-a)}=F(a)$$，所以就要代入各单位根求值，然后crt的结论是答案是它们的线性组合。

为了crt，我们需要构造一个 插值基函数，设$$\displaystyle f_i^\prime(z)=\prod_{j\neq i}(z-\omega_n^j)$$，那么就有$$\displaystyle [z^0]F\bmod{z^n-1}=\sum_{i=0}^{n-1}F(\omega_n^i)[z^0]\frac{f_i^\prime(z)}{f^\prime_i(\omega_n^i)}$$。

可以注意到$$\displaystyle [z^0]\frac{f_i^\prime(z)}{f^\prime_i(\omega_n^i)}=\frac{f_i^\prime(0)}{f^\prime_i(\omega_n^i)}$$，展开之后我们可以上下同除一个$$\omega_n^i$$，然后改为枚举$$j-i$$这样的，此时它就和$$i$$无关了，也就是说我们证明了所有系数是相等的。

根据crt我们知道这些系数和$$F$$也是无关的，只和$$n$$有关，所以取$$F=1$$可以知道这些系数的和必须是$$n$$，而既然它们是相等的，其中每个都必须是$$\frac{1}{n}$$。

算系数这里我们尝试了很久直接算，好像可以直接考虑把$$\omega_n$$看成一个变量$$x$$，它就是一个什么牛逼多项式来证明，但是我不是mo爷，不管了。