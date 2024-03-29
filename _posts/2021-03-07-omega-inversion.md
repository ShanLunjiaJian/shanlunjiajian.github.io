---
layout: post
title: 单位根反演学习笔记
subtitle: 好家伙
tags: 数学 archived
---

我们要求一个gf $$F(z)$$的所有$$k,2k,3k,...$$次项系数之和，它就是$$[z^0](F(z)\bmod{(z^k-1)})$$这样的。对这个东西我们看起来完全没办法，考虑把$$z^k-1$$分解成$$\displaystyle\prod_i (z-\omega_k^i)$$这样的，然后我们知道膜$$z-a$$就是求$$F(a)$$。最后crt合并即可。

搞一搞可以得到这么一个简单的式子 : 

$$
[d\vert i]=\frac{1}{d}\sum_{j=0}^{d-1}\omega_{d}^{ij}
$$

可以直接证明它。考虑后面那个$$\sum$$里面是个等比数列。这里出现的讨论，就是等比数列求和公式的那个讨论。

-----

如果是在膜意义下求某个式子，一般情况下单位根是存在的。具体地，膜$$p$$意义下，$$n$$次单位根$$\omega_n$$存在，当且仅当$$n\vert p-1$$，此时$$\omega_n=g^{\frac{p-1}{n}}$$，其中$$g$$是$$p$$的一个原根。如果单位根不存在，可以考虑扩域。

单位根存在的时候是不是可以出成bluestein啊（

-----

[LOJ#6485. LJJ 学二项式定理](https://loj.ac/p/6485)

直接硬推!

$$
\begin{aligned}
&\sum_{t=0}^3a_t\sum_{i=0}^n[i\bmod{4}=t]\binom{n}{i}s^i\\
=&\sum_{t=0}^3a_t\sum_{i=0}^n[4\vert i-t]\binom{n}{i}s^i\\
=&\sum_{t=0}^3a_t\sum_{i=0}^n\sum_{j=0}^3\omega_4^{(i-t)j}\binom{n}{i}s^i\\
=&\sum_{t=0}^3a_t\sum_{j=0}^3\omega_4^{-tj}\sum_{i=0}^n\binom{n}{i}s^i\omega_4^{ij}\\
=&\sum_{t=0}^3a_t\sum_{j=0}^3\omega_4^{-tj}(s\omega_4^j+1)^n\\
\end{aligned}
$$

单次复杂度$$O(\log n)$$。

-----

[UOJ#450. 【集训队作业2018】复读机](https://uoj.ac/problem/450)

看到$$d=2$$和$$d=3$$时复杂度好像不同，我们知道大概要对$$d$$进行分类。这里主要推一下$$d=3$$的，$$1,2$$的情况要更简单。

考虑生成函数。因为是序列，我们使用EGF。

考虑一个复读机 : 

$$
\hat{F}=\sum_{i=0}^{n}[d\vert i]\frac{z^i}{i!}
$$

单位根反演一下，

$$
\begin{aligned}
\hat{F}&=\sum_{i=0}^{n}[d\vert i]\frac{z^i}{i!}\\
&=\sum_{i=0}^{n}(\frac{1}{d}\sum_{j=0}^{d-1}\omega_{d}^{ij})\frac{z^i}{i!}\\
&=\frac{1}{d}\sum_{j=0}^{d-1}\sum_{i=0}^n\frac{\omega_{d}^{ij}z^i}{i!}\\
&=\frac{1}{d}\sum_{j=0}^{d-1}e^{\omega_{d}^{j}z}\\
&=\frac{1}{3}(e^{z}+e^{\omega_3z}+e^{\omega_3^2z})
\end{aligned}
$$

答案的生成函数，应该就是每个复读机的生成函数卷起来，这是个幂，所以我们使用多项式定理，然后展开$$\exp$$ : 

$$
\begin{aligned}
Ans&=n![z^n]\hat{F}^k\\
&=n!\frac{1}{3^k}\sum_{a+b+c=k}\binom{k}{a,b,c}[z^n]e^{(a+b\omega_3+c\omega_3^2)z}\\
&=n!\frac{1}{3^k}\sum_{a+b+c=k}\binom{k}{a,b,c}\frac{(a+b\omega_3+c\omega_3^2)^n}{n!}\\
&=\frac{1}{3^k}\sum_{a+b+c=k}\binom{k}{a,b,c}(a+b\omega_3+c\omega_3^2)^n
\end{aligned}
$$

后面的东西可以枚举$$a,b$$做到$$O(k^2\log n)$$，其中那个$$\log n$$是快速幂。

$$d$$更大的情况仍然可以这么推，复杂度是$$O(k^{d-1}\log n)$$。

