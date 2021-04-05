---
layout: post
title: 好像是nowcoder上的一道题的题解
subtitle: 降智
tags: 数论
---

公式如果出现问题，可以右键任意一个公式，选择Math Settings->Math Renderer->Common HTML，可以解决一部分问题。

题号忘了（

题意 : 对于所有长$$n$$，值在$$[1,m]$$之间的序列$$a$$，求

$$
\prod_{a}\mathrm{lcm}(a_i)^{\gcd(a_i)}
$$

。$$n\leq 10^9$$，$$m\leq 2\times 10^5$$，膜质数。

-----

看到一堆东西的$$\mathrm{lcm}$$，有两种想法 : min-max容斥，或者直接考虑每个质因子的贡献。

这里我们先尝试第二种方法，因为比较简单。考虑使用$$\varphi$$反演搞定那个指数上的$$\gcd$$(当然你用$$\mu$$也可以) : 

$$
\begin{aligned}
&\prod_{a}\mathrm{lcm}(a_i)^{\gcd(a_i)}\\
=&\prod_{d}\prod_{d\vert a}\mathrm{lcm}(a_i)^{\varphi(d)}\\
=&\prod_{d}d^{\lfloor\frac{m}{d}\rfloor^n}\left(\prod_{a\in[1,\lfloor\frac{m}{d}\rfloor]}\mathrm{lcm}(a_i)\right)^d
\end{aligned}
$$

外面可以$$O(m)$$枚举，现在只需要考虑快速计算里面的$$\mathrm{lcm}$$。这是个经典问题。

把里面的东西设为$$f(\lfloor\frac{m}{d}\rfloor)$$，问题变为给出$$m$$，计算$$f(m)$$。

枚举质数$$p$$和次数$$e$$，考虑$$p^e$$的贡献。

直接统计$$p^e$$出现至少一次的方案数不是很简单，我们转而统计$$p^e$$不出现的方案数。呃这个非常简单，就是$$(m-\lfloor\frac{m}{p^{e}}\rfloor)^n$$嘛。那么出现的方案数就是$$m^n-(m-\lfloor\frac{m}{p^{e}}\rfloor)^n$$。所以$$p^e$$的贡献就是$$(p^e)^{m^n-(m-\lfloor\frac{m}{p^{e}}\rfloor)^n}$$。

吗?你发现我们算的不是次数恰好为$$e$$，而是至少为$$e$$，所以我们这里还需要对贡献进行差分(或者你对这个方案数进行差分也行，都是一样的)，$$p^e$$的贡献实际上应该去掉那个$$e$$次方，变成$$p^{m^n-(m-\lfloor\frac{m}{p^{e}}\rfloor)^n}$$。这就做完了。复杂度是$$O(n\log n\log v)$$，可以预处理优化成$$O(n(\log n+\log v))$$，不过没啥必要。

式子完整写出来大概是这样的 : 

$$
\begin{aligned}
&\prod_{a}\mathrm{lcm}(a_i)^{\gcd(a_i)}\\
=&\prod_{d}\prod_{d\vert a}\mathrm{lcm}(a_i)^{\varphi(d)}\\
=&\prod_{d}d^{\lfloor\frac{m}{d}\rfloor^n}\left(\prod_{a\in[1,\lfloor\frac{m}{d}\rfloor]}\mathrm{lcm}(a_i)\right)^d\\
=&\prod_{d}d^{\lfloor\frac{m}{d}\rfloor^n}\left(f(\lfloor\frac{m}{d}\rfloor)\right)^d\\
f(m)=&\prod_{p^e}p^{m^n-(m-\lfloor\frac{m}{p^{e}}\rfloor)^n}
\end{aligned}
$$

事实证明min-max容斥做这题比较困难，我试了半天也没有消掉那个枚举子集。

upd : 我消掉了!但是不知道对不对。

$$
\begin{aligned}
&\prod_{S}\mathrm{lcm}(S)^{\gcd(S)}\\
=&\prod_{S}\prod_{T\neq\varnothing,T\subseteq S}\gcd(T)^{(-1)^{\vert T\vert+1}\gcd(S)}\\
=&\prod_{S}\prod_{T\neq\varnothing,T\subseteq S}\gcd(T)^{(-1)^{\vert T\vert+1}\sum_{d\vert S}\varphi(d)}\\
=&\prod_{d}\left(\prod_{d\vert S}\prod_{T\neq\varnothing,T\subseteq S}\gcd(T)^{(-1)^{\vert T\vert+1}}\right)^{\varphi(d)}\\
=&\prod_{d}\left(\prod_{d\vert S}\prod_{T\neq\varnothing,T\subseteq S}\prod_{k\vert T}\varphi(k)^{(-1)^{\vert T\vert+1}}\right)^{\varphi(d)}\\
=&\prod_{d}\left(\prod_{k}\varphi(k)^{\sum_{d\vert S}\sum_{T\neq\varnothing,T\subseteq S,k\vert T}(-1)^{\vert T\vert+1}}\right)^{\varphi(d)}\\
=&\prod_{d}\left(\prod_{k}\varphi(k)^{\sum_{d\vert S}[\exists a\in S,k\vert a]}\right)^{\varphi(d)}
\end{aligned}
$$

最后那个指数是说，这个集合要满足每个数都被$$d$$整除，且某个数能被$$k$$整除。

进行容斥，我们分别计算 每个数都被$$d$$整除，没有数被$$k$$整除 和 每个数都被$$d$$整除。

容易发现后面那个是$$\lfloor\frac{m}{d}\rfloor^n$$。

前面那个呢，我们对每个数再容斥一次 : 用被$$d$$整除的减去同时被$$d,k$$整除的。应该是$$\left(\lfloor\frac{m}{d}\rfloor-\lfloor\frac{m}{\mathrm{lcm}(k,d)}\rfloor\right)^n$$。

所以答案就是 : 

$$
\prod_{d}\left(\prod_{k}\varphi(k)^{\lfloor\frac{m}{d}\rfloor^n-\left(\lfloor\frac{m}{d}\rfloor-\lfloor\frac{m}{\mathrm{lcm}(k,d)}\rfloor\right)^n}\right)^{\varphi(d)}
$$

这个还是不是很好算，怎么办呢?

容易想到，满足$$\mathrm{lcm}(k,d)\leq m$$的$$k,d$$对数应该很少，而其它的次数都是$$0$$，不用计算。不过这个东西打表并不能很快打出来（

粗略分析一下，枚举一个$$d$$，枚举一个$$\gcd$$记为$$g$$(必须是$$d$$的因数)，那么上面的式子就是$$k\leq\frac{ng}{d}$$，然后你发现$$g$$是一个调和数，$$d$$这里又产生一个调和数，所以这个东西是$$O(n\log^2 n)$$的，你也可以用这样的方法来枚举$$k,d$$。当然我不会真的去写这个做法。这个分析是_rqy教给我的，她说感觉实际上要比2log低，神们有兴趣可以考虑一下这个问题（

另外，当需要反演一堆$$\gcd$$的时候，使用$$\varphi$$代替$$\mu$$来处理$$\mathrm{id}$$真的很能简化推式子过程。

最后贴一遍完整过程以供欣赏 : 

$$
\begin{aligned}
&\prod_{S}\mathrm{lcm}(S)^{\gcd(S)}\\
=&\prod_{S}\prod_{T\neq\varnothing,T\subseteq S}\gcd(T)^{(-1)^{\vert T\vert+1}\gcd(S)}\\
=&\prod_{S}\prod_{T\neq\varnothing,T\subseteq S}\gcd(T)^{(-1)^{\vert T\vert+1}\sum_{d\vert S}\varphi(d)}\\
=&\prod_{d}\left(\prod_{d\vert S}\prod_{T\neq\varnothing,T\subseteq S}\gcd(T)^{(-1)^{\vert T\vert+1}}\right)^{\varphi(d)}\\
=&\prod_{d}\left(\prod_{d\vert S}\prod_{T\neq\varnothing,T\subseteq S}\prod_{k\vert T}\varphi(k)^{(-1)^{\vert T\vert+1}}\right)^{\varphi(d)}\\
=&\prod_{d}\left(\prod_{k\vert T}\varphi(k)^{\sum_{d\vert S}\sum_{T\neq\varnothing,T\subseteq S,k\vert T}(-1)^{\vert T\vert+1}}\right)^{\varphi(d)}\\
=&\prod_{d}\left(\prod_{k}\varphi(k)^{\sum_{d\vert S}[\exists a\in S,k\vert a]}\right)^{\varphi(d)}\\
=&\prod_{d}\left(\prod_{k}\varphi(k)^{\lfloor\frac{m}{d}\rfloor^n-\left(\lfloor\frac{m}{d}\rfloor-\lfloor\frac{m}{\mathrm{lcm}(k,d)}\rfloor\right)^n}\right)^{\varphi(d)}
\end{aligned}
$$