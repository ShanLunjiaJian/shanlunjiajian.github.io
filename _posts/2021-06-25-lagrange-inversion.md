---
layout: post
title: 拉格朗日反演
subtitle: Finally...
tags: 数学 生成函数
---

参考 刘思齐 [《形式幂级数与 Lagrange 反演公式》](http://www.siqiliu.net/2019/05/11/formal-laurent/)，和 EI的集训队论文 《信息学竞赛中的生成函数计算理论框架》。

现在只有一元拉反。如果我遇到多元拉反题我直接良心出题人/jy

拉格朗日反演描述了$$F$$和它复合逆$$G$$系数的关系。

### 定义

为了搞出一个形式非常优美的公式，我们需要先引入形式洛朗级数。

大家可能听说过洛朗级数，它是和泰勒级数类似的东西，不同之处在于它有负次项。在生成函数的理论中，我们使用的仅仅是它的形式，所以就跟 形式幂级数 一样，我们把生成函数理论中的洛朗级数称为 形式洛朗级数。实际上我们只是因为需要使用负次项才用洛朗级数这个名字。

如果一个数列$$a$$，存在$$n_0$$使得$$i<n_0$$的$$a_i$$全是$$0$$，那么我们就称它为一个洛朗数列。对于一个洛朗数列，它的OGF就是形式洛朗级数，只不过其中次数取遍所有整数而不是自然数。

为什么我们需要让负的一边项数有限?因为如果无限的话，你会发现它的卷积并不收敛了。

然后你发现负指数完全不影响卷积和求逆，所以形式洛朗级数构成了一个域。

定义一个形式洛朗级数$$F$$的阶$$\operatorname{ord}F$$为最大的那个$$n_0$$，也就是最小的非$$0$$项次数。

容易发现如果一个形式洛朗级数的阶$$\geq 1$$，那么它一定存在复合逆。如果阶$$\leq 0$$的话，它的复合逆必须是有限的，不然就会不收敛，而复合逆有限这件事可遇不可求。

### 导数和留数

定义一个形式洛朗级数的形式导数......好吧这是废话。

定义形式留数算子$$\operatorname{res}=[z^{-1}]$$。容易发现一个形式洛朗级数的导数的留数是$$0$$，也就是说求导之后常数项不会移动到$$-1$$次项(乘了个$$0$$没了)，但是$$-1$$次项移动到了$$-2$$次项。

**引理1** 如果$$\operatorname{ord} F=1$$，

$$
\operatorname{res}F^\prime F^k=[k=-1]
$$

。

**证明** 考虑如果$$k\neq -1$$，左边可以利用复合求导法则写成$$(\frac{1}{k+1}F^{k+1})^\prime$$，它是一个导数，所以它的留数是$$0$$。

$$k=-1$$时则不能这么写，此时发现可以直接写出来这个式子，并因为阶为$$1$$，直接提一个$$z^{-1}$$出来/cy

### 拉格朗日反演

**形式1** 如果$$\operatorname{ord} F=1$$，$$F,G$$互为复合逆，那么对于任意整数$$n,m$$，有

$$
n[z^n]F^m=m[z^{-m}]G^{-n}
$$

。

**证明** 抄EI论文（

$$
\begin{aligned}
F(G)^m&=z^m\\
(F^m)^\prime(G)G^\prime&=mz^{m-1}\\
(F^m)^\prime(G)G^\prime&=mz^{m-1}\\
\left(\sum_i i(F^m)G^{i-1}\right)G^\prime&=mz^{m-1}\\
\sum_i i(F^m)G^{i-1-n}G^\prime&=mz^{m-1}G^{-n}\\
\operatorname{res}\sum_i i(F^m)G^{i-1-n}G^\prime&=\operatorname{res}mz^{m-1}G^{-n}\\
\operatorname{res}nF^m&=\operatorname{res}mz^{m-1}G^{-n}\\ 
n[z^n]F^m&=m[z^{-1}]z^{m-1}G^{-n}\\
n[z^n]F^m&=m[z^{-m}]G^{-n}
\end{aligned}
$$

其中第四行是直接展开复合；第七行是根据引理1，我们知道只有$$i-1-n=-1$$的项才非$$0$$。

-----

**形式2**

对于任意形式洛朗级数$$H$$，有

$$
[z^n]H(F)=\frac{1}{n}[z^{n-1}]H^\prime\left(\frac{z}{G(z)}\right)^n
$$

**证明** 只需要证明$$H=z^k$$的情况。可以直接乱拆一拆然后套用形式1。

### 例题

大朋友和多叉树

给$$n$$和集合$$A$$，计数有多少棵$$n$$个叶子、儿子有序的无标号有根树，满足每个非叶结点的儿子个数都在$$A$$中。$$n\leq 10^5$$，膜呐塔塔膜数$$950009857=453\times 2^{21}+1$$。

当然用GF来描述这个东西。考虑设它的OGF是$$F$$，设$$A$$的OGF是$$A$$，那么有$$F=z+A(F)$$。呃有点像复合逆?

呃我们设$$G(z)=z-A(z)$$，那么上面的东西就变成了$$G(F)=z$$。于是我们可以套用拉格朗日反演形式1。