---
layout: post
title: 两类欧拉积分
subtitle: 算力为负了/ll
tags: 数学
---

第二类欧拉积分，gamma函数是

$$
\Gamma(z)=\int_0^\infty t^{z-1}e^{-t}\mathrm{d}t=(z-1)!
$$

，不是很知道它在哪里会被用到。

第一类欧拉积分，beta函数是

$$
\mathrm{B}(x,y)=\int_0^1t^{x-1}(1-t)^{y-1}\mathrm{d}t=\frac{\Gamma(x)\Gamma(y)}{\Gamma(x+y)}=\frac{(x-1)!(y-1)!}{(x+y-1)!}=\frac{\frac{1}{x}+\frac{1}{y}}{\binom{x+y}{x}}
$$

或者你会喜欢

$$
\mathrm{B}(x+1,y+1)=\int_0^1t^x(1-t)^y\mathrm{d}t=\frac{\Gamma(x+1)\Gamma(y+1)}{\Gamma(x+y+2)}=\frac{x!y!}{(x+y+1)!}=\frac{1}{(x+y+1)\binom{x+y}{x}}
$$

。

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

试看看!例题1.7

给$$n\leq 10^9,r\leq 5000$$，求

$$
\sum_{k=r}^n(-1)^k\frac{\binom{k}{r}}{\binom{n}{k}}
$$

，答案膜大素数，$$5000$$组多测，5s。

直接干。我们得到

$$
(n+1)\int_0^1\sum_{k=r}^n\binom{k}{r}(-t)^k(1-t)^{n-k}\mathrm{d}t
$$

后面这个看起来不是很友好。注意到如果没有$$\binom{k}{r}$$，就可以等比数列求和合成一项。

一个想法是考虑$$\binom{k}{r}$$是怎么来的，或者说我们硬凑这个式子的封闭形式。下降幂让我们想到求导，于是考虑用某个东西的$$r$$阶导来凑。发现这里面正好有一个$$(-t)^k$$，于是我们对$$t$$求$$r$$阶导再乘上$$(-t)^r$$就可以凑出$$k^{\underline{r}}$$......吗?注意到有一个$$(1-t)^{n-k}$$，所以我们就绷不住了。

考虑强行把它干掉，设$$\displaystyle F(x,y)=\sum_{k=0}^nx^ky^{n-k}=\frac{x^{n+1}-y^{n+1}}{x-y}$$，记$$\displaystyle\mathrm D=\frac{\partial}{\partial x}$$，那么

$$
x^r(\mathrm D^rF)(x,y)=x^r\mathrm D^r\left(\sum_{k=0}^nx^ky^{n-k}\right)=\sum_{k=r}^nk^{\underline{r}}x^ky^{n-k}
$$

所以我们所要的东西就是$$\displaystyle\frac{(-t)^r(\mathrm D^rF)(-t,1-t)}{r!}$$。

然后转而使用那个封闭形式

$$
\begin{aligned}
&\mathrm D^r\left(\frac{x^{n+1}-y^{n+1}}{x-y}\right)\\
=&\sum_{i=0}^r\binom{r}{i}\left(\mathrm D^i(x^{n+1}-y^{n+1})\right)\left(\mathrm D^{r-i}\frac{1}{x-y}\right)\\
=&\sum_{i=0}^r\binom{r}{i}(n+1)^{\underline{i}}x^{n-i+1}(r-i)!(-1)^{r-i}(x-y)^{-1-r+i}
\end{aligned}
$$

现在代入，得到

$$
\sum_{k=0}^n\binom{k}{r}(-t)^k(1-t)^{n-k}=\frac{(-t)^r}{r!}\sum_{i=0}^r\binom{r}{i}(n+1)^{\underline{i}}(-t)^{n-i+1}(r-i)!(-1)^{r-i}(-t-(1-t))^{-1-r+i}
$$

所以我们原来所要求的就变成了

$$
\begin{aligned}
&(n+1)\int_0^1\frac{(-t)^r}{r!}\sum_{i=0}^r\binom{r}{i}(n+1)^{\underline{i}}(-t)^{n-i+1}(r-i)!(-1)^{r-i}(-t-(1-t))^{-1-r+i}\mathrm{d}t\\
=&-\frac{(n+1)}{r!}\sum_{i=0}^r\binom{r}{i}(n+1)^{\underline{i}}(r-i)!\int_0^1(-t)^{n+r-i+1}\mathrm{d}t\\
=&\frac{(n+1)}{r!}\sum_{i=0}^r(-1)^{n+r-i}\binom{r}{i}\frac{(n+1)^{\underline{i}}(r-i)!}{n+r-i+2}\\
\end{aligned}
$$

就结束了。

另一个想法是，既然直接beta积分很困难......我们先抄一遍要求的式子。

$$
\sum_{k=r}^n(-1)^k\frac{\binom{k}{r}}{\binom{n}{k}}
$$

注意到$$r$$很小，所以它也是明示你把$$\binom{k}{r}$$拆掉。但是拆掉了到哪里去呢，可以考虑把它的一部分拆掉提出来变成系数，另一部分和分母拼成一个新的组合数(因为全提出来显然是不可能的)，然后一起用beta积分。

$$
\sum_{k=r}^n(-1)^k\frac{\binom{k}{r}}{\binom{n}{k}}=\frac{1}{r!n!}\sum_{k=r}^n(-1)^kk^{\underline{r}}k!(n-k)!
$$

那么我们就要把$$k^{\underline{r}}$$炸开了。炸成多项式看起来和这两个阶乘不是很搭，我们需要炸成好看一点的东西。考虑把它和$$k!$$接起来，这要求我们把它拆成$$(k+1)^{\overline{i}}$$这样的东西。注意到$$k^{\underline{r}}$$是$$k+1$$的$$r$$次多项式，所以我们可以把每一项拆成上升幂，最后就得到一个$$\displaystyle\sum_{i=0}^rc_i(k+1)^{\overline{i}}$$这样的。看起来需要预处理这个系数。

接下来就比较简单了。我们代回去

$$
\begin{aligned}
&\frac{1}{r!n!}\sum_{k=r}^n(-1)^kk^{\underline{r}}k!(n-k)!\\
=&\frac{1}{r!n!}\sum_{i=0}^rc_i\sum_{k=r}^n(-1)^k(k+i)!(n-k)!\\
=&\sum_{i=0}^r\frac{(n+i)!c_i}{r!n!}\sum_{k=r}^n\frac{(-1)^k}{\binom{n+i}{k+i}}\\
=&\sum_{i=0}^r\frac{(n+i)!(n+1)c_i}{r!n!}\int_0^1\sum_{k=r}^n(-t)^k(1-t)^{n-k}\mathrm{d}t=\color{cyan}{\mathrm{T}}\\
\int_0^1\sum_{k=r}^n(-t)^k(1-t)^{n-k}\mathrm{d}t=&\int_0^1(-t)^r(1-t)^{n-r}\sum_{k=0}^{n-r}\left(\frac{-t}{1-t}\right)^k\mathrm{d}t\\
=&\int_0^1(-t)^r(1-t)^{n-r}\frac{1-\left(\frac{-t}{1-t}\right)^{n-r+1}}{1-\frac{-t}{1-t}}\mathrm{d}t\\
=&\int_0^1(-t)^r\left((1-t)^{n-r+1}-(-t)^{n-r+1}\right)\mathrm{d}t\\
=&\int_0^1(-t)^r(1-t)^{n-r+1}\mathrm{d}t-\int_0^1(-t)^{n+1}\mathrm{d}t\\
=&\frac{(-1)^r}{(n+2)\binom{n+2}{r}}+\frac{(-1)^n}{n+2}\\
\color{cyan}{\mathrm{T}}=&\sum_{i=0}^r\frac{(n+i)!(n+1)c_i}{r!n!(n+2)}\left(\frac{(-1)^r}{\binom{n+2}{r}}+(-1)^n\right)
\end{aligned}
$$

其中倒数第二行的第一项是一个beta积分。也许会有一些细节问题。