---
layout: post
title: 广义二项级数/广义指数级数
subtitle: 赵神赢，________
tags: 数学
---

好水（

赵神赢在模拟赛里面出了个不知道啥题，然后我转化成算Catalan数的$$k$$次幂的$$n$$次项系数，然而我不知道任何这方面的结论直接无了。

具体数学上面的描述太过惊悚了。讲道理要是有个良好的引入像这个Catalan $$k$$次幂这样的，是不是机械求和法什么的也能看懂?感觉我过一段时间会回来补一句这是不可能的。

-----

广义二项级数$$\mathcal{B}_t$$满足递归式$$\mathcal{B}_t=z\mathcal{B}_t^t+1$$。

广义指数级数$$\mathcal{E}_t$$满足递归式$$\mathcal{E}_t=\exp(z\mathcal{E}_t^t)$$。

**结论**

$$
\begin{aligned}\
[z^n]\mathcal{B}_t^r&=\binom{tn+r}{n}\frac{r}{tn+r}\\
[z^n]\mathcal{E}_t^r&=\frac{r(tn+r)^{n-1}}{n!}\\
[z^n]\frac{\mathcal{B}_t^r}{1-t+t\mathcal{B}_t^{-1}}&=\binom{tn+r}{n}\\
[z^n]\frac{\mathcal{E}_t^r}{1-zt\mathcal{E}_t^t}&=\frac{(tn+r)^n}{n!}
\end{aligned}
$$

其中$$r$$是任意实数。

**证明** 略。很闲就来写（

看起来前两个用来把gf转化成系数，后两个用来把系数转化成gf。

$$\mathcal{B}_2$$就是Catalan数。于是我们知道Catalan $$k$$次幂的结果就是$$\binom{2n+k}{n}\frac{k}{2n+k}$$。

等着给赵神赢出一手 模板 广义指数级数。