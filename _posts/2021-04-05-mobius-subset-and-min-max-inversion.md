---
layout: post
title: 莫比乌斯反演、子集反演以及min-max容斥的瞎扯
subtitle: 绝了
tags: 数论
---

众所周知莫比乌斯反演就是多重集的子集反演，gcd就是min，lcm就是max。说完了。

具体一点?一个数的质因子集合是一个多重集，这个多重集上的子集反演就是莫比乌斯反演，它的系数$$\mu(T)$$定义为每一组相同元素的$$\mu$$值的积，其中每一组元素的$$\mu$$值定义为 : 

如果这一组啥也没有，或者说没有这个质因子，那么贡献$$1$$。

如果这一组有一个，或者说这个质因子次数是$$1$$，那么贡献$$-1$$。

如果超过一个，那么贡献$$0$$。

这就是莫比乌斯函数。

一堆数取$$\gcd$$的时候，相当于把它们每一个质因子上的次数拿出来组成一个可重集，然后求一个$$\min$$再乘起来，这里就可以使用min-max容斥把$$\min$$变成$$\max$$，或者说把$$\gcd$$变成$$\mathrm{lcm}$$。同理可以把$$\mathrm{lcm}$$变成$$\gcd$$，这个常用一些，因为$$\gcd$$性质好的多。

式子大概长这样(空集$$\gcd$$为$$1$$) : 

$$
\mathrm{lcm}(S)=\prod_{T\subseteq S,T\neq\varnothing}gcd(T)^{(-1)^{\vert T\vert+1}}
$$

看到多元$$\mathrm{lcm}$$的时候可以考虑这个式子(或者直接考虑每个质因子的贡献)，毕竟硬拆$$\mathrm{lcm}$$真的不是人类应该承受的折磨。

对于$$\prod$$，莫反有另外一个形式是

$$
g(n)=\prod_{d\vert n}f(d)\Leftrightarrow f(n)=\prod_{d\vert n}g(d)^{\mu(n/d)}
$$

可以使用莫反的基本形式直接证明。

例题 : 

[loj#6102. 「2017 山东二轮集训 Day1」第三题](https://loj.ac/p/6102)

呃非常奇妙。

看到斐波那契，众所周知$$\gcd(f_i,f_j)=f_{\gcd(i,j)}$$，但是对于$$\mathrm{lcm}$$貌似没有这种性质?

考虑怎么把多元的$$\mathrm{lcm}$$变成$$\gcd$$。用上面的式子，可以得到

$$
\begin{aligned}
\mathrm{lcm}(f(S))=&\prod_{T\subseteq S,T\neq\varnothing}\gcd(f(T))^{(-1)^{\vert T\vert+1}}\\
=&\prod_{T\subseteq S,T\neq\varnothing}f(\gcd(T))^{(-1)^{\vert T\vert+1}}
\end{aligned}
$$

用上面的莫反，构造$$g(n)=\prod_{d\vert n}f(d)^{\mu(\frac{n}{d})}$$，干掉这个$$\gcd$$!

$$
\begin{aligned}
&\prod_{T\subseteq S,T\neq\varnothing}f(\gcd(T))^{(-1)^{\vert T\vert+1}}\\
=&\prod_{T\subseteq S,T\neq\varnothing}\prod_{d\vert T}g(d)^{(-1)^{\vert T\vert+1}}\\
=&\prod_{d}g(d)^{\sum_{T\subseteq S,T\neq\varnothing,d\vert T}(-1)^{\vert T\vert+1}}
\end{aligned}
$$

指数上那个东西好像在哪见过。还记得子集反演的经典推论吗?

$$
\sum_{T\subseteq S}(-1)^{\vert T\vert}=[S=\varnothing]
$$

那么上面那个好像就是说，只留下$$S$$中$$d\vert a$$的元素$$a$$们，如果得到空集那么值是$$0$$，否则是$$1$$。为什么是反着的?注意符号是反的，并且去掉了空集。

$$
\begin{aligned}
=&\prod_{d}g(d)^{\sum_{T\subseteq S,T\neq\varnothing,d\vert T}(-1)^{\vert T\vert+1}}
=&\prod_{\exists a\in S,d\vert a}g(d)
\end{aligned}
$$

所以我们得到了一类新的套路 : 用min-max容斥干掉$$\mathrm{lcm}$$，然后用子集反演干掉枚举子集。

