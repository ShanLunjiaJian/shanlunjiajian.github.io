---
layout: post
title: CF438E和BZOJ#3684 做题笔记
subtitle: 奇妙
tags: 数学 多项式 生成函数
---

CF438E是 [小朋友和二叉树](https://www.luogu.com.cn/problem/CF438E)，而BZOJ#3684是 [大朋友和多叉树](https://darkbzoj.tk/problem/3684)。

-----

小朋友和二叉树这个题还是比较简单的，因为点有标号我们使用EGF，然后考虑递推式 : 

$$
\begin{aligned}
f_n&=\sum_{c\in C}\sum_{j=0}^{n-c}f_jf_{n-c-j}+[n=0]\\
&=\sum_{i=0}[i\in c]\sum_{j=0}^{n-i}f_jf_{n-i-j}+[n=0]
\end{aligned}
$$

设$$t_i=[i\in C]$$，发现变成了一个卷积$$F=TF^2+1$$，解这个方程，我们得到$$F=\frac{1\pm\sqrt{1-4T}{2T}$$。

那么是取$$+$$还是$$-$$呢?

还记得Catalan数吗?我们代入$$z=0$$，得到$$\frac{1\pm 1}{0}$$，那么看来是取$$-$$了。

然后写一个带项式开根，就做完了。

等等!你发现$$G$$常数项是$$0$$，它不能直接求逆啊!

这里有两种解决办法，一种是"分母无理化"，即$$\frac{1\pm\sqrt{1-4T}{2T}=\frac{2T}{1+\sqrt{1-4T}}$$，然后这个分母常数项就不是$$0$$了；另一种是直接牛顿迭代解方程。

-----

大朋友和多叉树则要困难一些，因为点有标号我们还是使用EGF，并设$$t_i=[i\in D]$$，然后考虑递推式 : 

$$
\begin{aligned}
f_n&=\sum_{i=0}^nt_i[z^n]\hat{F}^i+[n=1]\\
\hat{F}&=\sum_{i=0}^nz^i\sum_{j=0}^nt_j([z^i]\hat{F}^j)+z\\
&=\sum_{j=0}^nt_j\hat{F}^j+z
\end{aligned}
$$

你发现进行不下去了!

不过，如果我们稍微移一下项......

$$
\begin{aligned}
\hat{F}&=\sum_{j=0}^nt_j\hat{F}^j+z\\
z&=\hat{F}-\sum_{j=0}^nt_j\hat{F}^j
\end{aligned}
$$

如果设$$G(z)=z-\sum_{j=0}^nt_jz^j$$，那么上面那个式子就是说，$$G$$是$$\hat{F}$$的复合逆!好家伙。

$$G$$随便求，所以我们直接拉格朗日反演，就可以得到$$[z^n]\hat{F}$$。

毒瘤不好，所以我暂时不打算谈拉反是什么（

