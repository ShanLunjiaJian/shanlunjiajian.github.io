---
layout: post
title: 置换群论学习笔记
subtitle: 玄妙而优美的鬼东西
tags: 数学 archived
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
\left(\begin{array}{}1,2,3,4\\1,2,3,4\end{array}\right),
\left(\begin{array}{}1,2,3,4\\4,1,2,3\end{array}\right),
\left(\begin{array}{}1,2,3,4\\3,4,1,2\end{array}\right),
\left(\begin{array}{}1,2,3,4\\2,3,4,1\end{array}\right)
$$

，四种对称的置换是

$$
\left(\begin{array}{}1,2,3,4\\4,3,2,1\end{array}\right),
\left(\begin{array}{}1,2,3,4\\2,1,4,3\end{array}\right),
\left(\begin{array}{}1,2,3,4\\1,4,3,2\end{array}\right),
\left(\begin{array}{}1,2,3,4\\3,2,1,4\end{array}\right)
$$

。

## 置换群

接下来再做一步转化 : 之前定义本质相同用的是若干次操作，但是如果我们可以让这个若干次变成一次，或者说我的操作集合包含了所有可能的操作复合结果，是不是能简化这个问题?那么这个性质叫什么来着，哦对，封闭性!

说到封闭性我们就想到群。群大家都知道，而置换群是一个群$$(G,\circ)$$，其中$$G$$是一个置换的集合，$$\circ$$是置换的复合运算。(注意置换复合是右结合的!)这个置换集合里面所有的置换都是作用在我们要染色的东西上的，比如在刚才的例子中这些置换作用在四个球上。

还记得群的四条吗?

结合律 : 对于任意三个置换$$f,g,h\in G$$，有$$f\circ(g\circ h)=(f\circ g)\circ h$$。容易证明置换复合运算满足结合律。

封闭性 : 对于任意两个置换$$f,g\in G$$，$$f\circ g\in G$$。比如旋转90度和旋转180度的复合是旋转270度。

存在单位元 : 存在一个置换$$\iota\in G$$，满足对于任意置换$$f\in G$$，有$$f\circ\iota=\iota\circ f=f$$。恒等置换，在上面的例子中也就是旋转0度的置换或者说不翻转的置换，满足单位元的性质。

存在逆元 : 对于任意置换$$f\in G$$，存在$$g\in G$$，使得$$f\circ g=g\circ f=\iota$$。比如旋转90度和旋转270度互为逆元。

抽离出置换群之后，我们就可以抛开这些球是放在正方形，114514边形还是正二十面体上了。从现在开始球们只是一个标号集合(记为$$X$$)，操作们只是一个置换群(记为$$G$$)。

下面提到置换，默认它们在置换群中。

## Burnside定理

首先定义一大堆东西，请坚持看完。

定义**颜色集合**$$\mathcal{B}$$，其中每个元素称为一个**颜色**，它的大小是$$m$$。这个东西我们可能不会立刻用到。

定义**染色集合**$$\mathcal{C}$$，表示对$$X$$所有可能的染色，当然每一种染色是一个从元素集合$$X$$到颜色序列$$\mathcal{B}^X$$的映射。比如对于刚才的例子，$$(B,B,W,B)$$就是一个染色。下面提到染色，默认它们在染色集合中。当然我们最好定义获取一个染色$$\mathrm{c}\in\mathcal{C}$$某一项的函数$$\mathrm{c}(i)$$，表示这个染色对元素$$i$$染了什么颜色。

注意这里每一种染色虽然都是从元素集合$$X$$到颜色序列$$\mathcal{B}^X$$的映射，但是反过来则不一定，因为Burnside定理只要求合法染色置换之后还是合法染色。Pólya定理的限制则要更强，它要求染色集合就是从元素集合$$X$$到颜色序列$$\mathcal{B}^X$$的**所有**映射。如果你看不懂这句话那么就忽略它。

置换$$f$$作用于染色$$\mathrm{c}$$，记为$$f\ast\mathrm{c}$$。比如染色$$(B,B,W,B)$$在置换$$\left(
\begin{array}{}
1,2,3,4\\
4,3,2,1
\end{array}
\right)$$作用下会变成$$(B,W,B,B)$$。形式化定义当然是

$$
f\ast\mathrm{c}(i)=\mathrm{c}(f(i))
$$

。容易证明置换对染色的作用和置换复合具有结合律，即$$(f\circ g)\ast\mathrm{c}=f\ast(g\ast\mathrm{c})$$。这两种运算的优先级并不重要。但是置换作用也是右结合的!

定义两个染色$$\mathrm{c}_1,\mathrm{c}_2$$等价，当且仅当存在一个置换$$f\in G$$，使得$$f\ast\mathrm{c}_1=\mathrm{c}_2$$。

定义染色集合$$\mathcal{C}$$在置换群$$G$$作用下的等价类集合$$\mathcal{C}/G$$，其中每个元素是一个染色等价类。这个东西的大小$$\vert\mathcal{C}/G\vert$$，也就是等价类个数，就是我们想要的答案。

对于染色$$\mathrm{c}$$，我们定义$$\mathrm{c}$$的**稳定核**$$G(\mathrm{c})$$为$$G$$中满足$$f\ast\mathrm{c}=\mathrm{c}$$，也就是使$$\mathrm{c}$$不变的置换$$f$$的集合。

对称地，对于置换$$f$$，定义$$f$$的**不动点**$$\mathcal{C}(f)$$为$$\mathcal{C}$$中满足$$f\ast\mathrm{c}=\mathrm{c}$$，也就是$$f$$作用上去没有效果的染色$$\mathrm{c}$$的集合。

容易发现每个染色的稳定核也构成一个置换群，因为(下面基本是废话，建议自己证一下确定自己明白了刚才的定义)

结合律 : 废话。

封闭性 : 如果$$f\ast\mathrm{c}=\mathrm{c}, g\ast\mathrm{c}=\mathrm{c}$$，那么$$(f\circ g)\ast\mathrm{c}=f\ast(g\ast\mathrm{c})=f\ast\mathrm{c}=\mathrm{c}$$，所以$$f\circ g$$也在$$G(\mathrm{c})$$中。

单位元 : 恒等置换当然在$$G(\mathrm{c})$$中。

逆元 : 如果$$f\ast\mathrm{c}=\mathrm{c}$$，那么两边复合上$$f^{-1}$$，就得到$$\mathrm{c}=f^{-1}\ast\mathrm{c}$$。

然后就证完了。小朋友你证出来了吗?

现在，如果你想要更具体的Burnside定理解决的问题的定义，那就是 : 

我们要给集合$X$中每个元素染色，有一个奇怪的染色方法，它对每个元素的染色是平等的(但是对每个颜色不一定；这说明合法染色经过置换还是合法染色)，并且所有的染色结果组成一个染色集合$\mathcal{C}$。还有一个作用于$X$(或者说作用于$X$的染色)的置换群$G$，问题是求出在$G$作用下$\mathcal{C}$中本质不同的染色数$$\vert\mathcal{C}/G\vert$$。

---

**引理1** 对于置换$$f$$和染色$$\mathrm{c}$$，作用在$$\mathrm{c}$$上与$$f$$等价的置换$$g$$(即$$f\ast\mathrm{c}=g\ast\mathrm{c}$$)的数量为$$\vert G(\mathrm{c})\vert$$。

**证明** 对于$$f\ast\mathrm{c}=g\ast\mathrm{c}$$，我们两边复合上$$f^{-1}$$，得到$$(f^{-1}\circ g)\ast\mathrm{c}=\mathrm{c}$$。这就相当于$$f^{-1}\circ g$$在$$\mathrm{c}$$的稳定核$$G(\mathrm{c})$$中。对于每个$$h\in G(\mathrm{c})$$，都有且仅有一个$$g$$满足$$f^{-1}\circ g=h$$，因为$$g=f\circ h$$。

---

**引理2** 对于染色$$\mathrm{c}\in\mathcal{C}$$，与$$\mathrm{c}$$本质相同的染色数量为

$$
\frac{\vert G\vert}{\vert G(\mathrm{c})\vert}
$$

**证明** 根据引理1，对于每个置换$$f$$，有$$\vert G(\mathrm{c})\vert$$个置换和它作用在$$\mathrm{c}$$上等价，那么这相当于把整个置换群划分成了$$\frac{\vert G\vert}{\vert G(\mathrm{c})\vert}$$个等价类。对于每一个等价类，它里面的置换会把$$\mathrm{c}$$置换成另一个染色(而恒等置换所在的等价类会置换成自己)，所以一共有多少个置换等价类，就有多少个跟$$\mathrm{c}$$本质相同的染色。

---

**引理3** 

$$\sum_{f\in G}\vert\mathcal{C}(f)\vert=\sum_{\mathrm{c}\in\mathcal{C}}\vert G(\mathrm{c})\vert$$

**证明**

我们可以根据定义拆开$$\mathcal{C}(f)$$并交换求和号 : 

$$
\begin{aligned}
\sum_{f\in G}\vert\mathcal{C}(f)\vert&=\sum_{f\in G}\sum_{\mathrm{c}\in\mathcal{C}}[f\ast\mathrm{c}=\mathrm{c}]\\
&=\sum_{\mathrm{c}\in\mathcal{C}}\sum_{f\in G}[f\ast\mathrm{c}=\mathrm{c}]\\
&=\sum_{\mathrm{c}\in\mathcal{C}}\vert G(\mathrm{c})\vert
\end{aligned}
$$

---

**Burnside定理** 在置换群$$G$$的作用下，染色集合$$\mathcal{C}$$中本质不同的染色数$$N(G,\mathcal{C})$$为

$$
N(G,\mathcal{C})=\frac{1}{\vert G\vert}\sum_{f\in G}\vert\mathcal{C}(f)\vert=\frac{1}{\vert G\vert}\sum_{\mathrm{c}\in\mathcal{C}}\vert G(\mathrm{c})\vert
$$

**证明** 

根据引理3，我们知道$$\sum_{f\in G}\vert\mathcal{C}(f)\vert=\sum_{\mathrm{c}\in\mathcal{C}}\vert G(\mathrm{c})\vert$$。

根据引理2，我们又知道$$\vert G(\mathrm{c})\vert=\frac{\vert G\vert}{\text{与}\mathrm{c}\text{本质相同的染色数}}$$。

把第二个式子代入第一个式子，得到

$$
\sum_{f\in G}\vert\mathcal{C}(f)\vert=\vert G\vert\sum_{\mathrm{c}\in\mathcal{C}}\frac{1}{\text{与}\mathrm{c}\text{本质相同的染色数}}
$$

考虑后面那个$$\sum$$，对于一个染色等价类，它里面的项加起来的结果应该是$$1$$，所以那个$$\sum$$计算的就是等价类个数，也就是本质不同的染色数。所以这个式子乘上$$\frac{1}{\vert G\vert}$$就得到本质不同的染色数。

由于我们使用Burnside定理的情况下，置换群的大小一般不会很大，但是染色集合是巨大的，我们会使用$$\mathcal{C}(f)$$而不是$$G(\mathrm{c})$$进行计数。

如果你想用一句话锐评Burnside定理，也就是本质不同染色数等于各置换下**不动点数的平均值**。

## Pólya定理

Pólya定理通过考虑置换的循环结构，得到一个高效的求$$\mathcal{C}(f)$$的方法。

我们称一个置换是循环置换，当且仅当它以循环的方式置换其中某些元素，而不改变其它元素。循环置换简称循环。如果用有向图的方式表示循环置换，你可以看到其中有恰好一个大小$$>1$$的有向环。定义循环置换的大小为循环部分的元素个数。

比如置换$$\left(\begin{array}{}1,2,3,4\\2,3,4,1\end{array}\right)$$就是一个循环置换，它的大小是$$4$$；$$\left(\begin{array}{}1,2,3,4\\1,2,4,3\end{array}\right)$$也是一个循环置换，它的大小是$$2$$；$$\left(\begin{array}{}1,2,3,4\\2,1,4,3\end{array}\right)$$不是一个循环置换，$$\left(\begin{array}{}1,2,3,4\\1,2,3,4\end{array}\right)$$也不是一个循环置换，它们都不只有一个环。

众所周知，每个置换都可以分解成若干循环部分不相交的循环置换的复合，并且如果不考虑顺序这个分解是唯一的，这些循环置换称为这个置换的循环分解。我们定义$$j(f)$$为置换$$f$$循环分解中循环置换的个数。

比如置换$$\left(\begin{array}{}1,2,3,4\\2,1,4,3\end{array}\right)$$，它可以分解为$$\left(\begin{array}{}1,2,3,4\\2,1,3,4\end{array}\right)\circ\left(\begin{array}{}1,2,3,4\\1,2,4,3\end{array}\right)$$。

**引理4** 如果使用$$m$$种颜色对集合$$X$$的元素染色(请注意，必须没有任何额外限制)，那么对于置换$$f$$，在$$f$$作用下保持不变的染色个数为

$$
\vert\mathcal{C}(f)\vert=m^{j(f)}
$$

**证明** 对于$$f$$循环分解中的每一个循环置换，考虑其中循环的几个元素，如果$$f$$的作用保持一个染色$$\mathrm{c}$$不变，那么这个循环中的元素必须染成相同的颜色——否则置换之后这个染色就改变了。比如如果一个循环是$$1\rightarrow 3\rightarrow 6\rightarrow 1$$，那么$$1,3,6$$的颜色必须相同。对应地，如果对于每一个循环置换，它里面循环的元素在$$\mathrm{c}$$中都染成相同的颜色，那么每一个循环置换都保持$$\mathrm{c}$$不变，它们的复合$$f$$也保持$$\mathrm{c}$$不变。

所以每一个循环置换有$$m$$种染色方案，我们就得到$$\vert\mathcal{C}(f)\vert=m^{j(f)}$$。

**Pólya定理** 如果使用$$m$$种颜色对集合$$X$$中的元素染色，那么在置换群$$G$$的作用下，染色集合$$\mathcal{C}$$中本质不同的染色数$$N(G,\mathcal{C})$$为

$$
N(G,\mathcal{C})=\frac{1}{\vert G\vert}\sum_{f\in G}m^{j(f)}
$$

**证明** 将引理4的结论代入Burnside定理。

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

发现这个式子是$$O(\sqrt{d})$$求一个因数$$d$$的$$\varphi$$，同时可以$$O(m)-O(1)$$预处理前$$m$$个数的$$\varphi$$，类似于杜教筛预处理前$$m=\Theta((Tn)^{\frac{2}{3}})$$个数，复杂度为$$O((Tn)^{\frac{2}{3}})$$。当然可以调整$$m$$获得更好的常数。

至于为什么是$$\gcd(n,i)$$个循环?

首先由于对称性，每个循环的大小肯定是相等的，也就是说我们只要求出一个循环的大小，就可以求出循环个数。

考虑从随便一个起点开始，每一步走$$i$$个单位长度，走多少步会回到起点。显然是$$\frac{\mathrm{lcm}(n,i)}{i}$$。

然后它走过的所有点构成一个循环，同时因为所有起点是对称的，这个走的过程中不可能走到重复的点，所以每个循环大小是$$\frac{\mathrm{lcm}(n,i)}{i}$$，循环个数就是$$\gcd(n,i)$$。

-----

[洛谷P4727 [HNOI2009]图的同构计数](https://www.luogu.com.cn/problem/P4727)

好毒瘤!完全不会，拿到题对着置换群同构猜了半天结论 qwq，然后发现OI里面没什么群同构的结论/cy

考虑这个问题相当于，对完全图的边黑白染色，然后求本质不同的图的数量。

我们将对点做置换的置换称为点置换，对边做置换的置换称为边置换。我们很清楚对无向完全图的点做置换的置换群——它就是$$n$$个数的全排列，但是我们不很清楚对无向完全图的边做置换的置换群，只知道它俩同构。

首先定义置换的类型为一个数组$$j$$，其中$$j_k$$表示这个置换中大小为$$k$$的循环个数。两个类型相同的置换显然具有相同的循环个数。对于一个类型，我们可以计算它中所有循环大小的数组$$s$$。

既然两个置换群同构，我们可以猜测 : 对于两个类型相同的点置换，它们对应的边置换类型也相同。因为每个点都是平等的，这是理所当然的。这样我们就可以爆搜$$n$$的拆分作为类型，然后计算这个类型对应的边置换的循环数和这个类型的点置换个数，然后直接Pólya定理即可。

至于边置换的循环数，我们可以直接构造一个点置换，模拟算出对应的边置换，然后算循环数。复杂度$$O(n^2)$$。

至于某一类型的点置换个数，考虑这相当于先给每个点分配它在哪个循环里，然后每个大小为$$s_i$$的循环还有$$(s_i-1)!$$种方式进行一个圆排列；接下来如果两个循环大小相同，它们是不做区分的，所以还要除一个$$\prod j_i!$$，一共就是

$$
\frac{n!\prod(s_i-1)!}{\prod s_i!\prod j_i!}=\frac{n!}{\prod s_i\prod j_i!}
$$

，这部分是$$O(n)$$的。

总复杂度$$O(p(n)n^2)$$，经过打表，$$p(60)=966467\approx 10^6$$，似乎不可过。不过常数不大，略微卡常可以得到90pts，我的代码在CF神机上极限数据需要5.5s，完全可以用来打表。复杂度瓶颈在于求边置换循环数，考虑如何优化。

想象每个点置换的循环是一个转盘，现在一堆转盘在一起转，那么两个循环之间的边，会在两边循环大小的$$\operatorname{lcm}$$轮后转回原来的位置；一个循环之内的边，会在这个循环转一圈之后转回原来的位置。两个大小为$$s_1,s_2$$的循环之间有$$s_1s_2$$条边，每一条都是平等的，那么每条边的循环大小是$$\operatorname{lcm}(s_1,s_2)$$，一共就有$$\gcd(s_1,s_2)$$个循环；一个大小为$$s$$的循环之内的边，如果两条边两端点的距离相等，那么它们会转到一起，应该在一个循环里面，所以循环个数是两端点距离个数$$\lfloor\frac{s}{2}\rfloor$$。这样我们就可以，等等，枚举两个循环之间的边还是$$O(n^2)$$的啊!不过常数小，跑的飞快。注意算循环个数的时候，因为它在指数上，不要对$$p$$取膜，可以不取膜，或者根据费马小定理对$$p-1$$取膜。

实际上还没优化完，可以设$$c_i=\sum[s_j=i]$$并进行$$\gcd$$卷积做到$$O(p(n)n\log n)$$。不过交一张表跑得更快（

-----

[洛谷P4128 [SHOI2006] 有色图](https://www.luogu.com.cn/problem/P4128)

你说SHOI2006有什么?（大雾

这个题比上个题要强，不过做法完全一样。~~一份代码水两道黑题~~

-----

[LOJ#6538. 烷基计数 加强版 加强版](https://loj.ac/p/6538)

有根树计数是具有很好的子结构性质的(，相比之下我就对无根树和图计数一窍不通，比如下面的烷烃和烯烃计数)。考虑所有点度数不超过4且根度数不超过3的的有根树的OGF $$A(z)$$，我们枚举根的三个儿子，得到$$A=zA^3+1$$。等等，我们这里并没有考虑儿子无序的问题，然后你就可以开始奆分类，事实上奆分类的本质就是Pólya定理。

要使用定理，我们的置换群是三个球随便换的置换群 : 

$$
\left(\begin{array}{}1,2,3\\1,3,2\end{array}\right),
\left(\begin{array}{}1,2,3\\2,1,3\end{array}\right),
\left(\begin{array}{}1,2,3\\1,2,3\end{array}\right),
\left(\begin{array}{}1,2,3\\2,3,1\end{array}\right),
\left(\begin{array}{}1,2,3\\3,1,2\end{array}\right),
\left(\begin{array}{}1,2,3\\3,2,1\end{array}\right)
$$

对于每个置换$$f$$我们算出$$\vert\mathcal{C}(f)\vert$$的生成函数。

$$\left(\begin{array}{}1,2,3\\1,2,3\end{array}\right)$$是恒等置换，在它的作用下所有染色都不变，相当于不要求三个子树是否同构，所以它作用下不变染色数的生成函数是$A(z)^3$。

$$\left(\begin{array}{}1,2,3\\1,3,2\end{array}\right), \left(\begin{array}{}1,2,3\\2,1,3\end{array}\right), \left(\begin{array}{}1,2,3\\3,2,1\end{array}\right)$$有一个大小为$2$的循环，相当于要求其中两个子树同构，对第三个不作要求，所以这三个中每一个作用下不变染色数的生成函数都是$A(z^2)A(z)$。($$A(z^2)$$是怎么来的?考虑两棵子树同构，它们的$\operatorname{size}$加起来变成两倍，但是方案数是一棵树的方案数)

$$\left(\begin{array}{}1,2,3\\2,3,1\end{array}\right), \left(\begin{array}{}1,2,3\\3,1,2\end{array}\right)$$是大小为$3$的循环，相当于要求所有子树同构，所以这两个中每一个作用下不变染色数的生成函数都是$A(z^3)$。

全加起来再除以置换群的大小，然后做一个OGF平移，我们得到$A(z)=z\frac{A(z)^3+3A(z^2)A(z)+2A(z^3)}{6}$，然后用多项式牛顿迭代解方程即可，这个在我的blog里(生成函数学习笔记)有提到。

-----

[洛谷P6597 烯烃计数](https://www.luogu.com.cn/problem/P6597)

这个题意其实有点模糊，它说的是求$$n$$个点，每个点度数是$$4$$，有一条特殊边的无标号无根树方案数。

从特殊边处断开，你发现这个东西相当两个烷基卷起来!所以我们再套一遍Pólya定理就做完了。

-----

[洛谷P5900 无标号无根树计数](https://www.luogu.com.cn/problem/P5900)

大家都会做无标号有根树，实际上我们只要在无根树上找一个特殊的结点作为根，然后做有根树计数就好了。

一个简单的做法是找重心作为根，然后减去根不是重心的方案数。一个点是重心的充要条件是所有子树大小不超过$$\lfloor\frac{n}{2}\rfloor$$，而不是重心肯定恰有一棵子树大小超过$$\lfloor\frac{n}{2}\rfloor$$，所以我们枚举这棵子树的大小，然后跟另一半卷起来就得到根不是重心的方案数。注意$$n$$是偶数的时候可能有两个重心，这时候我们需要再把方案数除以$$2$$。但是也有可能两边是相同的!所以不能直接这么减，我们需要套一个Pólya定理来处理。

-----

[LOJ#6512. 「雅礼集训 2018 Day8」C(烷烃计数)](https://loj.ac/p/6512)

大家都会做有一个根的烷烃，那东西就是四个烷基卷起来，一个Pólya定理可以搞定，不过需要枚举$$4!$$种置换。接下来我们还是找重心作为根，然后减去根不是重心的方案数，过程跟无标号无根树计数完全一致，就不再赘述了。

## 理解不能

有些时候我们需要考虑带权计数问题，于是给出带权的Burnside和Pólya定理。

定义一个颜色$$\beta\in\mathcal{B}$$的权值$$w(\beta)$$是随便一个什么东西，可以是数，也可以是多项式或者矩阵之类奇怪的东西。别忘了$$\mathcal{B}$$是颜色集合。

定义一个染色$$\mathrm{c}\in\mathcal{C}$$的权值$$w(\mathrm{c})$$是它对被染色集合$$X$$中每个元素所染颜色权值的积，显然它在任意置换下不变。

定义一个染色等价类$$\phi$$的权值$$w(\phi)$$是它里面所有染色的权值。这些权值显然相等。

-----

**带权的Burnside定理** 在置换群$$G$$的作用下，$$\mathcal{C}/G$$中所有染色等价类的权值之和是 : 

$$
\sum_{\phi\in\mathcal{C}/G}w(\phi)=\frac{1}{\vert G\vert}\sum_{f\in G}w(\mathcal{C}(f))
$$

，其中$$w(\mathcal{C}(f))$$指的是$$f$$作用下不动点的权值之和。它可以解释为，所有染色的权值之和等于各置换下不动点权值和的平均值。

**证明** 如法炮制。

**引理1** 对于置换$$f$$和染色$$\mathrm{c}$$，作用在$$\mathrm{c}$$上与$$f$$等价的置换$$g$$(即$$f\ast\mathrm{c}=g\ast\mathrm{c}$$)的数量为$$\vert G(\mathrm{c})\vert$$。

**引理2** 对于染色$$\mathrm{c}\in\mathcal{C}$$，与$$\mathrm{c}$$本质相同的染色数量为$$\displaystyle\frac{\vert G\vert}{\vert G(\mathrm{c})\vert}$$

**引理3** 

$$
\sum_{f\in G}w(\mathcal{C}(f))=\sum_{\mathrm{c}\in\mathcal{C}}\vert G(\mathrm{c})\vert w(\mathrm{c})
$$

**证明**

$$
\begin{aligned}
\sum_{f\in G}w(\mathcal{C}(f))&=\sum_{f\in G}\sum_{\mathrm{c}\in\mathcal{C}}[f\ast\mathrm{c}=\mathrm{c}]w(\mathrm{c})\\
&=\sum_{\mathrm{c}\in\mathcal{C}}\sum_{f\in G}[f\ast\mathrm{c}=\mathrm{c}]w(\mathrm{c})\\
&=\sum_{\mathrm{c}\in\mathcal{C}}\vert G(\mathrm{c})\vert w(\mathrm{c})
\end{aligned}
$$

现在我们回到带权的Burnside定理。

根据引理3，我们知道$$\displaystyle\sum_{f\in G}w(\mathcal{C}(f))=\sum_{\mathrm{c}\in\mathcal{C}}\vert G(\mathrm{c})\vert w(\mathrm{c})$$。

根据引理2，我们又知道$$\displaystyle\vert G(\mathrm{c})\vert=\frac{\vert G\vert}{\text{与}\mathrm{c}\text{本质相同的染色数}}$$。

把第二个式子代入第一个式子，得到

$$
\sum_{f\in G}w(\mathcal{C}(f))=\vert G\vert\sum_{\mathrm{c}\in\mathcal{C}}\frac{w(\mathrm{c})}{\text{与}\mathrm{c}\text{本质相同的染色数}}
$$

考虑后面那个$$\sum$$，对于一个染色等价类，它里面的$$w(\mathrm{c})$$都相等，所以它们加起来的结果应该是$$w(\mathrm{c})$$。结束了。

-----

之前在 图的同构计数 那道题里面，我们定义了$$j_k(f)$$表示置换$$f$$的循环分解中大小为$$k$$的循环个数。

为了形式简单，定义$$Z$$算子 : 

$$
Z(G;x_1,x_2,...,x_m)=\frac{1}{\vert G\vert}\sum_{f\in G}\prod_{i=1}^mx_i^{j_i(f)}
$$

**带权的Pólya定理** 在置换群$$G$$的作用下，$$\mathcal{C}/G$$中所有染色等价类的权值之和是 : 

$$
\sum_{\phi\in\mathcal{C}/G}w(\phi)=Z(G;\sum_{\beta\in\mathcal{B}}w(\beta),...,\sum_{\beta\in\mathcal{B}}w^m(\beta))
$$

**证明** 懒了。

这个定理有几个简单的特殊情况，比如如果取$$w(\beta)=z^\beta$$，我们就知道

$$
\sum_{\beta\in\mathcal{B}}w^i(\beta)=\sum_{\beta\in\mathcal{B}}z^{i\beta}=B(z^i)
$$

于是代入

$$
\sum_{\phi\in\mathcal{C}/G}w(\phi)=Z(G;B(z),...,B(z^m))
$$

。如果$$G$$是任意置换的置换群$$R_n$$，我们有

$$
\sum_{i=1}^\infty\sum_{\phi\in\mathcal{C}/R_i}w(\phi)=\exp\sum_{i=1}^\infty\frac{\sum_{\beta\in\mathcal{B}}w^i(\beta)}{i}
$$