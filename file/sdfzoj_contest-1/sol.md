题目来自hdu多校。hdu多校题可以在vj上看到，不过hdu oj挂了所以交不了。BC所属的hdu多校16 contest2可以在baekjoon oj收录的ptz营中找到并支持提交。

题目名字确实暗示了做法。

## A. 生成函数(egf)

hdu多校09 contest5 B。

打表观察，发现答案是斐波那契数$$f_{2n}$$，于是矩阵快速幂就做完了，单组复杂度$$O(\log n)$$。

有使用egf的推导。关于fib数的egf，我们有微分方程$$F^{\prime\prime}-F^\prime-F=0$$，这个实在是懒得解，我们直接卷上$$e^z$$得到$$e^zF^{\prime\prime}-e^zF^\prime-e^zF=0$$。我们希望把它凑成$$e^zF$$的一个微分方程，也就是说求导的时候都是对$$e^zF$$求导，而不是只对$$F$$求导。

我们强行做这个事情。

给$$e^zF^{\prime\prime}$$凑一个$$e^zF+2e^zF^\prime$$，我们得到$$(e^zF)^{\prime\prime}-e^zF^\prime-e^zF=e^zF+2e^zF^\prime$$，移项得$$(e^zF)^{\prime\prime}-3e^zF^\prime-2e^zF=0$$。

给$$-3e^zF^\prime$$凑一个$$-3e^zF$$，我们得到$$(e^zF)^{\prime\prime}-3(e^zF)^\prime-2e^zF=-3e^zF$$，移项得$$(e^zF)^{\prime\prime}-3(e^zF)^\prime+e^zF=0$$，于是我们知道它的递归式就是$$a_n=3a_{n-1}-a_{n-2}$$。同时斐波那契数的递归式是$$f_{2n}=f_{2n-1}+f_{2n-2}=2f_{2n-2}+f_{2n-3}=3f_{2n-2}-f_{2n-4}$$，所以它俩确实是一样的。你也可以用这个方法直接推式子（

## B. 爆搜冲了(great_magician)

hdu多校16 contest2 J 的一部分。

考虑这个相当于一个区间的xor，然后拆成前缀xor，建个图就彳亍了。如果有权值xor是奇数的环那就没救，否则每个连通块，确定了一个，剩下的就都确定了。

考虑直接爆力枚举所有大小$$>1$$的连通块的方案，然后从左往右做一个线性的dp来决策大小是$$1$$的连通块，因为它们没有后效性。大小超过$$1$$的连通块只有不超过$$\frac{n}{2}$$个，复杂度是$$O(2^\frac{n}{2}n)$$，常数也不大。

看起来这个复杂度还有别的做法。有人做到低于这个了吗?

## C. 观察性质(kang_kang)

hdu多校16 contest2 B 的一部分的加强版。

显然一个点的答案总是不比父亲小。

猜一个结论，从每个点往上找到每一位第一次出现(对于每一位，找到上面第一个这一位是1的数)，转移必然在这其中。考虑如何证明，考虑现在要给$$x$$转移，对于某个$$z$$，考虑$$x\operatorname{and}z$$的最高位，如果$$z$$的这一位不是第一次出现，我们直接选取第一次出现$$y$$，改为走$$x\rightarrow y\rightarrow z$$，可以得到两倍的这一位。于是做完了，复杂度$$O(n\log v)$$。

一个部分分做法是对值域折半，可以做到$$O(n\sqrt{v})$$，不再赘述。

## D. 随机算法(no_future)

hdu多校09 contest3 I。

可以发现答案是$$\frac{a+1}{a+b+2}$$。为什么?我们强行计算。

<span style="color:rgb(153,217,234);">两种情况分别出现$a,b$次下正确率是$p$的概率</span>应该与<span style="color:rgb(255,174,201);">正确率是$p$下两种情况分别出现$a,b$次的概率</span>成正比，那么根据二项分布，这个概率是$$\binom{a+b}{a}p^a(1-p)^b$$，而$$\binom{a+b}{a}$$是常数，于是正确率率是$$p$$的概率就是$$\displaystyle\frac{p^a(1-p)^b}{\int_0^1 x^a(1-x)^b\ \mathrm{d}x}$$，于是答案就是$$\displaystyle\frac{\int_0^1 p^{a+1}(1-p)^{b}\ \mathrm{d}p}{\int_0^1 x^a(1-x)^b\ \mathrm{d}x}$$。这里随便找了一个$$x$$当变量名?

实数做法可以是Simpson算这个积分，也可以是随机一个$$p$$算这个概率(题目名的来源)，然后$$a,b\leq 10$$的有理数做法可以是猜测分母很小然后枚举一个分数。

直接扔进wolfram alpha(然而它比较拉，得把两个积分分开算再手动合起来，不然不给你跑)，然后它就是

$$
\frac{\frac{\Gamma(a+2)\Gamma(b+1)}{\Gamma(a+b+3)}}{\frac{\Gamma(a+1)\Gamma(b+1)}{\Gamma(a+b+2)}}=\frac{\frac{(a+1)!b!}{(a+b+2)!}}{\frac{a!b!}{(a+b+1)!}}=\frac{(a+1)!b!(a+b+1)!}{a!b!(a+b+2)!}=\frac{a+1}{a+b+2}
$$

。然后就做完了，结果如此简洁还是很有意思。

这题放D是因为科技成分太重（