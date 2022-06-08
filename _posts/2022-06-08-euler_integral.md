---
layout: post
title: 两类欧拉积分
subtitle: /ll
tags: 数学

---

第二类欧拉积分，gamma函数是

$$
\Gamma(z)=\int_0^\infty t^{z-1}e^{-t}\mathrm{d}t=(z-1)!
$$

第一类欧拉积分，beta函数是

$$
\mathrm{B}(x,y)=\int_0^1t^{x-1}(1-t)^{y-1}\mathrm{d}t=\frac{\Gamma(x)\Gamma(y)}{\Gamma(x+y)}=\frac{(x-1)!(y-1)!}{(x+y-1)!}=\frac{\frac{1}{x}+\frac{1}{y}}{\binom{x+y}{x}}
$$

或者你会喜欢

$$
\mathrm{B}(x+1,y+1)=\int_0^1t^x(1-t)^y\mathrm{d}t=\frac{\Gamma(x+1)\Gamma(y+1)}{\Gamma(x+y+2)}=\frac{x!y!}{(x+y+1)!}=\frac{1}{(x+y+1)\binom{x+y}{x}}
$$

-----

模板 beta积分

hdu mutc09 D3 I. I Will Win

求

$$
\frac{\displaystyle\int_0^1 p^{a+1}(1-p)^{b}\ \mathrm{d}p}{\displaystyle\int_0^1 x^a(1-x)^b\ \mathrm{d}x}
$$

。

$$
\frac{\displaystyle\int_0^1 p^{a+1}(1-p)^{b}\ \mathrm{d}p}{\displaystyle\int_0^1 x^a(1-x)^b\ \mathrm{d}x}=\frac{\displaystyle\frac{1}{(a+b+2)\binom{a+b+1}{a+1}}}{\displaystyle\frac{1}{(a+b+1)\binom{a+b}{a}}}=\frac{(a+b+1)(a+b)!(a+1)!b!}{a!b!(a+b+2)(a+b+1)!}=\frac{a+1}{a+b+2}
$$

-----

分母上的二项式系数

使用beta积分。

$$
\binom{n}{k}^{-1}=(n+1)\int_0^1 t^k(1-t)^{n-k}\mathrm{d}t
$$

试看看!例题1.7 给$$n,r$$，求

$$
\sum_{k=r}^n(-1)^k\frac{\binom{k}{r}}{\binom{n}{k}}
$$

直接干。我们得到

$$
(n+1)\int_0^1\sum_{k=r}^n\binom{k}{r}(-t)^k(1-t)^{1-k}\mathrm{d}t
$$

后面这个看起来不是很友好。注意到如果没有$$\binom{k}{r}$$，就可以等比数列求和合成一项，那么我们考虑把$$\binom{k}{r}$$凑出来。但是这个东西不是很好凑，杜爷说一眼，但是我可能并没有眼/ll

注意到$$r$$很小，所以它也是明示你把$$\binom{k}{r}$$拆掉。但是拆掉了到哪里去呢，可以考虑先不要用引理，而是把它的一部分扔到分母上去。

$$
\sum_{k=r}^n(-1)^k\frac{\binom{k}{r}}{\binom{n}{k}}=\frac{1}{r!n!}\sum_{k=r}^n(-1)^kk^{\underline{r}}k!(n-k)!
$$

那么我们就要把$$k^{\underline{r}}$$炸开了。炸成多项式看起来和这两个阶乘不是很搭，我们需要炸成好看一点的东西。考虑把它和$$k!$$接起来，这要求我们把它拆成$$(k+1)^{\overline{i}}$$这样的东西。注意到$$k^{\underline{r}}$$是$$k+1$$的$$r$$次多项式，所以我们可以把每一项拆成上升幂，最后就得到一个$$\displaystyle\sum_{i=0}^rc_i(k+1)^{\overline{i}}$$这样的。

接下来就比较简单了。我们代回去

$$
\begin{aligned}
&\frac{1}{r!n!}\sum_{k=r}^n(-1)^kk^{\underline{r}}k!(n-k)!\\
=&\frac{1}{r!n!}\sum_{i=0}^rc_i\sum_{k=r}^n(-1)^k(k+i)!(n-k)!\\
=&\sum_{i=0}^r\frac{(n+i)!c_i}{r!n!}\sum_{k=r}^n\frac{(-1)^k}{\binom{n+i}{k+i}}\\
=&\sum_{i=0}^r\frac{(n+i)!(n+1)c_i}{r!n!}\int_0^1\sum_{k=r}^n(-t)^k(1-t)^{n-k}\mathrm{d}t\\
\int_0^1\sum_{k=r}^n(-t)^k(1-t)^{n-k}\mathrm{d}t=&\int_0^1(-t)^r(1-t)^{n-r}\sum_{k=0}^{n-r}\left(\frac{-t}{1-t}\right)^k\mathrm{d}t\\
=&\int_0^1(-t)^r(1-t)^{n-r}\frac{1-\left(\frac{-t}{1-t}\right)^{n-r+1}}{1-\frac{-t}{1-t}}\mathrm{d}t\\
=&\int_0^1(-t)^r\left((1-t)^{n-r+1}-(-t)^{n-r+1}\right)\mathrm{d}t\\
=&\int_0^1(-t)^r(1-t)^{n-r+1}\mathrm{d}t-\int_0^1(-t)^{n+1}\mathrm{d}t\\
=&\frac{(-1)^r}{(n+2)\binom{n+2}{r}}+\frac{(-1)^n}{n+2}\\
\sum_{i=0}^r\frac{(n+i)!(n+1)c_i}{r!n!}\int_0^1\sum_{k=r}^n(-t)^k(1-t)^{n-k}\mathrm{d}t=&\sum_{i=0}^r\frac{(n+i)!(n+1)c_i}{r!n!(n+2)}\left(\frac{(-1)^r}{\binom{n+2}{r}}+(-1)^n\right)
\end{aligned}
$$

其中倒数第二行的第一项是一个beta积分。也许会有一些细节问题。
