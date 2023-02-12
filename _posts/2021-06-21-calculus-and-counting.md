---
layout: post
title: 微积分和组合计数
subtitle: ¿
tags: 数学 生成函数
show: true
---

看了一眼，感觉以前写的东西都好拉啊?不过也不打算写新的了，因为还是会很拉/cy

~~参考~~抄写cmd 《多项式计数杂谈》，MiFaFaOvO 《A problem collection of ode and differential technique》。

众所周知，处理生成函数的时候我们经常遇到导数和积分，常见的是三种情况 : 

 - egf平移，例如 UR3 链式反应

 - ogf凑系数，例如$\vartheta$算子

 - 利用微积分发现性质， 例如$O(n^2)$的$\exp$

。

以下提到$F^\prime$之类的，默认是对$z$求导，否则会特殊说明或者使用$\frac{\mathrm{d}...}{\mathrm{d}...}$的记号。

-----

代数幂级数

称一个幂级数$F(x)$在$\mathbf{K}[x]$上是代数的，当且仅当在$\mathbf{K}[x,y]$上存在二元非零多项式$G(x,y)$，使得$G(x,F(x))=0$，也就是$(x,F(x))$是$G$的一个根。这里$\mathbf{K}[x]$是系数在$\mathbf{K}$的多项式组成的环，$\mathbf{K}[x,y]$就是二元多项式。

-----

线性齐次微分方程，微分有限和整式递推

如果一个幂级数满足一个线性齐次微分方程，那么它就是微分有限(d-finite)的，注意微分方程里的系数可以是多项式，而不必是常数。比如常数次多项式是微分有限的，因为$d$次多项式$f$满足$f^{(d+1)}=0$。$\exp$是微分有限的，因为$\exp^\prime-\exp=0$。

根据这个ode容易推出它系数的递推式，这个递推式的形式一定是

$$
p_0(n)f_n+p_1(n)f_{n-1}+...=0
$$

，其中$p_i$是一个多项式，这个形式被称为整式递推。事实上，一个幂级数的系数是整式递推的，当且仅当它微分有限，因为我们可以从递推式构造ode，也可以从ode提取系数得到递推式。

如果有一个常数怎么办?感觉上对性质影响不大，只是你总要加一个常数维。

-----

超几何函数的ode

这一段照抄 具体数学。

大家都知道超几何函数。具体数学说，我们搞的函数，95%都是超几何函数。

超几何函数有很多应用，但是今天我们只讨论它们满足的一类微分方程。众所周知，超几何函数是

$$
F\left(\begin{array}{ccc|}a_1,a_2,\cdots,a_n\ \\b_1,b_2,\cdots,b_m\ \end{array}\ z\right)=\sum_{k=0}^\infty\frac{a_1^\overline{k}a_2^\overline{k}\cdots a_n^\overline{k}z^k}{b_1^\overline{k}b_2^\overline{k}\cdots b_n^\overline{k}k!}
$$

呃这个符号打起来真麻烦。行内你可能会喜欢写成$F(a_1,...,a_n;b_1,...,b_m;z)$这样的。

考虑超几何函数的导数，它是

$$
\frac{\mathrm{d}}{\mathrm{d}z}F\left(\begin{array}{ccc|}a_1,\cdots,a_n\ \\b_1,\cdots,b_m\ \end{array}\ z\right)=\sum_{k=0}^\infty\frac{a_1^\overline{k+1}\cdots a_n^\overline{k+1}z^{k}}{b_1^\overline{k+1}\cdots b_n^\overline{k+1}k!}=\frac{a_1\cdots a_n}{b_1\cdots b_m}F\left(\begin{array}{ccc|}a_1+1,\cdots,a_n+1\ \\b_1+1,\cdots,b_m+1\ \end{array}\ z\right)
$$

我们定义$\vartheta$算子为$\vartheta=z\frac{\mathrm{d}}{\mathrm{d}z}$，也就是求导再移一位的算子。经过一些手玩，无聊的数学家发现$\vartheta$好像可以这么用 : 

$$
\begin{aligned}
\vartheta F\left(\begin{array}{ccc|}a_1,\cdots,a_n\ \\b_1,\cdots,b_m\ \end{array}\ z\right)=z\sum_{k=1}^\infty\frac{a_1^\overline{k}\cdots a_n^\overline{k}z^{k-1}}{b_1^\overline{k}\cdots b_n^\overline{k}(k-1)!}=\sum_{k=0}^\infty\frac{ka_1^\overline{k}\cdots a_n^\overline{k}z^k}{b_1^\overline{k}\cdots b_n^\overline{k}k!}
\vartheta F\left(\begin{array}{ccc|}a_1,\cdots,a_n\ \\b_1,\cdots,b_m\ \end{array}\ z\right)+a_1F\left(\begin{array}{ccc|}a_1,\cdots,a_n\ \\b_1,\cdots,b_m\ \end{array}\ z\right)&=\sum_{k=0}^\infty\frac{(k+a_1)a_1^\overline{k}\cdots a_n^\overline{k}z^k}{b_1^\overline{k}\cdots b_n^\overline{k}k!}\\
&=\sum_{k=0}^\infty\frac{a_1(a_1+1)^\overline{k}a_2^\overline{k}\cdots a_n^\overline{k}z^k}{b_1^\overline{k}\cdots b_n^\overline{k}k!}\\
&=a_1F\left(\begin{array}{ccc|}a_1+1,a_2,\cdots,a_n\ \\b_1,\cdots,b_m\ \end{array}\ z\right)
\end{aligned}
$$

我们可以这样改一个参数。第一行中乘在$F$上的$a_1$也可以看做一个算子，所以可以把它写作$(\vartheta+a_1)F$，这看起来简洁多了。

同理，我们也有

$$
(\vartheta+b_1-1)F\left(\begin{array}{ccc|}a_1,\cdots,a_n\ \\b_1,\cdots,b_m\ \end{array}\ z\right)=(b_1-1)F\left(\begin{array}{ccc|}a_1,\cdots,a_n\ \\b_1-1,b_2,\cdots,b_m\ \end{array}\ z\right)
$$

这两个式子看起来很有意思。如果把上面的参数全改一遍，我们得到

$$
(\vartheta+a_1)\cdots(\vartheta+a_m)F\left(\begin{array}{ccc|}a_1,\cdots,a_n\ \\b_1,\cdots,b_m\ \end{array}\ z\right)=a_1\cdots a_m F\left(\begin{array}{ccc|}a_1+1,\cdots,a_n+1\ \\b_1,\cdots,b_m\ \end{array}\ z\right)
$$

同理也有

$$
(\vartheta+b_1-1)\cdots(\vartheta+b_m-1)F\left(\begin{array}{ccc|}a_1,\cdots,a_n\ \\b_1,\cdots,b_m\ \end{array}\ z\right)=(b_1-1)\cdots(b_m-1)F\left(\begin{array}{ccc|}a_1,\cdots,a_n\ \\b_1-1,\cdots,b_m-1\ \end{array}\ z\right)
$$

根据我们推的第一个式子，也就是直接求导的式子，你发现第一个是第二个的导数。所以我们知道有ode

$$
(\vartheta+a_1)\cdots(\vartheta+a_n)F=\frac{\mathrm{d}}{\mathrm{d}z}(\vartheta+b_1-1)\cdots(\vartheta+b_m-1)F
$$

，这就很好!

展开之后我们可以得到一个$\max(n,m+1)$阶的线性齐次微分方程。

-----

ode自动机

一个给出生成函数，写ode并解出递推式的算法。

基于 常见的函数很多是微分有限的，并且求和，求积，复合代数幂级数都保持微分有限。

呃当然你不会希望场上写这个，不过在允许使用板子的比赛中，你可以使用别人的或者你自己闲着没事的时候写好的ode自动机板子。在不允许的比赛中，不应该出现这种见鬼题。

实际上，一般来说，你根本不会在任何场上使用ode，除非只剩下最后一个数数题了。

可以看看[EI队长的](https://www.luogu.com.cn/blog/EntropyIncreaser/guan-yu-zheng-shi-di-tui-ji-xie-hua-di-chang-shi)。

我也来写一写原理/jy

考虑和。我们知道$f,g$分别满足$n,m$阶的ode。考虑$(f+g)^{(k)}=f^{(k)}+g^{(k)}$，注意到$k\geq n$的时候可以利用ode消掉$f^{(k)}$，$k\geq m$同理，于是只有$n+m$个维度(每一维是一个有理分式乘一个$f$或$g$的某阶导)，于是$n+m$阶导内必然出现线性相关。

考虑积。类似上面消一消，每一项必然是$f^{(i)}g^{(j)}$的形式，于是只有$nm$个维度。

考虑复合有理分式(复合代数幂级数的时候才保持微分有限)。复合得到的形式必然是$(f(g))^{(k)}\sum\limits_{i<k}a_{k,i}f^{(i)}(g)$，其中$a$也是有理分式。于是只有$n$个维度。甚至不需要用什么线性基，可以直接矩阵求逆算，具体请看EI队长的。

看起来就结束了。好像点积也可以做，但是不是很会。

-----

abc240G

这个题式子简单，可以下到数据，是真正的ode自动机入门题。

看了一眼发现答案是$\frac{n!}{a!b!c!}[z^{\frac{n-a-b-c}{2}}]F(;a+1;z)F(;b+1;z)F(;c+1;z)$。从 https://loj.ac/s/951782 可以贺到EI的ode自动机，使用`ode_pFq()`构造三个超几何函数的ode，然后使用`DFinite_prod()`算即可，最后可以得到一个$8$阶ode，爆力前$7$项然后调用`eval.pre(),eval.post()`就行了。中间出现了$14123$次多项式所以可能确实人力所不能及，虽然结果并不长。 https://atcoder.jp/contests/abc240/submissions/35762311 我的提交记录。

不要尝试把$a,b,c$看成变量直接算。多元多项式比较难处理，并且中间会出现成倍恐怖的式子长度。

但是这个题怎么说呢，有ode自动机就线性，没有还是需要考虑组合意义之类的。并且好像组合意义也不复杂。感觉双射之类的组合意义是极端的智慧，ode自动机和bm这种是极端的技术，允许携带板子当然选择技术，但是不允许的话技术和智慧都不是很好用啊。

-----

[排列](https://www.zhihu.com/question/393998538)

计数长为$n$，且没有两个相邻的数在数值上也相邻的排列数量。$n\leq 10^9$，膜$10^9+7$。

当然容斥。发现如果钦定$k$个不符合要求的间隔(就是让这些间隔两边的数在数值上相邻)，容斥系数就是$(-1)^k$。

然后考虑这样搞的方案数，发现有些钦定的间隔可能造成了一些连续段(呃就是对于每个钦定的间隔，我们把它两边的东西连起来)，每一段有两种排法，不过如果长为$1$则只有一种。如果长是$l$，它对容斥系数的贡献是$(-1)^{l-1}$(，这个情况对答案的贡献就是这些东西乘起来)。

考虑对于每一段求出它的ogf，然后直接枚举有多少段，做一个幂来拼接。每一段是$T(z)=z+2\sum_{i=2}(-z)^{i-1}=z+2\frac{-z}{1+z}=\frac{z(1-z)}{1+z}$，拼接是$G(z)=\sum_{i=0}i!z^i$。$F=G(T)$就是答案的ogf，$G$是超几何函数$F(1,1;;z)$而$T$是代数的，可以喂给ode自动机了。不过这里演示一下手动构造ode。当然先求个导。

$$
G^\prime (z)=\sum_{i=0}(i+1)!(i+1)z^i
$$

看了看，你发现$(i+2)!=(i+1)!(i+2)$，所以$(i+1)!(i+1)=(i+2)!-(i+1)!$。好像又凑出来了原来的系数?

$i+1,i+2$很恶心，它们会导致$-1,-2$次项，我们还是避开这些奇怪的东西，转而使用$i-2,i-1$吧。

我们做几个平移，然后减一减试一试。

$$
\begin{aligned}
z^2G^\prime(z)&=\sum_{i=2}(i-1)!(i-1)z^i\\
&=\sum_{i=2}(i!-(i-1)!)z^i\\
&=\sum_{i=2}i!z^i-\sum_{i=2}(i-1)!z^i\\
&=\sum_{i=2}i!z^i-\sum_{i=2}(i-1)!z^i\\
&=G(z)-1-z-(zG(z)-z)=G(z)-zG(z)-1
\end{aligned}
$$

直接代入$T$!

$$
\begin{aligned}
z^2G^\prime(z)&=G(z)-zG(z)-1\\
\frac{\mathrm{d}G(z)}{\mathrm{d}z}&=\frac{(1-z)G(z)-1}{z^2}\\
\frac{\mathrm{d}G(T(z))}{\mathrm{d}T(z)}&=\frac{(1-T(z))G(T(z))-1}{T(z)^2}\\
\frac{\mathrm{d}G(T(z))\cdot\mathrm{d}T(z)}{\mathrm{d}T(z)\cdot\mathrm{d}z}&=\frac{\mathrm{d}T(z)\cdot\Big((1-T(z))G(T(z))-1\Big)}{\mathrm{d}z\cdot T^2(z)}\\
F^\prime(z)&=T^\prime(z)\frac{(1-T(z))F(z)-1}{T^2(z)}\\
T^\prime(z)&=\frac{z^2+2z-1}{(1+z)^2},T^2(z)=\frac{z^2(1-z)^2}{(1+z)^2},1-T(z)=\frac{1+z^2}{1+z}\\
F^\prime(z)&=\frac{(z^2+2z-1)(1+z)^2}{(1+z)^2z^2(1-z)^2}\left(\frac{1+z^2}{1+z}F(z)-1\right)\\
&=\frac{z^2+2z-1}{z^4-2z^3+z^2}\left(\frac{1+z^2}{1+z}F(z)-1\right)\\
\end{aligned}
$$

先干掉分数，转成看起来可以提取系数的形式，然后直接两边取$[z^n]$ : 

$$
\begin{aligned}
(z^2-z^3-z^4+z^5)F^\prime(z)&=(1-2z-2z^3-z^4)F(z)-1+z+3z^2+z^3\\
 [z^n](z^2-z^3-z^4+z^5)F^\prime(z)&=[z^n](1-2z-2z^3-z^4)F(z)-[z^n]1+[z^n]z+[z^n]3z^2+[z^n]z^3\\
(n-1)f_{n-1}-(n-2)f_{n-2}-(n-3)f_{n-3}+(n-4)f_{n-4}&=f_n-2f_{n-1}-2f_{n-3}-f_{n-4}-[n=0]+[n=1]+3[n=2]+[n=3]\\
f_n&=(n+1)f_{n-1}-(n-2)f_{n-2}-(n-5)f_{n-3}+(n-3)f_{n-4}+[n=0]-[n=1]-3[n=2]-[n=3]\\
\end{aligned}
$$

套用整式递推即可。My math is toooooooooooo weak/ll

-----

顺子 加强版

来自qwaszx的21年省队胡策。

定义一个序列是顺子，当且仅当它看起来像是$a,a+1,a+2,...$或者$a,a-1,a-2,...$。求有多少个长为$n$的序列，不包含长为$m$的顺子。$n,m\leq 5\times 10^6$，膜$10^9+7$。

你发现一个顺子恰好就是上个题中的一个连续段。

考虑还是从拼接的角度理解，你发现这相当于用若干长度$<m$的极长顺子拼接起来的方案数。极长很恶心，我们能不能容斥掉它，变成不一定极长顺子的拼接?

对于长度$i$，我们赋予容斥系数$c_i$。对于一个长$l$的极长顺子，考虑所有用不一定极长的顺子把它拼出来的方案。你发现这是一个invert变换或者叫seq构造，所以我们记$c$的ogf是$C(z)$，这个极长顺子的容斥系数和就是$[x^l]\frac{1}{1-C(z)}$，它应该等于$[l<m]$，所以我们知道$\frac{1}{1-C(z)}=\sum_{i=0}^{m-1} z^i=\frac{1-z^{m}}{1-z}$，可以解出$C(z)=\frac{z-z^{m}}{1-z^{m}}$。它是代数的，所以把上一题的容斥系数换成这个，喂进ode自动机即可。

-----

一阶线性微分方程

是$f^\prime(x)=a(x)f(x)+b(x)$这样的东西。这个不能直接积分，所以考虑拿个东西把右边的$f(x)$扔到左边来变成同一个导数，然后就可以直接积分了。容易想到使用积的求导法则。

我们两边同乘$e^{-\int a(x)}$。然后就得到

$$
\begin{aligned}
f^\prime(x)e^{-\int a(x)}-f(x)a(x)e^{-\int a(x)}&=e^{-\int a(x)}b(x)\\
\frac{\mathrm{d}(f(x)e^{-\int a(x)})}{\mathrm{d}x}&=e^{-\int a(x)}b(x)\\
f(x)e^{-\int a(x)}&=\int e^{-\int a(x)}b(x)+C\\
f(x)&=e^{\int a(x)}\int e^{-\int a(x)}b(x)+C
\end{aligned}
$$

-----

[UR3 链式反应](https://uoj.ac/problem/50)

有根树，儿子无序，有红边和黄边。给定数集合$A$，计算有多少棵$n$个点的树，每个非叶节点满足

 - 有恰好两个儿子和它连红边

 - 有恰好$k$个儿子和它连黄边，其中$k$要在$A$中，并且这些儿子全是叶子

。$n\leq 2\times 10^5$，膜$998244353$。

呃卷起来了。显然枚举两条红边，然后剩下的都是黄边，然后这是一个卷积移一位，写成egf就好了，注意儿子无序要除一个$2$。边界是单点，它肯定是叶子，注意空树为了方便看成不行。这里我就不写\hat了。

$$
\begin{aligned}
f_n&=[n=1]+\frac{1}{2}\sum_{i=1}\sum_{j=1}[n-i-j-1\in A]\binom{n-1}{i}\binom{n-1-i}{j}f_if_j\\
F(z)&=\frac{1}{2}\int A(z)F^2(z)+z
\end{aligned}
$$

现在你已经可以分治法法塔了!不过存在一个$\log$的做法。

呃不定积分看起来不是很正常，我们还是换成导数吧。

$$
F^\prime(z)=\frac{1}{2}A(z)F^2(z)+1
$$

这里有卷积，就不能直接递推了。不过这是一阶微分方程，所以应该很好解!喂进wolfram alpha，解是Standard computation time exceeded...。

考虑一个倍增。类似于牛迭，我们发现右边是一个多项式，所以设$f(F)=\frac{1}{2}AF^2-1$。然后假设已经求出膜$z^n$意义下的答案$F_0$，我们在$F_0$处把$f$泰勒展开 : 

$$
F^\prime\equiv f(F_0)+f^\prime(F_0)(F-F_0)\pmod{z^{2n}}
$$

你发现$f(F_0)$是常多项式，所以这是一个......一阶线性微分方程!两边乘上$e^{-\int f^\prime(F_0)}$就可以解这个式子了，解出来我们得到$F\equiv e^{\int f^\prime(F_0)}\int e^{-\int f^\prime(F_0)}f(F_0)+C$。这个$C$咋办?你发现它的影响总是在常数项上，而常数项是什么我们懂的都懂 : 应该是$0$，所以它完全不重要。

复杂度还是$T(n)=T(\frac{n}{2})+O(n\log n)=O(n\log n)$，不过常数吓人，据说被$O(n\log^2 n/\log\log n)$吊着打。

-----

牛迭

据说链式反应这个题的方法可以解一大车微分方程，但是我也不会，见着再说吧（

-----

Gnutella Chessmaster

定义一个序列$a_1,...,a_m$的权值是$\prod_{i=1}^m(a_i+i)$。给定序列$a$，对于$k=1,...,n$，求它所有长$k$子序列的权值和，当然这里的子序列标号都要离散化。$n\leq 10^5$。

考虑一个简单dp，我们设$f(i,j)$表示前$i$个位置，所有选了$j$个的方案的权值和，转移是$f(i,j)=f(i-1,j)+f(i-1,j-1)(a_i+j)$。

既然这是 微积分和组合计数，考虑怎么用GF把它拼出来。那个系数看起来像是$\vartheta$......但是还是不太好，因为$j$和$j-1$对应。

我们设$g(i,j)=f(i,i-j)$，这样就得到$g(i,i-j)=g(i-1,i-j-1)+g(i-1,i-j)(a_i+j)$，也就是$g(i,j)=g(i-1,j-1)+g(i-1,j)(a_i+i-j)$。设$b_i=a_i+i$，这样就有$g(i,j)=g(i-1,j-1)+g(i-1,j)(b_i-j)$，这就很好!

我们写出$g(i,...)$的ogf $G_i(z)$，然后就有

$$
G_i=zG_{i-1}+b_iG_{i-1}-\vartheta G_{i-1}
$$

。这个有的移位有的不移位，看起来就只能$n^2$了，所以我们考虑用一个跟解一阶线性微分方程类似的方法把右边第一项和第三项统一凑成$\vartheta$。

乘上$e^{-z}$即可，我们得到

$$
G_ie^{-z}=\vartheta(G_{i-1}e^{-z})+b_iG_{i-1}e^{-z}
$$

然后提取系数，你发现这个东西很好玩!具体地，我们设$h_{i,j}=[z^j]G_i$，有$h_{i,j}=h_{i-1,j}(b_i+j)$，也就是$h_{n,j}=h_{0,j}\prod(b_i+j)$。后面是一个一车单项式乘起来，我们可以用分治法法塔搞出来，然后做一个多点求值即可。最后卷一个$e^{-z}$还原$g(n,...)$，然后就立刻可以得到$f(n,...)$。

-----

[UR19 通用测评号](https://uoj.ac/contest/51/problem/514)

有$n$个变量，一开始全是$0$，有上界$a$和阀值$b$。你每次随机选一个没有达到上界的让它$+1$，如果全都$\geq b$了就停止，求期望有多少个达到上界。$n,a\leq 250$，膜$998244353$。

考虑一个神奇操作 : 去掉不选满的的限制，转而统计最后$\geq a$的期望，因为这个过程是否停止和选不选满的没有关系。

然后就很简单了!根据期望的线性性，我们可以拆开每个变量，现在只考虑$1$最后$\geq a$的概率。

这个相当于在$1$达到$a$的时候，还有一些是$<b$的。我们可以进行容斥。

考虑如果我们钦定了$k$个当时$<b$的变量，容斥系数就是$(-1)^k$，概率......

呃可以这么考虑，我们忽略掉除了钦定的这些和$1$之外的所有变量，问题变成我每次随机一个$0,...,k$的数，问出现$a$个$0$的时候，其它数出现次数都$<b$的概率。

从拼接的角度来考虑，就是一个二项卷积。考虑一个出现次数$<b$的数的egf : 

$$
T(z)=\sum_{i=0}^{b-1}\frac{z^i}{i!}
$$

那么我们就是要求所有$T^k$，算出这个剩下的部分随便推一推就好了。这个东西直接呐塔塔就可以做到$O(n^3\log n)$，这里认为$n,a$同阶。呃为什么不是$O(n^2\log n)$?因为幂有$O(n^2)$项，后面的东西我们还是要用的。

怎么砍这个$\log$?

呃egf求导就是平移，这样只差一项，然后就可以写递推式，所以可以求个导试一下?

显然$T^\prime(z)=T(z)+\frac{z^{b-1}}{(b-1)!}$，那么我们就知道

$$
\begin{aligned}
(T^k)^\prime(z)&=kT^{k-1}(z)T^\prime(z)\\
&=kT^{k-1}(z)\left(T(z)+\frac{z^{b-1}}{(b-1)!}\right)
\end{aligned}
$$

呃看起来如果直接提取系数的话，这个ode确实确定了一个递推关系。

$$
\begin{aligned} 
(T^k)^\prime(z)&=kT^{k}(z)+\frac{z^{b-1}}{(b-1)!}kT^{k-1}(z)\\
 [z^n](T^k)^\prime(z)&=[z^n]kT^{k}(z)+[z^n]\frac{z^{b-1}}{(b-1)!}kT^{k-1}(z)\\
 [z^{n+1}]T^k(z)&=k[z^n]T^{k}(z)+\frac{1}{(b-1)!}[z^{n-b+1}]kT^{k-1}(z)
\end{aligned}
$$

呃这就结束了。

-----

[CTS2019 珍珠](https://www.luogu.com.cn/problem/P5401)

给$d$，求在$[1,d]$中有序地选$n$个数，使得其中可以选出至少$m$个不交的对，每一对数值相等的方案数。$d\leq 10^5,n,m\leq 10^9$，膜$998244353$。

呃考虑一个方案可行，我们设颜色$c$出现$cnt_c$次，那么可行当且仅当$\sum_c\lfloor\frac{cnt_c}{2}\rfloor\geq m$。

然后就很简单了!这看起来就很像要对奇偶性分类讨论。你发现如果奇数非常多，那么就会在下取整这里造成巨大损失。具体地，如果奇数个数超过了$n-2m$，我们就会损失掉至少$n-2m$，这样剩下的就不够$m$了。问题变成求奇数个的颜色个数不超过$k=\min(d,n-2m)$的方案数。

从拼接的角度来考虑。写出一个奇数的egf，它就是$\frac{e^z-e^{-z}}{2}$，容易直接展开验证。一个偶数的egf则是$\frac{e^z+e^{-z}}{2}$。

于是我们就是要求

$$
\sum_{i=0}^k\binom{d}{i}n![z^n]\left(\frac{e^z-e^{-z}}{2}\right)^i\left(\frac{e^z+e^{-z}}{2}\right)^{d-i}
$$

。呃这个不是很好看，可以提出来各种东西

$$
\frac{n!}{2^d}[z^n]\sum_{i=0}^k\binom{d}{i}\left(e^z-e^{-z}\right)^i\left(e^z+e^{-z}\right)^{d-i}
$$

，然后可以写成一个生成函数

$$
F(z)=\sum_{i=0}^k\binom{d}{i}\left(e^z-e^{-z}\right)^i\left(e^z+e^{-z}\right)^{d-i}
$$

。这个咋快速计算?首先你发现$z$全是以$e^z$或者$e^{-z}$形式出现的，我们考虑另一个东西 : 

$$
\sum_{i=0}^k\binom{d}{i}\left(z-\frac{1}{z}\right)^i\left(z+\frac{1}{z}\right)^{d-i}
$$

这个还不是很好看，因为有一个$-1$次方，不过我们还是可以提一下

$$
\sum_{i=0}^k\binom{d}{i}\left(z^2-1\right)^i\left(z^2+1\right)^{d-i}
$$

，然后你发现关于$z$的又只剩下$z^2$了，我们可以再换一发

$$
G(z)=\sum_{i=0}^k\binom{d}{i}\left(z-1\right)^i\left(z+1\right)^{d-i}
$$

，这就很好!原来的答案是

$$
F(z)=\frac{1}{e^{dz}}G(e^{2z})
$$

这样只要搞出$G$，算$F$就是普及组内容了。

别说了，直接求导/cy

$$
G^\prime(z)=\sum_{i=1}^{k}\binom{d}{i}\left(i(z-1)^{i-1}(z+1)^{d-i}+(z-1)^i(d-i)(z+1)^{d-i-1}\right)
$$

呃这个怎么跟$G$联系起来呢......试一试硬凑的话，~~可以发现~~有这么一个奇怪的式子 : 

$$
dG-zG^\prime=d\binom{d-1}{k}(z-1)^k(z+1)^{d-k-1}
$$

右边现在是经典式子 : 

$$
f(z)=(1+z)^a(1-z)^b\Rightarrow f^\prime(z)=\frac{af(z)}{1+z}+\frac{bf(z)}{1-z}
$$

所以我们可以递推出$dG-zG^\prime$了，而这个东西又给出了一个递推式，所以我们又可以搞定$G$了，所以就做完了。

可以通过线性逆元和线筛幂做到接近线性，或者你承认$v=n^{O(1)}$就是真的线性。

-----

中国象棋

有一个$n\times m$的棋盘，现在要往上摆炮，要求任意两个炮不能互相攻击，求方案数膜$998244353$，可以加强到$10^9+7$。$n,m\leq 5\times 10^4$。

等价于每行每列都不超过两个炮。

考虑对每行每列建一个点，这样一个炮就相当于连在它的行列之间的一条边。问题等价于计数左右分别$n,m$个点的二分图，其中每个点度数不超过$2$，当然还要没有重边。

呃你发现这个度数限制好眼熟，这个二分图应该是若干不交的链和环的并。从拼接的角度考虑，我们可以写出偶环，偶链和奇链的二元egf(单点视为奇链) : 

$$
\begin{aligned}
F&=\sum_{i=2}\frac{x^iy^i}{2i}\\
G&=\sum_{i=1}x^iy^i\\
H&=\frac{1}{2}\sum_{i=1}\left(x^iy^{i+1}+x^{i+1}y^i\right)+x+y
\end{aligned}
$$

答案就是$n!m![x^ny^m]e^{F+G+H}$了。

呃二元GF确实不好办，所以我们考虑转成一元的。偶环和偶链中每一项$x,y$次数都是相同的，所以可以直接改写成一个$z$。奇链就比较奇怪。不过你发现如果我们假设$n\geq m$，那么因为奇链在两边的点数刚好差$1$，出发于左边的奇链必然比出发于右边的奇链多$n-m$条，也就是说我们枚举出发于右边的奇链数量的话，左边的数量已经确定了，所以可以用一元GF直接描述这件事。

可以写出新的egf : 

$$
\begin{aligned}
F&=\sum_{i=2}\frac{z^i}{2i}\\
G&=\sum_{i=1}z^i\\
H&=z+\frac{1}{2}\sum_{i=2}z^i
\end{aligned}
$$

然后答案现在是$n!m![z^n]e^{F+G}\sum_{i=0}^n\frac{H^iH^{n-m+i}}{z^ii!(n-m+i)!}$。

我们提一个$H^{n-m}$出来，然后设$P(z)=\sum_{i=0}\frac{z^i}{i!(n-m+i)!},Q(z)=\frac{H^2(z)}{z}$，那么上面那个毒瘤就变成了$P(Q)$。

你发现$P$是超几何函数乘常数，$H$是代数的(可以直接解封闭形式)，所以$Q$也是代数的，所以它们的复合还是微分有限的。喂给ode自动机即可。

剩下的部分呢?实际上$F,G$也都是代数的，$e^z$是超几何函数，然后你就可以统统喂给ode自动机了。

-----

分治法法塔

感谢alpha1022的指导。

上面的最后一段可以用来求微分有限幂级数$F$复合任意幂级数$G$。我们构造$F$的微分方程，然后就可以得到$F(G)$的微分方程，它必然也是线性齐次的，不过其中可能有卷积，可以用分治法法塔求解。

于是因为这个复合是在线的，我们也可以做到$O(n\log^2 n)$解任意微分有限幂级数的复合逆。可以多叉分治砍一个$\log\log$。

-----

Simple Permutations([loj3397](https://loj.ac/p/3397))

可以看看别的地方的析合树题解/oh，析合树描述了simple permutation的结构，我所看的东西大概也在干这样的事情。

感谢alpha1022的指导。

定义一个排列是一个单排列(simple permutation)，当且仅当它不存在非平凡的连续段，连续段就是值域连续区间，非平凡指的是长度不为$0,1,n$。求有多少长$n$的单排列。$n\leq 10^5$，膜$998244353$，2s。

设答案是$s_n$。

我们看起来要从连续段出发。定义一个排列的分解是一种把它划分成若干连续段的方案，比如$67183524$可以分解成$67,1,8,3524$，可以进一步标准化变成$12,1,1,2413$。一个单排列应该只有两种平凡的分解，也就是分成一个和分成$n$个。

你发现，如果我们想把一个排列分成尽量少的连续段(当然不要长为$n$的)，从全是长为$1$的连续段开始合并，最后一定会合不动了，此时把所有连续段拿出来排序(排列中两个连续段一定可比)，得到的排名数组应该是一个单排列，换句话说这些连续段的大小关系等于一个单排列中的大小关系。啊怎么证明?考虑如果不简单，那么说明还可以继续合并连续段。

这可能给出了一种双射!

与分解对应地，我们定义一个长$m$的排列$\sigma$的膨胀$\sigma[\alpha_1,\alpha_2,...,\alpha_m]$，其中$\alpha_i$也都是排列，为把$\sigma$中的元素从小到大替换成对应位置上的$\alpha$，当然后替换进来的需要整体加上偏移量。例如$3142[12,1,1,2413]=67183524$。这里面的$\sigma$就是我们上面说的连续段们的排名数组。

接下来做一些迷惑的事情。定义一个排列是正不可分的，当且仅当它不能由$12$膨胀得来，负不可分则是不能由$21$膨胀得来。定义$i_n$是长$n$的正不可分排列数量，负不可分排列显然也是这么多。

然后我们尝试证明下面的定理 : 

**定理** 对于任意长度不为$1$的排列$\pi$，都存在恰好一个长度不为$1$的单排列$\sigma$，膨胀之后可以得到$\pi$。

如果$\sigma$的长度$>2$，那么$\alpha_i$们也是唯一的，$=2$时则有两种方案。如果$\sigma=12$，并且我们要求$\alpha_1$是正不可分的，那么$\alpha_1,\alpha_2$也是唯一的了；$\sigma=21$中则是负不可分。

**证明** 

考虑如果$\pi$中所有非平凡极长连续段都是不交的。这就像废话一样，我们取这些连续段就得到了唯一的分解方式。怎么证明这样得到的$\sigma$是简单的?既然不能继续合并连续段，它当然是简单的。

然后考虑$\pi$中存在两个不同的非平凡极长连续段$A,B$，并且它们的交非空的情况。

你发现既然它们的交非空，那么它们的并一定也是值域连续的，所以它们的并一定是平凡的$[1,n]$，不然就不极长了。

然后考虑如果从其中一个连续段中挖掉两个连续段的交，得到的应该还是连续段，于是我们知道$\pi=\sigma[\alpha,\beta]$，其中$\sigma=12$或者$21$是唯一的，但是$\alpha,\beta$的方案数是不确定的。这就很不好，因为它不是双射了。

不过如果我们考虑所有分成$\sigma[\alpha,\beta]$的方式，其中有唯一一个是满足$\alpha$最短的，我们钦定这个就是我们想要的。如果$\sigma=12$，这个最短的$\alpha$显然是正不可分的，否则把它分掉就得到更短的$\alpha$；$\sigma=21$时则是负不可分。这就证完了。

现在我们确实利用这个结论建立了一个$(\sigma,\alpha_1,...,\alpha_m)$到任意排列的双射，其中$\sigma$是长为$m\geq 2$的单排列，不过这里长为$1,2$的$\sigma$是特殊的，它们要求$\alpha_1$是正或者负不可分的。

考虑$n!,i_n,s_n(n\geq 1)$的生成函数$F,I,S$，其中$S$只考虑$n\geq 4$的项，可以得到

$$
F=z+2IF+S(F)
$$

，其中$z$是因为$1$并不能被这么表示。这个看起来很好。

要解出$S$我们还需要消掉$I$，不过显然应该可以搞出这么一个关于$I$的方程。考虑要生成全部排列和要生成正不可分排列的区别，就在于$\sigma$不能取$12$了，所以就是上面式子中间那个系数$2$变成$1$了，我们得到

$$
I=z+IF+S(F)
$$

，然后乱搞一通就可以解出

$$
S(F)=\frac{F-F^2}{1+F}-z
$$

。接下来就比较套路了。直接把$z$换成$F^{\langle -1\rangle}$(就是$F$的复合逆)，这样就把$S(F(z))$变成$S(z)$了

$$
S(z)=\frac{z-z^2}{1+z}-F^{\langle -1\rangle}
$$

。前面那个东西好说，它是$z(1-z)\frac{1}{1+z}$，分别是平移、邻项差和$(-1)^n$，于是我们得到$2(-1)^{n+1}$。

所以就是要算复合逆了。你发现$F$是超几何函数砍掉常数项$1$，容易得到它的ode，然后利用上面的科技就可以解决这个问题。

[论文link](https://cs.uwaterloo.ca/journals/JIS/VOL6/Albert/albert.pdf)。其中有一些词看起来是，simple permutation 译为 单排列，inflation 译为 膨胀，plus/minus indecomposable 译为 正/负不可分。

-----

有什么问题请联系我/kx