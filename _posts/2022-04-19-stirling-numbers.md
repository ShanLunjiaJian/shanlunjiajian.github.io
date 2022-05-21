---
layout: post
title: 斯特林数
subtitle: 很复杂啊（
tags: 数学
---

qwq。

-----

第一类斯特林数

求一行

第一类斯特林数第$$n$$行的ogf就是$$z^{\overline{n}}$$，这个是经典结论。

考虑倍增，我们现在知道$$z^{\overline{n}}$$，那么$$z^{\overline{2n}}=z^{\overline{n}}(z+n)^{\overline{n}}$$。考虑一个更广泛的问题，我们知道多项式$$f(z)$$，那么$$f(z+n)$$可以二项式定理$$O(n^2)$$算，然后也可以化成卷积法法塔，但是这个没啥用。然后我们就得到了$$O(n^2)$$求一行第一类斯特林数的方法。这个有任何用吗?

求长$$k$$的行前缀

保留前$$k$$项，复杂度$$O(k^2\log n)$$或者$$O(k\log k\log n)$$。这个还有点用。

能不能不法法塔做到$$O(k^2)$$啊?

求长$$k$$的行后缀

考虑倒过来计算$$z^n\left(\frac{1}{z}\right)^{\overline{n}}$$的前$$k$$项，然后发现它是$$(1+z)(1+2z)...(1+(n-1)z)$$。取个$$\ln$$，然后推一推 : 

$$
\begin{aligned}
&\exp\ln\prod_{i=1}^{n-1}(1+iz)\\
=&\exp-\sum_{i=1}^{n-1}\sum_{j=1}^\infty\frac{(-iz)^j}{j}\\
=&\exp-\sum_{j=1}^\infty\frac{(-z)^j}{j}\sum_{i=1}^{n-1}i^j
\end{aligned}
$$

里面是自然数幂和，可以拉插$$k$$次插出来，复杂度是$$O(k^2)$$，或者用自然数幂和的egf做到$$O(k\log k)$$，然后上个exp就行了。总共是$$O(k^2)$$或者$$O(k\log k)$$。这个问题在sdsc2020 D3出现过。

