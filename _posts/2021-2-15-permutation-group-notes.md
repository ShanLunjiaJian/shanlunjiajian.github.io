---
layout: post
title: 置换群论学习笔记
subtitle: 玄妙而优美的鬼东西
tags: 数学 置换群 群论
---

这里主要是对Burnside定理(或者说引理)和Pólya定理的一点讲解。主要来自机械工业出版社的《组合数学》第五版。

前置知识是置换和群的基础。

## 引入

先举一个例子 : 有四个球，从1到4标号，摆在一个正方形的顶点上。现在要给球染色，每个球有两种染色方式——染成黑色或白色，求本质不同的染色方案数。

![square.png](/img/2021-02-15-permutation-group-notes/square.png)

至于怎么定义本质相同?两种染色方案，经过若干次操作之后，如果能完全重合(颜色，而不是标号)，那就是本质相同的。这里一次操作是一次旋转或对称。

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

有一个问题 : 旋转270度等价于三次旋转90度，而一开始定义本质相同用的是若干次操作，那么为什么还要写这个多余的东西呢?

哦是的，置换群!我们研究的东西，全是对于置换群而言的，因为它有着优秀的对称性——群论就是研究对称性的。

(所以说如果你可以转90度但是不能转270度，这里说的理论就没啥用了)

那么如果你不知道，置换群是什么呢?群大家都知道，而置换群是一个群$(G,\circ)$，其中$G$是一个置换的集合，$\circ$是置换的复合运算。

还记得群的四条吗?

结合律 : 对于任意三个置换$f,g,h\in G$，有$f\circ(g\circ h)=(f\circ g)\circ h$。可以证明置换复合运算满足结合律。

封闭性 : 对于任意两个置换$f,g\in G$，$f\circ g\in G$。比如旋转90度和旋转180度的复合是旋转270度。

存在单位元 : 存在一个置换$\epslion\in G$，满足对于任意置换$f\in G$，有$f\circ\epslion=\epslion\circ\f=f$。恒等置换，在上面的例子中也就是旋转0度的置换或者说不翻转的置换，满足单位元的性质。

存在逆元 : 对于任意置换$f\in G$，存在$g\in G$，使得$f\circ g=g\circ f=\epslion$。比如旋转90度和旋转270度互为逆元。

为了构造群从而得到优秀的对称性，我们就需要满足封闭性，也就是说若干次置换复合的结果也在我们的置换集合中，也就是说它们其实等价于一次置换。你会发现虽然置换变多了，但是只置换一次显然是减小了问题的难度。

抽离出置换群之后，我们就可以抛开这些球是放在正方形，114514边形还是正二十面体上了。从现在开始球们只是一个标号集合(记为$X$)，操作们只是一个置换群(记为$G$)。

下面提到染色和置换，默认它们在染色集合和置换群中。

## Burnside定理

首先我们定义一个染色集合$\mathcal{C}$，表示对$X$所有可能的染色方式。比如对于刚才的例子，$(B,B,W,B)$就是一个染色。

置换$f$作用于染色$\mathrm{c}$，记为$f\ast\mathrm{c}$。比如染色$(B,B,W,B)$在置换$\left(	\begin{array}{}1,2,3,4\\4,3,2,1\end{array}\right)$作用下会变成$(B,W,B,B)$。

容易证明置换对染色的作用和置换复合具有结合律，即$(f\circ g)\ast\mathrm{c}=f\ast(g\ast\mathrm{c})$。这两种运算的优先级并不重要。

对于染色$\mathrm{c}$，我们定义$\mathrm{c}$的**稳定核**$G(\mathrm{c})$为$G$中满足$f\ast\mathrm{c}=\mathrm{c}$的置换$f$的集合。

对称地，对于置换$f$，定义$\mathcal{C}(f)$为$\mathcal{C}$中满足$f\ast\mathrm{c}=\mathrm{c}$的染色$\mathrm{c}$的集合。

容易发现每个染色的稳定核也构成一个置换群，因为(下面基本是废话，建议自己证一下确定自己明白了刚才的定义)

结合律 : 废话。

封闭性 : 如果$f\ast\mathrm{c}=\mathrm{c}, g\ast\mathrm{c}=\mathrm{c}$，那么$(f\circ g)\ast\mathrm{c}=f\ast(g\ast\mathrm{c})=f\ast\mathrm{c}=\mathrm{c}$，所以$f\circ g$也在$G(\mathrm{c})$中。

单位元 : 恒等置换当然在$G(\mathrm{c})$中。

逆元 : 如果$f\ast\mathrm{c}=\mathrm{c}$，那么两边复合上$f^{-1}$，就得到$\mathrm{c}=f^{-1}\ast\mathrm{c}$。

---

**定理1** 对于置换$f$和染色$\mathrm{c}$，作用在$\mathrm{c}$上与$f$等价的置换$g$(即$f\ast\mathrm{c}=g\ast\mathrm{c}$)的数量为$\|G(\mathrm{c})\|$。

**证明** 对于$f\ast\mathrm{c}=g\ast\mathrm{c}$，我们两边复合上$f^{-1}$，得到$(f^{-1}\circ g)\ast\mathrm{c}=\mathrm{c}$。这就相当于$f^{-1}\circ g$在$\mathrm{c}$的稳定核$G(\mathrm{c})$中。对于每个$h\in G(\mathrm{c})$，都有且仅有一个$g$满足$f^{-1}\circ g=h$，因为$g=f\circ h$。

---

**定理2** 对于染色$\mathrm{c}\in\mathcal{C}$，与$\mathrm{c}$本质相同的染色数量为

$$
\frac{\|G\|}{\|G(\mathrm{c})\|}
$$

**证明** 根据定理1，对于每个置换$f$，有$\|G(\mathrm{c})\|$个置换和它作用在$\mathrm{c}$上等价，那么这相当于把整个置换群划分成了$\frac{\|G\|}{\|G(\mathrm{c})\|}$个等价类。对于每一个等价类，它里面的置换会把$\mathrm{c}$置换成另一个染色(而恒等置换所在的等价类会置换成自己)，所以一共有多少个置换等价类，就有多少个跟$\mathrm{c}$等价的染色。

---

**定理3** $\sum_{f\in G}\|\mathcal{C}(f)\|=\sum_{\mathrm{c}\in\mathcal{C}}\|G(\mathrm{c})\|$

**证明**

我们可以根据定义拆开$\mathcal{C}(f)$来证明 : 

$$
\begin{aligned}
\sum_{f\in G}\|\mathcal{C}(f)\|&=\sum_{f\in G}\sum_{\mathrm{c}\in\mathcal{C}}[f\ast\mathrm{c}=\mathrm{c}]\\
&=\sum_{\mathrm{c}\in\mathcal{C}}\sum_{f\in G}[f\ast\mathrm{c}=\mathrm{c}]\\
&=\sum_{\mathrm{c}\in\mathcal{C}}G(\mathrm{c})\
\end{aligned}
$$

---

**Burnside定理** 在置换群$G$的作用下，染色集合$\mathcal{C}$中的本质不同染色数$N(G,\mathcal{C})$为

$$
N(G,\mathcal{C})=\frac{1}{\|G\|}\sum_{f\in G}\|\mathcal{C}(f)\|=\frac{1}{\|G\|}\sum_{\mathrm{c}\in\mathcal{C}}\|G(\mathrm{c})\|
$$

**证明** 

根据定理3，我们知道$\sum_{f\in G}\|\mathcal{C}(f)\|=\sum_{\mathrm{c}\in\mathcal{C}}\|G(\mathrm{c})\|$。

根据定理2，我们又知道$\|G(\mathrm{c})\|=\frac{\|G\|}{\text{与}\mathrm{c}\text{等价的染色数}}$。

把第二个式子代入第一个式子，得到

$$
\sum_{f\in G}\|\mathcal{C}(f)\|=\sum_{\mathrm{c}\in\mathcal{C}}\frac{\|G\|}{\text{与}\mathrm{c}\text{等价的染色数}}
$$

