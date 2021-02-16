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

存在单位元 : 存在一个置换$$\epsilon\in G$$，满足对于任意置换$$f\in G$$，有$$f\circ\epsilon=\epsilon\circ f=f$$。恒等置换，在上面的例子中也就是旋转0度的置换或者说不翻转的置换，满足单位元的性质。

存在逆元 : 对于任意置换$$f\in G$$，存在$$g\in G$$，使得$$f\circ g=g\circ f=\epsilon$$。比如旋转90度和旋转270度互为逆元。

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

另外，下面所有的定理都要求，对于任意染色$$c$$和置换$$f$$，$$f\ast\mathrm{c}\in\mathcal{C}$$，也就是说不管你怎么转那个正方形，转出来的染色还是合法的。

---

**定理1** 对于置换$$f$$和染色$$\mathrm{c}$$，作用在$$\mathrm{c}$$上与$$f$$等价的置换$$g$$(即$$f\ast\mathrm{c}=g\ast\mathrm{c}$$)的数量为$$\vert G(\mathrm{c})\vert $$。

**证明** 对于$$f\ast\mathrm{c}=g\ast\mathrm{c}$$，我们两边复合上$$f^{-1}$$，得到$$(f^{-1}\circ g)\ast\mathrm{c}=\mathrm{c}$$。这就相当于$$f^{-1}\circ g$$在$$\mathrm{c}$$的稳定核$$G(\mathrm{c})$$中。对于每个$$h\in G(\mathrm{c})$$，都有且仅有一个$$g$$满足$$f^{-1}\circ g=h$$，因为$$g=f\circ h$$。

---

**定理2** 对于染色$$\mathrm{c}\in\mathcal{C}$$，与$$\mathrm{c}$$等价的染色数量为

$$
\frac{\vert G\vert }{\vert G(\mathrm{c})\vert }
$$

**证明** 根据定理1，对于每个置换$$f$$，有$$\vert G(\mathrm{c})\vert $$个置换和它作用在$$\mathrm{c}$$上等价，那么这相当于把整个置换群划分成了$$\frac{\vert G\vert }{\vert G(\mathrm{c})\vert }$$个等价类。对于每一个等价类，它里面的置换会把$$\mathrm{c}$$置换成另一个染色(而恒等置换所在的等价类会置换成自己)，所以一共有多少个置换等价类，就有多少个跟$$\mathrm{c}$$等价的染色。

---

**定理3** 

$$\sum_{f\in G}\vert\mathcal{C}(f)\vert =\sum_{\mathrm{c}\in\mathcal{C}}\vert G(\mathrm{c})\vert $$

**证明**

我们可以根据定义拆开$$\mathcal{C}(f)$$来证明 : 

$$
\begin{aligned}
\sum_{f\in G}\vert\mathcal{C}(f)\vert &=\sum_{f\in G}\sum_{\mathrm{c}\in\mathcal{C}}[f\ast\mathrm{c}=\mathrm{c}]\\
&=\sum_{\mathrm{c}\in\mathcal{C}}\sum_{f\in G}[f\ast\mathrm{c}=\mathrm{c}]\\
&=\sum_{\mathrm{c}\in\mathcal{C}}\vert G(\mathrm{c})\vert
\end{aligned}
$$

---

**Burnside定理** 在置换群$$G$$的作用下，染色集合$$\mathcal{C}$$中的非等价染色数$$N(G,\mathcal{C})$$为

$$
N(G,\mathcal{C})=\frac{1}{\vert G\vert }\sum_{f\in G}\vert\mathcal{C}(f)\vert =\frac{1}{\vert G\vert }\sum_{\mathrm{c}\in\mathcal{C}}\vert G(\mathrm{c})\vert 
$$

**证明** 

根据定理3，我们知道$$\sum_{f\in G}\vert\mathcal{C}(f)\vert =\sum_{\mathrm{c}\in\mathcal{C}}\vert G(\mathrm{c})\vert $$。

根据定理2，我们又知道$$\vert G(\mathrm{c})\vert =\frac{\vert G\vert }{\text{与}\mathrm{c}\text{等价的染色数}}$$。

把第二个式子代入第一个式子，得到

$$
\sum_{f\in G}\vert\mathcal{C}(f)\vert =\vert G\vert\sum_{\mathrm{c}\in\mathcal{C}}\frac{1}{\text{与}\mathrm{c}\text{等价的染色数}}
$$

考虑后面那个$$\sum$$，对于一个染色等价类，它里面的项加起来的结果应该是$$1$$，所以那个$$\sum$$计算的就是等价类个数，也就是非等价的染色数。所以这个式子乘上$$\frac{1}{\vert G\vert }$$就得到非等价的染色数。

由于一般情况下，置换群的大小不会很大，但是染色集合是巨大的，我们会使用$$\mathcal{C}(f)$$而不是$$G(\mathrm{c})$$进行计数。

## Pólya定理

Pólya定理通过考虑置换的循环结构，得到更简单的计数方法。

我们定义循环置换为，如果一个置换以循环的方式置换其中某些元素，而不改变其它元素，那么它就是一个循环置换，或简称循环。如果用有向图的方式表示循环置换，你可以看到其中有恰好一个有向环。

众所周知，每个置换都可以分解成若干循环置换的复合，这些循环置换称为这个置换的循环分解。我们定义$$\#(f)$$为置换$$f$$循环分解中置换的个数。

应用下面的两个定理有一个要求 : 必须是使用$$k$$种颜色对所有球染色，并且不能对染色作其它限制(比如相邻两个不同色，或者某种颜色只能用$$k$$次这样的)。

**定理4** 如果使用$$k$$种颜色对集合$$X$$的元素染色，那么对于置换$$f$$，在$$f$$作用下保持不变的染色个数为

$$
\vert\mathcal{C}(f)\vert =k^{\#(f)}
$$

**证明** 对于$$f$$循环分解中的每一个循环置换，考虑其中循环的几个元素，如果$$f$$的作用保持一个染色$$\mathrm{c}$$不变，那么这个循环中的元素必须染成相同的颜色——否则置换之后这个染色就改变了。比如如果一个循环是$$1\rightarrow 3\rightarrow 6\rightarrow 1$$，那么$$1,3,6$$的颜色必须相同。对应地，如果对于每一个循环置换，它里面循环的元素在$$\mathrm{c}$$中都染成相同的颜色，那么每一个循环置换都保持$$\mathrm{c}$$不变，它们的复合$$f$$也保持$$\mathrm{c}$$不变。

所以每一个循环置换有$$k$$种染色方案，我们就得到$$\vert\mathcal{C}(f)\vert =k^{\#(f)}$$。

**Pólya定理** 如果使用$$k$$种颜色对集合$$X$$中的元素染色，那么在置换群$$G$$的作用下，染色集合$$\mathcal{C}$$中的非等价染色数$$N(G,\mathcal{C})$$为

$$
N(G,\mathcal{C})=\frac{1}{\vert G\vert }\sum_{f\in G}k^{\#(f)}
$$

**证明** 将定理4的结论代入Burnside定理。

-----

下面我们将引入置换群的循环指数，从而得到一个更奇怪的Pólya定理，并扩展到更奇怪的染色方式。

**Pólya定理的生成函数版本** 咕咕咕。

