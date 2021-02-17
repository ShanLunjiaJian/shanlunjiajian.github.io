---
layout: post
title: 置换群论学习笔记
subtitle: 玄妙而优美的鬼东西
tags: 数学 置换群 群论
---

这里主要是对Burnside定理(或者说引理)和Pólya定理的一点讲解。主要来自机械工业出版社的《组合数学》第五版。

前置知识是置换和群的基础。

## 引入

先举一个例子 : 有四个球，从1到4标号，摆在一个正方形的顶点上。现在要给球染色，每个球有两种染色方式——染成黑色或白色，求非等价的染色方案数。

![square.png](/img/2021-02-15-permutation-group-notes/square.png)

至于怎么定义等价?两种染色方案，经过若干次操作之后，如果能完全重合(颜色，而不是标号)，那就是等价的。这里一次操作是一次旋转或对称。

旋转有顺时针旋转90度，180度，270度；对称有沿四条对称轴的四种对称。当然，还有旋转0度，它也等价于不对称。

你说旋转45度?在这里我们不用考虑它，因为你这样转之后就连正方形都不重合，你指望顶点上的球能重合?

我们可以用一个置换来描述一次操作，比如在刚才那个例子中，0,90,180,270度四个旋转的置换是

$$
\left(
	\begin{array}{}
	1,2,3,4\\
	1,2,3,4
	\end{array}
\right),
\left(
	\begin{array}{}
	1,2,3,4\\
	4,1,2,3
	\end{array}
\right),
\left(
	\begin{array}{}
	1,2,3,4\\
	3,4,1,2
	\end{array}
\right),
\left(
	\begin{array}{}
	1,2,3,4\\
	2,3,4,1
	\end{array}
\right)
$$

，四种对称的置换是

$$
\left(
	\begin{array}{}
	1,2,3,4\\
	4,3,2,1
	\end{array}
\right),
\left(
	\begin{array}{}
	1,2,3,4\\
	2,1,4,3
	\end{array}
\right),
\left(
	\begin{array}{}
	1,2,3,4\\
	1,4,3,2
	\end{array}
\right),
\left(
	\begin{array}{}
	1,2,3,4\\
	3,2,1,4
	\end{array}
\right)
$$

。

## 置换群

接下来再做一步转化 : 之前定义等价用的是若干次操作，但是如果我们可以让这个若干次变成一次，或者说我的操作集合包含了所有可能的操作复合结果，是不是能简化这个问题?那么这个性质叫什么来着，哦对，封闭性!

说到封闭性我们就想到群。群大家都知道，而置换群是一个群$$(G,\circ)$$，其中$$G$$是一个置换的集合，$$\circ$$是置换的复合运算。(注意置换复合是右结合的!)这个置换集合里面所有的置换都是作用在我们要染色的东西上的，比如在刚才的例子中这些置换作用在四个球上。

还记得群的四条吗?

结合律 : 对于任意三个置换$$f,g,h\in G$$，有$$f\circ(g\circ h)=(f\circ g)\circ h$$。容易证明置换复合运算满足结合律。

封闭性 : 对于任意两个置换$$f,g\in G$$，$$f\circ g\in G$$。比如旋转90度和旋转180度的复合是旋转270度。

存在单位元 : 存在一个置换$$\iota\in G$$，满足对于任意置换$$f\in G$$，有$$f\circ\iota=\iota\circ f=f$$。恒等置换，在上面的例子中也就是旋转0度的置换或者说不翻转的置换，满足单位元的性质。

存在逆元 : 对于任意置换$$f\in G$$，存在$$g\in G$$，使得$$f\circ g=g\circ f=\iota$$。比如旋转90度和旋转270度互为逆元。

抽离出置换群之后，我们就可以抛开这些球是放在正方形，114514边形还是正二十面体上了。从现在开始球们只是一个标号集合(记为$$X$$)，操作们只是一个置换群(记为$$G$$)。

下面提到置换，默认它们在置换群中。

## Burnside定理

首先我们定义一个染色集合$$\mathcal{C}$$，表示对$$X$$所有可能的染色方式。比如对于刚才的例子，$$(B,B,W,B)$$就是一个染色。下面提到染色，默认它们在染色集合中。

置换$$f$$作用于染色$$\mathrm{c}$$，记为$$f\ast\mathrm{c}$$。比如染色$$(B,B,W,B)$$在置换$$\left(
\begin{array}{}
1,2,3,4\\
4,3,2,1
\end{array}
\right)$$作用下会变成$$(B,W,B,B)$$。

容易证明置换对染色的作用和置换复合具有结合律，即$$(f\circ g)\ast\mathrm{c}=f\ast(g\ast\mathrm{c})$$。这两种运算的优先级并不重要。但是置换作用也是右结合的!

对于染色$$\mathrm{c}$$，我们定义$$\mathrm{c}$$的**稳定核**$$G(\mathrm{c})$$为$$G$$中满足$$f\ast\mathrm{c}=\mathrm{c}$$的置换$$f$$的集合。

对称地，对于置换$$f$$，定义$$\mathcal{C}(f)$$为$$\mathcal{C}$$中满足$$f\ast\mathrm{c}=\mathrm{c}$$的染色$$\mathrm{c}$$的集合。

容易发现每个染色的稳定核也构成一个置换群，因为(下面基本是废话，建议自己证一下确定自己明白了刚才的定义)

结合律 : 废话。

封闭性 : 如果$$f\ast\mathrm{c}=\mathrm{c}, g\ast\mathrm{c}=\mathrm{c}$$，那么$$(f\circ g)\ast\mathrm{c}=f\ast(g\ast\mathrm{c})=f\ast\mathrm{c}=\mathrm{c}$$，所以$$f\circ g$$也在$$G(\mathrm{c})$$中。

单位元 : 恒等置换当然在$$G(\mathrm{c})$$中。

逆元 : 如果$$f\ast\mathrm{c}=\mathrm{c}$$，那么两边复合上$$f^{-1}$$，就得到$$\mathrm{c}=f^{-1}\ast\mathrm{c}$$。

然后就证完了。小朋友你证出来了吗?

现在，如果你想要更具体的问题定义，那就是 : 

我们要给集合$X$中每个元素染色，有一个奇怪的染色方法，它对每个元素的染色是平等的(但是对每个颜色不一定；这说明合法染色经过置换还是合法染色)，并且所有的染色结果组成一个染色集合$\mathcal{C}$。还有一个作用于$X$(或者说作用于$X$的染色)的置换群$G$，问题是求出在$G$作用下$\mathcal{C}$中非等价的染色数。

---

**定理1** 对于置换$$f$$和染色$$\mathrm{c}$$，作用在$$\mathrm{c}$$上与$$f$$等价的置换$$g$$(即$$f\ast\mathrm{c}=g\ast\mathrm{c}$$)的数量为$$\vert G(\mathrm{c})\vert$$。

**证明** 对于$$f\ast\mathrm{c}=g\ast\mathrm{c}$$，我们两边复合上$$f^{-1}$$，得到$$(f^{-1}\circ g)\ast\mathrm{c}=\mathrm{c}$$。这就相当于$$f^{-1}\circ g$$在$$\mathrm{c}$$的稳定核$$G(\mathrm{c})$$中。对于每个$$h\in G(\mathrm{c})$$，都有且仅有一个$$g$$满足$$f^{-1}\circ g=h$$，因为$$g=f\circ h$$。

---

**定理2** 对于染色$$\mathrm{c}\in\mathcal{C}$$，与$$\mathrm{c}$$等价的染色数量为

$$
\frac{\vert G\vert}{\vert G(\mathrm{c})\vert}
$$

**证明** 根据定理1，对于每个置换$$f$$，有$$\vert G(\mathrm{c})\vert$$个置换和它作用在$$\mathrm{c}$$上等价，那么这相当于把整个置换群划分成了$$\frac{\vert G\vert}{\vert G(\mathrm{c})\vert}$$个等价类。对于每一个等价类，它里面的置换会把$$\mathrm{c}$$置换成另一个染色(而恒等置换所在的等价类会置换成自己)，所以一共有多少个置换等价类，就有多少个跟$$\mathrm{c}$$等价的染色。

---

**定理3** 

$$\sum_{f\in G}\vert\mathcal{C}(f)\vert=\sum_{\mathrm{c}\in\mathcal{C}}\vert G(\mathrm{c})\vert$$

**证明**

我们可以根据定义拆开$$\mathcal{C}(f)$$来证明 : 

$$
\begin{aligned}
\sum_{f\in G}\vert\mathcal{C}(f)\vert&=\sum_{f\in G}\sum_{\mathrm{c}\in\mathcal{C}}[f\ast\mathrm{c}=\mathrm{c}]\\
&=\sum_{\mathrm{c}\in\mathcal{C}}\sum_{f\in G}[f\ast\mathrm{c}=\mathrm{c}]\\
&=\sum_{\mathrm{c}\in\mathcal{C}}\vert G(\mathrm{c})\vert
\end{aligned}
$$

---

**Burnside定理** 在置换群$$G$$的作用下，染色集合$$\mathcal{C}$$中的非等价染色数$$N(G,\mathcal{C})$$为

$$
N(G,\mathcal{C})=\frac{1}{\vert G\vert}\sum_{f\in G}\vert\mathcal{C}(f)\vert=\frac{1}{\vert G\vert}\sum_{\mathrm{c}\in\mathcal{C}}\vert G(\mathrm{c})\vert
$$

**证明** 

根据定理3，我们知道$$\sum_{f\in G}\vert\mathcal{C}(f)\vert=\sum_{\mathrm{c}\in\mathcal{C}}\vert G(\mathrm{c})\vert$$。

根据定理2，我们又知道$$\vert G(\mathrm{c})\vert=\frac{\vert G\vert}{\text{与}\mathrm{c}\text{等价的染色数}}$$。

把第二个式子代入第一个式子，得到

$$
\sum_{f\in G}\vert\mathcal{C}(f)\vert=\vert G\vert\sum_{\mathrm{c}\in\mathcal{C}}\frac{1}{\text{与}\mathrm{c}\text{等价的染色数}}
$$

考虑后面那个$$\sum$$，对于一个染色等价类，它里面的项加起来的结果应该是$$1$$，所以那个$$\sum$$计算的就是等价类个数，也就是非等价的染色数。所以这个式子乘上$$\frac{1}{\vert G\vert}$$就得到非等价的染色数。

由于一般情况下，置换群的大小不会很大，但是染色集合是巨大的，我们会使用$$\mathcal{C}(f)$$而不是$$G(\mathrm{c})$$进行计数。

## Pólya定理

Pólya定理通过考虑置换的循环结构，得到更简单的计数方法。

我们定义循环置换为，如果一个置换以循环的方式置换其中某些元素，而不改变其它元素，那么它就是一个循环置换，或简称循环。如果用有向图的方式表示循环置换，你可以看到其中有恰好一个有向环。定义循环置换的大小为循环部分的元素个数。

众所周知，每个置换都可以分解成若干循环置换的复合，这些循环置换称为这个置换的循环分解。我们定义$$\#(f)$$为置换$$f$$循环分解中置换的个数。

应用下面的两个定理有一个要求 : 必须是使用$$k$$种颜色对所有球染色，并且不能对染色作其它限制(比如相邻两个不同色，或者某种颜色只能用$$k$$次这样的)。

**定理4** 如果使用$$k$$种颜色对集合$$X$$的元素染色，那么对于置换$$f$$，在$$f$$作用下保持不变的染色个数为

$$
\vert\mathcal{C}(f)\vert=k^{\#(f)}
$$

**证明** 对于$$f$$循环分解中的每一个循环置换，考虑其中循环的几个元素，如果$$f$$的作用保持一个染色$$\mathrm{c}$$不变，那么这个循环中的元素必须染成相同的颜色——否则置换之后这个染色就改变了。比如如果一个循环是$$1\rightarrow 3\rightarrow 6\rightarrow 1$$，那么$$1,3,6$$的颜色必须相同。对应地，如果对于每一个循环置换，它里面循环的元素在$$\mathrm{c}$$中都染成相同的颜色，那么每一个循环置换都保持$$\mathrm{c}$$不变，它们的复合$$f$$也保持$$\mathrm{c}$$不变。

所以每一个循环置换有$$k$$种染色方案，我们就得到$$\vert\mathcal{C}(f)\vert=k^{\#(f)}$$。

**Pólya定理** 如果使用$$k$$种颜色对集合$$X$$中的元素染色，那么在置换群$$G$$的作用下，染色集合$$\mathcal{C}$$中的非等价染色数$$N(G,\mathcal{C})$$为

$$
N(G,\mathcal{C})=\frac{1}{\vert G\vert}\sum_{f\in G}k^{\#(f)}
$$

**证明** 将定理4的结论代入Burnside定理。

## 例题

[洛谷P4980 【模板】Pólya 定理](https://www.luogu.com.cn/problem/P4980)

把球顺时针(你喜欢逆时针也行)标号，那么$$G$$一共包含$$n$$个置换，转$$i$$下的那个置换，根据经典结论，有$$\gcd(n,i)$$个循环，于是我们得到答案 : 

$$
\begin{aligned}
\sum_{i=0}^{n}n^{\gcd(n,i)}
\end{aligned}
$$

然后就经典trick了。

$$
\begin{aligned}
&\sum_{i=0}^nn^{\gcd(n,i)}\\
=&\sum_{d=1}^nn^d\sum_{i=0}^n[\gcd(n,i)=d]\\
=&\sum_{d\vert n}^nn^d\sum_{i=0}^{n/d}[\gcd(n/d,i)=1]\\
=&\sum_{d\vert n}^nn^d\varphi(n/d)
\end{aligned}
$$

发现这个式子是$$O(\sqrt{d})$$求一个因数$$d$$的$$\varphi$$，同时可以$$O(m)-O(1)$$预处理前$$m$$个数的$$\varphi$$，类似于杜教筛预处理前$$m=O((Tn)^{\frac{2}{3}})$$个数，复杂度为$$O((Tn)^{\frac{2}{3}})$$。当然可以调整$$m$$获得更好的常数。

-----

[LOJ#6538. 烷基计数 加强版 加强版](https://loj.ac/p/6538)

有根树计数是具有很好的子结构性质的(，相比之下我就对无根树和图计数一窍不通，比如下面的烷烃和烯烃计数)。考虑所有点度数不超过4且根度数不超过3的的有根树的OGF $$A(z)$$，我们枚举根的三个儿子，得到$$A=zA^3+1$$。等等，我们这里并没有考虑儿子无序的问题，然后你就可以开始奆分类，事实上奆分类的本质就是Pólya定理。

要使用定理，我们的置换群是三个球随便换的置换群 : 

$$
\left(
	\begin{array}{}
	1,2,3\\
	1,2,3
	\end{array}
\right),
\left(
	\begin{array}{}
	1,2,3\\
	1,3,2
	\end{array}
\right),\left(
	\begin{array}{}
	1,2,3\\
	2,1,3
	\end{array}
\right),
\left(
	\begin{array}{}
	1,2,3\\
	2,3,1
	\end{array}
\right),
\left(
	\begin{array}{}
	1,2,3\\
	3,1,2
	\end{array}
\right),
\left(
	\begin{array}{}
	1,2,3\\
	3,2,1
	\end{array}
\right)
$$

对于每个置换$$f$$我们算出$$\vert\mathcal{C}(f)\vert$$的生成函数。

$$\left(\begin{array}{}1,2,3\\1,2,3\end{array}\right)$$是恒等置换，在它的作用下所有染色都不变，相当于不要求三个子树是否同构，所以它作用下不变染色数的生成函数是$A(z)^3$。

$$\left(\begin{array}{}1,2,3\\1,3,2\end{array}\right), \left(\begin{array}{}1,2,3\\2,1,3\end{array}\right), \left(\begin{array}{}1,2,3\\3,2,1\end{array}\right)$$有一个大小为$2$的循环，相当于要求其中两个子树同构，对第三个不作要求，所以这三个中每一个作用下不变染色数的生成函数都是$A(z^2)A(z)$。($$A(z^2)$$是怎么来的?考虑两棵子树同构，它们的$\operatorname{size}$加起来变成两倍，但是方案数是一棵树的方案数)

$$\left(\begin{array}{}1,2,3\\2,3,1\end{array}\right), \left(\begin{array}{}1,2,3\\3,1,2\end{array}\right)$$是大小为$3$的循环，相当于要求所有子树同构，所以这两个中每一个作用下不变染色数的生成函数都是$A(z^3)$。

全加起来再除以置换群的大小，然后做一个OGF平移，我们得到$A(z)=z\frac{A(z)^3+3A(z^2)A(z)+2A(z^3)}{6}$，然后用多项式牛顿迭代解方程即可，这个在我的blog里(生成函数学习笔记)有提到。

[LOJ#6512. 「雅礼集训 2018 Day8」C(烷烃计数)](https://loj.ac/p/6512)

你发现这个东西相当于两个烷基卷起来!所以我们再套一遍Pólya定理就做完了。

[洛谷P6597 烯烃计数](https://www.luogu.com.cn/problem/P6597)

你发现这个东西相当于两个两个烷基卷起来的东西卷起来!所以我们再套两遍Pólya定理就做完了。这两道题放在这里纯粹是充字数（



## 咕咕咕

下面是咕咕咕的内容。等我闲了再填坑。

下面我们将引入置换群的循环指数，从而得到一个更奇怪的Pólya定理，并扩展到更奇怪的染色方式——限制每种颜色出现的次数。

刚才的Pólya定理是通过循环分解来解决不限制出现次数的问题的，而面对现在的问题，我们好像不能只关心循环分解中循环置换的个数，还要关心它们的大小然后做一个多维背包了。于是就有了一个思路 : 对每个置换求出循环分解中各个循环置换的大小，然后用生成函数把它们搞起来。

**生成函数形式的Pólya定理** 咕咕咕。

