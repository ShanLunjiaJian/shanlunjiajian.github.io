---
layout: post
title: 再谈法法塔和单位根反演，然后是法哇塔
subtitle: /tuu
tags: 数学
show: true
---

模拟赛做了个奇怪题，然后就来学法哇塔的本质了。

但是感觉好像不是很知道自己在说什么啊。

-----

循环卷积大概是这么一个东西

$$
h_i=\sum_{j,k}[j+k\bmod{n}=i]f_jg_k
$$

其中$$n$$是循环卷积的长度。这个东西有个$$j+k\bmod{n}=i$$，让人很想给它单位根反演一下。

如果你不知道单位根反演，它是这么一个式子

$$
\frac{1}{n}\sum_{i=0}^{n-1}\omega_n^{ki}=[k\bmod{n}=0]
$$

其中$$\omega_n$$是任意$$n$$次本原单位根。它的证明就是等比数列求和，如果$$k\bmod{n}=0$$，那么$$\omega_n^k=1$$，否则$$\omega_n^k\neq 1$$，这里出现了等比数列求和的时候对公比的讨论。

回到上面的循环卷积，$$j+k\bmod{n}=i$$也就是$$j+k-i\bmod{n}=0$$，对它进行单位根反演 : 

$$
\begin{aligned}
h_i&=\frac{1}{n}\sum_{j,k}\sum_{t=0}^{n-1}\omega_n^{(j+k-i)t}f_jg_k\\
&=n\sum_{t=0}^{n-1}\omega_n^{it}\left(\sum_j\omega_n^{jt}f_j\right)\left(\sum_k\omega_n^{kt}g_k\right)
\end{aligned}
$$

于是两个括号里面的就是dft之后点积，而外面的是idft。具体一点，法法塔计算的正变换是 : 

$$
f^\prime_i=\sum_j\omega_n^{ij}f_j
$$

看起来它就是代入$$\omega_n^i$$进行求值。

那么法哇塔很可能对应某种高维的单位根反演。现在下标都是每一维是$$0,...,n-1$$，有$$m$$维的向量。考虑这样的循环卷积的定义。

$$
h_i=\sum_{j,k}[j_p+k_p-i_p\bmod{n}=0\operatorname{forall}p]f_jg_k
$$

于是如果我们要从这里得到高维单位根反演，应该是对一个看起来像$$[k_p\bmod{n}=0\operatorname{forall}p]$$的东西进行反演。这个看起来应该写成$$\prod_{p=1}^m[k_p\bmod{n}=0]$$。爆力对每一维单位根反演就是

$$
\frac{1}{n^m}\prod_{p=1}^m\left(\sum_{i=0}^{n-1}\omega_n^{k_pi}\right)
$$

(上面两段话是不是有点智障啊?)展开之后看起来是

$$
\frac{1}{n^m}\sum_{0\leq i_1,i_2,...,i_m\leq n-1}\omega_n^{k_1i_1+...+k_mi_m}
$$

$$n=2$$对应集合，此时$$\omega_n=-1$$，而$$k_1i_1+k_2i_2+...+k_mi_m=\vert K\cap I\vert$$。于是我们得到一种奇怪的子集反演 : 

$$
\frac{1}{2^m}\sum_{T}(-1)^{\vert S\cap T\vert}=[S=\varnothing]
$$

对高维循环卷积使用高维单位根反演，我们得到

$$
\begin{aligned}
h_i&=\frac{1}{n^m}\sum_{j,k}\sum_{t_1,...,t_m}\omega_n^{\sum\limits_{p=1}^m(j_p+k_p-i_p)t_p}f_jg_k\\
&=\frac{1}{n^m}\sum_t\left(\sum_j\omega_n^{\sum\limits_{p=1}^mj_pt_p}f_j\right)\left(\sum_k\omega_n^{\sum\limits_{p=1}^mk_pt_p}g_k\right)
\end{aligned}
$$

所以k进制法哇塔计算的正变换就是

$$
f^\prime_i=\sum_j\omega_n^{\sum\limits_{p=1}^m i_pj_p}f_j
$$

这个指数就是点积。

对于二进制法哇塔，这个特化为

$$
f^\prime_S=\sum_T(-1)^{\vert S\cap T\vert}f_T
$$

。你在推式子的时候可能会用到它。

然后考虑法哇塔的逆。注意到法哇塔的逆是其本身乘上$\frac{1}{n}$，所以好像没啥好说的了。

-----

例题

未知来源题

全集是$$1,...,n$$，给$$m$$个集合，对于全集的每个子集，求它和多少个集合的交的popcnt是奇数。$$n\leq 20,m\leq 10^6$$。

注意到法哇塔算的就是这个东西，也就是交的popcnt是奇数则贡献的系数是$$-1$$，否则是$$1$$。取负，减去总数再除以$$2$$即可。

看到奇偶性的时候，可以考虑使用$$\frac{(-1)^n+1}{2}=[n\text{ is even}]$$。