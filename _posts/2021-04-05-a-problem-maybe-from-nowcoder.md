---
layout: post
title: 好像是nowcoder上的一道题的题解
subtitle: 降智
tags: 数论
---

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

直接统计$$p^e$$出现至少一次的方案数不是很简单，我们转而统计$$p^e$$不出现的方案数。呃这个非常简单，就是$$(e-1)^n$$嘛。那么出现的方案数就是$$m^n-(e-1)^n$$。所以$$p^e$$的贡献就是$$p^{m^n-(e-1)^n}$$。

吗?你发现我们算的不是次数恰好为$$e$$，而是至少为$$e$$，所以我们这里还需要对贡献进行差分(或者你对这个方案数进行差分也行，都是一样的)。这就做完了。复杂度是$$O(n\log n\log v)$$，可以预处理优化成$$O(n(\log n+\log v))$$，不过没啥必要。

式子完整写出来大概是这样的 : 

$$
\begin{aligned}
&\prod_{a}\mathrm{lcm}(a_i)^{\gcd(a_i)}\\
=&\prod_{d}\prod_{d\vert a}\mathrm{lcm}(a_i)^{\varphi(d)}\\
=&\prod_{d}d^{\lfloor\frac{m}{d}\rfloor^n}\left(\prod_{a\in[1,\lfloor\frac{m}{d}\rfloor]}\mathrm{lcm}(a_i)\right)^d\\
=&\prod_{d}d^{\lfloor\frac{m}{d}\rfloor^n}\left(f(\lfloor\frac{m}{d}\rfloor)\right)^d\\
f(m)=&\prod_{p^e}p^{m^n-(e-1)^n}
\end{aligned}
$$

事实证明min-max容斥做这题比较困难，我试了半天也没有消掉那个枚举子集。