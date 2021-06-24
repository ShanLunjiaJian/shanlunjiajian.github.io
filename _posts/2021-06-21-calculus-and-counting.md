---
layout: post
title: 微积分和组合计数
subtitle: ¿
tags: 数学 生成函数
---

参考cmd 《多项式计数杂谈》，MiFaFaOvO 《A problem collection of ODE and differential technique》。

众所周知，处理生成函数的时候我们经常遇到导数和积分，常见的是三种情况 : 

 - EGF平移，例如 UR3 链式反应

 - OGF凑系数，例如$$\vartheta$$算子

 - 利用微积分发现性质， 例如$$O(n^2)$$的$$\exp$$

。

以下提到$$F^\prime$$之类的，默认是对$$z$$求导，否则会特殊说明或者使用$$\frac{\mathrm{d}...}{\mathrm{d}...}$$的记号。

-----

常系数线性微分方程，微分有限和递推

如果一个生成函数满足一个常系数线性微分方程，那么它就是微分有限的，注意这里的常系数可以是常多项式。根据这个ODE容易推出它系数的递推式。如果你并不理解，你可以看一看第一个题，也就是 排列。

-----

超几何

这一段照抄 具体数学。

大家都知道超几何函数。具体数学说，我们搞的函数，95%都是超几何函数。

超几何函数有很多应用，但是今天我们只讨论它们满足的一类微分方程。

众所周知，超几何函数是

$$
F\left(\begin{array}{ccc|}a_1,a_2,\cdots,a_n\ \\b_1,b_2,\cdots,b_m\ \end{array}\ z\right)=\sum_{k=0}^\infty\frac{a_1^\overline{k}a_2^\overline{k}\cdots a_n^\overline{k}z^k}{b_1^\overline{k}b_2^\overline{k}\cdots b_n^\overline{k}k!}
$$

呃这个符号打起来真麻烦。

考虑超几何函数的导数，它是

$$
\frac{\mathrm{d}}{\mathrm{d}z}F\left(\begin{array}{ccc|}a_1,\cdots,a_n\ \\b_1,\cdots,b_m\ \end{array}\ z\right)=\sum_{k=0}^\infty\frac{a_1^\overline{k+1}\cdots a_n^\overline{k+1}z^{k}}{b_1^\overline{k+1}\cdots b_n^\overline{k+1}k!}=\frac{a_1\cdots a_n}{b_1\cdots b_m}F\left(\begin{array}{ccc|}a_1+1,\cdots,a_n+1\ \\b_1+1,\cdots,b_m+1\ \end{array}\ z\right)
$$

我们定义$$\vartheta$$算子为$$\vartheta=z\frac{\mathrm{d}}{\mathrm{d}z}$$，也就是求导再移一位的算子。

$$\vartheta$$作用于超几何函数会有很奇妙的现象 : 

$$
\vartheta F\left(\begin{array}{ccc|}a_1,\cdots,a_n\ \\b_1,\cdots,b_m\ \end{array}\ z\right)=z\sum_{k=1}^\infty\frac{a_1^\overline{k}\cdots a_n^\overline{k}z^{k-1}}{b_1^\overline{k}\cdots b_n^\overline{k}(k-1)!}=\sum_{k=0}^\infty\frac{ka_1^\overline{k}\cdots a_n^\overline{k}z^k}{b_1^\overline{k}\cdots b_n^\overline{k}k!}
$$

呃好像不是很奇妙，这就是一个OGF凑系数啊?

但是凑出来的系数有妙用。让我们继续往下看 : 

$$
\begin{aligned}
\vartheta F\left(\begin{array}{ccc|}a_1,\cdots,a_n\ \\b_1,\cdots,b_m\ \end{array}\ z\right)+a_1F\left(\begin{array}{ccc|}a_1,\cdots,a_n\ \\b_1,\cdots,b_m\ \end{array}\ z\right)&=\sum_{k=0}^\infty\frac{(k+a_1)a_1^\overline{k}\cdots a_n^\overline{k}z^k}{b_1^\overline{k}\cdots b_n^\overline{k}k!}\\
&=\sum_{k=0}^\infty\frac{a_1(a_1+1)^\overline{k}a_2^\overline{k}\cdots a_n^\overline{k}z^k}{b_1^\overline{k}\cdots b_n^\overline{k}k!}\\
&=a_1F\left(\begin{array}{ccc|}a_1+1,a_2,\cdots,a_n\ \\b_1,\cdots,b_m\ \end{array}\ z\right)
\end{aligned}
$$

我们可以这样改一个参数!呃说句闲话，第一行中乘在$$F$$上的$$a_1$$也可以看做一个算子，所以我们可以把它写作$$(\vartheta+a_1)F$$，这看起来简洁多了。

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

根据我们推的第一个式子，也就是直接求导的式子，你发现第一个是第二个的导数。草?

所以我们知道有微分方程

$$
(\vartheta+a_1)\cdots(\vartheta+a_n)F=\frac{\mathrm{d}}{\mathrm{d}z}(\vartheta+b_1-1)\cdots(\vartheta+b_m-1)F
$$

，这就很好!

展开之后我们得到一个$$\max(n,m+1)$$阶的常系数线性微分方程，而它当然可以直接给出一个递推式。

-----

ODE自动机

一个给出生成函数，写ODE并解出递推式的算法。

基于这么几件事 : 

 - 常见的很多函数是微分有限的，它们的ODE很容易搞定。

    - 有限多项式，$$d$$次多项式满足$$f^{(d+1)}=0$$。

    - 幂函数，$$f(z)=z^\alpha$$满足$$zf^\prime=\alpha f$$。

    - 超几何函数。

 - 两个微分有限的函数，它们的和、积都是微分有限的，并且可以根据它们的ODE推出它们和、积的ODE。

 - 如果$$f$$微分有限，$$g$$是代数的并且常数项是$$0$$，那么$$f(g)$$也是微分有限的，也可以推出它的ODE。

 - 推出的过程是可以机器完成的~~，并且是不可以人手完成的~~，这个算法实际表现良好。

呃当然你不会希望场上写这个，不过在允许使用机器帮你计算的比赛中，你可以使用别人的或者你自己闲着没事的时候写好的ODE自动机板子~~，所以你并不需要了解原理，就算你想了解也不应该看我这里~~。在不允许的比赛中，不应该出现这种见鬼题。

呃不知道啥时候会补完整原理。

不过有一个小问题，就是ODE自动机推出来的ODE项数有明确的界，但是作为系数的常多项式次数最坏情况下是指数级的，所以这个递推式可能很拖拉机，此时还是爆力分治法法塔，或者用一个中间恰到好处位置的式子直接使用带项式科技求解。

-----

[排列](https://www.zhihu.com/question/393998538)

计数长为$$n$$，且没有两个相邻的数在数值上也相邻的排列数量。$$n\leq 10^7$$，膜$$10^9+7$$。

当然容斥。发现如果钦定$$k$$个不符合要求的间隔(就是让这些间隔两边的数在数值上相邻)，容斥系数就是$$(-1)^k$$。

然后考虑这样搞的方案数，发现有些钦定的间隔可能造成了一些连续段(呃就是对于每个钦定的间隔，我们把它两边的东西连起来)，每一段有两种排法，不过如果长为$$1$$则只有一种。如果长是$$l$$，它对容斥系数的贡献是$$(-1)^{l-1}$$(，这个情况对答案的贡献就是这些东西乘起来)。

考虑这么做 : 我们对于每一段求出它的OGF，然后直接枚举有多少段，做一个幂来拼接。这个OGF就是 : 

$$
T(z)=z+2\sum_{i=2}(-z)^{i-1}=z+2\frac{-z}{1+z}=\frac{z(1-z)}{1+z}
$$

至于拼接，我们考虑枚举段数，可以写出

$$
G(z)=\sum_{i=0}i!z^i
$$

，这个东西含义是，对于每一段分配一个rank。$$F=G(T)$$就是答案的OGF。展开它!

$$
F(z)=\sum_{i=0}i!\frac{z^i(1-z)^i}{(1+z)^i}
$$

然后怎么办?直接算就是$$O(n^2\log n)$$，还不够好。

可以考虑搞一个方程来发现性质。

呃$$G$$里面那个$$i!$$的系数让人想到求导或者积分。先导一个试试。

$$
G^\prime (z)=\sum_{i=0}(i+1)!(i+1)z^i
$$

呃这个$$(i+1)!(i+1)$$是什么啊/yun

仔细想想，你发现$$(i+2)!=(i+1)!(i+2)$$，所以$$(i+1)!(i+1)=(i+2)!-(i+1)!$$。好像又凑出来了原来的系数?

呃等等，$$i+1,i+2$$很毒瘤，它们会导致$$-1,-2$$次项，我们还是避开这些奇怪的东西，转而使用用$$i-2,i-1$$吧。

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

看起来现在可以解ODE来得到$$G$$了，不过没有必要，因为这个方程已经提供了足够好的性质。

先硬代入一发$$T$$吧!

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

你发现这个东西甚至没有卷积和幂之类的东西，可以直接提取系数得到递推式。呃这个过程太恶心了我并不想写......还是写一写吧。

先干掉分数，转成看起来可以提取系数的形式，然后直接两边取$$[z^n]$$ : 

$$
\begin{aligned}
(z^2-z^3-z^4+z^5)F^\prime(z)&=(1-2z-2z^3-z^4)F(z)-1+z+3z^2+z^3\\
 [z^n](z^2-z^3-z^4+z^5)F^\prime(z)&=[z^n](1-2z-2z^3-z^4)F(z)-[z^n]1+[z^n]z+[z^n]3z^2+[z^n]z^3\\
(n-1)f_{n-1}-(n-2)f_{n-2}-(n-3)f_{n-3}+(n-4)f_{n-4}&=f_n-2f_{n-1}-2f_{n-3}-f_{n-4}-[n=0]+[n=1]+3[n=2]+[n=3]\\
f_n&=(n+1)f_{n-1}-(n-2)f_{n-2}-(n-5)f_{n-3}+(n-3)f_{n-4}+[n=0]-[n=1]-3[n=2]-[n=3]\\
\end{aligned}
$$

这样就线性了。My math is toooooooooooo weak/ll

当然做这个题另一个简单的多的方法是OEIS（

你可以通过OEIS了解到，这个数列也是 在$$n\times n$$棋盘上摆$$n$$个互不攻击的王，并且每行每列恰好一个的方案数。这个好像完全一致所以没啥意思（

呃是不是可以直接硬推出这个递推式啊/ll

你发现这个过程非常机械化，所以我们可以写一个弱于ODE自动机的东西来模拟，在场上或许不会花很长的时间。

-----

顺子 加强版

定义一个序列是顺子，当且仅当它看起来像是$$a,a+1,a+2,...$$或者$$a,a-1,a-2,...$$。求有多少个长为$$n$$的序列，不包含长为$$m$$的顺子。$$n,m\leq 5\times 10^6$$，膜$$10^9+7$$。

你发现一个顺子恰好就是上个题中的一个连续段。

考虑还是从拼接的角度理解，你发现这相当于用若干长度$$<m$$的极长顺子拼接起来的方案数。极长很恶心，我们能不能容斥掉它，变成不一定极长顺子的拼接?

对于长度$$i$$，我们赋予容斥系数$$c_i$$。对于一个长$$l$$的极长顺子，考虑所有用不一定极长的顺子把它拼出来的方案。你发现这是一个invert变换或者叫seq构造，所以我们记$$c$$的OGF是$$C(z)$$，这个极长顺子的容斥系数和就是$$[x^l]\frac{1}{1-C(z)}$$，它应该等于$$[l<m]$$，所以我们知道

$$
\frac{1}{1-C(z)}=\sum_{i=0}^{m-1} z^i=\frac{1-z^{m}}{1-z}
$$

，可以解出

$$
C(z)=\frac{z-z^{m}}{1-z^{m}}
$$

。然后把上一题的容斥系数换成这个即可。

由于这个式子太长了，dsq建议使用机器计算。如果你硬要手算我也拦不住（

-----

一阶线性微分方程

都可以化成

$$
f^\prime(x)=a(x)f(x)+b(x)
$$

的形式。然后呢?

这个东西不能直接积分，所以考虑拿个东西把右边的$$f(x)$$扔到左边来变成同一个导数，然后就可以直接积分了。容易想到使用积的求导法则。

我们两边同乘$$e^{-\int a(x)}$$。然后就得到

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

有根树，儿子无序，有红边和黄边。给定数集合$$A$$，计算有多少棵$$n$$个点的树，每个非叶节点满足

 - 有恰好两个儿子和它连红边

 - 有恰好$$k$$个儿子和它连黄边，其中$$k$$要在$$A$$中，并且这些儿子全是叶子

。$$n\leq 2\times 10^5$$，膜$$998244353$$。

呃卷起来了。显然枚举两条红边，然后剩下的都是黄边，然后这是一个卷积移一位，写成EGF就好了，注意儿子无序要除一个$$2$$。边界是单点，它肯定是叶子，注意空树为了方便看成不行。这里我就不写\hat了。

$$
\begin{aligned}
f_n&=[n=1]+\frac{1}{2}\sum_{i=1}\sum_{j=1}[n-i-j-1\in A]\binom{n-1}{i}\binom{n-1-i}{j}f_if_j\\
F(z)&=\frac{1}{2}\int A(z)F^2(z)+z
\end{aligned}
$$

现在你已经可以分治法法塔了!不过下面是一个$$1\log$$做法。

呃不定积分看起来不是很正常，我们还是换成导数吧。

$$
F^\prime(z)=\frac{1}{2}A(z)F^2(z)+1
$$

这里有卷积，就不能直接递推了。不过这是一阶微分方程，所以应该很好解!

然而如果你拿着一个数学软件，你会发现它解不动这个......

考虑一个倍增。类似于牛迭，我们发现右边是一个多项式，所以设$$f(F)=\frac{1}{2}AF^2-1$$。

然后假设已经求出膜$$z^n$$意义下的答案$$F_0$$，我们在$$F_0$$处把$$f$$泰勒展开 : 

$$
F^\prime&\equiv f(F_0)+f^\prime(F_0)(F-F_0)\pmod{z^{2n}}
$$

你发现$$f(F_0)$$是常多项式，所以这是一个......一阶线性微分方程!干翻它!

两边乘上$$e^{-\int f^\prime(F_0)}$$就可以解这个式子了，解出来我们得到$$F\equiv e^{\int f^\prime(F_0)}\int e^{-\int f^\prime(F_0)}f(F_0)+C$$。这个$$C$$咋办?你发现它的影响总是在常数项上，而常数项是什么我们懂的都懂 : 应该是$$0$$，所以它完全不重要。

复杂度还是$$T(n)=T(\frac{n}{2})+O(n\log n)=O(n\log n)$$，不过常数吓人，据说被$$O(n\log^2 n/\log\log n)$$吊着打。

-----

牛迭

据说牛迭可以解任意微分有限GF的复合逆，不过我并不会/cy

-----

[UR19 通用测评号](https://uoj.ac/contest/51/problem/514)

有$$n$$个变量，一开始全是$$0$$，有上界$$a$$和阀值$$b$$。你每次随机选一个没有达到上界的让它$$+1$$，如果全都$$\geq b$$了就停止，求期望有多少个达到上界。$$n,a\leq 250$$，膜$$998244353$$。

考虑一个神奇操作 : 去掉不选满的的限制，转而统计最后$$\geq a$$的期望，因为这个过程是否停止和选不选满的没有关系。

然后就很简单了!根据期望的线性性，我们可以拆开每个变量，现在只考虑$$1$$最后$$\geq a$$的概率。

这个相当于在$$1$$达到$$a$$的时候，还有一些是$$<b$$的。我们可以进行容斥。

考虑如果我们钦定了$$k$$个当时$$<b$$的变量，容斥系数就是$$(-1)^k$$，概率......

呃可以这么考虑，我们忽略掉除了钦定的这些和$$1$$之外的所有变量，问题变成我每次随机一个$$0,...,k$$的数，问出现$$a$$个$$0$$的时候，其它数出现次数都$$<b$$的概率。

呃考虑如果除了$$0$$之外只有一个数，我们很容易计算这个东西。如果是两个数，我们需要枚举一个，然后组合数选一选确定两个数分别在哪些时刻被$$+1$$了......这是二项卷积啊朋友们!

考虑一个很简单的EGF : 

$$
T(z)=\sum_{i=0}^{b-1}\frac{z^i}{i!}
$$

那么我们就是要求所有$$T^k$$，算出这个剩下的部分随便推一推就好了。这个东西直接呐塔塔就可以做到$$O(n^3\log n)$$，这里认为$$n,a$$同阶。呃为什么不是$$O(n^2\log n)$$?因为幂有$$O(n^2)$$项，后面的东西我们还是要用的。

怎么砍这个$$\log$$?

呃看到幂就想到$$\exp$$，$$\exp$$要想不带$$\log$$就求导递推，同时EGF求导就是平移，所以可以求个导试一下?

你发现显然有$$T^\prime(z)=T(z)+\frac{z^{b-1}}{(b-1)!}$$，那么我们就知道

$$
\begin{aligned}
(T^k)^\prime(z)&=kT^{k-1}(z)T^\prime(z)\\
&=kT^{k-1}(z)\left(T(z)+\frac{z^{b-1}}{(b-1)!}\right)
\end{aligned}
$$

呃看起来有一个$$T^k$$，还有一个$$(T^k)^\prime$$，注意到它俩系数是错开的，那么如果直接提取系数的话，这个ODE好像确定了一个递推关系。

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

给$$d$$，求在$$[1,d]$$中有序地选$$n$$个数，使得其中可以选出至少$$m$$个不交的对，每一对数值相等的方案数。$$d\leq 10^5,n,m\leq 10^9$$，膜$$998244353$$。

呃考虑一个方案可行，我们设颜色$$c$$出现$$cnt_c$$次，那么可行当且仅当$$\sum_c\lfloor\frac{cnt_c}{2}\rfloor\geq m$$。

然后就很简单了!这看起来就很像要对奇偶性分类讨论。你发现如果奇数非常多，那么就会在下取整这里造成巨大损失。具体地，如果奇数个数超过了$$n-2m$$，我们就会损失掉至少$$n-2m$$，这样剩下的就不够$$m$$了。问题变成求奇数个的颜色个数不超过$$k=\min(d,n-2m)$$的方案数。

从拼接的角度来考虑。写出一个奇数的EGF，它就是$$\frac{e^z-e^{-z}}{2}$$，容易直接展开验证。一个偶数的EGF则是$$\frac{e^z+e^{-z}}{2}$$。

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

。这个咋快速计算?首先你发现$$z$$全是以$$e^z$$或者$$e^{-z}$$形式出现的，我们考虑另一个东西 : 

$$
\sum_{i=0}^k\binom{d}{i}\left(z-\frac{1}{z}\right)^i\left(z+\frac{1}{z}\right)^{d-i}
$$

这个还不是很好看，因为有一个$$-1$$次方，不过我们还是可以提一下

$$
\sum_{i=0}^k\binom{d}{i}\left(z^2-1\right)^i\left(z^2+1\right)^{d-i}
$$

，然后你发现关于$$z$$的又只剩下$$z^2$$了，我们可以再换一发

$$
G(z)=\sum_{i=0}^k\binom{d}{i}\left(z-1\right)^i\left(z+1\right)^{d-i}
$$

，这就很好!原来的答案是

$$
F(z)=\frac{1}{e^{dz}}G(e^{2z})
$$

这样只要搞出$$G$$，算$$F$$就是普及组内容了。

别说了，直接求导/cy

$$
G^\prime(z)=\sum_{i=1}^{k}\binom{d}{i}\left(i(z-1)^{i-1}(z+1)^{d-i}+(z-1)^i(d-i)(z+1)^{d-i-1}\right)
$$

呃这个怎么跟$$G$$联系起来呢......你发现有这么一个奇怪的式子 : 

-----

中国象棋

退役了也不会写（